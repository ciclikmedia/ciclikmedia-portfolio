'use client';

import styles from "./About.module.scss";

import { useCursor } from '@/hooks/useCursor';

export default function About() {
  const { setVariant } =
    useCursor();

  return (
    <section className={styles.about}>
      <div className="site-container">

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
              onMouseEnter={() => {
                setVariant('link');
              }}
              onMouseLeave={() => {
                setVariant('default');
              }}
            >
              <span>
                MORE ABOUT ME&nbsp;&nbsp;&nbsp;&nbsp;→
              </span>

              <span className={styles.linkAccent}>
                MORE ABOUT ME&nbsp;&nbsp;&nbsp;&nbsp;→
              </span>
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