"use client";

import { ReactNode, useRef } from "react";
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

    gsap.set(hero, {
        opacity: 1,
    });

    gsap.timeline({

        onComplete() {

          if (payloadRef.current?.element) {

    gsap.set(payloadRef.current.element, {
        opacity: 1,
    });

}

            wrapper.remove();

            wrapperRef.current = null;

            payloadRef.current = null;

            timelineRef.current = null;

            state.current = "idle";

        },

    })

    .to(wrapper, {

        opacity: 0,

        duration: .35,

        ease: "power2.out",

    })

    .to(hero, {

        opacity: 1,

        duration: .35,

        ease: "power2.out",

    }, "<");

};

  return (
    <TransitionContext.Provider
      value={{
        start,
        finish,
      }}
    >
      {children}

      <TransitionOverlay
        ref={overlayRef}
      />
    </TransitionContext.Provider>
  );

}