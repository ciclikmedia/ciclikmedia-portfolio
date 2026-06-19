'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './Hero.module.scss';

export default function HeroDescription() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!descriptionRef.current || !wrapperRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Intro
    gsap.fromTo(
      descriptionRef.current,
      {
        y: 30,
        opacity: 0,
        filter: 'blur(8px)',
      },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: .6,
        delay: 0.8,
        ease: 'power3.out',
      }
    );

    // Parallax
    gsap.to(wrapperRef.current, {
      y: -100,

      ease: 'none',

      scrollTrigger: {
        trigger: document.body,

        start: 'top top',
        end: '+=600',

        scrub: true,
      },
    });
  }, []);

  return (
    <div ref={wrapperRef}>
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
    </div>
  );
}