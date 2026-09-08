"use client";

import { BlurReveal, BLUR_REVEAL_NORMAL_SPEED } from "@/components/blur-reveal";
import {
  AFTER_TITLE_BODY_DELAY,
  RevealCopy,
  RevealStagger,
  RevealStaggerItem,
  useAfterTitleReveal,
} from "@/components/home/figma/after-title-reveal";
import { HomeServiceCard, homeServiceItems } from "@/components/home/services-section";

export function FigmaServicesSection() {
  const { revealed, onTitleComplete } = useAfterTitleReveal();

  return (
    <section id="services" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
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

        <RevealStagger
          revealed={revealed}
          delay={AFTER_TITLE_BODY_DELAY}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {homeServiceItems.map((service, index) => (
            <RevealStaggerItem
              key={service.id}
              className={service.featured ? "h-full md:col-span-2" : "h-full"}
            >
              <HomeServiceCard service={service} index={index} />
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
