import type { Project } from "@/content/projects";
import { CaseStudy } from "./CaseStudy";
import styles from "./AnalyzerCaseStudy.module.css";

const stages = ["Source files", "Python AST", "Import graph", "Cycles & metrics", "Text / JSON"];

export function AnalyzerCaseStudy({ project }: { project: Project }) {
  return (
    <CaseStudy project={project}>
      <section className="case-section" aria-labelledby="analyzer-pipeline">
        <h2 id="analyzer-pipeline">Source analysis pipeline</h2>
        <div className="case-section-body">
          <p>The CLI reads Python source files, resolves imports where possible and reports cycles, metrics and uncertainty.</p>
          <ol className={styles.pipeline} aria-label="Analysis stages">
            {stages.map((stage, index) => (
              <li key={stage}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong></li>
            ))}
          </ol>
          <div className={styles.console}>
            <p>CLI output / bundled synthetic repository</p>
            <pre><code>{`$ pyanalyzer analyze examples/demo_project

Status: complete
Files parsed: 11
Internal edges: 12
Cyclic components: 1
High coupling modules: 1
High complexity files: 1

Witness: demo/a.py -> demo/b.py -> demo/a.py`}</code></pre>
          </div>
          <p className={styles.caption}>Excerpt from the verified demonstration. Its source files are parsed without executing the cycle or the optional dependency.</p>
        </div>
      </section>
    </CaseStudy>
  );
}
