"use client";

import { useEffect } from "react";

export default function BodyThemeObserver() {
  useEffect(() => {
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

      const theme = activeSection.getAttribute("data-body-theme");

      if (!theme) return;

      Array.from(document.body.classList).forEach((className) => {
        if (className.startsWith("bg-")) {
          document.body.classList.remove(className);
        }
      });

      document.body.classList.add(`bg-${theme}`);
    };

    updateBodyTheme();

    window.addEventListener("scroll", updateBodyTheme, { passive: true });
    window.addEventListener("resize", updateBodyTheme);

    return () => {
      window.removeEventListener("scroll", updateBodyTheme);
      window.removeEventListener("resize", updateBodyTheme);
    };
  }, []);

  return null;
}