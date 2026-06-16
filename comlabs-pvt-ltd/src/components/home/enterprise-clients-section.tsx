import type { SimpleIcon } from "simple-icons";
import { siJio, siVodafone } from "simple-icons";

type ClientLogo =
  | { name: string; type: "icon"; icon: SimpleIcon }
  | { name: string; type: "image"; src: string; alt: string }
  | { name: string; type: "wordmark"; label: string; emphasis?: string };

const clients: ClientLogo[] = [
  { name: "Vodafone", type: "icon", icon: siVodafone },
  { name: "Jio", type: "icon", icon: siJio },
  {
    name: "Formial Labs",
    type: "image",
    src: "/logos/clients/formial-labs.png",
    alt: "Formial Labs logo",
  },
  { name: "Vithub.in", type: "wordmark", label: "Vithub", emphasis: ".in" },
];

function BrandIcon({ icon }: { icon: SimpleIcon }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={icon.title}
      className="h-7 w-auto shrink-0 text-foreground/55 transition-colors duration-200 hover:text-foreground/80 md:h-8"
    >
      <path fill="currentColor" d={icon.path} />
    </svg>
  );
}

function BrandWordmark({
  label,
  emphasis,
}: {
  label: string;
  emphasis?: string;
}) {
  return (
    <span
      className="whitespace-nowrap text-[15px] font-semibold tracking-tight text-foreground/55 transition-colors duration-200 hover:text-foreground/80 md:text-base"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {label}
      {emphasis ? (
        <span className="font-medium text-foreground/40">{emphasis}</span>
      ) : null}
    </span>
  );
}

function BrandImage({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="h-8 w-auto object-contain opacity-75 md:h-9" />;
}

type EnterpriseStat = { value: string; label: string };

export function EnterpriseClientsSection({ stats }: { stats: EnterpriseStat[] }) {
  return (
    <section className="bg-background px-6 py-10 md:py-12" aria-label="Enterprise experience">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-card">
        <div className="px-6 py-8 md:px-10 md:py-10">
          <p
            className="text-center text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Trusted by ambitious teams
          </p>
          <h3
            className="mx-auto mt-4 max-w-2xl text-center text-2xl leading-tight font-semibold tracking-tight text-foreground md:text-[2rem]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Trusted by product teams and founders building serious digital products.
          </h3>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14 lg:gap-x-16">
            {clients.map((client) => (
              <li key={client.name} className="flex items-center justify-center">
                {client.type === "icon" ? (
                  <BrandIcon icon={client.icon} />
                ) : client.type === "image" ? (
                  <BrandImage src={client.src} alt={client.alt} />
                ) : (
                  <BrandWordmark label={client.label} emphasis={client.emphasis} />
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 border-t border-border md:grid-cols-4">
          {stats.map((s, index) => (
            <div
              key={s.label}
              className={`px-6 py-7 text-center md:px-8 ${index % 2 === 1 ? "border-l border-border md:border-l" : ""} ${
                index > 1 ? "border-t border-border md:border-t-0" : ""
              } ${index > 0 ? "md:border-l md:border-border" : ""}`}
            >
              <div className="text-3xl font-bold tracking-tight text-foreground" style={{ letterSpacing: "-0.03em" }}>
                {s.value}
              </div>
              <div
                className="mt-2 text-[10px] font-medium tracking-[0.18em] text-muted-foreground uppercase"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
