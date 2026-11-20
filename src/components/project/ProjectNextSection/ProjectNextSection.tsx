import styles from "./ProjectNextSection.module.scss";

interface Props {
  current: number;
  total: number;
}

export default function ProjectNextSection({
  current,
  total,
}: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.line} />

      <div className={styles.info}>
        <span>{String(current).padStart(2, "0")}</span>

        <span>/ SCROLL FOR NEXT SECTION</span>

        <span>/{String(total).padStart(2, "0")}</span>
      </div>
    </section>
  );
}