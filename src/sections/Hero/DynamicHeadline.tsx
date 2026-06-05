'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

import styles from './Hero.module.scss';

export default function DynamicHeadline() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!headlineRef.current) return;

    gsap.fromTo(
      headlineRef.current,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out',
      }
    );
  }, []);

  return (
    <h2
      ref={headlineRef}
      className={styles.dynamicHeadline}
    >
      Motion Systems
    </h2>
  );
}