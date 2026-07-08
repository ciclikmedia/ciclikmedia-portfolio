'use client';

import styles from "./Footer.module.scss";

export default function Footer() {
 
  return (
    <footer className={styles.footer}>
      <div className="site-container">

        <div className={styles.socials}>
            <a
              href="#"
              className={styles.socialLink}
              data-cursor="footer"
            >
              <span>LinkedIn</span>

              <span className={styles.socialAccent}>
                LinkedIn
              </span>
            </a>

            <a
              href="#"
              className={styles.socialLink}
              data-cursor="footer"
            >
              <span>GitHub</span>

              <span className={styles.socialAccent}>
                GitHub
              </span>
            </a>

            <a
              href="#"
              className={styles.socialLink}
              data-cursor="footer"
            >
              <span>Instagram</span>

              <span className={styles.socialAccent}>
                Instagram
              </span>
            </a>
          </div>

        <div className={styles.bottom}>
          <span className={styles.credit}>
            Designed and Built by David Murillo.
          </span>

          <div className={styles.symbol}>
            <img
              src="/logos/ciclikmedia-symbol.svg"
              alt="Ciclikmedia"
              width={22}
              height={22}
            />
          </div>
        </div>

      </div>
    </footer>
  );
}