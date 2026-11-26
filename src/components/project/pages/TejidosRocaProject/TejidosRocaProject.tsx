"use client";

import ProjectSection from "@/components/project/ProjectSection/ProjectSection";
import ProjectOverview from "@/components/project/ProjectOverview/ProjectOverview";
import ProjectChapter from "@/components/project/ProjectChapter/ProjectChapter";
import ProjectText from "@/components/project/ProjectText/ProjectText";
import ProjectVideo from "@/components/project/ProjectVideo/ProjectVideo";

import BodyThemeObserver from "@/components/project/BodyThemeObserver/BodyThemeObserver";
import styles from "./TejidosRocaProject.module.scss";
import caseStudyStyles from "@/components/project/ProjectCaseStudy/ProjectCaseStudy.module.scss";

import { Project } from "@/types/project";

interface Props {
  project: Project;
}

export default function TejidosRocaProject({ project }: Props) {
  return (
    <>
      <BodyThemeObserver />

      <div>
        {/* TEJIDOS ROCA PROJECT */}

        <ProjectSection bodyTheme="beige">
          <ProjectChapter number="01" title="Overview" />

          <ProjectOverview
            overview={project.overview}
            client={project.client}
            year={project.year}
            role={project.role}
            services={project.services}
          />
        </ProjectSection>
      </div>
    </>
  );
}