import type { Metadata } from "next";

import { LegalList, LegalPageLayout, LegalTerm, type LegalSection } from "@/components/legal/legal-page-layout";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { listPublishedCaseStudySummaries } from "@/lib/admin/case-studies";
import { buildPageMetadata } from "@/lib/metadata";
import { getWebPageSchema } from "@/lib/schema";
import { canonicalPath } from "@/lib/site";

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How Comlabs Technologies Private Limited collects, uses, discloses and protects personal data across our website, client engagements and job applications.";
const LAST_UPDATED = "9 September 2026";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/privacy-policy",
});

const SECTIONS: LegalSection[] = [
  {
    id: "scope",
    heading: "Who this policy covers and what it applies to",
    body: (
      <>
        <p>
          This Privacy Policy explains how Comlabs Technologies Private Limited (&ldquo;Comlabs&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) collects, uses, discloses, stores and
          protects personal data. It applies to:
        </p>
        <LegalList
          items={[
            "Visitors to comlabstechnologies.com and its subdomains (the “Site”).",
            "Prospective and existing clients who contact us, request a proposal, or engage us for services.",
            "Job applicants who apply through our careers page.",
            "Individuals whose personal data we process on behalf of a client while delivering engineering, support, cloud or AI services (where we act as a data processor rather than a data controller).",
          ]}
        />
        <p>
          It does not apply to the practices of companies we do not own or control, including
          clients whose products we build or support, or third-party sites linked from ours. This
          policy is written to align with the Digital Personal Data Protection Act, 2023
          (&ldquo;DPDPA&rdquo;) and the Information Technology (Reasonable Security Practices and
          Sensitive Personal Data or Information) Rules, 2011 as they apply to a company operating
          in India, and reflects principles found in the EU/UK General Data Protection Regulation
          for visitors from those regions.
        </p>
      </>
    ),
  },
  {
    id: "data-we-collect",
    heading: "Information we collect",
    body: (
      <>
        <LegalTerm term="Information you provide directly">
          Name, email address, phone number, company name, job title, and the content of any
          message, when you submit our contact form, request a quote, or apply for a role through
          our careers page. Job applications may also include a resume/CV, portfolio links, and
          any other information you choose to include in your application.
        </LegalTerm>
        <LegalTerm term="Information collected automatically">
          When you browse the Site, we and our service providers automatically collect technical
          information such as your IP address, browser type and version, device type, operating
          system, referring URL, pages viewed, and timestamps, through server logs, Google
          Analytics, Vercel Analytics and Vercel Speed Insights.
        </LegalTerm>
        <LegalTerm term="Client and engagement data">
          When you engage us for services, we collect the information necessary to deliver that
          engagement &mdash; for example, billing contacts, project stakeholders, and, where the
          engagement requires it, access credentials, system logs, or end-user data belonging to
          our client&rsquo;s product. In these cases the client remains responsible for the
          lawfulness of that data and for instructing us on how it may be handled; we process it
          only as instructed and as described in the applicable services agreement.
        </LegalTerm>
        <p>We do not knowingly collect payment card numbers directly; payments are handled through the mechanism agreed with each client (such as bank transfer or a third-party payment processor), and we do not store full card details on our systems.</p>
      </>
    ),
  },
  {
    id: "cookies-and-tracking",
    heading: "Cookies and similar technologies",
    body: (
      <>
        <p>
          The Site uses cookies and comparable technologies set by the following services, each
          governed by its own privacy notice:
        </p>
        <LegalList
          items={[
            <>
              <span className="font-medium text-foreground">Google Analytics (GA4)</span> &mdash;
              measures site usage (pages viewed, session duration, referral source) using cookies
              and similar identifiers. See{" "}
              <a
                href="https://policies.google.com/privacy"
                className="underline underline-offset-2 hover:text-foreground"
              >
                Google&rsquo;s Privacy Policy
              </a>
              .
            </>,
            <>
              <span className="font-medium text-foreground">Vercel Analytics and Speed Insights</span>{" "}
              &mdash; measure page performance and aggregate traffic without using third-party
              advertising cookies.
            </>,
            <>
              <span className="font-medium text-foreground">Essential/functional cookies</span> &mdash;
              used where necessary to keep the Site working correctly, such as remembering a
              display preference.
            </>,
          ]}
        />
        <p>
          We do not currently operate a cookie-consent banner or preference centre on the Site.
          Most browsers let you block or delete cookies through their settings; doing so may
          affect analytics accuracy but will not prevent you from using the Site. If you are
          located in a jurisdiction that requires opt-in consent before non-essential cookies are
          set, please contact us using the details at the end of this policy and we will address
          your request.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-data",
    heading: "How we use personal data",
    body: (
      <>
        <p>We use the personal data described above to:</p>
        <LegalList
          items={[
            "Respond to enquiries submitted through the contact form and prepare proposals or quotes.",
            "Evaluate job applications and communicate with candidates about a role.",
            "Deliver, operate and support the services described in a signed statement of work or services agreement.",
            "Operate, secure, maintain and improve the Site, including diagnosing technical issues.",
            "Understand aggregate Site usage through analytics, to improve content and navigation.",
            "Comply with legal, tax, accounting and regulatory obligations.",
            "Enforce our Terms and Conditions and protect the rights, property and safety of Comlabs, our clients and other users.",
          ]}
        />
        <p>
          We do not sell personal data, and we do not use the personal data submitted through our
          contact or careers forms for third-party advertising.
        </p>
      </>
    ),
  },
  {
    id: "legal-basis",
    heading: "Legal basis for processing",
    body: (
      <>
        <p>
          Where the DPDPA, GDPR or a comparable law requires a lawful basis, we rely on one or
          more of the following:
        </p>
        <LegalList
          items={[
            "Your consent, given when you submit a form on the Site or otherwise provide information to us voluntarily, which you may withdraw at any time.",
            "Performance of a contract, where processing is necessary to deliver services you or your organisation have engaged us for, or to consider your job application.",
            "Legitimate interests, such as keeping the Site secure, understanding how it is used, and communicating with prospective clients — balanced against your rights and expectations.",
            "Compliance with a legal obligation, such as retaining records for tax or regulatory purposes.",
          ]}
        />
      </>
    ),
  },
  {
    id: "sharing",
    heading: "How we share information",
    body: (
      <>
        <p>We share personal data only in the following circumstances:</p>
        <LegalList
          items={[
            <>
              <span className="font-medium text-foreground">Service providers we rely on</span> to
              run the Site and our business, including Vercel (hosting and analytics), Cloudinary
              (image and media delivery), our email delivery provider, and Google (analytics). Each
              processes data under its own terms and only to the extent needed to provide its
              service to us.
            </>,
            "Professional advisors, such as accountants, auditors or legal counsel, where necessary and subject to confidentiality obligations.",
            "Regulators, courts or law enforcement, where required by law, to establish or defend a legal claim, or to protect the rights, safety or property of Comlabs or others.",
            "A successor entity, in the event of a merger, acquisition, financing or sale of some or all of our business, subject to the same protections described in this policy.",
          ]}
        />
        <p>
          We do not share job applicant data with clients, and we do not disclose client
          engagement data to third parties except as instructed by the client or as required to
          deliver the engagement (for example, to a cloud provider the client has authorised us to
          configure).
        </p>
      </>
    ),
  },
  {
    id: "international-transfers",
    heading: "International data transfers",
    body: (
      <p>
        Comlabs is based in Pune, Maharashtra, India, and our service providers &mdash; including
        Vercel, Cloudinary and Google &mdash; operate infrastructure in multiple countries. Where
        personal data is transferred outside your country of residence, including to India or the
        United States, we take reasonable steps to ensure it continues to receive an appropriate
        level of protection, consistent with the safeguards those providers publish in their own
        data processing terms.
      </p>
    ),
  },
  {
    id: "retention",
    heading: "Data retention",
    body: (
      <>
        <p>We retain personal data only as long as reasonably necessary for the purpose it was collected, specifically:</p>
        <LegalList
          items={[
            "Contact form enquiries that do not lead to an engagement are retained for up to 24 months, then deleted or anonymised.",
            "Job application data is retained for up to 12 months after a hiring decision, so we can consider you for future roles, unless you ask us to delete it sooner.",
            "Client engagement records, including contracts and billing information, are retained for as long as required by the applicable services agreement and, thereafter, for the period required by Indian tax and corporate record-keeping law (generally up to 8 years).",
            "Analytics data is retained according to the retention settings of the analytics provider (currently 14 months for Google Analytics).",
          ]}
        />
      </>
    ),
  },
  {
    id: "security",
    heading: "How we protect information",
    body: (
      <p>
        We apply administrative, technical and physical safeguards appropriate to the sensitivity
        of the data involved, including access controls limiting internal access to personal data
        on a need-to-know basis, encryption of data in transit (HTTPS/TLS) across the Site and our
        client systems, and reputable, security-audited infrastructure providers for hosting and
        storage. No method of transmission or storage is completely secure, and we cannot
        guarantee absolute security; if we become aware of a breach affecting your personal data,
        we will notify affected individuals and any relevant regulator as required by applicable
        law.
      </p>
    ),
  },
  {
    id: "your-rights",
    heading: "Your rights",
    body: (
      <>
        <p>
          Subject to applicable law, you may have the right to request access to, correction of,
          or erasure of your personal data, to withdraw consent where processing is based on
          consent, to object to or restrict certain processing, to receive a copy of your data in
          a portable format, and to lodge a complaint with the applicable data protection
          authority (in India, the Data Protection Board established under the DPDPA once
          operational; in the EU/UK, your local supervisory authority).
        </p>
        <p>
          To exercise any of these rights, contact us using the details at the end of this policy.
          We will respond within the timeframe required by applicable law, and may need to verify
          your identity before acting on a request.
        </p>
      </>
    ),
  },
  {
    id: "children",
    heading: "Children's privacy",
    body: (
      <p>
        The Site is intended for businesses and professionals and is not directed at children. We
        do not knowingly collect personal data from anyone under the age of 18. If you believe a
        child has provided us with personal data, please contact us and we will take steps to
        delete it.
      </p>
    ),
  },
  {
    id: "third-party-links",
    heading: "Third-party links",
    body: (
      <p>
        The Site may link to third-party websites, including client sites referenced in our case
        studies and our social media profiles. We are not responsible for the privacy practices or
        content of those sites. We encourage you to review the privacy policy of any site you
        visit.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time to reflect changes in our practices, the
        services we offer, or applicable law. We will revise the &ldquo;Last updated&rdquo; date at
        the top of this page when we do, and material changes will be indicated on this page for a
        reasonable period. We encourage you to review this policy periodically.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact us",
    body: (
      <p>
        If you have questions about this Privacy Policy, or want to exercise any of the rights
        described above, contact Comlabs Technologies Private Limited, Pune, Maharashtra, India, at{" "}
        <a
          href="mailto:admin@comlabstechnologies.com"
          className="font-medium text-foreground underline underline-offset-2 hover:text-[var(--warm-orange)]"
        >
          admin@comlabstechnologies.com
        </a>
        , or through our{" "}
        <a
          href={canonicalPath("/contact")}
          className="font-medium text-foreground underline underline-offset-2 hover:text-[var(--warm-orange)]"
        >
          contact page
        </a>
        .
      </p>
    ),
  },
];

export default async function PrivacyPolicyPage() {
  const summaries = await listPublishedCaseStudySummaries();
  const footerCaseStudies = summaries.map((study) => ({ label: study.title, href: study.href }));

  return (
    <>
      <JsonLdScript
        data={getWebPageSchema({ url: "/privacy-policy", name: TITLE, description: DESCRIPTION })}
      />
      <LegalPageLayout
        eyebrow="Legal"
        title="Privacy Policy"
        intro="How we collect, use, disclose and protect personal data across our website, client engagements and job applications."
        lastUpdated={LAST_UPDATED}
        sections={SECTIONS}
        footerCaseStudies={footerCaseStudies}
      />
    </>
  );
}
