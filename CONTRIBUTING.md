# Contributing

This repository contains the public corporate website and product portfolio.

## How to contribute

Issues and pull requests are both welcome. For anything larger than a small fix,
open or comment on an issue first so we agree on the approach.

Sign off every commit with `git commit -s`. This adds a `Signed-off-by:` line
certifying the [Developer Certificate of Origin](https://developercertificate.org/):
you wrote the change or have the right to submit it, and you grant SureForgeTech
the right to use it in this repository (the repository's `LICENSE` file covers the
site as a whole). A
check confirms the sign-off on pull requests from outside contributors. Every
pull request gets review and must pass the required checks before a maintainer
merges it.

CodeRabbit (free open-source plan) may comment on pull requests. Its reviews are advice only and never required. On repositories with fewer than 10 stars it does not run on its own; comment `@coderabbitai review` to trigger it.

For product copy corrections, include a link to an approved public source.

- For how to write a good issue, see the
  [SureForgeTech contributing guide](https://github.com/SureForgeTech/.github/blob/main/CONTRIBUTING.md).
- Do not report security problems in a public issue; follow the
  [organization security policy](https://github.com/SureForgeTech/.github/blob/main/SECURITY.md).

Do not submit secrets, credentials, customer data, proprietary implementation materials, or security-sensitive information. Do not add download links, customer claims, certifications, or legal statements without an approved source.

## For maintainers

Run `pnpm install --frozen-lockfile` and `pnpm build` before opening a pull request.
