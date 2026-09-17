import type { Metadata } from "next";

import { LegalList, LegalPageLayout, type LegalSection } from "@/components/legal/legal-page-layout";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { listPublishedCaseStudySummaries } from "@/lib/admin/case-studies";
import { buildPageMetadata } from "@/lib/metadata";
import { getWebPageSchema } from "@/lib/schema";
import { canonicalPath } from "@/lib/site";

const TITLE = "Refund Policy";
const DESCRIPTION =
  "How Comlabs Technologies Private Limited handles cancellations, deposits, milestone payments and refunds for engineering, support, cloud and AI engagements.";
const LAST_UPDATED = "9 September 2026";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/refund-policy",
});

const SECTIONS: LegalSection[] = [
  {
    id: "how-this-applies",
    heading: "How this policy applies to our engagements",
    body: (
      <>
        <p>
          Comlabs Technologies Private Limited (&ldquo;Comlabs&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo;) provides professional services &mdash; application support, AI and
          agentic engineering, AWS cloud and DevOps, custom software engineering, mobile
          engineering and digital experience work &mdash; rather than off-the-shelf products. This
          Refund Policy explains how cancellations, deposits, milestone payments and refunds are
          handled across those engagements. It supplements our{" "}
          <a
            href={canonicalPath("/terms-and-conditions")}
            className="font-medium text-foreground underline underline-offset-2 hover:text-[var(--warm-orange)]"
          >
            Terms and Conditions
          </a>{" "}
          and forms part of every Services Agreement, unless that agreement states different
          terms, in which case the Services Agreement controls.
        </p>
        <p>
          Because each engagement is scoped individually, the specific payment schedule,
          milestones, and any engagement-specific cancellation terms are set out in your Services
          Agreement. This page describes our default approach where the Services Agreement does
          not say otherwise.
        </p>
      </>
    ),
  },
  {
    id: "payment-structure",
    heading: "How engagements are typically billed",
    body: (
      <>
        <p>Depending on the engagement, we bill in one of the following structures:</p>
        <LegalList
          items={[
            <>
              <span className="font-medium text-foreground">Fixed-scope projects</span> &mdash;
              billed against agreed milestones (for example, an upfront deposit, a payment on
              acceptance of a design or architecture phase, and a final payment on delivery).
            </>,
            <>
              <span className="font-medium text-foreground">Retainers and ongoing support</span>{" "}
              &mdash; billed monthly in advance for a defined scope of hours or coverage (for
              example, L1&ndash;L4 application support).
            </>,
            <>
              <span className="font-medium text-foreground">Time and materials</span> &mdash;
              billed periodically (typically monthly) in arrears, based on time actually worked.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "deposits",
    heading: "Deposits and upfront payments",
    body: (
      <p>
        An upfront deposit, where required, reserves engineering capacity and covers planning,
        discovery and mobilisation work that begins immediately after signature. Once work has
        started, deposits are non-refundable except as described under{" "}
        <a
          href="#our-fault"
          className="font-medium text-foreground underline underline-offset-2 hover:text-[var(--warm-orange)]"
        >
          &ldquo;If we do not deliver what was agreed&rdquo;
        </a>{" "}
        below. If a signed Services Agreement is cancelled by the Client before any work has
        begun, we will refund the deposit in full, less any non-recoverable costs we have already
        committed on the Client&rsquo;s behalf (such as third-party licences purchased at the
        Client&rsquo;s request).
      </p>
    ),
  },
  {
    id: "milestone-cancellation",
    heading: "Cancelling a fixed-scope project mid-engagement",
    body: (
      <>
        <p>
          If a Client cancels a fixed-scope project after work has begun but before it is
          complete:
        </p>
        <LegalList
          items={[
            "We invoice for all work performed and all Deliverables completed up to the effective date of cancellation, calculated on a pro-rata or time-and-materials basis consistent with the project's rate card.",
            "Amounts already paid for milestones fully delivered and accepted before cancellation are not refunded.",
            "Amounts already paid for a milestone that has not yet been delivered are refunded, less any work-in-progress completed toward that milestone.",
            "Committed third-party costs incurred on the Client's behalf (cloud infrastructure, licences, contractor fees) that cannot reasonably be cancelled are the Client's responsibility and are not refundable by Comlabs.",
          ]}
        />
      </>
    ),
  },
  {
    id: "retainer-cancellation",
    heading: "Cancelling a retainer or support subscription",
    body: (
      <p>
        Retainers and ongoing support engagements may be cancelled by either party on the notice
        period stated in the Services Agreement (typically 30 days). The current billing period is
        not refunded once it has begun, since capacity for that period has already been reserved
        and, in the case of support retainers, coverage has been provided regardless of how many
        support hours were used. We will not bill for any billing period beginning after the
        effective date of cancellation.
      </p>
    ),
  },
  {
    id: "our-fault",
    heading: "If we do not deliver what was agreed",
    body: (
      <>
        <p>
          If Comlabs materially fails to deliver Services or Deliverables consistent with the
          specification in the Services Agreement, and does not cure that failure within a
          reasonable period after written notice from the Client (as defined in the Services
          Agreement, or 15 business days if not otherwise specified), the Client may be entitled
          to a refund of amounts paid for the undelivered or non-conforming portion of the
          engagement, at our discretion either as:
        </p>
        <LegalList
          items={[
            "A partial refund reflecting the proportion of the engagement not satisfactorily delivered, or",
            "Free re-performance of the non-conforming work, where re-performance is a reasonable remedy for the issue.",
          ]}
        />
        <p>
          This remedy does not apply to delays or shortfalls caused by the Client&rsquo;s own
          failure to meet the responsibilities described in our Terms and Conditions (for example,
          late feedback, incomplete access, or scope changes requested after work has begun), or by
          factors outside our reasonable control.
        </p>
      </>
    ),
  },
  {
    id: "non-refundable",
    heading: "What is never refundable",
    body: (
      <LegalList
        items={[
          "Work that has been completed, delivered and accepted by the Client.",
          "Third-party costs already incurred on the Client's instruction (cloud infrastructure spend, software licences, domain or certificate purchases, contractor or specialist fees).",
          "Payment processing or bank transfer charges incurred in issuing a refund, which are deducted from the refunded amount where permitted by law.",
        ]}
      />
    ),
  },
  {
    id: "how-to-request",
    heading: "How to request a refund or raise a dispute",
    body: (
      <p>
        To request a refund, or to raise a concern about delivered work, contact your Comlabs
        engagement lead directly, or email{" "}
        <a
          href="mailto:admin@comlabstechnologies.com"
          className="font-medium text-foreground underline underline-offset-2 hover:text-[var(--warm-orange)]"
        >
          admin@comlabstechnologies.com
        </a>{" "}
        with your company name, the relevant Services Agreement or invoice reference, and a
        description of the issue. We aim to acknowledge refund requests within 3 business days and
        resolve them, or provide a clear next step, within 15 business days. Approved refunds are
        issued using the same payment method used for the original payment wherever possible, and
        typically reach you within 7&ndash;10 business days of approval, subject to your bank or
        payment provider&rsquo;s processing times.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: (
      <p>
        We may update this Refund Policy from time to time; the &ldquo;Last updated&rdquo; date
        above reflects the most recent revision. Changes apply prospectively and do not alter the
        refund terms of a Services Agreement already signed.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact us",
    body: (
      <p>
        Questions about this Refund Policy can be sent to Comlabs Technologies Private Limited,
        Pune, Maharashtra, India, at{" "}
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

export default async function RefundPolicyPage() {
  const summaries = await listPublishedCaseStudySummaries();
  const footerCaseStudies = summaries.map((study) => ({ label: study.title, href: study.href }));

  return (
    <>
      <JsonLdScript
        data={getWebPageSchema({ url: "/refund-policy", name: TITLE, description: DESCRIPTION })}
      />
      <LegalPageLayout
        eyebrow="Legal"
        title="Refund Policy"
        intro="How cancellations, deposits, milestone payments and refunds are handled across our engagements."
        lastUpdated={LAST_UPDATED}
        sections={SECTIONS}
        footerCaseStudies={footerCaseStudies}
      />
    </>
  );
}
