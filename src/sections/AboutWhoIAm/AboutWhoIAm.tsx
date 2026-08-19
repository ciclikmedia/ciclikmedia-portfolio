import Container from "@/components/layout/Container/Container";

import styles from "./AboutWhoIAm.module.scss";

export default function AboutWhoIAm() {
  return (
    <section className={styles.section}>

      <Container>

        <div className={styles.header}>

          <span className={styles.eyebrow}>
            02 — About
          </span>
        </div>


        <div className={styles.content}>

          <h2>
            A LITTLE
            <br />
            ABOUT ME.
          </h2>


          <div className={styles.description}>

           <p>
            I’ve been doing this for well over a decade now. I’ve
            worked with design studios, advertising agencies,
            technology companies and all kinds of independent
            projects. A lot of different teams, a lot of different
            challenges, and more than a few late nights.
            </p>

            <p>
            Front-end development is my main thing, but I’ve also
            spent plenty of time working on the UX and UI side of
            things. I like being involved in both worlds, from
            figuring out how something should work to actually
            making it work.
            </p>

            <p>
            These days, I’m particularly interested in interaction,
            motion and all those little details that can make a
            digital experience feel just right.
            </p>
          </div>

        </div>


        

      </Container>

    </section>
  );
}