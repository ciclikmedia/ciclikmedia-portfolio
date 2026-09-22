import { Project } from "@/types/project";

export const cliniem: Project = {
  id: "01",

  slug: "cliniem",

  title: "Cliniem",

  subtitle: "Healthcare Digital Experience",

  client: "Cliniem",

  year: "2026",

  role: "Frontend Developer",

  website: "https://cliniem.com",

  services: [
    "UX/UI Design",
    "Frontend Development",
    "Motion",
    "AI & Automation",
  ],

  image: "/images/work/cliniem-cover.webp",

  coverImage: "/images/work/cliniem-cover.webp",

  heroImage: "/images/work/cliniem-cover.webp",

  overview:
    "I redesigned and developed Cliniem's digital experience, combining UX/UI design, frontend development, motion and digital strategy to create a clearer, more engaging experience for patients and the clinic.",

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

  modules: [
    {
      type: "overview",
    },

    {
      type: "text",
      number: "02",
      title: "Redesign",
      text: "Cliniem's digital experience was redesigned from the ground up to create a clearer, more premium and more intuitive experience for both patients and the clinic.",
    },

    {
      type: "video",
      src: "/videos/cliniem-preview-web.mp4",
    },
  ],
};