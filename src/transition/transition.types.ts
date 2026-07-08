export interface TransitionProject {
  title: string;
  image: string;
  href: string;
}

export interface TransitionPayload {
  rect: DOMRect;
  element: HTMLElement;
  project: TransitionProject;
}

export interface TransitionAPI {
  start(payload: TransitionPayload): Promise<void>;
  finish(): void;
}