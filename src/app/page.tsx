import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

const [payment, orders, ai, production] = projects;

export default function Home() {
  return (
    <main id="main" className="home-page">
      <section className="home-hero shell" aria-labelledby="home-title">
        <div className="home-hero-topline">
          <span>William Decatoire / Backend Engineer</span>
          <span>Selected work · 2026</span>
        </div>
        <div className="home-hero-grid">
          <div className="home-hero-identity">
            <p className="home-hero-kicker"><span className="home-kicker-mark" />Independent engineering portfolio</p>
            <h1 id="home-title">William<span>Decatoire<span className="home-title-period">.</span></span></h1>
          </div>
          <div className="home-hero-position">
            <span className="home-rail-label">01 — 04 / BACKEND SYSTEMS</span>
            <p>{site.headline}</p>
            <a href="#projects" className="home-inline-link">Explore selected work <span aria-hidden="true">↘</span></a>
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
          <p>One completed system. Three projects in development.<br />All are personal engineering work.</p>
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
              <div className="home-preview-head"><span>IMPLEMENTED PAYMENT PATH</span><span>01 / 03</span></div>
              <div className="home-preview-request"><span>POST /payments</span><span>202 ACCEPTED</span></div>
              <div className="home-preview-flow"><span>available</span><i /><span>reserved</span><i /><span>provider</span></div>
              <div className="home-preview-journal"><span>JOURNAL</span><span>− available</span><span>+ reserved</span></div>
              <div className="home-preview-caption">One transaction commits the reservation and durable work.</div>
            </div>
          </Link>

          <Link className="home-order-project home-project-link" href={"/projects/" + orders.slug}>
            <div className="home-card-overline"><span>02 / DISTRIBUTED SYSTEMS</span><StatusBadge status={orders.status} /></div>
            <div className="home-order-graphic" aria-hidden="true"><span>order</span><span>inventory</span><span>payment</span><span>fulfillment</span></div>
            <div className="home-card-bottom"><div><h3>{orders.title}</h3><p>{orders.summary}</p></div><span className="home-link-arrow" aria-hidden="true">↗</span></div>
            <span className="home-project-disclaimer">Planned workflow / resilient processing</span>
          </Link>

          <Link className="home-ai-project home-project-link" href={"/projects/" + ai.slug}>
            <div className="home-card-overline"><span>03 / AI BACKEND</span><StatusBadge status={ai.status} /></div>
            <div className="home-ai-graphic" aria-hidden="true"><span>queued</span><span className="home-ai-active">running<span className="home-ai-pulse" /></span><span>waiting_tool</span></div>
            <div className="home-card-bottom"><div><h3>{ai.title}</h3><p>{ai.summary}</p></div><span className="home-link-arrow" aria-hidden="true">↗</span></div>
            <span className="home-project-disclaimer">Planned task states / durable execution</span>
          </Link>

          <Link className="home-production-project home-project-link" href={"/projects/" + production.slug}>
            <div className="home-production-heading"><span>04 / PRODUCTION ENGINEERING</span><StatusBadge status={production.status} /></div>
            <div className="home-production-body"><div><h3>{production.title}</h3><p>{production.summary}</p></div><div className="home-production-steps" aria-hidden="true"><span>Build</span><span>Observe</span><span>Recover</span></div><span className="home-link-arrow" aria-hidden="true">↗</span></div>
            <span className="home-project-disclaimer">Planned operational layer</span>
          </Link>
        </div>
      </section>

      <section className="home-engineering shell" id="engineering" aria-labelledby="engineering-title">
        <div className="home-section-header">
          <div><p className="home-section-index">02 / ENGINEERING</p><h2 id="engineering-title">How I work.</h2></div>
          <p>Systems are shaped by the decisions that remain sound when conditions change.</p>
        </div>
        <div className="home-engineering-grid">
          <p className="home-engineering-intro">I focus on backend engineering with Python, building reliable APIs and data-intensive systems.</p>
          <div className="home-capabilities" aria-label="Engineering skills">
            <div><h3>Backend focus</h3><p>FastAPI, PostgreSQL, SQLAlchemy, Redis, and asynchronous processing. My work spans API design, data modeling, transactions, concurrency, idempotency, authentication, testing, and distributed-system fundamentals.</p></div>
            <div><h3>Engineering workflow</h3><p>Git, Docker, pytest, Ruff, Pyright, GitHub Actions, and AI coding agents such as Codex. I use specifications, automated tests, code review, and validation to guide the work.</p></div>
            <div><h3>Currently developing</h3><p>I am building practical experience with message queues, observability, cloud infrastructure, Terraform, Kubernetes, and AI/LLM backend systems.</p></div>
          </div>
        </div>
      </section>

      <section className="home-contact shell" id="contact" aria-labelledby="contact-title">
        <p className="home-section-index">03 / CONTACT</p>
        <div className="home-contact-grid"><h2 id="contact-title">Let&apos;s talk<br /><em>engineering.</em></h2><div><p>Interested in discussing a Software or Backend Engineering opportunity?</p><a className="home-contact-email" href={"mailto:" + site.email}>{site.email} <span aria-hidden="true">↗</span></a><a className="home-inline-link" href={site.github}>View GitHub profile <span aria-hidden="true">↗</span></a></div></div>
      </section>
    </main>
  );
}
