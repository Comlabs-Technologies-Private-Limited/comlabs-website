import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";
import { canonicalPath, siteName } from "@/lib/site";

export function ThankYouPage() {
  return (
    <div
      className="flex min-h-screen flex-col bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <FigmaNav />

      <main className="relative flex flex-1 flex-col items-center justify-center px-6 py-20 md:py-28">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(247,247,244,0.92) 0%, rgba(247,247,244,0.78) 45%, rgba(247,247,244,0.94) 100%), url('/hero/hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center right",
          }}
          aria-hidden
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 right-[-10%] h-[18rem] w-[18rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(201,100,66,0.14) 0%, rgba(201,100,66,0.05) 40%, rgba(201,100,66,0) 72%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-xl text-center">
          <div
            className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card"
            style={{ boxShadow: "0 2px 24px rgba(28,25,23,0.07)" }}
          >
            <Check size={22} style={{ color: "var(--warm-orange)" }} aria-hidden />
          </div>

          <p
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium"
            style={{ color: "var(--warm-orange)", background: "var(--warm-orange-light)" }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--warm-orange)" }}
            />
            Message received
          </p>

          <h1
            className="text-3xl leading-[1.08] font-bold tracking-tight md:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Thank you for choosing {siteName}.
          </h1>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Our team will contact you within 48 hours.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={canonicalPath("/")}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              style={{ background: "var(--foreground)" }}
            >
              Back to home <ArrowRight size={14} />
            </Link>
            <Link
              href={canonicalPath("/work")}
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
            >
              View our work
            </Link>
          </div>
        </div>
      </main>

      <FigmaFooter />
    </div>
  );
}
