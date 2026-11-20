"use client";

import { useEffect } from "react";

export default function BodyThemeObserver() {
  useEffect(() => {
    const sections = document.querySelectorAll("[data-body-theme]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const theme = entry.target.getAttribute("data-body-theme");

          document.body.classList.toggle("bg-beige", theme === "beige");
        });
      },
      {
        threshold: 0.1,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      document.body.classList.remove("bg-beige");
    };
  }, []);

  return null;
}