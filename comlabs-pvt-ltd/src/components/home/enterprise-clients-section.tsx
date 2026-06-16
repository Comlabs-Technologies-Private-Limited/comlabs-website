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
  {
    name: "Jindal Steel & Power",
    type: "image",
    src: "/logos/clients/jindal-steel.png",
    alt: "Jindal Steel & Power logo",
  },
];

function LogoBox({ client }: { client: ClientLogo }) {
  return (
    <li className="flex min-w-[120px] flex-1 items-center justify-center border border-border px-8 py-5 sm:min-w-[140px]">
      {client.type === "icon" ? (
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={client.icon.title}
          className="h-6 w-auto text-foreground/50"
        >
          <path fill="currentColor" d={client.icon.path} />
        </svg>
      ) : client.type === "image" ? (
        <img
          src={client.src}
          alt={client.alt}
          className="h-6 w-auto object-contain opacity-55"
        />
      ) : (
        <span
          className="whitespace-nowrap text-[15px] font-semibold tracking-tight text-foreground/90"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {client.label}
          {client.emphasis ? (
            <span className="font-medium text-foreground/35">{client.emphasis}</span>
          ) : null}
        </span>
      )}
    </li>
  );
}

export function EnterpriseClientsTrust({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p className="mb-6 text-center text-[18px] text-muted-foreground">
        Trusted by the people building inside India&apos;s biggest companies
      </p>

      <ul className="flex flex-wrap items-stretch justify-center">
        {clients.map((client) => (
          <LogoBox key={client.name} client={client} />
        ))}
      </ul>
    </div>
  );
}

export function EnterpriseClientsSection() {
  return (
    <section className="px-6 py-10 md:py-14" aria-label="Trusted clients">
      <div className="mx-auto max-w-5xl">
        <EnterpriseClientsTrust />
      </div>
    </section>
  );
}
