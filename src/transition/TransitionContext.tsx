import { createContext } from "react";

import type { TransitionAPI } from "./transition.types";

export const TransitionContext =
  createContext<TransitionAPI | null>(null);