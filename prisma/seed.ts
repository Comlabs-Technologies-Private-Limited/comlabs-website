import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

import { formialLabsCaseStudy } from "@/lib/case-studies/formial-labs";
import { globalServicesCaseStudy } from "@/lib/case-studies/global-services";
import { vithubCaseStudy } from "@/lib/case-studies/vithub";
import { getPrisma } from "@/lib/prisma";

const STATIC_CASE_STUDIES = [formialLabsCaseStudy, globalServicesCaseStudy, vithubCaseStudy];

async function main() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is required to seed the database.");
    process.exit(1);
  }

  const prisma = getPrisma();

  for (const caseStudy of STATIC_CASE_STUDIES) {
    await prisma.caseStudy.upsert({
      where: { slug: caseStudy.slug },
      update: {
        client: caseStudy.client,
        year: caseStudy.year,
        headline: caseStudy.headline,
        standfirst: caseStudy.standfirst,
        meta: caseStudy.meta,
        leadImage: caseStudy.leadImage,
        sections: caseStudy.sections,
        status: "published",
      },
      create: {
        slug: caseStudy.slug,
        client: caseStudy.client,
        year: caseStudy.year,
        headline: caseStudy.headline,
        standfirst: caseStudy.standfirst,
        meta: caseStudy.meta,
        leadImage: caseStudy.leadImage,
        sections: caseStudy.sections,
        status: "published",
        metaTitle: `${caseStudy.client} — Case Study`,
        metaDescription: caseStudy.standfirst,
      },
    });
    console.log(`Seeded case study: ${caseStudy.slug}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    const prisma = getPrisma();
    await prisma.$disconnect();
  });
