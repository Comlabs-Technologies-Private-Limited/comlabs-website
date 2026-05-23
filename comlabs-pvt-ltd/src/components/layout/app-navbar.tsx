"use client";

import { AnimatePresence, LayoutGroup, motion, useScroll } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { navPrimaryCtaClass, navPrimaryCtaIconClass } from "@/lib/nav-cta";

const ease = [0.25, 0.1, 0, 1] as const;

const navItems: { href: string; label: string; isActive: (path: string) => boolean }[] = [
  { href: "/", label: "Home", isActive: (p) => p === "/" },
  { href: "/#services", label: "Services", isActive: () => false },
  {
    href: "/case-studies",
    label: "Case Studies",
    isActive: (p) => p.startsWith("/case-studies"),
  },
  { href: "/blog", label: "Resources", isActive: (p) => p.startsWith("/blog") },
  { href: "/about", label: "About", isActive: (p) => p.startsWith("/about") },
];

export function AppNavbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [borderOpacity, setBorderOpacity] = useState(0);
  const [glassProgress, setGlassProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => {
      setBorderOpacity(Math.min(y / 24, 1));
      setGlassProgress(Math.min(y / 140, 1));
    });
    return () => unsub();
  }, [scrollY]);

  const blurPx = Math.round(glassProgress * 24);
  const saturate = 1 + glassProgress * 0.35;
  const backdrop =
    glassProgress > 0.01 ? `blur(${blurPx}px) saturate(${saturate})` : "none";

  const glassStyle = {
    backgroundColor: `rgba(254, 254, 254, ${0.92 * glassProgress})`,
    backdropFilter: backdrop,
    WebkitBackdropFilter: backdrop,
    borderColor: `rgba(0, 0, 0, ${(0.06 + 0.04 * borderOpacity) * glassProgress})`,
    boxShadow:
      glassProgress < 0.08
        ? "none"
        : `0 ${4 * glassProgress}px ${24 * glassProgress}px rgba(0,0,0,${0.06 * glassProgress}), 0 1px 2px rgba(0,0,0,${0.04 * glassProgress}), inset 0 1px 0 rgba(255,255,255,${0.55 * glassProgress})`,
  } as const;

  const glassPill = cn(
    "border border-transparent",
    "transition-[box-shadow,border-color,background-color,backdrop-filter] duration-300 ease-out",
    borderOpacity > 0.12 &&
      "shadow-[0_8px_32px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.6)]",
  );

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 w-full overflow-x-clip">
      <div className="pointer-events-auto flex w-full min-w-0 flex-col">
        <div
          className={cn(
            glassPill,
            "flex min-h-[48px] w-full min-w-0 items-center justify-between gap-2 py-1.5 pl-4 pr-4 md:min-h-[52px] md:gap-3 md:pl-8 md:pr-8 md:py-2",
          )}
          style={glassStyle}
        >
          <Link
            href="/"
            className="relative inline-flex shrink-0 items-center outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600/60"
          >
            <Image
              src="/logos/comlabslogo.png"
              alt="ComLabs technologies"
              width={720}
              height={280}
              priority
              className="h-7 w-auto md:h-12"
            />
          </Link>
          <LayoutGroup>
            <nav className="relative mx-auto hidden flex-1 ml-12 items-center justify-start gap-0.5 md:flex">
              {navItems.map((item) => {
                const active = item.isActive(pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative z-0 rounded-full px-3 py-1.5 text-[13px] font-normal transition-colors duration-100",
                      active
                        ? "text-[var(--fg-primary)]"
                        : "text-[var(--fg-secondary)] hover:text-[var(--fg-primary)]",
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-black/[0.06]"
                        transition={{ type: "tween", duration: 0.25, ease }}
                      />
                    ) : null}
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/#contact"
                className="rounded-full px-3 py-1.5 text-[13px] font-normal text-[var(--fg-secondary)] transition-colors duration-100 hover:text-[var(--fg-primary)]"
              >
                Contact
              </Link>
            </nav>
          </LayoutGroup>

          <div className="flex shrink-0 items-center gap-1 md:gap-2">
            <Link href="/#contact" className={cn(navPrimaryCtaClass, "hidden md:inline-flex")}>
              <span>Start a project</span>
              <span className={navPrimaryCtaIconClass} aria-hidden>
                <ArrowRight className="size-4 -rotate-45 text-black" strokeWidth={2} />
              </span>
            </Link>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--fg-primary)] transition-colors hover:bg-black/[0.05] md:hidden"
              aria-label="Menu"
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease }}
              className={cn(
                "overflow-hidden border-x-0 border-t-0 px-4 py-4 md:hidden",
                "border-black/[0.06] bg-white/[0.52] shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-2xl backdrop-saturate-[1.35]",
              )}
            >
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-2 text-[13px] font-normal text-[var(--fg-secondary)]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/#contact"
                  className="rounded-lg px-3 py-2 text-[13px] font-normal text-[var(--fg-secondary)]"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/#contact"
                  className={cn(navPrimaryCtaClass, "mt-2 w-full justify-between")}
                  onClick={() => setMobileOpen(false)}
                >
                  <span>Start a project</span>
                  <span className={navPrimaryCtaIconClass} aria-hidden>
                    <ArrowRight className="size-4 -rotate-45 text-black" strokeWidth={2} />
                  </span>
                </Link>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
