'use client';

import { ReactNode, useEffect, useRef } from 'react';

import { fadeUp } from '@/animations/fadeUp';

type RevealProps = {
  children: ReactNode;
};

export default function Reveal({
  children,
}: RevealProps) {
  const element = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!element.current) return;

    fadeUp(element.current);
  }, []);

  return (
    <div ref={element}>
      {children}
    </div>
  );
}