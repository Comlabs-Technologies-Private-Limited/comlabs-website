import Image from "next/image";
import Link from "next/link";

import { canonicalPath, isBlogPublic, siteDescriptor, siteLocation, siteName } from "@/lib/site";

const FOOTER_COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Contact", href: "/contact" },
      ...(isBlogPublic() ? [{ label: "Blog", href: "/blog" }] : []),
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "All services", href: "/services" },
      { label: "Website design & development", href: "/services/website-design-development" },
      { label: "Website redesign", href: "/services/website-redesign" },
      { label: "CMS development", href: "/services/cms-development" },
      { label: "ERP development", href: "/services/erp-development" },
      { label: "Product UI development", href: "/services/product-ui-development" },
    ],
  },
  {
    heading: "Work",
    links: [
      { label: "Case studies", href: "/work" },
      { label: "Global Services", href: "/work/global-services" },
      { label: "Formial Labs", href: "/work/formula-lab" },
      { label: "Vithub", href: "/work/with-hub" },
    ],
  },
] as const;

type FigmaFooterProps = {
  showBlogLink?: boolean;
};

export function FigmaFooter({ showBlogLink = true }: FigmaFooterProps) {
  const columns = FOOTER_COLUMNS.map((col) => {
    if (col.heading !== "Company" || showBlogLink || !isBlogPublic()) {
      return col;
    }
    return {
      ...col,
      links: col.links.filter((link) => link.label !== "Blog"),
    };
  });

  return (
    <footer className="border-t border-border px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <Link href="/" className="mb-3 block" aria-label="Comlabs home">
              <Image
                src="/logo.png"
                alt="Comlabs Technologies Pvt Ltd"
                width={112}
                height={40}
                className="h-22 -ml-4 w-auto"
                style={{ mixBlendMode: "multiply" }}
              />
            </Link>
            <p className="text-sm font-medium text-foreground">{siteName}</p>
            <p className="mt-1 text-sm text-muted-foreground">{siteDescriptor}</p>
            <p className="mt-1 text-sm text-muted-foreground">{siteLocation}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm md:grid-cols-3">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  {col.heading}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={canonicalPath(link.href)}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-8 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
