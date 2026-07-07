import { create } from "zustand";

import { TransitionProject } from "@/components/TransitionOverlay/TransitionOverlay.types";

interface TransitionStore {

    project: TransitionProject | null;

    overlayVisible: boolean;

    heroReady: boolean;

    heroBounds: DOMRect | null;

    setProject: (
        project: TransitionProject | null
    ) => void;

    setOverlayVisible: (
        visible: boolean
    ) => void;

    setHeroReady: (
        ready: boolean
    ) => void;

    setHeroBounds: (
        bounds: DOMRect | null
    ) => void;

    reset: () => void;

}

export const useTransitionStore =
create<TransitionStore>((set) => ({

    project: null,

    overlayVisible: false,

    heroReady: false,

    heroBounds: null,

    setProject: (project) =>
        set({ project }),

    setOverlayVisible: (overlayVisible) =>
        set({ overlayVisible }),

    setHeroReady: (heroReady) =>
        set({ heroReady }),

    setHeroBounds: (heroBounds) =>
        set({ heroBounds }),

    reset: () =>
        set({

            project: null,

            overlayVisible: false,

            heroReady: false,

            heroBounds: null,

        }),

}));