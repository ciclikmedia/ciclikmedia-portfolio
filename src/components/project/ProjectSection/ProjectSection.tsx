import { ReactNode } from "react";

import styles from "./ProjectSection.module.scss";

interface Props {
  children: ReactNode;
}

export default function ProjectSection({
  children,
}: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {children}
      </div>
    </section>
  );
}