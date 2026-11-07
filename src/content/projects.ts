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
      | "Limitations"
      | "Local Interface";
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
      "All six milestones are complete and merged. Verified on 13 October 2026: 317 tests passed, with no failures or skipped tests, and GitHub Actions passed on main. This project uses fictional funds and a simulated provider. Source code is publicly available on GitHub.",
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
          "This is a fictional-money portfolio project, without a real banking integration, refunds, or foreign exchange. No public backend deployment is claimed; the source is public on GitHub.",
          "Provider timeouts bound socket inactivity rather than total response duration. External reconciliation is paginated observation, and the operator login uses shared-principal and incident-ticket attribution. Unknown outcomes remain reserved; there is no force-release command.",
          "Production load, backup restoration, host or disk loss, and dependency vulnerabilities have not been independently qualified. Additional composed review probes are not all retained as CI regressions.",
        ],
      },
    ],
  },
  {
    slug: "ai-task-execution-platform",
    title: "AI Task Execution Platform",
    summary:
      "A completed FastAPI/PostgreSQL backend for durable AI workflows, bounded tool use, live progress, and evidence-based cost reconciliation.",
    focus: "AI backend infrastructure",
    status: "completed",
    completionNote:
      "All seven milestones are complete and merged. Verified on 28 October 2026: 828 tests passed on merged main, with 0 failures, 0 errors, and 0 skipped tests. GitHub Actions passed and an independent post-merge code review approved the implementation. Verification uses synthetic providers; paid OpenAI smoke remains skipped. Source code is publicly available on GitHub.",
    overview:
      "A Python monolith exposes a FastAPI API, background workers, and an administrative CLI. It persists versioned document-analysis workflows, streams owner-scoped progress over SSE, and records external calls and accounting evidence. A direct HTTPX adapter implements the OpenAI Responses protocol; a separate demo report service exercises the remote-effect boundary.",
    challenge:
      "A worker crash or provider timeout can leave a billable request unresolved. The system must preserve that uncertainty across restarts, cancellation, and UTC rollover while preventing stale workers from choosing results, unauthorized tools from running, and concurrent calls from overspending shared budgets.",
    scope: [
      "Implemented durable admission, retained idempotency responses, PostgreSQL polling, leases, generations, cancellation, deadlines, and explicit recovery of ambiguous outcomes.",
      "Built versioned sequential workflows with server-validated document tools, current permission checks, bounded context, and deterministic report delivery.",
      "Integrated a direct Responses adapter, versioned provider configuration, atomic task/owner/global reservations, evidence-based settlement, and audited overrun acknowledgement.",
      "Added bounded SSE, Redis degradation handling, private observability, retention, encrypted restore drills, quarantine, and explicit delivery preflight.",
    ],
    validation: [
      "828 maintained tests passed after merge: 268 unit and 560 integration, with 0 failed, 0 errors, and 0 skipped. Ruff, formatting, mypy, and main-branch CI passed.",
      "Real PostgreSQL and Redis checks cover migrations, allowed and forbidden privileges, observed lock contention, idempotency, stale workers, lost commit acknowledgements, crashes, and recovery.",
      "The synthetic reference campaign completed 1,000 of 1,000 tasks with 100 concurrent SSE connections, 10,016 reads, zero nominal stream errors, and no duplicate simulated effects.",
      "Independent post-merge review found no new material defect. Live OpenAI smoke was separately skipped because no distinct paid authorization and spending cap were provided.",
    ],
    verifiedSections: [
      {
        title: "Local Interface",
        paragraphs: [
          "Taskroom adds a Next.js workspace for exploring tasks, steps, reports, and confirmed, estimated, or uncertain costs. Sample preview works locally without credentials or Docker; all example outcomes and costs are labelled illustrative. Optional Local API mode reads the existing owner's real task state through a server-side gateway.",
          "The extension is pushed to a draft pull request and remains under review. On 29 October 2026, 14 frontend tests, TypeScript, ESLint, formatting, build, and frontend CI passed; a fresh 828-case backend regression and backend CI also passed. Independent security/reliability review approved the scoped local code. Full test-first chronology of visual UI interactions remains unverified.",
          "This is a free local/repository delivery, with no public hosted demo or paid model calls. Server-side creation is restricted to the simulated analysis:1 workflow. Admission and dispatch remain closed in the verified local setup; positive create/cancel and autonomous report execution through the UI have not been demonstrated. Source is public; local use requires Node.js 24 and pnpm. No API key is entered in the browser.",
        ],
      },
      {
        title: "Architecture",
        paragraphs: [
          "PostgreSQL owns durable state, permissions, events, and accounting. Redis provides ephemeral wakeups and HTTP limiting; workers continue polling PostgreSQL when notifications are lost. API, worker, and administrative commands share one application image with separate privileges and credentials.",
          "Execution separates lease acquisition, exact-call authorization with budget reservation, and result/accounting commit. Database connections close before external HTTP. Selected Responses items and call IDs persist between turns without exposing opaque provider items publicly or depending on previous_response_id.",
        ],
      },
      {
        title: "Engineering Decisions & Tradeoffs",
        paragraphs: [
          "Unknown model outcomes suspend the task and retain financial provision rather than silently regenerating. Reconciliation uses deduplicated evidence and revisions, replaces provision with confirmed charges, and attributes usage to the authorization day. Actual overruns are recorded in full and block affected new authorizations pending explicit administrative acknowledgement.",
          "The implementation uses a bounded sequential workflow and PostgreSQL transactions rather than a general agent framework or distributed scheduler. The direct HTTPX transport disables hidden retries, redirects, and environment-derived network settings; absolute deadlines also bound slow responses.",
        ],
      },
      {
        title: "Reliability & Security",
        paragraphs: [
          "Current owner and document permissions are checked at server boundaries and before dispatch. The model may request only search_documents and read_excerpt; report delivery is an orchestrator step. Tool names, arguments, cardinality, citations, and structured output are validated independently of provider settings.",
          "The API receives no OpenAI key. Restricted roles, private network services, non-root containers, resource limits, and logging allowlists reduce exposure. Fencing prevents stale local progression but does not cancel a remote request; prompt-injection immunity and exactly-once physical execution are not claimed.",
        ],
      },
      {
        title: "Testing & Observability",
        paragraphs: [
          "The M3–M7 matrices retain behavioral Red/Green evidence and full regression results, including historical failures and corrections. M1/M2 test-first chronology remains unverified under a documented, owner-accepted exception. CI uses protocol fixtures and synthetic HTTP providers; independent physical-request and remote-effect journals remain separate from application rollback.",
          "Owner-scoped SSE, structured logs, metrics, and traces expose progress and operational failures without publishing credentials, raw source bodies, or opaque model items. Separate administrative commands handle accounting, retention, recovery, and delivery controls.",
        ],
      },
      {
        title: "Performance Evidence",
        paragraphs: [
          "Measured on a local 4-vCPU/8-GiB VM with a 40-GiB Docker data disk: 60 seconds of warmup, then 1,000 tasks at one task per second, two worker processes, 100 held SSE connections, a synthetic model delay of 500 ms, and a demo delay of 100 ms.",
          "Observed p95 was 83 ms for creation, 164 ms for queue wait, 1.57 seconds for completion, and 30 ms for reads. Direct and proxied SSE event p95 stayed below one second. These local measurements describe the recorded synthetic workload, not production capacity or real-model latency.",
        ],
      },
      {
        title: "Failure Experiments",
        paragraphs: [
          "A Redis-outage scenario held 100 streams while reads, retained command replay, heartbeat, and PostgreSQL execution continued; new creation returned 503. A separate 120-request overload campaign produced 99 accepted requests, 17 rate limits, and four 503 responses. One ambiguous slow model request retained its provision after deadline cleanup.",
          "Encrypted database restores before dispatch authorization and before task creation exercised lost acceptance, independent remote effects, revoked old credentials, a new execution epoch, quarantine, and evidence-based reopening. These isolated drills demonstrate recovery procedures and possible data loss, not a production recovery SLA.",
        ],
      },
      {
        title: "Limitations",
        paragraphs: [
          "The implemented OpenAI adapter has protocol-fixture coverage, but no paid live-provider smoke or real-model quality campaign has run. A production provider profile is not provisioned. Structural report validation cannot establish factual truth.",
          "No public backend deployment, production TLS rollout, scheduled off-host backup delivery, or registry publication is claimed. The retained image inventory reports zero Python dependency findings but 244 OS findings, including two critical and 59 high; production use requires operator triage.",
          "Source is public. Cancellation cannot prove remote termination, restored backups can lose accepted work, and local measurements do not qualify production security, availability, or capacity.",
        ],
      },
    ],
  },
  {
    slug: "fraud-detection-ml-service",
    title: "Fraud Detection ML Service",
    summary: "A local inference service and synthetic-risk experiment with validation-led model selection and a read-only Payment integration.",
    focus: "ML engineering & safe inference",
    status: "completed",
    completionNote: "Three milestones are merged on the project main branch. The experiment uses synthetic observations and a simulated payment system. Its scores are not evidence of real fraud detection, and the container image is not qualified for production.",
    overview: "A Python service trains and compares logistic regression with a small CPU MLP on 60,000 synthetic observations. The selected preprocessing, model and threshold form a versioned bundle served by a local FastAPI scoring endpoint. A read-only client can score a fictional Payment record without changing financial state.",
    challenge: "A synthetic evaluation can look convincing while leaking labels or overfitting model selection. The system must keep generator probabilities out of features, fit preprocessing only on training data, freeze the validation rule before test evaluation and keep scoring separate from payment authorization.",
    scope: [
      "Built reproducible synthetic data, stratified splits, train-only preprocessing, model comparison and validation-only selection.",
      "Implemented strict local HTTP inference from a trusted versioned bundle, with bounded CPU work and safe error handling.",
      "Integrated a read-only Payment scoring client; scoring cannot authorize, reject or modify a payment or ledger entry."
    ],
    validation: [
      "The project records local unit, model and HTTP parity checks; its evaluation is limited to synthetic labels.",
      "The Payment integration was exercised against the local API with unchanged payment and ledger-history snapshots.",
      "The inherited container image has recorded HIGH vulnerabilities. No clean-image, public deployment or real-fraud accuracy claim is made."
    ],
    verifiedSections: [
      { title: "Architecture", paragraphs: ["Training and model selection are offline. The local FastAPI service loads a trusted bundle at startup; the Payment client reads an existing fictional payment and sends only permitted features for scoring."] },
      { title: "Engineering Decisions & Tradeoffs", paragraphs: ["Validation, rather than the final test set, chooses the model and threshold. The logistic regression baseline remained selected when the MLP did not cross the predefined validation improvement margin.", "The scoring boundary has no Payment write credentials or financial execution path. A risk score is advisory, not a transaction decision."] },
      { title: "Limitations", paragraphs: ["Synthetic labels do not establish real-world fraud precision, recall or usefulness. The image scan remains unresolved for inherited OS packages, so the service is a local engineering project rather than a production deployment."] }
    ],
    repository: "https://github.com/WYLLLY/fraud-detection-ml-service"
  },
  {
    slug: "workspace-saas-platform",
    title: "Workspace — Multi-Tenant SaaS Platform",
    summary: "A completed Java/Spring Boot workspace with tenant-isolated projects, versioned tasks, secure sessions and tested recovery procedures.",
    focus: "Java backend & tenant isolation",
    status: "completed",
    completionNote: "M1–M4 are merged on the project main branch. The local and CI verification covers the implemented workspace, HTTPS delivery and closed recovery. No public cloud deployment, external SMTP delivery or production SLA is claimed.",
    overview: "A Java 21/Spring Boot modular monolith serves account access, organizations, projects and task workspaces through a React frontend. PostgreSQL owns tenant state, sessions and a durable email outbox. A same-origin Nginx proxy provides the documented HTTPS delivery path.",
    challenge: "A multi-tenant service must keep authorization current across concurrent ownership, membership and task changes. Failed releases and restores must not revive stale sessions, permissions or email work.",
    scope: [
      "Implemented verified account registration, cookie sessions, organizations, invitations and a durable encrypted email outbox.",
      "Built tenant-isolated projects, collaborators, versioned tasks, assignment, archives and an access-scoped dashboard.",
      "Added separate migrations, HTTPS proxy delivery, bounded HTTP/SQL work, internal health and observability, runbooks and closed restore procedures."
    ],
    validation: [
      "The post-merge audit records 152 backend tests, 20 frontend tests, five operator tests and 12 real HTTPS browser tests passing in its corrective regression.",
      "Direct PostgreSQL checks cover grants, row-level security, ownership constraints, concurrency, migration and restored-state authorization.",
      "A separate readiness regression reproduces a missing runtime privilege and verifies the corrected readiness response. CI checks the full stack, proxy isolation and recovery."
    ],
    verifiedSections: [
      { title: "Architecture", paragraphs: ["The Java application is a modular monolith. Spring services and internal repositories keep use cases and persistence boundaries explicit; ArchUnit checks module dependencies. PostgreSQL enforces tenant-composite references and row-level security, while the application enforces roles and project visibility.", "Nginx provides one same-origin TLS entry point. A dedicated migration process owns Flyway V001–V008; the web runtime has no migration or recovery credentials. The email worker claims durable work before SMTP calls and commits completion afterward."] },
      { title: "Data Model", paragraphs: ["Organizations contain memberships and projects; project collaborators constrain task visibility and assignment. Immediate composite foreign keys carry organization scope, while explicit version checks protect task edits from silent overwrites."] },
      { title: "Engineering Decisions & Tradeoffs", paragraphs: ["Tenant context is transaction-local and established by the server. Authorization is reread after lock waits so a revoked member cannot act on stale permission. PostgreSQL row-level security adds a database boundary without replacing application-level role checks.", "Restoration stays closed until newer independent identity, owner, permission and catalog evidence is reconciled. An old backup does not become authority merely because its rows can be restored."] },
      { title: "Reliability & Security", paragraphs: ["Session authorization uses a separate registry to prevent delayed persistence or cookies from reviving a revoked login. An encrypted transactional outbox fences email claims; SMTP acceptance can still be duplicated after a crash.", "Readiness checks the web runtime's current positive privileges and migration state. Liveness remains independent. Failures are sanitized, and internal management is not published through the proxy."] },
      { title: "Limitations", paragraphs: ["The verified delivery is local and in CI. Real external SMTP, public certificates, off-host encrypted backup storage and remote deployment remain operator responsibilities. The evidence does not establish production capacity, availability or disaster-recovery objectives."] }
    ]
  },
  {
    slug: "python-code-analyzer",
    title: "Python Code Analyzer",
    summary: "A Python developer tool that builds import graphs, detects static cycles and produces deterministic reports without executing the analyzed code.",
    focus: "Static analysis & developer tooling",
    status: "completed",
    completionNote: "All three milestones are implemented and verified. On 5 November 2026, 682 maintained tests passed with no failures, errors or skips. Independent milestone and global reviews approved the final code; GitHub Actions verifies the source and an installed wheel under Python 3.14.6. Source is available on request.",
    overview: "A modular Python 3.14 CLI uses the standard-library AST, Typer and Rich to inspect Python repositories. It maps files to module identities, resolves absolute and relative references where possible, finds cyclic components and reports structural complexity and internal coupling in the terminal or versioned JSON.",
    challenge: "Static imports do not fully describe Python runtime behavior. A useful analyzer must preserve uncertainty around packages, namespace portions, from-import members and dynamic imports while keeping its graph, cycle witnesses and exports reproducible.",
    scope: [
      "Implemented deterministic discovery, Python-aware source decoding and AST parsing with partial results after local errors.",
      "Built filesystem-only import resolution, provenance-preserving graphs and iterative Tarjan cycle detection with real directed witnesses.",
      "Added explicit structural and coupling metrics, terminal rankings and deterministic JSON schema 1.0 with atomic source-protected export."
    ],
    validation: [
      "682 maintained tests passed, with zero failures, errors or skips, both against the source and a wheel installed into a clean environment.",
      "All 512 directed three-node graphs are checked against an independent reachability oracle; 3,000-node chain and cycle cases exercise iterative traversal.",
      "Tests cover encodings, relative packages, root collisions, uncertain imports, moved repositories, process hash seeds, partial reports and source-file aliases during export.",
      "Ruff, formatting, strict mypy and GitHub Actions passed. Separate subagents reviewed M3 and the complete M1–M3 implementation."
    ],
    verifiedSections: [
      {
        title: "Architecture",
        paragraphs: [
          "Discovery, parsing, indexing, import resolution, graph algorithms, metrics and reporting are separate typed modules. The core uses only the standard library; Typer and Rich remain at the command and presentation boundaries. Each AST is released after its facts and metrics are extracted.",
          "Tarjan and witness reconstruction use explicit stacks. Graph traversal is linear in nodes and edges before ordering; source-root selection, prefix construction and report sorting have separately documented costs. No graph library or plugin framework is required."
        ]
      },
      {
        title: "Engineering Decisions & Tradeoffs",
        paragraphs: [
          "Module-name collisions and regular-package/namespace conflicts remain ambiguous instead of being decided by filesystem order. From-import submodules can be candidates alongside certain base references; all occurrences retain provenance. The graph represents explicit static references rather than simulating Python's loader.",
          "Coupling counts distinct internal neighbors, excluding self references. Structural flags use documented decision and nesting rules, with unknown metrics retained as null after failed parsing. These heuristics help inspect code; they do not establish defect severity."
        ]
      },
      {
        title: "Testing & Observability",
        paragraphs: [
          "Behavioral Red, Green and Refactor evidence is retained for each milestone. Synthetic repositories verify file, graph and CLI contracts without importing their code. CI repeats the suite against an independently installed wheel and runs the documented demonstration.",
          "Review identified a case-insensitive filesystem alias that could bypass source protection. A failing regression preceded the fix, which now checks file identity as well as paths. The reviewer repeated the original CLI reproduction and confirmed the source remained intact."
        ]
      },
      {
        title: "Limitations",
        paragraphs: [
          "Dynamic aliases, rebinding, re-exports and runtime path changes are not resolved. Standard-library classification does not validate every submodule. A reported cycle is structural, not a guaranteed runtime import failure; an incomplete graph cannot prove the absence of cycles.",
          "AST parsing does not perform every compiler scoping check. Structural metrics are file-level heuristics, and the tool is not a resource-isolation sandbox for intentionally pathological sources. Local macOS and Ubuntu CI verification do not establish Windows compatibility."
        ]
      }
    ]
  },

  {
    slug: "security-log-analyzer",
    title: "Security Log Analyzer",
    summary: "An offline Python CLI that turns SSH authentication logs into explainable defensive alerts; later reporting work remains under review.",
    focus: "Defensive security & log analysis",
    status: "in-development",
    overview: "This Python 3.14 CLI parses local SSH/OpenSSH logs into typed authentication events and evaluates explainable patterns. It runs offline against synthetic fixtures and does not execute or block anything based on log content.",
    challenge: "Timestamps, malformed records, shared IPs and incomplete logs limit what can be inferred from authentication events. Alerts must carry source evidence and communicate uncertainty rather than claim a confirmed compromise.",
    scope: [
      "M1 parsing is merged. M2 correlation and M3 reporting exist on feature branches and are not yet merged into the project main branch.",
      "The implemented direction covers repeated failures, attempts across accounts and success after failures, with configurable windows and explicit alert evidence.",
      "Next: complete review and integration of the later milestones before presenting the CLI as a finished release."
    ],
    validation: [
      "Local verification reports cover synthetic benign and detection fixtures, malformed timestamps and bounded-memory scenarios.",
      "M2 and M3 branch checks do not constitute a merged release. Recheck the final main revision and review findings before marking this project completed.",
      "The analyzer cannot infer intent, detect every attack or compensate for missing, forged or delayed logs."
    ]
  },
  {
    slug: "snapshot-backup-engine",
    title: "Snapshot Backup Engine",
    summary: "A local Python backup CLI with deduplicated SHA-256 objects, SQLite snapshot manifests and tested restore and integrity paths.",
    focus: "Storage & crash consistency",
    status: "completed",
    completionNote: "M1–M3 and the final review corrections are merged on the project main branch. Local tests and Ubuntu/macOS CI passed. The engine is local-only and does not claim cloud backup or protection from physical power loss.",
    overview: "A Python 3.14 CLI stores file content once in a local SHA-256 content-addressed store and records complete versioned snapshot manifests in SQLite. It supports backup, restore, integrity verification and recovery without modifying the source tree.",
    challenge: "Filesystem objects and a SQL manifest cannot commit as one atomic transaction. Interrupted writes, corrupt objects, alias paths and restore destinations must be handled so incomplete snapshots are not silently presented as valid.",
    scope: [
      "Implemented deterministic traversal, content-addressed storage, transactional snapshot manifests, restore and integrity verification.",
      "Added crash recovery, inter-process locking, path and alias protections, and explicit error handling for missing or unsafe object roots.",
      "Kept the engine offline and local, without cloud synchronization, distributed storage or a graphical interface."
    ],
    validation: [
      "Final-review regression records 89 local tests passed with no failures, errors or skips; Ruff, strict mypy and package checks passed.",
      "Tests use real files and SQLite, inter-process contention, injected I/O failures and controlled SIGKILL. Ubuntu and macOS CI passed for the corrective revision.",
      "Independent review reproduced hardlink and CAS-root defects, then confirmed the focused corrections and full regression."
    ],
    verifiedSections: [
      { title: "Architecture", paragraphs: ["A CLI coordinates backup, restore and maintenance services over a local filesystem, content-addressed object store and SQLite catalog. Each snapshot has a complete manifest; identical content shares objects across snapshots."] },
      { title: "Engineering Decisions & Tradeoffs", paragraphs: ["Object writes and manifest publication are staged so a failed operation cannot advertise an incomplete snapshot. The engine verifies content and refuses unsafe catalog or object roots rather than attempting silent repair.", "The source can change while it is read, so a snapshot is not a globally atomic view of an active directory. Restore is atomic per file, not for the entire destination tree."] },
      { title: "Limitations", paragraphs: ["Only local POSIX filesystems with the required hardlink, locking and directory-sync semantics are supported. Windows and network/FUSE filesystems are outside the verified scope. SIGKILL tests do not prove resilience to physical power loss."] }
    ]
  },

];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
