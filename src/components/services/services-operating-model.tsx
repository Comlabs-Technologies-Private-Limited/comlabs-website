import Link from "next/link";

import { canonicalPath } from "@/lib/site";

const PHASES = [
  {
    title: "Build",
    copy: "New applications, platforms and digital products.",
    services: [
      { label: "Custom Software", href: "/services/custom-software-development" },
      { label: "Web", href: "/services/website-design-development" },
      { label: "Mobile", href: "/services/mobile-app-development" },
    ],
  },
  {
    title: "Operate",
    copy: "Cloud, deployments, monitoring and production environments.",
    services: [{ label: "AWS Cloud & DevOps", href: "/services/cloud-infrastructure-scaling" }],
  },
  {
    title: "Support",
    copy: "User issues through engineering-level escalation.",
    services: [{ label: "L1–L4 Application Support", href: "/services/application-support" }],
  },
  {
    title: "Improve",
    copy: "AI workflows, performance and reliability engineering.",
    services: [
      { label: "AI Engineering", href: "/services/ai-agent-development" },
      { label: "Cloud & DevOps", href: "/services/cloud-infrastructure-scaling" },
    ],
  },
] as const;

export function ServicesOperatingModel() {
  return (
    <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      <div
        className="pointer-events-none absolute top-[0.65rem] right-0 left-0 hidden border-t border-neutral-200 lg:block"
        aria-hidden
      />
      {PHASES.map((phase, index) => (
        <article key={phase.title} className="relative lg:pt-8">
          <p
            className="mb-3 inline-block bg-background pr-2 text-[11px] font-medium tabular-nums text-neutral-400 lg:mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mb-2 text-sm font-medium tracking-tight text-neutral-900">{phase.title}</h3>
          <p className="text-sm leading-relaxed text-neutral-600">{phase.copy}</p>
          <ul className="mt-4 flex flex-col gap-1.5">
            {phase.services.map((service) => (
              <li key={service.href + service.label}>
                <Link
                  href={canonicalPath(service.href)}
                  className="text-[13px] text-[var(--warm-orange)] transition-opacity hover:opacity-80"
                >
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
