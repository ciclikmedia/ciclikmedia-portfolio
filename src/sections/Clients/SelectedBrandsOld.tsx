'use client';

import { useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { useCursor } from '@/hooks/useCursor';

import styles from "./SelectedBrands.module.scss";

const brands = [
  {
    logo: "MALASPINA",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, dolor id posuere auctor.",
  },
  {
    logo: "PEUGEOT MOTOCYCLES",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, dolor id posuere auctor.",
  },
  {
    logo: "PINGÜINO TORREBLANCA",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, dolor id posuere auctor.",
  },
  {
    logo: "REPSOL",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, dolor id posuere auctor.",
  },
  {
    logo: "MAHOU",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, dolor id posuere auctor.",
  },
  {
    logo: "MOVISTAR",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, dolor id posuere auctor.",
  },
  {
    logo: "SANTANDER",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, dolor id posuere auctor.",
  },
  {
    logo: "SEAT",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, dolor id posuere auctor.",
  },
  {
    logo: "IBERIA",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis, dolor id posuere auctor.",
  },
];

export default function SelectedBrands() {
  const dragAreaRef =
  useRef<HTMLDivElement>(null);

const gridRef =
  useRef<HTMLDivElement>(null);

  const progressRef =
    useRef<HTMLSpanElement>(null);

  const {
    setVariant,
    setLabel,
  } = useCursor();

  useLayoutEffect(() => {
  gsap.registerPlugin(
    Draggable,
    InertiaPlugin
  );

  if (
    !gridRef.current ||
    !dragAreaRef.current
  ) {
    return;
  }

  const grid = gridRef.current;

  const dragArea =
    dragAreaRef.current;

  let wheelHandler:
    | ((e: WheelEvent) => void)
    | null = null;

  const updateDraggable = () => {
    Draggable.get(grid)?.kill();

    if (wheelHandler) {
      dragArea.removeEventListener(
        'wheel',
        wheelHandler
      );
    }

    const visibleWidth =
      grid.parentElement
        ?.clientWidth || 0;

    const contentWidth =
      grid.scrollWidth;

    const minX =
      Math.min(
        0,
        visibleWidth -
          contentWidth
      );

    const updateProgress =
      function (
        this: Draggable
      ) {
        if (
          !progressRef.current ||
          minX === 0
        ) {
          return;
        }

        const progress =
          Math.abs(
            this.x / minX
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

    Draggable.create(
      grid,
      {
        trigger:
          dragArea,

        type: 'x',

        inertia: true,

        edgeResistance: 1,

        throwResistance: 500,

        overshootTolerance: 0,

        minimumMovement: 1,

        bounds: {
          minX,
          maxX: 0,
        },

        onPress() {
          setVariant(
            'dragActive'
          );
        },

        onRelease() {
          setVariant(
            'drag'
          );

          setLabel(
            'DRAG'
          );
        },

        onDrag:
          updateProgress,

        onThrowUpdate:
          updateProgress,
      }
    );

    const draggable =
      Draggable.get(
        grid
      );

    wheelHandler = (
        e: WheelEvent
      ) => {
        if (!draggable) return;

        // ignorar scroll vertical
        if (
          Math.abs(e.deltaX) < 1
        ) {
          return;
        }

        e.preventDefault();

        const nextX =
          gsap.utils.clamp(
            minX,
            0,
            draggable.x -
              e.deltaX * 2.2
          );

        gsap.to(
          draggable.target,
          {
            x: nextX,

            duration: 0.8,

            ease: 'expo.out',

            overwrite: true,

            onUpdate: () => {
              draggable.update();

              updateProgress.call(
                draggable
              );
            },
          }
        );
      };

    dragArea.addEventListener(
      'wheel',
      wheelHandler,
      {
        passive: false,
      }
    );
  };

  updateDraggable();

  window.addEventListener(
    'resize',
    updateDraggable
  );

  return () => {
    window.removeEventListener(
      'resize',
      updateDraggable
    );

    if (
      wheelHandler
    ) {
      dragArea.removeEventListener(
        'wheel',
        wheelHandler
      );
    }

    Draggable.get(
      grid
    )?.kill();
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
            Brands I've worked with.
          </h2>

          <p>
            Through agencies, collaborations and direct engagements,
            I've contributed to digital products, campaigns and experiences
            for global brands and organizations.
          </p>
        </div>

        <div
  ref={dragAreaRef}
  className={styles.dragArea}
          onMouseEnter={() => {
            setVariant('drag');
            setLabel('DRAG');
          }}
          onMouseLeave={() => {
            setVariant('default');
            setLabel('');
          }}
        >
          <div
            ref={gridRef}
            className={styles.grid}
          >
            {brands.map((brand, index) => (
              <article
                key={index}
                className={styles.card}
              >
                <div className={styles.logo}>
                  {brand.logo}
                </div>

                <div className={styles.divider} />

                <p>{brand.description}</p>
              </article>
            ))}
          </div>

          <div className={styles.progress}>
            <span
              ref={progressRef}
            />
          </div>
        </div>
      </div>
    </section>
  );
}