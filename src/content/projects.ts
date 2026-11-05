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
    "slug": "security-log-analyzer",
    "title": "Security Log Analyzer",
    "summary": "An offline Python CLI that turns Linux SSH logs into typed events, correlates suspicious authentication patterns and produces explainable terminal and JSON alerts.",
    "focus": "Defensive security & temporal correlation",
    "status": "in-development",
    "completionNote": "All three milestones are implemented and independently reviewed. On 5 November 2026, 156 maintained tests passed with no failures, errors or skips; Ruff, formatting, strict mypy and Linux CI passed. M1 is merged; M2 and M3 remain in reviewed pull requests awaiting merge. The global review passed after a timestamp-classification fix. Source is private and available on request.",
    "overview": "Security Log Analyzer is a small Python 3.14 tool for investigating local OpenSSH authentication logs. It reads traditional rsyslog and RFC 3339 files, normalizes events in UTC and applies three deterministic rules using configurable event-time windows. Typer provides the CLI and Rich provides the terminal report; the parser and detector operate independently of presentation and network services.",
    "challenge": "A repeated error message is not necessarily another authentication attempt. Missing years, daylight-saving transitions, overlapping files and malformed lines can also distort correlation. The tool must preserve provenance and uncertainty, control memory growth and distinguish an incomplete analysis from a clean result.",
    "scope": [
      "M1 implements bounded UTF-8 file reading, anchored OpenSSH grammars, typed immutable events, explicit timestamp context and synthetic benign/suspicious fixtures.",
      "M2 detects repeated failures from one host/IP, failures across distinct accounts, and a successful login after failures for the same host/IP/account. Windows, thresholds, method selection and evidence limits are explicit.",
      "M3 adds an installed CLI, terminal and JSON schema 1.0 reports, SHA-256 source provenance, partial/fatal exit states, temporary alert spooling and atomic export without overwriting existing files.",
      "Runtime stays local and strictly defensive: no server, SIEM, database, permanent agent, scanning, cloud integration or machine learning. Log content never becomes a command or a DNS/network request."
    ],
    "validation": [
      "156 maintained tests passed, with zero failures, errors or skipped cases. Separate independent reviews covered M3 and the complete M1–M3 pipeline, with confirmed findings fixed and rechecked.",
      "The reference fixture produces exactly SSH-002 at source line 5, SSH-001 at line 10 and SSH-003 at line 11. Benign and boundary scenarios check expected alerts, false positives and missed detections on known synthetic inputs.",
      "A separate M2 oracle used historical scans to check 500 scenarios of 500 events: 250,000 events matched on rule, trigger, counts and first timestamp. These independent probes are separate from the maintained test count.",
      "Ruff lint/format, strict mypy, GitHub Actions on Ubuntu and installed-entrypoint tests passed. Memory checks compare 10,000 and 100,000 lines and verify fragmented rendering of 2,000 alerts."
    ],
    "verifiedSections": [
      {
        "title": "Architecture",
        "paragraphs": [
          "The pipeline separates file reading, timestamp policy, message parsing, chronological merging, expiring windows, detection and reporting. Events and alerts are immutable; the detector consumes iterables rather than opening files or depending on Typer/Rich. Small reader/writer protocols support composition without an unnecessary plugin framework.",
          "Up to 32 sorted sources are merged with one event of lookahead per source. Authentication state uses expiring deques, counters and keyed windows. Alerts are spooled to a temporary file and serialized in fragments, so total log or report volume does not have to fit in memory."
        ]
      },
      {
        "title": "Data Model",
        "paragraphs": [
          "Each normalized event records UTC time, host, source IP, case-sensitive user, outcome, event type, authentication method, invalid-user context and source/line provenance. IP literals are validated without DNS. Raw lines and SSH key fingerprints are not copied into reports.",
          "An alert records its rule/version, severity, correlation key, threshold/window, exact counts, trigger, observed period and supporting events. Evidence is capped at 20 events, with explicit truncation; the successful event is always retained for SSH-003. Diagnostics likewise preserve exact totals with at most 20 detailed examples."
        ]
      },
      {
        "title": "Engineering Decisions & Tradeoffs",
        "paragraphs": [
          "SSH-001 defaults to 10 failures in 300 seconds; SSH-002 to five distinct failed accounts in 600 seconds. Their windows include both endpoints, emit on threshold crossing and rearm after expiration below the threshold. A sustained burst does not create an alert for every additional failure.",
          "SSH-003 defaults to success after five failures in 900 seconds for the same host/IP/account. Failures at the success timestamp are excluded because their order is unknown at that precision; a success closes the sequence. Password and keyboard-interactive failures count by default; public-key failures require explicit inclusion to reduce noise from legitimate key offers.",
          "Traditional timestamps require an explicit year and IANA timezone, with no inference from the clock or file metadata and no implicit year rollover. Ambiguous or nonexistent local times are rejected. RFC 3339 offsets provide an explicit alternative; this deliberately favors reproducible interpretation over convenient guesses."
        ]
      },
      {
        "title": "Reliability & Security",
        "paragraphs": [
          "Invalid-user and PAM context messages are distinguished from canonical Failed messages to prevent double counting. Unknown SSH messages and rejected lines make the analysis partial; no supported events also yields a partial state. A partial report takes precedence over alerts, so an exit code cannot imply complete coverage after data loss.",
          "Regular sources are opened without blocking on a FIFO, bounded to their initial byte size and hashed while read. Duplicate physical files are rejected by identity, and every source is checked again before publication. This detects ordinary changes; it is not a secure snapshot against an adversary controlling files and metadata.",
          "Optional JSON export writes a temporary file, flushes it and publishes with an atomic link that fails if the destination already exists. Terminal values are inert Rich Text with control characters neutralized. Active failures and keys are capped; exceeding a limit stops analysis instead of dropping relevant evidence."
        ]
      },
      {
        "title": "Testing & Observability",
        "paragraphs": [
          "Behavioral Red, Green and Refactor evidence is retained by milestone. The CLI reference scenario is reproduced through an installed entrypoint, with pure JSON stdout, event-time boundaries, cross-file correlation, explicit public-key selection and reproducible bytes. Later characterization tests are identified without claiming retrospective Red evidence.",
          "Exit codes distinguish complete/no alerts (0), complete/alerts (1), blocking errors (2) and partial analysis (3). Reports include effective parameters, source SHA-256 values, diagnostic counts, rule versions and event provenance. The tool needs no daemon or monitoring service."
        ]
      },
      {
        "title": "Performance Evidence",
        "paragraphs": [
          "One local benchmark processed 1,000,000 synthetic Accepted-publickey lines, totaling 94,000,000 bytes, in 9.60 seconds: approximately 104,158 lines/second with a 30.6 MB process peak RSS on macOS arm64/Python 3.14.6. It used one host/account, equal explicit UTC timestamps and no alerts.",
          "This is a bounded-state benign workload, not a universal capacity claim or a test of real intrusion-detection effectiveness. Automated checks separately bound memory growth between 10,000 and 100,000 lines and restrict write fragments while rendering 2,000 alerts."
        ]
      },
      {
        "title": "Failure Experiments",
        "paragraphs": [
          "Independent review reproduced a FIFO opening that waited indefinitely for a writer. A failing subprocess regression preceded the nonblocking-open fix. Another review found that truncated terminal evidence hid the full detection period; a Red test preceded explicit display of detection time, observed period and trigger.",
          "Global review found a malformed timestamp being mistaken for missing traditional time context, aborting an otherwise useful modern-format analysis. Two failing regressions preceded recognition of the timestamp grammar before requesting context. The reviewer confirmed partial JSON now preserves the valid event and exact invalid-timestamp diagnostic.",
          "Additional probes combine two sources, invalid UTF-8 and a 70 KB line while preserving three expected alerts and complete file hashes. Late disorder and state-limit failures publish no misleading success JSON; output-race tests preserve a pre-existing destination."
        ]
      },
      {
        "title": "Lessons Learned",
        "paragraphs": [
          "The parsing boundary and error taxonomy are part of detection correctness. Treating a malformed record as a configuration error can suppress an entire investigation, while treating lost input as benign can make a clean report misleading.",
          "Explainability must survive truncation: counts, windows, period and trigger cannot depend on the evidence sample alone. Independent review and synthetic counterexamples exposed these gaps even with a green suite."
        ]
      },
      {
        "title": "Limitations",
        "paragraphs": [
          "Three explicit rules cannot detect every attack. Slow or distributed activity, shared NAT/bastion addresses, missing or forged events, unknown OpenSSH variants, copied logs and timestamp precision limit conclusions. A success after failures can be legitimate; an alert is a lead for investigation, not proof of compromise.",
          "Only the documented rsyslog/OpenSSH text formats are supported; not general RFC 5424, binary journald, journalctl JSON or compressed input. POSIX verification covers local macOS and Ubuntu CI, not Windows or production qualification. Synthetic false-positive/false-negative results do not establish real-world accuracy.",
          "Source remains private, with access on request. This portfolio page describes verified local implementation and reviewed pull requests; it does not offer a hosted scanner, log upload service or public backend."
        ]
      }
    ]
  },
  {
    slug: "snapshot-backup-engine",
    title: "Snapshot Backup Engine",
    summary: "A planned local Python CLI for versioned, deduplicated backups using SHA-256 objects and SQLite snapshot manifests.",
    focus: "Filesystems, storage & crash consistency",
    status: "planned",
    overview: "The intended tool will store file contents by SHA-256, share identical objects across snapshots and track metadata and manifests in SQLite. Planned stack: Python 3.14, pathlib, hashlib, sqlite3, shutil, Typer and Rich, with pytest, Ruff and mypy. Implementation has not started.",
    challenge: "Object writes and snapshot publication must remain consistent after interruption. Restores must stay inside their destination, while source changes during reads limit the consistency that can be promised.",
    scope: [
      "M1: add the CLI, deterministic filesystem traversal and a content-addressed object store without modifying or deleting source files.",
      "M2: add transactional SQLite manifests, snapshot listing, cross-snapshot deduplication and restoration into a designated destination.",
      "M3: verify object integrity, detect missing or corrupt content and test recovery after interrupted writes; complete documentation and CI."
    ],
    validation: [
      "Use test-first development and fault injection around temporary writes, integrity validation and atomic snapshot publication; never publish an incomplete snapshot.",
      "Cover modified, renamed and deleted files, duplicate content, unsafe paths, symlinks and permissions. Verify that restoration cannot escape the destination.",
      "Document concurrent source-change limits. Keep the tool local and compact: no cloud synchronization, distributed backup, encryption, complex compression or graphical interface. No implementation or test result is claimed."
    ]
  },

];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
