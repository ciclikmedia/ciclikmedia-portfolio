'use client';

import { useRef } from 'react';

import styles from "./Hero.module.scss";

import Navbar from "./Navbar";
import HeroTitle from "./HeroTitle";
import DynamicHeadline from "./DynamicHeadline";
import HeroDescription from "./HeroDescription";

export default function Hero() {
  const heroRef =
    useRef<HTMLElement>(null);

  return (
    <section
      id="hero"
      ref={heroRef}
      className={styles.hero}
      data-cursor="hero"
      data-cursor-label="Discover"
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