# Python DSA and bilingual CV update

## Scope

Adds Python DSA to the existing portfolio list and case-study route, refreshes both
single-page CV PDFs, and records the owner's requested Linux proficiency as
"bonne maîtrise" / "good working proficiency". No specific Linux administration,
certification or production experience is inferred.

The selected Fintech Editorial CV typography, Noto Sans fonts, A4 page geometry,
links, employment and education dates, interests and three existing projects are
preserved. The fourth project records 30 typed Python problems, 12 categories,
207 tests and Python 3.12–3.14 CI. The Fraud ML correction from PR #18, including
60,000 synthetic transactions, is retained alongside simulated-provider wording.

At the owner's request, the DSA case study uses a concise personal study voice:
why the collection exists, the decisions that take practice, the patterns covered
and how the solutions are checked. Internal review counts and historical test-run
caveats stay in the DSA repository's evidence rather than the portfolio copy.
No assertion of unaided or sole-human authorship was added.

## Verification

- PASS: `pnpm typecheck`, `pnpm lint`, standard `pnpm build` (Next 16.3.8).
- The first local build failed because a preexisting node_modules symlink pointed
  outside the checkout's filesystem root. A local `pnpm install --frozen-lockfile`
  replaced that link without changing the lockfile. The standard build then passed,
  and all three checks passed again after the copy revision.
- PASS: HTTP 200 for home, `/projects/python-dsa` and `/cv` on the production build.
- PASS: both PDF downloads have application/pdf content type and are byte-identical
  to the visually reviewed local CV files.
- PASS: desktop and 390px mobile browser checks; no horizontal overflow on the
  DSA and CV pages. No browser console errors were observed.
- PASS: DSA-specific section headings render; an existing case study retains the
  previous default headings. Shared markup and CSS remain unchanged.
- PASS: each CV is one A4 page with selectable text, eight URI links including the
  DSA repository, and the requested Linux proficiency. PNGs were visually checked
  in both languages for clipping, overlap and consistent typography.
- PASS: DOCX text matches the PDFs. The original document packages preserve every
  part except the intended document XML and hyperlink relationship additions;
  font sizes are retained, with section gaps reduced by four points to fit the
  new project. No table, image, header or footer was added.
- PASS: independent review of the release and the subsequent tone revision found
  no actionable defects. The reviewer reran TypeScript, ESLint and whitespace
  checks, inspected both CV renders and verified that the default headings of all
  seven other projects are preserved. Browser checks and the completed build were
  performed by the implementation agent, not independently rerun by that reviewer.

This is a content and document update, not a new algorithm milestone. No new unit
tests were added solely to mirror static prose. Database, worker and API suites
are not applicable; the existing portfolio CI remains required.

## Artifacts

Local deliverables are `William_Decatoire_CV_FR.pdf/.docx` and
`William_Decatoire_CV_EN.pdf/.docx` under the current chat's `outputs/`, with matching
copies in the previously selected CV output directory. The site's `public/cv/`
contains the exact same two PDFs.

## Publication boundary

This work is on `docs/publish-fintech-editorial-cv`, PR #17. Its source branch was
synchronized with main; binary CV conflicts were resolved by preserving current
main's PDFs before applying the requested update. GitHub Actions and Vercel check
results are visible on the PR. Production publication requires the owner's
explicit approval to merge this PR; local/preview success is not production proof.
The Vercel connector's deployment-inspection permission was unavailable; no
connector-based protected-preview download comparison is claimed.
