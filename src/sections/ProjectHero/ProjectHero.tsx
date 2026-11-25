'use client';

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";

import styles from "./ProjectHero.module.scss";

import { showDefaultCursorPosition } from "@/utils/cursor";
import Container from "@/components/layout/Container/Container";
import { useTransition } from "@/transition";
import { Project } from "@/types/project";

interface Props {
  project: Project;
  bodyColor?: string;
}

export default function ProjectHero({ project, bodyColor }: Props) {
  const transition = useTransition();
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (transition.isTransitioning) return;

    const heroImage = heroRef.current?.querySelector(
      "[data-transition-target]"
    ) as HTMLElement | null;

    if (!heroImage) return;

    heroImage.style.opacity = "1";
  }, [transition.isTransitioning]);

  useEffect(() => {
    if (transition.isTransitioning) return;

    showDefaultCursorPosition();
  }, [transition.isTransitioning]);

  

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      data-cursor="hero"
      data-cursor-label="Scroll"
      data-body-theme={bodyColor}
    >
      <Container>
        <div className={styles.contentWrapper}>
          <div className={styles.contentMask}>
            <div className={styles.content} data-hero-content>
              <h1 className={styles.title}>
                {project.title}
              </h1>

              {/*<p className={styles.subtitle}>
                {project.subtitle}
              </p>*/}
            </div>
          </div>
        </div>

       <div className={styles.projectFocus}>
        <span>PROJECT FOCUS</span>
        <p>{project.projectFocus}</p>
      </div>

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
      </Container>
    </section>
  );
}