'use client';

import { useEffect, useRef } from 'react';

import styles from "./Hero.module.scss";

import Navbar from "./Navbar";
import HeroTitle from "./HeroTitle";
import DynamicHeadline from "./DynamicHeadline";
import HeroDescription from "./HeroDescription";
import HeroSymbol from "./HeroSymbol";

import { useCursor } from '@/hooks/useCursor';

export default function Hero() {
  const {
    setVariant,
    setLabel,
  } = useCursor();

  const heroRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    const hero =
      heroRef.current;

    if (!hero) return;

    const handleMove = (
      e: MouseEvent
    ) => {
      const rect =
        hero.getBoundingClientRect();

      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (inside) {
        setVariant('hero');

        setLabel(
          'Discover\n↓'
        );
      }
    };

    window.addEventListener(
      'mousemove',
      handleMove,
      { once: true }
    );

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMove
      );
    };
  }, [setVariant, setLabel]);

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      onMouseEnter={() => {
        setVariant('hero');

        setLabel(
          'Discover\n↓'
        );
      }}
      onMouseLeave={() => {
        setVariant('default');

        setLabel('');
      }}
    >
      <Navbar />

      <div className="site-container">
        <div className={styles.content}>
          <HeroTitle />

          <div className={styles.headline}>
            <DynamicHeadline />
          </div>

          <div className={styles.description}>
            <HeroDescription />
          </div>
        </div>
      </div>

      {/* <HeroSymbol /> */}
    </section>
  );
}