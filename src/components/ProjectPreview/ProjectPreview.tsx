'use client';

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import Image from "next/image";

import gsap from "gsap";


import {
  PreviewHandle,
  PreviewProject,
} from "./ProjectPreview.types";

import styles from "./ProjectPreview.module.scss";

const ProjectPreview = forwardRef<
  PreviewHandle,
  object
>((_, ref) => {

    const previewRef =
        useRef<HTMLDivElement>(null);

    const imageWrapperRef =
        useRef<HTMLDivElement>(null);

    const imageLayerRef =
        useRef<HTMLDivElement>(null);  
        
        
    const titleRef =
        useRef<HTMLSpanElement>(null);

    const target = useRef({
        x: 0,
        y: 0,
    });

    const current = useRef({
        x: 0,
        y: 0,
    });

    const velocity = useRef({
        x: 0,
        y: 0,
    });
    const offset = useRef({
        x: 0,
        y: 0,
    });
    

    const [project, setProject] =
        useState<PreviewProject | null>(null);

    const projectRef = useRef<PreviewProject | null>(null);

        useEffect(() => {
            
            target.current.x = window.innerWidth / 2;
            target.current.y = window.innerHeight / 2;

            current.current.x = target.current.x;
            current.current.y = target.current.y;

            const calculatePhysics = () => {

            velocity.current.x =
                target.current.x - current.current.x;

            velocity.current.y =
                target.current.y - current.current.y;

            offset.current.x +=
                (velocity.current.x * 0.45 - offset.current.x) * 0.06;

            offset.current.y +=
                (velocity.current.y * 0.45 - offset.current.y) * 0.06;

            current.current.x +=
                velocity.current.x * 0.12;

            current.current.y +=
                velocity.current.y * 0.12;

            };

            const render = () => {

            if (!previewRef.current) return;

            const rotation = gsap.utils.clamp(
                -8,
                8,
                velocity.current.x * 0.06
            );

            gsap.set(previewRef.current, {
                x: current.current.x + offset.current.x,
                y: current.current.y + offset.current.y,
                rotation,
            });
            if (imageLayerRef.current) {

            gsap.set(imageLayerRef.current, {

                x: -velocity.current.x * 0.2,

                y: -velocity.current.y * 0.2,

                scale: 1.08,

            });

            }

            };  
        

        const tick = () => {
            calculatePhysics();
            render();
        };

        gsap.ticker.add(tick);

        return () => {
            gsap.ticker.remove(tick);
        };

        }, []);

  useImperativeHandle(ref, () => ({

    show(projectData: PreviewProject) {

    if (!previewRef.current) return;

    const isFirstProject = !projectRef.current;

    projectRef.current = projectData;
    setProject(projectData);

    if (!isFirstProject) {

        gsap.fromTo(
            previewRef.current,
            {
                scale: .96,
            },
            {
                scale: 1,
                duration: .45,
                ease: "expo.out",
            }
        );

        if (titleRef.current) {

            gsap.fromTo(
                titleRef.current,
                {
                    opacity: 0,
                    y: 18,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: .45,
                    ease: "power3.out",
                }
            );

        }

    }

    gsap.to(previewRef.current, {
        opacity: .9,
        duration: .35,
        ease: "power3.out",
    });

},

hide() {

    if (!previewRef.current) return;

    projectRef.current = null;

    gsap.to(previewRef.current, {
        opacity: 0,
        scale: .96,
        duration: .35,
        ease: "power3.out",
    });

},

move(x, y) {

    target.current.x = x;

    target.current.y = y;

},

  }));

  return (
    <div
      ref={previewRef}
      className={styles.preview}
    >
      {project && (
        <>
       <div
        ref={imageWrapperRef}
        className={styles.imageWrapper}
        >

            <div
                ref={imageLayerRef}
                className={styles.imageLayer}
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

          <div className={styles.overlay}>
            <span
                ref={titleRef}
                className={styles.projectTitle}
            >
              {project.title}
            </span>
          </div>
        </>
      )}
    </div>
  );
});

ProjectPreview.displayName =
  "ProjectPreview";

export default ProjectPreview;