'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

import Link from 'next/link';
import Logo from '@/components/ui/Logo';

import { useCursor } from '@/hooks/useCursor';

import styles from './Hero.module.scss';

export default function Navbar() {
  const { setVariant } =
    useCursor();

  const navbarRef = useRef<HTMLDivElement>(null);

  const handleMagneticMove = (
  e: React.MouseEvent<HTMLAnchorElement>
) => {
  const element = e.currentTarget;

  const rect =
    element.getBoundingClientRect();

  const x =
    e.clientX -
    rect.left -
    rect.width / 2;

  const y =
    e.clientY -
    rect.top -
    rect.height / 2;

  gsap.to(element, {
    x: x * 0.15,
    y: y * 0.15,
    duration: 0.4,
    ease: 'power3.out',
  });
};

const handleMagneticLeave = (
  e: React.MouseEvent<HTMLAnchorElement>
) => {
  gsap.to(e.currentTarget, {
    x: 0,
    y: 0,
    duration: 0.6,
    ease: 'power3.out',
  });
};

  useLayoutEffect(() => {
    if (!navbarRef.current) return;

    const logo = navbarRef.current.querySelector(
      `.${styles.logo}`
    );

    const items = navbarRef.current.querySelectorAll(
      `.${styles.nav} li`
    );

    const tl = gsap.timeline();

    tl.fromTo(
      logo,
      {
        opacity: 0,
        y: -20,
        filter: 'blur(8px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power3.out',
      }
    ).fromTo(
      items,
      {
        opacity: 0,
        y: -10,
        filter: 'blur(6px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      },
      '-=0.4'
    );
  }, []);

  return (
    <header className={styles.navbar}>
      <div className="site-container">
        <div
          ref={navbarRef}
          className={styles.navbarInner}
        >
          <div className={styles.logo}>
            <Logo />
          </div>

          <nav aria-label="Main navigation">
            <ul className={styles.nav}>
              <li>
                <Link
                  href="/work"
                  className={styles.navLink}
                  onMouseEnter={() => {
                    setVariant('nav');
                  }}
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={(e) => {
                    handleMagneticLeave(e);
                    setVariant('default');
                  }}
                >
                  <span className={styles.navBase}>
                    Work
                  </span>

                  <span className={styles.navAccent}>
                    Work
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/expertise"
                  className={styles.navLink}
                  onMouseEnter={() => {
                    setVariant('nav');
                  }}
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={(e) => {
                    handleMagneticLeave(e);
                    setVariant('default');
                  }}
                >
                  <span className={styles.navBase}>
                    Expertise
                  </span>

                  <span className={styles.navAccent}>
                    Expertise
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className={styles.navLink}
                  onMouseEnter={() => {
                    setVariant('nav');
                  }}
                 onMouseMove={handleMagneticMove}
                  onMouseLeave={(e) => {
                    handleMagneticLeave(e);
                    setVariant('default');
                  }}
                >
                  <span className={styles.navBase}>
                    About
                  </span>

                  <span className={styles.navAccent}>
                    About
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className={styles.navLink}
                  onMouseEnter={() => {
                    setVariant('nav');
                  }}
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={(e) => {
                    handleMagneticLeave(e);
                    setVariant('default');
                  }}
                >
                  <span className={styles.navBase}>
                    Contact
                  </span>

                  <span className={styles.navAccent}>
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}