import { cn } from "@/lib/utils";

type ClientLogo = {
  name: string;
  src: string;
  alt: string;
  imageClassName?: string;
};

const clients: ClientLogo[] = [
  {
    name: "Vodafone",
    src: "/logos/clients/vodafone.svg",
    alt: "Vodafone logo",
  },
  {
    name: "Jio",
    src: "/logos/clients/jio.svg",
    alt: "Jio logo",
  },
  {
    name: "Reliance Industries",
    src: "/logos/clients/reliance.svg",
    alt: "Reliance Industries logo",
  },
  {
    name: "Hathway",
    src: "/logos/clients/hathway.png",
    alt: "Hathway logo",
    imageClassName: "h-9",
  },
  {
    name: "Microscan",
    src: "/logos/clients/microscan.png",
    alt: "Microscan logo",
  },
  {
    name: "Formial Labs",
    src: "/logos/clients/formial-labs.png",
    alt: "Formial Labs logo",
  },
  {
    name: "Jindal Steel & Power",
    src: "/logos/clients/jindal-steel.png",
    alt: "Jindal Steel & Power logo",
  },
];

function LogoBox({ client }: { client: ClientLogo }) {
  return (
    <li className="flex min-w-[120px] flex-1 items-center justify-center px-8 py-5 sm:min-w-[140px]">
      <img
        src={client.src}
        alt={client.alt}
        className={cn("w-auto object-contain opacity-55", client.imageClassName ?? "h-6")}
      />
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
