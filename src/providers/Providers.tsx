'use client';

import { ReactNode } from 'react';

import ScrollManager from './ScrollManager';
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

      <ScrollManager />

      <SmoothScrolling>

        {children}

      </SmoothScrolling>

    </CursorProvider>
  );
}