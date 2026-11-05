import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "CV | William Decatoire",
  description: "English and French CVs for junior Python developer roles, with links to four personal projects.",
  alternates: { canonical: "/cv" },
};

const repositories = [
  { slug: "python-code-analyzer", title: "Python Code Analyzer", detail: "Static import graphs, iterative cycle detection and deterministic JSON reports. 682 tests; source available on request." },
  { slug: "payment-ledger-system", title: "Payment & Ledger System", detail: "Immutable double-entry ledger, atomic transfers and recoverable payments with a simulated provider." },
  { slug: "ai-task-execution-platform", title: "AI Task Execution Platform", detail: "Durable task execution, bounded tools, cost accounting and event streaming. Provider verification uses simulations." },
  { slug: "fraud-detection-ml-service", title: "Fraud Detection ML Service", detail: "Synthetic-risk model comparison and local inference API. Experimental results do not establish real fraud accuracy." },
];

export default function CvPage() {
  return (
    <main id="main" className={`shell ${styles.page}`}>
      <Link href="/" className="back-link">← Back to portfolio</Link>
      <header className={styles.header}>
        <p className="eyebrow">William Decatoire</p>
        <h1>Curriculum vitae</h1>
        <p>Junior Python Developer<br />Paris, France</p>
      </header>
      <section className={styles.section} aria-labelledby="cv-downloads">
        <h2 id="cv-downloads">Download my CV</h2>
        <p>One A4 page. Available in English and French.</p>
        <div className={styles.downloads}>
          <a href="/cv/William_Decatoire_CV_EN.pdf" download lang="en">English CV <span>PDF ↗</span></a>
          <a href="/cv/William_Decatoire_CV_FR.pdf" download lang="fr">CV français <span>PDF ↗</span></a>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="cv-certification-goals">
        <h2 id="cv-certification-goals">Certification goals</h2>
        <p>Target certifications; not yet earned.</p>
        <ul className={styles.projects}>{site.certificationGoals.map((goal) => <li key={goal.code}><a href={goal.href}>{goal.code} — {goal.title}</a></li>)}</ul>
      </section>
      <section className={styles.section} aria-labelledby="cv-projects">
        <h2 id="cv-projects">Explore the projects</h2>
        <p>Four personal engineering projects. Public repositories are linked where available.</p>
        <ul className={styles.projects}>
          {repositories.map((project) => (
            <li key={project.slug}>
              <a href={project.slug === "python-code-analyzer" ? "/projects/python-code-analyzer" : `https://github.com/WYLLLY/${project.slug}`}>{project.title} <span aria-hidden="true">↗</span></a>
              <p>{project.detail}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
