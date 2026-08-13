'use client';

import { useLayoutEffect, useRef } from "react";

import { usePathname } from "next/navigation";

import Link from "next/link";

import gsap, { ScrollTrigger } from "@/lib/gsap";

import stylesHero from "@/sections/Hero/Hero.module.scss";
import styles from "./Header.module.scss";

import Logo from "@/components/ui/Logo";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  const logoWrapperRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  const isHome = pathname === "/";

  useLayoutEffect(() => {

  if (!headerRef.current) return;

  // Reinicia cualquier estado anterior del header
  gsap.set(headerRef.current, {
    clearProps: "all",
  });

// Si no estamos en Home, animamos el Header al cargar
if (pathname !== "/") {

  gsap.set(headerRef.current, {
  opacity: 0,
  y: -20,
  pointerEvents: "none",
});

  gsap.to(headerRef.current, {
    opacity: 1,
    y: 0,
    pointerEvents: "auto",
    duration: 0.2,
    ease: "power2.out",
    delay: 0.5,
  });

  return;
}

  const heroNavbar = document.querySelector(
    `.${stylesHero.navbar}`
  );

  const hero = document.querySelector("#hero");

  if (!hero || !heroNavbar) return;

     /* Sin transicion */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
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
        );

    return () => {
      tl.kill();
    };
 }, [pathname]);


  useLayoutEffect(() => {
  if (!logoWrapperRef.current) return;

  const images = logoWrapperRef.current.querySelectorAll("img");
 
  const symbol = images[1];

  if (!symbol) return;

  const tween = gsap.to(symbol, {
    rotate: 360,
    ease: "none",
    scrollTrigger: {
      trigger: document.documentElement,
      start: "top top",
      end: "max",
      scrub: 0.4,
    },
  });

  return () => {
    tween.kill();
  };
}, [pathname]);

useLayoutEffect(() => {
  if (!headerRef.current) return;

  const hide = () => {
    gsap.to(headerRef.current, {
      opacity: 0,
      y: -20,
      pointerEvents: "none",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const show = () => {
    gsap.to(headerRef.current, {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  window.addEventListener("header:hide", hide);
  window.addEventListener("header:show", show);

  return () => {
    window.removeEventListener("header:hide", hide);
    window.removeEventListener("header:show", show);
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
            data-cursor={isHome ? undefined : "header"}
          >
            <Logo clickable={!isHome} />
          </div>

          <nav
            className={styles.nav}
            data-cursor="header"
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