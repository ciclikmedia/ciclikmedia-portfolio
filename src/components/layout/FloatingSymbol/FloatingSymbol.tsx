'use client';

import { useLayoutEffect, useRef } from 'react';

import HeroSymbol from "@/components/ui/HeroSymbol/HeroSymbol";
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

  const intro = gsap.timeline({
  delay: 0.2,
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
      gsap.to(symbolInner, {
        rotate: "+=1080",
        ease: "none",
        force3D: true,

        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "max",
          scrub: true,
          immediateRender: false,
        },
      });
    });
  

 

  const workSection =
  document.getElementById(
    'work-section'
  );

  if (!workSection) return; 
  
    gsap.fromTo(
  symbol,
  {
    y: 0,
  },
  {
    y: -550,

    ease: "none",

    scrollTrigger: {
      trigger: "#contact-section",
      start: "top bottom",
      end: "top center",
      scrub: true,
      immediateRender: false,
      invalidateOnRefresh: true,
      markers: false,
    },
  }
);
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