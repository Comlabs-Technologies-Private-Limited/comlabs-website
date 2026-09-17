import Link from "next/link";
import { Compass, FileText, MessageCircle } from "lucide-react";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNavLoader } from "@/components/layout/figma-nav-loader";
import { canonicalPath } from "@/lib/site";
import { cn } from "@/lib/utils";

type HelpOption = {
  label: string;
  description: string;
  href: string;
  icon: typeof MessageCircle;
};

const HELP_OPTIONS: HelpOption[] = [
  {
    label: "Talk to us",
    description: "Tell us what you're building. We'll tell you how we'd approach it.",
    href: "/contact",
    icon: MessageCircle,
  },
  {
    label: "Explore our services",
    description: "Application support, AI systems, cloud, software and digital experience.",
    href: "/services",
    icon: Compass,
  },
  {
    label: "Read case studies",
    description: "See how we've taken production systems from build through operation.",
    href: "/case-studies",
    icon: FileText,
  },
];

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <FigmaNavLoader />

      <main>
        <section className="relative py-14 md:py-16">
          <span aria-hidden className="gutter-hatch" />
          <div className="section-layout">
            <div className="max-w-2xl px-1 md:px-4">
              <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                404
              </p>
              <h1
                className="text-2xl font-bold tracking-tight md:text-4xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                Darn, that page doesn&apos;t exist.
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                It may have been moved, renamed, or never built. Here are a few places that
                probably have what you were looking for.
              </p>
              <Link
                href={canonicalPath("/")}
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--warm-orange)] transition-opacity hover:opacity-80"
              >
                Back to home
              </Link>
            </div>

            <div className="mt-16 border-y border-border px-0 py-2 md:p-3">
              <div className="flat-frame grid grid-cols-1 md:grid-cols-3">
                {HELP_OPTIONS.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <Link
                      key={option.href}
                      href={canonicalPath(option.href)}
                      className={cn(
                        "group flex flex-col p-6 md:p-8",
                        index > 0 && "border-t border-border",
                        "md:border-t-0",
                        index > 0 && "md:border-l md:border-border",
                      )}
                    >
                      <span
                        aria-hidden
                        className="flex size-10 shrink-0 items-center justify-center border border-border"
                      >
                        <Icon size={17} strokeWidth={1.75} />
                      </span>
                      <h2
                        className="mt-5 text-[15px] font-medium tracking-tight md:text-base"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {option.label}
                      </h2>
                      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                        {option.description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--warm-orange)] transition-opacity group-hover:opacity-80">
                        Go there →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <FigmaFooter />
    </div>
  );
}
