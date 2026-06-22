'use client';

import { useLayoutEffect, useRef } from 'react';

import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './FloatingSymbol.module.scss';

export default function FloatingSymbol() {
  const symbolRef =
    useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
  if (!symbolRef.current) return;

  gsap.registerPlugin(
    ScrollTrigger
  );

  const symbol =
    symbolRef.current;   

  const symbolInner =
    symbol.querySelector(
      `.${styles.symbolInner}`
    ) as HTMLDivElement;

  if (!symbolInner) return;

  gsap.fromTo(
    symbol,
    {
      scale: 0.8,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 0.3,
      duration: 1.8,
      delay: 0.3,
      ease: 'power3.out',
    }
  );

  gsap.fromTo(
    symbolInner,
    {
      rotate: -5,
    },
    {
      rotate: 0,
      duration: 1.8,
      delay: 0.3,
      ease: 'power3.out',
    }
  );

  gsap.to(symbolInner, {
    rotate: 1080,

    ease: 'none',

    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'max',
      scrub: true,
    },
  });

  const workSection =
  document.getElementById(
    'work-section'
  );

  if (!workSection) return; 
  
    gsap.to(symbol, {
    y: -550,
        
    ease: 'none',

    scrollTrigger: {
        trigger: '#contact-section',
        start: 'top bottom',
        end: 'top center',
        scrub: true,
        markers: false,
        
    },
    });
}, []);

  return (
  <div
    ref={symbolRef}
    className={styles.symbol}
  >
    <div className={styles.symbolInner}>
      <Image
        src="/symbols/hero-symbol.svg"
        alt=""
        width={1005}
        height={1039}
      />
    </div>
  </div>
);
}