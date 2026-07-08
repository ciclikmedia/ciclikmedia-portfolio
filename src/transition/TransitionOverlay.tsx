"use client";

import { forwardRef } from "react";

const TransitionOverlay = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      id="transition-overlay"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 99999,
        overflow: "hidden",
      }}
    />
  );
});

TransitionOverlay.displayName = "TransitionOverlay";

export default TransitionOverlay;