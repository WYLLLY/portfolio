import type { Project } from "@/content/projects";
import { CaseStudy } from "./CaseStudy";
import styles from "./AnalyzerCaseStudy.module.css";
import securityStyles from "./SecurityLogCaseStudy.module.css";

const stages = ["Local SSH logs", "Typed UTC events", "Time windows", "Rules & evidence", "Terminal / JSON"];

export function SecurityLogCaseStudy({ project }: { project: Project }) {
  return (
    <CaseStudy project={project}>
      <section className={`case-section ${securityStyles.section}`} aria-labelledby="security-log-pipeline">
        <h2 id="security-log-pipeline">From log lines to evidence</h2>
        <div className="case-section-body">
          <p>Local files become normalized authentication events, then rule-based alerts with exact counts, time windows and source references.</p>
          <ol className={styles.pipeline} aria-label="SSH analysis stages">
            {stages.map((stage, index) => (
              <li key={stage}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong></li>
            ))}
          </ol>
          <div className={styles.console}>
            <p>Selected terminal lines / verified synthetic fixture</p>
            <pre tabIndex={0} role="region" aria-label="Selected SSH terminal output, scroll horizontally"><code>{`$ security-log-analyzer analyze tests/fixtures/detection-positive.log

HIGH SSH-002 — srv-demo / 198.51.100.50 / all accounts
Detected: 2026-11-05T10:00:04.000000Z
Trigger: src-001:5

MEDIUM SSH-001 — srv-demo / 198.51.100.50 / all accounts
Detected: 2026-11-05T10:00:09.000000Z
Trigger: src-001:10

HIGH SSH-003 — srv-demo / 198.51.100.50 / alice
Detected: 2026-11-05T10:00:10.000000Z
Trigger: src-001:11`}</code></pre>
          </div>
          <p className={styles.caption}>Selected lines from the bundled reference scenario, with supporting events omitted here for brevity. The complete report contains 11 events and three alerts; exit code 1 means complete analysis with alerts. This is an explanation of local behavior, not a live log-analysis service.</p>
        </div>
      </section>
    </CaseStudy>
  );
}
