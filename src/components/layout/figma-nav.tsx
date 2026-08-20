import Image from "next/image";
import Link from "next/link";

import { FigmaMobileNav } from "@/components/layout/figma-mobile-nav";
import { canonicalPath, isBlogPublic } from "@/lib/site";

const BASE_NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
] as const;

type FigmaNavProps = {
  showBlogLink?: boolean;
};

export function FigmaNav({ showBlogLink = true }: FigmaNavProps) {
  const navLinks = [
    ...BASE_NAV_LINKS,
    ...(showBlogLink && isBlogPublic() ? [{ label: "Blog", href: "/blog" }] : []),
  ];

  return (
    <header
      className="sticky top-0 z-50 border-b border-border"
      style={{ background: "rgba(247,247,244,0.88)", backdropFilter: "blur(12px)" }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="Comlabs home">
          <Image
            src="/logo.png"
            alt="Comlabs Technologies Pvt Ltd logo"
            className="h-22 w-28"
            height={88}
            width={112}
            sizes="112px"
            priority
            style={{ mixBlendMode: "multiply" }}
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={canonicalPath(link.href)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={canonicalPath("/contact")}
            className="rounded-full px-4 py-1.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            style={{ background: "var(--foreground)" }}
          >
            Get Started
          </Link>
        </div>

        <FigmaMobileNav navLinks={navLinks} />
      </div>
    </header>
  );
}
