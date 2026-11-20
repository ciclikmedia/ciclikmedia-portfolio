import { notFound } from "next/navigation";

import { projects } from "@/data/projects/index";
import ProjectPage from "@/sections/ProjectPage/ProjectPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectRoute({ params }: Props) {
  const { slug } = await params;

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectPage project={project} />;
}