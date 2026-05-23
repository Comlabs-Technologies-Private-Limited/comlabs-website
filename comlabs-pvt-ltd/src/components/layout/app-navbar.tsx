"use client";

import { AnimatePresence, LayoutGroup, motion, useScroll } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const ease = [0.25, 0.1, 0, 1] as const;

const navPrimaryCta = cn(
  "group inline-flex items-center gap-3 rounded-full bg-black py-1 pl-5 pr-1.5",
  "text-[13px] font-medium tracking-tight text-white",
  "shadow-[0_4px_14px_rgba(37,99,235,0.32)]",
  "transition-[background-color,box-shadow,transform] duration-150",
  "hover:bg-gray-900 hover:shadow-[0_6px_18px_rgba(37,99,235,0.38)]",
  "active:scale-[0.98]",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600/60",
);

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
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center">
      <div className="pointer-events-auto flex w-full flex-col gap-2">
        <div
          className={cn(
            glassPill,
            "flex min-h-[48px] items-center justify-start gap-2 pl-2 pr-2 py-1.5 md:min-h-[52px] md:gap-3 md:pl-5 md:pr-3 md:py-2",
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
            <nav className="relative hidden flex-1 ml-12 items-center justify-start gap-0.5 md:flex">
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
            <Link href="/#contact" className={cn(navPrimaryCta, "hidden md:inline-flex")}>
              <span>Start a project</span>
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden
              >
                <ArrowRight className="size-4 text-black" strokeWidth={2} />
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
                "overflow-hidden rounded-2xl border px-4 py-4 md:hidden",
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
                  className={cn(navPrimaryCta, "mt-2 w-full justify-between")}
                  onClick={() => setMobileOpen(false)}
                >
                  <span>Start a project</span>
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white"
                    aria-hidden
                  >
                    <ArrowRight className="size-4 text-blue-600" strokeWidth={2} />
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
