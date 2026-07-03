import { create } from "zustand";

import { TransitionProject } from "@/components/TransitionOverlay/TransitionOverlay.types";

interface TransitionStore {

    project: TransitionProject | null;

    setProject: (
        project: TransitionProject | null
    ) => void;

}

export const useTransitionStore =
    create<TransitionStore>((set) => ({

        project: null,

        setProject: (project) =>
            set({ project }),

    }));