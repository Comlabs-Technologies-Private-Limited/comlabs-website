"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { EnterpriseClientsTrust } from "@/components/home/enterprise-clients-section";
import { useOptionalTheme } from "@/components/theme/theme-provider";
import { ChromaticImage } from "@/components/ui/chromatic-image";
import {
  HERO_BACKGROUND_ALT,
  HERO_BACKGROUND_PATH,
  HERO_BACKGROUND_SIZE,
  mediaUrl,
} from "@/lib/cloudinary";
import { canonicalPath } from "@/lib/site";

/** Quiet over the headline; opens toward the right and bottom so the landscape reads. */
const HERO_OVERLAY =
  "linear-gradient(118deg, rgba(247,247,244,0.84) 0%, rgba(247,247,244,0.66) 30%, rgba(247,247,244,0.40) 58%, rgba(247,247,244,0.16) 100%)";
const HERO_OVERLAY_MOBILE =
  "linear-gradient(118deg, rgba(247,247,244,0.78) 0%, rgba(247,247,244,0.54) 36%, rgba(247,247,244,0.26) 100%)";

/**
 * Hero entrance.
 *
 * Everything settles in well under a second. The previous version revealed the
 * headline word by word and then *gated* the description, buttons and client
 * row on that animation finishing, so the hero took roughly two seconds to
 * come to rest — which is what read as slow. These are plain fixed delays on
 * one short timeline: nothing waits for anything else to report completion.
 *
 * Only `opacity` and `transform` animate, so each element stays on the
 * compositor.
 */
const HERO_EASE = [0.22, 1, 0.36, 1] as const;
const HERO_LIFT = 12;

export function FigmaHeroSection() {
  const theme = useOptionalTheme();
  const isDark = theme?.resolvedTheme === "dark";
  const reduceMotion = useReducedMotion();

  /** Settles down into place from slightly above. */
  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : -HERO_LIFT },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : 0.4,
      delay: reduceMotion ? 0 : delay,
      ease: HERO_EASE,
    },
  });

  return (
    <section className="relative overflow-hidden bg-background py-14 md:py-16">
      {!isDark ? (
        <>
          {/* The photograph arrives on its own, slower curve so it feels like
              it settles in behind the copy rather than blinking on. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 z-0"
          >
            <ChromaticImage
              src={mediaUrl(HERO_BACKGROUND_PATH)}
              alt={HERO_BACKGROUND_ALT}
              width={HERO_BACKGROUND_SIZE.width}
              height={HERO_BACKGROUND_SIZE.height}
              trackParent
              backgroundColor="#f7f7f4"
              zoom={0.06}
              displacement={0.03}
              chromaticShift={0.008}
              tilt={0}
              focusX={0.36}
              focusY={0.38}
              objectPosition="36% 38%"
              className="pointer-events-none absolute inset-0 size-full bg-background"
            />
          </motion.div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] md:hidden"
            style={{ background: HERO_OVERLAY_MOBILE }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
            style={{ background: HERO_OVERLAY }}
          />
        </>
      ) : null}

      <span aria-hidden className="gutter-hatch z-[2]" />
      <span
        aria-hidden
        className="gutter-hatch-rule gutter-hatch-rule-edge gutter-hatch-rule-edge-top border-b border-neutral-200"
      />
      <span
        aria-hidden
        className="gutter-hatch-rule gutter-hatch-rule-edge gutter-hatch-rule-edge-bottom "
      />

      <div className="section-layout relative z-10 px-1 md:px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            {...enter(0.04)}
            className="mb-9 inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium"
            style={{
              color: "var(--warm-orange)",
              background: "var(--warm-orange-light)",
            }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--warm-orange)" }}
            />
            Currently taking new projects
          </motion.div>

          <motion.h1
            {...enter(0.1)}
            className="mb-7 text-3xl leading-[1.08] font-bold tracking-tight md:text-6xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            We Run the{" "}
            <span style={{ color: "var(--warm-orange)" }}>Technology</span>
            <br />
            Your Business Depends On
          </motion.h1>

          <motion.p
            {...enter(0.17)}
            className="mx-auto mb-6 max-w-2xl text-pretty text-base leading-relaxed text-foreground/80 md:max-w-[34rem] md:text-[17px] md:leading-[1.55] md:text-foreground/75"
          >
            We build, scale and support your applications, AI systems and cloud
            infrastructure from first release to daily operation.
          </motion.p>

          <motion.div
            {...enter(0.23)}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href={canonicalPath("/contact")}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              style={{ background: "var(--foreground)" }}
            >
              Talk to us <ArrowRight size={14} />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
            >
              Explore services.
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div {...enter(0.29)} className="relative z-10 mt-16 w-full">
        <span aria-hidden className="gutter-hatch-rule" />
        <div className="section-layout px-1 pt-10 md:px-4 md:pt-12">
          <div aria-label="Trusted clients">
            <EnterpriseClientsTrust />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
