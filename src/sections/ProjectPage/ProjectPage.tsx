import ProjectHero from "@/sections/ProjectHero/ProjectHero";
import CliniemProject from "@/components/project/pages/CliniemProject/CliniemProject";

import { Project } from "@/types/project";

interface Props {
  project: Project;
}

export default function ProjectPage({
  project,
}: Props) {
  return (
    <main>

      <ProjectHero project={project} />

      

        <CliniemProject project={project} />

      

    </main>
  );
}