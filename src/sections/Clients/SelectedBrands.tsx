'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from "next/image";

import gsap from 'gsap';


import styles from './SelectedBrands.module.scss';

const brands = [
  {
    name: "BMW",
    logo: "/images/brands/BMW.svg",
    description: "Design and development of digital experiences for the motorcycle division.",
    logoHeight: 30,
  },
  {
    name: "Santander",
    logo: "/images/brands/Banco_Santander.svg",
    description: "Design and development of digital experiences for the motorcycle division.",
    logoHeight: 38,
  },
  {
    name: "Telefónica",
    logo: "/images/brands/telefonica.svg",
    description: "Design and development of digital experiences for the motorcycle division.",
    logoHeight: 46,
  },
  {
    name: "Amadeus",
    logo: "/images/brands/amadeus.svg",
    description: "Design and development of digital experiences for the motorcycle division.",
    logoHeight: 24,
  },
  {
    name: "BIPI",
    logo: "/images/brands/bipi.svg",
    description: "Design and development of digital experiences for the motorcycle division.",
    logoHeight: 48,
  },
  {
    name: "CHICCO",
    logo: "/images/brands/chicco.svg",
    description: "Design and development of digital experiences for the motorcycle division.",
    logoHeight: 54,
  },
  {
    name: "GSK",
    logo: "/images/brands/gsk.svg",
    description: "Design and development of digital experiences for the motorcycle division.",
    logoHeight: 48,
  },
  {
    name: "Peugeot",
    logo: "/images/brands/peugeot.svg",
    description: "Design and development of digital experiences for the motorcycle division.",
    logoHeight: 38,
  },
  {
    name: "Mapfre",
    logo: "/images/brands/mapfre.svg",
    description: "Design and development of digital experiences for the motorcycle division.",
    logoHeight: 26,
  },
  {
    name: "Lilly",
    logo: "/images/brands/lilly.svg",
    description: "Design and development of digital experiences for the motorcycle division.",
    logoHeight: 56,
  },
  {
    name: "Chivas",
    logo: "/images/brands/chivas.svg",
    description: "Design and development of digital experiences for the motorcycle division.",
    logoHeight: 38,
  },
];

export default function SelectedBrandsLerp() {
  const dragAreaRef =
    useRef<HTMLDivElement>(null);

  const gridRef =
    useRef<HTMLDivElement>(null);

  const progressRef =
    useRef<HTMLSpanElement>(null);

  
    useLayoutEffect(() => {
    if (
      !dragAreaRef.current ||
      !gridRef.current
    ) {
      return;
    }

    const dragArea =
      dragAreaRef.current;

    const grid =
      gridRef.current;

    let currentX = 0;
    let targetX = 0;

    let startX = 0;
    let dragStart = 0;

    let isDragging = false;

    let minX = 0;

    const calculateBounds = () => {
      const visibleWidth =
        dragArea.clientWidth;

      const contentWidth =
        grid.scrollWidth;

      minX =
        visibleWidth -
        contentWidth;

      minX = Math.min(
        0,
        minX
      );

      targetX =
        gsap.utils.clamp(
          minX,
          0,
          targetX
        );
    };

    calculateBounds();

    const updateProgress =
      () => {
        if (
          !progressRef.current ||
          minX === 0
        ) {
          return;
        }

        const progress =
          Math.abs(
            currentX / minX
          );

        const trackWidth =
          progressRef.current
            .parentElement!
            .offsetWidth;

        const indicatorWidth =
          progressRef.current
            .offsetWidth;

        const maxMove =
          trackWidth -
          indicatorWidth;

        gsap.set(
          progressRef.current,
          {
            x:
              maxMove *
              progress,
          }
        );
      };

    const tick = () => {
      currentX +=
        (targetX -
          currentX) *
        0.08;

      gsap.set(grid, {
        x: currentX,
      });

      updateProgress();
    };

    gsap.ticker.add(tick);

   const onPointerDown = (
      e: PointerEvent
    ) => {
      isDragging = true;

      startX = e.clientX;

      dragStart = targetX;

      dragArea.dataset.cursor =
        "dragActive";
    };

    const onPointerMove =
      (e: PointerEvent) => {
        if (!isDragging)
          return;

        const delta =
          (e.clientX - startX) * 2;

        targetX =
          dragStart +
          delta;

        if (targetX > 0) {
          targetX *= 0;
        }

        if (
          targetX < minX
        ) {
          targetX =
            minX +
            (targetX -
              minX) *
              0;
        }
      };

    const onPointerUp =
  () => {
    isDragging = false;

    targetX =
      gsap.utils.clamp(
        minX,
        0,
        targetX
      );

    if (
      dragArea.matches(":hover")
    ) {
      dragArea.dataset.cursor =
        "drag";

      dragArea.dataset.cursorLabel =
        "DRAG";
    } else {
      delete dragArea.dataset.cursor;

      delete dragArea.dataset.cursorLabel;
    }
  };

    const onWheel = (
      e: WheelEvent
    ) => {
      const horizontal =
        Math.abs(
          e.deltaX
        );

      const vertical =
        Math.abs(
          e.deltaY
        );

      // Scroll vertical
      if (
        vertical >
        horizontal
      ) {
        return;
      }

      // Siempre bloquear
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      targetX -=
        e.deltaX * 1.5;

      targetX =
        gsap.utils.clamp(
          minX,
          0,
          targetX
        );
    };

    const onResize =
      () => {
        calculateBounds();
      };

    dragArea.addEventListener(
      'pointerdown',
      onPointerDown
    );

    window.addEventListener(
      'pointermove',
      onPointerMove
    );

    window.addEventListener(
      'pointerup',
      onPointerUp
    );

    dragArea.addEventListener(
      'wheel',
      onWheel,
      {
        passive: false,
      }
    );

    window.addEventListener(
      'resize',
      onResize
    );

    return () => {
  gsap.ticker.remove(tick);

  dragArea.removeEventListener(
    "pointerdown",
    onPointerDown
  );

  window.removeEventListener(
    "pointermove",
    onPointerMove
  );

  window.removeEventListener(
    "pointerup",
    onPointerUp
  );

  dragArea.removeEventListener(
    "wheel",
    onWheel
  );

  window.removeEventListener(
    "resize",
    onResize
  );
};
 }, []);

  return (
    <section className={styles.selectedBrands}>
      <div className="site-container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            SELECTED BRANDS
          </span>

          <h2>
            Brands {"I've"} worked with.
          </h2>

          <p>
            I've contributed to digital products, campaigns, and experiences for leading brands through agencies, consultancies, collaborations, and direct client engagements.
          </p>
        </div>

        <div
          ref={dragAreaRef}
          className={styles.dragArea}
          data-cursor="drag"
          data-cursor-label="DRAG"
        >
          <div
            ref={gridRef}
            className={
              styles.grid
            }
          >
            {brands.map(
              (
                brand,
                index
              ) => (
                <article
                  key={index}
                  className={
                    styles.card
                  }
                >
                  <div className={styles.logo}>
                   <Image
                      className={styles.logoImage}
                      src={brand.logo}
                      alt={brand.name}
                      width={180}
                      height={brand.logoHeight}
                      draggable={false}
                      style={{
                        height: brand.logoHeight,
                        width: "auto",
                      }}
                    />
                  </div>

                  <div
                    className={
                      styles.divider
                    }
                  />

                  <p>
                    {
                      brand.description
                    }
                  </p>
                </article>
              )
            )}
          </div>

          <div
            className={
              styles.progress
            }
          >
            <span
              ref={
                progressRef
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}