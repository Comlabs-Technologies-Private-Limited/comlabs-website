export const EASE_GENTLE = [0.33, 0, 0.2, 1] as const;
export const EASE_WARM = [0.25, 0.1, 0.25, 1] as const;

/** @deprecated Use EASE_GENTLE */
export const EASE_OUT = EASE_GENTLE;

export const VIEWPORT = {
  once: true,
  margin: "-8% 0px -6% 0px",
} as const;

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.14,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_GENTLE },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_GENTLE },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: EASE_WARM },
  },
};
