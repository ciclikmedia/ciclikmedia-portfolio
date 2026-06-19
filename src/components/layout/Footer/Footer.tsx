'use client';

import styles from "./Footer.module.scss";

import Image from "next/image";

import { useCursor } from '@/hooks/useCursor';

export default function Footer() {
  const { setVariant } = useCursor();
  return (
    <footer className={styles.footer}>
      <div className="site-container">

        <div className={styles.socials}>
          <a
            href="#"
            className={styles.socialLink}
            onMouseEnter={() => {
              setVariant('footer');
            }}
            onMouseLeave={() => {
              setVariant('default');
            }}
          >
            <span>LinkedIn</span>

            <span className={styles.socialAccent}>
              LinkedIn
            </span>
          </a>

          <a
            href="#"
            className={styles.socialLink}
            onMouseEnter={() => {
              setVariant('footer');
            }}
            onMouseLeave={() => {
              setVariant('default');
            }}
          >
            <span>GitHub</span>

            <span className={styles.socialAccent}>
              GitHub
            </span>
          </a>

          <a
            href="#"
            className={styles.socialLink}
            onMouseEnter={() => {
              setVariant('footer');
            }}
            onMouseLeave={() => {
              setVariant('default');
            }}
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
            <Image
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