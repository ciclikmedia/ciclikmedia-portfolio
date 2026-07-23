'use client';

import { useLayoutEffect, useRef } from "react";

import gsap, { ScrollTrigger } from "@/lib/gsap";

import styles from "./Contact.module.scss";

export default function Contact() {
 
  const sectionRef =
    useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;

      if (!section) return;

      ScrollTrigger.create({
        trigger: section,

        start: "top 10%",

        end: "bottom bottom",

        onEnter: () => {
          document.body.classList.add("contact-theme");

          window.dispatchEvent(
            new CustomEvent("header:hide")
          );
        },

        onLeaveBack: () => {
          document.body.classList.remove("contact-theme");

          window.dispatchEvent(
            new CustomEvent("header:show")
          );
        },
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
    ref={sectionRef}
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
            data-cursor="view"
            data-cursor-label="Start Project"
          >
            <span>START A PROJECT</span>
          </a>
        </div>

      </div>
    </section>
  );
}