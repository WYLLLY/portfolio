# AI Platform portfolio refresh

Verified on 28 October 2026. Content-only update; no application behavior,
dependencies, styles, or backend code changes.

The AI Task Execution Platform entry now reflects M1–M7 completion. Its merged
backend revision is `86029be81aaa62f61a7dace5d0320a2338eccac1`; post-merge
verification recorded 828 passing cases (268 unit, 560 integration), zero failures,
errors, or skips, and successful main CI run 40716426618. A fresh independent
backend review approved the merged code. The private backend reports and retained
reference-load evidence were read directly; no private source URL, credential,
source document, or raw provider record is published in the case study.

## Evidence boundaries

The synthetic campaign recorded 1,000 successes, 100 concurrent SSE connections,
10,016 reads, and zero nominal stream errors or duplicate simulated effects.
Rounded p95 values are 83 ms creation, 164 ms queue wait, 1.57 s completion,
30 ms reads, and below one second for direct/proxied SSE events. Hardware,
synthetic dependency delays, overload, restore experiments, and limits appear
beside these figures. This is not a production or live-model benchmark.

Paid OpenAI smoke is separately SKIPPED because distinct paid authorization and
a spending cap were absent; the unfiltered 828-case regression suite has no skips.
The production provider profile is not provisioned. Image OS findings (244,
including 2 critical and 59 high), production deployment and backup limits remain
explicit. M1/M2 test-first chronology retains its documented owner-accepted
exception. The other project entries are unchanged; homepage totals are now two
completed and two in development.

## Portfolio verification

- Node.js 24.22.1; pnpm 11.25.0; Next.js 16.3.8.
- `pnpm typecheck`: PASS, including after the review correction.
- `pnpm lint`: PASS, including after the review correction.
- `pnpm build`: PASS, nine static pages generated, including the AI case study.
- `git diff --check`: PASS.
- Local production build browser checks: completed home badge and total, case
  study, validation results, limitations and corrected TDD exception inspected.
  Mobile 390px and desktop 1440px layouts inspected; document width equals viewport
  width on both. Existing renderer and layout are reused.
- Independent read-only content review: APPROVE. One Low wording issue about
  M1/M2 TDD evidence was corrected and re-reviewed; no remaining findings.
- No content-mirroring tests were added. This changes copy and an existing status
  value, not runtime behavior. Existing type/lint/build and real rendered-page
  verification are the applicable checks; backend tests were already completed
  on the exact merged backend revision and were not rerun for portfolio copy.

Existing user modifications to AGENTS.md and untracked .agents/ remain excluded.
Production publication is separate from this branch's preview and requires the
explicit merge approval specified by the git-workflow Skill. Hosted CI and
preview outcomes are recorded in the pull request when available.
