import { ReactNode } from "react";

import styles from "./ProjectSection.module.scss";

interface Props {
  children: ReactNode;
  variant?: "dark" | "light";
  firstPadding?: boolean;
}

export default function ProjectSection({
  children,
  variant = "dark",
  firstPadding = false,
}: Props) {
  return (
    <section
      className={`${styles.section} ${styles[variant]} ${
        firstPadding ? styles.firstPadding : ""
      }`}
      data-header-theme={variant === "light" ? "light" : undefined}
    >
      <div className="site-container">
        {children}
      </div>
    </section>
  );
}