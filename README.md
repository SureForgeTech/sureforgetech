# SureForgeTech

**Tools for software builders.**

SureForgeTech builds practical software for the people who make, ship, secure, and operate software. The SureForge product family includes developer utilities, coding-agent tools, compliance automation, planning tools, and application platforms across desktop apps, command-line tools, editor extensions, Jira apps, and deployable server software.

- Website: [sureforgetech.com](https://sureforgetech.com)
- Product family: [sureforge.ai](https://sureforge.ai)
- GitHub: [github.com/SureForgeTech](https://github.com/SureForgeTech)
- Documentation: [sureforgetech.com/docs](https://sureforgetech.com/docs/)
- Support: [sureforgetech.com/support](https://sureforgetech.com/support/)

## Product family

| Product | What it does | Current status |
| --- | --- | --- |
| [SureForge](https://sureforgetech.com/products/sureforge/) | Local CLI for bounded AI-assisted development, validation, and independent review. A human reviews results; it never merges code autonomously. | Developer preview · macOS and Linux |
| [SureForge Studio](https://sureforgetech.com/products/studio/) | Standalone workstation for coordinating coding-agent sessions, execution, audit trails, pause/resume, and handoff across repositories. | Early development |
| [PolicyForge / SureForge Policy](https://sureforgetech.com/products/policyforge/) | Proprietary cloud compliance automation that aggregates existing security-tool evidence and prepares control findings and assessment artifacts. | Proprietary |
| [TrellisForge / SureForge Trellis](https://sureforgetech.com/products/trellisforge/) | Jira Cloud app for editable work hierarchies, planning, saved views, and reporting, respecting individual Jira permissions. | Product information in development |
| [BugNarrator / SureForge Capture](https://sureforgetech.com/products/bugnarrator/) | Local-first macOS narrated-testing app with searchable transcripts, screenshot timelines, and bug extraction. | Apache-2.0 · Free · macOS 14+ |
| [Terminal Workspace / SureForge Terminal](https://sureforgetech.com/products/terminal-workspace/) | Native macOS SSH and SFTP workspace with key and host trust management, snippets, and port forwarding. | Product information in development |
| [SureForge FM — FileMaker Data API Tools](https://sureforgetech.com/products/sureforge-fm-data-api/) | MIT-licensed VS Code extension for FileMaker Data API operations, schema, batch work, Layout Mode, and generated-app starters. | MIT · Free and open source |
| [SureForge FM — Alfred Snippets](https://sureforgetech.com/products/sureforge-fm-alfred/) | MIT-licensed Alfred snippets for FileMaker development on macOS. Requires Alfred Powerpack. | MIT · Free |
| [FlowForge / SureForge Flow](https://sureforgetech.com/products/flowforge/) | Multi-tenant application platform with control/runtime planes, tenant metadata, deployment management, and SSO support. | In development |

Product names may evolve. References to third-party products identify compatibility only and do not imply affiliation. Product capabilities and availability are described according to their current maturity.

## This repository

This repository contains the initial corporate website and product portfolio. It is a lightweight Astro site with Astro Starlight documentation, designed for static deployment to Cloudflare Pages. It provides a public-facing foundation; product pages and documentation will grow as release information is ready.

### Local development

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Build the static site with:

```sh
npm run build
```

The generated site is in `dist/`. Cloudflare Pages can build with `npm run build` and use `dist` as the output directory.

## Contributing

This repository is the company website and product portfolio. For corrections to public product descriptions, open an issue with the proposed change and supporting public reference. Do not submit credentials, customer data, proprietary implementation details, or security-sensitive information.

## Legal and status notes

Privacy, terms, and security materials are not published from this placeholder site. This README makes no assertion about corporate formation or trademark registration. Product and third-party names are used descriptively; no affiliation with Apple, Atlassian, Claris, or other vendors is implied.
