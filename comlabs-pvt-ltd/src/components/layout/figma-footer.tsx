const FOOTER_COLUMNS = [
  { heading: "Company", links: ["About", "Blog", "Careers", "Contact"] },
  { heading: "Services", links: ["Web Dev", "UI Design", "CMS", "Maintenance"] },
  { heading: "Work", links: ["Projects", "Case Studies", "Testimonials"] },
];

export function FigmaFooter() {
  return (
    <footer className="border-t border-border px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <a href="/" className="mb-3 block" aria-label="Comlabs home">
              <img
                src="/logo.png"
                alt="Comlabs"
                className="h-22 -ml-4 w-auto"
                style={{ mixBlendMode: "multiply" }}
              />
            </a>
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
                    <li key={link}>
                      <a
                        href="/"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
          <p>© 2025 Comlabs. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <a key={l} href="/" className="transition-colors hover:text-foreground">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
