'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './Hero.module.scss';

export default function HeroTitle() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!titleRef.current || !wrapperRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Intro
    gsap.fromTo(
      titleRef.current,
      {
        y: 180,
        opacity: 0,
        scale: 0.98,
        filter: 'blur(12px)',
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.6,
        ease: 'power3.out',
      }
    );

    // Parallax
    gsap.to(wrapperRef.current, {
      y: -300,

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
      <h1
        ref={titleRef}
        className={styles.title}
      >
        <span>Digital</span>
        <br />
        <span>experiences</span>
      </h1>
    </div>
  );
}