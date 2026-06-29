'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './SelectedWork.module.scss';

import { projects } from './constants/projects';

import ProjectCard from './ProjectCard/ProjectCard';

import { useCursor } from '@/hooks/useCursor';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  limitCallbacks: true,
});



export default function SelectedWork() {
  const { setVariant, setLabel } =
    useCursor();

  const [activeProject, setActiveProject] =
    useState(1);

  const sectionRef =
    useRef<HTMLElement>(null);

  const horizontalRef =
    useRef<HTMLDivElement>(null);

  const trackRef =
    useRef<HTMLDivElement>(null);

  const counterRef =
    useRef<HTMLDivElement>(null);

  const currentProjectRef =
    useRef(1);

  const directionRef = useRef<1 | -1>(1);

  const numberRef =
    useRef<HTMLSpanElement>(null);

  const projectRefs =
    useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
  if (!numberRef.current) return;

  gsap.killTweensOf(numberRef.current);

  const fromY =
    directionRef.current === 1
      ? 12
      : -12;

  gsap.fromTo(
    numberRef.current,
    {
      y: fromY,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "expo.out",
    }
  );
}, [activeProject]);

  useLayoutEffect(() => {
    if (
      !horizontalRef.current ||
      !trackRef.current
    ) {
      return;
    }

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    const ctx = gsap.context(() => {
      const track =
        trackRef.current!;

        gsap.set(counterRef.current, {
          autoAlpha: 0,
          y: 20,
        });

      gsap.to(track, {
        x: () =>
          -(
            track.scrollWidth -
            window.innerWidth
          ),

        ease: 'none',

        scrollTrigger: {
        trigger: projectRefs.current[0] ?? horizontalRef.current,

        start: "center center",

        end: () =>
          `+=${track.scrollWidth - window.innerWidth}`,

        pin: horizontalRef.current,

        scrub: 0.8,

        invalidateOnRefresh: true,

        onEnter: () => {
          gsap.to(counterRef.current, {
            autoAlpha: .2,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          });
        },

        onLeave: () => {
          gsap.to(counterRef.current, {
            autoAlpha: 0,
            y: -20,
            duration: 0.2,
            ease: "power3.out",
          });
        },

        onEnterBack: () => {
          gsap.to(counterRef.current, {
            autoAlpha: .2,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          });
        },

      onLeaveBack: () => {
        gsap.to(counterRef.current, {
          autoAlpha: 0,
          y: 20,
          duration: 0.2,
          ease: "power3.out",
        });
      },

      onUpdate: (self) => {
        const project = Math.min(
          projects.length,
          Math.floor(self.progress * projects.length) + 1
        );

        if (project === currentProjectRef.current) {
          return;
        }

        directionRef.current = self.direction as 1 | -1;

        currentProjectRef.current = project;

        setActiveProject(project);
      },
      },

});

ScrollTrigger.refresh();

      ScrollTrigger.refresh();
    }, sectionRef);

    window.addEventListener(
      'resize',
      handleResize
    );

    return () => {
      window.removeEventListener(
        'resize',
        handleResize
      );

      ctx.revert();
    };
  }, []);

  useLayoutEffect(() => {
  projectRefs.current.forEach(
    (card) => {
      if (!card) return;

      const handleMove = (
        e: MouseEvent
      ) => {
        const rect =
          card.getBoundingClientRect();

        const styles =
          window.getComputedStyle(card);

        const paddingLeft =
          parseFloat(
            styles.paddingLeft
          );

        const paddingRight =
          parseFloat(
            styles.paddingRight
          );

        const x =
          e.clientX - rect.left;

        const y =
          e.clientY - rect.top;

        if (
          x < paddingLeft ||
          x > rect.width - paddingRight
        ) {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });

          return;
        }

        const usableWidth =
          rect.width -
          paddingLeft -
          paddingRight;

        const normalizedX =
          (x - paddingLeft) /
          usableWidth;

        const normalizedY =
          y / rect.height;

        const rotateY =
          (normalizedX - 0.5) * 4;

        const rotateX =
          (normalizedY - 0.5) * -4;

        gsap.to(card, {
          rotateX,
          rotateY,
          scale: 1.01,
          duration: 0.2,
          ease: 'power3.out',
          transformPerspective: 1000,
        });
              };

      const handleLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,

          scale: 1,

          duration: 0.8,

          ease:
            'elastic.out(1,0.2)',
        });
      };

      card.addEventListener(
        'mousemove',
        handleMove
      );

      card.addEventListener(
        'mouseleave',
        handleLeave
      );

      return () => {
        card.removeEventListener(
          'mousemove',
          handleMove
        );

        card.removeEventListener(
          'mouseleave',
          handleLeave
        );
      };
    }
  );
}, []);

  return (
    <section
  ref={sectionRef}
  className={styles.selectedWork}
>
  <div className="site-container">
    <div className={styles.header}>
      <span className={styles.eyebrow}>
        Selected Work
      </span>

      <h2>
        Selected Work
      </h2>

      <p>
        A curated selection of
        digital experiences,
        interfaces and systems.
      </p>

      <a
        href="/work"
        className={styles.link}
        onMouseEnter={() =>
          setVariant("link")
        }
        onMouseLeave={() =>
          setVariant("default")
        }
      >
        <span className={styles.linkBase}>
          SEE THE WORK
          &nbsp;&nbsp;&nbsp;&nbsp;→
        </span>

        <span className={styles.linkAccent}>
          SEE THE WORK
          &nbsp;&nbsp;&nbsp;&nbsp;→
        </span>
      </a>
    </div>
  </div>

  {/* CONTADOR */}
  <div
    ref={counterRef}
    className={styles.counterFixed}
  > 

    <span
      ref={numberRef}
      className={styles.activeNumber}
    >
      {String(activeProject).padStart(2, "0")}
    </span>

    <span className={styles.totalProjects}>
      /{String(projects.length).padStart(2, "0")}
    </span>
  </div>

  <div
    ref={horizontalRef}
    id="work-section"
    className={styles.horizontalSection}
  >
    <div
      ref={trackRef}
      className={styles.track}
    >
      {projects.map(
        (project, index) => (
          <div
            key={project.id}
            ref={(el) => {
              projectRefs.current[index] = el;
            }}
            className={styles.project}
            onMouseEnter={() => {
              setVariant("view");
              setLabel("↗\nView work");
            }}
            onMouseLeave={() => {
              setVariant("default");
              setLabel("");
            }}
          >
            <ProjectCard project={project} />
          </div>
        )
      )}
    </div>
  </div>
</section>
  );
}