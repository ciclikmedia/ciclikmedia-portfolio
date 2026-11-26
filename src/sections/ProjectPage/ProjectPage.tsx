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

  // 1. Resetear scroll y propiedades GSAP de forma síncrona cuando el proyecto ya está en top: 0
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

    const html = document.documentElement;
    const body = document.body;
    const header = document.getElementById("site-header");

    html.style.scrollBehavior = "auto";
    body.style.transition = "none";

    // Quitamos el blur antes de resetear el scroll para evitar el salto visual
    if (header) {
      header.dataset.blur = "false";
    }

    window.dispatchEvent(new Event("lenis:start"));
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event("lenis:scrollToTop"));

    const url = `/work/${activeProject.slug}`;
    if (window.location.pathname !== url) {
      window.history.replaceState(window.history.state, "", url);
    }

    window.dispatchEvent(new Event("scroll"));
    ScrollTrigger.refresh();
    window.dispatchEvent(new Event("header:refresh-theme"));

    // Volvemos a forzar blur="false" tras el evento scroll
    if (header) {
      header.dataset.blur = "false";
    }

    const frame = requestAnimationFrame(() => {
      html.style.scrollBehavior = "";
      body.style.transition = "";
      isTransitioningRef.current = false;
    });

    return () => cancelAnimationFrame(frame);
  }, [activeProject]);

  // 2. Fase 1: Parallax hasta que desaparece el indicador Next
  //    Fase 2: Subida suave del proyecto + entrada coordinada del Header sin blur
  useEffect(() => {
    const wrapper = nextTransitionRef.current;
    const separator = nextSeparatorRef.current;
    const next = nextProjectRef.current;

    if (!wrapper || !separator || !next || !nextProject) return;

    const launchSmoothAscent = () => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      // Ocultamos el header y limpiamos su blur antes de que suba el proyecto
      const header = document.getElementById("site-header");
      if (header) {
        header.dataset.blur = "false";
      }
      window.dispatchEvent(new Event("header:hide"));

      // Detenemos el scroll del usuario
      window.dispatchEvent(new Event("lenis:stop"));

      // Congelamos el ScrollTrigger sin revertir el transform actual
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === wrapper) st.kill(false);
      });

      // Terminamos de sacar el indicador Next por arriba
      gsap.to(separator, {
        opacity: 0,
        y: "-=60",
        duration: 0.35,
        ease: "power2.out",
      });

      // Calculamos exactamente cuánto le falta a 'next' para llegar a top: 0
      const rect = next.getBoundingClientRect();
      const currentY = Number(gsap.getProperty(next, "y")) || 0;
      const targetY = currentY - rect.top;

      // Subida suave y coordinada con la bajada del header en la recta final
      gsap.to(next, {
        y: targetY,
        duration: 0.85,
        ease: "power3.out",
        onStart: () => {
          // A mitad de la subida del proyecto, hacemos bajar el header limpio
          gsap.delayedCall(0.35, () => {
            if (header) {
              header.dataset.blur = "false";
            }
            window.dispatchEvent(new Event("header:show"));
          });
        },
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
    };

    const ctx = gsap.context(() => {
      const parallaxTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 85%",
          endTrigger: separator,
          end: "bottom top",
          scrub: true,
          onLeave: () => {
            launchSmoothAscent();
          },
          onUpdate: () => {
            if (separator.getBoundingClientRect().bottom <= 0) {
              launchSmoothAscent();
            }
          },
        },
      });

      parallaxTl.to(
        separator,
        {
          y: -180,
          opacity: 0,
          duration: 1,
          ease: "none",
        },
        0
      );

      parallaxTl.to(
        next,
        {
          y: -100,
          duration: 1,
          ease: "none",
        },
        0
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
      <div data-project-slug={activeProject.slug}>
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
          ref={nextTransitionRef}
          data-project-transition
        >
          <div
            ref={nextSeparatorRef}
            style={{ position: "relative", zIndex: 1 }}
          >
            <ProjectNextSection
              current={currentIndex + 1}
              total={projects.length}
            />
          </div>

          <div
            data-project-slug={nextProject.slug}
            ref={nextProjectRef}
            style={{ position: "relative", zIndex: 2 }}
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
