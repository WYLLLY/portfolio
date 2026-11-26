import Link from "next/link";
import { ProjectRow } from "@/components/ProjectRow";
import { StatusBadge } from "@/components/StatusBadge";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

const [payment, , ai, , analyzer] = projects;
const featuredSlugs = [payment.slug, ai.slug, analyzer.slug];
const additionalProjects = projects.filter((project) => project.status === "completed" && !featuredSlugs.includes(project.slug));
const developingProjects = projects.filter((project) => project.status !== "completed");
const completedCount = projects.filter((project) => project.status === "completed").length;
const developingCount = projects.filter((project) => project.status === "in-development").length;
const plannedCount = projects.filter((project) => project.status === "planned").length;

export default function Home() {
  return (
    <main id="main" className="home-page">
      <section className="home-hero shell" aria-labelledby="home-title">
        <div className="home-hero-topline">
          <span>Independent engineering portfolio</span>
          <span>Selected work · 2026</span>
        </div>
        <div className="home-hero-grid">
          <div className="home-hero-identity">
            <p className="home-hero-kicker"><span className="home-kicker-mark" />William Decatoire <span className="home-kicker-separator">/</span> {site.role}</p>
            <h1 id="home-title">Systems that<br /><em>hold.</em></h1>
          </div>
          <div className="home-hero-position">
            <span className="home-rail-label">BACKEND ENGINEERING / SELECTED WORK</span>
            <p>{site.headline}</p>
            <p className="home-availability">{site.availability} · {site.english}</p>
            <a href="#projects" className="home-inline-link">Explore selected work <span aria-hidden="true">↘</span></a>
            <Link href="/cv" className="home-inline-link home-cv-link">View CV</Link>
          </div>
        </div>
        <div className="home-hero-baseline" aria-label="Engineering focus">
          <span>Correctness</span><span>Failure recovery</span><span>Operational clarity</span>
        </div>
      </section>

      <section className="home-projects shell" id="projects" aria-labelledby="projects-title">
        <div className="home-section-header">
          <div>
            <p className="home-section-index">01 / SELECTED WORK</p>
            <h2 id="projects-title">Systems, examined closely.</h2>
          </div>
          <p>{completedCount} completed projects. {developingCount} in development. {plannedCount} planned.<br />All are personal engineering work.<br /><Link href="/maintenance" className="inline-link">November maintenance reports</Link></p>
        </div>

        <div className="home-project-grid">
          <Link className="home-featured-project home-project-link" href={"/projects/" + payment.slug}>
            <div className="home-featured-copy">
              <div className="home-project-overline"><span>01 / FEATURED CASE STUDY</span><StatusBadge status={payment.status} /></div>
              <h3>{payment.title}</h3>
              <p>{payment.summary}</p>
              <div className="home-project-foot"><span>Financial correctness · FastAPI · PostgreSQL</span><span className="home-link-arrow" aria-hidden="true">↗</span></div>
            </div>
            <div className="home-ledger-preview" aria-hidden="true">
              <div className="home-preview-head"><span>PAYMENT / BEHAVIOR MAP</span><span>IMPLEMENTED</span></div>
              <div className="home-preview-code">
                <div><span>01</span><code><b>POST</b> /payments</code></div>
                <div className="home-preview-code-gap"><span>02</span><code> </code></div>
                <div><span>03</span><code><b>BEGIN</b> transaction</code></div>
                <div><span>04</span><code><i>↳</i> reserve balance</code></div>
                <div><span>05</span><code><i>↳</i> append ledger entries</code></div>
                <div><span>06</span><code><i>↳</i> persist outbox task</code></div>
                <div><span>07</span><code><b>COMMIT</b></code></div>
                <div><span>08</span><code><i>↳</i> 202 Accepted</code></div>
              </div>
              <div className="home-preview-state"><span>WHEN THE PROVIDER TIMES OUT</span><strong>Funds stay reserved.</strong></div>
              <div className="home-preview-caption">Simplified behavior map, based on the implemented payment path. Not a captured log.</div>
            </div>
          </Link>

          <Link className="home-ai-project home-project-link" href={"/projects/" + ai.slug}>
            <div className="home-card-overline"><span>02 / AI BACKEND</span><StatusBadge status={ai.status} /></div>
            <div className="home-ai-graphic" aria-hidden="true"><span>queued</span><span className="home-ai-active">running<span className="home-ai-pulse" /></span><span>succeeded</span></div>
            <div className="home-card-bottom"><div><h3>{ai.title}</h3><p>{ai.summary}</p></div><span className="home-link-arrow" aria-hidden="true">↗</span></div>
            <span className="home-project-disclaimer">Bounded tool calling / durable execution</span>
          </Link>

          <Link className="home-order-project home-project-link" href={"/projects/" + analyzer.slug}>
            <div className="home-card-overline"><span>03 / DEVELOPER TOOLING</span><StatusBadge status={analyzer.status} /></div>
            <div className="home-order-graphic" aria-hidden="true"><span>source</span><span>AST</span><span>graph</span><span>report</span></div>
            <div className="home-card-bottom"><div><h3>{analyzer.title}</h3><p>{analyzer.summary}</p></div><span className="home-link-arrow" aria-hidden="true">↗</span></div>
            <span className="home-project-disclaimer">Static analysis / no target execution</span>
          </Link>
        </div>
        <div className="project-list">{additionalProjects.map((project, index) => <ProjectRow key={project.slug} project={project} index={index + 3} />)}</div>
        <h3 className="home-work-in-progress">Work in progress</h3>
        <div className="project-list">{developingProjects.map((project, index) => <ProjectRow key={project.slug} project={project} index={index + completedCount} />)}</div>
      </section>

      <section className="home-engineering shell" id="engineering" aria-labelledby="engineering-title">
        <div className="home-section-header">
          <div><p className="home-section-index">02 / ENGINEERING</p><h2 id="engineering-title">How I work.</h2></div>
          <p>Systems are shaped by the decisions that remain sound when conditions change.</p>
        </div>
        <div className="home-engineering-grid">
          <p className="home-engineering-intro">I focus on backend engineering with Python, building reliable APIs and data-intensive systems.</p>
          <div className="home-capabilities" aria-label="Engineering skills">
            <div><h3>Backend focus</h3><p>FastAPI, PostgreSQL, SQLAlchemy, Redis, and asynchronous processing. My work spans API design, data modeling, transactions, concurrency, idempotency, authentication, testing, and durable AI workflows with validated tool calling.</p></div>
            <div><h3>Languages & systems</h3><p>Python is my main language. I also use SQL and Bash, have a good working knowledge of Java, and work comfortably in Linux.</p></div>
            <div><h3>Engineering workflow</h3><p>I use Git, Docker, pytest, Ruff, mypy, GitHub Actions, and AI coding agents such as Codex. I work from clear specifications, write tests before implementation, review changes independently, and verify behavior against real PostgreSQL and Redis.</p></div>
            <div><h3>Certification goals</h3><p>Targeting {site.certificationGoals.map((goal, index) => <span key={goal.code}>{index > 0 ? " and " : ""}<a className="inline-link" href={goal.href}>{goal.code} — {goal.title}</a></span>)}. These are goals, not certifications already earned.</p></div>
            <div><h3>Currently developing</h3><p>I am building practical experience with message queues, observability, cloud infrastructure, Terraform, Kubernetes, and production operations.</p></div>
          </div>
        </div>
      </section>

      <section className="home-contact shell" id="contact" aria-labelledby="contact-title">
        <p className="home-section-index">03 / CONTACT</p>
        <div className="home-contact-grid"><h2 id="contact-title">Let&apos;s talk<br /><em>engineering.</em></h2><div><p>I am looking for a junior Software or Backend Engineering role. Based in Paris · {site.availability.toLowerCase()} · {site.english}.</p><a className="home-contact-email" href={"mailto:" + site.email}>{site.email} <span aria-hidden="true">↗</span></a><a className="home-inline-link" href={site.github}>View GitHub profile <span aria-hidden="true">↗</span></a></div></div>
      </section>
    </main>
  );
}
