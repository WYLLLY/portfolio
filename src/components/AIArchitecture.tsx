import { ArchitectureExplorer, type ArchitectureScenario, type ScenarioKey } from "./ArchitectureExplorer";

const nodes = [
  { id: "api", number: "01", label: "API + PostgreSQL", detail: "API-key authentication and owner scoping guard admission. PostgreSQL commits task state, the pinned workflow, initial step, event and retained response before 202. Redis provides ephemeral wakeups, never durable truth." },
  { id: "worker", number: "02", label: "Durable worker", detail: "The worker claims a fenced lease, reloads persisted checkpoints and rechecks current permissions. It atomically reserves applicable budgets before each model call, then releases the database connection before HTTP." },
  { id: "provider", number: "03", label: "Responses adapter", detail: "The direct HTTPX adapter builds OpenAI Responses requests with function tools and structured report output. Call IDs and required protocol items persist between turns. Contract tests use synthetic responses; no paid live-provider run is claimed." },
  { id: "tools", number: "04", label: "Validated read tools", detail: "The model may request search_documents or read_excerpt. The server validates names, arguments, cardinality, owner rights and document versions before local execution. It checkpoints the result and resumes the next model turn. Report delivery is not a model tool." },
  { id: "resolution", number: "05", label: "Report + progress", detail: "The orchestrator validates the structured report and citations, then delivers it through a separate service. PostgreSQL events feed owner-scoped SSE progress. An ambiguous model call suspends the task with its cost provision retained." },
] as const;

const scenarios: Record<ScenarioKey, ArchitectureScenario> = {
  success: {
    eyebrow: "01 / VALIDATED RESULT",
    heading: "Commit the result.",
    steps: [
      "The model may request a permitted document tool. The server validates it, checkpoints the result, and supplies it to the next model turn.",
      "Each unit checks the current lease, generation, epoch and permissions. Model and tool turns stay within context, call and budget limits.",
      "The server validates structured report output and citations before the orchestrator delivers it through the separate demo service.",
    ],
    outcome: "Validated report delivered · succeeded",
    trace: ["admission → durable 202", "worker → lease & authorization", "model ↔ validated read tools", "report → citations checked", "commit → result & accounting"],
  },
  failure: {
    eyebrow: "02 / FUNCTIONAL REJECTION",
    heading: "Reject without hiding cost.",
    steps: [
      "Unapproved tool names, invalid arguments or multiple actions fail server validation before execution.",
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
    initialNodeId="worker"
    scenarios={scenarios}
    flowLabel="Accept → model ↔ tools → report"
    scenarioLabel="AI task outcome scenario"
    traceLabel="TASK TRACE"
    description="Follow a bounded agent workflow through durable checkpoints, tool validation and result accounting."
    note="Illustrative behavior map, not a live or captured run. Tool results loop back to the model; report delivery stays orchestrator-only. SSE streams task events (Responses stream=false). Timeout suspends uncertain work; cancellation and deadlines cannot guarantee remote termination."
  />;
}
