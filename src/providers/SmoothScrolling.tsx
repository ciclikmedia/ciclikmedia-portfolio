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
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 1.1,
    });

    const resetScroll = () => {
      lenis.scrollTo(0, {
        immediate: true,
        force: true,
      });
    };

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    const stopLenis = () => {
      lenis.stop();
    };

    const startLenis = () => {
      lenis.resize();
      lenis.start();
    };

    // Recalcular límite real del scroll cuando cambie la altura del contenido
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    lenis.on('scroll', ScrollTrigger.update);

    window.addEventListener('lenis:scrollToTop', resetScroll);
    window.addEventListener('lenis:stop', stopLenis);
    window.addEventListener('lenis:start', startLenis);

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      resizeObserver.disconnect();
      gsap.ticker.remove(update);

      window.removeEventListener('lenis:scrollToTop', resetScroll);
      window.removeEventListener('lenis:stop', stopLenis);
      window.removeEventListener('lenis:start', startLenis);

      lenis.off('scroll', ScrollTrigger.update);

      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
