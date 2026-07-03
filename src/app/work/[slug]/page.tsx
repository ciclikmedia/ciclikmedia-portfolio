import { notFound } from "next/navigation";

import { projects } from "@/data/projects";

import ProjectHero from "@/sections/ProjectHero/ProjectHero";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({
  params,
}: Props) {

  const { slug } = await params;

  const project = projects.find(
    (project) => project.slug === slug
  );

  if (!project) {
    notFound();
  }

  return (
    <ProjectHero
      project={project}
    />
  );
}