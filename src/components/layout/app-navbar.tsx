"use client";

import { AnimatePresence, LayoutGroup, motion, useScroll } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ComlabsLogo } from "@/components/brand/comlabs-logo";
import { canonicalPath } from "@/lib/site";
import { cn } from "@/lib/utils";
import { navPrimaryCtaClass, navPrimaryCtaIconClass } from "@/lib/nav-cta";

const ease = [0.25, 0.1, 0, 1] as const;
const pillSpring = { type: "spring" as const, stiffness: 420, damping: 34 };

const navItems: {
  href: string;
  label: string;
  id: string;
  sectionId?: string;
}[] = [
  { href: "/", label: "Home", id: "home" },
  { href: "/services", label: "Services", id: "services" },
  { href: "/work", label: "Work", id: "work", sectionId: "work" },
  { href: "/about", label: "About", id: "about" },
];

function useActiveNavItem(pathname: string) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = navItems.map((item) => item.sectionId).filter(Boolean) as string[];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    const syncHome = () => {
      if (window.scrollY < 96) {
        setActiveSection(null);
      }
    };

    syncHome();
    window.addEventListener("scroll", syncHome, { passive: true });

    if (sections.length === 0) {
      return () => window.removeEventListener("scroll", syncHome);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 96) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-32% 0px -52% 0px", threshold: [0, 0.15, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", syncHome);
      observer.disconnect();
    };
  }, [pathname]);

  return (item: (typeof navItems)[number]) => {
    if (pathname !== "/") return false;
    if (item.id === "home") return activeSection === null;
    return item.sectionId === activeSection;
  };
}

export function AppNavbar() {
  const pathname = usePathname();
  const isActive = useActiveNavItem(pathname);
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
            "grid min-h-[48px] w-full min-w-0 grid-cols-[1fr_auto] items-center gap-2 py-1.5 pl-4 pr-4 md:min-h-[52px] md:grid-cols-[1fr_auto_1fr] md:gap-3 md:pl-8 md:pr-8 md:py-2",
          )}
          style={glassStyle}
        >
          <Link
            href="/"
            className="relative inline-flex shrink-0 items-center justify-self-start outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600/60"
          >
            <ComlabsLogo decorative className="h-5 w-auto" />
          </Link>

          <LayoutGroup id="main-nav">
            <nav className="relative hidden items-center justify-center gap-0.5 md:flex">
              {navItems.map((item) => {
                const active = isActive(item);
                return (
                  <Link
                    key={item.id}
                    href={canonicalPath(item.href)}
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
                        className="absolute inset-0 rounded-full bg-black/[0.06]"
                        transition={{ layout: pillSpring }}
                      />
                    ) : null}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
              <Link
                href={canonicalPath("/contact")}
                className="relative z-0 rounded-full px-3 py-1.5 text-[13px] font-normal text-[var(--fg-secondary)] transition-colors duration-100 hover:text-[var(--fg-primary)]"
              >
                Contact
              </Link>
            </nav>
          </LayoutGroup>

          <div className="flex shrink-0 items-center justify-self-end gap-1 md:gap-2">
            <Link href={canonicalPath("/contact")} className={cn(navPrimaryCtaClass, "hidden md:inline-flex")}>
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
                    key={item.id}
                    href={canonicalPath(item.href)}
                    className="rounded-lg px-3 py-2 text-[13px] font-normal text-[var(--fg-secondary)]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href={canonicalPath("/contact")}
                  className="rounded-lg px-3 py-2 text-[13px] font-normal text-[var(--fg-secondary)]"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href={canonicalPath("/contact")}
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
