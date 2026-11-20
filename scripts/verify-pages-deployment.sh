#!/usr/bin/env bash
# jq variables inside single-quoted filters are bound with --arg.
# shellcheck disable=SC2016
set -euo pipefail

deployment_url=${DEPLOYMENT_URL:-}
deployment_url=${deployment_url%/}
if [[ ! $deployment_url =~ ^https://[0-9a-f]{8}\.sureforgetech\.pages\.dev$ ]]; then
  echo "Wrangler must provide an HTTPS deployment-specific URL for sureforgetech.pages.dev." >&2
  exit 1
fi
if [[ ! ${GITHUB_SHA:-} =~ ^[0-9a-f]{40}$ ]]; then
  echo "GITHUB_SHA must contain the full commit hash." >&2
  exit 1
fi
if [[ ! ${CLOUDFLARE_ACCOUNT_ID:-} =~ ^[0-9a-fA-F]{32}$ || -z ${CLOUDFLARE_API_TOKEN:-} ]]; then
  echo "The Pages verifier requires a valid Cloudflare account ID and an API token." >&2
  exit 1
fi

project_url="https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/pages/projects/sureforgetech"
domain=sureforgetech.com
response=''

fetch() {
  local stage=$1 url=$2 reply status
  shift 2
  if reply=$(curl --disable --silent --proto '=https' --connect-timeout 3 --max-time 5 \
    --write-out $'\n%{http_code}' "$@" --url "$url"); then
    status=${reply##*$'\n'}
    if [[ $status == 2[0-9][0-9] ]]; then
      response=${reply%$'\n'*}
      return 0
    fi
    echo "$stage returned HTTP $status." >&2
  else
    echo "$stage request failed (curl exit $?)." >&2
  fi
  return 1
}

check_response() {
  local stage=$1 problem
  shift
  # Check for one JSON object and log only the verifier's fixed diagnostics.
  if ! problem=$(printf '%s' "$response" | jq --raw-output --slurp "$@" 2>/dev/null); then
    problem='invalid JSON or unexpected response structure'
  fi
  if [[ -n $problem ]]; then
    echo "$stage: $problem." >&2
    return 1
  fi
}

verify_artifact() {
  fetch "Deployment artifact" "$deployment_url/deployment.json" &&
    check_response "Deployment artifact" --arg revision "$GITHUB_SHA" '
      if length == 1 and .[0].commit == $revision then empty
      else "deployment.json did not report the expected commit"
      end'
}

verify_project() {
  fetch "Pages project API" "$project_url" --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" &&
    check_response "Pages project API" --arg revision "$GITHUB_SHA" --arg url "$deployment_url" '
      if length != 1 or .[0].success != true then "expected a successful API response"
      else .[0].result.canonical_deployment |
        if .environment != "production" then "canonical production deployment is missing"
        elif .deployment_trigger.metadata.commit_hash != $revision then "canonical deployment commit does not match GITHUB_SHA"
        elif ((.url // "") | rtrimstr("/")) != $url then "canonical deployment URL does not match Wrangler output"
        elif .latest_stage.name != "deploy" or .latest_stage.status != "success" then "canonical deployment has no successful deploy stage"
        else empty
        end
      end'
}

verify_domain() {
  fetch "Pages domain API" "$project_url/domains/$domain" --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" &&
    check_response "Pages domain API" --arg domain "$domain" '
      if length != 1 or .[0].success != true then "expected a successful API response"
      elif .[0].result.name != $domain then "custom domain name does not match"
      elif .[0].result.status != "active" then "custom domain is not active"
      else empty
      end'
}

artifact_verified=false
# At most 17 five-second requests and seven five-second waits. Once verified,
# the immutable artifact needs no further polling.
for attempt in {1..8}; do
  echo "Verifying Pages deployment (attempt $attempt/8)."
  if [[ $artifact_verified == false ]] && verify_artifact; then
    artifact_verified=true
    echo "Verified $GITHUB_SHA at $deployment_url/deployment.json."
  fi
  if [[ $artifact_verified == true ]] && verify_project && verify_domain; then
    echo "Cloudflare Pages reports the expected production deployment and an active $domain."
    exit 0
  fi
  if [[ $attempt != 8 ]]; then
    sleep 5
  fi
done

echo "Pages verification retries exhausted. See the stage diagnostics above." >&2
exit 1
