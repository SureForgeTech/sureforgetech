# SureForgeTech

**Tools for software builders.**

SureForgeTech builds practical software for the people who make, ship, secure, and operate software. The SureForge product family includes developer utilities, coding-agent tools, compliance automation, planning tools, and application platforms across desktop apps, command-line tools, editor extensions, Jira apps, and deployable server software.

- Website: [sureforgetech.com](https://sureforgetech.com)
- Product family: [SureForge products](https://sureforgetech.com/#products)
- GitHub: [github.com/SureForgeTech](https://github.com/SureForgeTech)
- Documentation: [sureforgetech.com/docs](https://sureforgetech.com/docs/)
- Support: [sureforgetech.com/support](https://sureforgetech.com/support/)

## Product family

| Product | What it does | Current status |
| --- | --- | --- |
| [SureForge Agent](https://sureforgetech.com/products/sureforge/) | AI coding-agent CLI for bounded development tasks, validation, and independent review. A human reviews results; it never merges code autonomously. | Developer preview · macOS and Linux |
| [SureForge Studio](https://sureforgetech.com/products/studio/) | Multi-repository agent workstation for coordinating coding-agent sessions, execution, audit trails, pause/resume, and handoff. | Early development |
| [SureForge Policy](https://sureforgetech.com/products/policyforge/) | Security and compliance automation for cloud environments that aggregates existing security-tool evidence and prepares control findings and assessment artifacts. | Proprietary |
| [SureForge Trellis](https://sureforgetech.com/products/trellisforge/) | Jira Cloud app for editable work hierarchies, planning, saved views, and reporting, respecting individual Jira permissions. | Product information in development |
| [SureForge Capture (BugNarrator)](https://sureforgetech.com/products/bugnarrator/) | Local-first macOS narrated-testing app with searchable transcripts, screenshot timelines, and bug extraction. | Apache-2.0 · Free · macOS 14+ |
| [SureForge Terminal](https://sureforgetech.com/products/terminal-workspace/) | Native macOS SSH client with SFTP, key and host trust management, snippets, and port forwarding. | Product information in development |
| [SureForge FM Data API](https://sureforgetech.com/products/sureforge-fm-data-api/) | MIT-licensed VS Code extension for FileMaker Data API operations, schema, batch work, Layout Mode, and generated-app starters. | MIT · Free and open source |
| [SureForge FM Snippets](https://sureforgetech.com/products/sureforge-fm-alfred/) | MIT-licensed Alfred snippets for FileMaker development on macOS. Requires Alfred Powerpack. | MIT · Free |
| [SureForge Flow](https://sureforgetech.com/products/flowforge/) | Multi-tenant application platform with control/runtime planes, tenant metadata, deployment management, and SSO support. | In development |

Product names may evolve. References to third-party products identify compatibility only and do not imply affiliation. Product capabilities and availability are described according to their current maturity.

## This repository

This repository contains the corporate website and product portfolio. It is a lightweight Astro site with Astro Starlight documentation, deployed as a static site on Cloudflare Pages. The homepage uses the selected jade and steel identity, nine distinct product panels, purpose-based product discovery, and accessible product details. Product pages and documentation will grow as release information is ready.

### Local development

Requires Node.js 22 or newer and pnpm 10.12.1.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Build the static site with:

```sh
pnpm build
```

The generated site is in `dist/`. Pushes to `main` automatically build, validate, and publish to the Cloudflare Pages project `sureforgetech` at `https://sureforgetech.com`. Pull requests run validation only. See [deployment instructions](docs/deployment.md) for publishing and rollback. Only the generated `dist/` files are uploaded; design explorations and source files are not part of the deployed artifact.

## Contributing

This repository is the company website and product portfolio. For corrections to public product descriptions, open an issue with the proposed change and supporting public reference. Do not submit credentials, customer data, proprietary implementation details, or security-sensitive information.

## Legal and status notes

Privacy, terms, and security pages on the site are clearly marked as unpublished placeholders, not policies or statements. This README makes no assertion about corporate formation or trademark registration. Product and third-party names are used descriptively; no affiliation with Apple, Atlassian, Claris, or other vendors is implied.
