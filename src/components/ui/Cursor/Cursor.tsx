'use client';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';

import { useCursorContext } from './CursorContext';

import styles from './Cursor.module.scss';

export default function Cursor() {
  const cursorRef =
    useRef<HTMLDivElement>(null);

  const {
    variant,
    label,
  } = useCursorContext();

  useEffect(() => {
    if (!cursorRef.current) return;

    const cursor =
      cursorRef.current;

    let mouseX =
      window.innerWidth / 2;

    let mouseY =
      window.innerHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;

    const xSet =
      gsap.quickSetter(
        cursor,
        'x',
        'px'
      );

    const ySet =
      gsap.quickSetter(
        cursor,
        'y',
        'px'
      );

    const move = (
      e: PointerEvent
    ) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      currentX +=
        (mouseX - currentX) *
        0.14;

      currentY +=
        (mouseY - currentY) *
        0.14;

      xSet(currentX);
      ySet(currentY);
    };

    window.addEventListener(
      'pointermove',
      move
    );

    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener(
        'pointermove',
        move
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
            {variant ===
            'hero' ? (
              <>
                <span
                  className={
                    styles.labelText
                  }
                >
                  Scroll to
                  <br />
                  Discover
                </span>

                <span
                  className={
                    styles.labelArrow
                  }
                >
                  ↓
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