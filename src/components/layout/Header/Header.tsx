'use client';

import { useLayoutEffect, useRef } from "react";

import Link from "next/link";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import stylesHero from "@/sections/Hero/Hero.module.scss";
import styles from "./Header.module.scss";

import Logo from "@/components/ui/Logo";

import { useCursor } from "@/hooks/useCursor";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  const { setVariant, setLabel } = useCursor();

  const logoWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!headerRef.current) return;

    const heroNavbar = document.querySelector(
      `.${stylesHero.navbar}`
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",

        start: "bottom top+=120",

        end: "bottom top",

        scrub: 0.1,
      },
    });

    tl
      .to(heroNavbar, {
        opacity: 0,
        y: -20,
        ease: "none",
      })

      .to(
        headerRef.current,
        {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
          ease: "none",
        },
        0
      );

      /* Sin transicion */
      {/*const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "bottom top+=140",
          toggleActions: "play none reverse reverse",
        },
      });

      tl
        .to(heroNavbar, {
          opacity: 0,
          y: -20,
          duration: 0.2,
          ease: "power2.out",
        })
        .to(
          headerRef.current,
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            duration: 0.2,
            ease: "power2.out",
          },
          0
        );*/}

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);


  useLayoutEffect(() => {
  if (!logoWrapperRef.current) return;

  const images = logoWrapperRef.current.querySelectorAll("img");
  const symbol = images[1];

  if (!symbol) return;

  const tween = gsap.to(symbol, {
    rotate: 360,
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "bottom top-=200",
      end: "max",
      scrub: 0.4,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}, []);

  return (
    <header
      ref={headerRef}
      id="site-header"
      className={styles.header}
    >
      <div className="site-container">
        <div className={styles.inner}>

          <div
            className={styles.logo}
            ref={logoWrapperRef}
            onMouseEnter={() => {
              setVariant("header");
              setLabel("");
            }}
            onMouseLeave={() => {
              setVariant("default");
              setLabel("");
            }}
          >
            <Logo />
          </div>

          <nav
            className={styles.nav}
            onMouseEnter={() => {
              setVariant("header");
              setLabel("");
            }}
            onMouseLeave={() => {
              setVariant("default");
              setLabel("");
            }}
          >

            <Link
              href="/work"
              className={styles.navLink}
            >
              <span className={styles.navBase}>
                Work
              </span>

              <span className={styles.navAccent}>
                Work
              </span>
            </Link>

            <Link
              href="/expertise"
              className={styles.navLink}
            >
              <span className={styles.navBase}>
                Expertise
              </span>

              <span className={styles.navAccent}>
                Expertise
              </span>
            </Link>

            <Link
              href="/about"
              className={styles.navLink}
            >
              <span className={styles.navBase}>
                About
              </span>

              <span className={styles.navAccent}>
                About
              </span>
            </Link>

            <Link
              href="/contact"
              className={styles.navLink}
            >
              <span className={styles.navBase}>
                Contact
              </span>

              <span className={styles.navAccent}>
                Contact
              </span>
            </Link>

          </nav>

        </div>
      </div>
    </header>
  );
}