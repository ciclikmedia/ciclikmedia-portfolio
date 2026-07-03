'use client';

import styles from "./ProjectRow.module.scss";

interface ProjectRowProps {
  id: string;
  title: string;
  services: string[];

  onEnter: () => void;
  onLeave: () => void;

  onMove: (
    x: number,
    y: number
  ) => void;

  onClick: () => void;
}


export default function ProjectRow({
  id,
  title,
  services,
  onEnter,
  onLeave,
  onMove,
  onClick,
}: ProjectRowProps) {
  return (
    <article
        className={styles.project}
        data-cursor="view"
        data-cursor-label="View work"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onMouseMove={(e) => {
            onMove(
                e.clientX,
                e.clientY
            );
        }}
        onClick={onClick}
    >
      <span className={styles.number}>
        {id}
      </span>

      <div className={styles.content}>
        <h2 className={styles.title}>
          {title}
        </h2>

        <ul className={styles.services}>
          {services.map((service) => (
            <li key={service}>
              {service}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}