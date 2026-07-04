'use client';

import { useEffect } from "react";
import Image from "next/image";

import { useTransitionStore } from "@/stores/useTransitionStore";

import styles from "./ProjectHero.module.scss";

interface Props {
  project: {
    title: string;
    image: string;
    slug: string;
    services: string[];
  };
}

export default function ProjectHero({
  project,
}: Props) {

    const projectTransition = useTransitionStore(
        (state) => state.project
    );

    const setOverlayVisible = useTransitionStore(
        (state) => state.setOverlayVisible
    );

    const setProject = useTransitionStore(
        (state) => state.setProject
    );

  useEffect(() => {

        if (!projectTransition) return;

        requestAnimationFrame(() => {

            setOverlayVisible(false);

            setTimeout(() => {

                setProject(null);

            }, 350);

        });

    }, [
        projectTransition,
        setOverlayVisible,
        setProject,
    ]);

  return (

    <main className={styles.page}>

      <section className={styles.hero}>

        <div
          className={styles.heroImage}
          id="project-hero-image"
        >

          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className={styles.image}
          />

        </div>

        <div className={styles.content}>

          <h1>{project.title}</h1>

        </div>

      </section>

    </main>

  );

}