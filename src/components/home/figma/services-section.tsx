"use client";

import { BlurReveal, BLUR_REVEAL_NORMAL_SPEED } from "@/components/blur-reveal";
import {
  AFTER_TITLE_BODY_DELAY,
  RevealCopy,
  RevealStagger,
  RevealStaggerItem,
  useAfterTitleReveal,
} from "@/components/home/figma/after-title-reveal";
import { AgenticFeature, ServicesSuite } from "@/components/home/figma/services-suite";
import { EDITORIAL_SHELL_CLASS } from "@/lib/home-editorial-images";

export function FigmaServicesSection() {
  const { revealed, onTitleComplete } = useAfterTitleReveal();

  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 md:mb-16">
          <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Services
          </p>
          <BlurReveal
            as="h2"
            inView
            speedReveal={BLUR_REVEAL_NORMAL_SPEED}
            onAnimationComplete={onTitleComplete}
            className="max-w-3xl text-2xl font-bold tracking-tight md:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
            segments={[
              { text: "Engineering that stays" },
              { text: "responsible", style: { color: "var(--warm-orange)" } },
              { text: "after launch." },
            ]}
          />
          <RevealCopy
            revealed={revealed}
            className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            From application support and agentic systems to AWS infrastructure and custom software,
            we work across the technology stack where reliability, scale and engineering depth
            matter.
          </RevealCopy>
        </div>
      </div>

      <RevealStagger
        revealed={revealed}
        delay={AFTER_TITLE_BODY_DELAY}
        className={`${EDITORIAL_SHELL_CLASS} flex flex-col gap-6`}
      >
        <RevealStaggerItem>
          <ServicesSuite />
        </RevealStaggerItem>
        <RevealStaggerItem>
          <AgenticFeature />
        </RevealStaggerItem>
      </RevealStagger>
    </section>
  );
}
