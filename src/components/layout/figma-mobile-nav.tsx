import Image from "next/image";
import Link from "next/link";

import { canonicalPath } from "@/lib/site";

type NavLink = {
  label: string;
  href: string;
};

type FigmaMobileNavProps = {
  navLinks: readonly NavLink[];
};

export function FigmaMobileNav({ navLinks }: FigmaMobileNavProps) {
  return (
    <>
      <input id="mobile-nav-toggle" type="checkbox" className="peer sr-only" />
      <label
        htmlFor="mobile-nav-toggle"
        className="-mr-2 flex h-10 w-10 cursor-pointer items-center justify-center text-foreground md:hidden"
        aria-label="Open menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>

      <div
        id="mobile-nav-panel"
        className="invisible pointer-events-none fixed inset-0 z-[60] overflow-hidden peer-checked:visible peer-checked:pointer-events-auto md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <label
          htmlFor="mobile-nav-toggle"
          className="absolute inset-0 bg-foreground/20 backdrop-blur-[2px]"
          aria-label="Close menu"
        />

        <div
          className="relative flex flex-col"
          style={{
            background: "var(--background)",
            paddingTop: "env(safe-area-inset-top)",
          }}
        >
          <div className="flex h-14 items-center justify-between px-6">
            <Link href="/" aria-label="Comlabs home">
              <Image
                src="/logo.png"
                alt="Comlabs Technologies Pvt Ltd logo"
                className="h-22 w-28"
                height={88}
                width={112}
                sizes="112px"
                style={{ mixBlendMode: "multiply" }}
              />
            </Link>
            <label
              htmlFor="mobile-nav-toggle"
              className="-mr-2 flex h-10 w-10 cursor-pointer items-center justify-center text-foreground"
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </label>
          </div>

          <nav
            id="mobile-navigation"
            className="flex flex-col gap-4 border-t border-border px-6 py-5"
            aria-label="Mobile"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={canonicalPath(link.href)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={canonicalPath("/contact")}
              className="rounded-full bg-foreground px-4 py-2.5 text-center text-sm font-semibold text-background"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
