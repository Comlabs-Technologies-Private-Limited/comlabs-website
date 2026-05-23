"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { TextFade } from "@/components/motion/text-fade";
import { MOCK_VIEWPORT, ServiceMockup } from "@/components/home/services-mockups";

const ease = [0.25, 0.1, 0, 1] as const;

const serviceBackgrounds = [
  "/card-bg/service-bg-1.png",
  "/card-bg/service-bg-2.png",
  "/card-bg/service-bg-3.png",
] as const;

const services = [
  {
    id: "website-rebuild",
    title: "Startup website rebuilds",
    description:
      "For startups with outdated, unclear, or underperforming websites that need to look more credible and convert better.",
    background: serviceBackgrounds[0],
  },
  {
    id: "landing-sprint",
    title: "Launch-ready landing pages",
    description:
      "For product launches, waitlists, campaigns, and high-intent traffic that needs speed without sacrificing quality.",
    background: serviceBackgrounds[1],
  },
  {
    id: "product-ui",
    title: "Product UI and frontend",
    description:
      "For dashboards, SaaS interfaces, portals, and customer-facing product flows that should feel like one system.",
    background: serviceBackgrounds[0],
  },
  {
    id: "ai-automation",
    title: "AI automation layers",
    description:
      "For lead capture, onboarding, support workflows, and repeatable processes where automation removes friction.",
    background: serviceBackgrounds[1],
  },
  {
    id: "maintenance",
    title: "Maintenance and iteration",
    description:
      "For teams that want the site to keep improving after launch with updates, analytics, and conversion refinements.",
    background: serviceBackgrounds[0],
  },
  {
    id: "growth-cro",
    title: "Conversion optimization",
    description:
      "For teams with traffic but weak signups who need clearer offers, proof, and CTA paths that convert.",
    background: serviceBackgrounds[1],
  },
] as const;

function ServiceCard({
  id,
  title,
  description,
  background,
  index,
}: (typeof services)[number] & { index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(cardRef, MOCK_VIEWPORT);
  const visible = reduceMotion || inView;

  return (
    <motion.article
      ref={cardRef}
      className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-none md:p-4"
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.06, ease }}
    >
      <div className="relative mask-t-from-95% mask-b-from-95% aspect-[6/4] overflow-hidden rounded-lg border border-zinc-100 p-2.5 md:p-3">
        <Image
          src={background}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center"
          aria-hidden
        />
        <div className="absolute top-20 right-2 bottom-2 left-2 flex items-center justify-center px-3 py-2 md:px-4">
          <div className="w-full  max-w-[92%] [&>*]:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
            <ServiceMockup id={id} active={visible} />
          </div>
        </div>
      </div>

      <h3 className="mt-4 text-[15px] font-medium leading-snug tracking-tight text-zinc-900 md:mt-5 md:text-base">
        {title}
      </h3>
      <p className="mt-1.5 text-[13px] font-normal leading-relaxed text-zinc-500 md:text-[14px]">
        {description}
      </p>
    </motion.article>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="bg-white px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <TextFade mode="inview" viewport={MOCK_VIEWPORT}>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400">
            Services
          </p>
          <h2 className="mt-3 max-w-[22ch] text-[clamp(1.625rem,3.2vw,2.375rem)] font-medium leading-[1.12] tracking-tighter text-[var(--fg-primary)]">
            What we ship for startups that need to move faster.
          </h2>
          <p className="mt-4 max-w-[42rem] text-[0.9375rem] font-normal leading-relaxed text-[var(--fg-secondary)]">
            Focused services for sharper websites, stronger product experience, and systems that
            save time — scoped tightly and shipped in focused slices.
          </p>
        </TextFade>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {services.map((service, index) => (
            <ServiceCard key={service.id} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
