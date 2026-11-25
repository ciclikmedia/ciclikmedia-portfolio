export type ProjectModule =
  | {
      type: "overview";
    }
  | {
      type: "text";
      number: string;
      title: string;
      text: string;
    }
  | {
      type: "video";
      src: string;
      poster?: string;
    }
  | {
      type: "textVideo";
      number: string;
      title: string;
      text: string;
      src: string;
      poster?: string;
  }
  | {
      type: "image";
      src: string;
      alt: string;
    };

export interface Project {
  id: string;

  slug: string;

  title: string;

  subtitle: string;

  projectFocus: string;

  client: string;

  year: string;

  role: string;

  website: string;

  services: string[];

  image: string;

  coverImage: string;

  heroImage: string;

  overview: string;

  technologies: string[];

  gallery: string[];

  modules: ProjectModule[];
}