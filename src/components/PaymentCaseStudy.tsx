import Link from "next/link";
import type { Project } from "@/content/projects";
import { PaymentArchitecture } from "./PaymentArchitecture";
import { StatusBadge } from "./StatusBadge";

const decisions = [
  {
    number: "01",
    title: "Make the database the authority.",
    decision: "PostgreSQL enforces balanced, immutable journal entries and nonnegative user balances. A transfer locks its accounts in a stable order and posts within one transaction.",
    reason: "Financial correctness cannot depend on a request handler running to completion. Constraints and transaction boundaries still apply when requests race or processes fail.",
  },
  {
    number: "02",
    title: "Separate local commitment from remote work.",
    decision: "Payment creation commits the reservation, idempotency record, audit event, stored response, and outbox task together. The provider call runs after that commit.",
    reason: "An HTTP call cannot participate in the local database transaction. Durable work and a stable provider identity make an interrupted attempt recoverable.",
  },
  {
    number: "03",
    title: "Preserve uncertainty.",
    decision: "A timeout retains reserved funds. Recovery looks up the same provider identity; exhausted attempts move the payment to needs_review without releasing money.",
    reason: "Silence is not a refusal. Releasing an uncertain reservation could allow the same funds to be spent while an accepted payment is still settling.",
  },
];

const evidence = [
  {
    label: "Financial invariants",
    detail: "Real PostgreSQL tests cover balanced journal posting, immutable entries, nonnegative balances, privilege boundaries, and migrations.",
  },
  {
    label: "Concurrent operations",
    detail: "Integration tests exercise competing requests, duplicate idempotency keys, lock ordering, and retry behavior.",
  },
  {
    label: "Recovery paths",
    detail: "Tests cover provider ambiguity, stale worker generations, crashes, reconciliation, and terminal outcomes.",
  },
  {
    label: "Operational signals",
    detail: "Structured logs carry correlation IDs; internal metrics expose outbox age, expired leases, and pending or needs_review payments.",
  },
];

export function PaymentCaseStudy({ project }: { project: Project }) {
  return (
    <main id="main" className="ledger-page">
      <div className="ledger-wrap shell">
        <Link href="/#projects" className="ledger-back"><span aria-hidden="true">←</span> Selected projects</Link>

        <header className="ledger-hero">
          <div className="ledger-hero-main">
            <p className="ledger-kicker">01 / PERSONAL ENGINEERING PROJECT</p>
            <h1>Payment &amp;<br />Ledger <em>System.</em></h1>
            <p className="ledger-deck">A financial backend designed around the hardest question in payments: what remains true when a request, worker, or external provider fails?</p>
          </div>
          <aside className="ledger-hero-aside" aria-label="Project details">
            <div className="ledger-aside-status"><span>PROJECT STATUS</span><StatusBadge status={project.status} /></div>
            <div className="ledger-aside-field"><span>FOCUS</span><p>Financial correctness<br />&amp; recoverable payments</p></div>
            <div className="ledger-aside-field"><span>IMPLEMENTED WITH</span><p>Python · FastAPI<br />PostgreSQL · SQLAlchemy</p></div>
            <div className="ledger-aside-field"><span>BOUNDARY</span><p>Fictional funds<br />Simulated external provider</p></div>
          </aside>
        </header>

        <div className="ledger-fact-strip" aria-label="Verified project facts">
          <div><strong>06</strong><span>MILESTONES MERGED</span></div>
          <div><strong>317</strong><span>MAINTAINED TESTS PASSED</span></div>
          <div><strong>0</strong><span>FAILED OR SKIPPED</span></div>
          <div><strong>13 OCT 2026</strong><span>VERIFIED ON MAIN</span></div>
        </div>

        <section className="ledger-section ledger-intro" aria-labelledby="ledger-intro-title">
          <p className="ledger-section-index">01 / THE PROBLEM</p>
          <div>
            <h2 id="ledger-intro-title">A timeout is<br /><em>not a refusal.</em></h2>
            <div className="ledger-intro-copy">
              <p>The system supports wallets in EUR, USD, and JPY, internal transfers, and outgoing payments. Each financial movement produces immutable double-entry ledger postings in PostgreSQL.</p>
              <p>Concurrent requests must not spend the same balance twice. A repeated idempotency key must not create a second transfer or payment. If a provider response is lost, the system must recover its outcome without guessing and without silently releasing reserved funds.</p>
              <p className="ledger-muted-note">Money is represented in integer minor units. There is no currency conversion.</p>
            </div>
          </div>
        </section>

        <section className="ledger-section ledger-architecture" aria-labelledby="ledger-architecture-title">
          <div className="ledger-section-heading"><p className="ledger-section-index">02 / SYSTEM ARCHITECTURE</p><div><h2 id="ledger-architecture-title">Where correctness lives.</h2><p>The diagram follows an implemented outgoing payment. Select a component and an outcome to inspect the recovery path.</p></div></div>
          <PaymentArchitecture />
        </section>

        <section className="ledger-section ledger-decisions" aria-labelledby="ledger-decisions-title">
          <div className="ledger-section-heading"><p className="ledger-section-index">03 / ENGINEERING DECISIONS</p><div><h2 id="ledger-decisions-title">Decisions under failure.</h2><p>Three boundaries make the behavior explicit when normal execution stops.</p></div></div>
          <div className="ledger-decision-list">
            {decisions.map((item) => <article className="ledger-decision" key={item.number}>
              <span className="ledger-decision-number">{item.number}</span>
              <h3>{item.title}</h3>
              <div><span>DESIGN</span><p>{item.decision}</p></div>
              <div><span>WHY</span><p>{item.reason}</p></div>
            </article>)}
          </div>
        </section>

        <section className="ledger-section ledger-evidence" aria-labelledby="ledger-evidence-title">
          <div className="ledger-section-heading"><p className="ledger-section-index">04 / ENGINEERING EVIDENCE</p><div><h2 id="ledger-evidence-title">Verified behavior,<br /><em>not inferred scale.</em></h2><p>Results from the merged main revision, verified on 13 October 2026. The private backend repository is not linked publicly.</p></div></div>
          <div className="ledger-evidence-grid">
            <div className="ledger-test-count"><strong>317</strong><span>TESTS PASSED</span><p>31 unit · 286 integration<br />0 failed · 0 skipped</p><small>Real PostgreSQL integration suite</small></div>
            <div className="ledger-evidence-list">{evidence.map((item, index) => <div key={item.label}><span>0{index + 1}</span><h3>{item.label}</h3><p>{item.detail}</p></div>)}</div>
          </div>
          <p className="ledger-evidence-footnote">Ruff, formatting, strict mypy, and GitHub Actions passed. These checks establish tested behavior, not a throughput benchmark or production certification.</p>
        </section>

        <section className="ledger-section ledger-boundaries" aria-labelledby="ledger-boundaries-title">
          <p className="ledger-section-index">05 / LIMITS &amp; NEXT QUESTIONS</p>
          <div><h2 id="ledger-boundaries-title">Keep the boundary visible.</h2><div><p>This is a personal engineering project using fictional funds and a simulated provider. It has no real banking integration, refunds, foreign exchange, public backend deployment, or public source access.</p><p>Unknown provider outcomes retain their reservation; there is no force-release command. Production load, backup restoration, host or disk loss, and dependency vulnerabilities have not been independently qualified. Those remain separate validation work, not claimed results.</p></div></div>
        </section>

        <Link href="/#projects" className="ledger-bottom-link"><span aria-hidden="true">←</span> Back to selected projects</Link>
      </div>
    </main>
  );
}
