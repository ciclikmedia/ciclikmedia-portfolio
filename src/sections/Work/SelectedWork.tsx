'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import Link from 'next/link';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './SelectedWork.module.scss';

import { useCursor } from '@/hooks/useCursor';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  limitCallbacks: true,
});

const projects = [
  {
    number: '01',
    title: 'Ciclikmedia Portfolio',
    meta: 'Frontend Development · Motion Design · 2025',
    color: '#FF57DB',
    href: '/work/ciclikmedia-portfolio',
  },
  {
    number: '02',
    title: 'Nordic Studio',
    meta: 'Creative Development · Branding · 2025',
    color: '#4F7CFF',
    href: '/work/nordic-studio',
  },
  {
    number: '03',
    title: 'Vertex Labs',
    meta: 'UX/UI Design · Product Systems · 2024',
    color: '#22C55E',
    href: '/work/vertex-labs',
  },
  {
    number: '04',
    title: 'Atelier Motion',
    meta: 'Motion Design · WebGL · 2025',
    color: '#F97316',
    href: '/work/atelier-motion',
  },
];

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
          /04
        </div>

        <div
          ref={trackRef}
          className={styles.track}
        >
          {projects.map(
            (project) => (
              <div
                key={project.number}
                className={styles.project}
              >
                <Link
                  href={project.href}
                  className={
                    styles.projectLink
                  }
                  onMouseEnter={() => {
                    setVariant('view');

                    setLabel(
                      '↗\nView work'
                    );
                  }}
                  onMouseLeave={() => {
                    setVariant(
                      'default'
                    );

                    setLabel('');
                  }}
                >
                  <div
                    className={
                      styles.image
                    }
                    style={{
                      backgroundColor:
                        project.color,
                    }}
                  />

                  <div
                    className={
                      styles.info
                    }
                  >
                    <h3 className={styles.projectTitle}>
                      <span>
                        {project.title}
                      </span>

                      <span className={styles.titleAccent}>
                        {project.title}
                      </span>
                    </h3>

                    <span className={styles.description}>
                      {
                        project.meta
                      }
                    </span>
                  </div>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}