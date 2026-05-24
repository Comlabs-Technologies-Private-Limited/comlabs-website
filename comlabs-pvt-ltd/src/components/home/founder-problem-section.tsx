"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";

import { cn } from "@/lib/utils";

const ease = [0.25, 0.1, 0, 1] as const;

const HEADER_VIEWPORT = { once: true, amount: 0.28 } as const;
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

function TypingCaret({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <motion.span
      className="ml-px inline-block h-3 w-px align-middle bg-zinc-400"
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
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

function stepTransition(delay: number, reduceMotion: boolean) {
  return {
    duration: reduceMotion ? 0 : 0.44,
    delay: reduceMotion ? 0 : delay,
    ease,
  };
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

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key={id}
          className="absolute z-20 flex items-center gap-1 max-md:gap-0.5 md:gap-1.5"
          style={{ top, left }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.35 }}
          animate={{
            opacity: 1,
            scale: scanning && !reduceMotion ? [1, 1.07, 1] : 1,
          }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{
            opacity: { duration: reduceMotion ? 0 : 0.32, ease },
            scale: scanning && !reduceMotion
              ? { duration: 1.35, repeat: Infinity, ease: "easeInOut" }
              : { type: "spring", stiffness: 520, damping: 24 },
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
              className="absolute inset-0 rounded-full bg-amber-500/25"
              animate={
                scanning && !reduceMotion
                  ? { scale: [1, 1.55, 1], opacity: [0.4, 0.1, 0.4] }
                  : { scale: 1, opacity: done ? 0.12 : 0.2 }
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

  return (
    <motion.article
      className={cn(
        "relative overflow-hidden rounded-xl border bg-white/95 p-2 backdrop-blur-[2px] max-md:rounded-lg md:p-3 lg:p-4",
        "shadow-[0_1px_1px_rgba(0,0,0,0.03),0_10px_28px_-14px_rgba(0,0,0,0.08)]",
        isActive ? "border-zinc-300/90" : "border-zinc-200/90",
        className,
      )}
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 14,
        scale: isVisible ? 1 : 0.98,
      }}
      transition={{ duration: reduceMotion ? 0 : 0.42, ease }}
    >
      <motion.span
        className="absolute bottom-3 left-0 top-3 w-0.5 origin-top rounded-full bg-amber-500 md:bottom-4 md:top-4"
        initial={false}
        animate={{
          scaleY: isVisible ? 1 : 0,
          opacity: isActive ? 1 : isDone ? 0.55 : 0.2,
        }}
        transition={{ duration: reduceMotion ? 0 : 0.35, ease }}
        aria-hidden
      />

      {(["mobile", "desktop"] as const).map((variant) => {
        const type = variant === "mobile" ? connector : (connectorLg ?? connector);
        if (type === "none") return null;

        return (
          <motion.span
            key={variant}
            className={cn(
              "absolute h-px bg-zinc-300/80",
              variant === "mobile" ? "lg:hidden" : "max-lg:hidden",
              type === "right" && "left-full top-1/2 -translate-y-1/2 origin-left",
              type === "left" && "right-full top-1/2 -translate-y-1/2 origin-right",
              type === "right-down" && "left-full top-8 origin-left",
            )}
            initial={reduceMotion ? false : { width: 0, opacity: 0 }}
            animate={
              isVisible ? { width: type === "right-down" ? 40 : 32, opacity: 1 } : { width: 0, opacity: 0 }
            }
            transition={{ duration: reduceMotion ? 0 : 0.45, ease, delay: reduceMotion ? 0 : 0.12 }}
            aria-hidden
          />
        );
      })}

      <div className="flex items-center justify-between gap-1.5 pl-2 md:gap-2 md:pl-2.5">
        <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-zinc-400 md:text-[10px] md:tracking-[0.14em]">
          Leak {id}
        </span>
        {isActive ? (
          <motion.span
            className="inline-flex items-center gap-1 rounded-full border border-amber-200/80 bg-amber-50 px-1 py-px text-[8px] font-medium text-amber-800 md:px-1.5 md:py-0.5 md:text-[9px]"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.28, ease }}
          >
            <motion.span
              className="size-1 rounded-full bg-amber-500"
              animate={reduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
            Scanning
          </motion.span>
        ) : isDone ? (
          <motion.span
            className="inline-flex size-3.5 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 md:size-4"
            initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 520, damping: 24 }}
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
          </motion.span>
        ) : null}
      </div>

      <h3 className="mt-2 min-h-[2.25rem] pl-2 text-[12px] font-medium leading-snug tracking-tight text-zinc-900 md:mt-2.5 md:min-h-[2.75rem] md:pl-2.5 md:text-[15px]">
        {titleText}
        {isTypingTitle && !titleComplete ? <TypingCaret visible /> : null}
      </h3>

      <p className="mt-1.5 min-h-[3.5rem] pl-2 text-[11px] font-normal leading-relaxed text-zinc-500 md:mt-2 md:min-h-[4.25rem] md:pl-2.5 md:text-[14px]">
        {bodyText}
        {isTypingBody && !bodyComplete ? <TypingCaret visible /> : null}
      </p>
    </motion.article>
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
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_48px_-16px_rgba(0,0,0,0.07)]"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: reduceMotion ? 0 : 0.52, ease }}
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
        {/* Hero — intentionally vague / weak */}
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

        {/* Proof area */}
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

        {/* CTA / lead capture */}
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

export function FounderProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const reduceMotion = !!useReducedMotion();
  const headerInView = useInView(sectionRef, HEADER_VIEWPORT);
  const visualInView = useInView(visualRef, VISUAL_VIEWPORT);
  const headerVisible = reduceMotion || headerInView;
  const visualVisible = reduceMotion || visualInView;
  const { innerRef, isCompact, height } = useTeardownLayout(visualRef);
  const { phases, markerPhases, titleTexts, bodyTexts, activeIndex } = useAnnotationSequence(
    visualVisible,
    reduceMotion,
  );

  const hidden = reduceMotion ? false : { opacity: 0, y: 14 };
  const shown = { opacity: 1, y: 0 };

  return (
    <section ref={sectionRef} className="overflow-x-clip bg-white px-3 py-14 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.p
          className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-400 md:text-[11px]"
          initial={hidden}
          animate={headerVisible ? shown : hidden}
          transition={stepTransition(0, reduceMotion)}
        >
          Website leak points
        </motion.p>

        <motion.h2
          className="mt-2.5 max-w-[760px] text-[clamp(1.5rem,3.2vw,2.375rem)] font-medium leading-[1.14] tracking-tighter text-[var(--fg-primary)] md:mt-3 md:leading-[1.12]"
          initial={hidden}
          animate={headerVisible ? shown : hidden}
          transition={stepTransition(0.1, reduceMotion)}
        >
          Your Website may leak Trust <br/> before Buyers ever  <br/>talk to you.
        </motion.h2>

        <motion.p
          className="mt-3 max-w-[620px] text-[0.875rem] font-normal leading-relaxed text-[var(--fg-secondary)] md:mt-4 md:text-[0.9375rem]"
          initial={hidden}
          animate={headerVisible ? shown : hidden}
          transition={stepTransition(0.2, reduceMotion)}
        >
          Weak websites rarely fail in one obvious place. They lose people through unclear messaging,
          low credibility, and broken conversion paths.
        </motion.p>

        <div
          ref={visualRef}
          className="relative mt-8 w-full overflow-hidden rounded-2xl border border-zinc-100 px-3.5 py-2 md:mt-16 md:p-6 lg:p-8"
        >
          <Image
            src="/card-bg/leak-points-bg.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1152px"
            className="object-cover object-center mask-b-from-98% mask-t-from-98% mask-l-from-99% md:mask-r-from-99%"
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
            className="relative z-10 w-full"
            style={isCompact ? { height } : undefined}
          >
            <div
              ref={innerRef}
              className={cn(
                "grid grid-cols-[minmax(0,1fr)_minmax(0,480px)_minmax(0,1fr)] grid-rows-[auto_auto_auto] items-center gap-x-3 gap-y-4 max-lg:px-2 lg:grid-rows-[auto_auto] lg:gap-x-6 lg:gap-y-8 lg:px-0",
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
              className="col-start-1 row-start-1 mt-2 self-start lg:mt-6"
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
              className="col-start-1 row-start-2 self-start max-lg:mt-1 lg:col-start-3 lg:row-start-2 lg:self-center lg:bottom-40"
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
      </div>
    </section>
  );
}
