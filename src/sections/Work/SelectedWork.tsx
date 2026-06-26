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

  const projectRefs =
    useRef<(HTMLDivElement | null)[]>([]);

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

      gsap.to(track, {
        x: () =>
          -(
            track.scrollWidth -
            window.innerWidth
          ),

        ease: 'none',

        scrollTrigger: {
          trigger:
            horizontalRef.current,

          start: 'top top',

          end: () =>
            `+=${
              track.scrollWidth -
              window.innerWidth
            }`,

          pin: true,

          scrub: 0.8,

          invalidateOnRefresh: true,
          

          onUpdate: (self) => {
            const project =
              Math.min(
                projects.length,
                Math.floor(
                  self.progress *
                    projects.length
                ) + 1
              );

            setActiveProject(
              project
            );
          },
        },
      });

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
          duration: 0.4,
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
            'elastic.out(1,0.4)',
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
              setVariant('link')
            }
            onMouseLeave={() =>
              setVariant('default')
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

      <div
        ref={horizontalRef}
        id="work-section"
        className={styles.horizontalSection}
      >
        <div
          className={
            styles.counterFixed
          }
        >
          Work{' '}
          {String(
            activeProject
          ).padStart(2, '0')}
          /{String(projects.length).padStart(2, '0')}
        </div>

        <div
          ref={trackRef}
          className={styles.track}
        >
          {projects.map(
            (project, index) => (
              <div
                key={project.number}
                ref={(el) => {
                  projectRefs.current[index] = el;
                }}
                className={styles.project}
                onMouseEnter={() => {
                  setVariant('view');
                  setLabel('↗\nView work');
                }}
                onMouseLeave={() => {
                  setVariant('default');
                  setLabel('');
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