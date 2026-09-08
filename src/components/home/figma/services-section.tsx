"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { BlurReveal, BLUR_REVEAL_NORMAL_SPEED } from "@/components/blur-reveal";
import {
  AFTER_TITLE_BODY_DELAY,
  RevealCopy,
  RevealStagger,
  RevealStaggerItem,
  useAfterTitleReveal,
} from "@/components/home/figma/after-title-reveal";
import {
  ServiceIllustrationFrame,
  serviceIllustrations,
} from "@/components/services/illustrations";
import { HOME_SERVICES, type HomeService, type HomeServiceId } from "@/lib/home-services";
import { canonicalPath } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Reading order for the shared 2x3 grid. Agentic AI and Application Support
 * share the first row; the remaining four keep their existing relative order.
 */
const SERVICE_ORDER: readonly HomeServiceId[] = [
  "agentic-infrastructure",
  "application-support",
  "cloud-infrastructure",
  "custom-software",
  "mobile-app",
  "website-design",
];

/** Desktop columns — the divider maths below follows from this. */
const GRID_COLUMNS = 2;

function orderedServices(): HomeService[] {
  return SERVICE_ORDER.map((id) => HOME_SERVICES.find((service) => service.id === id)).filter(
    (service): service is HomeService => Boolean(service),
  );
}

/** Existing illustration, without card chrome, so it sits flush inside the grid cell. */
function ServiceVisual({ service }: { service: HomeService }) {
  const illustration = serviceIllustrations[service.id];
  if (!illustration) return null;
  const { Component, label } = illustration;

  return (
    <ServiceIllustrationFrame
      label={label}
      chrome={false}
      className="aspect-[4/3] w-full rounded-none border-0 md:aspect-[4/3] md:rounded-none"
      stageClassName="p-0"
    >
      <Component />
    </ServiceIllustrationFrame>
  );
}

/**
 * One grid cell. Shared edges are drawn by the cell that sits after the seam,
 * so no two neighbours ever stack into a 2px line, and the desktop-only
 * vertical rule is reset at mobile widths.
 */
function ServiceCell({ service, index }: { service: HomeService; index: number }) {
  const startsRow = index % GRID_COLUMNS === 0;

  return (
    <RevealStaggerItem
      className={cn(
        "flex min-w-0 flex-col",
        index > 0 && "border-t border-border",
        "lg:border-t-0",
        index >= GRID_COLUMNS && "lg:border-t lg:border-border",
        !startsRow && "lg:border-l lg:border-border",
      )}
    >
      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <h3
          className="text-lg leading-[1.2] font-bold tracking-tight md:text-xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          {service.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground md:hidden">
          {service.mobileDescription}
        </p>
        <p className="mt-3 hidden text-sm leading-relaxed text-muted-foreground md:block">
          {service.description}
        </p>
        <Link
          href={canonicalPath(service.href)}
          className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--warm-orange)] transition-opacity hover:opacity-80"
        >
          {service.linkLabel}
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>
      <ServiceVisual service={service} />
    </RevealStaggerItem>
  );
}

export function FigmaServicesSection() {
  const { revealed, onTitleComplete } = useAfterTitleReveal();
  const services = orderedServices();

  return (
    <section id="services" className="py-24 md:py-32">
      <div className="section-layout">
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
        className="section-layout"
      >
        {/* Outer hairline, perimeter padding, then the inner frame around the cards. */}
        <div className="flat-frame hairline-perimeter p-2 md:p-3">
          <div className="flat-frame grid grid-cols-1 bg-background lg:grid-cols-2">
            {services.map((service, index) => (
              <ServiceCell key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </RevealStagger>
    </section>
  );
}
