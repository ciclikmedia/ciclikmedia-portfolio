"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./ProjectCard.module.scss";
import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({
  project,
  priority = false,
}: ProjectCardProps) {
  return (
    <Link
      href={project.href}
      className={styles.projectLink}
    >
      <div className={styles.content}>
        <div className={styles.media} data-cursor-invert>
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className={styles.cover}
            sizes="100vw"
            priority={priority}
          />
        </div>

        <div className={styles.info}>
          <h3 className={styles.projectTitle}>
            <span>{project.title}</span>

            <span
              className={styles.titleAccent}
              style={{
                color: project.accent,
              }}
            >
              {project.title}
            </span>
          </h3>

          <span className={styles.description}>
            {project.meta}
          </span>
        </div>
      </div>
    </Link>
  );
}