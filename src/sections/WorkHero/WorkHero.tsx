'use client';

import { useEffect } from "react";

import Container from "@/components/layout/Container/Container";
import PageHero from "@/components/layout/PageHero/PageHero";

import { getCursorPosition } from "@/utils/cursorPosition";

import styles from "./WorkHero.module.scss";

export default function WorkHero() {

  

useEffect(() => {
  const { x, y } = getCursorPosition();

  window.dispatchEvent(
    new CustomEvent("cursor:show", {
      detail: {
        x: x || window.innerWidth / 2,
        y: y || window.innerHeight / 2,
      },
    })
  );
}, []);

 return (
  <PageHero>
    <section
      className={styles.hero}
      data-cursor="workHero"
    >
      <Container>

          <div className={styles.content}>
            <span className={styles.eyebrow}>
              Selected Work
            </span>

            <h1 className={styles.title}>
              Work
            </h1>

            <p className={styles.description}>
              A curated selection of digital experiences,
              products and brands crafted with a strong
              focus on design, motion and performance.
            </p>

            <div className={styles.meta}>
              <span>04 Projects</span>
              <span>2024 — Present</span>
            </div>

          </div>

        </Container>
      </section>
    </PageHero>
  );
}