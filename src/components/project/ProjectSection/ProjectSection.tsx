'use client';

import { ReactNode, useEffect, useRef } from "react";

import styles from "./ProjectSection.module.scss";

interface Props {
  children: ReactNode;
  variant?: "dark" | "light";
  paddingTopNone?: boolean;
  paddingBottomNone?: boolean;
  bodyTheme?: "beige" | "dark";
}

export default function ProjectSection({
  children,
  variant = "dark",
  paddingTopNone = false,
  paddingBottomNone = false,
  bodyTheme,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !bodyTheme) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        document.body.classList.remove("bg-red", "bg-beige", "bg-dark");
        document.body.classList.add(`bg-${bodyTheme}`);
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [bodyTheme]);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${styles[variant]} ${
  paddingTopNone ? styles.paddingTopNone : ""
} ${
  paddingBottomNone ? styles.paddingBottomNone : ""
}`}
      data-header-theme={variant === "light" ? "light" : undefined}
      data-body-theme={bodyTheme}
    >
      <div className="site-container">
        {children}
      </div>
    </section>
  );
}