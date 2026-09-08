"use client";

import { BlurReveal, BLUR_REVEAL_NORMAL_SPEED } from "@/components/blur-reveal";
import { HomeServiceCard, homeServiceItems } from "@/components/home/services-section";

export function FigmaServicesSection() {
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
            className="max-w-3xl text-2xl font-bold tracking-tight md:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
            segments={[
              { text: "Engineering that stays" },
              { text: "responsible", style: { color: "var(--warm-orange)" } },
              { text: "after launch." },
            ]}
          />
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            From application support and agentic systems to AWS infrastructure and custom software,
            we work across the technology stack where reliability, scale and engineering depth
            matter.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {homeServiceItems.map((service, index) => (
            <HomeServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
