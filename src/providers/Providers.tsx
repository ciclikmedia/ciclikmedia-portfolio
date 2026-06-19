'use client';

import { ReactNode } from 'react';

import SmoothScrolling from './SmoothScrolling';

import { CursorProvider } from '@/components/ui/Cursor/CursorContext';

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({
  children,
}: ProvidersProps) {
  return (
    <CursorProvider>
      <SmoothScrolling>
        {children}
      </SmoothScrolling>
    </CursorProvider>
  );
}