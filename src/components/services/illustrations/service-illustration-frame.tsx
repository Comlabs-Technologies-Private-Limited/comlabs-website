"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";

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
  /** Optional padding override for IllustrationStage (e.g. tighter homepage cards). */
  stageClassName?: string;
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
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Padding classes applied to IllustrationStage inside this frame. */
  stageClassName?: string;
  /** Renders on the dark Applied AI band instead of the light service rows. */
  tone?: "light" | "dark";
  /** When false, only the illustration renders — no card, backdrop, or scrim. */
  chrome?: boolean;
};

export function ServiceIllustrationFrame({
  label,
  children,
  background,
  priority = false,
  className,
  style,
  stageClassName,
  tone = "light",
  chrome = true,
}: ServiceIllustrationFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const inView = useInView(frameRef, illustrationViewport);
  const finePointer = useFinePointer();
  const [hovered, setHovered] = useState(false);
  const activate = useCallback(() => setHovered(true), []);
  const deactivate = useCallback(() => setHovered(false), []);
  // Touch and keyboard users get the same finite story on viewport entry/focus.
  const sequenceActive = inView && (!finePointer || hovered);

  const isDark = tone === "dark";

  return (
    <div
      ref={frameRef}
      role="img"
      aria-label={label}
      onPointerEnter={activate}
      onPointerLeave={deactivate}
      onFocusCapture={activate}
      onBlurCapture={deactivate}
      className={cn(
        "relative aspect-[5/4] overflow-hidden md:aspect-[4/3]",
        chrome && "rounded-2xl border md:rounded-3xl",
        chrome &&
          (isDark
            ? "border-white/12 bg-[#1A1715]"
            : "border-[rgba(28,25,23,0.10)] bg-[#F4F3EF]"),
        className,
      )}
      style={style}
    >
      {chrome && background ? (
        <Image
          src={background}
          alt=""
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(max-width: 1023px) 100vw, 50vw"
          aria-hidden
          className={cn(
            "object-cover object-center",
            isDark ? "opacity-[0.30]" : "opacity-100",
          )}
        />
      ) : null}

      {chrome ? (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: isDark
              ? "linear-gradient(165deg, rgba(26,23,21,0.82) 0%, rgba(26,23,21,0.90) 55%, rgba(26,23,21,0.95) 100%)"
              : "linear-gradient(160deg, rgba(247,247,244,0.30) 0%, rgba(247,247,244,0.42) 45%, rgba(244,243,239,0.56) 100%)",
          }}
        />
      ) : null}

      <motion.div
        aria-hidden
        className="absolute inset-0 overflow-hidden"
        initial={reduce ? false : { ...illustrationBlurHidden, y: 8 }}
        animate={
          inView
            ? { ...illustrationBlurShown, y: 0 }
            : { ...illustrationBlurHidden, y: 8 }
        }
        transition={{ duration: reduce ? 0 : 0.5, ease: illustrationEase }}
      >
        <IllustrationStateContext.Provider value={{ active: sequenceActive, reduce, stageClassName }}>
          {children}
        </IllustrationStateContext.Provider>
      </motion.div>
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
  const { stageClassName } = useIllustrationState();

  return (
    <div className={cn("absolute inset-0 overflow-hidden p-4 lg:p-7", stageClassName, className)}>
      {children}
    </div>
  );
}
