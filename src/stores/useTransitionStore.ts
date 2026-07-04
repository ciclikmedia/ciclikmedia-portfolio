import { create } from "zustand";

import { TransitionProject } from "@/components/TransitionOverlay/TransitionOverlay.types";

interface TransitionStore {

    project: TransitionProject | null;

    overlayVisible: boolean;

    setProject: (
        project: TransitionProject | null
    ) => void;

    setOverlayVisible: (
        visible: boolean
    ) => void;

}

export const useTransitionStore =
    create<TransitionStore>((set) => ({

        project: null,

        overlayVisible: false,

        setProject: (project) =>
            set({ project }),

        setOverlayVisible: (overlayVisible) =>
            set({ overlayVisible }),

    }));