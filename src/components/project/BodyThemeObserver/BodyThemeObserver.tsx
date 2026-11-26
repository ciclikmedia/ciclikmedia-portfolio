"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BodyThemeObserver() {
  const pathname = usePathname();

  useEffect(() => {
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

      clearBodyTheme();

      const theme = activeSection.dataset.bodyTheme;
      if (theme) {
        document.body.classList.add(`bg-${theme}`);
      }
    };

    clearBodyTheme();
    const frame = requestAnimationFrame(updateBodyTheme);

    window.addEventListener("scroll", updateBodyTheme, { passive: true });
    window.addEventListener("resize", updateBodyTheme);
    window.addEventListener("body:refresh-theme", updateBodyTheme);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateBodyTheme);
      window.removeEventListener("resize", updateBodyTheme);
      window.removeEventListener("body:refresh-theme", updateBodyTheme);
      clearBodyTheme();
    };
  }, [pathname]);

  return null;
}
