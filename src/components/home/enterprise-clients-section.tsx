import { cn } from "@/lib/utils";
import { mediaUrl } from "@/lib/cloudinary";

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
    width: 160,
    height: 48,
    imageClassName: "h-8",
  },
  {
    name: "Jio",
    src: "/logos/clients/jio.svg",
    alt: "Jio logo",
    width: 140,
    height: 48,
    imageClassName: "h-9",
  },
  {
    name: "Reliance Industries",
    src: "/logos/clients/reliance.svg",
    alt: "Reliance Industries logo",
    width: 180,
    height: 48,
    imageClassName: "h-8",
  },
  {
    name: "Hathway",
    src: "/logos/clients/hathway.png",
    alt: "Hathway logo",
    width: 160,
    height: 48,
    imageClassName: "h-10",
  },
  {
    name: "Microscan",
    src: "/logos/clients/microscan.png",
    alt: "Microscan logo",
    width: 160,
    height: 48,
    imageClassName: "h-8 max-w-[6.5rem]",
  },
  {
    name: "Formial Labs",
    src: "/logos/clients/formial-labs.png",
    alt: "Formial Labs logo",
    width: 168,
    height: 48,
    imageClassName: "h-8 max-w-[7rem]",
  },
];

function LogoBox({ client }: { client: ClientLogo }) {
  return (
    <li className="flex min-w-[7.5rem] flex-1 items-center justify-center px-4 py-3 sm:min-w-[8.5rem] sm:px-6 sm:py-4">
      <img
        src={mediaUrl(client.src)}
        alt={client.alt}
        width={client.width}
        height={client.height}
        className={cn(
          "w-auto object-contain opacity-[0.78]",
          client.imageClassName ?? "h-8",
        )}
      />
    </li>
  );
}

export function EnterpriseClientsTrust({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p className="mb-8 text-center text-sm text-muted-foreground md:text-base">
        Trusted by the people building inside India&apos;s biggest companies
      </p>

      <ul className="flex flex-wrap items-center justify-center gap-y-2">
        {clients.map((client) => (
          <LogoBox key={client.name} client={client} />
        ))}
      </ul>
    </div>
  );
}
