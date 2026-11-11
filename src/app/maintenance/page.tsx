import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Project maintenance | William Decatoire",
  description: "November 2026 changes and verification for seven engineering projects.",
  alternates: { canonical: "/maintenance" },
};

type Report = {
  slug: string;
  title: string;
  changes: string;
  verification: string;
  evidence?: string;
};

const reports: readonly Report[] = [
  {
    slug: "payment-ledger-system",
    title: "Payment & Ledger System",
    changes: "Pinned both GitHub Actions to immutable commits and required pull requests and CI on main.",
    verification: "317 tests passed on PostgreSQL 17. Local HTTP checks and the payment settlement simulation passed, including replay and reconciliation.",
    evidence: "https://github.com/WYLLLY/payment-ledger-system/pull/6",
  },
  {
    slug: "ai-task-execution-platform",
    title: "AI Task Execution Platform",
    changes: "Command parsing now rejects out-of-range JSON exponents with HTTP 422. The README reflects the merged backend and the separate Taskroom draft. Main requires a pull request and CI.",
    verification: "832 backend tests and 14 Taskroom tests passed. Verification on disposable stacks covered a Redis outage, lost HTTP response, restart, encrypted restore, and simulated task creation, replay, and cancellation through the Taskroom gateway.",
    evidence: "https://github.com/WYLLLY/ai-task-execution-platform/pull/9",
  },
  {
    slug: "fraud-detection-ml-service",
    title: "Fraud Detection ML Service",
    changes: "Pinned CI actions and Trivy, restored the scan artifacts, and upgraded the image to SQLite 3.54.1. The image policy requires exact package and runtime evidence for the three verified vendor fixes. Main requires a pull request and both CI jobs.",
    verification: "142 tests passed. The 60,000-record experiment and read-only synthetic Payment integration were replayed. The raw Trivy result reported 47 HIGH occurrences. The local-only gate records three verified vendor fixes and 44 existing exceptions expiring on November 28, 2026.",
    evidence: "https://github.com/WYLLLY/fraud-detection-ml-service/pull/5",
  },
  {
    slug: "multi-tenant-saas-platform",
    title: "Multi-tenant SaaS Platform",
    changes: "Made the Ubuntu security update reproducible without archive DNS, updated libxslt in the nginx image, and separated Chromium setup from the browser tests.",
    verification: "189 tests passed, including 12 desktop and mobile HTTPS checks. The disposable restoration drill, proxy verification, and HIGH/CRITICAL scans of both images passed.",
  },
  {
    slug: "python-code-analyzer",
    title: "Python Code Analyzer",
    changes: "Recorded an independent review of AST-only analysis, import resolution, dependency cycles, metrics, and reporting. The application code stayed the same.",
    verification: "682 tests passed. The clean wheel passed its CI checks. An independent reachability oracle matched results on 1,000 generated graphs. Synthetic inputs confirmed deterministic JSON and no target execution.",
  },
  {
    slug: "security-log-analyzer",
    title: "Security Log Analyzer",
    changes: "Integrated the SSH detection and reporting milestones. The offline CLI correlates three configurable patterns and produces terminal and JSON reports with supporting events.",
    verification: "156 tests passed. An independent reference model matched alerts on 90,000 synthetic events. A benign one-million-line workload completed with bounded state. Detection accuracy on real-world logs was outside the test scope.",
  },
  {
    slug: "snapshot-backup-engine",
    title: "Snapshot Backup Engine",
    changes: "Recorded an independent maintenance review of backup, restoration, integrity checks, and recovery. The application code stayed the same.",
    verification: "89 maintained tests and 15 independent checks passed. Tests used real files and SQLite, including process interruption, corrupt objects, and historical restores. Power-loss behavior was outside the test scope.",
  },
];

export default function MaintenancePage() {
  return (
    <main id="main" className="shell case-study">
      <Link href="/#projects" className="back-link">← Back to projects</Link>
      <header className="case-header">
        <p className="eyebrow"><time dateTime="2026-11">November 2026</time></p>
        <h1>Project maintenance</h1>
        <p className="case-deck">Changes, verification runs, and remaining limits across seven engineering projects.</p>
        <p>GitHub enforces pull requests and CI on the three public repositories. The four private repositories use independently reviewed pull requests with passing CI. Repository rulesets are unavailable on their current GitHub plan.</p>
      </header>
      <nav aria-label="Maintenance reports" className="case-section-body">
        <ul>
          {reports.map(({ slug, title }) => (
            <li key={slug}><a className="inline-link" href={`#${slug}`}>{title}</a></li>
          ))}
        </ul>
      </nav>
      <div className="case-content">
        {reports.map(({ slug, title, changes, verification, evidence }) => (
          <section key={slug} id={slug} className="case-section" aria-labelledby={`${slug}-title`}>
            <h2 id={`${slug}-title`}>{title}</h2>
            <div className="case-section-body">
              <p>{changes}</p>
              <p>{verification}</p>
              {evidence && <p><a href={evidence} className="inline-link">GitHub change and verification</a></p>}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
