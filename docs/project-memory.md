# SureForgeTech project memory

Recorded 2026-10-17. This is public repository documentation: keep credentials, private infrastructure details, and proprietary product implementation out of it.

## Current operating model

- Corporate site: <https://sureforgetech.com>.
- Hosting: the existing Cloudflare Pages Direct Upload project `sureforgetech`, also reachable at <https://sureforgetech.pages.dev>.
- Source: this repository, with production changes merged into `main`.
- Automatic publishing: `.github/workflows/validate.yml` builds and validates, uploads only the generated `dist/` artifact, then deploys it. Pull requests and other branches validate without publishing.
- The GitHub `production` environment allows only `main`. Its encrypted secrets hold the account ID and a dedicated account-scoped Pages Edit token. Existing credentials for unrelated sites may have source-IP restrictions; do not copy those assumptions or credentials into this workflow.
- Deployment verification compares the source commit in `deployment.json` at both the immutable deployment URL and the corporate domain. Use that evidence to distinguish a successful upload from a working production release.
- See [deployment and rollback instructions](deployment.md) before changing the publishing path.

Initial rollout history: [website and branding](https://github.com/SureForgeTech/sureforgetech/pull/1), [automatic deployment](https://github.com/SureForgeTech/sureforgetech/pull/2), and [unconfigured-domain link correction](https://github.com/SureForgeTech/sureforgetech/pull/3).

## Brand and presentation decisions

- Selected direction: interlocking SFT monogram, dark patinated jade and brushed steel, with the SureForgeTech wordmark beneath. Preserve the gradients and restrained weathering.
- The top bar needs material/color seams so S, F, and T read as separate letters. The F's upper arm belongs to that bar; avoid a redundant roof above it. Keep the S and F strokes balanced with the T, especially the F's middle arm.
- Use the transparent logo for navigation and plain backgrounds. Use the simplified favicon for bookmarks; the detailed monogram does not scale well to that size.
- Preserve the original approved app icons. Give each product a distinct panel and recognizable icon; avoid cartoon-like replacements or nine identical corporate marks.
- The oversized standalone SFT image was removed from the hero because it did not explain the business. The selected hero connects six app icons to three purposes: **Build with AI** (Agent/Studio), **Test & secure** (Capture/Policy), and **Connect & run** (Terminal/Flow). These groupings do not imply shipped integrations.
- Corporate appeal should come from typography, materials, imagery, and clear product purpose. Avoid returning to a wall of prose or generic panels.

Design history and original generation prompts are preserved in [branding](../design/branding/2026-10-17/README.md) and the [local mockup](../design/website/2026-10-17-jade/README.md). Production assets live in `public/brand/`; production source lives in `src/`. Editing the historical mockup does not update the live site.

## Product names and claims

Use these names consistently:

| Product | Purpose |
| --- | --- |
| SureForge Agent | AI coding-agent CLI |
| SureForge Studio | Multi-repository agent workstation |
| SureForge Policy | Security and compliance automation |
| SureForge Trellis | Jira hierarchy and planning app |
| SureForge Capture (BugNarrator) | macOS narrated testing |
| SureForge Terminal | Native macOS SSH client |
| SureForge FM Data API | VS Code extension |
| SureForge FM Snippets | Alfred productivity snippets |
| SureForge Flow | Multi-tenant application platform |

Preserve maturity and licensing information. In particular, Agent is a developer preview, Studio is in early development, and Flow is in development. Planned capabilities must remain identified as planned. Do not imply legal incorporation, registered trademarks, certification, third-party affiliation, or availability beyond the documented state.

## Implementation and verification learnings

- Render all nine product panels into Astro's generated HTML. JavaScript enhances filters and dialogs; the catalog must remain readable without it.
- Hero icons and catalog buttons share the product-details behavior. Event delegation must cover both, rather than only the product grid.
- Preserve existing product, support, and Starlight documentation routes when revising the homepage.
- Starlight requests `/favicon.svg`; retain the root favicon as well as the branded favicon assets.
- `pnpm build` compiles the site and currently generates 26 HTML pages. `actionlint .github/workflows/validate.yml` validates workflow syntax and embedded shell. Use `git diff --check` before pushing.
- A successful CLI API call does not prove Git push uses the same identity. If a push is rejected while `gh` has the correct access, use a command-scoped credential helper rather than changing global credentials or putting tokens in URLs:

  ```sh
  git -c credential.helper= -c 'credential.helper=!gh auth git-credential' push
  ```

## DNS diagnosis from launch

The new custom domain initially worked through authoritative DNS and public resolvers while a primary local resolver retained a negative response from before the website record existed. Other local resolvers already returned the correct addresses. Chrome displayed `DNS_PROBE_FINISHED_NXDOMAIN`.

Compare the authoritative server, a public resolver, and the system resolver before changing working Cloudflare records. Inspect the negative response's remaining SOA TTL rather than guessing a propagation window. A successful HTTPS request using `curl --resolve` and the current public address verifies the service and certificate, but does **not** prove the user's normal DNS path works. Report those checks separately. A cleared Mac/browser cache cannot remove a stale entry held by an upstream resolver.

## Open items and cautions

- `sureforge.ai` is not configured. The live website now links to the existing SureForge Agent product page instead. Decide the domain's intended role before setting it up, and verify it before restoring public links.
- The organization profile in `SureForgeTech/.github` was refreshed on 2026-10-17 with the approved logo and app-icon artwork, all nine current product names, maturity information, and corporate-site links. `ORG_PROFILE_README.md` is the matching repository copy; changes here still need to be published separately to the organization profile. Keep both copies synchronized and omit links to the unconfigured product domain.
- Product pages, documentation, and support information are an initial public foundation. Expand them with verified release information as products mature.
- Do not modify or transfer repositories under `sure-forge` as part of this corporate-site work.

## Working preferences

Make reversible implementation choices and complete authorized work without repeated confirmation. Show a concrete, tested result. Keep progress updates concise. For branding, preserve selected assets and make focused refinements rather than generating unrelated replacements. Never commit credentials, local credential-manager references, or private operating notes to this public repository.

## Search discoverability

- On 2026-10-17, searches surfaced an unrelated instruction-only agent skill named SureForge. Do not reuse that project's description or imply it is our CLI. A search sample is not a universal ranking or indexing report.
- `/sureforge/` is the canonical public explanation of the SureForge software family and its nine products. Homepage and product pages identify SureForgeTech as publisher; Organization, WebSite, and SoftwareApplication JSON-LD describe the visible information.
- No ranking or AI citation is guaranteed. Keep this content factual and expand product docs with verified releases and useful original examples. Special AI text files are not a substitute for accessible, indexable content.
- Google Search Console domain property `sc-domain:sureforgetech.com` was verified automatically through the domain provider on 2026-10-17. Both `/sitemap-index.xml` and `/sitemap-0.xml` show Success; the child sitemap reports 26 discovered URLs. Initial “Couldn't fetch” status cleared during setup; do not change working DNS/CDN rules on that transient status alone.
- Google URL Inspection showed `/`, `/sureforge/`, and `/products/sureforge/` as “Discovered - currently not indexed” on 2026-10-17. All three indexing requests were accepted into the priority crawl queue. Submission is not proof of indexing; inspect again after Google processes them.
- Bing Webmaster Tools site `https://sureforgetech.com` was added and verified using the public `msvalidate.01` meta tag in SiteLayout. Retain the tag. The sitemap index was submitted; initial status is Processing. Used direct site verification rather than granting Bing access to unrelated Search Console properties.
- Webmaster reporting is initially processing. Recheck actual indexing and crawl errors in each console; do not infer ranking from sitemap acceptance.
