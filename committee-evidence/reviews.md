# Two independent reviews of the Trellis privacy page (PR 11), summarised faithfully

Facts the page states are about the Jira Cloud app Trellis (code: /Users/deffenda/Code/trellis, read origin/main). Merging the PR publishes https://sureforgetech.com/docs/trellis-privacy/. The Marketplace listing form requires a privacy policy address.

## Review 1 (on the older 13 Oct text): do not publish
P0: said admins can clear Trellis data (no such action exists); said it does not save work-item text (baselines, sweep audit and a browser copy do).
P1: "we cannot see your data" unverified; linked a private document; account-closure erasure stated without the "not yet confirmed against Atlassian's closed test account" caveat; uninstall timing promised.
Verdict: P0=2 P1=4. The text was then replaced by the corrected draft docs/marketplace/site-privacy.md with its owner-note markers removed.

## Review 2 (on the corrected text, head 5fa40c70): P0=0 P1=2
P1: browser copy "for up to 24 hours" is wrong (it is not used after 24 h but stays until replaced); the lists of what is stored read as complete but omit employee numbers, change histories, access lists, approver scopes, sweep log, short links, bill-rate card.
P2: duplicated bullet; export is not literally every record; "removed after a day" understates; unfinished payroll exports can keep a name up to 3 days and are not listed; worklog note also holds time-zone name and a token; account-closure exceptions sit under Security; date was the future.
Checked correct: no external network access; work-item-text exceptions; email addresses not stored; erase-on-close job exists (manifest.yml trellis-privacy-cycle, src/privacy.js) and its described behaviour and exceptions; caveat about the closed-test-account run still true; contact consistent; no customer or internal names.
Not verified: counsel review of roles and rights section; Atlassian's wording on what uninstall does to app storage (page makes no promise); Marketplace vendor is still registered as ABD Enterprises while the page names SureForgeTech.

## Changes since review 2 (head 880b959b)
Browser-copy sentence corrected; lists now say they are a summary and name the omitted kinds, with "Write to the contact above for the full list"; duplicate bullet merged; "removed by the daily clean-up once it is a day old"; date left as a placeholder to be set on publication. The P2 items about unfinished payroll exports, worklog time-zone/token detail and the export scope remain.
