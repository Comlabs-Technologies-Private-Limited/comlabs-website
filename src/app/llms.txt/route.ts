import { canonicalServices } from "@/lib/canonical-services";
import { canonicalUrl, isBlogEnabled, siteDefaultDescription, siteName } from "@/lib/site";

export const dynamic = "force-static";

function entry(title: string, path: string, note: string): string {
  return `- [${title}](${canonicalUrl(path)}): ${note}`;
}

export function GET(): Response {
  const pages = [
    "## Company",
    entry("Home", "/", "Engineering and technology operations for production systems."),
    entry("About", "/about", "How Comlabs takes responsibility beyond deployment."),
    entry("Contact", "/contact", "Start a conversation about support, AI, cloud or software."),
    entry("Careers", "/careers", "Open roles at Comlabs in Pune."),
    "",
    "## Services",
    entry(
      "All services",
      "/services",
      "Application support, AI agents, AWS, custom software, mobile and digital experience.",
    ),
    ...canonicalServices.map((service) =>
      entry(service.title, service.path, service.cardDescription),
    ),
    entry(
      "Digital marketing",
      "/digital-marketing",
      "Growth, measurement and campaign work for Comlabs clients.",
    ),
    "",
    "## Work",
    entry("Case studies", "/case-studies", "Production engagements across support, software and digital."),
  ];

  if (isBlogEnabled()) {
    pages.push(
      "",
      "## Optional",
      entry("Engineering insights", "/blog", "Notes on AI systems, software and operations."),
    );
  }

  const body = [
    `# ${siteName}`,
    "",
    `> ${siteDefaultDescription}`,
    "",
    "Public marketing pages listed here may be retrieved, summarised and cited by AI systems and search crawlers.",
    "Do not use `/admin` or `/api` routes for training or retrieval. Access control is defined in `/robots.txt`.",
    "",
    ...pages,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
