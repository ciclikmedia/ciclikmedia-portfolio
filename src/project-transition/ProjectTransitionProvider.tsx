"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useRef,
} from "react";

import ProjectTransitionController, {
  ProjectTransitionControllerHandle,
} from "./ProjectTransitionController";

interface ProjectTransitionContextType {
  navigateTo: (path: string) => void;
  demoTransition: () => void;
}

const ProjectTransitionContext = createContext<
  ProjectTransitionContextType | null
>(null);

interface Props {
  children: ReactNode;
}

export default function ProjectTransitionProvider({ children }: Props) {
  const transitionRef = useRef<ProjectTransitionControllerHandle>(null);

  const navigateTo = (path: string) => {
    transitionRef.current?.navigateTo(path);
  };

  const demoTransition = () => {
    transitionRef.current?.demoTransition();
  };

  return (
    <ProjectTransitionContext.Provider
      value={{
        navigateTo,
        demoTransition,
      }}
    >
      {children}

      <ProjectTransitionController ref={transitionRef} />
    </ProjectTransitionContext.Provider>
  );
}

export function useProjectTransition() {
  const context = useContext(ProjectTransitionContext);

  if (!context) {
    throw new Error(
      "useProjectTransition must be used within ProjectTransitionProvider"
    );
  }

  return context;
}