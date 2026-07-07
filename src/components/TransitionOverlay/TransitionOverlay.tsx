'use client';

import { useLayoutEffect, useRef } from "react";

import Image from "next/image";

import gsap from "@/lib/gsap";

import styles from "./TransitionOverlay.module.scss";

import { useTransitionStore } from "@/stores/useTransitionStore";

import { waitForElement } from "@/utils/waitForElement";

export default function TransitionOverlay() {

    const project = useTransitionStore(
        (state) => state.project
    );

    const overlayVisible = useTransitionStore(
        (state) => state.overlayVisible
    );

    const setOverlayVisible = useTransitionStore(
        (state) => state.setOverlayVisible
    );

    const previewRef =
        useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {

        if (!project) return;

        if (!previewRef.current) return;

        gsap.set(previewRef.current, {
            left: project.bounds.left,
            top: project.bounds.top,
            width: project.bounds.width,
            height: project.bounds.height,
            borderRadius: 8,
        });

        setOverlayVisible(true);

        waitForElement(
            "project-hero-image",
            (hero) => {

                const rect =
                    hero.getBoundingClientRect();

                gsap.to(previewRef.current!, {

                    left: rect.left,

                    top: rect.top,

                    width: rect.width,

                    height: rect.height,

                    borderRadius: 0,

                    duration: 1.35,

                    ease: "expo.inOut",

                    onComplete: () => {

                        setOverlayVisible(false);

                    },

                });

            }
        );

    }, [
        project,
        setOverlayVisible,
    ]);

    if (!project) {

        return null;

    }

    return (

        <div
            className={`${styles.overlay} ${
                overlayVisible
                    ? ""
                    : styles.overlayHidden
            }`}
        >

            <div
                ref={previewRef}
                className={styles.preview}
            >

                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority
                    sizes="100vw"
                    className={styles.image}
                />

            </div>

        </div>

    );

}