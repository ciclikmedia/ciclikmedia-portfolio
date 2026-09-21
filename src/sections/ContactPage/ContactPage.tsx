"use client";

import { useEffect } from "react";

import Container from "@/components/layout/Container/Container";

import styles from "./ContactPage.module.scss";

export default function ContactPage() {

  useEffect(() => {
    window.dispatchEvent(
      new Event("cursor:show")
    );
  }, []);

  return (
    <main className={styles.page}>
      <Container>

        <section className={styles.contact}>

          <div className={styles.header}>
            <span className={styles.eyebrow}>
              CONTACT
            </span>
          </div>

          <div className={styles.intro}>
            <h1>
              GOT SOMETHING
              <br />
              IN MIND?
            </h1>

            <p className={styles.description}>
              Have a project, an idea or just want to say hello?
            </p>
          </div>

          <div className={styles.content}>

            <div className={styles.emailBlock}>
              

           <a
            href="mailto:hello@ciclikmedia.com"
            className={styles.email}
            data-cursor="view"
            data-cursor-label="Let's talk?"
          >
            <span className={styles.emailBase}>
              hello@ciclikmedia.com
            </span>

            <span className={styles.emailAccent}>
              hello@ciclikmedia.com
            </span>
          </a>
            </div>

            

          </div>

        </section>

      </Container>
    </main>
  );
}