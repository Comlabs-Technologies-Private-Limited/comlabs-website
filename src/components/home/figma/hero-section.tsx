import { ArrowRight } from "lucide-react";

import { EnterpriseClientsTrust } from "@/components/home/enterprise-clients-section";
import { canonicalPath } from "@/lib/site";

export function FigmaHeroSection() {
  return (
    <section className="hero-shell relative overflow-hidden px-6 pt-16 pb-16 md:pt-24 md:pb-20">
      <div
        aria-hidden
        className="hero-orb pointer-events-none absolute -top-24 right-[-18%] h-[24rem] w-[24rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,100,66,0.20) 0%, rgba(201,100,66,0.08) 35%, rgba(201,100,66,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="hero-orb-delayed pointer-events-none absolute bottom-[-8rem] left-[-8rem] h-[18rem] w-[18rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,100,66,0.12) 0%, rgba(201,100,66,0.05) 40%, rgba(201,100,66,0) 72%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl text-left md:text-center">
        <div
          className="home-fade-up mb-9 inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium"
          style={{
            color: "var(--warm-orange)",
            background: "var(--warm-orange-light)",
            animationDelay: "1.35s",
          }}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--warm-orange)" }}
          />
          Currently taking new projects
        </div>

        <h1
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
        </h1>

        <p className="mb-10 max-w-lg text-md leading-relaxed text-muted-foreground md:mx-auto md:text-lg">
          Comlabs is a design and engineering studio building high-performance websites, custom
          software, and mobile products for ambitious companies.
        </p>

        <div className="flex flex-wrap items-center justify-start gap-3 md:justify-center">
          <a
            href={canonicalPath("/contact")}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            style={{ background: "var(--foreground)" }}
          >
            Talk to us <ArrowRight size={14} />
          </a>
          <a
            href={canonicalPath("/work")}
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            View our work
          </a>
        </div>
      </div>

      <div
        className="home-fade-up relative mx-auto mt-16 max-w-5xl"
        style={{ animationDelay: "1.48s" }}
        aria-label="Trusted clients"
      >
        <EnterpriseClientsTrust />
      </div>
    </section>
  );
}
