"use client";

import { useContext } from "react";

import { TransitionContext } from "./TransitionContext";

export function useTransition() {

    const context =
        useContext(TransitionContext);

    if (!context) {

        throw new Error(
            "useTransition must be used inside TransitionProvider"
        );

    }

    return context;

}