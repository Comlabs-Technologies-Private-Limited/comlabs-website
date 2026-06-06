/**
 * Shared product-motion tokens — purposeful, GPU-friendly, reduced-motion aware.
 * Used by services mockups and designs showcase cards.
 */

export const easeOut = [0.22, 1, 0.36, 1] as const;
export const easeInOut = [0.45, 0, 0.55, 1] as const;

type TweenTransition = {
  type: "tween";
  duration: number;
  ease: typeof easeOut | typeof easeInOut;
};

export type MotionTokens = {
  enter: TweenTransition;
  loop: TweenTransition;
  shared: { type: "spring"; bounce: number; duration: number };
  fade: TweenTransition;
  feedback: TweenTransition;
  expand: TweenTransition;
};

const offTween = { type: "tween" as const, duration: 0, ease: easeOut };
const offSpring = { type: "spring" as const, bounce: 0, duration: 0 };

/** Frequency-aware: loops short, entrances longer; instant when reduced motion */
export function motionFor(reduce: boolean): MotionTokens {
  if (reduce) {
    return {
      enter: offTween,
      loop: offTween,
      shared: offSpring,
      fade: offTween,
      feedback: offTween,
      expand: offTween,
    };
  }
  return {
    enter: { type: "tween", duration: 0.52, ease: easeOut },
    loop: { type: "tween", duration: 0.2, ease: easeOut },
    shared: { type: "spring", bounce: 0.08, duration: 0.48 },
    fade: { type: "tween", duration: 0.26, ease: easeOut },
    feedback: { type: "tween", duration: 0.22, ease: easeOut },
    expand: { type: "tween", duration: 0.38, ease: easeInOut },
  };
}

export const GPU = "will-change-[transform,opacity]" as const;

/** Anticipation: content enters from slight opposite offset */
export function fadeAnticipate(reduce: boolean, direction = 1) {
  return {
    initial: reduce ? false : ({ opacity: 0, y: direction * 3 } as const),
    animate: { opacity: 1, y: 0 },
    exit: reduce ? undefined : { opacity: 0, y: direction * -2 },
  };
}

/** Subtle squash before settle (feedback / press) */
export const squashPress = { scaleX: 0.97, scaleY: 0.96 } as const;
export const squashRelease = { scaleX: 1, scaleY: 1 } as const;
