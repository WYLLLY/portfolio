import Link from "next/link";
import type { Project } from "@/content/projects";
import { StatusBadge } from "./StatusBadge";

function CaseStudySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="case-section" aria-labelledby={`section-${title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`}>
      <h2 id={`section-${title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`}>{title}</h2>
      <div className="case-section-body">{children}</div>
    </section>
  );
}

export function CaseStudy({ project }: { project: Project }) {
  return (
    <main id="main" className="case-study shell">
      <Link href="/#projects" className="back-link"><span aria-hidden="true">←</span> All projects</Link>
      <header className="case-header">
        <p className="eyebrow"><span className="eyebrow-rule" />Personal Engineering Project</p>
        <h1>{project.title}</h1>
        <p className="case-deck">{project.summary}</p>
        <div className="case-meta"><StatusBadge /><span>{project.focus}</span></div>
      </header>

      <div className="development-note">
        <span className="note-marker" aria-hidden="true" />
        <p>This project is in development. The sections below describe its intended scope and validation plan. Implementation evidence will be added as the work progresses.</p>
      </div>

      <div className="case-content">
        <CaseStudySection title="Overview"><p>{project.overview}</p></CaseStudySection>
        <CaseStudySection title="Engineering Challenge"><p>{project.challenge}</p></CaseStudySection>
        <CaseStudySection title="Planned Scope">
          <ul>{project.plannedScope.map((item) => <li key={item}>{item}</li>)}</ul>
        </CaseStudySection>
        <CaseStudySection title="Validation Plan">
          <ul>{project.validationPlan.map((item) => <li key={item}>{item}</li>)}</ul>
        </CaseStudySection>
        {project.verifiedSections?.map((section) => (
          <CaseStudySection key={section.title} title={section.title}>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </CaseStudySection>
        ))}
        {project.repository && (
          <CaseStudySection title="Repository">
            <p><a className="inline-link" href={project.repository}>View project repository <span aria-hidden="true">↗</span></a></p>
          </CaseStudySection>
        )}
      </div>
      <Link href="/#projects" className="case-bottom-link"><span aria-hidden="true">←</span> Back to selected projects</Link>
    </main>
  );
}
