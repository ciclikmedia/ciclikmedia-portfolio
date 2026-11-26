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

  // 1. Resetear scroll y propiedades GSAP de forma síncrona cuando el nuevo proyecto ya está en top: 0
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

    const body = document.body;
    const header = document.getElementById("site-header");

    body.style.transition = "none";
    if (header) {
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
    });

    return () => cancelAnimationFrame(frame);
  }, [activeProject]);

  // 2. Escalonamiento: Next sube primero -> al pasar por el centro empieza a asomar el proyecto despacio por abajo -> Next sale por arriba -> proyecto sube suave a top: 0
  useEffect(() => {
    const wrapper = nextTransitionRef.current;
    const separator = nextSeparatorRef.current;
    const next = nextProjectRef.current;

    if (!wrapper || !separator || !next || !nextProject) return;

    const launchSmoothAscent = () => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      const header = document.getElementById("site-header");
      if (header) {
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

      // 1. El bloque Next termina de salir por arriba
      ascentTl
        .to(
          separator,
          {
            y: targetSepY,
            duration: 0.3,
            ease: "power2.in",
          },
          0
        )
        // 2. El proyecto (que viene desde abajo despacito) sube suave hasta top: 0
        .to(
          next,
          {
            y: targetY,
            duration: 0.9,
            ease: "power3.out",
          },
          0.08
        )
        // 3. Baja el header limpio en la recta final
        .add(() => {
          if (header) {
            header.dataset.blur = "false";
          }
          window.dispatchEvent(new Event("header:show"));
        }, 0.35);
    };

        const ctx = gsap.context(() => {
      // Más abajo inicialmente para retrasar su aparición y que entre muy despacio
      gsap.set(next, { y: 320 });

      const parallaxTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 95%",
          endTrigger: separator,
          end: "bottom top",
          scrub: true,
          onLeave: launchSmoothAscent,
          onUpdate: () => {
            if (separator.getBoundingClientRect().bottom <= 0) {
              launchSmoothAscent();
            }
          },
        },
      });

      // El bloque Next sube hasta salir por arriba
      parallaxTl
        .to(
          separator,
          {
            y: -240,
            duration: 1,
            ease: "none",
          },
          0
        )
        // Entra más tarde (0.45) y recorre poca distancia (320 -> 140) para ir muy lento por abajo
        .to(
          next,
          {
            y: 140,
            duration: 0.55,
            ease: "none",
          },
          0.45
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
      />

      {/* PROYECTO ACTUAL */}
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

      {/* SIGUIENTE PROYECTO */}
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
              backgroundColor:
                nextProject.slug === "tejidosroca"
                  ? "var(--color-hero-tejidosroca, #f4f3ef)"
                  : "var(--color-hero-cliniem, #1d1d20)",
            }}
          >
            <ProjectHero
              project={nextProject}
              bodyColor={
                nextProject.slug === "tejidosroca"
                  ? "hero-tejidosroca"
                  : "hero-cliniem"
              }
            />

            <NextProjectComponent project={nextProject} />
          </div>
        </div>
      )}
    </main>
  );
}
