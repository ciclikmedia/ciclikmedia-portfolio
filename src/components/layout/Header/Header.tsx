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

  // Header animation + movimiento ligado al scroll con inercia propia
  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const MAX_OFFSET = 120;
    let currentY = 0;
    let previousScroll = window.scrollY;
    let entrance: gsap.core.Tween | null = null;
    let isLockedByEvent = false;

    header.dataset.blur = window.scrollY > 5 ? "true" : "false";

    const createYTo = () =>
      gsap.quickTo(header, "y", {
        duration: 0.32,
        ease: "power2.out",
      });

    let yTo = createYTo();

    const applyHeaderPosition = (y: number) => {
      currentY = Math.max(-MAX_OFFSET, Math.min(0, y));
      yTo(currentY);
      header.style.pointerEvents =
        currentY > -MAX_OFFSET * 0.6 ? "auto" : "none";
    };

    const handleScroll = () => {
      if (isLockedByEvent) return;

      const currentScroll = window.scrollY;
      const difference = currentScroll - previousScroll;

      // Ignorar el salto de reset de scroll al cambiar de proyecto (ej. de 4500 a 0)
      if (Math.abs(difference) > window.innerHeight) {
        previousScroll = currentScroll;
        if (currentScroll <= 5) {
          header.dataset.blur = "false";
          applyHeaderPosition(0);
        }
        return;
      }

      header.dataset.blur = currentScroll > 5 ? "true" : "false";

      if (currentScroll <= 5) {
        header.dataset.blur = "false";
        applyHeaderPosition(0);
        previousScroll = currentScroll;
        return;
      }

      // Factor 1.6 para que se desplace más rápido que el contenido
      applyHeaderPosition(currentY - difference * 1.6);

      previousScroll = currentScroll;
    };

    const enableScrollBehavior = () => {
      previousScroll = window.scrollY;
      header.dataset.blur = previousScroll > 5 ? "true" : "false";

      window.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    };

    const hide = () => {
      isLockedByEvent = true;
      currentY = -MAX_OFFSET;
      gsap.killTweensOf(header);

      gsap.to(header, {
        y: -MAX_OFFSET,
        pointerEvents: "none",
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const show = () => {
      gsap.killTweensOf(header);
      isLockedByEvent = false;
      previousScroll = window.scrollY;
      currentY = 0;
      header.dataset.blur = window.scrollY > 5 ? "true" : "false";
      header.style.pointerEvents = "auto";

      yTo = createYTo();
      yTo(0);
    };

    window.addEventListener("header:hide", hide);
    window.addEventListener("header:show", show);

    // Entrada inicial: entra desde arriba
    gsap.set(header, {
      y: -MAX_OFFSET,
      pointerEvents: "none",
    });
    currentY = -MAX_OFFSET;

    entrance = gsap.to(header, {
      y: 0,
      pointerEvents: "auto",
      duration: 0.8,
      ease: "power3.out",
      delay: isHome ? 0.2 : 0.5,

      onComplete: () => {
        currentY = 0;
        yTo = createYTo();

        if (!isHome) {
          window.dispatchEvent(new Event("header:intro-ready"));
        }

        enableScrollBehavior();
      },
    });

    return () => {
      entrance?.kill();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("header:hide", hide);
      window.removeEventListener("header:show", show);
    };
  }, [pathname, isHome]);

  // Logo rotation on scroll (solo el symbol)
  useLayoutEffect(() => {
    if (!logoWrapperRef.current) return;

    const images = logoWrapperRef.current.querySelectorAll("img");
    const symbol = images.item(1);

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

  // Header theme detection
  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let triggers: ScrollTrigger[] = [];

    const setupThemeDetection = () => {
      triggers.forEach((trigger) => trigger.kill());

      const sections = gsap.utils.toArray<HTMLElement>(
        '[data-header-theme="light"]'
      );

      const updateTheme = () => {
        const headerPosition = 36;

        const isLight = sections.some((section) => {
          const rect = section.getBoundingClientRect();

          return rect.top <= headerPosition && rect.bottom > headerPosition;
        });

        if (isLight) {
          header.dataset.theme = "light";
        } else {
          delete header.dataset.theme;
        }
      };

      triggers = sections.map((section) =>
        ScrollTrigger.create({
          trigger: section,
          start: "top 36px",
          end: "bottom 36px",
          onToggle: updateTheme,
          onRefresh: updateTheme,
        })
      );

      updateTheme();
    };

    setupThemeDetection();
    window.addEventListener("header:refresh-theme", setupThemeDetection);

    return () => {
      window.removeEventListener("header:refresh-theme", setupThemeDetection);
      triggers.forEach((trigger) => trigger.kill());
      delete header.dataset.theme;
    };
  }, [pathname]);

  return (
    <header ref={headerRef} id="site-header" className={styles.header}>
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
          <nav className={styles.nav} data-cursor="header">
            <Link href="/work" className={styles.navLink}>
              <span className={styles.navBase}>Work</span>
              <span className={styles.navAccent}>Work</span>
            </Link>

            <Link href="/about" className={styles.navLink}>
              <span className={styles.navBase}>About</span>
              <span className={styles.navAccent}>About</span>
            </Link>

            <Link href="/contact" className={styles.navLink}>
              <span className={styles.navBase}>Contact</span>
              <span className={styles.navAccent}>Contact</span>
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
            <span className={styles.menuToggleText}>MENU</span>
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
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileSocialLink}
                >
                  Instagram
                </a>

                <a
                  href="https://linkedin.com"
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
