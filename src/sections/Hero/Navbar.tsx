'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

import Link from 'next/link';
import Logo from '@/components/ui/Logo';

import styles from './Hero.module.scss';

export default function Navbar() {
  const navbarRef = useRef<HTMLDivElement>(null);

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
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }
    ).fromTo(
      items,
      {
        opacity: 0,
        y: -10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      },
      '-=0.4'
    );
  }, []);

  return (
    <header className={styles.navbar}>
      <div className="container">
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
                <Link href="/work">
                  Work
                </Link>
              </li>

              <li>
                <Link href="/expertise">
                  Expertise
                </Link>
              </li>

              <li>
                <Link href="/about">
                  About
                </Link>
              </li>

              <li>
                <Link href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}