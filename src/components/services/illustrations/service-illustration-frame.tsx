"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";

import {
  illustrationBlurHidden,
  illustrationBlurShown,
  illustrationEase,
  illustrationViewport,
} from "./illustration-tokens";

type IllustrationState = {
  /** Frame is currently inside the viewport. */
  active: boolean;
  /** User prefers reduced motion. */
  reduce: boolean;
};

const IllustrationStateContext = createContext<IllustrationState>({
  active: false,
  reduce: false,
});

export function useIllustrationState(): IllustrationState {
  return useContext(IllustrationStateContext);
}

/** Pointer tilt is limited to precise pointers so touch scrolling stays untouched. */
function useFinePointer(): boolean {
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const sync = () => setFinePointer(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return finePointer;
}

type ServiceIllustrationFrameProps = {
  /** Concise description of what the illustration shows. */
  label: string;
  children: ReactNode;
  /** Distant scenic backdrop, held far back behind an ivory scrim. */
  background?: string;
  className?: string;
  /** Renders on the dark Applied AI band instead of the light service rows. */
  tone?: "light" | "dark";
};

export function ServiceIllustrationFrame({
  label,
  children,
  background,
  className,
  tone = "light",
}: ServiceIllustrationFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const inView = useInView(frameRef, illustrationViewport);
  const finePointer = useFinePointer();

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 160, damping: 22, mass: 0.4 });
  const springY = useSpring(tiltY, { stiffness: 160, damping: 22, mass: 0.4 });

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!finePointer || reduce) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;
      // Maximum 3px of perspective response — presence, not a 3D toy.
      tiltX.set(offsetY * -3);
      tiltY.set(offsetX * 3);
    },
    [finePointer, reduce, tiltX, tiltY],
  );

  const handlePointerLeave = useCallback(() => {
    tiltX.set(0);
    tiltY.set(0);
  }, [tiltX, tiltY]);

  const isDark = tone === "dark";

  return (
    <div
      ref={frameRef}
      role="img"
      aria-label={label}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "relative aspect-[5/4] overflow-hidden rounded-2xl border md:aspect-[4/3] md:rounded-3xl",
        isDark
          ? "border-white/12 bg-[#1A1715]"
          : "border-[rgba(28,25,23,0.10)] bg-[#F4F3EF]",
        className,
      )}
      style={{ perspective: 1200 }}
    >
      {inView || reduce ? (
        background ? (
          <Image
            src={background}
            alt=""
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            aria-hidden
            className={cn(
              "object-cover object-center",
              isDark ? "opacity-[0.30]" : "opacity-100",
            )}
          />
        ) : null
      ) : null}

      {/* Light scrim only — the painterly scenery stays legible behind the interface. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: isDark
            ? "linear-gradient(165deg, rgba(26,23,21,0.82) 0%, rgba(26,23,21,0.90) 55%, rgba(26,23,21,0.95) 100%)"
            : "linear-gradient(160deg, rgba(247,247,244,0.30) 0%, rgba(247,247,244,0.42) 45%, rgba(244,243,239,0.56) 100%)",
        }}
      />

      {inView || reduce ? (
        <motion.div
          aria-hidden
          className="absolute inset-0 overflow-hidden"
          style={{
            rotateX: reduce || !inView ? 0 : springX,
            rotateY: reduce || !inView ? 0 : springY,
            transformStyle: "preserve-3d",
          }}
          initial={reduce ? false : { ...illustrationBlurHidden, y: 8 }}
          animate={
            inView
              ? { ...illustrationBlurShown, y: 0 }
              : { ...illustrationBlurHidden, y: 8 }
          }
          transition={{ duration: reduce ? 0 : 0.5, ease: illustrationEase }}
        >
          <IllustrationStateContext.Provider value={{ active: inView, reduce }}>
            {children}
          </IllustrationStateContext.Provider>
        </motion.div>
      ) : null}
    </div>
  );
}

/** Consistent inner padding for every illustration composition. */
export function IllustrationStage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden p-4 lg:p-7", className)}>{children}</div>
  );
}
