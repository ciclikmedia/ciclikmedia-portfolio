'use client';

import { ReactNode } from 'react';

import SmoothScrolling from './SmoothScrolling';

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({
  children,
}: ProvidersProps) {
  return (
    <SmoothScrolling>
      {children}
    </SmoothScrolling>
  );
}