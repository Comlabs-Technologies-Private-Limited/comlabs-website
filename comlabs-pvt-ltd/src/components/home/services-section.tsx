"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";

import { TextFade } from "@/components/motion/text-fade";
import { ServiceMockup } from "@/components/home/services-mockups";
import { bodyText, sectionTitle } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

const ease = [0.25, 0.1, 0, 1] as const;

const services: {
  id: string;
  title: string;
  description: string;
  buyer: string;
  features: string[];
}[] = [
  {
    id: "website-rebuild",
    title: "Startup website rebuilds",
    description:
      "For startups with outdated, unclear, or underperforming websites that need to look more credible and convert better.",
    buyer: "Founders who need a sharper marketing site before fundraising, sales, or hiring.",
    features: [
      "Conversion-focused structure",
      "Responsive frontend build",
      "SEO-ready implementation",
      "Analytics and event tracking",
      "CMS and integrations",
    ],
  },
  {
    id: "landing-sprint",
    title: "Launch-ready landing pages",
    description:
      "For product launches, waitlists, campaigns, investor updates, and high-intent traffic.",
    buyer: "Teams running a launch, campaign, or validation sprint who need speed without sacrificing quality.",
    features: [
      "Conversion-focused structure",
      "Responsive frontend build",
      "SEO-ready implementation",
      "Analytics and event tracking",
      "Clearer CTA flow",
    ],
  },
  {
    id: "product-ui",
    title: "Product UI and frontend",
    description:
      "For dashboards, SaaS interfaces, portals, internal tools, and customer-facing product flows.",
    buyer: "SaaS and product teams that need marketing pages and product UI to feel like one system.",
    features: [
      "Responsive frontend build",
      "Product UI/UX for startups",
      "Analytics and event tracking",
      "CMS and integrations",
      "AI-assisted workflows",
    ],
  },
  {
    id: "ai-automation",
    title: "AI automation layers",
    description:
      "For lead capture, onboarding, support workflows, internal operations, and repeatable business processes.",
    buyer: "Founders who want automation where it removes friction — not where it adds complexity.",
    features: [
      "AI-assisted workflows",
      "Analytics and event tracking",
      "CMS and integrations",
      "Conversion-focused structure",
    ],
  },
  {
    id: "maintenance",
    title: "Maintenance and iteration",
    description:
      "For founders who want the site to keep improving after launch with updates, analytics, and conversion refinements.",
    buyer: "Teams that ship once and want a clear path to measure, refine, and extend over time.",
    features: [
      "Analytics and event tracking",
      "Conversion-focused structure",
      "Responsive frontend build",
      "SEO-ready implementation",
    ],
  },
];

type HoverRect = {
  top: number;
  left: number;
  width: number;
  height: number;
  active: boolean;
};

const initialRect: HoverRect = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  active: false,
};

const cardFrameClass = cn(
  "group relative z-[1] cursor-pointer rounded-2xl p-8",
  "border border-neutral-200/95 bg-white",
  "shadow-[0_1px_0_rgba(0,0,0,0.03)_inset,0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-6px_rgba(0,0,0,0.08)]",
  "transition-[box-shadow,border-color,transform] duration-200 ease-out",
  "hover:border-neutral-300/90 hover:shadow-[0_1px_0_rgba(0,0,0,0.03)_inset,0_2px_4px_rgba(0,0,0,0.05),0_14px_36px_-8px_rgba(0,0,0,0.12)]",
  "dark:border-white/[0.1] dark:bg-neutral-900",
  "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_1px_2px_rgba(0,0,0,0.45),0_12px_36px_-8px_rgba(0,0,0,0.65)]",
  "dark:hover:border-white/[0.14] dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_2px_6px_rgba(0,0,0,0.5),0_18px_44px_-10px_rgba(0,0,0,0.75)]",
);

export function ServicesSection() {
  const [selected, setSelected] = useState<string | null>(null);
  const item = selected ? services.find((s) => s.id === selected) : null;
  const gridWrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<HoverRect>(initialRect);
  const reduceMotion = useReducedMotion();

  const syncHighlight = useCallback((cardEl: HTMLElement | null) => {
    const root = gridWrapRef.current;
    if (!cardEl || !root) return;
    const rr = root.getBoundingClientRect();
    const cr = cardEl.getBoundingClientRect();
    setHover({
      top: cr.top - rr.top + root.scrollTop,
      left: cr.left - rr.left + root.scrollLeft,
      width: cr.width,
      height: cr.height,
      active: true,
    });
  }, []);

  const clearHighlight = useCallback(() => {
    setHover((h) => ({ ...h, active: false }));
  }, []);

  const spring = reduceMotion
    ? { duration: 0.2, ease }
    : { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.85 };

  return (
    <section
      id="services"
      className="bg-neutral-50 px-4 py-24 md:px-8 dark:bg-neutral-950"
    >
      <div className="mx-auto max-w-6xl">
        <TextFade mode="scroll" staggerChildren={0.08}>
          <p className="flex items-center gap-2 text-[12px] font-normal uppercase leading-none tracking-widest text-neutral-500 dark:text-neutral-400">
            <span className="h-3 w-px rounded-full bg-blue-600/70 dark:bg-blue-400/80" aria-hidden />
            <span className="text-blue-600 dark:text-blue-400">Services</span>
          </p>
          <h2 className={cn(sectionTitle, "mt-4 text-neutral-950 dark:text-neutral-50")}>
            What we{" "}
            <span className="text-blue-600 dark:text-blue-400">ship</span>.
          </h2>
          <p
            className={cn(
              bodyText,
              "mt-4 max-w-2xl text-neutral-600 dark:text-neutral-400",
            )}
          >
            Focused services for startups that need a sharper website, stronger product experience,
            and systems that save time.
          </p>
        </TextFade>

        <div
          ref={gridWrapRef}
          className="relative mt-10"
          onMouseLeave={() => {
            if (!selected) clearHighlight();
          }}
        >
          <motion.div
            layoutId="services-grid-hover-bg"
            aria-hidden
            className={cn(
              "pointer-events-none absolute z-0 rounded-2xl",
              "border border-blue-600/20 bg-white/95 shadow-[0_2px_8px_rgba(37,99,235,0.08),0_12px_32px_-8px_rgba(0,0,0,0.1)]",
              "dark:border-blue-400/25 dark:bg-neutral-900/95 dark:shadow-[0_2px_12px_rgba(59,130,246,0.12),0_16px_40px_-10px_rgba(0,0,0,0.7)]",
            )}
            initial={false}
            animate={{
              top: hover.top,
              left: hover.left,
              width: hover.width,
              height: hover.height,
              opacity: hover.active && !selected ? 1 : 0,
            }}
            transition={spring}
          />

          <div className="relative z-[1] grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <motion.article
                key={s.id}
                layoutId={selected === s.id ? undefined : `service-card-${s.id}`}
                onClick={() => setSelected(s.id)}
                onMouseEnter={(e) => syncHighlight(e.currentTarget)}
                className={cardFrameClass}
              >
                <motion.div
                  whileHover={
                    reduceMotion ? undefined : { y: -3, transition: { duration: 0.2, ease } }
                  }
                >
                  <ServiceMockup id={s.id} />
                  <h3 className="mt-6 text-lg font-medium leading-snug tracking-tight text-neutral-900 transition-colors duration-200 group-hover:text-blue-700 dark:text-neutral-100 dark:group-hover:text-blue-300">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm font-normal leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {s.description}
                  </p>
                  <ul className="mt-4 space-y-1.5 border-t border-neutral-200/80 pt-4 dark:border-white/10">
                    {s.features.slice(0, 3).map((f) => (
                      <li
                        key={f}
                        className="flex gap-2 text-[12px] font-normal leading-snug text-neutral-600 dark:text-neutral-400"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-600/70 dark:bg-blue-400/80" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && item ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm dark:bg-black/60"
            onClick={() => setSelected(null)}
          >
            <motion.article
              layoutId={`service-card-${item.id}`}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "relative z-[1] max-h-[85vh] w-full max-w-lg cursor-default overflow-y-auto rounded-2xl p-10",
                "border border-neutral-200/95 bg-white",
                "shadow-[0_1px_0_rgba(0,0,0,0.03)_inset,0_4px_16px_rgba(0,0,0,0.06),0_24px_48px_-12px_rgba(0,0,0,0.12)]",
                "dark:border-white/[0.12] dark:bg-neutral-900",
                "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.55)]",
              )}
            >
              <ServiceMockup id={item.id} />
              <h3 className="mt-6 text-lg font-medium text-neutral-900 dark:text-neutral-100">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {item.description}
              </p>
              <p className={cn(bodyText, "mt-3 text-[13px] font-medium text-neutral-800 dark:text-neutral-200")}>
                Who it&apos;s for: {item.buyer}
              </p>
              <ul className="mt-4 space-y-2">
                {item.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-2 text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className={cn(bodyText, "mt-4 text-[13px]")}>
                We scope tightly, communicate often, and ship in focused slices. Share your goal —
                we&apos;ll propose the smallest credible path to launch.
              </p>
              <button
                type="button"
                className="mt-6 text-[13px] font-normal text-neutral-600 underline-offset-4 hover:underline dark:text-neutral-400"
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
