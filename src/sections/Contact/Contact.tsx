import styles from "./Contact.module.scss";

export default function Contact() {
  return (
    <section className={styles.contact}>
      <div className="container">

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
          >
            hello@ciclikmedia.com
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

          <a
            href="/contact"
            className={styles.button}
          >
            START A PROJECT
          </a>
        </div>
        
      </div>
    </section>
  );
}