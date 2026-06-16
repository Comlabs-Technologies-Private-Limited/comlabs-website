"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

import { ServiceCard, serviceItems } from "@/components/home/services-section";
import { EnterpriseClientsSection } from "@/components/home/enterprise-clients-section";
import { FigmaNav } from "@/components/layout/figma-nav";
import { FigmaFooter } from "@/components/layout/figma-footer";

const image = "/imports/image.png";
const image1 = "/imports/image-1.png";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery",
    description:
      "Deep listening first. We learn your business goals, your users, and the constraints that matter.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Wireframes become high-fidelity prototypes. Every interaction is considered before code ships.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Clean, documented, production-grade code. Short cycles, frequent check-ins, no surprises.",
  },
  {
    step: "04",
    title: "Launch & Grow",
    description:
      "We handle deployment and hand you the keys — with optional ongoing support to keep momentum.",
  },
];

const STATS = [
  { value: "12+", label: "Years in business" },
  { value: "83%", label: "Clients who return" },
  { value: "140+", label: "Projects shipped" },
  { value: "4.9★", label: "Average rating" },
];

const PROJECTS = [
  {
    title: "Formula Lab",
    category: "Product UX · Dashboard",
    desc: "Multi-page onboarding flow for an internal dashboard — built to cut drop-off and get users to activation fast.",
    href: "/work/formula-lab",
    img: "a",
  },
  {
    title: "Global Services",
    category: "Website · Conversion",
    desc: "Full website rebuild that lifted conversion and helped land JIO and Vodafone-Idea as enterprise clients.",
    href: "/work/global-services",
    img: "b",
  },
  {
    title: "With Hub",
    category: "Brand · Marketing Site",
    desc: "Design-led marketing website built to give With Hub a strong digital identity and a foundation for growth.",
    href: "/work/with-hub",
    img: "a",
  },
  {
    title: "Skyway AI",
    category: "SaaS Product · Web App",
    desc: "Complex onboarding flows and product dashboards for a B2B AI tooling company.",
    href: "#",
    img: "b",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "It was night and day from one batch to another, adoption went from single digits to over 80%. It just spread like wildfire, all the best builders were using Cursor.",
    author: "Diana Hu",
    role: "General Partner, Y Combinator",
    initials: "DH",
  },
  {
    quote:
      "My favorite enterprise AI service is Cursor. Every one of our engineers, some 40,000, are now assisted by AI and our productivity has gone up incredibly.",
    author: "Jensen Huang",
    role: "President & CEO, NVIDIA",
    initials: "JH",
  },
  {
    quote:
      "The best LLM applications have an autonomy slider: you control how much independence to give the AI. In Cursor, you can do Tab completion, Cmd+K for targeted edits, or you can let it rip with the full autonomy agentic version.",
    author: "Andrej Karpathy",
    role: "CEO, Eureka Labs",
    initials: "AK",
  },
  {
    quote:
      "Cursor quickly grew from hundreds to thousands of extremely enthusiastic Stripe employees. We spend more on R&D and software creation than any other undertaking, and there's significant economic outcomes when making that process more efficient.",
    author: "Patrick Collison",
    role: "Co Founder & CEO, Stripe",
    initials: "PC",
  },
  {
    quote:
      "The most useful AI tool that I currently pay for, hands down, is Cursor. It's fast, autocompletes when and where you need it to, handles brackets properly, sensible keyboard shortcuts, bring-your-own-model... everything is well put together.",
    author: "shadcn",
    role: "Creator of shadcn/ui",
    initials: "SC",
  },
  {
    quote:
      "It's definitely becoming more fun to be a programmer. We are at the 1% of what's possible, and it's in interactive experiences like Cursor where models like GPT-5 shine brightest.",
    author: "Greg Brockman",
    role: "President, OpenAI",
    initials: "GB",
  },
];

export function FigmaHomePage() {
  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <FigmaNav />

      <main>
        <section
          className="relative overflow-hidden px-6 pt-16 pb-16 md:pt-24"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(247,247,244,0.86) 0%, rgba(247,247,244,0.78) 45%, rgba(247,247,244,0.88) 100%), url('/hero/hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center right",
          }}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-[-18%] h-[24rem] w-[24rem] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(201,100,66,0.20) 0%, rgba(201,100,66,0.08) 35%, rgba(201,100,66,0) 70%)",
            }}
            initial={{ opacity: 0.2, scale: 0.95 }}
            animate={{ opacity: [0.2, 0.38, 0.2], scale: [0.95, 1.03, 0.95] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-[-8rem] left-[-8rem] h-[18rem] w-[18rem] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(201,100,66,0.12) 0%, rgba(201,100,66,0.05) 40%, rgba(201,100,66,0) 72%)",
            }}
            initial={{ opacity: 0.16, scale: 0.98 }}
            animate={{ opacity: [0.16, 0.28, 0.16], scale: [0.98, 1.06, 0.98] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          <div className="mx-auto max-w-4xl text-left md:text-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 1.35 }}
              className="mb-9 inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium"
              style={{ color: "var(--warm-orange)", background: "var(--warm-orange-light)" }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--warm-orange)" }}
              />
              Now accepting projects for Q3 2025
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
              className="mb-7 text-3xl leading-[1.08] font-bold tracking-tight md:text-6xl"
              style={{ letterSpacing: "-0.03em" }}
            >
             We Turn Ambitious Ideas
              <br />
              Into{" "}
              <span className="font-bold" style={{ color: "var(--warm-orange)" }}>
              Products
              </span>{" "}
              People Use
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.82, ease: "easeOut" }}
              className="mb-10 max-w-lg text-md md:text-lg leading-relaxed text-muted-foreground md:mx-auto"
            >
              Comlabs is a design and development studio that crafts high-performance websites and web
              apps for ambitious companies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: 1.18, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-start gap-3 md:justify-center"
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                style={{ background: "var(--foreground)" }}
              >
                View our work <ArrowRight size={14} />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
              >
                Talk to us
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 1.48, ease: "easeOut" }}
            className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2"
          >
            {[image, image1].map((src, i) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-card"
                style={{ boxShadow: "0 2px 24px rgba(28,25,23,0.07)" }}
              >
                <img
                  src={src}
                  alt={`Comlabs prototype ${i + 1}`}
                  className="h-full w-full object-cover object-top"
                />
              </div>
            ))}
          </motion.div>
        </section>

        <EnterpriseClientsSection stats={STATS} />

        <section id="services" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12">
              <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                Services
              </p>
              <h2
                className="max-w-lg text-4xl font-bold tracking-tight md:text-5xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                Everything you need to ship great products.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {serviceItems.map((service, index) => (
                <ServiceCard key={service.id} {...service} index={index} variant="figma" />
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="border-y border-border bg-card px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12">
              <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                Process
              </p>
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl" style={{ letterSpacing: "-0.03em" }}>
                How we work.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="relative"
                >
                  <div
                    className="mb-4 text-xs font-medium tabular-nums"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--warm-orange)" }}
                  >
                    {step.step}
                  </div>
                  <h3 className="mb-2 text-sm font-semibold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                Our specialty
              </p>
              <h2
                className="mb-6 text-4xl leading-tight font-bold tracking-tight md:text-[2.75rem]"
                style={{ letterSpacing: "-0.03em" }}
              >
                We specialize in custom development.
              </h2>
              <p className="mb-7 text-sm leading-relaxed text-muted-foreground">
                No templates, no page builders, no compromises. Every project starts from a blank canvas
                and is built to your exact specifications using modern, maintainable code.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "React, Next.js, and TypeScript by default",
                  "Performance budgets enforced from day one",
                  "Accessibility baked in, not bolted on",
                  "Full code handoff with documentation",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 shrink-0 font-bold" style={{ color: "var(--warm-orange)" }}>
                      →
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                See our tech stack <ExternalLink size={13} />
              </a>
            </div>

            <div
              className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-card"
              style={{ boxShadow: "0 2px 24px rgba(28,25,23,0.07)" }}
            >
              <img src={image} alt="Custom development prototype" className="h-full w-full object-cover" />
            </div>
          </div>
        </section>

        <section id="work" className="border-y border-border bg-card px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  Selected work
                </p>
                <h2 className="text-4xl font-bold tracking-tight md:text-5xl" style={{ letterSpacing: "-0.03em" }}>
                  Recent projects.
                </h2>
              </div>
              <a
                href="#"
                className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
              >
                View all <ArrowRight size={13} />
              </a>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {PROJECTS.map((project, i) => (
                <motion.a
                  key={project.title}
                  href={project.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group block overflow-hidden rounded-3xl border border-border bg-background transition-colors hover:border-foreground/20"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.img === "a" ? image : image1}
                      alt={project.title}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-1.5 flex items-start justify-between">
                      <h3 className="text-sm font-semibold">{project.title}</h3>
                      <ExternalLink
                        size={13}
                        className="mt-0.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </div>
                    <p className="mb-3 text-xs text-muted-foreground">{project.category}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{project.desc}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f2f2ef] px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-10 text-center text-3xl font-medium tracking-tight text-[#1f1f1f] md:mb-12 md:text-5xl">
              The new way to build software.
            </h2>

            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
              {TESTIMONIALS.map((t, i) => (
                <motion.article
                  key={t.author}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex min-h-[182px] flex-col border border-[#ecece8] bg-[#f5f5f2] px-4 py-4 md:min-h-[190px]"
                >
                  <p className="text-[14px] leading-[1.45] text-[#2c2c2c]">&ldquo;{t.quote}&rdquo;</p>

                  <div className="mt-auto flex items-center gap-2.5 pt-5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d8d8d3] text-[10px] font-semibold text-[#4a4a4a]">
                      {t.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-medium leading-none text-[#2b2b2b]">{t.author}</p>
                      <p className="mt-1 truncate text-[12px] leading-none text-[#777771]">{t.role}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="mx-6 mb-16 overflow-hidden rounded-3xl"
          style={{ background: "var(--foreground)" }}
        >
          <div className="mx-auto max-w-2xl px-10 py-24 text-center">
            <p
              className="mb-6 text-xs font-semibold tracking-widest uppercase"
              style={{ color: "rgba(247,247,244,0.45)" }}
            >
              Let&apos;s build something
            </p>
            <h2
              className="mb-6 text-5xl font-bold tracking-tight md:text-6xl"
              style={{ color: "var(--background)", letterSpacing: "-0.03em" }}
            >
              Start a project.
            </h2>
            <p className="mb-10 text-base leading-relaxed" style={{ color: "rgba(247,247,244,0.55)" }}>
              Tell us what you&apos;re building. We&apos;ll tell you how we&apos;d approach it — no
              commitment required.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--background)", color: "var(--foreground)" }}
            >
              Get in touch <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </main>

      <FigmaFooter />
    </div>
  );
}
