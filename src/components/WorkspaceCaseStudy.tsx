import type { Project } from "@/content/projects";
import { CaseStudy } from "./CaseStudy";

const boundaries = [
  { index: "01", name: "Browser & proxy", detail: "One same-origin TLS entry point; the browser holds a cookie, not a database credential." },
  { index: "02", name: "Spring application", detail: "Use cases reread membership and project rights inside bounded transactions." },
  { index: "03", name: "PostgreSQL", detail: "Tenant-scoped references, row-level security, sessions and the durable email outbox." },
  { index: "04", name: "Mailer & recovery", detail: "Fenced outbox work and a separate closed administrator restore path." },
];

export function WorkspaceCaseStudy({ project }: { project: Project }) {
  return (
    <CaseStudy project={project}>
      <section className="workspace-boundaries" aria-labelledby="workspace-boundaries-title">
        <div className="workspace-boundaries-heading">
          <p className="eyebrow">SYSTEM VIEW / IMPLEMENTED</p>
          <h2 id="workspace-boundaries-title">Isolation is a sequence of checks.</h2>
          <p>A simplified reading path through the delivered local system. The database and application each enforce part of the access boundary.</p>
        </div>
        <ol className="workspace-boundaries-grid">
          {boundaries.map((item) => (
            <li key={item.index}>
              <span>{item.index} / {item.name}</span>
              <p>{item.detail}</p>
            </li>
          ))}
        </ol>
        <p className="workspace-boundaries-caption">This is an explanatory diagram, not a runtime trace or evidence of a public deployment.</p>
      </section>
    </CaseStudy>
  );
}
