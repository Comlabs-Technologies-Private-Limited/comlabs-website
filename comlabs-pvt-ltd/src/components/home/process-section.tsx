"use client";

import { motion, useInView } from "framer-motion";
import {
  Columns2,
  Heart,
  Layers,
  LayoutGrid,
  MessageCircle,
  MonitorSmartphone,
  PanelTop,
  Rocket,
  ScanSearch,
  SunMoon,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { SectionHeader } from "@/components/home/section-header";
import { servicesEyebrow, servicesSubtitle, servicesTitle } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

const ease = [0.25, 0.1, 0, 1] as const;

const steps: {
  icon: LucideIcon;
  title: string;
  body: string;
  background: string;
}[] = [
  {
    icon: ScanSearch,
    title: "Diagnose",
    body: "We review your current website, positioning, product, competitors, and conversion gaps.",
    background: "/card-bg/process-card-1.png",
  },
  {
    icon: LayoutGrid,
    title: "Structure",
    body: "We define the pages, user flow, and sections needed to make the site clear and conversion-focused.",
    background: "/card-bg/process-card-2.png",
  },
  {
    icon: Layers,
    title: "Design",
    body: "We create a clean, premium interface that makes your startup feel credible and differentiated.",
    background: "/card-bg/process-card-3.png",
  },
  {
    icon: Rocket,
    title: "Build & launch",
    body: "We develop, test, optimize, and launch with performance, SEO, CMS, analytics, and integrations in place.",
    background: "/card-bg/process-card-4.png",
  },
];

const extras: {
  icon: LucideIcon;
  title: string;
  body: string;
}[] = [
  {
    icon: PanelTop,
    title: "Web design and development",
    body: "We design and build with love, care and attention to detail.",
  },
  {
    icon: MonitorSmartphone,
    title: "Mobile Responsive",
    body: "We make sure your website is responsive and looks great on all devices.",
  },
  {
    icon: SunMoon,
    title: "Dark and Light Mode",
    body: "We make sure your website is accessible and looks great in both modes.",
  },
  {
    icon: Columns2,
    title: "Latest Tech Stack",
    body: "We use the latest and greatest technologies to build your website.",
  },
  {
    icon: MessageCircle,
    title: "Regular updates and communication",
    body: "We keep you updated on the progress of your website and communicate with you regularly.",
  },
  {
    icon: Heart,
    title: "Future updates and improvements",
    body: "We make sure your website is future-proof and can be easily updated and improved.",
  },
];

function ProcessStepItem({
  icon: Icon,
  title,
  body,
  bordered = false,
  background,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  bordered?: boolean;
  background?: string;
}) {
  if (!bordered && background) {
    return (
      <article className="group relative aspect-[4/5] w-full overflow-hidden rounded-sm p-3">
        <Image
          src={background}
          alt=""
          fill
          quality={100}
          sizes="(max-width: 768px) 100vw, 280px"
          className="object-cover object-center saturate-180"
          aria-hidden
        />

        <div className="absolute inset-[8px] border border-white/30 flex flex-col rounded-sm bg-white/40 backdrop-blur-[2px] p-3">
          <Icon
            className="h-6 w-6 shrink-0 text-neutral-900"
            strokeWidth={1.5}
            aria-hidden
          />

          <div className="mt-auto">
            <h3 className="text-xl font-normal leading-snug tracking-tight text-neutral-900">
              {title}
            </h3>
            <p className=" overflow-hidden text-[12px] font-normal leading-snug text-neutral-700 opacity-100 transition-all duration-300 ease-out mt-2.5 max-h-32 group-hover:opacity-100">
              {body}
            </p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "flex flex-col",
        bordered &&
          "h-full rounded-xl border p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-sm transition-colors duration-150 md:border-white/10 border-black/40 rounded-2xl border-white/10 md:p-6 md:backdrop-blur-sm hover:border-white/15 hover:bg-white/10",
      )}
    >
      <Icon
        className={cn(
          bordered ? "h-4 w-4 text-blue-600 md:h-5 md:w-5" : "h-5 w-5 text-blue-400",
        )}
        strokeWidth={1.5}
        aria-hidden
      />
      <h3
        className={cn(
          "font-medium leading-snug tracking-tight",
          bordered
            ? "mt-3 text-[12px] text-zinc-900 md:mt-4 md:text-[14px]"
            : "mt-4 text-[15px] text-zinc-50 md:text-base",
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "font-normal leading-relaxed",
          bordered
            ? "mt-2 text-[12px] text-zinc-700 md:text-[10px] lg:text-[14px]"
            : "mt-2 text-[13px] text-zinc-400 md:text-[14px]",
        )}
      >
        {body}
      </p>
    </article>
  );
}

export function ProcessSection() {
  const stepsRef = useRef(null);
  const extrasRef = useRef(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-80px" });
  const extrasInView = useInView(extrasRef, { once: true, margin: "-80px" });

  return (
    <section className="flex min-h-screen flex-col justify-center bg-white  px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader>
          <p className={cn(servicesEyebrow, "text-zinc-500")}>Process</p>
          <h2 className={cn(servicesTitle, "text-zinc-900")}>How we work.</h2>
          <p className={cn(servicesSubtitle, "text-zinc-600")}>
          A clear process from audit to launch  built to move fast,<br/> reduce confusion, and ship work that improves the business.          </p>
        </SectionHeader>

        <div
          ref={stepsRef}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              animate={stepsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.45, ease }}
            >
              <ProcessStepItem {...step} />
            </motion.div>
          ))}
        </div>

        <div className="relative mt-12 overflow-hidden rounded-xl md:mt-12 md:rounded-2xl">
          {/* <Image
            src="/card-bg/process-extras-bg.png"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 1152px"
            className="object-cover object-center"
            aria-hidden
          /> */}

          <div
            ref={extrasRef}
            className="relative grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 md:gap-5 md:p-8 lg:grid-cols-3 lg:p-12"
          >
            {extras.map((item, i) => (
              <motion.div
                key={item.title}
                className="h-full"
                initial={{ opacity: 0, y: 12 }}
                animate={extrasInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.45, ease }}
              >
                <ProcessStepItem {...item} bordered />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
