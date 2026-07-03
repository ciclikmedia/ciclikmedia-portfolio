'use client';

import { useRouter } from "next/navigation";

import styles from "./TransitionOverlay.module.scss";

import { useTransitionStore } from "@/stores/useTransitionStore";

import Image from "next/image";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function TransitionOverlay() {

   const project = useTransitionStore(
        (state) => state.project
    );

    const setProject = useTransitionStore(
        (state) => state.setProject
    );

    const previewRef = useRef<HTMLDivElement>(null);

    const router = useRouter();

    useLayoutEffect(() => {

        if (!project) return;

        if (!previewRef.current) return;

        gsap.to(previewRef.current, {
            left: 0,
            top: 0,
            width: window.innerWidth,
            height: window.innerHeight,
            borderRadius: 0,
            duration: 1.1,
            ease: "expo.inOut",
        });

        gsap.to(previewRef.current, {

            left: 0,
            top: 0,
            width: window.innerWidth,
            height: window.innerHeight,
            borderRadius: 0,

            duration: 1.1,
            ease: "expo.inOut",

            onComplete: () => {

                router.push(`/work/${project.slug}`);

                setProject(null);

            },

        });

    }, [project]);

    if (!project) {
        return null;
    }

    return (

            <div className={styles.overlay}>

                <div
                    ref={previewRef}
                    className={styles.preview}
                    style={{
                        left: project.bounds.left,
                        top: project.bounds.top,
                        width: project.bounds.width,
                        height: project.bounds.height,
                    }}
                >

                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        priority
                        sizes="560px"
                        className={styles.image}
                    />

                </div>

            </div>

        );

}