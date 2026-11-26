"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export default function BodyThemeObserver() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const clearBodyTheme = () => {
      document.body.classList.forEach((className) => {
        if (className.startsWith("bg-")) {
          document.body.classList.remove(className);
        }
      });
    };

    const updateBodyTheme = () => {
      const center = window.innerHeight / 2;

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-body-theme]")
      );

      const activeSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= center && rect.bottom > center;
      });

      if (!activeSection) return;

      const theme = activeSection.dataset.bodyTheme;
      if (!theme) return;

      const nextClass = `bg-${theme}`;
      if (document.body.classList.contains(nextClass)) return;

      clearBodyTheme();
      document.body.classList.add(nextClass);
      window.dispatchEvent(new Event("body:theme-ready"));
    };

    clearBodyTheme();
    updateBodyTheme();

    window.addEventListener("scroll", updateBodyTheme, { passive: true });
    window.addEventListener("resize", updateBodyTheme);
    window.addEventListener("body:refresh-theme", updateBodyTheme);

    return () => {
      window.removeEventListener("scroll", updateBodyTheme);
      window.removeEventListener("resize", updateBodyTheme);
      window.removeEventListener("body:refresh-theme", updateBodyTheme);
      clearBodyTheme();
    };
  }, [pathname]);

  return null;
}
