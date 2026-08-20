import Image from "next/image";

import { cn } from "@/lib/utils";

type ClientLogo = {
  name: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  imageClassName?: string;
};

const clients: ClientLogo[] = [
  {
    name: "Vodafone",
    src: "/logos/clients/vodafone.svg",
    alt: "Vodafone logo",
    width: 120,
    height: 24,
  },
  {
    name: "Jio",
    src: "/logos/clients/jio.svg",
    alt: "Jio logo",
    width: 72,
    height: 24,
  },
  {
    name: "Reliance Industries",
    src: "/logos/clients/reliance.svg",
    alt: "Reliance Industries logo",
    width: 140,
    height: 24,
  },
  {
    name: "Hathway",
    src: "/logos/clients/hathway.png",
    alt: "Hathway logo",
    width: 120,
    height: 36,
    imageClassName: "h-9 w-auto",
  },
  {
    name: "Microscan",
    src: "/logos/clients/microscan.png",
    alt: "Microscan logo",
    width: 140,
    height: 24,
  },
  {
    name: "Formial Labs",
    src: "/logos/clients/formial-labs.png",
    alt: "Formial Labs logo",
    width: 140,
    height: 24,
  },
  {
    name: "Jindal Steel & Power",
    src: "/logos/clients/jindal-steel.png",
    alt: "Jindal Steel & Power logo",
    width: 120,
    height: 24,
  },
];

function LogoBox({ client }: { client: ClientLogo }) {
  return (
    <li className="flex min-w-[120px] flex-1 items-center justify-center px-8 py-5 sm:min-w-[140px]">
      <Image
        src={client.src}
        alt={client.alt}
        width={client.width}
        height={client.height}
        sizes="140px"
        loading="lazy"
        fetchPriority="low"
        className={cn("h-6 w-auto object-contain opacity-55", client.imageClassName)}
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
