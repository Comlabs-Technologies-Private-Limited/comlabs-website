import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { JsonLdScript } from "@/components/seo/json-ld-script";
import { getBreadcrumbSchema } from "@/lib/schema";
import { canonicalPath, canonicalUrl } from "@/lib/site";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageBreadcrumbsProps = {
  items: BreadcrumbItem[];
  /** Canonical path for the current page, e.g. `/services/cms-development`. */
  currentPath: string;
};

export function PageBreadcrumbs({ items, currentPath }: PageBreadcrumbsProps) {
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
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                <ChevronRight size={14} className="shrink-0 opacity-60" aria-hidden />
                {isLast || !item.href ? (
                  <span className="text-foreground">{item.label}</span>
                ) : (
                  <Link
                    href={canonicalPath(item.href)}
                    className="transition-colors hover:text-foreground"
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
