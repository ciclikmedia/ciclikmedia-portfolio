'use client';

import { useEffect } from "react";
import Image from "next/image";

import { useTransitionStore } from "@/stores/useTransitionStore";

import styles from "./ProjectHero.module.scss";

import Container from "@/components/layout/Container/Container";

import ProjectSection from "@/components/project/ProjectSection/ProjectSection";
import ProjectOverview from "@/components/project/ProjectOverview/ProjectOverview";

import ProjectChapter from "@/components/project/ProjectChapter/ProjectChapter";
import ProjectFullscreenImage from "@/components/project/ProjectFullscreenImage/ProjectFullscreenImage";
import ProjectText from "@/components/project/ProjectText/ProjectText";

import { Project } from "@/types/project";

interface Props {
  project: Project;
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

        <section
            className={styles.hero}
            data-cursor="hero"
            data-cursor-label="Scroll"
        >

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

        <Container>

            <div className={styles.contentWrapper}>

                <div className={styles.content}>

                    <h1>{project.title}</h1>

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

        </Container>

    </section>

      <ProjectSection>

          <ProjectChapter
              number="01"
              title="Overview"
          />

          <ProjectOverview
              overview={project.overview}
              client={project.client}
              year={project.year}
              role={project.role}
              services={project.services}
          />

      </ProjectSection>

      <ProjectFullscreenImage
          src={project.heroImage}
          alt={project.title}
      />

      <ProjectSection>

      <ProjectChapter
          number="02"
          title="Challenge"
      />

      <ProjectText>

          <p>{project.challenge}</p>

      </ProjectText>

  </ProjectSection>

    </main>

  );

}