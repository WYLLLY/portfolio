import { ArchitectureExplorer, type ArchitectureScenario, type ScenarioKey } from "./ArchitectureExplorer";

const nodes = [
  { id: "api", number: "01", label: "API", detail: "POST /payments authenticates the caller and claims the retained idempotency key before returning a stored 202 response." },
  { id: "database", number: "02", label: "PostgreSQL", detail: "One local transaction creates the payment, moves funds from available to reserved, writes the outbox task and audit event, and stores the response." },
  { id: "worker", number: "03", label: "Outbox worker", detail: "A worker claims durable work with a lease generation. External HTTP starts only after the claim transaction has committed." },
  { id: "provider", number: "04", label: "Provider simulator", detail: "The separate HTTP simulator persists each payment identity and result in SQLite. Replays use the same provider identity." },
  { id: "resolution", number: "05", label: "Resolution", detail: "A confirmed outcome posts one terminal ledger journal in PostgreSQL. An unknown outcome retains the reservation for later lookup." },
] as const;

const scenarios: Record<ScenarioKey, ArchitectureScenario> = {
  success: {
    eyebrow: "01 / CONFIRMED ACCEPTANCE",
    heading: "Settle once.",
    steps: [
      "The provider confirms the payment under its stable identity.",
      "The worker validates the returned payment details and its current lease generation.",
      "A terminal transaction moves reserved funds to clearing and marks the payment succeeded.",
    ],
    outcome: "Reserved → clearing · succeeded",
    trace: ["request → received", "transaction → reserve", "response → 202 Accepted", "provider → accepted", "journal → settle"],
  },
  failure: {
    eyebrow: "02 / DEFINITIVE REFUSAL",
    heading: "Release safely.",
    steps: [
      "The provider returns a definitive refusal for the same payment identity.",
      "The worker validates the evidence and checks that no terminal journal already exists.",
      "A terminal transaction returns reserved funds to available and marks the payment failed.",
    ],
    outcome: "Reserved → available · failed",
    trace: ["request → received", "transaction → reserve", "response → 202 Accepted", "provider → refused", "journal → release"],
  },
  timeout: {
    eyebrow: "03 / UNKNOWN OUTCOME",
    heading: "Keep the question open.",
    steps: [
      "A timeout gives no reliable evidence that the provider refused or accepted the payment.",
      "The reservation remains in place; recovery queries provider state using the same identity.",
      "If bounded attempts are exhausted, needs_review retains the funds until a definitive outcome is observed.",
    ],
    outcome: "Funds remain reserved · pending or needs_review",
    trace: ["request → received", "transaction → reserve", "response → 202 Accepted", "provider → unknown", "recovery → retain funds"],
  },
};

export function PaymentArchitecture() {
  return <ArchitectureExplorer
    nodes={nodes}
    initialNodeId="database"
    scenarios={scenarios}
    flowLabel="POST /payments → terminal state"
    scenarioLabel="Payment outcome scenario"
    traceLabel="PAYMENT TRACE"
    description="Follow the same payment identity through the local transaction and the external outcome."
    note="The trace is a simplified behavior map, not a captured log. A timeout or transient provider error is never treated as a definitive refusal. Internal validation and authorization steps are omitted for readability."
  />;
}
