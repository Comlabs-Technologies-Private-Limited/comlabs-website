"use client";

import { ServiceCard, serviceItems } from "@/components/home/services-section";

export function FigmaServicesSection() {
  return (
    <section id="services" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Services
          </p>
          <h2
            className="max-w-lg text-2xl font-bold tracking-tight md:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Everything you need to ship{" "}
            <span style={{ color: "var(--warm-orange)" }}>great</span> products.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {serviceItems.map((service, index) => (
            <ServiceCard key={service.id} {...service} index={index} variant="figma" />
          ))}
        </div>
      </div>
    </section>
  );
}
