'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

import styles from './Intro.module.scss';

type IntroProps = {
  onComplete: () => void;
};

export default function Intro({
  onComplete,
}: IntroProps) {
  const introRef = useRef<HTMLDivElement>(null);
  const helloRef = useRef<HTMLHeadingElement>(null);
  const symbolRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      onComplete,
    });

    tl.fromTo(
      helloRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }
    )

      .fromTo(
        symbolRef.current,
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
        },
        '-=0.3'
      )

      .to(
        symbolRef.current,
        {
          scale: 50,
          duration: 1,
          ease: 'power4.inOut',
        },
        '+=0.3'
      )

      .to(
        introRef.current,
        {
          opacity: 0,
          duration: 0.4,
        },
        '-=0.2'
      );
  }, [onComplete]);

  return (
    <div
      ref={introRef}
      className={styles.intro}
    >
      <h1
        ref={helloRef}
        className={styles.hello}
      >
        HELLO!
      </h1>
      <p>Ciclikmedia</p>

      <div
        ref={symbolRef}
        className={styles.symbol}
      />
    </div>
  );
}