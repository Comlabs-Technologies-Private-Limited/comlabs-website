import { ComlabsMark } from "@/components/brand/comlabs-mark";
import {
  DIGITAL_MARKETING_CONTACT_EMAIL,
  DIGITAL_MARKETING_PATH,
} from "@/lib/digital-marketing";
import { DM } from "@/lib/digital-marketing-media";

const FOOTER_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Posts", href: "#posts" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export function DigitalMarketingFooter() {
  return (
    <footer
      className="border-t px-5 py-14 md:px-6 lg:px-12 xl:px-16"
      style={{ background: DM.bg, borderColor: DM.hairline, color: DM.text }}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div>
            <a href={DIGITAL_MARKETING_PATH} className="mb-4 inline-block" aria-label="Digital marketing home">
              <ComlabsMark className="h-8 w-auto" />
            </a>
            <p className="text-sm font-medium tracking-tight">Digital marketing</p>
            <p className="mt-1 text-sm" style={{ color: DM.muted }}>
              Strategy, creative and performance as one system.
            </p>
            <a
              href={`mailto:${DIGITAL_MARKETING_CONTACT_EMAIL}`}
              className="mt-4 inline-block text-sm underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2"
              style={{ color: DM.muted }}
            >
              {DIGITAL_MARKETING_CONTACT_EMAIL}
            </a>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:justify-end">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2"
                    style={{ color: DM.muted }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t pt-8 text-xs" style={{ borderColor: DM.hairline, color: DM.muted }}>
          <p>© {new Date().getFullYear()} Comlabs Digital Marketing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
