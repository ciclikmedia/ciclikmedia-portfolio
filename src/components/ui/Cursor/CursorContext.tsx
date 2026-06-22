'use client';

import {
  createContext,
  useContext,
  useState,
} from 'react';

type CursorVariant =
  | 'default'
  | 'link'
  | 'nav'
  | 'button'
  | 'view'
  | 'hero'
  | 'footer'
  | 'drag'
  | 'dragActive';

interface CursorContextType {
  variant: CursorVariant;

  label: string;

  setVariant: (
    variant: CursorVariant
  ) => void;

  setLabel: (
    label: string
  ) => void;
}

const CursorContext =
  createContext<CursorContextType | null>(
    null
  );

export function CursorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [variant, setVariant] =
    useState<CursorVariant>('default');

  const [label, setLabel] =
  useState('');

  return (
    <CursorContext.Provider
      value={{
        variant,
        label,

        setVariant,
        setLabel,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursorContext() {
  const context =
    useContext(CursorContext);

  if (!context) {
    throw new Error(
      'CursorProvider missing'
    );
  }

  return context;
}