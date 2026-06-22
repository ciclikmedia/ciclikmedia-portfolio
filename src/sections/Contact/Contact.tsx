'use client';

import styles from "./Contact.module.scss";

import Magnetic from '@/components/ui/Magnetic/Magnetic';

import { useCursor } from '@/hooks/useCursor';

export default function Contact() {
  const { setVariant, setLabel } =
    useCursor();

  return (
    <section 
    id="contact-section"
    className={styles.contact}>
      <div className="site-container">

        <span className={styles.eyebrow}>
          CONTACT
        </span>

        <div className={styles.hero}>
          <h2>
            LET&apos;S BUILD
            <br />
            SOMETHING
          </h2>

          <a
            href="mailto:hello@ciclikmedia.com"
            className={styles.email}
            onMouseEnter={() => {
              setVariant('view');
              setLabel('↗\nLet’s talk?');
            }}
            onMouseLeave={() => {
              setVariant('default');
              setLabel('');
            }}
          >
            <span className={styles.emailBase}>
              hello@ciclikmedia.com
            </span>

            <span className={styles.emailAccent}>
              hello@ciclikmedia.com
            </span>
          </a>

          <h2>
            GREAT.
          </h2>
        </div>

        <div className={styles.content}>
          <p>
            Available for freelance projects,
            <br />
            creative collaborations and
            <br />
            full-time opportunities.
          </p>

          <Magnetic>
  <a
    href="/contact"
    className={styles.button}
    onMouseEnter={() => {
      setVariant('view');
      setLabel('↗\nStart Project');
    }}
    onMouseLeave={() => {
      setVariant('default');
      setLabel('');
    }}
  >
    <span>START A PROJECT</span>
  </a>
</Magnetic>
        </div>

      </div>
    </section>
  );
}