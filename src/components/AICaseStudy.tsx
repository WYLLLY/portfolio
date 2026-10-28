import Link from "next/link";
import type { Project } from "@/content/projects";
import { AIArchitecture } from "./AIArchitecture";
import { StatusBadge } from "./StatusBadge";

const decisions = [
  {
    number: "01",
    title: "Keep durable truth in PostgreSQL.",
    decision: "Task state, permissions, events, and accounting live in PostgreSQL. Workers poll the durable queue even when ephemeral Redis wakeups disappear.",
    reason: "An execution cannot depend on a notification arriving or a worker remembering its last step. Durable checkpoints survive ordinary process failure.",
  },
  {
    number: "02",
    title: "Authorize the exact call.",
    decision: "A claims a lease. B checks current authority and reserves task, owner, and global budgets atomically. External HTTP happens outside the transaction; C commits the accepted result and accounting.",
    reason: "Permission changes, competing reservations, and stale workers must be resolved at explicit transaction boundaries. Provider strict mode does not replace server validation.",
  },
  {
    number: "03",
    title: "Keep uncertainty accounted for.",
    decision: "An ambiguous model call suspends the task and retains its provision. Settlement deduplicates evidence, replaces provision with confirmed charges, and records actual overruns in full.",
    reason: "A timeout does not establish zero cost. Automatic regeneration could create overlapping work and additional charges; affected new authorizations remain blocked after an overrun until explicit administrative acknowledgement.",
  },
];

const evidence = [
  { label: "Durability & concurrency", detail: "Real PostgreSQL tests cover migrations, privileges, lock contention, concurrent reservations, stale workers, lost commit acknowledgements, and crash recovery." },
  { label: "Tools & permissions", detail: "Server checks enforce owner and document rights, permitted tool names, argument schemas, cardinality, citations, and structured output. The API receives no OpenAI key." },
  { label: "Accounting & protocols", detail: "Synthetic Responses contracts cover functional rejection and billable usage. Settlement covers repeated evidence, revisions, UTC attribution, old provisions, and overruns." },
  { label: "Progress & recovery", detail: "Real Redis outage checks hold 100 SSE streams while reads, replay, heartbeat, and PostgreSQL execution continue. Encrypted restore drills exercise quarantine and evidence-based reopening." },
];

export function AICaseStudy({ project }: { project: Project }) {
  const paragraphs = (title: string) => project.verifiedSections?.find((section) => section.title === title)?.paragraphs ?? [];

  return (
    <main id="main" className="ledger-page">
      <div className="ledger-wrap shell">
        <Link href="/#projects" className="ledger-back"><span aria-hidden="true">←</span> Selected projects</Link>

        <header className="ledger-hero">
          <div className="ledger-hero-main">
            <p className="ledger-kicker">03 / PERSONAL ENGINEERING PROJECT</p>
            <h1>AI Task<br />Execution <em>Platform.</em></h1>
            <p className="ledger-deck">An AI backend designed around what survives a worker crash, a lost response, or a model call whose cost is still unknown.</p>
          </div>
          <aside className="ledger-hero-aside" aria-label="Project details">
            <div className="ledger-aside-status"><span>PROJECT STATUS</span><StatusBadge status={project.status} /></div>
            <div className="ledger-aside-field"><span>FOCUS</span><p>Durable AI workflows<br />&amp; accountable execution</p></div>
            <div className="ledger-aside-field"><span>IMPLEMENTED WITH</span><p>Python · FastAPI<br />PostgreSQL · Redis · HTTPX</p></div>
            <div className="ledger-aside-field"><span>BOUNDARY</span><p>Synthetic provider verification<br />Paid OpenAI smoke skipped</p></div>
          </aside>
        </header>

        <div className="ledger-fact-strip" aria-label="Verified project facts">
          <div><strong>07</strong><span>MILESTONES MERGED</span></div>
          <div><strong>828</strong><span>MAINTAINED TESTS PASSED</span></div>
          <div><strong>0</strong><span>SUITE FAILURES / ERRORS / SKIPS</span></div>
          <div><strong>28 OCT 2026</strong><span>VERIFIED ON MAIN</span></div>
        </div>

        <section className="ledger-section ledger-intro" aria-labelledby="ai-intro-title">
          <p className="ledger-section-index">01 / THE PROBLEM</p>
          <div>
            <h2 id="ai-intro-title">The response is lost.<br /><em>The cost is not.</em></h2>
            <div className="ledger-intro-copy">
              <p>{project.overview}</p>
              <p>{project.challenge}</p>
              <p className="ledger-muted-note">Integer micro-USD · versioned model, tariff, tokenizer, and limits · no automatic regeneration of ambiguous calls</p>
            </div>
          </div>
        </section>

        <section className="ledger-section ledger-architecture" aria-labelledby="ai-architecture-title">
          <div className="ledger-section-heading"><p className="ledger-section-index">02 / SYSTEM ARCHITECTURE</p><div><h2 id="ai-architecture-title">Where progress becomes durable.</h2><p>Select a component and an outcome to inspect the boundaries between task admission, external work, and cost reconciliation.</p></div></div>
          <AIArchitecture />
          <p className="ledger-evidence-footnote">The model can request only search_documents and read_excerpt. Report delivery is orchestrator-only. Responses call IDs and required protocol items persist privately with store=false, without depending on previous_response_id.</p>
        </section>

        <section className="ledger-section ledger-decisions" aria-labelledby="ai-decisions-title">
          <div className="ledger-section-heading"><p className="ledger-section-index">03 / ENGINEERING DECISIONS</p><div><h2 id="ai-decisions-title">Decisions under failure.</h2><p>Three boundaries keep progress, permissions, and financial exposure explicit when execution stops.</p></div></div>
          <div className="ledger-decision-list">
            {decisions.map((item) => <article className="ledger-decision" key={item.number}>
              <span className="ledger-decision-number">{item.number}</span>
              <h3>{item.title}</h3>
              <div><span>DESIGN</span><p>{item.decision}</p></div>
              <div><span>WHY</span><p>{item.reason}</p></div>
            </article>)}
          </div>
        </section>

        <section className="ledger-section ledger-evidence" aria-labelledby="ai-evidence-title">
          <div className="ledger-section-heading"><p className="ledger-section-index">04 / ENGINEERING EVIDENCE</p><div><h2 id="ai-evidence-title">Verified behavior,<br /><em>visible limits.</em></h2><p>Results from merged main, verified on 28 October 2026. Independent post-merge code review: APPROVE. Source remains private.</p></div></div>
          <div className="ledger-evidence-grid">
            <div className="ledger-test-count"><strong>828</strong><span>TESTS PASSED</span><p>268 unit · 560 integration<br />0 failed · 0 errors · 0 skipped</p><small>Real PostgreSQL &amp; Redis</small></div>
            <div className="ledger-evidence-list">{evidence.map((item, index) => <div key={item.label}><span>0{index + 1}</span><h3>{item.label}</h3><p>{item.detail}</p></div>)}</div>
          </div>
          <p className="ledger-evidence-footnote">Ruff, formatting, mypy, and GitHub Actions passed. The 828-case suite uses synthetic providers. Paid OpenAI smoke is separately SKIPPED: distinct paid authorization and a spending cap were absent.</p>
          <p className="ledger-evidence-footnote">M3–M7 retain behavioral Red/Green evidence. M1/M2 test-first chronology remains unverified under a documented, owner-accepted exception.</p>
        </section>

        <section className="ledger-section ledger-boundaries" aria-labelledby="ai-performance-title">
          <p className="ledger-section-index">05 / MEASURED WORKLOAD</p>
          <div><h2 id="ai-performance-title">1,000 tasks.<br />A defined workload.</h2><div>{paragraphs("Performance Evidence").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><p className="ledger-evidence-footnote">1,000 / 1,000 succeeded · 100 concurrent SSE connections · 10,016 reads · zero nominal stream errors or duplicate simulated effects</p></div>
        </section>

        <section className="ledger-section ledger-boundaries" aria-labelledby="ai-recovery-title">
          <p className="ledger-section-index">06 / FAILURE EXPERIMENTS</p>
          <div><h2 id="ai-recovery-title">Practice the interruption.</h2><div>{paragraphs("Failure Experiments").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div>
        </section>

        <section className="ledger-section ledger-boundaries" aria-labelledby="ai-boundaries-title">
          <p className="ledger-section-index">07 / LIMITS &amp; NEXT QUESTIONS</p>
          <div><h2 id="ai-boundaries-title">Keep the boundary visible.</h2><div>{paragraphs("Limitations").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><p className="ledger-evidence-footnote">Server validation limits allowed actions; it does not promise prompt-injection immunity. Local fencing cannot establish exactly-once physical execution.</p></div>
        </section>

        <Link href="/#projects" className="ledger-bottom-link"><span aria-hidden="true">←</span> Back to selected projects</Link>
      </div>
    </main>
  );
}
