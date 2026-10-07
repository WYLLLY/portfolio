export type Project = {
  slug: string;
  title: string;
  summary: string;
  focus: string;
  status: "in-development";
  overview: string;
  challenge: string;
  plannedScope: string[];
  validationPlan: string[];
  verifiedSections?: {
    title:
      | "Architecture"
      | "Data Model"
      | "Engineering Decisions & Tradeoffs"
      | "Reliability & Security"
      | "Testing & Observability"
      | "Performance Evidence"
      | "Failure Experiments"
      | "Lessons Learned";
    paragraphs: string[];
  }[];
  repository?: string;
};

export const projects: Project[] = [
  {
    slug: "payment-ledger-system",
    title: "Payment & Ledger System",
    summary:
      "Building a small financial system focused on accurate accounting, safe transfers, and failure-aware payments.",
    focus: "Financial correctness",
    status: "in-development",
    overview:
      "This personal project will let users hold financial accounts, move funds, initiate payments, and review their history. Every movement is intended to produce immutable, balanced ledger entries.",
    challenge:
      "Financial integrity must hold when requests are repeated, transactions overlap, or an external payment provider times out after receiving a request.",
    plannedScope: [
      "Design account, transfer, payment, and ledger records around explicit financial invariants.",
      "Handle repeated requests and concurrent spending without creating duplicate payments or overspending an account.",
      "Define authentication, authorization, auditability, and recovery behavior for ambiguous provider outcomes.",
    ],
    validationPlan: [
      "Repeat a payment request with the same idempotency key and verify that it creates one financial effect.",
      "Run competing transfers against the same available funds and verify that the ledger remains balanced.",
      "Inject provider failures and timeouts, then inspect retry and reconciliation behavior.",
    ],
  },
  {
    slug: "event-driven-order-processing",
    title: "Event-Driven Order Processing",
    summary:
      "Building an asynchronous order workflow to study duplicate messages and partial failures.",
    focus: "Distributed systems",
    status: "in-development",
    overview:
      "This personal project will accept orders through an API and coordinate inventory, payment, fulfillment, and notification through asynchronous processing.",
    challenge:
      "Independent workers can fail at different points. A useful system must preserve understandable order state despite repeated or out-of-order events, slow dependencies, and backlogs.",
    plannedScope: [
      "Model order transitions and durable event publication without assuming one-time message delivery.",
      "Make consumers safe to retry and define bounded retries, failure handling, and backlog behavior.",
      "Carry correlation context across work so a single order can be followed through the system.",
    ],
    validationPlan: [
      "Crash a worker during processing and verify that unfinished work can be recovered.",
      "Deliver duplicate and out-of-order messages and inspect resulting order state.",
      "Slow payment, fail notification, and build a queue backlog to test recovery and throughput limits.",
    ],
  },
  {
    slug: "ai-task-execution-platform",
    title: "AI Task Execution Platform",
    summary:
      "Building a backend for durable, observable AI tasks rather than a single-request chatbot.",
    focus: "AI backend infrastructure",
    status: "in-development",
    overview:
      "This personal project will accept a task through an API, persist it, return an identifier promptly, and execute a potentially multi-step AI workflow in background workers. Clients will be able to follow progress as it happens.",
    challenge:
      "AI workloads are slow, probabilistic, costly, and dependent on external services. Tasks should survive worker restarts while tool use remains authorized and bounded.",
    plannedScope: [
      "Persist task state and define retries, timeouts, cancellation, and progress streaming.",
      "Control model and tool calls with explicit permissions, input validation, and cost and concurrency limits.",
      "Trace each task across its workflow, external calls, and data operations.",
    ],
    validationPlan: [
      "Restart a worker mid-task and verify that work is not silently lost.",
      "Test cancellation, timeouts, repeated submission, and slow external services.",
      "Attempt an unauthorized tool action and verify that it is denied and recorded.",
    ],
  },
  {
    slug: "production-platform",
    title: "Production Platform",
    summary:
      "Developing the deployment, observability, and operational layer for the backend projects above.",
    focus: "Production reliability",
    status: "in-development",
    overview:
      "This personal project will make the other backend systems reproducible, deployable, observable, and recoverable in a production-like environment. Each infrastructure component will be included for a documented reason.",
    challenge:
      "A service is only useful in operation if deployments are safe, failures are visible, capacity limits are understood, and recovery steps can be practiced.",
    plannedScope: [
      "Establish reproducible environments, automated checks, deployment health signals, and safe migration practices.",
      "Connect logs, metrics, and traces to operational questions and service objectives.",
      "Document capacity limits, rollback, backups, and incident response with real measurements and exercises.",
    ],
    validationPlan: [
      "Provoke unhealthy instances, connection exhaustion, worker backlog, and dependency timeouts.",
      "Measure latency, throughput, and resource use under repeatable load scenarios.",
      "Practice a bad deployment rollback and a basic recovery procedure, then record the observed outcome.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
