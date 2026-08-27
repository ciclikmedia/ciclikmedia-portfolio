import Container from "@/components/layout/Container/Container";

import styles from "./AboutSnapshot.module.scss";

export default function AboutSnapshot() {
  return (
    <section className={styles.section}>
      <Container>

        <div className={styles.header}>
          <span className={styles.eyebrow}>
            03 — Snapshot
          </span>
        </div>

        <div className={styles.snapshot}>

          {/* INTRO */}

          <div className={styles.intro}>
            <h2>
              A QUICK
              <br />
              SNAPSHOT
            </h2>
          </div>


          {/* EXPERIENCE */}

          <article className={styles.item}>
            <span className={styles.label}  data-cursor="solid">
              Experience
            </span>

            <strong className={styles.value}>SINCE <br />2009</strong>

            {/*<strong className={styles.number}>
              17+
            </strong>

            <span className={styles.subLabel}>
              YEARS · SINCE 2009
            </span>*/}

            <p>
            Still experimenting. Still pushing my ideas further. Still making them work... almost always.
            </p>
          </article>


          {/* EXPERTISE */}

          <article className={styles.item}>
            <span className={styles.label} data-cursor="solid">
              Expertise
            </span>

            <strong className={styles.value}>
              Front-end
              <br />
              UX &amp; UI
            </strong>

            <p>
              Designing and building digital
              experiences from concept
              to interface.
            </p>
          </article>


          {/* DIGITAL */}

          <article className={styles.item}>
            <span className={styles.label} data-cursor="solid">
                Background
            </span>

            <strong className={styles.value}>
                Development
                <br />
                Design Digital
                <br />
                 Experiences
            </strong>

            <p>
                Where technical thinking meets creative ideas to shape digital experiences.
            </p>
        </article>

          {/* COLLABORATION */}

          <article className={styles.item}>
            <span className={styles.label} data-cursor="solid">
                Working across
            </span>

            <strong className={styles.value}>
                Agencies
                <br />
                Studios
                <br />
                Brands
                <br />
                Freelance
            </strong>

            <p>
                From working within teams to taking
                projects on independently.
            </p>
          </article>


          {/* TOOLKIT */}

          <article className={styles.item}>
            <span className={styles.label} data-cursor="solid">
              Toolkit
            </span>

            <strong className={styles.value}>
              Design
              <br />
              Code
              <br />
              Motion
            </strong>

            <p>
              From interface design to
              front-end development
              and interaction.
            </p>
          </article>


          {/* PROCESS */}

          <article className={styles.item}>
            <span className={styles.label} data-cursor="solid">
              Process
            </span>

            <strong className={styles.value}>
             From Idea to Code 
            </strong>

            <p>
             I like being involved from the
            early stages, shaping the idea
            and bringing it to life.
            </p>
          </article>

        </div>

      </Container>
    </section>
  );
}