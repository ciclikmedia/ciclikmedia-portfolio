'use client';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';

import {
  useCursorContext,
} from '@/components/ui/Cursor/CursorContext';

export default function CursorLensGlass() {
  const lensRef =
    useRef<HTMLDivElement>(null);

  const { variant } =
    useCursorContext();

  const visible =
    variant === 'hero' ||
    variant === 'view' ||
    variant === 'drag';

  useEffect(() => {
    if (!lensRef.current) return;

    const lens =
      lensRef.current;

    let mouseX =
      window.innerWidth / 2;

    let mouseY =
      window.innerHeight / 2;

    let currentX =
      mouseX;

    let currentY =
      mouseY;

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

      gsap.set(lens, {
        x: currentX,
        y: currentY,
      });
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
      ref={lensRef}
      style={{
        position: 'fixed',

        left: 0,
        top: 0,

        width: visible
          ? '113px'
          : '18px',

        height: visible
          ? '113px'
          : '18px',

        borderRadius: '50%',

        pointerEvents: 'none',

        zIndex: 99998,

        transform:
          'translate(-50%, -50%)',

        opacity:
          visible ? 1 : 0,

        transition: `
          width .35s cubic-bezier(0.22,1,0.36,1),
          height .35s cubic-bezier(0.22,1,0.36,1),
          opacity .25s ease
        `,

        backdropFilter:
          'blur(4px) brightness(1.02) saturate(1.05)',

        WebkitBackdropFilter:
          'blur(4px) brightness(1.02) saturate(1.05)',

        background:
          'rgba(255,255,255,.05)',

        border:
          '1px solid rgba(255,255,255,.05)',

       boxShadow: `
        0 0 12px rgba(255,255,255,.02),
        inset 0 0 8px rgba(255,255,255,.01)
        `,
      }}
    />
  );
}