"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import ProjectHero from "@/sections/ProjectHero/ProjectHero";
import CliniemProject from "@/components/project/pages/CliniemProject/CliniemProject";
import TejidosRocaProject from "@/components/project/pages/TejidosRocaProject/TejidosRocaProject";
import ProjectNextSection from "@/components/project/ProjectNextSection/ProjectNextSection";
import styles from "./ProjectPage.module.scss";

import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Project } from "@/types/project";
import { projects } from "@/data/projects/index";

interface Props {
  project: Project;
}

export default function ProjectPage({ project }: Props) {
  const [activeProject, setActiveProject] = useState(project);
  const isTransitioningRef = useRef(false);
  const ctxRef = useRef<gsap.Context | null>(null);
  const hasChangedProjectRef = useRef(false);

  const currentIndex = projects.findIndex(
    (item) => item.slug === activeProject.slug
  );

  const nextProject = projects[currentIndex + 1];

  const CurrentProjectComponent =
    activeProject.slug === "tejidosroca"
      ? TejidosRocaProject
      : CliniemProject;

  const NextProjectComponent =
    nextProject?.slug === "tejidosroca"
      ? TejidosRocaProject
      : CliniemProject;

  const backgroundTransitionRef = useRef<HTMLDivElement>(null);
  const nextTransitionRef = useRef<HTMLDivElement>(null);
  const nextSeparatorRef = useRef<HTMLDivElement>(null);
  const nextProjectRef = useRef<HTMLDivElement>(null);

  const getProjectBgColor = (slug: string) =>
    slug === "tejidosroca" ? "#FFCBCE" : "#9B6B58";

  useLayoutEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.revert();
      ctxRef.current = null;
    }

    if (nextProjectRef.current) {
      gsap.set(nextProjectRef.current, { clearProps: "all" });
    }
    if (nextSeparatorRef.current) {
      gsap.set(nextSeparatorRef.current, { clearProps: "all" });
    }
    if (backgroundTransitionRef.current) {
      gsap.set(backgroundTransitionRef.current, {
        y: "200vh",
        opacity: 0,
      });
    }

    const body = document.body;
    const header = document.getElementById("site-header");

    body.style.transition = "none";
    if (header) {
      header.style.transition = "none";
      header.dataset.blur = "false";
    }

    window.scrollTo(0, 0);
    window.dispatchEvent(new Event("lenis:scrollToTop"));
    window.dispatchEvent(new Event("lenis:start"));

    const url = `/work/${activeProject.slug}`;
    if (window.location.pathname !== url) {
      window.history.replaceState(window.history.state, "", url);
    }

    ScrollTrigger.refresh();
    window.dispatchEvent(new Event("body:refresh-theme"));
    window.dispatchEvent(new Event("header:refresh-theme"));

    const frame = requestAnimationFrame(() => {
      body.style.transition = "";
      isTransitioningRef.current = false;

      if (header) {
        header.dataset.blur = "false";
      }

      if (hasChangedProjectRef.current) {
        window.dispatchEvent(new Event("header:show"));
      }

      requestAnimationFrame(() => {
        if (header) {
          header.style.transition = "";
        }
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [activeProject]);

  useEffect(() => {
    const wrapper = nextTransitionRef.current;
    const separator = nextSeparatorRef.current;
    const next = nextProjectRef.current;
    const bgOverlay = backgroundTransitionRef.current;

    if (!wrapper || !separator || !next || !nextProject) return;

    const focusEl = next.querySelector<HTMLElement>('[class*="projectFocus"]');
    const heroImageEl = next.querySelector<HTMLElement>(
      "[data-transition-target]"
    );

    const launchSmoothAscent = () => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      hasChangedProjectRef.current = true;

      const header = document.getElementById("site-header");
      if (header) {
        header.style.transition = "none";
        header.dataset.blur = "false";
      }
      window.dispatchEvent(new Event("lenis:stop"));

      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === wrapper) st.kill(false);
      });

      const rect = next.getBoundingClientRect();
      const currentY = Number(gsap.getProperty(next, "y")) || 0;
      const targetY = currentY - rect.top;

      const sepRect = separator.getBoundingClientRect();
      const currentSepY = Number(gsap.getProperty(separator, "y")) || 0;
      const targetSepY = currentSepY - Math.max(0, sepRect.bottom) - 40;

      const nextTextColor =
        nextProject.slug === "tejidosroca" ? "#050505" : "#ffffff";

      const ascentTl = gsap.timeline({
        onComplete: () => {
          document.body.style.transition = "none";
          const heroTheme =
            nextProject.slug === "tejidosroca"
              ? "bg-hero-tejidosroca"
              : "bg-hero-cliniem";

          document.body.classList.forEach((cls) => {
            if (cls.startsWith("bg-")) document.body.classList.remove(cls);
          });
          document.body.classList.add(heroTheme);

          setActiveProject(nextProject);
        },
      });

      ascentTl
        .to(
          separator,
          {
            y: targetSepY,
            duration: 0.25,
            ease: "power2.in",
          },
          0
        )
        .to(
          bgOverlay,
          {
            y: "0vh",
            duration: 0.75,
            ease: "power3.out",
          },
          0
        )
        .to(
          next,
          {
            y: targetY,
            color: nextTextColor,
            duration: 1.05,
            ease: "power3.out",
          },
          0
        );

      if (focusEl) {
        ascentTl.to(
          focusEl,
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
          },
          0.3
        );
      }

      if (heroImageEl) {
        ascentTl.to(
          heroImageEl,
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
          },
          0.4
        );
      }
    };

    const ctx = gsap.context(() => {
      const nextColor = getProjectBgColor(nextProject.slug);

      if (bgOverlay) {
        gsap.set(bgOverlay, {
          background: `linear-gradient(to top, ${nextColor} 0%, ${nextColor} 50%, rgba(0, 0, 0, 0) 100%)`,
          opacity: 1,
          y: "200vh",
        });
      }

      if (focusEl) {
        gsap.set(focusEl, { y: 80, opacity: 0 });
      }
      if (heroImageEl) {
        gsap.set(heroImageEl, { y: 140, opacity: 0 });
      }

      gsap.set(next, { y: 260 });

      const parallaxTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 85%",
          end: () => `+=${window.innerHeight * 0.95}`,
          scrub: true,
          onLeave: launchSmoothAscent,
        },
      });

      parallaxTl
        .to(
          separator,
          {
            y: () => -window.innerHeight * 0.55,
            duration: 1,
            ease: "none",
          },
          0
        )
        .to(
          bgOverlay,
          {
            y: "10vh",
            duration: 1,
            ease: "none",
          },
          0
        )
        .to(
          next,
          {
            y: -40,
            duration: 0.9,
            ease: "none",
          },
          0.1
        );
    }, wrapper);

    ctxRef.current = ctx;
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === wrapper) st.kill(false);
      });
    };
  }, [nextProject]);

  return (
    <main>
      <div
        ref={backgroundTransitionRef}
        className={styles.transitionBackground}
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          height: "200vh",
          zIndex: 5,
          pointerEvents: "none",
          opacity: 0,
          transform: "translateY(200vh)",
        }}
      />

      <div
        key={`current-${activeProject.slug}`}
        data-project-slug={activeProject.slug}
        style={{ position: "relative", zIndex: 1 }}
      >
        <ProjectHero
          project={activeProject}
          bodyColor={
            activeProject.slug === "tejidosroca"
              ? "hero-tejidosroca"
              : "hero-cliniem"
          }
        />

        <CurrentProjectComponent project={activeProject} />
      </div>

      {nextProject && (
        <div
          key={`next-${nextProject.slug}`}
          ref={nextTransitionRef}
          data-project-transition
          style={{ position: "relative", zIndex: 10 }}
        >
          <div
            ref={nextSeparatorRef}
            style={{ position: "relative", zIndex: 20 }}
          >
            <ProjectNextSection
              current={currentIndex + 1}
              total={projects.length}
            />
          </div>

          <div
            data-project-slug={nextProject.slug}
            ref={nextProjectRef}
            style={{
              position: "relative",
              zIndex: 30,
              backgroundColor: "transparent",
            }}
          >
            <ProjectHero
              project={nextProject}
              bodyColor={
                nextProject.slug === "tejidosroca"
                  ? "hero-tejidosroca"
                  : "hero-cliniem"
              }
              disableThemeObserver
            />

            <NextProjectComponent project={nextProject} />
          </div>
        </div>
      )}
    </main>
  );
}
