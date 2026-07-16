'use client';

import { useEffect, useRef, useState } from 'react';

import gsap from 'gsap';

import styles from './Cursor.module.scss';

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

  const lensRef =
    useRef<HTMLDivElement>(null);

  const forcedPosition = useRef<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {

    window.addEventListener("focus", () => {
});

window.addEventListener("blur", () => {
});

document.addEventListener("visibilitychange", () => {
});
  if (!cursorRef.current) return;

  if (!lensRef.current) return;

    const lens =
      lensRef.current;

    

  const cursor = cursorRef.current;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

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

  currentX +=
    (mouseX - currentX) * 0.14;

  currentY +=
    (mouseY - currentY) * 0.14;

}

  xSet(currentX);
  ySet(currentY);

  gsap.set(lens, {
    x: currentX,
    y: currentY,
  });

  updateCursorVariant();
};

const showCursor = (event: Event) => {

  const e = event as CustomEvent<{
    x: number;
    y: number;
  }>;

  if (!e.detail) return;

gsap.killTweensOf([cursor, lens]);

gsap.fromTo(
  [cursor, lens],
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

 forcedPosition.current = {
    x: e.detail.x,
    y: e.detail.y,
  };

  currentX = e.detail.x;
  currentY = e.detail.y;

  xSet(currentX);
  ySet(currentY);

  gsap.set(lens, {
    x: currentX,
    y: currentY,
  });

};
const hideCursor = () => {

  gsap.set(cursor, {
    autoAlpha: 0,
  });

  gsap.set(lens, {
    autoAlpha: 0,
  });

};

window.addEventListener(
  "cursor:show",
  showCursor
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
    "cursor:hide",
    hideCursor
  );

  gsap.ticker.remove(
    tick
  );

};

}, []);



  return (
  <>
    <div
      ref={lensRef}
      style={{
          position: "fixed",

          left: 0,
          top: 0,

          width:
            variant === "hero" ||
            variant === "view" ||
            variant === "drag"
              ? "113px"
              : "18px",

          height:
            variant === "hero" ||
            variant === "view" ||
            variant === "drag"
              ? "113px"
              : "18px",

          borderRadius: "50%",

          pointerEvents: "none",

          zIndex: 99998,

          transform:
            "translate(-50%, -50%)",

          opacity:
            variant === "hero" ||
            variant === "view" ||
            variant === "drag"
              ? 1
              : 0,

          transition: `
            width .35s cubic-bezier(0.22,1,0.36,1),
            height .35s cubic-bezier(0.22,1,0.36,1),
            opacity .25s ease
          `,

          backdropFilter:
            "blur(4px) brightness(1.02) saturate(1.05)",

          WebkitBackdropFilter:
            "blur(4px) brightness(1.02) saturate(1.05)",

          background:
            "rgba(255,255,255,.05)",

          border:
            "1px solid rgba(255,255,255,.05)",

          boxShadow: `
            0 0 12px rgba(255,255,255,.02),
            inset 0 0 8px rgba(255,255,255,.01)
          `,
        }}
      />
     <div
      ref={cursorRef}
      className={`${styles.cursor} ${styles[variant]}`}
    >
      {variant ===
      'dragActive' ? (
        <div
          className={
            styles.dragIndicator
          }
        >
          <span
            className={
              styles.dragArrow
            }
          >
            ←
          </span>

          <div
            className={
              styles.dragDot
            }
          />

          <span
            className={
              styles.dragArrow
            }
          >
            →
          </span>
        </div>
      ) : (
        label && (
          <div
            className={
              styles.label
            }
          >
            {variant === "hero" ? (
              <>
                <span className={styles.labelText}>
                  Scroll to
                  <br />
                  Discover
                </span>

                <span className={styles.labelArrow}>
                  ↓
                </span>
              </>
            ) : variant === "view" ? (
              <>
                <span className={styles.labelArrow}>
                  ↗
                </span>

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
  </>
  );
}