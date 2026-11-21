
'use client';

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import gsap, { ScrollTrigger } from "@/lib/gsap";

import styles from "./Header.module.scss";

import Logo from "@/components/ui/Logo";
import Noise from "@/components/ui/Noise/Noise";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const isHome = pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);

  // Bloquea el scroll cuando el menú mobile está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Cierra el menú al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

    // Header animation
  useLayoutEffect(() => {
    if (!headerRef.current) return;

    const header = headerRef.current;

    gsap.set(header, {
      clearProps: "all",
    });

    let previousScroll = window.scrollY;
    let entrance: gsap.core.Tween | null = null;

    const setHeader = (visible: boolean) => {
      gsap.to(header, {
        opacity: visible ? 1 : 0,
        y: visible ? 0 : -20,
        pointerEvents: visible ? "auto" : "none",
        duration: 0.25,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const difference = currentScroll - previousScroll;

      // Ignorar pequeños movimientos
      if (Math.abs(difference) < 2) return;

      // Scroll hacia arriba: mostrar
      if (difference < 0) {
        setHeader(true);
      }

      // Scroll hacia abajo: ocultar después de 100px
      if (difference > 0 && currentScroll > 100) {
        setHeader(false);
      }

      previousScroll = currentScroll;
    };

    const enableScrollBehavior = () => {
      previousScroll = window.scrollY;

      window.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    };

    // Páginas interiores: conservar entrada original
    if (pathname !== "/") {
      gsap.set(header, {
        opacity: 0,
        y: -20,
        pointerEvents: "none",
      });

      entrance = gsap.to(header, {
        opacity: 1,
        y: 0,
        pointerEvents: "auto",
        duration: 0.35,
        ease: "power3.out",
        delay: 0.5,

        onComplete: () => {
          window.dispatchEvent(
            new Event("header:intro-ready")
          );

          enableScrollBehavior();
        },
      });
    } else {
      // Home
      gsap.set(header, {
        opacity: 1,
        y: 0,
        pointerEvents: "auto",
      });

      enableScrollBehavior();
    }

    return () => {
      entrance?.kill();

      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  // Logo rotation on scroll
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

  // Header hide/show events
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

  // Header theme detection
  useLayoutEffect(() => {
    const header = headerRef.current;

    if (!header) return;

    const sections = gsap.utils.toArray<HTMLElement>(
      '[data-header-theme="light"]'
    );

    if (!sections.length) return;

    const updateTheme = () => {
      const headerPosition = 36;

      const isLight = sections.some((section) => {
        const rect = section.getBoundingClientRect();

        return (
          rect.top <= headerPosition &&
          rect.bottom > headerPosition
        );
      });

      if (isLight) {
        header.dataset.theme = "light";
      } else {
        delete header.dataset.theme;
      }
    };

    const triggers = sections.map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top 36px",
        end: "bottom 36px",
        onToggle: updateTheme,
        onRefresh: updateTheme,
      })
    );

    updateTheme();

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      delete header.dataset.theme;
    };
  }, [pathname]);

  return (
    <header
      ref={headerRef}
      id="site-header"
      className={styles.header}
    >
      <div className="site-container">
        <div className={styles.inner}>

          {/* Logo */}
          <div
            className={styles.logo}
            ref={logoWrapperRef}
            data-cursor={isHome ? undefined : "header"}
          >
            <Logo clickable={!isHome} />
          </div>

          {/* Desktop navigation */}
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

          {/* Mobile menu toggle */}
          <button
            type="button"
            className={`${styles.menuToggle} ${
              menuOpen ? styles.menuToggleOpen : ""
            }`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className={styles.menuToggleText}>
              MENU
            </span>
          </button>

          {/* Mobile navigation */}
          <div
            id="mobile-navigation"
            className={`${styles.mobileMenu} ${
              menuOpen ? styles.mobileMenuOpen : ""
            }`}
            aria-hidden={!menuOpen}
          >
            <Noise />

            <nav className={styles.mobileNav}>
              <Link
                href="/work"
                className={styles.mobileNavLink}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
              >
                Work
              </Link>

              <Link
                href="/about"
                className={styles.mobileNavLink}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
              >
                About
              </Link>

              <Link
                href="/contact"
                className={styles.mobileNavLink}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
              >
                Contact
              </Link>
            </nav>

            <div className={styles.mobileMenuFooter}>
              <div className={styles.mobileSocials}>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileSocialLink}
                >
                  Instagram
                </a>

                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileSocialLink}
                >
                  LinkedIn
                </a>
              </div>

              <div className={styles.mobileCopyright}>
                © {new Date().getFullYear()} CICLIKMEDIA
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
