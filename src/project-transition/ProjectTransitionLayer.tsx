"use client";

import styles from "./ProjectTransitionLayer.module.scss";

interface ProjectTransitionLayerProps {
  color?: string;
  layerRef?: React.Ref<HTMLDivElement>;
}

export default function ProjectTransitionLayer({
  color = "#050505",
  layerRef,
}: ProjectTransitionLayerProps) {
  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className={styles.layer}
      style={{
        "--transition-color": color,
      } as React.CSSProperties}
    />
  );
}