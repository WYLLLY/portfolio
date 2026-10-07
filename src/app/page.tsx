import { ProjectRow } from "@/components/ProjectRow";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function Home() {
  return (
    <main id="main">
      <section className="hero shell" aria-labelledby="hero-title">
        <p className="eyebrow"><span className="eyebrow-rule" />{site.role}</p>
        <h1 id="hero-title">{site.name}</h1>
        <p className="hero-description">{site.headline}</p>
      </section>

      <section className="projects-section shell" id="projects" aria-labelledby="projects-title">
        <div className="section-heading">
          <div>
            <p className="section-index">01 / WORK</p>
            <h2 id="projects-title">Selected Projects</h2>
          </div>
          <p>Personal engineering projects<br />currently in development.</p>
        </div>
        <div className="project-list">
          {projects.map((project, index) => <ProjectRow key={project.slug} project={project} index={index} />)}
        </div>
      </section>

      <section className="engineering-section shell" id="engineering" aria-labelledby="engineering-title">
        <div className="section-heading">
          <div>
            <p className="section-index">02 / APPROACH</p>
            <h2 id="engineering-title">Engineering</h2>
          </div>
        </div>
        <div className="section-copy">
          <p>I focus on backend engineering with Python, building reliable APIs and data-intensive systems.</p>
        </div>
        <div className="capability-list" aria-label="Engineering skills">
          <div className="capability-row">
            <h3>Backend focus</h3>
            <p>FastAPI, PostgreSQL, SQLAlchemy, Redis, and asynchronous processing. My work spans API design, data modeling, transactions, concurrency, idempotency, authentication, testing, and distributed-system fundamentals.</p>
          </div>
          <div className="capability-row">
            <h3>Engineering workflow</h3>
            <p>Git, Docker, pytest, Ruff, Pyright, GitHub Actions, and AI coding agents such as Codex. I use specifications, automated tests, code review, and validation to guide the work.</p>
          </div>
          <div className="capability-row">
            <h3>Currently developing</h3>
            <p>I am building practical experience with message queues, observability, cloud infrastructure, Terraform, Kubernetes, and AI/LLM backend systems.</p>
          </div>
        </div>
      </section>

      <section className="contact-section shell" id="contact" aria-labelledby="contact-title">
        <div className="section-heading">
          <div>
            <p className="section-index">03 / CONNECT</p>
            <h2 id="contact-title">Contact</h2>
          </div>
        </div>
        <div className="contact-content">
          <p>Interested in discussing a Software or Backend Engineering opportunity?</p>
          <a className="contact-email" href={`mailto:${site.email}`}>{site.email}<span aria-hidden="true">↗</span></a>
          <a className="text-link" href={site.github}>View GitHub profile <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </main>
  );
}
