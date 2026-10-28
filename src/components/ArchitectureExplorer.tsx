"use client";

import { useState } from "react";

export type ScenarioKey = "success" | "failure" | "timeout";

type ArchitectureNode = {
  id: string;
  number: string;
  label: string;
  detail: string;
};

export type ArchitectureScenario = {
  eyebrow: string;
  heading: string;
  steps: readonly string[];
  outcome: string;
  trace: readonly string[];
};

type ArchitectureExplorerProps = {
  nodes: readonly [ArchitectureNode, ...ArchitectureNode[]];
  initialNodeId: string;
  scenarios: Record<ScenarioKey, ArchitectureScenario>;
  flowLabel: string;
  scenarioLabel: string;
  traceLabel: string;
  description: string;
  note: string;
};

export function ArchitectureExplorer({
  nodes, initialNodeId, scenarios, flowLabel, scenarioLabel, traceLabel, description, note,
}: ArchitectureExplorerProps) {
  const [scenario, setScenario] = useState<ScenarioKey>("success");
  const [selectedNode, setSelectedNode] = useState(initialNodeId);
  const activeNode = nodes.find((node) => node.id === selectedNode) ?? nodes[0];
  const activeScenario = scenarios[scenario];

  return (
    <div className="ledger-explorer" data-scenario={scenario}>
      <div className="ledger-explorer-topline"><span>IMPLEMENTED SYSTEM / SIMPLIFIED VIEW</span><span>{flowLabel}</span></div>
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
        <div className="ledger-scenario-buttons" role="group" aria-label={scenarioLabel}>
          {(["success", "failure", "timeout"] as const).map((key) => (
            <button key={key} type="button" aria-pressed={scenario === key} onClick={() => setScenario(key)}>
              {key === "success" ? "Success" : key === "failure" ? "Failure" : "Timeout"}
            </button>
          ))}
        </div>
      </div>
      <div className="ledger-scenario-result" aria-live="polite">
        <div className="ledger-scenario-lead"><span>{activeScenario.eyebrow}</span><h4>{activeScenario.heading}</h4><p>{description}</p></div>
        <div className="ledger-scenario-demo">
          <div className="ledger-demo-chrome"><span><i aria-hidden="true" /> {traceLabel}</span><span>BEHAVIOR MAP / {scenario.toUpperCase()}</span></div>
          <ol className="ledger-demo-lines" aria-label={`${scenario} behavior map`}>
            {activeScenario.trace.map((line, index) => <li key={line}><span>{String(index + 1).padStart(2, "0")}</span><code>{line}</code></li>)}
          </ol>
          <div className="ledger-demo-state"><span>FINAL STATE</span><strong>{activeScenario.outcome}</strong></div>
        </div>
        <ol className="ledger-scenario-explanation">{activeScenario.steps.map((step) => <li key={step}>{step}</li>)}</ol>
      </div>
      <p className="ledger-explorer-note">{note}</p>
    </div>
  );
}
