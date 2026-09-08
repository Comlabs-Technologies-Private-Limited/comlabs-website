import { getFaqPageSchema, getOrganizationSchema, getWebsiteSchema } from "@/lib/schema";
import { HOME_FAQS } from "@/lib/home-faqs";
import { JsonLdScript } from "@/components/seo/json-ld-script";

export function HomeJsonLd() {
  return (
    <>
      <JsonLdScript data={getOrganizationSchema()} />
      <JsonLdScript data={getWebsiteSchema()} />
      <JsonLdScript data={getFaqPageSchema([...HOME_FAQS])} />
    </>
  );
}
