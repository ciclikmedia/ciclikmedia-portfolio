'use client';

import { useRef } from "react";

import Container from "@/components/layout/Container/Container";

import ProjectPreview from "@/components/ProjectPreview/ProjectPreview";
import ProjectRow from "@/components/ProjectRow/ProjectRow";

import {
  PreviewHandle,
} from "@/components/ProjectPreview/ProjectPreview.types";

import { projects } from "./data";

import styles from "./WorkArchive.module.scss";

export default function WorkArchive() {
  const previewRef = useRef<PreviewHandle>(null);

  return (
    <section className={styles.archive}>

      <ProjectPreview ref={previewRef} />

      <Container>

        <div className={styles.content}>

          {projects.map((project) => (
            <ProjectRow
                key={project.id}
                id={project.id}
                title={project.title}
                services={project.services}
                onEnter={() => {
                    previewRef.current?.show({
                    title: project.title,
                    image: project.image,
                    slug: project.slug,
                    });
                }}
                onLeave={() => {
                    previewRef.current?.hide();
                }}
                onMove={(x, y) => {
                    previewRef.current?.move(x, y);
                }}
            />
          ))}

        </div>

      </Container>

    </section>
  );
}