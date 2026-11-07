import type { Project } from "@/content/projects";

export function StatusBadge({ status }: { status: Project["status"] }) {
  return (
    <span className="status-badge" data-status={status}>
      {status === "completed" ? "Completed" : "In Development"}
    </span>
  );
}
