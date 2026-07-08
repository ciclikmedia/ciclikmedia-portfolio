'use client';

import { useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';

import styles from './SelectedBrands.module.scss';

const brands = [
  {
    logo: 'MALASPINA',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, dolor id posuere auctor.',
  },
  {
    logo: 'PEUGEOT MOTOCYCLES',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, dolor id posuere auctor.',
  },
  {
    logo: 'PINGÜINO TORREBLANCA',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, dolor id posuere auctor.',
  },
  {
    logo: 'REPSOL',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, dolor id posuere auctor.',
  },
  {
    logo: 'MAHOU',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, dolor id posuere auctor.',
  },
  {
    logo: 'MOVISTAR',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, dolor id posuere auctor.',
  },
  {
    logo: 'SANTANDER',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, dolor id posuere auctor.',
  },
  {
    logo: 'SEAT',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, dolor id posuere auctor.',
  },
  {
    logo: 'IBERIA',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, dolor id posuere auctor.',
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
            Through agencies,
            collaborations and
            direct engagements,
            {"I've"} contributed to
            digital products,
            campaigns and
            experiences for global
            brands and
            organizations.
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
                  <div
                    className={
                      styles.logo
                    }
                  >
                    {
                      brand.logo
                    }
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