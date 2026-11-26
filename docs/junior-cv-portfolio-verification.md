# Junior CV and portfolio update — 26 November 2026

The existing visual design is retained. Both CVs keep their original styles, fonts, colours, one-column A4 format, 11 pt project text, employment/education history and eight hyperlink targets. Updated editable DOCX files and extracted TXT versions are delivered with the PDFs in the task outputs.

## Content

- Add Java as a secondary language, Bash, Git, English C1 and immediate availability; Python remains the primary language. Do not invent relocation, native-language or certification claims.
- Lead the profile with Python REST API work; display the actual portfolio address. Replace interests with language/availability information and identify the project year as 2026.
- Keep Payment & Ledger first. Put completed work before the existing work-in-progress projects on the homepage, add Fraud ML through the existing case-study template, and put completed projects before certification goals on the CV page.
- Retain the dark editorial design, existing colours and font families. Increase small body copy and give mobile navigation links 44 px touch height.
- Preserve simulated-provider, synthetic-data and local-only limitations. Fraud ML's security summary now points to merged PR #7 (15 November), which retired the old exception window. Its 145-test/Trivy-zero evidence is historical, not a new backend or scanner execution.
- Synchronize the AI maintenance summary with the existing linked 14–15 November audit: 834 backend tests and 17 Taskroom tests.

## Verification

- PASS: original DOCX styles, theme and font-table parts unchanged; PDF and DOCX render review, one A4 page in both languages, eight exact link targets, native text, no tables/images, no replacement characters, text within the page bounds.
- PASS: TypeScript (`node node_modules/typescript/bin/tsc --noEmit`), ESLint (`node node_modules/eslint/bin/eslint.js .`) and Git whitespace checks.
- PASS: production Next.js build; 16 generated pages, including the new Fraud ML route. Node is the bundled runtime. The first restricted build could not fetch the unchanged Inter font; the authorized network-enabled build passed.
- PASS: local production HTTP checks for 15 pages/assets plus both PDF routes. Both served PDFs are byte-identical to the reviewed output artifacts.
- PASS: browser inspection of home, CV, Fraud ML and maintenance; desktop 1440 px and mobile 390 px, plus narrow-screen checks. No horizontal overflow or browser warning/error observed on the inspected pages. Mobile navigation targets measure 44 px high.
- PASS: independent read-only review found no blocking issue in the content, routing, code or CV files. It also ran TypeScript, ESLint and whitespace checks.
- N/A: behavioral TDD and backend/database suites. This change edits presentation/content and static CV assets, with no backend, financial, worker, API, database or migration behavior changed. No new backend test, scanner result, production capacity or ATS acceptance is claimed.

## Release boundary

The old checkout at `/Users/william/Documents/site v1` contains pre-existing changes and was left intact. This change uses a clean checkout of `ba386e1` on `fix/junior-cv-portfolio-audit`. Production publication requires separate approval to merge the resulting PR. CI and preview status are checked after push.
