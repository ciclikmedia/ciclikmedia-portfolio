import styles from "./Hero.module.scss";

export default function HeroDescription() {
  return (
    <p className={styles.heroDescription}>
      Frontend development
      <br />
      UX/UI systems and creative motion
      <br />
      for modern digital products.
    </p>
  );
}