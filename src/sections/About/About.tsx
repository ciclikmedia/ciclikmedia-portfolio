import styles from "./About.module.scss";

export default function About() {
  return (
    <section className={styles.about}>
      <div className="container">

        <div className={styles.grid}>

          <div className={styles.content}>

            <span className={styles.eyebrow}>
              ABOUT
            </span>

            <h2>
              DESIGNING,
              <br />
              DEVELOPING
              <br />
              AND
              <br />
              ANIMATING
              <br />
              DIGITAL
              <br />
              PRODUCTS.
            </h2>

            <p>
              I'm David Murillo,
              <br />
              a frontend developer focused on creative
              development, motion systems and modern
              digital experiences.
            </p>

            <a
              href="/about"
              className={styles.link}
            >
              MORE ABOUT ME 
              <span>→</span>
            </a>

          </div>

          <div className={styles.reel}>
            <span>Motion Reel</span>
          </div>

        </div>

      </div>
    </section>
  );
}