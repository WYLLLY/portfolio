export type Project = {
  slug: string;
  title: string;
  summary: string;
  focus: string;
  status: "in-development" | "completed" | "planned";
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
    summary: "A planned offline Python CLI for identifying suspicious SSH authentication patterns in local Linux logs, with explainable alerts.",
    focus: "Defensive security & log analysis",
    status: "planned",
    overview: "The intended tool will parse local SSH/OpenSSH logs, normalize authentication events and correlate them over configurable time windows. Planned stack: Python 3.14, pathlib, re, datetime, collections, Typer and Rich, with pytest, Ruff and mypy. Implementation has not started.",
    challenge: "Incomplete timestamps, time zones and malformed lines make correlation uncertain. Detection rules need to explain their evidence and limits without claiming to detect every attack.",
    scope: [
      "M1: parse authentication events into a typed model containing timestamp, source IP, user, outcome and event type; use anonymized or synthetic fixtures.",
      "M2: correlate repeated failures, attempts across multiple accounts and a successful login following many failures, using configurable time windows.",
      "M3: produce terminal and JSON alerts with rule identifiers, severity and supporting events; document robustness, rules and CI."
    ],
    validation: [
      "Use test-first development and known benign or simulated malicious scenarios to check expected alerts, false positives and missed detections.",
      "Exercise incomplete timestamps, time zones, malformed lines and large files; stream input where appropriate and verify reproducible output.",
      "Keep analysis offline and defensive: never execute commands from log content. No network agent, SIEM, web dashboard, machine learning or cloud integration is planned. No implementation or test result is claimed."
    ]
  },
  {
      "slug": "snapshot-backup-engine",
      "title": "Snapshot Backup Engine",
      "summary": "A completed Python CLI for versioned, deduplicated local backups, with SHA-256 content storage, SQLite manifests and tested interruption recovery.",
      "focus": "Filesystems, storage & crash consistency",
      "status": "completed",
      "completionNote": "All three milestones are implemented and merged. Verified on 6 November 2026: 89 maintained tests passed with zero failures, errors or skips. Ruff, strict mypy and GitHub Actions passed on Ubuntu and macOS. Independent final review approved the corrected implementation. Source code remains private.",
      "overview": "A compact Python 3.14 CLI creates complete, independent snapshots of a local directory. File bytes live in an immutable SHA-256 content-addressed store; SQLite records paths, permissions, modification times and versioned manifests. Typer and Rich provide backup, listing, restore, integrity verification and recovery commands. There is no application server or network service.",
      "challenge": "SQLite cannot atomically commit filesystem writes with its own transaction. The engine must make validated objects durable before publishing their references, retain old snapshots through interrupted backups and prevent restoration paths or file aliases from changing source data.",
      "scope": [
          "Implemented deterministic filesystem traversal, bounded hashing and content-addressed object storage with temporary writes, revalidation and publication without overwriting existing objects.",
          "Built complete SQLite manifests, transactional publication, cross-snapshot deduplication and restoration into a new, confined destination. Renames reuse content; deleted files remain available in older snapshots.",
          "Added object and manifest integrity checks, conservative recovery, process locking, transactional schema migration and explicit handling of missing or corrupt data.",
          "Documented the installed CLI demonstration and retained test-first evidence, independent reviews and a Python 3.14 CI matrix for Ubuntu and macOS."
      ],
      "validation": [
          "89 maintained tests passed after the final merge, with 0 failures, 0 errors and 0 skipped tests. Ruff lint/format, strict mypy and installed CLI checks passed; merged-main CI passed on Ubuntu and macOS.",
          "Real files and on-disk SQLite tests cover deduplication, modified/renamed/deleted files, permissions, unsafe paths, symlinks, migrations, constraints and inter-process locking.",
          "Barrier-controlled SIGKILL tests interrupt backup at ten checkpoints, restoration at two checkpoints and recovery during cleanup. I/O fault injection covers ENOSPC, EACCES, EIO, partial writes and temporary-content corruption.",
          "The installed CLI demonstration produced three snapshots backed by three distinct objects and restored two historical versions successfully. Global and snapshot-scoped verification and repeated recovery passed."
      ],
      "verifiedSections": [
          {
              "title": "Architecture",
              "paragraphs": [
                  "The CLI delegates to backup, restore and maintenance operations. Filesystem primitives, the content store and SQLite catalog have separate responsibilities. Objects are stored under a two-character hash prefix; each snapshot has a full manifest rather than a chain of incremental deltas.",
                  "Commands serialize through a local process lock. SQLite uses STRICT tables, foreign keys enabled per connection, explicit transactions, a rollback journal and synchronous=EXTRA. A single commit publishes the complete manifest after referenced objects and their directory entries have been synchronized."
              ]
          },
          {
              "title": "Engineering Decisions & Tradeoffs",
              "paragraphs": [
                  "Deduplication operates on whole-file SHA-256 contents. Every backup reads and hashes all source files instead of trusting size and modification time as an identity cache. This favors a compact, inspectable implementation over incremental scanning or chunk-level efficiency.",
                  "An interrupted backup may leave valid unreferenced objects. Recovery keeps those objects and removes only recognized temporary files; a subsequent backup can reuse durable content. There is no automatic object repair, snapshot deletion, retention policy or garbage collection."
              ]
          },
          {
              "title": "Reliability & Security",
              "paragraphs": [
                  "Symlinks and special files are rejected, and sensitive filesystem operations use no-follow opens and directory descriptors. Restore requires a new destination and places its temporary files inside that destination. Restored files never share an inode with source files or the object store.",
                  "Final review reproduced a source hardlink to the SQLite database being changed by a backup commit. A failing regression preceded the correction: the database and its existing sidecars must be regular files with a single link before SQLite opens or recovers them. Additional regressions align missing or unsafe object-storage roots with integrity errors."
              ]
          },
          {
              "title": "Failure Experiments",
              "paragraphs": [
                  "Before publication, a killed process can leave temporary or orphaned objects while SQLite rolls back the uncommitted manifest. After commit but before the success response, the complete snapshot remains present. Tests reopen the repository, repeat recovery and restore historical data in a fresh process.",
                  "Independent reviews identified and verified fixes for directory synchronization on retry, descriptor leaks on I/O or transaction-start failure, SQLite corruption classification and source-file aliases. Behavioral Red/Green traces are retained; green regressions added for existing behavior are not presented as retrospective Red evidence."
              ]
          },
          {
              "title": "Limitations",
              "paragraphs": [
                  "Supported scope is Linux and macOS on a local filesystem, with a trusted account and stable roots. Active sources are not captured at one global instant: identity and metadata checks detect many changes but cannot guarantee application-level consistency across files.",
                  "Restoration is atomic per file, so an interrupted restore may leave a partial destination. Only ordinary permission bits and modification times are preserved; owners, ACLs, extended attributes, symlinks and sparse layout are excluded.",
                  "SIGKILL tests demonstrate process-interruption handling, not physical power-loss durability. Filesystem and hardware synchronization behavior still matters. No throughput benchmark, production recovery SLA, encryption, compression, cloud synchronization or public hosted backup service is claimed."
              ]
          }
      ]
  },


];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
