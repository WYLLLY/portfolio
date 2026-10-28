import { ArchitectureExplorer, type ArchitectureScenario, type ScenarioKey } from "./ArchitectureExplorer";

const nodes = [
  { id: "api", number: "01", label: "Task API", detail: "One transaction commits the task, initial step, admission counters, event, and retained response before returning 202. Authenticated command replay returns that stored response." },
  { id: "database", number: "02", label: "PostgreSQL", detail: "The database owns the durable queue, permissions, leases, events, and accounting. Redis wakeups are optional: workers continue polling when notifications are lost." },
  { id: "worker", number: "03", label: "Workflow worker", detail: "A commits a lease and generation. B rechecks current authority and atomically reserves task, owner, and global budgets for the exact call. The connection closes before HTTP." },
  { id: "provider", number: "04", label: "Responses API", detail: "A direct HTTPX adapter uses explicit model and tariff configuration, bounded requests, and server-side output validation. Protocol items and call IDs persist privately; ordinary verification uses synthetic providers." },
  { id: "resolution", number: "05", label: "Result & cost", detail: "C commits accepted results, accounting, continuation, and events. An ambiguous call suspends the task and retains provision. Report delivery is a separate deterministic orchestrator step." },
] as const;

const scenarios: Record<ScenarioKey, ArchitectureScenario> = {
  success: {
    eyebrow: "01 / VALIDATED RESULT",
    heading: "Commit the result.",
    steps: [
      "The response passes protocol, tool, report, and permission checks for the current workflow step.",
      "The worker checks its current lease, generation, and execution epoch before committing accepted progress and available usage evidence.",
      "The orchestrator delivers the validated report through the separate demo service; the selected workflow can then finish.",
    ],
    outcome: "Validated report delivered · succeeded",
    trace: ["admission → durable 202", "A → lease committed", "B → call authorized", "response → validated", "C → result & accounting"],
  },
  failure: {
    eyebrow: "02 / FUNCTIONAL REJECTION",
    heading: "Reject without hiding cost.",
    steps: [
      "A refused or invalid model result cannot trigger partial tool execution or an automatic repair loop.",
      "Known billable usage is still recorded. Missing usage keeps its unresolved provision for evidence-based reconciliation.",
      "The task records an explicit failure. Rejection never turns a billable response into a free call.",
    ],
    outcome: "Task failed · accounting exposure preserved",
    trace: ["admission → durable 202", "A → lease committed", "B → call authorized", "response → rejected", "C → failure & accounting"],
  },
  timeout: {
    eyebrow: "03 / AMBIGUOUS MODEL CALL",
    heading: "Preserve uncertainty.",
    steps: [
      "A timeout after authorization cannot prove that the provider stopped work or incurred no charge.",
      "The call becomes unknown, the task is suspended, and the financial provision remains. The worker does not automatically regenerate.",
      "An administrator can reconcile validated evidence. Owner-authorized regeneration requires explicit overlap/cost-risk acceptance and current rights, limits, and deadline.",
    ],
    outcome: "Call unknown · task suspended · provision retained",
    trace: ["admission → durable 202", "A → lease committed", "B → call authorized", "response → unknown", "recovery → suspend & retain"],
  },
};

export function AIArchitecture() {
  return <ArchitectureExplorer
    nodes={nodes}
    initialNodeId="database"
    scenarios={scenarios}
    flowLabel="Task → authorize → resolve"
    scenarioLabel="AI task outcome scenario"
    traceLabel="TASK TRACE"
    description="Follow one authorized model call through durable execution, validation, and accounting."
    note="This is a simplified behavior map, not a live model call or captured log. Tools and report delivery have separate authorization boundaries. Timeout suspends an unresolved call; task deadline or cancellation can instead terminate local execution while remote exposure remains. Local fencing does not cancel remote work."
  />;
}
