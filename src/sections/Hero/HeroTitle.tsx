'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

import styles from './Hero.module.scss';

export default function HeroTitle() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      {
        y: 80,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
      }
    );
  }, []);

  return (
    <h1
      ref={titleRef}
      className={styles.title}
    >
      <span>Digital</span>
      <br />
      <span>experiences</span>
    </h1>
  );
}