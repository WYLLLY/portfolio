# Python Code Analyzer presentation verification

Date: 5 November 2026.

## Evidence and scope

Analyzer M1–M3 is merged in WYLLLY/python-code-analyzer PR #3, main commit
c56eff8120de7e1e096b6159eaaa83232bb8f83a. The main CI run 42007146003
succeeded. A fresh main regression passed 682 tests, zero failures/errors/skips;
Ruff lint/format and strict mypy passed. Independent milestone and global
reviews approved the code. The global review additionally checked 65,536
four-node graphs; this bounded probe is distinct from the maintained suite.

The portfolio adds one completed project, a static analysis pipeline and a
verified synthetic CLI demonstration. Existing project content is preserved.
Homepage totals derive from project status: three completed, two in development.
The analyzer remains PRIVATE (observed through GitHub); source is available on
request. Its CV link targets the public case study, not an inaccessible source URL.
No production benchmark, real fraud accuracy or Windows support is claimed.

Work uses the clean CV/portfolio-publication checkout. The separate site v1
checkout and its existing user modifications were not changed or staged.

## Author verification

- Node 24.22.1, pnpm 11.25.0, Next.js 16.3.8.
- `pnpm lint`, `pnpm typecheck`, `pnpm build`: PASS; eleven static pages.
  An initial lint invocation lacked Node in PATH; rerunning with the bundled
  runtime passed. This setup failure is not product or TDD evidence.
- Local production browser: homepage count/link, case study, pipeline/demo,
  limits, CV page and download links inspected. Desktop 1280px and mobile
  390px checked; document width equals viewport width, no page overflow.
- Real browser EN PDF download matched the public file SHA256.
- EN/FR CVs rendered with the bundled document renderer and every page image
  inspected. Each is one A4 page, single column, native text, body 11pt, eight
  exact clickable links. pypdf/pdfplumber verified reading order and key content;
  OOXML contains no tables, textboxes, drawings or header/footer references.
- Existing personal/contact/employment/education facts preserved. Project copy
  shortened to add Analyzer without reducing the body font. Simulated-provider
  and synthetic-ML qualifications retained. No universal ATS score is claimed.
- No content-mirroring tests were added for this reversible presentation change.
  Existing lint/type/build checks and real rendered-page verification apply.

## Independent review

The distinct M3 reviewer examined the final site diff and both CV drafts/final
files read-only. Verdict: **APPROVE**, no confirmed findings. Independently ran
lint, TypeScript and whitespace checks; HTTP 200 on seven routes, one main/h1,
unique IDs and valid aria-labelledby references. Both PDFs were independently
checked as one-page A4 with eight links, native text/read order and clean OOXML;
page images were inspected and draft/output/public PDF bytes matched.

The reviewer attributes GitHub visibility, build and responsive-browser checks
to the author, rather than claiming independent execution of those steps.
Hosted CI, preview and production outcomes are recorded in the pull request;
local success alone does not establish publication.
