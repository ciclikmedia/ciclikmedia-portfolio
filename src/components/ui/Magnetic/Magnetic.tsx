'use client';

import {
  useRef,
  ReactNode,
} from 'react';

import gsap from 'gsap';

type MagneticProps = {
  children: ReactNode;
};

export default function Magnetic({
  children,
}: MagneticProps) {
  const ref =
    useRef<HTMLDivElement>(null);

  const handleMove = (
    e: React.MouseEvent
  ) => {
    if (!ref.current) return;

    const rect =
      ref.current.getBoundingClientRect();

    const x =
      e.clientX -
      rect.left -
      rect.width / 2;

    const y =
      e.clientY -
      rect.top -
      rect.height / 2;

    gsap.to(ref.current, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const handleLeave = () => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1,0.4)',
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={
        handleMove
      }
      onMouseLeave={
        handleLeave
      }
      style={{
        display: 'inline-block',
      }}
    >
      {children}
    </div>
  );
}