import { Project } from "@/types/project";
import { cliniem } from "./cliniem";

export const projects: Project[] = [
  cliniem,
  {
    ...cliniem,
    slug: "cliniem-test",
  },
];