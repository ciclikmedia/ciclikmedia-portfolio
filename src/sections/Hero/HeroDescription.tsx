'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

import styles from './Hero.module.scss';

export default function HeroDescription() {
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!descriptionRef.current) return;

    gsap.fromTo(
      descriptionRef.current,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out',
      }
    );
  }, []);

  return (
    <p
      ref={descriptionRef}
      className={styles.heroDescription}
    >
      Frontend development
      <br />
      UX/UI systems and creative motion
      <br />
      for modern digital products.
    </p>
  );
}