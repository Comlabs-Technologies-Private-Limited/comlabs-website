"use client";

import { HomeServiceCard, homeServiceItems } from "@/components/home/services-section";

export function FigmaServicesSection() {
  return (
    <section id="services" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 md:mb-16">
          <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Services
          </p>
          <h2
            className="max-w-3xl text-2xl font-bold tracking-tight md:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Engineering that stays{" "}
            <span style={{ color: "var(--warm-orange)" }}>responsible</span> after launch.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            From application support and agentic systems to AWS infrastructure and custom software,
            we work across the technology stack where reliability, scale and engineering depth
            matter.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {homeServiceItems.map((service, index) => (
            <HomeServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
