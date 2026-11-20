"use client";

import { useEffect, useRef } from "react";

import ProjectHero from "@/sections/ProjectHero/ProjectHero";
import CliniemProject from "@/components/project/pages/CliniemProject/CliniemProject";
import ProjectNextSection from "@/components/project/ProjectNextSection/ProjectNextSection";

import cliniemStyles from "@/components/project/pages/CliniemProject/CliniemProject.module.scss";
import styles from "./ProjectPage.module.scss";

import gsap from "@/lib/gsap";

import { Project } from "@/types/project";
import { projects } from "@/data/projects/index";

interface Props {
  project: Project;
}

export default function ProjectPage({ project }: Props) {
  const currentIndex = projects.findIndex(
    (item) => item.slug === project.slug
  );

  const nextProject = projects[currentIndex + 1];

  const backgroundTransitionRef = useRef<HTMLDivElement>(null);

  const projectsRef = useRef<HTMLDivElement[]>([]);
  const nextTransitionRef = useRef<HTMLDivElement>(null);
  const nextSeparatorRef = useRef<HTMLDivElement>(null);
  const nextProjectRef = useRef<HTMLDivElement>(null);

  // URL update
  useEffect(() => {
    const elements = projectsRef.current.filter(Boolean);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const slug = entry.target.getAttribute("data-project-slug");

          if (!slug) return;

          const url = `/work/${slug}`;

          if (window.location.pathname !== url) {
            window.history.replaceState(
              window.history.state,
              "",
              url
            );
          }
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  // Scroll-linked transition
  useEffect(() => {
    const wrapper = nextTransitionRef.current;
    const separator = nextSeparatorRef.current;
    const next = nextProjectRef.current;

    if (!wrapper || !separator || !next) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top 85%",
        end: "+=900",
        scrub: 1,
      },
    });

    // Phase 1: separator moves out
    timeline.to(
      separator,
      {
        y: -220,
        duration: 0.75,
        ease: "none",
      },
      0
    );

    // Phase 2: next project enters near the end
    timeline.fromTo(
      next,
      {
        y: 180,
      },
      {
        y: 0,
        duration: 0.25,
        ease: "none",
      },
      0.375
    );

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, [nextProject]);

  return (
  <main>
    <div
      ref={backgroundTransitionRef}
      className={styles.transitionBackground}
    />
      {/* CURRENT PROJECT */}
      <div
        className={cliniemStyles.project}
        data-project-slug={project.slug}
        ref={(el) => {
          if (el) projectsRef.current[0] = el;
        }}
      >
        <ProjectHero project={project} />
        <CliniemProject project={project} />
      </div>

      {/* NEXT PROJECT */}
      {nextProject && (
        <div ref={nextTransitionRef}
        style={{ backgroundColor: "#F2F0EA" }}
        >
          <div ref={nextSeparatorRef}>
            <ProjectNextSection
              current={currentIndex + 1}
              total={projects.length}
            />
          </div>

          <div
            className={cliniemStyles.project}
            data-project-slug={nextProject.slug}
            ref={(el) => {
              nextProjectRef.current = el;
              if (el) projectsRef.current[1] = el;
            }}
          >
            <ProjectHero project={nextProject} />
            <CliniemProject project={nextProject} />
          </div>
        </div>
      )}
    </main>
  );
}