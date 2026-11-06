# Snapshot Backup Engine — portfolio evidence

The existing planned project entry is updated to completed, using the site's shared case-study shell and interactive architecture explorer. The homepage reads its status and counts from the same project data.

## Verified source

Snapshot Backup Engine main revision: 85246c52bdfcef6ebb2b7ac723e359c89b3965ae, verified on 6 November 2026. M1–M3 and the final-review corrections are merged. Final independent review reran 89 tests with 0 failures, errors or skips, Ruff lint/format, strict mypy, pip checks and the installed CLI. Merged-main CI passed under Python 3.14 on Ubuntu and macOS.

Evidence retained in the private source repository: docs/verification/m1.md, m2.md, m3.md, final-review.md and cli-demo.json. The installed CLI demonstration created three snapshots backed by three distinct objects and restored two historical versions; these are demonstration counts, not performance measurements.

## Presentation boundaries

- No public source link or hosted backup demo is offered. The engine repository stays private.
- Architecture scenarios are labelled simplified behavior maps, never captured logs or a live backup.
- Interruption before commit and loss of the success response after commit are distinguished.
- SIGKILL tests are not physical power-loss tests. No recovery SLA, throughput, production certification or immutable point-in-time source view is claimed.
- Restore is atomic per file and may leave a partial destination after interruption.
- Linux/macOS local filesystem, trusted account and stable roots are required. No claim of Windows/network-filesystem support, encryption, compression or cloud integration.
- Existing unrelated projects and local unfinished portfolio changes are preserved. Work was performed in an isolated clone of the published main branch.

## Verification

Run pnpm typecheck, pnpm lint and pnpm build. Inspect homepage status/counts and the case-study route at desktop/mobile widths. Exercise all three outcome controls and component selection, then verify published HTML and production rendering after the normal GitHub/Vercel release.

The shared explorer's optional scenarioLabels property preserves the previous Success/Failure/Timeout defaults for existing case studies; Snapshot uses Published/Interrupted/Corrupt object to describe its own behavior accurately.

## Recorded checks

- PASS: pnpm typecheck, pnpm lint, pnpm build (13 static outputs).
- PASS: independent content/React review against backend revision 85246c5, including generated HTML for Snapshot, Payment and AI.
- PASS: browser interaction with Published, Interrupted and Corrupt object, component selection and keyboard Enter activation.
- PASS: responsive checks at 1440×1000 and 390×844. An observed 4px overflow in the new demonstration block was fixed locally; final document scrollWidth equals 390 at viewport390 for the project and homepage.
- PASS: homepage card says Completed and the project metadata describes completed work; the page contains no link to the private source repository.
- Publication: use the existing GitHub/Vercel integration; await terminal CI/deployment checks and confirm the public project route after propagation.
