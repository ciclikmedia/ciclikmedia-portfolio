'use client';

import { useEffect, useLayoutEffect } from "react";

import Image from "next/image";

import styles from "./ProjectHero.module.scss";

import { showDefaultCursorPosition } from "@/utils/cursor";

import Container from "@/components/layout/Container/Container";

import { useTransition } from "@/transition";

import { Project } from "@/types/project";

interface Props {
  project: Project;
}

export default function ProjectHero({
  project,
}: Props) {

  const transition = useTransition();

  useLayoutEffect(() => {

    if (transition.isTransitioning) return;

    const hero = document.querySelector(
      "[data-transition-target]"
    ) as HTMLElement | null;

    if (!hero) return;

    hero.style.opacity = "1";

  }, [transition.isTransitioning]);


  useEffect(() => {

    if (transition.isTransitioning) return;

    showDefaultCursorPosition();

  }, [transition.isTransitioning]);


  return (

    <section
      className={styles.hero}
      data-cursor="hero"
      data-cursor-label="Scroll"
    >

      <div
        className={styles.heroImage}
        data-transition-target
      >

        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className={styles.image}
          onLoad={() => {
            transition.finish();
          }}
        />

      </div>


      <Container>

        <div className={styles.contentWrapper}>

          <div className={styles.contentMask}>

            <div
              className={styles.content}
              data-hero-content
            >

              <h1 className={styles.title}>
                {project.title}
              </h1>

              <p className={styles.subtitle}>
                {project.subtitle}
              </p>

              <div className={styles.meta}>

                <div>
                  <span>Client</span>
                  <p>{project.client}</p>
                </div>

                <div>
                  <span>Year</span>
                  <p>{project.year}</p>
                </div>

                <div>
                  <span>Role</span>
                  <p>{project.role}</p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </Container>

    </section>

  );
}