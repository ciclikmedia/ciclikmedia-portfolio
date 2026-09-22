import ProjectSection from "@/components/project/ProjectSection/ProjectSection";
import ProjectOverview from "@/components/project/ProjectOverview/ProjectOverview";
import ProjectChapter from "@/components/project/ProjectChapter/ProjectChapter";
import ProjectText from "@/components/project/ProjectText/ProjectText";
import ProjectVideo from "@/components/project/ProjectVideo/ProjectVideo";

import styles from "./CliniemProject.module.scss";

import { Project } from "@/types/project";

interface Props {
  project: Project;
}

export default function CliniemProject({
  project,
}: Props) {
  return (
    <>
      {project.modules.map((module, index) => {

        // 01 — Overview
        if (module.type === "overview") {
          return (
            <ProjectSection key={index} firstPadding>

              <ProjectChapter
                number="01"
                title="Overview"
              />

              <ProjectOverview
                overview={project.overview}
                client={project.client}
                year={project.year}
                role={project.role}
                services={project.services}
              />

            </ProjectSection>
          );
        }


        // Text + Video
        if (module.type === "text") {

          const nextModule = project.modules[index + 1];

          return (
            <ProjectSection key={index} variant="light">

              <div className={styles.redesignGrid}>

                {/* TEXTO */}

                <div className={styles.redesignText}>

                  <ProjectChapter
                    number={module.number}
                    title={module.title}
                  />

                  <ProjectText>

                    <p>
                      {module.text}
                    </p>

                  </ProjectText>

                </div>


                {/* VIDEO */}

                {nextModule?.type === "video" && (

                  <div className={styles.redesignVideo}>

                    <ProjectVideo
                      src={nextModule.src}
                      poster={nextModule.poster}
                    />

                  </div>

                )}

              </div>

            </ProjectSection>
          );
        }


        // El vídeo ya se ha utilizado
        // junto al módulo text anterior.
        if (module.type === "video") {
          return null;
        }


        return null;
      })}
    </>
  );
}