import Link from "next/link";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNavLoader } from "@/components/layout/figma-nav-loader";
import { canonicalPath } from "@/lib/site";

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <FigmaNavLoader />
      <main className="mx-auto flex max-w-6xl flex-col items-start px-6 py-32">
        <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          404
        </p>
        <h1 className="text-2xl font-medium tracking-tight md:text-4xl">Page not found.</h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href={canonicalPath("/")}
          className="mt-8 text-sm text-[var(--warm-orange)] transition-opacity hover:opacity-80"
        >
          Back to home
        </Link>
      </main>
      <FigmaFooter />
    </div>
  );
}
