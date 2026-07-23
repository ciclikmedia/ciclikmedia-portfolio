'use client';

import { useEffect, useRef, useState } from 'react';

import gsap from 'gsap';

import styles from './Cursor.module.scss';

import {
  getCursorPosition,
  setCursorPosition,
} from "@/utils/cursorPosition";

export default function Cursor() {
  const cursorRef =
    useRef<HTMLDivElement>(null);

  type CursorVariant =
  | "default"
  | "link"
  | "nav"
  | "header"
  | "button"
  | "view"
  | "hero"
  | "footer"
  | "drag"
  | "dragActive";

  const [variant, setVariant] =
  useState<CursorVariant>("default");

  const [label, setLabel] =
    useState("");

  const lastVariant =
    useRef<CursorVariant>("default");

  const lastLabel =
  useRef("");

  

  const forcedPosition = useRef<{
    x: number;
    y: number;
  } | null>(null);
  const firstFollow = useRef(false);  

  useEffect(() => {
  
  if (!cursorRef.current) return;   

  const cursor = cursorRef.current;

const last = getCursorPosition();

let mouseX =
  last.x || window.innerWidth / 2;

let mouseY =
  last.y || window.innerHeight / 2;

  let currentX = mouseX;
  let currentY = mouseY;  

  const xSet = gsap.quickSetter(
    cursor,
    "x",
    "px"
  );

  const ySet = gsap.quickSetter(
    cursor,
    "y",
    "px"
  );

  const updateCursorVariant = () => {
  const element = document.elementFromPoint(
    currentX,
    currentY
  );

  const invert = element?.closest(
    "[data-cursor-invert]"
  );

  cursor.classList.toggle(
    styles.viewDark,
    !!invert
  );

  const target =
    element?.closest(
      "[data-cursor]"
    ) as HTMLElement | null;

  const nextVariant =
  (target?.dataset.cursor as CursorVariant) ??
  "default";

  const nextLabel =
    target?.dataset.cursorLabel ??
    "";

  if (
    nextVariant !==
    lastVariant.current
  ) {
    lastVariant.current =
      nextVariant;

    setVariant(nextVariant);
  }

  if (
    nextLabel !==
    lastLabel.current
  ) {
    lastLabel.current =
      nextLabel;

    setLabel(nextLabel);
  }
};

 const move = (
  e: PointerEvent
) => {
  

  if (forcedPosition.current) {
    forcedPosition.current = null;
  }

  mouseX = e.clientX;
  mouseY = e.clientY;

  setCursorPosition(
    mouseX,
    mouseY
  );

};
  const tick = () => {
  if (forcedPosition.current) {

 const pos = forcedPosition.current;

if (pos) {

  currentX +=
    (pos.x - currentX) * 0.18;

  currentY +=
    (pos.y - currentY) * 0.18;

}

} else {

  const ease = firstFollow.current
    ? 0.08
    : 0.14;

  currentX +=
    (mouseX - currentX) * ease;

  currentY +=
    (mouseY - currentY) * ease;

  if (firstFollow.current) {
    firstFollow.current = false;
  }

}

  xSet(currentX);
  ySet(currentY);

  cursor.getBoundingClientRect();

  document.body.offsetHeight;



  updateCursorVariant();
};

const showCursor = (event: Event) => {

  firstFollow.current = true;

  const e = event as CustomEvent<{
    x: number;
    y: number;
  }>;

 

gsap.killTweensOf(cursor);

gsap.set(cursor, {
  visibility: "visible",
  opacity: 1,
});

gsap.fromTo(
  cursor,
  {
    autoAlpha: 0,
    scale: 0.1,
  },
  {
    autoAlpha: 1,
    scale: 1,
    duration: 0.8,
    ease: "elastic.out(1, 0.55)",
  }
);

 if (e.detail) {
  forcedPosition.current = {
    x: e.detail.x,
    y: e.detail.y,
  };

  currentX = e.detail.x;
  currentY = e.detail.y;
  

  xSet(currentX);
  ySet(currentY);

  cursor.getBoundingClientRect();

  document.body.offsetHeight;

 
} else {
  forcedPosition.current = null;
}

};
const revealCursor = () => {

  

  gsap.to(cursor, {
    autoAlpha: 1,
    duration: 0.3,
    ease: "power2.out",
  });

};
const hideCursor = () => {

  gsap.set(cursor, {
    autoAlpha: 0,
  });

};

window.addEventListener(
  "cursor:show",
  showCursor
);

window.addEventListener(
  "cursor:reveal",
  revealCursor
);

window.addEventListener(
  "cursor:hide",
  hideCursor
);


  window.addEventListener(
    "pointermove",
    move
  );

  gsap.ticker.add(tick);

return () => {

  window.removeEventListener(
    "pointermove",
    move
  );

  window.removeEventListener(
  "cursor:show",
  showCursor
);

window.removeEventListener(
  "cursor:reveal",
  revealCursor
);

window.removeEventListener(
  "cursor:hide",
  hideCursor
);

  gsap.ticker.remove(
    tick
  );

};

}, []);

  return (
  <div
    ref={cursorRef}
    className={`${styles.cursor} ${styles[variant]}`}
  >
    {variant === "dragActive" ? (
      <div className={styles.dragIndicator}>
        <span className={styles.dragArrow}>←</span>

        <div className={styles.dragDot} />

        <span className={styles.dragArrow}>→</span>
      </div>
    ) : (
      label && (
        <div className={styles.label}>
          {variant === "hero" ? (
            <>
              <span className={styles.labelText}>
                Scroll to
                <br />
                Discover
              </span>

              <span className={styles.labelArrow}>↓</span>
            </>
          ) : variant === "view" ? (
            <>
              <span className={styles.labelArrow}>↗</span>

              <span className={styles.labelText}>
                {label}
              </span>
            </>
          ) : (
            label
          )}
        </div>
      )
    )}
  </div>
);
}