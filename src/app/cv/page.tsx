import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "CV | William Decatoire",
  description: "English and French CVs for software engineering roles, with seven evidence-based personal engineering projects.",
  alternates: { canonical: "/cv" },
};

export default function CvPage() {
  return (
    <main id="main" className={`shell ${styles.page}`}>
      <Link href="/" className="back-link">← Back to portfolio</Link>
      <header className={styles.header}>
        <p className="eyebrow">William Decatoire</p>
        <h1>Curriculum vitae</h1>
        <p>Software Engineer · Backend Engineering<br />Paris, France</p>
      </header>
      <section className={styles.section} aria-labelledby="cv-downloads">
        <h2 id="cv-downloads">Download my CV</h2>
        <p>One A4 page. Available in English and French.</p>
        <div className={styles.downloads}>
          <a href="/cv/William_Decatoire_CV_EN.pdf" download lang="en">English CV <span>PDF ↗</span></a>
          <a href="/cv/William_Decatoire_CV_FR.pdf" download lang="en">French CV <span>PDF ↗</span></a>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="cv-certification-goals">
        <h2 id="cv-certification-goals">Certification goals</h2>
        <p>Target certifications; not yet earned.</p>
        <ul className={styles.projects}>{site.certificationGoals.map((goal) => <li key={goal.code}><a href={goal.href}>{goal.code} — {goal.title}</a></li>)}</ul>
      </section>
      <section className={styles.section} aria-labelledby="cv-projects">
        <h2 id="cv-projects">Explore the projects</h2>
        <p>Seven personal engineering projects. Each study distinguishes verified work from work still in development.</p>
        <ul className={styles.projects}>
          {projects.map((project) => (
            <li key={project.slug}>
              <Link href={`/projects/${project.slug}`}>{project.title} <span aria-hidden="true">↗</span></Link>
              <p>{project.summary}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
