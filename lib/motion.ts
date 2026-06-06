import type { Transition, Variants } from "framer-motion";

export const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const transitions = {
  base: { duration: 0.35, ease: EASE_OUT_EXPO } satisfies Transition,
  fast: { duration: 0.22, ease: EASE_OUT_EXPO } satisfies Transition,
  slow: { duration: 0.55, ease: EASE_OUT_EXPO } satisfies Transition,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.base },
};
