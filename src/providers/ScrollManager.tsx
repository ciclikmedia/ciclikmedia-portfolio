'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    history.scrollRestoration = 'manual';

    window.dispatchEvent(new Event('lenis:scrollToTop'));
  }, [pathname]);

  return null;
}