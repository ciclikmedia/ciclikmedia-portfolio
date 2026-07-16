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

    const update = (time: number) => {
  lenis.raf(time * 1000);
};

gsap.ticker.add(update);

const stopLenis = () => {
  lenis.stop();
};

const startLenis = () => {
  lenis.start();
};

window.addEventListener(
  "lenis:stop",
  stopLenis
);

window.addEventListener(
  "lenis:start",
  startLenis
);

    gsap.ticker.lagSmoothing(0);

    return () => {

  gsap.ticker.remove(update);

  window.removeEventListener(
    "lenis:stop",
    stopLenis
  );

  window.removeEventListener(
    "lenis:start",
    startLenis
  );

  lenis.destroy();

};
  }, []);

  return <>{children}</>;
}