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
  bodyColor?: "red" | "beige" | "dark";
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

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero || !bodyColor) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        document.body.classList.remove("bg-red", "bg-beige", "bg-dark");
        document.body.classList.add(`bg-${bodyColor}`);
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, [bodyColor]);

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      data-cursor="hero"
      data-cursor-label="Scroll"
    >
      <Container>
        <div className={styles.contentWrapper}>
          <div className={styles.contentMask}>
            <div className={styles.content} data-hero-content>
              <h1 className={styles.title}>
                {project.title}
              </h1>

              <p className={styles.subtitle}>
                {project.subtitle}
              </p>
            </div>
          </div>
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
            sizes="90vw"
            className={styles.image}
            onLoad={() => {
              transition.finish();
            }}
          />
        </div>

        <div className={styles.projectFocus}>
          <span>PROJECT FOCUS</span>
          <p>HEALTHCARE + WELLNESS</p>
          <p>MEDICAL AESTHETICS + DIGITAL</p>
        </div>
      </Container>
    </section>
  );
}