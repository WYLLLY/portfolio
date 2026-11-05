# Security Log Analyzer — portfolio presentation

## Source and factual scope

Based on portfolio origin/main d559fb7 and Security Log Analyzer application head 9224867 (private repository WYLLLY/security-log-analyzer). M1 merged; M2 PR #3 and M3 PR #4 are OPEN and unmerged. Presentation uses In Development plus a verified-implementation note and current implemented-scope labels. No public source link or hosted analysis service is implied.

Evidence read: docs/technical-plan.md, verification-m1/m2/m3.md, global-review.md, benchmark-million.json and reference fixtures. Maintained suite: 156 passed, zero failed/errors/skipped. Independent M2 oracle: 250,000 events, separate from that total. M3/global review findings (period hidden by truncation and malformed timestamp classification) reproduced by Red tests, fixed and independently revalidated. Two Linux CI checks SUCCESS on backend head 9224867.

Benchmark: 1M lines / 94 MB, 9.6008 s, 30,572,544-byte process peak RSS, macOS arm64/Python 3.14.6, one host/account, equal UTC timestamps, accepted-publickey/no alerts. Copy explicitly describes this workload and its limits, not general capacity or real-world accuracy.

## Changes

- Replaces only the Security Log Analyzer project record; all other project data unchanged byte-for-byte.
- Detailed architecture/data model/rules/tradeoffs/reliability/testing/performance/failure experiments/lessons/limits, in professional English matching the site.
- Server-rendered pipeline and selected verified terminal lines reuse the established analyzer styles.
- Generic CaseStudy honors a verified completionNote for implementation awaiting merge, retaining the In Development badge while showing implemented scope/results.
- Scoped min-width fix prevents a new terminal example from forcing mobile document overflow. The horizontal code region is keyboard focusable with a visible outline.

## Validation

- pnpm typecheck: PASS.
- pnpm lint: PASS.
- pnpm build: PASS, including static project routes. Sandbox-only font fetch failed initially; authorized build with the existing Google Fonts access succeeded. No font/framework change.
- CUA browser desktop 1280 px: header, note, pipeline and selected alerts visually checked. DOM: 14 h2 sections.
- Mobile 390 px: first probe found 507 px document width; scoped CSS correction rechecked at document width 390 px / viewport 390 px. Code region scrolls internally, pipeline becomes a vertical list.
- React checklist: server components, no hooks/network/client bundle added, stable keys, labelled sections, semantic ordered list, inert pre/code, existing reduced-motion/layout conventions preserved.
- Independent agent portfolio_review: PASS, no finding. Re-ran typecheck/lint/diff-check; recrosschecked exact terminal values, data isolation, repository privacy, PR states and numerical evidence.

## Isolation and release

Original checkout /Users/william/Documents/site v1 has unrelated uncommitted changes. It was not modified. App create_worktree could not open this second repository from the current chat; an isolated clone under /private/tmp/security-log-portfolio-publication was used instead, based on refreshed origin/main.

Next dev-generated next-env.d.ts changes are excluded/restored before commit. Publication uses the existing GitHub/Vercel integration. CI and Vercel preview on the final portfolio commit must be checked before release; a preview is not production publication. No merge approval is inferred from an independent review alone.
