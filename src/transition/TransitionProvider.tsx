"use client";

import { ReactNode, useRef, useState, } from "react";
import gsap from "gsap";

import { TransitionContext } from "./TransitionContext";
import TransitionOverlay from "./TransitionOverlay";

import type {
  TransitionAPI,
  TransitionPayload,
} from "./transition.types";

interface Props {
  children: ReactNode;
}

type TransitionState =
  | "idle"
  | "expanding"
  | "waiting"
  | "revealing";

export function TransitionProvider({
  children,
}: Props) {

  const overlayRef =
    useRef<HTMLDivElement>(null);

  const state =
    useRef<TransitionState>("idle");

  const wrapperRef =
    useRef<HTMLDivElement | null>(null);

  const payloadRef =
    useRef<TransitionPayload | null>(null);

  const timelineRef =
    useRef<gsap.core.Timeline | null>(null);

  const [isTransitioning, setIsTransitioning] =
    useState(false);

  const createWrapper = (payload: TransitionPayload) => {

  const wrapper = document.createElement("div");

  Object.assign(wrapper.style, {
    position: "fixed",
    left: `${payload.rect.left}px`,
    top: `${payload.rect.top}px`,
    width: `${payload.rect.width}px`,
    height: `${payload.rect.height}px`,
    overflow: "hidden",
    zIndex: "99999",
    pointerEvents: "none",
    transformOrigin: "top left",
    willChange: "transform",
  });

  const image = document.createElement("img");

  image.src = payload.project.image;

  image.alt = payload.project.title;

    Object.assign(image.style, {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
  });

    wrapper.appendChild(image);

    overlayRef.current?.appendChild(wrapper);

    wrapperRef.current = wrapper;

    return wrapper;

  };

  const start: TransitionAPI["start"] = async (payload) => {

  if (state.current !== "idle") return;

 state.current = "expanding";

 document.documentElement.style.overflow = "hidden";
document.body.style.overflow = "hidden";

window.dispatchEvent(new Event("cursor:hide"));
window.dispatchEvent(new Event("lenis:stop"));

  setIsTransitioning(true);

  payloadRef.current = payload;

  gsap.set(payload.element, {
      opacity: 0,
  });

  const wrapper = createWrapper(payload);

timelineRef.current = gsap.timeline();

timelineRef.current.to(wrapper, {
    left: 0,
    top: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    duration: 0.8,
    ease: "expo.inOut",
});
  await timelineRef.current.then();

  state.current = "waiting";

};

  const finish: TransitionAPI["finish"] = () => {

    if (state.current !== "waiting") return;

    state.current = "revealing";

    const wrapper = wrapperRef.current;

    if (!wrapper) return;

    const hero = document.querySelector(
        "[data-transition-target]"
    ) as HTMLElement | null;

    if (!hero) return;

    const rect = hero.getBoundingClientRect();

    const content = document.querySelector(
        "[data-hero-content]"
    ) as HTMLElement | null;
        

    gsap.set(hero, {
        opacity: 1,
    });

  gsap.set(content, {
      opacity: 1,
      x: 500,
      scale: 1.22,
      clipPath: "inset(0 100% 0 0)",
      transformOrigin: "left center",
  });

const imageDuration = 0.8;

const textDelay = 0.05;      // Cuándo empieza el texto respecto a la imagen
const textKickDuration = 0.15; // Duración del primer impulso
const textElastic = 1.75;      // Duración del rebote

const wrapperFadeDelay = 0.15; // Cuándo empieza el fade del wrapper
const wrapperFadeDuration = 0.25;

    gsap.timeline({

    onComplete() {

        if (payloadRef.current?.element) {

            gsap.set(payloadRef.current.element, {
                opacity: 1,
            });

        }

        wrapper.remove();

        window.dispatchEvent(
          new CustomEvent("cursor:show", {
            detail: {
              x: window.innerWidth / 2,
              y: window.innerHeight * 0.86,
            },
          })
        );

        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        window.dispatchEvent(new Event("lenis:start"));

        wrapperRef.current = null;

        payloadRef.current = null;

        timelineRef.current = null;

        setIsTransitioning(false);

        state.current = "idle";

    },

})

.to(wrapper, {

    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,

    duration: imageDuration,
    ease: "power4.inOut",

})

.to(content, {

    clipPath: "inset(0 0% 0 0)",

    x: 500,

    scale: 2.98,

    duration: textKickDuration,

    ease: "power4.out",

    opacity: 0,

}, `<+=${textDelay}`)

.to(content, {

    x: 0,

    scale: 1,

    opacity: 1,

    duration: textElastic,

    ease: "elastic.out(1, 0.55)",

}, `-=${textKickDuration}`)

.to(wrapper, {

    opacity: 0,

    duration: wrapperFadeDuration,

}, `-=${wrapperFadeDelay}`);

};

  return (
    <TransitionContext.Provider
        value={{
            start,
            finish,
            isTransitioning,
        }}
    >
      {children}

      <TransitionOverlay
        ref={overlayRef}
      />
    </TransitionContext.Provider>
  );

}