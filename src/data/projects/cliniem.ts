import { Project } from "@/types/project";

export const cliniem: Project = {
  id: "01",

  slug: "cliniem",

  title: "Cliniem",

  subtitle: "Healthcare Digital Experience",

  projectFocus: "Aesthetic clinic",

  client: "Cliniem",

  year: "2026",

  role: "Digital Experience Designer, Developer & Digital Consultant",

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
    "A complete digital transformation combining UX/UI design, custom web development, interactive experiences and AI-powered automation to improve Cliniem's digital presence and patient communication.",

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
      text: "A complete redesign focused on improving the user experience, restructuring digital content and creating a more refined visual language. The new experience brings clarity, consistency and a stronger digital identity to Cliniem.",
    },

    {
      type: "video",
      src: "/videos/cliniem-preview-web.mp4",
    },
  ],
};