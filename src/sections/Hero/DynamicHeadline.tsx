'use client';

import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import gsap, { ScrollTrigger } from "@/lib/gsap";

import styles from './Hero.module.scss';

const headlines = [
  'Creative Development',
  'Frontend Engineering',
  'UX/UI Design',
  'Creative Motion',
  'Interactive Experiences',
];

export default function DynamicHeadline() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!accentRef.current) return;

    const tl = gsap.timeline();

    tl.set(accentRef.current, {
      width: '0%',
      filter: 'drop-shadow(0 0 0px rgba(255,87,219,0))',
    });

    tl.to(accentRef.current, {
      width: '102%',
      duration: 1.8,
      ease: 'power2.inOut',
      delay: 0.3,
    });

    tl.to(
      accentRef.current,
      {
        filter: 'drop-shadow(0 0 12px rgba(255,87,219,.5))',
        duration: 0.2,
      },
      '-=0.25'
    );

    tl.to(accentRef.current, {
      filter: 'drop-shadow(0 0 0px rgba(255,87,219,0))',
      duration: 0.4,
    });
  }, [index]);

  useEffect(() => {
    const interval = setInterval(() => {

      gsap.to(headlineRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          setIndex(prev => (prev + 1) % headlines.length);

          gsap.set(headlineRef.current, {
            y: 20,
          });

          gsap.to(headlineRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
          });
        },
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    if (!headlineRef.current || !wrapperRef.current) return;

    const ctx = gsap.context(() => {

      gsap.fromTo(
        headlineRef.current,
        {
          y: 90,
          opacity: 0,
          filter: 'blur(10px)',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          delay: 0.4,
          ease: 'power3.out',
        }
      );

      gsap.to(wrapperRef.current, {
        y: -180,

        ease: 'none',

        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: '+=600',
          scrub: true,
        },
      });
      
      ScrollTrigger.refresh();

    }, wrapperRef);

    return () => ctx.revert();

  }, []);

  return (
    <div ref={wrapperRef}>
      <h2
        ref={headlineRef}
        className={styles.dynamicHeadline}
      >
        <span className={styles.baseText}>
          {headlines[index]}
        </span>

        <span
          ref={accentRef}
          className={styles.accentWrapper}
        >
          <span className={styles.accentText}>
            {headlines[index]}
          </span>
        </span>
      </h2>
    </div>
  );
}