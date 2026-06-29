import Image from "next/image";
import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Web Dev", href: "/#services" },
      { label: "UI Design", href: "/#services" },
      { label: "CMS", href: "/#services" },
      { label: "Maintenance", href: "/#services" },
    ],
  },
  {
    heading: "Work",
    links: [
      { label: "Projects", href: "/#work" },
      { label: "Case Studies", href: "/#work" },
      { label: "Testimonials", href: "/#testimonials" },
    ],
  },
] as const;

export function FigmaFooter() {
  return (
    <footer className="border-t border-border px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <Link href="/" className="mb-3 block" aria-label="Comlabs home">
              <Image
                src="/logo.png"
                alt="Comlabs"
                width={112}
                height={40}
                className="h-22 -ml-4 w-auto"
                style={{ mixBlendMode: "multiply" }}
              />
            </Link>
            <p className="text-sm text-muted-foreground">Design & development studio.</p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm md:grid-cols-3">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading}>
                <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  {col.heading}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
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
          <p>© {new Date().getFullYear()} Comlabs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
