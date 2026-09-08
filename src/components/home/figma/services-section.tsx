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

/** Equal columns in the top services frame. Agentic AI sits in its own frame below. */
const COLUMN_SERVICE_IDS: readonly HomeServiceId[] = [
  "application-support",
  "cloud-infrastructure",
  "custom-software",
];

/** Second frame under Agentic AI — two equal columns. */
const PAIRED_SERVICE_IDS: readonly HomeServiceId[] = ["mobile-app", "website-design"];

function serviceById(id: HomeServiceId): HomeService | undefined {
  return HOME_SERVICES.find((service) => service.id === id);
}

function servicesFor(ids: readonly HomeServiceId[]): HomeService[] {
  return ids.map(serviceById).filter((service): service is HomeService => Boolean(service));
}

/** Existing illustration, stripped of card chrome so it sits flush inside the grid cell. */
function ServiceVisual({ service, className }: { service: HomeService; className?: string }) {
  const illustration = serviceIllustrations[service.id];
  if (!illustration) return null;
  const { Component, label } = illustration;

  return (
    <ServiceIllustrationFrame
      label={label}
      chrome={false}
      className={cn("w-full rounded-none border-0 md:rounded-none", className)}
      stageClassName="p-0"
    >
      <Component />
    </ServiceIllustrationFrame>
  );
}

function ServiceLink({ service }: { service: HomeService }) {
  return (
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
  );
}

function ServiceCopy({ service }: { service: HomeService }) {
  return (
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
      <ServiceLink service={service} />
    </div>
  );
}

/**
 * One grid cell: text above, existing visual flush below. Dividers are drawn on
 * the cell itself so two neighbouring cells never stack a double border.
 */
function ServiceColumn({
  service,
  index,
  columns,
}: {
  service: HomeService;
  index: number;
  columns: 2 | 3;
}) {
  const startsRow = index % columns === 0;

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col",
        index > 0 && "border-t border-border",
        "lg:border-t-0",
        index >= columns && "lg:border-t lg:border-border",
        !startsRow && "lg:border-l lg:border-border",
      )}
    >
      <ServiceCopy service={service} />
      <ServiceVisual service={service} className="aspect-[4/3] md:aspect-[4/3]" />
    </div>
  );
}

export function FigmaServicesSection() {
  const { revealed, onTitleComplete } = useAfterTitleReveal();

  const columns = servicesFor(COLUMN_SERVICE_IDS);
  const paired = servicesFor(PAIRED_SERVICE_IDS);
  const agentic = serviceById("agentic-infrastructure");

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
        <RevealStaggerItem>
          <div className="flat-frame grid grid-cols-1 lg:grid-cols-3">
            {columns.map((service, index) => (
              <ServiceColumn key={service.id} service={service} index={index} columns={3} />
            ))}
          </div>
        </RevealStaggerItem>

        {agentic ? (
          <RevealStaggerItem className="mt-6">
            <div className="flat-frame grid grid-cols-1 lg:grid-cols-2">
              <ServiceVisual
                service={agentic}
                className="aspect-[4/3] md:aspect-[4/3] lg:h-full lg:aspect-auto lg:min-h-[440px]"
              />
              <div className="flex flex-col justify-center border-t border-border p-6 lg:border-t-0 lg:border-l lg:border-border lg:p-8">
                <h3
                  className="text-lg leading-[1.2] font-bold tracking-tight md:text-xl"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {agentic.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground md:hidden">
                  {agentic.mobileDescription}
                </p>
                <p className="mt-3 hidden max-w-[52ch] text-sm leading-relaxed text-muted-foreground md:block">
                  {agentic.description}
                </p>
                <ServiceLink service={agentic} />
              </div>
            </div>
          </RevealStaggerItem>
        ) : null}

        {paired.length > 0 ? (
          <RevealStaggerItem className="mt-6">
            <div className="flat-frame grid grid-cols-1 lg:grid-cols-2">
              {paired.map((service, index) => (
                <ServiceColumn key={service.id} service={service} index={index} columns={2} />
              ))}
            </div>
          </RevealStaggerItem>
        ) : null}
      </RevealStagger>
    </section>
  );
}
