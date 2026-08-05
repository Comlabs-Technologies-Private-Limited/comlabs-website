import { getOrganizationSchema, getWebsiteSchema } from "@/lib/schema";
import { JsonLdScript } from "@/components/seo/json-ld-script";

export function HomeJsonLd() {
  return (
    <>
      <JsonLdScript data={getOrganizationSchema()} />
      <JsonLdScript data={getWebsiteSchema()} />
    </>
  );
}
