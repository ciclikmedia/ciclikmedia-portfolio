'use client';

import { useLayoutEffect, useRef } from "react";

import Image from "next/image";

import gsap from "gsap";

import styles from "./TransitionOverlay.module.scss";

import {
    TransitionData,
} from "./TransitionOverlay.types";

interface TransitionOverlayProps {

    project: TransitionData | null;

}

export default function TransitionOverlay({
    
    project,

}: TransitionOverlayProps) {
     const overlayRef =
        useRef<HTMLDivElement>(null);

    const imageWrapperRef =
        useRef<HTMLDivElement>(null);

    const imageLayerRef =
        useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {

    if (!project || !overlayRef.current) return;
    

    const tl = gsap.timeline();

        tl.to(
            imageLayerRef.current,
            {
                inset: 0,
                duration: 0.9,
                ease: "expo.inOut",
            },
            0
        );

        tl.to(
            overlayRef.current,
            {
                left: 0,
                top: 0,
                width: window.innerWidth,
                height: window.innerHeight,
                duration: 0.9,
                ease: "expo.inOut",
            },
            0
        );

}, [project]);

    const isVisible = !!project;

    return (

        <div
            ref={overlayRef}
            className={styles.overlay}
            style={{

                left: project?.bounds.left ?? 0,

                top: project?.bounds.top ?? 0,

                width: project?.bounds.width ?? 0,

                height: project?.bounds.height ?? 0,

                opacity: isVisible ? 1 : 0,

                visibility: isVisible ? "visible" : "hidden",

            }}
        >

            <div
                ref={imageWrapperRef}
                className={styles.imageWrapper}
            >

                <div
                    ref={imageLayerRef}
                    className={styles.imageLayer}
                >

                    {project && (

                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            priority
                            sizes="100vw"
                            className={styles.image}
                        />

                    )}

                </div>

            </div>

        </div>

    );

}