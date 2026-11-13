import ProjectHero from "@/sections/ProjectHero/ProjectHero";
import CliniemProject from "@/components/project/pages/CliniemProject/CliniemProject";

import styles from "@/components/project/pages/CliniemProject/CliniemProject.module.scss";

import { Project } from "@/types/project";

interface Props {
  project: Project;
}

export default function ProjectPage({ project }: Props) {
  return (
    <main>
      <div className={styles.project}>
        <ProjectHero project={project} />
        <CliniemProject project={project} />
      </div>
    </main>
  );
}