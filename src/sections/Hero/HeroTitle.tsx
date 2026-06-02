import styles from "./Hero.module.scss";

export default function HeroTitle() {
  return (
    <h1 className={styles.title}>
      <span>Digital</span>
      <br />
      <span>experiences</span>
    </h1>
  );
}