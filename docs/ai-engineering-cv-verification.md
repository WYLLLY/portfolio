# AI Engineering presentation — 25 November 2026

This change names implemented AI capabilities without changing project order, the CV role, the site layout, typography or shared interaction components. Payment & Ledger remains the first CV project. The existing architecture explorer carries the demonstrations; no new public demo or additional case-study section is introduced.

## Claim checks

The public AI Task Execution Platform default branch was checked at `3b296351ef225bd94217d348e6f4516fde8b6b60`. Its separate Taskroom PR #8 is still open and draft.

| Capability | Implementation inspected | Presentation boundary |
| --- | --- | --- |
| Agent orchestration | `workflow.py`: sequential model/tool turns, persisted results and next-step creation; `analysis_worker.py`: one durable unit per lease | Bounded document-analysis agent; no claim of a general multi-agent runtime |
| Tool calling | `agent_protocol.py`, `workflow.py`: `search_documents` and `read_excerpt`, argument/cardinality validation, current owner and document rights | Read tools only; report delivery is orchestrator controlled; structural citation checks do not prove factual truth |
| LLM API integration | `responses.py`, `responses_workflow.py`, `openai_transport.py`: direct HTTPX Responses request, function schemas, structured report output, saved protocol items/call IDs | Adapter implemented and protocol tested with synthetic providers; paid live smoke and real-model quality validation unexecuted |
| Durable execution | `execution.py`, `worker.py`, `workflow.py`: PostgreSQL checkpoints, leases/generations, fencing, cancellation and recovery | PostgreSQL owns durable progress; Redis supplies wakeups and rate limiting |
| Retries and uncertainty | Bounded local transaction retry; transport `retries=0`; unknown provider outcomes retain provision and suspend work | No blanket claim of safe automatic LLM retries or exactly-once remote execution |
| Streaming | Owner-scoped SSE events and replay; Responses request has `stream=false` | Task progress streaming, not model-token streaming |
| Security | API-key/owner scoping, tool allowlist and document/version checks; worker-only provider credential | No prompt-injection immunity or production security guarantee |
| Observability | Allowlisted JSON logging, task/call correlation, operational metrics and integration tests | Implemented local instrumentation; no production operations or uptime claim |
| Other AI work | Fraud ML training/evaluation and local inference implementation inspected | Logistic regression/PyTorch experiments use synthetic data; no real-fraud accuracy claim |

## Compact CV changes

- Preserve the existing English one-column A4 design, original project order, role, contact information and employment/education history.
- Retain two AI project bullets; replace broad descriptions with tool calling, checkpoints, recovery, SSE and the Responses adapter, including the synthetic-provider caveat.
- Use the existing four skill paragraphs, including one AI Engineering line. Project text stays at its original 11 pt size.
- Retain the eight original PDF hyperlinks, selectable text and the absence of images/tables.
- The French PDF is unchanged. The editable English DOCX is delivered separately with the PDF.

## Evidence freshness

The prior portfolio's 832-test figure and 11 November date were replaced with the repository's [14–15 November recorded audit](https://github.com/WYLLLY/ai-task-execution-platform/blob/3b296351ef225bd94217d348e6f4516fde8b6b60/reviews/final-audit.md): 271 unit plus 563 integration tests. This is historical evidence, not a new backend test run. Taskroom's audit records 17 Node tests and local browser journeys; it remains a local draft extension. Obsolete image-vulnerability totals were removed rather than presented as current scans.

## Validation

- PASS: TypeScript, ESLint, Next.js production build and Git whitespace checks.
- PASS: rendered DOCX/PDF inspection; one A4 page, original reading order, unchanged hyperlink targets, native/selectable text, no images or tables, original 11 pt project body and text within margins.
- PASS: browser QA at 390 px and 1280 px; home/CV/AI routes have no horizontal overflow. All three architecture outcomes and tool-node selection work; Enter activates the scenario control. No browser warnings/errors were reported.
- PASS: 14 local pages/assets return HTTP 200; internal anchors from home/CV/AI resolve; served English CV is byte-identical to the reviewed artifact.
- PASS: independent read-only presentation review approved the code/claim correspondence, original CV order, compact footprint and document layout. It did not rerun backend tests or independently repeat the browser QA.

No backend application code was changed. No paid OpenAI call, new provider profile or backend deployment was performed. Publication requires review and the user's separate merge approval.
