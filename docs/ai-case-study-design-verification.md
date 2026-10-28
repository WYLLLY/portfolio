# Coherent completed-project case studies

Date: 28 October 2026. Scope: portfolio presentation only.

The AI Task Execution Platform detail route now uses the editorial visual system
already used by Payment & Ledger: serif hero, project-details rail, verified-fact
strip, numbered problem/architecture/decisions/evidence sections, and visible
limits. Project 03 keeps its own content, date, 828-test total, measured workload,
and recovery experiments. Existing CSS is reused without changing global styles,
dependencies, backend code, or the other project entries.

## Shared component and factual boundaries

`ArchitectureExplorer` extracts the existing payment interaction into a small
client component. Payment and AI data remain in server wrappers, passing only
serializable public explanatory data. The private backend is never contacted.

The default component selection remains PostgreSQL and Success. Native buttons,
`aria-pressed`, labelled groups, polite live regions, existing visible focus,
and reduced-motion styling remain. Success/Failure/Timeout are explanatory
behavior maps, not live requests, provider traces, or new backend guarantees.

The AI case study explicitly retains the separate skipped paid OpenAI smoke,
M1/M2 historical TDD exception, synthetic workload conditions, private-source
boundary, production qualifications, image OS findings, and ambiguous-cost
exposure. Full limit, workload, and recovery paragraphs reuse the verified
project content. Neither source publication nor paid provider use is introduced.

## Executed checks

Runtime: Node.js 24.22.1, pnpm 11.25.0, Next.js 16.3.8.

- `pnpm typecheck`: PASS.
- `pnpm lint`: PASS.
- `pnpm build`: PASS; nine static pages generated.
- `git diff --check`: PASS.
- Actual local production build on port 3103, checked through the browser:
  both detail pages have no horizontal overflow at **320, 390, 768, 1440px**.
- AI: all five component selections and all three scenarios exercised; exactly
  one node/scenario stays selected, with matching content, five trace lines,
  and three explanatory steps. All scenario headings/outcomes were inspected.
- Keyboard Space activates Timeout and keeps visible focus; the focus outline
  is solid. The mobile timeout layout was inspected visually.
- Payment: all five nodes and all three scenarios exercised after extraction.
  Observed headings/outcomes remain Settle once / reserved to clearing;
  Release safely / reserved to available; Keep the question open / retained
  reservation pending or needs_review. Exactly one scenario stays selected.
- Browser error console after the inspected local interactions: zero entries.
- Independent read-only review: **APPROVE**, no actionable findings. Automated
  source comparison found unchanged payment node/scenario data and JSX after
  prop substitution. The reviewer checked Next.js boundaries, React patterns,
  accessibility, and AI accounting/outcome claims against backend source/evidence.

No new test framework or content-mirroring tests were added for this interface
change. The new interaction reuses the existing explorer and was verified in a
real browser, including the unchanged payment behavior. These checks are not new
backend TDD or backend test evidence. Backend regression and paid-provider runs
were not repeated for a portfolio interface change.

User-owned AGENTS.md and untracked .agents/ remain excluded. Hosted preview and
CI results are recorded in the pull request after push. A new merge requires its
own explicit user approval under the git-workflow Skill.
