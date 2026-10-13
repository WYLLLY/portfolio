"use client";

import { useState } from "react";

type ScenarioKey = "success" | "failure" | "timeout";

const nodes = [
  { id: "api", number: "01", label: "API", detail: "POST /payments authenticates the caller and claims the retained idempotency key before returning a stored 202 response." },
  { id: "database", number: "02", label: "PostgreSQL", detail: "One local transaction creates the payment, moves funds from available to reserved, writes the outbox task and audit event, and stores the response." },
  { id: "worker", number: "03", label: "Outbox worker", detail: "A worker claims durable work with a lease generation. External HTTP starts only after the claim transaction has committed." },
  { id: "provider", number: "04", label: "Provider simulator", detail: "The separate HTTP simulator persists each payment identity and result in SQLite. Replays use the same provider identity." },
  { id: "resolution", number: "05", label: "Resolution", detail: "A confirmed outcome posts one terminal ledger journal in PostgreSQL. An unknown outcome retains the reservation for later lookup." },
] as const;

const scenarios: Record<ScenarioKey, {
  eyebrow: string;
  heading: string;
  steps: [string, string, string];
  outcome: string;
}> = {
  success: {
    eyebrow: "01 / CONFIRMED ACCEPTANCE",
    heading: "Settle once.",
    steps: [
      "The provider confirms the payment under its stable identity.",
      "The worker validates the returned payment details and its current lease generation.",
      "A terminal transaction moves reserved funds to clearing and marks the payment succeeded.",
    ],
    outcome: "Reserved → clearing · succeeded",
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
  },
};

export function PaymentArchitecture() {
  const [scenario, setScenario] = useState<ScenarioKey>("success");
  const [selectedNode, setSelectedNode] = useState<(typeof nodes)[number]["id"]>("database");
  const activeNode = nodes.find((node) => node.id === selectedNode) ?? nodes[1];
  const activeScenario = scenarios[scenario];

  return (
    <div className="ledger-explorer" data-scenario={scenario}>
      <div className="ledger-explorer-topline"><span>IMPLEMENTED SYSTEM / SIMPLIFIED VIEW</span><span>POST /payments → terminal state</span></div>
      <div className="ledger-architecture-nodes" role="group" aria-label="Architecture components. Select a component to read its responsibility.">
        {nodes.map((node) => (
          <button
            key={node.id}
            type="button"
            className="ledger-architecture-node"
            aria-pressed={selectedNode === node.id}
            onClick={() => setSelectedNode(node.id)}
          >
            <span className="ledger-node-number">{node.number}</span>
            <span className="ledger-node-label">{node.label}</span>
            <span className="ledger-node-indicator" aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="ledger-node-detail" aria-live="polite">
        <span>{activeNode.number} / {activeNode.label}</span>
        <p>{activeNode.detail}</p>
      </div>
      <div className="ledger-explorer-divider" />
      <div className="ledger-scenario-header">
        <div><span className="ledger-small-label">EXPLORE OUTCOMES</span><h3>What happens next?</h3></div>
        <div className="ledger-scenario-buttons" role="group" aria-label="Payment outcome scenario">
          {(["success", "failure", "timeout"] as const).map((key) => (
            <button key={key} type="button" aria-pressed={scenario === key} onClick={() => setScenario(key)}>
              {key === "success" ? "Success" : key === "failure" ? "Failure" : "Timeout"}
            </button>
          ))}
        </div>
      </div>
      <div className="ledger-scenario-result" aria-live="polite">
        <div className="ledger-scenario-lead"><span>{activeScenario.eyebrow}</span><h4>{activeScenario.heading}</h4></div>
        <ol>{activeScenario.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        <p className="ledger-scenario-outcome"><span>FINANCIAL STATE</span>{activeScenario.outcome}</p>
      </div>
      <p className="ledger-explorer-note">A timeout or transient provider error is never treated as a definitive refusal. This diagram omits internal validation and authorization steps for readability.</p>
    </div>
  );
}
