import styles from "./Hero.module.scss";

export default function DynamicHeadline() {
  const headline = "Motion Systems";

  return (
    <h2 className={styles.dynamicHeadline}>
      {headline}
    </h2>
  );
}