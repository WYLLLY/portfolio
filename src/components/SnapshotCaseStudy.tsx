import type { Project } from "@/content/projects";
import { ArchitectureExplorer, type ArchitectureScenario, type ScenarioKey } from "./ArchitectureExplorer";
import { CaseStudy } from "./CaseStudy";
import styles from "./SnapshotCaseStudy.module.css";

const nodes = [
  { id: "source", number: "01", label: "Source tree", detail: "Read regular files without modifying them. Reject symlinks, special files and unsafe paths. Check file identity and metadata before and after reading, then again before publication." },
  { id: "temporary", number: "02", label: "Hash & validate", detail: "Stream bytes into an exclusive temporary file while calculating SHA-256. Re-read and validate the temporary content, then synchronize it before publication." },
  { id: "objects", number: "03", label: "Content store", detail: "Publish immutable objects without overwriting existing names. Synchronize their directories before recording references. Identical content shares one object across paths and snapshots." },
  { id: "manifest", number: "04", label: "SQLite manifest", detail: "Insert a complete manifest and its final snapshot header in one transaction. The commit is the publication boundary; an uncommitted snapshot cannot appear as complete." },
  { id: "restore", number: "05", label: "Restore & verify", detail: "Validate manifests and object contents. Restore through temporary files inside a new destination, publish complete files and apply ordinary permissions and modification times." },
] as const;

const scenarios: Record<ScenarioKey, ArchitectureScenario> = {
  success: {
    eyebrow: "01 / COMPLETE SNAPSHOT",
    heading: "Publish after the bytes are durable.",
    steps: [
      "Capture regular-file contents and verify the temporary objects against their SHA-256 identities.",
      "Publish and synchronize new objects before referencing them. Reuse validated existing content.",
      "Commit the complete manifest and snapshot header together, then return the snapshot identifier.",
    ],
    outcome: "Complete snapshot visible · objects shared safely",
    trace: ["source → read and hash", "temporary → revalidated", "CAS → published and synchronized", "SQLite → complete manifest committed", "CLI → snapshot identifier"],
  },
  failure: {
    eyebrow: "02 / INTERRUPTION BEFORE COMMIT",
    heading: "Keep the incomplete snapshot invisible.",
    steps: [
      "A process stops while preparing objects or inserting uncommitted manifest entries.",
      "SQLite recovers its own journal; previous committed snapshots remain available. Durable orphaned objects may remain.",
      "Recovery removes only recognized temporary files. The next backup performs a fresh scan and can reuse valid durable content.",
    ],
    outcome: "No partial snapshot · previous versions retained",
    trace: ["temporary → partial or durable objects", "process → interrupted before commit", "SQLite → uncommitted changes rolled back", "recover → recognized temporaries only", "history → previous snapshots restorable"],
  },
  timeout: {
    eyebrow: "03 / CORRUPT OR MISSING OBJECT",
    heading: "Report the missing evidence.",
    steps: [
      "An expected object is missing, has an unsafe type or does not match its recorded SHA-256 and size.",
      "Verification reports an integrity error. Restoration cannot silently substitute an empty or unverified file.",
      "The engine preserves the evidence; it does not overwrite the bad object or claim automatic repair.",
    ],
    outcome: "Integrity error · no silent replacement",
    trace: ["manifest → expected content identity", "object → missing or hash mismatch", "verify / restore → integrity error", "existing data → preserved", "repair → outside automatic recovery"],
  },
};

export function SnapshotCaseStudy({ project }: { project: Project }) {
  return (
    <CaseStudy project={project}>
      <section className={`case-section ${styles.section}`} aria-labelledby="snapshot-publication">
        <h2 id="snapshot-publication">Publication & recovery</h2>
        <div className="case-section-body">
          <p>The filesystem and SQLite have separate durability boundaries. Explore how the engine orders them before a snapshot becomes visible.</p>
          <ArchitectureExplorer
            nodes={nodes}
            initialNodeId="manifest"
            scenarios={scenarios}
            flowLabel="Read → validate → publish → commit"
            scenarioLabel="Backup and integrity scenario"
            scenarioLabels={{ success: "Published", failure: "Interrupted", timeout: "Corrupt object" }}
            traceLabel="LOCAL BACKUP FLOW"
            description="Follow the implemented publication and integrity boundaries."
            note="Simplified behavior maps, not captured logs or a live backup. Interruption here means before the SQLite commit; a process killed after commit can leave a complete snapshot without a success response. SIGKILL tests do not establish physical power-loss durability."
          />
        </div>
      </section>
      <section className={`case-section ${styles.section}`} aria-labelledby="snapshot-demo">
        <h2 id="snapshot-demo">Verified local demonstration</h2>
        <div className="case-section-body">
          <p>Two files initially share the same bytes. The next version renames one path, modifies another, deletes a distinct file and adds a duplicate.</p>
          <dl className={styles.facts}>
            <div><dt>Snapshots created</dt><dd>3</dd></div>
            <div><dt>Distinct objects retained</dt><dd>3</dd></div>
            <div><dt>Historical versions restored</dt><dd>2</dd></div>
          </dl>
          <div className={styles.console}>
            <p>Command sequence / illustration of the verified workflow</p>
            <pre><code>{`sbe --repo ./backup init
sbe --repo ./backup backup ./source
sbe --repo ./backup snapshots
sbe --repo ./backup restore <snapshot-id> ./restored
sbe --repo ./backup verify
sbe --repo ./backup recover`}</code></pre>
          </div>
          <p className={styles.caption}>Counts come from the installed CLI demonstration, not a benchmark. Both historical restores were checked; verification and repeated recovery passed. Source code remains private.</p>
        </div>
      </section>
    </CaseStudy>
  );
}
