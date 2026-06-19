'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './SelectedWork.module.scss';

import { useCursor } from '@/hooks/useCursor';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: '01',
    title: 'Ciclikmedia Portfolio',
    meta: 'Frontend Development · Motion Design · 2025',
    color: '#FF57DB',
  },
  {
    number: '02',
    title: 'Nordic Studio',
    meta: 'Creative Development · Branding · 2025',
    color: '#4F7CFF',
  },
  {
    number: '03',
    title: 'Vertex Labs',
    meta: 'UX/UI Design · Product Systems · 2024',
    color: '#22C55E',
  },
  {
    number: '04',
    title: 'Atelier Motion',
    meta: 'Motion Design · WebGL · 2025',
    color: '#F97316',
  },
];

export default function SelectedWork() {
  const { setVariant, setLabel } = useCursor();

  const [activeProject, setActiveProject] = useState(1);

  const sectionRef = useRef<HTMLElement>(null);

  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
  if (
    !sectionRef.current ||
    !trackRef.current
  ) {
    return;
  }

  const ctx = gsap.context(() => {
    const track =
      trackRef.current!;

    const totalWidth =
      track.scrollWidth;

    const viewportWidth =
      window.innerWidth;

    const scrollDistance =
      totalWidth - viewportWidth;

    gsap.to(track, {
      x: -scrollDistance,

      ease: 'none',

      scrollTrigger: {
        trigger:
          sectionRef.current,

        start: 'top top',

        end: `+=${scrollDistance}`,

        scrub: 1,

        pin: true,

        anticipatePin: 1,
      },
    });
  }, sectionRef);

  return () => {
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

          <h2>Selected Work</h2>

          <p>
            A curated selection of digital experiences,
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
              SEE THE WORK&nbsp;&nbsp;&nbsp;&nbsp;→
            </span>

            <span className={styles.linkAccent}>
              SEE THE WORK&nbsp;&nbsp;&nbsp;&nbsp;→
            </span>
          </a>
        </div>

        <div
          ref={trackRef}
          className={styles.projects}
        >
          <div className={styles.counterFixed}>
            Work {String(activeProject).padStart(2, '0')}/04
          </div>

          {projects.map((project, index) => (
            <div
              key={project.number}
              className={styles.project}
              style={{
                zIndex: index + 1,
              }}
              onMouseEnter={() => {
                setVariant('view');
                setLabel('↗\nView Project');
              }}
              onMouseLeave={() => {
                setVariant('default');
                setLabel('');
              }}
            >
              <div
                className={styles.image}
                style={{
                  backgroundColor: project.color,
                }}
              >
                <div className={styles.viewProject}>
                  <span>↗</span>
                  <small>View Project</small>
                </div>
              </div>

              <div className={styles.info}>
                <h3>{project.title}</h3>

                <span>
                  {project.meta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}