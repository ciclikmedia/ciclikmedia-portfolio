"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";

import { useRouter, usePathname } from "next/navigation";

import gsap from "gsap";

import ProjectTransitionLayer from "./ProjectTransitionLayer";

export interface ProjectTransitionControllerHandle {
  animateIn: () => void;
  navigateTo: (path: string) => void;
  demoTransition: () => void;
}

const ProjectTransitionController = forwardRef<
  ProjectTransitionControllerHandle,
  object
>(function ProjectTransitionController(_, ref) {
  const router = useRouter();
  const pathname = usePathname();

  const layerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const pendingNavigationRef = useRef(false);

  // Detect route change and reveal the new page
  useEffect(() => {
    if (!pendingNavigationRef.current || !layerRef.current) return;

    pendingNavigationRef.current = false;

    // Reset Lenis to the top of the new project
    window.dispatchEvent(new Event("lenis:scrollToTop"));

    timelineRef.current?.kill();

    timelineRef.current = gsap.timeline();

    timelineRef.current.to(layerRef.current, {
      y: "-100%",
      duration: 0.8,
      ease: "power3.inOut",
    });
  }, [pathname]);

  const animateIn = () => {
    if (!layerRef.current) return;

    timelineRef.current?.kill();

    timelineRef.current = gsap.timeline();

    timelineRef.current.to(layerRef.current, {
      y: "0%",
      duration: 0.8,
      ease: "power3.inOut",
    });
  };

  const navigateTo = (path: string) => {
    if (!layerRef.current) return;

    timelineRef.current?.kill();

    timelineRef.current = gsap.timeline({
      onComplete: () => {
        pendingNavigationRef.current = true;
        router.push(path);
      },
    });

    timelineRef.current.to(layerRef.current, {
      y: "0%",
      duration: 0.8,
      ease: "power3.inOut",
    });
  };

  const demoTransition = () => {
    if (!layerRef.current) return;

    timelineRef.current?.kill();

    timelineRef.current = gsap.timeline();

    timelineRef.current
      .to(layerRef.current, {
        y: "0%",
        duration: 0.8,
        ease: "power3.inOut",
      })
      .to(layerRef.current, {
        y: "-100%",
        duration: 0.8,
        ease: "power3.inOut",
      });
  };

  useImperativeHandle(ref, () => ({
    animateIn,
    navigateTo,
    demoTransition,
  }));

  return <ProjectTransitionLayer layerRef={layerRef} />;
});

export default ProjectTransitionController;