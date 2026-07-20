'use client';

import { useLayoutEffect, useRef } from 'react';

import HeroSymbol from "@/components/ui/HeroSymbol/HeroSymbol";

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './FloatingSymbol.module.scss';

export default function FloatingSymbol() {
  const symbolRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!symbolRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const symbol = symbolRef.current;

    let rotateTween: gsap.core.Tween | null = null;
    let moveTween: gsap.core.Tween | null = null;

    const symbolInner = symbol.querySelector(
      `.${styles.symbolInner}`
    ) as HTMLDivElement;

    if (!symbolInner) return;

    window.dispatchEvent(new Event("lenis:stop"));
    const intro = gsap.timeline({
  delay: 0.2,

  onStart: () => {
    window.dispatchEvent(new Event("lenis:stop"));
    window.dispatchEvent(new Event("cursor:hide"));
  },
});

    intro
      .fromTo(
        symbol,
        {
          y: 450,
          scale: 0.7,
          rotate: -180,
        },
        {
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 2,
          ease: "power4.out",
          force3D: true,
        }
      )
      .fromTo(
        symbolInner,
        {
          rotate: -45,
        },
        {
          rotate: 0,
          duration: 2,
          ease: "power4.out",
          force3D: true,
        },
        0
      );

   intro.eventCallback("onComplete", () => {

    window.dispatchEvent(
      new CustomEvent("cursor:show", {
        detail: {
          x: window.innerWidth / 2,
          y: window.innerHeight * 0.86,
        },
      })
    );

    window.dispatchEvent(new Event("lenis:start"));

    // Rotación durante toda la página
    rotateTween = gsap.to(symbolInner, {
        rotate: "+=1080",
        ease: "none",
        force3D: true,

        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "max",
          scrub: true,
        },
      });

      // Movimiento hacia arriba al llegar a Contact
      moveTween = gsap.fromTo(
        symbolInner,
        {
          y: 0,
        },
        {
          y: -550,
          ease: "none",
          force3D: true,
          scale: 0.85, // <-- ajusta este valor

          scrollTrigger: {
            trigger: "#contact-section",
            start: "top bottom",
            end: "top center",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => {
      rotateTween?.scrollTrigger?.kill();
      rotateTween?.kill();

      moveTween?.scrollTrigger?.kill();
      moveTween?.kill();

      intro.kill();
    };

  }, []);

  return (
    <div
      ref={symbolRef}
      className={styles.symbol}
    >
      <div className={styles.symbolInner}>
        <HeroSymbol className={styles.heroSymbol} />
      </div>
    </div>
  );
}