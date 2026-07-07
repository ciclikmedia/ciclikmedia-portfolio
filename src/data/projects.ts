import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "01",

    slug: "cliniem",

    title: "Cliniem",

    subtitle: "Healthcare Digital Experience",

    client: "Cliniem",

    year: "2026",

    role: "Frontend Developer",

    website: "https://cliniem.com",

    services: [
      "Frontend Development",
      "UX/UI Design",
      "Motion",
    ],

    image: "/images/work/cliniem-cover.webp",

    coverImage: "/images/work/cliniem-cover.webp",

    heroImage: "/images/work/cliniem-cover.webp",

    overview:
      "Cliniem is a premium healthcare platform focused on creating a modern digital experience for patients and clinics.",

    challenge:
      "Cliniem needed a complete redesign to elevate its digital presence, improve usability and create a premium experience for patients and clinics.",

    solution:
      "The project focused on a modern interface, refined motion design and a performant frontend architecture built with Next.js and GSAP.",

    technologies: [
      "Next.js",
      "TypeScript",
      "GSAP",
      "SCSS Modules",
      "WordPress",
    ],

    gallery: [
      "/images/work/cliniem-01.webp",
      "/images/work/cliniem-02.webp",
      "/images/work/cliniem-03.webp",
    ],
  },
];