"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

import styles from "./ProjectCard.module.scss";
import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  const coverRef =
    useRef<HTMLDivElement>(null);

  const videoRef =
    useRef<HTMLVideoElement>(null);

 

  useEffect(() => {
  if (!coverRef.current) return;

  gsap.set(coverRef.current, {
    opacity: 1,
    scale: 1,
  });

  if (videoRef.current) {
    gsap.set(videoRef.current, {
      opacity: 0,
      scale: 1.06,
    });
  }
}, []);

    const showVideo = async () => {
        if (
            !videoRef.current ||
            !coverRef.current
        ) {
            return;
        }

        gsap.killTweensOf([
            coverRef.current,
            videoRef.current,
        ]);

        try {
            videoRef.current.currentTime = 0;
            await videoRef.current.play();
        } catch {}

        gsap.to(coverRef.current, {
            opacity: 0,
            scale: 1.04,
            duration: 0.6,
            ease: "power3.out",
        });

        gsap.to(videoRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
        });
        };

    const showCover = () => {
        if (
            !videoRef.current ||
            !coverRef.current
        ) {
            return;
        }

        gsap.killTweensOf([
            coverRef.current,
            videoRef.current,
        ]);

        gsap.to(videoRef.current, {
            opacity: 0,
            scale: 1.06,
            duration: 0.45,
            ease: "power3.out",
            onComplete: () => {
            videoRef.current?.pause();

            if (videoRef.current) {
                videoRef.current.currentTime = 0;
            }
            },
        });

        gsap.to(coverRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: "power3.out",
        });
        };

  

  return (
    <Link
        href={project.href}
        className={styles.projectLink}
        onMouseEnter={showVideo}
        onMouseLeave={showCover}
        >
        <div className={styles.content}>
            <div className={styles.media}>
            <div
                ref={coverRef}
                className={styles.coverWrapper}
            >
                <Image
                src={project.cover}
                alt={project.title}
                fill
                className={styles.cover}
                sizes="100vw"
                
                />
            </div>

            {project.previewVideo && (
                <video
                ref={videoRef}
                className={styles.video}
                muted
                loop
                playsInline
                preload="metadata"
                >
                <source
                    src={project.previewVideo}
                    type="video/mp4"
                />
                </video>
            )}
            </div>

            <div className={styles.info}>
            <span className={styles.number}>
                {project.number}
            </span>

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

            <span className={styles.viewProject}>
                ↗ View Project
            </span>
            </div>
        </div>
        </Link>
  );
}