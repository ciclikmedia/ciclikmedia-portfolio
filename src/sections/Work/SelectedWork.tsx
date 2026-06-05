import styles from "./SelectedWork.module.scss";

export default function SelectedWork() {
  return (
    <section className={styles.selectedWork}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>Selected Work</span>

          <h2>Selected Work</h2>

          <p>
            A curated selection of digital experiences, interfaces and systems.
          </p>

          <a href="/work" className={styles.link}>
            SEE THE WORK
            <span>→</span>
          </a>
        </div>

        <div className={styles.project}>
          <span className={styles.counter}>01/04</span>

          <div className={styles.image}>
            <div className={styles.viewProject}>
              <span>↗</span>
              <small>View Project</small>
            </div>
          </div>

          <div className={styles.info}>
            <h3>Ciclikmedia Portfolio</h3>

            <span>
              Frontend Development · Motion Design · 2025
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}