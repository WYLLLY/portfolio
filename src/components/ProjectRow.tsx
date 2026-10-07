import Link from "next/link";
import type { Project } from "@/content/projects";
import { StatusBadge } from "./StatusBadge";

export function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <Link className="project-row" href={`/projects/${project.slug}`}>
      <span className="project-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <span className="project-main">
        <span className="project-heading">{project.title}</span>
        <span className="project-summary">{project.summary}</span>
        <span className="project-focus">{project.focus}</span>
      </span>
      <span className="project-end">
        <StatusBadge />
        <span className="project-arrow" aria-hidden="true">↗</span>
      </span>
    </Link>
  );
}
