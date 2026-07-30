"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";

import { SectionHeader } from "@/components/home/section-header";
import { SectionContainer } from "@/components/layout/section-container";
import { easeOut, GPU, motionFor } from "@/lib/product-motion";
import { cn } from "@/lib/utils";

const VISUAL_VIEWPORT = { once: true, amount: 0.18 } as const;

const GRAIN_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`;

const annotations = [
  {
    id: "01",
    title: "Visitors cannot place you fast enough",
    body: "If the hero does not explain the offer in seconds, people leave before they ever evaluate the product.",
    markerTop: "18%",
    markerLeft: "28%",
  },
  {
    id: "02",
    title: "The business feels less mature than it is",
    body: "Weak hierarchy, thin proof, and generic visuals make strong teams look early or unproven.",
    markerTop: "50%",
    markerLeft: "62%",
  },
  {
    id: "03",
    title: "Intent dies before it becomes a lead",
    body: "When CTAs, forms, and follow-up paths are unclear, attention never turns into booked conversations.",
    markerTop: "76%",
    markerLeft: "34%",
  },
] as const;

type AnnotationPhase = "hidden" | "enter" | "title" | "body" | "done";
type MarkerPhase = "hidden" | "scanning" | "done";

const MARKER_LEAD_MS = 520;
const BETWEEN_STEPS_MS = 480;

function TypingCaret({ visible, reduce }: { visible: boolean; reduce?: boolean }) {
  if (!visible) return null;

  return (
    <motion.span
      className={cn("ml-px inline-block h-3 w-px align-middle bg-zinc-400", GPU)}
      animate={reduce ? { opacity: 1 } : { opacity: [1, 0.2, 1] }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.85, repeat: Infinity, ease: "easeInOut" }
      }
      aria-hidden
    />
  );
}

function useAnnotationSequence(active: boolean, reduce: boolean) {
  const [phases, setPhases] = useState<AnnotationPhase[]>(() =>
    annotations.map(() => "hidden" as AnnotationPhase),
  );
  const [markerPhases, setMarkerPhases] = useState<MarkerPhase[]>(() =>
    annotations.map(() => "hidden" as MarkerPhase),
  );
  const [titleTexts, setTitleTexts] = useState<string[]>(() => annotations.map(() => ""));
  const [bodyTexts, setBodyTexts] = useState<string[]>(() => annotations.map(() => ""));
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!active) {
      setPhases(annotations.map(() => "hidden"));
      setMarkerPhases(annotations.map(() => "hidden"));
      setTitleTexts(annotations.map(() => ""));
      setBodyTexts(annotations.map(() => ""));
      setActiveIndex(-1);
      return;
    }

    if (reduce) {
      setPhases(annotations.map(() => "done"));
      setMarkerPhases(annotations.map(() => "done"));
      setTitleTexts(annotations.map((item) => item.title));
      setBodyTexts(annotations.map((item) => item.body));
      setActiveIndex(-1);
      return;
    }

    setPhases(annotations.map(() => "hidden"));
    setMarkerPhases(annotations.map(() => "hidden"));
    setTitleTexts(annotations.map(() => ""));
    setBodyTexts(annotations.map(() => ""));
    setActiveIndex(-1);

    let cancelled = false;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const intervals = new Set<ReturnType<typeof setInterval>>();

    const later = (fn: () => void, ms: number) => {
      timers.add(setTimeout(() => {
        if (!cancelled) fn();
      }, ms));
    };

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        later(resolve, ms);
      });

    const typeText = (
      text: string,
      setter: (value: string) => void,
      intervalMs: number,
    ) =>
      new Promise<void>((resolve) => {
        let index = 0;
        const id = setInterval(() => {
          if (cancelled) return;
          index += 1;
          setter(text.slice(0, index));
          if (index >= text.length) {
            clearInterval(id);
            intervals.delete(id);
            resolve();
          }
        }, intervalMs);
        intervals.add(id);
      });

    const runStep = async (index: number) => {
      if (cancelled || index >= annotations.length) return;

      setMarkerPhases((prev) => {
        const next = [...prev];
        next[index] = "scanning";
        return next;
      });

      await wait(MARKER_LEAD_MS);

      if (cancelled) return;

      setActiveIndex(index);
      setPhases((prev) => {
        const next = [...prev];
        next[index] = "enter";
        return next;
      });

      await wait(380);

      setPhases((prev) => {
        const next = [...prev];
        next[index] = "title";
        return next;
      });

      await typeText(
        annotations[index].title,
        (value) => {
          setTitleTexts((prev) => {
            const next = [...prev];
            next[index] = value;
            return next;
          });
        },
        18,
      );

      await wait(220);

      setPhases((prev) => {
        const next = [...prev];
        next[index] = "body";
        return next;
      });

      await typeText(
        annotations[index].body,
        (value) => {
          setBodyTexts((prev) => {
            const next = [...prev];
            next[index] = value;
            return next;
          });
        },
        12,
      );

      setPhases((prev) => {
        const next = [...prev];
        next[index] = "done";
        return next;
      });

      setMarkerPhases((prev) => {
        const next = [...prev];
        next[index] = "done";
        return next;
      });

      setActiveIndex(-1);

      await wait(BETWEEN_STEPS_MS);
      await runStep(index + 1);
    };

    later(() => {
      void runStep(0);
    }, 420);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [active, reduce]);

  return { phases, markerPhases, titleTexts, bodyTexts, activeIndex };
}

function useTeardownLayout(containerRef: RefObject<HTMLDivElement | null>) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [isCompact, setIsCompact] = useState(false);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const update = () => {
      const isLarge = window.matchMedia("(min-width: 1024px)").matches;
      setIsCompact(!isLarge);

      if (isLarge) {
        setHeight(undefined);
        return;
      }

      setHeight(inner.offsetHeight);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(container);
    ro.observe(inner);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [containerRef]);

  return { innerRef, isCompact, height };
}

function DiagnosticMarker({
  id,
  top,
  left,
  markerPhase,
  reduceMotion,
}: {
  id: string;
  top: string;
  left: string;
  markerPhase: MarkerPhase;
  reduceMotion: boolean;
}) {
  const visible = markerPhase !== "hidden";
  const scanning = markerPhase === "scanning";
  const done = markerPhase === "done";
  const t = motionFor(reduceMotion);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key={id}
          className={cn(
            "absolute z-20 flex items-center gap-1 max-md:gap-0.5 md:gap-1.5",
            GPU,
          )}
          style={{ top, left }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{
            opacity: scanning && !reduceMotion ? [0.55, 1, 0.55] : 1,
            scale: 1,
          }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
          transition={{
            opacity: scanning && !reduceMotion
              ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
              : t.feedback,
            default: t.feedback,
          }}
        >
          <span
            className={cn(
              "flex shrink-0 items-center justify-center rounded-full border text-[8px] font-medium tabular-nums tracking-tight md:size-5 md:text-[9px]",
              "size-4",
              scanning
                ? "border-amber-300 bg-amber-100 text-amber-900"
                : done
                  ? "border-zinc-200 bg-zinc-100 text-zinc-600"
                  : "border-amber-200/90 bg-amber-50 text-amber-800",
            )}
          >
            {done ? (
              <svg width="8" height="8" viewBox="0 0 10 10" aria-hidden>
                <path
                  d="M2 5.2 4.1 7.3 8.2 2.8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              id
            )}
          </span>
          <span className="relative flex size-2 shrink-0 items-center justify-center md:size-2.5">
            <motion.span
              className={cn("absolute inset-0 rounded-full bg-amber-500/25", GPU)}
              animate={
                scanning && !reduceMotion
                  ? { opacity: [0.35, 0.12, 0.35] }
                  : { opacity: done ? 0.12 : 0.2 }
              }
              transition={{
                duration: 1.5,
                repeat: scanning && !reduceMotion ? Infinity : 0,
                ease: "easeInOut",
              }}
              aria-hidden
            />
            <span
              className={cn(
                "size-1 rounded-full ring-2 md:size-1.5",
                scanning
                  ? "bg-amber-600 ring-amber-500/40"
                  : done
                    ? "bg-zinc-400 ring-zinc-300/40"
                    : "bg-amber-600/80 ring-amber-500/20",
              )}
              aria-hidden
            />
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function AnnotationCard({
  id,
  title,
  body,
  titleText,
  bodyText,
  phase,
  isActive,
  connector = "none",
  connectorLg,
  className,
  reduceMotion,
}: {
  id: string;
  title: string;
  body: string;
  titleText: string;
  bodyText: string;
  phase: AnnotationPhase;
  isActive: boolean;
  connector?: "right" | "left" | "right-down" | "none";
  connectorLg?: "right" | "left" | "right-down" | "none";
  className?: string;
  reduceMotion: boolean;
}) {
  const isVisible = phase !== "hidden";
  const isDone = phase === "done";
  const isTypingTitle = phase === "title";
  const isTypingBody = phase === "body";
  const titleComplete = titleText.length >= title.length;
  const bodyComplete = bodyText.length >= body.length;
  const t = motionFor(reduceMotion);

  return (
    <motion.article
      className={cn(
        "relative overflow-hidden rounded-2xl border p-3 max-md:rounded-xl max-md:p-2.5 md:p-3.5 lg:p-4",
        GPU,
        "border-white/55 bg-white/45 backdrop-blur-xl backdrop-saturate-150",
        "shadow-[0_8px_32px_-12px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.85)]",
        isActive &&
        "border-amber-200/50 bg-white/55 ring-1 ring-amber-300/25 shadow-[0_16px_48px_-14px_rgba(251,191,36,0.22),inset_0_1px_0_rgba(255,255,255,0.95)]",
        isDone &&
        !isActive &&
        "border-white/60 bg-white/50 shadow-[0_10px_36px_-14px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]",
        !isActive && !isDone && isVisible && "border-white/50",
        className,
      )}
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : reduceMotion ? 0 : 4,
        scale: isVisible ? 1 : reduceMotion ? 1 : 0.98,
      }}
      transition={t.enter}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/95 to-transparent"
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-8 -top-8 size-24 rounded-full blur-2xl transition-opacity duration-500",
          isActive ? "bg-amber-200/35 opacity-100" : "opacity-0",
        )}
      />

      {(["mobile", "desktop"] as const).map((variant) => {
        const type = variant === "mobile" ? connector : (connectorLg ?? connector);
        if (type === "none") return null;

        const lineWidth =
          variant === "desktop" ? (type === "right-down" ? 52 : 44) : type === "right-down" ? 40 : 32;

        return (
          <motion.span
            key={variant}
            className={cn(
              "absolute z-0 h-px",
              variant === "mobile" ? "lg:hidden" : "max-lg:hidden",
              type === "right" && "left-full top-1/2 -translate-y-1/2 origin-left",
              type === "left" && "right-full top-1/2 -translate-y-1/2 origin-right",
              type === "right-down" && "left-full top-9 origin-left",
            )}
            initial={reduceMotion ? false : { width: 0, opacity: 0 }}
            animate={
              isVisible
                ? {
                  width: lineWidth,
                  opacity: isActive ? 1 : isDone ? 0.7 : 0.45,
                }
                : { width: 0, opacity: 0 }
            }
            transition={{ ...t.expand, delay: reduceMotion ? 0 : 0.1 }}
            aria-hidden
          >
            <span
              className={cn(
                "block h-full w-full",
                type === "left"
                  ? "bg-gradient-to-l from-white/90 via-zinc-300/70 to-zinc-400/30"
                  : "bg-gradient-to-r from-white/90 via-zinc-300/70 to-zinc-400/30",
              )}
            />
            <span
              className={cn(
                "absolute top-1/2 size-1 -translate-y-1/2 rounded-full bg-zinc-400/80",
                type === "left" ? "-left-0.5" : "-right-0.5",
              )}
            />
          </motion.span>
        );
      })}

      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/40 px-1 py-0.5 backdrop-blur-sm md:gap-2 md:px-2 md:py-0.5">
          <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-zinc-900/90 text-[5px] font-medium tabular-nums text-white md:size-[18px] md:text-[7px]">
            {id}
          </span>
          <span className="text-[5px] font-normal uppercase tracking-[0.14em] text-zinc-500 md:text-[7px]">
            Leak point
          </span>
        </span>

        {isActive ? (
          <motion.span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border border-amber-200/70 bg-amber-50/80 px-2 py-0.5 text-[8px] font-normal text-amber-900 backdrop-blur-sm md:px-2.5 md:py-1 md:text-[9px]",
              GPU,
            )}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={t.feedback}
          >
            <motion.span
              className="size-1.5 rounded-full border border-amber-400/80 border-t-amber-600"
              animate={reduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 0.85, repeat: Infinity, ease: "linear" }}
              aria-hidden
            />
            Scanning
          </motion.span>
        ) : isDone ? (
          <motion.span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border border-white/60 bg-white/50 px-2 py-0.5 text-[8px] font-normal text-zinc-600 backdrop-blur-sm md:px-2.5 md:py-1 md:text-[9px]",
              GPU,
            )}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={t.feedback}
          >
            <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden>
              <path
                d="M2 5.2 4.1 7.3 8.2 2.8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Mapped
          </motion.span>
        ) : null}
      </div>

      <h3 className="relative z-10 mt-3 min-h-[2.25rem] text-[12px] font-medium leading-snug tracking-tight text-zinc-900 md:mt-3.5 md:min-h-[2.75rem] md:text-[15px] lg:text-[16px] lg:leading-[1.35]">
        {titleText}
        {isTypingTitle && !titleComplete ? <TypingCaret visible reduce={reduceMotion} /> : null}
      </h3>

      <p className="relative z-10 mt-2 min-h-[3.5rem] text-[11px] font-normal leading-[1.55] text-zinc-600 md:min-h-[4.25rem] md:text-[13px] md:leading-[1.6] lg:text-[14px]">
        {bodyText}
        {isTypingBody && !bodyComplete ? <TypingCaret visible reduce={reduceMotion} /> : null}
      </p>
    </motion.article>
  );
}

const DESKTOP_NAV = ["Product", "Pricing", "Customers"] as const;

const DESKTOP_LOGOS = ["N", "V", "R", "S", "K"] as const;

const DESKTOP_STATS = [
  { value: "10K+", label: "Active users" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "2x", label: "Faster workflows" },
] as const;

function MockupLeakGlow({
  markerPhases,
  reduceMotion,
}: {
  markerPhases: MarkerPhase[];
  reduceMotion: boolean;
}) {
  const t = motionFor(reduceMotion);

  return (
    <>
      {annotations.map((item, index) => {
        const scanning = markerPhases[index] === "scanning";
        const done = markerPhases[index] === "done";
        const showGlow = markerPhases[index] !== "hidden";

        if (!showGlow) return null;

        return (
          <motion.span
            key={item.id}
            aria-hidden
            className={cn(
              "pointer-events-none absolute z-[5] size-20 -translate-x-1/2 -translate-y-1/2 rounded-full",
              GPU,
            )}
            style={{ top: item.markerTop, left: item.markerLeft }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{
              opacity: scanning && !reduceMotion ? [0.28, 0.48, 0.28] : done ? 0.16 : 0.24,
              scale: 1,
            }}
            transition={{
              opacity: {
                duration: scanning && !reduceMotion ? 1.6 : 0.38,
                repeat: scanning && !reduceMotion ? Infinity : 0,
                ease: easeOut,
              },
              default: t.feedback,
            }}
          >
            <span className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl" />
            <span className="absolute inset-3 rounded-full bg-amber-300/15 blur-md" />
          </motion.span>
        );
      })}
    </>
  );
}

function MobileLeakMockup({
  visible,
  markerPhases,
  reduceMotion,
}: {
  visible: boolean;
  markerPhases: MarkerPhase[];
  reduceMotion: boolean;
}) {
  const t = motionFor(reduceMotion);

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_48px_-16px_rgba(0,0,0,0.07)]",
        GPU,
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 4 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
      transition={t.enter}
    >
      <div className="flex items-center gap-3 border-b border-zinc-100 bg-zinc-50/90 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#FF5F57]" aria-hidden />
          <span className="size-2 rounded-full bg-[#FEBC2E]" aria-hidden />
          <span className="size-2 rounded-full bg-[#28C840]" aria-hidden />
        </div>
        <div className="min-w-0 flex-1 rounded-md border border-zinc-200/80 bg-white px-3 py-1">
          <p className="truncate text-[10px] font-normal text-zinc-400">acme-startup.com</p>
        </div>
      </div>

      <div className="relative px-4 py-5 md:px-7 md:py-8">
        <div className="border-b border-dashed border-amber-200/60 pb-6 md:pb-7">
          <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-400">
            Welcome to our platform
          </p>
          <h4 className="mt-2 max-w-[18ch] text-[clamp(1rem,2.4vw,1.35rem)] font-medium leading-[1.15] tracking-tight text-zinc-700">
            Transform your business with next-generation solutions
          </h4>
          <p className="mt-2 max-w-[32ch] text-[11px] font-normal leading-relaxed text-zinc-400 md:text-xs">
            We help companies innovate, scale, and unlock growth through modern digital experiences.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[10px] font-medium text-zinc-500">
              Learn more
            </span>
            <span className="rounded-full border border-zinc-200 px-3 py-1.5 text-[10px] font-normal text-zinc-400">
              See features
            </span>
          </div>
        </div>

        <div className="border-b border-dashed border-amber-200/40 py-5 md:py-6">
          <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-zinc-400">
            Trusted by teams worldwide
          </p>
          <div className="mt-3 grid grid-cols-4 gap-2 md:gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex h-8 items-center justify-center rounded-lg border border-zinc-100 bg-zinc-50 md:h-9"
                aria-hidden
              >
                <span className="h-2 w-8 rounded-sm bg-zinc-200/80" />
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl border border-zinc-100 bg-zinc-50/80 p-3">
            <p className="text-[10px] font-normal italic leading-relaxed text-zinc-400">
              &ldquo;Great product. Would recommend.&rdquo;
            </p>
            <p className="mt-1.5 text-[9px] font-medium text-zinc-400">— Customer, Company</p>
          </div>
        </div>

        <div className="pt-5 md:pt-6">
          <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-zinc-400">
            Get started today
          </p>
          <p className="mt-2 text-[12px] font-medium tracking-tight text-zinc-600 md:text-[13px]">
            Ready to take the next step?
          </p>
          <div className="mt-3 flex max-w-xs flex-col gap-2 sm:flex-row">
            <span className="h-8 flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-[10px] leading-8 text-zinc-400">
              you@company.com
            </span>
            <span className="inline-flex h-8 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 px-4 text-[10px] font-medium text-zinc-500">
              Submit
            </span>
          </div>
          <p className="mt-2 text-[9px] font-normal text-zinc-400">
            We&apos;ll get back to you soon.
          </p>
        </div>

        {annotations.map((item, index) => (
          <DiagnosticMarker
            key={item.id}
            id={item.id}
            top={item.markerTop}
            left={item.markerLeft}
            markerPhase={markerPhases[index] ?? "hidden"}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </motion.div>
  );
}

function DesktopLeakMockup({
  visible,
  markerPhases,
  reduceMotion,
}: {
  visible: boolean;
  markerPhases: MarkerPhase[];
  reduceMotion: boolean;
}) {
  const t = motionFor(reduceMotion);

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-[20px] border border-zinc-200/90 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_2px_4px_rgba(0,0,0,0.02),0_24px_64px_-24px_rgba(0,0,0,0.14)]",
        GPU,
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 4 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
      transition={t.enter}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 rounded-[28px] bg-gradient-to-b from-zinc-200/20 via-transparent to-transparent blur-3xl"
      />

      <div className="relative flex items-center gap-3 border-b border-zinc-100/90 bg-gradient-to-b from-zinc-50 to-white px-5 py-3">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[#FF5F57] shadow-[inset_0_-1px_0_rgba(0,0,0,0.08)]" aria-hidden />
          <span className="size-2.5 rounded-full bg-[#FEBC2E] shadow-[inset_0_-1px_0_rgba(0,0,0,0.08)]" aria-hidden />
          <span className="size-2.5 rounded-full bg-[#28C840] shadow-[inset_0_-1px_0_rgba(0,0,0,0.08)]" aria-hidden />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-zinc-200/80 bg-white px-3.5 py-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
          <svg className="shrink-0 text-zinc-300" width="11" height="11" viewBox="0 0 10 10" aria-hidden>
            <path
              d="M5 1a3.5 3.5 0 0 0-1.4 6.7V8h2.8v-.3A3.5 3.5 0 0 0 5 1Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
            />
          </svg>
          <p className="truncate text-[11px] font-normal tracking-wide text-zinc-500">acme-startup.com</p>
        </div>
      </div>

      <div className="relative bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.28] mix-blend-multiply"
          style={{
            backgroundImage: GRAIN_TEXTURE,
            backgroundRepeat: "repeat",
            backgroundSize: "140px 140px",
          }}
        />

        {!reduceMotion ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-5 z-10 h-px bg-gradient-to-r from-transparent via-amber-400/45 to-transparent"
            animate={visible ? { top: ["12%", "88%"] } : { top: "12%" }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          />
        ) : null}

        <nav className="relative flex items-center justify-between border-b border-zinc-100 px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <span
              className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-200 to-zinc-300/90 text-[11px] font-medium text-zinc-600"
              aria-hidden
            >
              A
            </span>
            <span className="text-[13px] font-medium tracking-tight text-zinc-700">Acme</span>
          </div>
          <div className="flex items-center gap-5">
            {DESKTOP_NAV.map((item) => (
              <span key={item} className="text-[11px] font-normal text-zinc-400">
                {item}
              </span>
            ))}
            <span className="rounded-full bg-zinc-900 px-3.5 py-1.5 text-[11px] font-normal text-white">
              Sign up
            </span>
          </div>
        </nav>

        <div className="relative grid grid-cols-[1fr_188px] gap-5 border-b border-zinc-100 px-6 py-7">
          <div>
            <span className="inline-flex rounded-full border border-zinc-200 px-2.5 py-0.5 text-[10px] font-normal uppercase tracking-[0.14em] text-zinc-400">
              Platform 2.0
            </span>
            <h4 className="mt-3 max-w-[22ch] text-[1.375rem] font-medium leading-[1.14] tracking-tight text-zinc-700">
              Transform your business with next-generation solutions
            </h4>
            <p className="mt-2.5 max-w-[34ch] text-[13px] font-normal leading-[1.6] text-zinc-400">
              We help companies innovate, scale, and unlock growth through modern digital experiences.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span className="rounded-full bg-zinc-900 px-4 py-2 text-[11px] font-normal text-white shadow-[0_1px_2px_rgba(0,0,0,0.12)]">
                Get started
              </span>
              <span className="rounded-full border border-zinc-200 px-4 py-2 text-[11px] font-normal text-zinc-500">
                Learn more
              </span>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-xl border border-zinc-100 bg-gradient-to-br from-zinc-50 via-zinc-100/70 to-zinc-200/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
            aria-hidden
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:14px_14px]" />
            <div className="relative space-y-2.5 p-3.5">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-zinc-300/80" />
                <span className="h-2 w-16 rounded-full bg-zinc-300/70" />
              </div>
              <div className="rounded-lg border border-white/80 bg-white/70 p-2.5 shadow-sm">
                <div className="h-2 w-3/4 rounded bg-zinc-200/80" />
                <div className="mt-2 h-10 rounded-md bg-gradient-to-r from-zinc-100 to-zinc-200/60" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-8 rounded-md border border-white/70 bg-white/60" />
                <div className="h-8 rounded-md border border-white/70 bg-white/60" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-zinc-100 px-6 py-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-normal uppercase tracking-[0.14em] text-zinc-400">
                Trusted by teams worldwide
              </p>
              <div className="mt-3.5 flex items-center gap-2">
                {DESKTOP_LOGOS.map((letter) => (
                  <span
                    key={letter}
                    className="flex size-9 items-center justify-center rounded-lg border border-zinc-100 bg-gradient-to-b from-white to-zinc-50 text-[11px] font-medium text-zinc-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                    aria-hidden
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-5">
              {DESKTOP_STATS.map((stat) => (
                <div key={stat.label} className="text-right">
                  <p className="text-[15px] font-medium tracking-tight text-zinc-600">{stat.value}</p>
                  <p className="mt-0.5 text-[10px] font-normal text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4">
              <div className="flex items-center gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="size-2 rounded-[2px] bg-amber-200/75" />
                ))}
              </div>
              <p className="mt-2.5 text-[12px] font-normal italic leading-[1.55] text-zinc-400">
                &ldquo;Great product. Would recommend.&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span
                  className="size-6 shrink-0 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300"
                  aria-hidden
                />
                <div>
                  <p className="text-[11px] font-normal text-zinc-500">Customer Name</p>
                  <p className="text-[10px] font-normal text-zinc-400">Company</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-zinc-100 bg-white p-4">
              <p className="text-[10px] font-normal uppercase tracking-[0.12em] text-zinc-400">
                Why teams choose us
              </p>
              <ul className="mt-3 space-y-2.5">
                {["Easy to use", "Scales with you", "Enterprise ready"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[11px] font-normal text-zinc-500">
                    <span className="size-1.5 rounded-full bg-zinc-300" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative px-6 py-7">
          <div className="rounded-2xl border border-zinc-100 bg-gradient-to-br from-zinc-50/80 via-white to-zinc-50/40 p-5">
            <p className="text-[10px] font-normal uppercase tracking-[0.14em] text-zinc-400">
              Get started today
            </p>
            <p className="mt-2 text-[15px] font-medium tracking-tight text-zinc-600">
              Ready to take the next step?
            </p>
            <div className="mt-4 flex max-w-sm gap-2.5">
              <span className="h-9 flex-1 rounded-full border border-zinc-200 bg-white px-4 text-[11px] leading-9 text-zinc-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
                you@company.com
              </span>
              <span className="inline-flex h-9 items-center justify-center rounded-full bg-zinc-900 px-5 text-[11px] font-normal text-white shadow-[0_1px_2px_rgba(0,0,0,0.12)]">
                Submit
              </span>
            </div>
            <p className="mt-2.5 text-[10px] font-normal text-zinc-400">
              We&apos;ll get back to you soon.
            </p>
          </div>
        </div>

        <MockupLeakGlow markerPhases={markerPhases} reduceMotion={reduceMotion} />

        {annotations.map((item, index) => (
          <DiagnosticMarker
            key={item.id}
            id={item.id}
            top={item.markerTop}
            left={item.markerLeft}
            markerPhase={markerPhases[index] ?? "hidden"}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </motion.div>
  );
}

function WebsiteLeakMockup({
  visible,
  markerPhases,
  reduceMotion,
}: {
  visible: boolean;
  markerPhases: MarkerPhase[];
  reduceMotion: boolean;
}) {
  return (
    <>
      <div className="lg:hidden">
        <MobileLeakMockup
          visible={visible}
          markerPhases={markerPhases}
          reduceMotion={reduceMotion}
        />
      </div>
      <div className="hidden lg:block">
        <DesktopLeakMockup
          visible={visible}
          markerPhases={markerPhases}
          reduceMotion={reduceMotion}
        />
      </div>
    </>
  );
}

export function FounderProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const reduceMotion = !!useReducedMotion();
  const visualInView = useInView(visualRef, VISUAL_VIEWPORT);
  const visualVisible = reduceMotion || visualInView;
  const { innerRef, isCompact, height } = useTeardownLayout(visualRef);
  const { phases, markerPhases, titleTexts, bodyTexts, activeIndex } = useAnnotationSequence(
    visualVisible,
    reduceMotion,
  );

  return (
    <section ref={sectionRef} className="overflow-x-clip bg-white px-3 py-14 md:px-8 md:py-24">
      <SectionContainer>
        <SectionHeader>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-400 md:text-[11px]">
            Website leak points
          </p>
          <h2 className="mt-2.5 text-[clamp(1.5rem,3.2vw,2.375rem)] font-medium leading-[1.14] tracking-tighter text-[var(--fg-primary)] md:mt-3 md:leading-[1.12]">
            Your Website may leak Trust <br /> before Buyers ever <br />
            talk to you.
          </h2>
          <p className="mt-3 text-[0.875rem] font-normal leading-relaxed text-[var(--fg-secondary)] md:mt-4 md:text-[0.9375rem]">
            Weak websites rarely fail in one obvious place. They lose people through unclear
            messaging, low credibility, and broken conversion paths.
          </p>
        </SectionHeader>

        <div
          ref={visualRef}
          className="relative mt-8 w-full overflow-hidden rounded-lg p-2.5 md:mt-16 md:p-3 lg:p-3.5 "
        >
          <Image
            src="/card-bg/leak-points-bg.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1152px"
            className="object-cover object-center saturate-180 mask-b-from-95% "
            aria-hidden
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] opacity-[0.22] mix-blend-soft-light"
            style={{
              backgroundImage: GRAIN_TEXTURE,
              backgroundRepeat: "repeat",
              backgroundSize: "180px 180px",
            }}
          />

          <div
            className="relative z-10 w-full overflow-hidden rounded-xl border border-white/30 bg-white/40 backdrop-blur-[2px] md:rounded-lg"
            style={isCompact ? { height } : undefined}
          >
            <div
              ref={innerRef}
              className={cn(
                "grid grid-cols-[minmax(0,1fr)_minmax(0,480px)_minmax(0,1fr)] grid-rows-[auto_auto_auto] items-center gap-x-3 gap-y-4 px-2 py-2 max-lg:px-2 md:px-4 md:py-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)_minmax(0,1fr)] lg:grid-rows-[auto_auto] lg:gap-x-6 lg:gap-y-8 lg:px-5 lg:py-4",
                isCompact &&
                "absolute left-0 w-[980px] max-lg:origin-top-left max-lg:will-change-transform max-lg:translate-y-[6%]",
                !isCompact && "lg:relative lg:w-full",
              )}
            >
              <AnnotationCard
                {...annotations[0]}
                titleText={titleTexts[0]}
                bodyText={bodyTexts[0]}
                phase={phases[0]}
                isActive={activeIndex === 0}
                connector="right"
                reduceMotion={reduceMotion}
                className="col-start-1 row-start-1 mt-12 self-start lg:mt-6"
              />

              <div className="col-start-2 row-start-1 row-span-3 lg:row-span-2">
                <WebsiteLeakMockup
                  visible={visualVisible}
                  markerPhases={markerPhases}
                  reduceMotion={reduceMotion}
                />
              </div>

              <AnnotationCard
                {...annotations[1]}
                titleText={titleTexts[1]}
                bodyText={bodyTexts[1]}
                phase={phases[1]}
                isActive={activeIndex === 1}
                connector="right"
                connectorLg="left"
                reduceMotion={reduceMotion}
                className="col-start-1 row-start-2 self-start max-lg:mt-1 lg:col-start-3 lg:row-start-2 lg:self-center lg:bottom-60"
              />

              <AnnotationCard
                {...annotations[2]}
                titleText={titleTexts[2]}
                bodyText={bodyTexts[2]}
                phase={phases[2]}
                isActive={activeIndex === 2}
                connector="right-down"
                reduceMotion={reduceMotion}
                className="col-start-1 mb-24 row-start-3 self-end max-lg:mt-1 lg:row-start-2 lg:mt-2"
              />
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
