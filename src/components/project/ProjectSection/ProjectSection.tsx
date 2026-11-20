'use client';

import { ReactNode } from "react";

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
  return (
    <section
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