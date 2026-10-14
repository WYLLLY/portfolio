export type Project = {
  slug: string;
  title: string;
  summary: string;
  focus: string;
  status: "in-development" | "completed";
  completionNote?: string;
  overview: string;
  challenge: string;
  scope: string[];
  validation: string[];
  verifiedSections?: {
    title:
      | "Architecture"
      | "Data Model"
      | "Engineering Decisions & Tradeoffs"
      | "Reliability & Security"
      | "Testing & Observability"
      | "Performance Evidence"
      | "Failure Experiments"
      | "Lessons Learned"
      | "Limitations";
    paragraphs: string[];
  }[];
  repository?: string;
};

export const projects: Project[] = [
  {
    slug: "payment-ledger-system",
    title: "Payment & Ledger System",
    summary:
      "A completed FastAPI/PostgreSQL backend with an immutable double-entry ledger, idempotent transfers, and recoverable asynchronous payments.",
    focus: "Financial correctness",
    status: "completed",
    completionNote:
      "All six milestones are complete and merged. Verified on 13 October 2026: 317 tests passed, with no failures or skipped tests, and GitHub Actions passed on main. This project uses fictional funds and a simulated provider. Source code remains private.",
    overview:
      "A Python backend for EUR, USD, and JPY wallets, internal transfers, and outgoing payments. PostgreSQL enforces balanced, immutable ledger entries and nonnegative user balances. Monetary values use integer minor units without currency conversion.",
    challenge:
      "A provider timeout does not reveal whether a payment happened. The system must recover after remote acceptance or a worker crash without paying twice, releasing uncertain reservations, or allowing concurrent requests to overspend.",
    scope: [
      "Implemented registration, Argon2id passwords, opaque hashed sessions, ownership checks, and transactional wallet creation.",
      "Built immutable double-entry posting, retained API idempotency, atomic transfers, and deterministic account locking.",
      "Implemented payment reservation and a transactional outbox, worker leases and generations, persistent provider idempotency, and bounded recovery.",
      "Added reconciliation, restricted audited operator commands, JSON logs, correlation IDs, operational metrics, PostgreSQL rate limiting, and recovery runbooks.",
    ],
    validation: [
      "317 maintained tests passed: 31 unit and 286 integration, with 0 failed and 0 skipped on the merged main revision.",
      "Real PostgreSQL tests cover financial constraints, allowed and forbidden privileges, migrations, concurrent requests, stale workers, crashes, and reconciliation.",
      "A clean installation with fresh credentials and database volumes passed migrations and both real HTTP smoke flows before the test suite ran.",
      "Ruff, formatting, strict mypy, and GitHub Actions passed. Independent reviews approved the milestones and documented remaining limitations.",
    ],
    verifiedSections: [
      {
        title: "Architecture",
        paragraphs: [
          "One application provides the FastAPI API, outbox worker, and operator CLI. PostgreSQL is the financial source of truth; SQLAlchemy 2 and Alembic manage access and schema changes. The HTTP provider simulator has its own persistent SQLite database.",
          "Payment creation commits the idempotency record, reservation, outbox task, audit, and stored response together. External HTTP happens after that transaction closes. Confirmed success or refusal is finalized in a separate atomic transaction.",
        ],
      },
      {
        title: "Engineering Decisions & Tradeoffs",
        paragraphs: [
          "Database constraints and restricted posting functions protect financial state alongside application validation. Ledger accounts lock in ascending identifier order; retained idempotency responses make concurrent duplicates and lost responses safe to replay.",
          "A stable provider identity and lease generations prevent retries or stale workers from creating duplicate terminal effects. Unknown outcomes retain reserved funds. After retry exhaustion, needs_review permits further reconciliation without treating silence as a refusal.",
          "The architecture uses a monolith and PostgreSQL rather than adding Redis, Kafka, or a distributed transaction. Reconciliation detects inconsistencies without automatically rewriting financial history.",
        ],
      },
      {
        title: "Testing & Observability",
        paragraphs: [
          "The complete CI suite runs against real PostgreSQL and includes migration, privilege, concurrency, and recovery checks. The 317-test total excludes temporary independent-review probes; it is not a throughput benchmark or a production certification.",
          "Structured application logs carry request or payment correlation IDs. Internal metrics expose pending and needs_review payments, outbox age, and expired leases. Operator procedures use a separate restricted role and record recovery actions in an immutable audit.",
        ],
      },
      {
        title: "Limitations",
        paragraphs: [
          "This is a fictional-money portfolio project, without a real banking integration, refunds, or foreign exchange. No public backend deployment or public source access is claimed.",
          "Provider timeouts bound socket inactivity rather than total response duration. External reconciliation is paginated observation, and the operator login uses shared-principal and incident-ticket attribution. Unknown outcomes remain reserved; there is no force-release command.",
          "Production load, backup restoration, host or disk loss, and dependency vulnerabilities have not been independently qualified. Additional composed review probes are not all retained as CI regressions.",
        ],
      },
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
    scope: [
      "Model order transitions and durable event publication without assuming one-time message delivery.",
      "Make consumers safe to retry and define bounded retries, failure handling, and backlog behavior.",
      "Carry correlation context across work so a single order can be followed through the system.",
    ],
    validation: [
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
    scope: [
      "Persist task state and define retries, timeouts, cancellation, and progress streaming.",
      "Control model and tool calls with explicit permissions, input validation, and cost and concurrency limits.",
      "Trace each task across its workflow, external calls, and data operations.",
    ],
    validation: [
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
    scope: [
      "Establish reproducible environments, automated checks, deployment health signals, and safe migration practices.",
      "Connect logs, metrics, and traces to operational questions and service objectives.",
      "Document capacity limits, rollback, backups, and incident response with real measurements and exercises.",
    ],
    validation: [
      "Provoke unhealthy instances, connection exhaustion, worker backlog, and dependency timeouts.",
      "Measure latency, throughput, and resource use under repeatable load scenarios.",
      "Practice a bad deployment rollback and a basic recovery procedure, then record the observed outcome.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
