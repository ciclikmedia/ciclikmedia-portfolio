'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './Hero.module.scss';

export default function HeroSymbol() {
  const symbolRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
  if (!symbolRef.current) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    symbolRef.current,
    {
      scale: 0.8,
      opacity: 0,
      rotate: -5,
    },
    {
      scale: 1,
      opacity: 0.3,
      rotate: 0,
      duration: 1.8,
      delay: 0.3,
      ease: 'power3.out',
    }
  );

  gsap.to(symbolRef.current, {
  rotate: 1440,

  ease: 'none',

  scrollTrigger: {
    trigger: document.body,
    start: 'top top',
    end: 'max',
    scrub: true,
  },
});

gsap.to(symbolRef.current, {
  y: 800,

  ease: 'none',

  scrollTrigger: {
    trigger: symbolRef.current,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
});
}, []);

  

  return (
    <div
      ref={symbolRef}
      className={styles.symbol}
    >
      <Image
        src="/symbols/hero-symbol.svg"
        alt=""
        width={1005}
        height={1039}
        priority
      />
    </div>
  );
}