# Agent instructions: sureforgetech

<!-- fleet-core:begin (generated: edit the fleet source, not this block) -->
## Fleet core

Applies to new work after a repository adopts this baseline; do not retroactively invalidate in-flight work under its existing contract. It is generated from one source; repository-specific rules go outside the markers.

### Evidence
- Read live state before stating it: fetch the remote, read the default branch, run the command. A number or an "X is missing" taken from a doc or a stale checkout is a claim to verify. A figure in a doc carries its date and how it was read.
- Find the root cause before proposing a remedy. For an unreachable or hung host, check its network interface and the previous boot's log before blaming memory.
- Give one account of a fact. If two places disagree, fix or flag one.
- Say plainly what you did not verify.

### Changes
- One bounded task per change request. Stay in scope: no drive-by edits and no agent scratch files committed.
- Agent-authored code changes follow SureForge: one bounded work contract, supervised run and validation, independent review, then delivery. The operator may invoke a headless coder adapter; the interactive editor need not be the process coder. An unsupported route remains blocked; do not silently bypass it.
- An exception requires an explicit dated repository-specific rule outside this block naming its scope, reason, validation and delivery route. Limit exceptions to non-code work, read-only mirrors or archived repositories, and bounded pilot restrictions. An exception never relaxes review, protection or an explicit run contract; preserve stricter rules, including human-start requirements.
- Run the repository's validation (named below) before pushing. Inside a supervised run, its contract and delivery process govern commits and publication. For a permitted exception, commit, push a branch (never the default branch) and open the change request yourself within the limits below.
- Generated-policy checks establish instruction consistency; they do not establish runtime enforcement or OS confinement.
- A change request merges when a fresh-context review of the exact head has no unresolved P0 or P1 findings and every required check is green. A new commit needs a new review; a clean automatic merge of the base branch keeps the review.
- At most three open non-draft change requests per repository. While the fleet backlog check reports a backlog, finish and land existing work and start nothing new.
- Fix a finding that takes minutes in the current change; fold the rest into an existing tracking issue. A session closes at least as many issues as it opens on its own initiative; tickets the owner asks for in chat are separate.

### Safety
- Never print, log or commit tokens, passwords or keys. Use the credential helper the repository names.
- One writer per checkout: separate worktrees for separate writers. Do not force-push, rebase or delete a branch another session may own.
- Private repositories run CI on self-hosted runners only. A job that must not share a host (for example signing) runs on a dedicated self-hosted runner group, never on a GitHub-hosted runner without the owner's approval.
- Ask the owner only for a step no agent can do or for a spend or legal commitment; decide and record everything else.

### Layout
- AGENTS.md is the canonical agent file; where a CLAUDE.md exists it only imports it. Keep this file under 200 lines.
- Name this repository's validation command, merge rule and changelog rule outside the markers. Rules kept outside the repository are not visible here: if a task seems to need one, ask rather than guess.
- Rules any adopter needs live in SureForge and in this core; rules that name a machine, account or model live in the operator's own configuration repository, from which each tool's settings are meant to be generated so every agent on every machine follows the same rules.
- Shared skills are installed per machine from the fleet skills hub. Name the ones this repository expects below.

### Forge: GitHub
- Prefer REST (`gh api repos/OWNER/REPO/...`) to GraphQL for single reads: the rate-limit pools are shared by every session on the account.
- Required checks and review rules are branch protection or rulesets; read them with `gh api`. Review-thread resolution needs GraphQL.
<!-- fleet-core:end -->

## Repository purpose and public content

This is the public corporate website and product portfolio, built with Astro and Starlight as a static site. Read `README.md` and `CONTRIBUTING.md`; keep application code in `src/`, published assets in `public/` and historical design work in `design/`.

- Open an issue before substantial changes as required by `CONTRIBUTING.md`. Support public product-copy corrections with an approved public source.
- Do not publish credentials, customer data, proprietary implementation details, internal account identifiers or private infrastructure references. Do not add download links, customer claims, certifications or legal statements without an approved source. Preserve clearly labeled unpublished legal/status placeholders.
- Keep instructions portable and repository-relative. Routine contribution must not depend on a private repository, a local operator checkout or a private service. `CLAUDE.md` only imports this file.

## Validation, merge and publishing

- Use Node.js 22 or newer and the repository's pinned pnpm version (currently `pnpm@10.12.1`). Before opening a PR, run `pnpm install --frozen-lockfile` and `pnpm build` as required by `CONTRIBUTING.md`. The static output is `dist/`; do not commit generated output or design experiments unless the task explicitly requires it.
- Agent-authored code follows the fleet supervised route. Instruction adoption does not establish an available runtime adapter or authorize operational access; an unsupported route stays blocked. Merge requires a fresh independent review of the exact head with no unresolved P0/P1 findings and every effective required check green. Read live protection/rulesets instead of assuming the workflow's jobs are required contexts.
- The existing workflow validates PRs. A non-PR run on `main` can publish the validated artifact to production; merging a site change therefore has a publishing effect. Do not dispatch, change deployment configuration or run manual publishing/rollback commands as part of validation. Use `docs/deployment.md` only for an explicitly authorized publishing task.
- No tracked changelog convention is established. Describe the user-visible change and validation in the PR; do not create a changelog without an explicit task.
- Shared skills: no additional shared skill is required by this repository.
