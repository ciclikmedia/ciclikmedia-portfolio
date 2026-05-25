'use client';

import { ReactNode, useEffect } from 'react';

import Lenis from 'lenis';

import gsap, { ScrollTrigger } from '@/lib/gsap';

type SmoothScrollingProps = {
  children: ReactNode;
};

export default function SmoothScrolling({
  children,
}: SmoothScrollingProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}