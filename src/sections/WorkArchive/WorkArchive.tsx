'use client';

import { useRef } from "react";

import { useRouter } from "next/navigation";

import Container from "@/components/layout/Container/Container";

import ProjectPreview from "@/components/ProjectPreview/ProjectPreview";
import ProjectRow from "@/components/ProjectRow/ProjectRow";

import { useTransition } from "@/transition";

import {
  PreviewHandle,
} from "@/components/ProjectPreview/ProjectPreview.types";

import { projects } from "./data";

import styles from "./WorkArchive.module.scss";

export default function WorkArchive() {

  const previewRef = useRef<PreviewHandle>(null);

  const router = useRouter();

  const transition = useTransition();

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
                  onClick={async () => {

                    const preview =
                        previewRef.current;

                    if (!preview) return;

                    const rect =
                        preview.getBounds();

                    const element =
                        preview.getElement();

                    if (!rect || !element) {

                        router.push(`/work/${project.slug}`);

                        return;

                    }

                    const image =
                        element.querySelector("img");
                        

                    if (!(image instanceof HTMLImageElement)) {

                        router.push(`/work/${project.slug}`);

                        return;

                    }

                    await transition.start({
                        rect,
                        element,
                        project: {
                            title: project.title,
                            image: project.image,
                            href: `/work/${project.slug}`,
                        },
                    });

                    router.push(`/work/${project.slug}`);

                }}
              />
          ))}

        </div>

      </Container>

    </section>
  );
}