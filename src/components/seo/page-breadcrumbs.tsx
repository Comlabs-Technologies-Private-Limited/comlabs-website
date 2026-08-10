import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { JsonLdScript } from "@/components/seo/json-ld-script";
import { getBreadcrumbSchema } from "@/lib/schema";
import { editorialHeroText } from "@/lib/editorial-hero-styles";
import { canonicalPath, canonicalUrl } from "@/lib/site";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageBreadcrumbsProps = {
  items: BreadcrumbItem[];
  /** Canonical path for the current page, e.g. `/services/custom-software-development`. */
  currentPath: string;
  tone?: "light" | "dark";
  className?: string;
};

export function PageBreadcrumbs({
  items,
  currentPath,
  tone = "light",
  className,
}: PageBreadcrumbsProps) {
  const isDark = tone === "dark";
  const schemaItems = [
    { name: "Home", url: canonicalUrl("/") },
    ...items.map((item, index) => {
      const isLast = index === items.length - 1;
      const path = isLast ? currentPath : item.href;
      return {
        name: item.label,
        url: canonicalUrl(path ?? currentPath),
      };
    }),
  ];

  return (
    <>
      <JsonLdScript data={getBreadcrumbSchema(schemaItems)} />
      <nav aria-label="Breadcrumb" className={className ?? "mb-6 md:mb-8"}>
        <ol
          className={`flex flex-wrap items-center gap-1.5 text-xs md:text-sm ${isDark ? "" : "text-muted-foreground"}`}
          style={isDark ? { color: editorialHeroText.breadcrumb } : undefined}
        >
          <li>
            <Link
              href="/"
              className={
                isDark ? "transition-opacity hover:opacity-100" : "transition-colors hover:text-foreground"
              }
              style={isDark ? { color: editorialHeroText.breadcrumb } : undefined}
            >
              Home
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                <ChevronRight size={14} className="shrink-0 opacity-60" aria-hidden />
                {isLast || !item.href ? (
                  <span
                    className={isDark ? undefined : "text-foreground"}
                    style={isDark ? { color: editorialHeroText.breadcrumbCurrent } : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={canonicalPath(item.href)}
                    className={
                      isDark
                        ? "transition-opacity hover:opacity-100"
                        : "transition-colors hover:text-foreground"
                    }
                    style={isDark ? { color: editorialHeroText.breadcrumb } : undefined}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
