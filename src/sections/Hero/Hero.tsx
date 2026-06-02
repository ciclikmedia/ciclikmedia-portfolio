import styles from "./Hero.module.scss";

import Navbar from "./Navbar";
import HeroTitle from "./HeroTitle";
import DynamicHeadline from "./DynamicHeadline";
import HeroDescription from "./HeroDescription";
import HeroSymbol from "./HeroSymbol";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Navbar />

      <div className="container">
        <div className={styles.content}>
          <HeroTitle />

          <div className={styles.headline}>
            <DynamicHeadline />
          </div>

          <div className={styles.description}>
            <HeroDescription />
          </div>
        </div>
      </div>

      <HeroSymbol />
    </section>
  );
}