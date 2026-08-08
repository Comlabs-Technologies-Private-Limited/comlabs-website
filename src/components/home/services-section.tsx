"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { SectionHeader } from "@/components/home/section-header";
import { SectionContainer } from "@/components/layout/section-container";
import { MOCK_VIEWPORT, ServiceMockup } from "@/components/home/services-mockups";
import { servicesEyebrow, servicesSubtitle, servicesTitle } from "@/lib/page-styles";
import { cn } from "@/lib/utils";
import { canonicalPath } from "@/lib/site";

const ease = [0.25, 0.1, 0, 1] as const;

const serviceBackgrounds = [
  "/services-bg/service-bg-1.png",
  "/services-bg/service-bg-2.png",
  "/services-bg/service-bg-3.png",
  "/services-bg/service-bg-4.png",
  "/services-bg/service-bg-5.png",
] as const;

const services = [
  {
    id: "website-rebuild",
    title: "Website Rebuilds",
    description:
      "Turn an outdated website into a sharper, faster site that builds trust and brings more inquiries.",
    background: serviceBackgrounds[0],
    mockupImage: "/card-bg/mockup_before.png",
    mockupAlt: "Before and after website rebuild comparison",
    mockupOverlayClassName: "",
    mockupWrapperClassName: "mt-12 md:mt-22",
    mockupClassName: "scale-107 pl-1",
    linkLabel: "See a rebuild example",
    linkHref: "/work/global-services",
  },
  {
    id: "landing-sprint",
    title: "Launch Landing Page",
    description:
      "Clear landing pages for launches, waitlists, and campaigns — built to explain fast and convert visitors.",
    background: serviceBackgrounds[1],
    mockupAlt: "",
    mockupOverlayClassName:
      "inset-x-3 top-8 bottom-0 flex items-end justify-center md:inset-x-5 md:top-10",
    mockupWrapperClassName: "flex w-full max-w-[92%] flex-col",
    mockupClassName: "",
    linkLabel: "Book a landing page sprint",
    linkHref: "#contact",
  },
  {
    id: "ai-automation",
    title: "AI Automations",
    description:
      "Automate lead capture, follow-ups, onboarding, and support so your team saves time every week.",
    background: serviceBackgrounds[2],
    mockupAlt: "",
    mockupOverlayClassName: "inset-2.5 top-8 bottom-2.5 items-stretch md:inset-3 md:top-10",
    mockupWrapperClassName: "flex h-full w-full max-w-[94%] flex-col",
    mockupClassName: "",
    linkLabel: "Explore automations",
    linkHref: "#contact",
  },
  {
    id: "product-ui",
    title: "Product UI & Frontend",
    description:
      "Clean dashboards, portals, and product interfaces that feel polished, usable, and ready to scale.",
    background: serviceBackgrounds[3],
    mockupImage: "/card-bg/product-ui-mockup.png",
    mockupAlt: "Pulse SaaS dashboard and mobile UI design mockup",
    mockupOverlayClassName: "mt-5 md:mt-6 scale-112",
    mockupWrapperClassName: "",
    mockupClassName: "",
    linkLabel: "View product work",
    linkHref: "/work/formial-labs",
  },
  {
    id: "growth-cro",
    title: "Strategy Calls",
    description:
      "Get clear direction on your website, positioning, page structure, and next best improvements.",
    background: serviceBackgrounds[4],
    mockupImage: "/card-bg/consultation_strategy_card_only.png",
    mockupAlt: "Live consultation call with strategy board, live notes, and focus areas",
    mockupOverlayClassName: "",
    mockupWrapperClassName: "md:mt-20 mt-12",
    mockupClassName: "",
    linkLabel: "Book a strategy call",
    linkHref: "#contact",
  },
  {
    id: "maintenance",
    title: "Copywriting & SEO",
    description:
      "Get found on Google, ChatGPT, and Perplexity — with clear copy that turns visitors into customers.",
    background: serviceBackgrounds[0],
    mockupAlt: "",
    mockupOverlayClassName: "md:top-16 top-8 items-",
    mockupWrapperClassName: "top-16",
    mockupClassName: "",
    linkLabel: "Improve your copy & SEO",
    linkHref: "#contact",
  },
] as const;

export type ServiceItem = (typeof services)[number];

function ServiceVisual({
  background,
  index,
  mockupImage,
  mockupAlt,
  mockupOverlayClassName,
  mockupWrapperClassName,
  mockupClassName,
  visualClassName,
  id,
  variant,
}: {
  background: string;
  index: number;
  mockupImage?: string;
  mockupAlt?: string;
  mockupOverlayClassName?: string;
  mockupWrapperClassName?: string;
  mockupClassName?: string;
  visualClassName?: string;
  id: string;
  variant: "legacy" | "figma";
}) {
  const visualRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(visualRef, MOCK_VIEWPORT);
  const mockupActive = inView;

  return (
    <div
      className={cn(
        "relative aspect-[5/4] overflow-hidden rounded-2xl md:aspect-[4/3] md:rounded-3xl",
        variant === "figma" ? "bg-secondary/60" : "bg-zinc-50",
        visualClassName,
      )}
    >
      {mockupImage ? (
        <>
          <Image
            src={background}
            alt=""
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center saturate-100"
            aria-hidden
          />
          <motion.div
            ref={visualRef}
            className={cn(
              "absolute inset-3 flex items-center justify-center md:inset-5",
              mockupOverlayClassName,
            )}
            initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.98 }}
            animate={
              mockupActive
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 10, scale: 0.98 }
            }
            transition={{ duration: reduceMotion ? 0 : 0.5, ease }}
          >
            <div className={cn("relative h-full w-full max-w-[88%]", mockupWrapperClassName)}>
              <Image
                src={mockupImage}
                alt={mockupAlt || "Service preview mockup"}
                width={640}
                height={640}
                sizes="(max-width: 768px) 100vw, 50vw"
                className={cn(
                  "pointer-events-none rounded-lg object-contain object-center drop-shadow-[0_12px_40px_rgba(0,0,0,0.12)]",
                  mockupClassName,
                )}
              />
            </div>
          </motion.div>
        </>
      ) : (
        <>
          <Image
            src={background}
            alt=""
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center saturate-180"
            aria-hidden
          />
          <div
            ref={visualRef}
            className={cn(
              "absolute inset-3 flex items-end justify-center px-3 py-2 md:inset-5 md:px-5",
              mockupOverlayClassName,
            )}
          >
            <div
              className={cn(
                "w-full max-w-[90%] [&>*]:shadow-[0_12px_40px_rgba(0,0,0,0.1)]",
                mockupWrapperClassName,
                mockupClassName,
              )}
            >
              <ServiceMockup id={id} active={mockupActive} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function ServiceRow({
  title,
  description,
  background,
  index,
  mockupImage,
  mockupAlt,
  mockupOverlayClassName,
  mockupWrapperClassName,
  mockupClassName,
  id,
  linkLabel,
  linkHref,
  variant = "legacy",
}: ServiceItem & { index: number; mockupImage?: string; variant?: "legacy" | "figma" }) {
  const rowRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(rowRef, MOCK_VIEWPORT);
  const visible = inView;
  const reversed = index % 2 === 1;

  return (
    <motion.article
      ref={rowRef}
      className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-20"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: reduceMotion ? 0 : 0.28, delay: reduceMotion ? 0 : index * 0.08, ease }}
    >
      <div className={cn("max-w-lg", reversed && "md:order-2 md:justify-self-end")}>
        <h3
          className={cn(
            variant === "figma"
              ? "text-xl leading-[1.15] font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl"
              : "text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.12] font-medium tracking-tight text-zinc-900",
          )}
          style={variant === "figma" ? { letterSpacing: "-0.03em" } : undefined}
        >
          {title}
        </h3>
        <p
          className={cn(
            variant === "figma"
              ? "mt-3 text-sm leading-relaxed text-muted-foreground md:mt-4 md:text-base"
              : "mt-4 text-[15px] leading-relaxed text-zinc-500 md:text-base",
          )}
        >
          {description}
        </p>
        <Link
          href={canonicalPath(linkHref)}
          className={cn(
            "group inline-flex items-center gap-1.5 font-medium transition-opacity hover:opacity-80",
            variant === "figma"
              ? "mt-5 text-sm text-[var(--warm-orange)] md:mt-6"
              : "mt-6 text-[15px] text-zinc-900",
          )}
        >
          {linkLabel}
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>

      <div className={cn(reversed && "md:order-1")}>
        <ServiceVisual
          background={background}
          index={index}
          mockupImage={mockupImage}
          mockupAlt={mockupAlt}
          mockupOverlayClassName={mockupOverlayClassName}
          mockupWrapperClassName={mockupWrapperClassName}
          mockupClassName={mockupClassName}
          id={id}
          variant={variant}
        />
      </div>
    </motion.article>
  );
}

/** @deprecated Use ServiceRow — kept for compatibility */
export const ServiceCard = ServiceRow;

export { services as serviceItems };

export function ServicesSection() {
  return (
    <section id="services" className="bg-white px-4 py-20 md:px-8 md:py-24">
      <SectionContainer>
        <SectionHeader>
          <p className={servicesEyebrow}>Services</p>
          <h2 className={servicesTitle}>
            What we ship for startups <br />
            that need to move <br />
            faster.
          </h2>
          <p className={servicesSubtitle}>
            Focused website, product, and automation work designed to remove friction <br /> and help
            your business grow.
          </p>
        </SectionHeader>

        <div className="mt-16 flex flex-col gap-20 md:mt-20 md:gap-28 lg:gap-32">
          {services.map((service, index) => (
            <ServiceRow key={service.id} {...service} index={index} />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
