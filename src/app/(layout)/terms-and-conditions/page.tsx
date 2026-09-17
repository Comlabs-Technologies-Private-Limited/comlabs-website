import type { Metadata } from "next";

import { LegalList, LegalPageLayout, LegalTerm, type LegalSection } from "@/components/legal/legal-page-layout";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { listPublishedCaseStudySummaries } from "@/lib/admin/case-studies";
import { buildPageMetadata } from "@/lib/metadata";
import { getWebPageSchema } from "@/lib/schema";
import { canonicalPath } from "@/lib/site";

const TITLE = "Terms and Conditions";
const DESCRIPTION =
  "The terms that govern use of comlabstechnologies.com and engagements for application support, AI, cloud and software engineering services with Comlabs Technologies Private Limited.";
const LAST_UPDATED = "9 September 2026";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/terms-and-conditions",
});

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    heading: "Acceptance of these terms",
    body: (
      <>
        <p>
          These Terms and Conditions (&ldquo;Terms&rdquo;) govern your use of
          comlabstechnologies.com (the &ldquo;Site&rdquo;) and, together with any signed
          statement of work, proposal, or services agreement (a &ldquo;Services Agreement&rdquo;),
          govern engagements for services provided by Comlabs Technologies Private Limited
          (&ldquo;Comlabs&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By browsing the Site,
          submitting an enquiry, or signing a Services Agreement, you agree to these Terms on
          behalf of yourself and, if applicable, the organisation you represent.
        </p>
        <p>
          Where a signed Services Agreement conflicts with these Terms, the Services Agreement
          controls for that engagement. If you do not agree to these Terms, please do not use the
          Site or engage our services.
        </p>
      </>
    ),
  },
  {
    id: "definitions",
    heading: "Definitions",
    body: (
      <>
        <LegalTerm term="Client">The individual or organisation that engages Comlabs to provide Services under a Services Agreement.</LegalTerm>
        <LegalTerm term="Services">Application support, AI and agentic engineering, AWS cloud and DevOps, custom software engineering, mobile engineering, web and digital experience work, and related consulting delivered by Comlabs.</LegalTerm>
        <LegalTerm term="Deliverables">The specific work product &mdash; code, infrastructure configuration, designs, documentation, or reports &mdash; that a Services Agreement identifies as an output of the engagement.</LegalTerm>
        <LegalTerm term="Confidential Information">Non-public information disclosed by either party in connection with an engagement, including business plans, technical data, source code, credentials and client data, that is marked confidential or would reasonably be understood as confidential given its nature.</LegalTerm>
      </>
    ),
  },
  {
    id: "site-use",
    heading: "Use of the Site",
    body: (
      <>
        <p>
          The Site and its content &mdash; including text, graphics, illustrations, logos and
          case-study material &mdash; are provided for informational purposes about Comlabs and
          its services. You may not scrape, reproduce, or redistribute substantial portions of the
          Site without our written permission, attempt to gain unauthorised access to the Site or
          its underlying systems, or use the Site to transmit unlawful, harmful or infringing
          content.
        </p>
        <p>
          We may modify, suspend or discontinue any part of the Site at any time without notice
          and without liability to you for doing so.
        </p>
      </>
    ),
  },
  {
    id: "engagement-process",
    heading: "How an engagement is formed",
    body: (
      <p>
        An enquiry, quote request, or conversation initiated through the Site does not itself
        create a binding engagement. An engagement begins only once both parties have signed a
        Services Agreement (or comparable written proposal or statement of work) setting out the
        scope, timeline, fees and any specific terms for that project. These Terms apply to every
        engagement in addition to, not instead of, the Services Agreement.
      </p>
    ),
  },
  {
    id: "client-responsibilities",
    heading: "Client responsibilities",
    body: (
      <>
        <p>To allow us to deliver Services on schedule, the Client agrees to:</p>
        <LegalList
          items={[
            "Provide timely, accurate information, access, credentials, and decisions reasonably required for the engagement.",
            "Designate a point of contact with authority to approve scope, review deliverables, and respond within the timeframes agreed in the Services Agreement.",
            "Ensure it has the necessary rights, licences and consents for any data, content, systems or third-party accounts it provides to us for the engagement.",
            "Comply with applicable law in its own use of the Deliverables, including data protection, export control and industry-specific regulation relevant to its business.",
          ]}
        />
        <p>
          Delays caused by the Client&rsquo;s failure to meet these responsibilities may affect
          timelines and fees, as described in the applicable Services Agreement.
        </p>
      </>
    ),
  },
  {
    id: "fees-and-payment",
    heading: "Fees and payment",
    body: (
      <>
        <p>
          Fees, payment schedule, currency and invoicing terms are set out in each Services
          Agreement. Unless the Services Agreement states otherwise:
        </p>
        <LegalList
          items={[
            "Invoices are due within the period stated on the invoice, and payment obligations are independent of any dispute the Client may raise about unrelated deliverables.",
            "Fees are exclusive of applicable taxes (including GST), which are payable in addition where applicable by law.",
            "We may charge interest on undisputed amounts overdue by more than 15 days, at the rate permitted by applicable law, and may suspend Services for material non-payment after written notice.",
            "Fees for third-party services, licences, or infrastructure procured on the Client&rsquo;s behalf (such as cloud hosting or SaaS subscriptions) are passed through at cost unless otherwise agreed, and are the Client&rsquo;s responsibility to fund on an ongoing basis after delivery.",
          ]}
        />
        <p>
          Cancellation, rescheduling and refund terms for deposits and milestone payments are
          described in our{" "}
          <a
            href={canonicalPath("/refund-policy")}
            className="font-medium text-foreground underline underline-offset-2 hover:text-[var(--warm-orange)]"
          >
            Refund Policy
          </a>
          , which forms part of these Terms.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    heading: "Intellectual property",
    body: (
      <>
        <p>
          Unless the applicable Services Agreement states otherwise, upon receipt of full payment
          for the relevant engagement, ownership of the Deliverables created specifically for the
          Client transfers to the Client. Comlabs retains ownership of:
        </p>
        <LegalList
          items={[
            "Pre-existing tools, libraries, frameworks, internal accelerators and know-how used to build the Deliverables, whether created before or during the engagement, which we license to the Client on a non-exclusive, royalty-free basis to use as part of the Deliverables.",
            "General methodologies, techniques and know-how developed or refined while performing the Services, so long as they do not incorporate the Client&rsquo;s Confidential Information.",
          ]}
        />
        <p>
          The Site itself, including its design, illustrations, brand assets and written content,
          remains the property of Comlabs and may not be used without permission, independent of
          the intellectual property terms governing any Deliverables.
        </p>
      </>
    ),
  },
  {
    id: "confidentiality",
    heading: "Confidentiality",
    body: (
      <p>
        Each party agrees to protect the other&rsquo;s Confidential Information with at least the
        same degree of care it uses for its own confidential information of similar importance,
        and not to disclose it to third parties except as necessary to perform under a Services
        Agreement, to professional advisors bound by confidentiality, or as required by law.
        Confidential Information does not include information that is or becomes publicly
        available through no fault of the receiving party, was already known to the receiving
        party without an obligation of confidence, or is independently developed without use of
        the disclosing party&rsquo;s Confidential Information. These obligations survive the
        termination or expiry of an engagement.
      </p>
    ),
  },
  {
    id: "warranties",
    heading: "Warranties and disclaimers",
    body: (
      <>
        <p>
          We warrant that Services will be performed with reasonable skill and care, consistent
          with generally accepted industry standards, and that Deliverables will materially
          conform to the specifications agreed in the applicable Services Agreement for the
          warranty period stated there (or, if none is stated, for 30 days after delivery). Our
          sole obligation for a breach of this warranty is to re-perform the non-conforming
          Services or correct the non-conforming Deliverable.
        </p>
        <p>
          Except as expressly stated in this section or in a Services Agreement, Services and
          Deliverables are provided on an &ldquo;as is&rdquo; basis, and we disclaim all other
          warranties, whether express or implied, including implied warranties of merchantability,
          fitness for a particular purpose, and non-infringement, to the maximum extent permitted
          by applicable law. We do not warrant that software will be error-free or that systems we
          support will be uninterrupted, as production systems can be affected by factors outside
          our control (including third-party infrastructure, the Client&rsquo;s own systems, and
          force majeure events).
        </p>
      </>
    ),
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: (
      <>
        <p>
          To the maximum extent permitted by applicable law, neither party will be liable to the
          other for indirect, incidental, special, consequential or punitive damages, or for loss
          of profits, revenue, data or business opportunity, arising out of or relating to an
          engagement, even if advised of the possibility of such damages.
        </p>
        <p>
          Except for liability arising from a breach of confidentiality, infringement of
          intellectual property rights, gross negligence, wilful misconduct, or a party&rsquo;s
          indemnification obligations, each party&rsquo;s total aggregate liability arising out of
          or relating to a given engagement will not exceed the total fees paid or payable by the
          Client to Comlabs under the applicable Services Agreement in the 12 months preceding the
          event giving rise to the claim. Nothing in these Terms limits liability that cannot
          lawfully be limited or excluded.
        </p>
      </>
    ),
  },
  {
    id: "indemnification",
    heading: "Indemnification",
    body: (
      <p>
        Each party agrees to indemnify and hold the other harmless from third-party claims,
        damages and reasonable expenses (including legal fees) arising from that party&rsquo;s
        breach of these Terms, violation of applicable law, or infringement of a third party&rsquo;s
        intellectual property rights &mdash; provided that, for the Client, this excludes claims
        arising solely from Deliverables built strictly to the Client&rsquo;s specification where
        Comlabs raised a documented objection that was not addressed.
      </p>
    ),
  },
  {
    id: "term-termination",
    heading: "Term and termination",
    body: (
      <>
        <p>
          These Terms apply for as long as you use the Site or have an active engagement with us.
          A Services Agreement may be terminated as set out in its own termination clause,
          typically permitting either party to terminate for convenience on written notice
          (subject to payment for work performed and committed costs incurred up to the effective
          date of termination) or for material breach that remains uncured after a notice period.
        </p>
        <p>
          Sections that by their nature should survive termination &mdash; including
          confidentiality, intellectual property, payment obligations for work already performed,
          warranties and disclaimers, limitation of liability, indemnification, and governing law
          &mdash; survive termination or expiry of an engagement.
        </p>
      </>
    ),
  },
  {
    id: "force-majeure",
    heading: "Force majeure",
    body: (
      <p>
        Neither party is liable for delay or failure to perform obligations (other than payment
        obligations) resulting from causes beyond its reasonable control, including natural
        disasters, war, civil unrest, government action, internet or telecommunications failures,
        or widespread outages of third-party infrastructure providers. The affected party will
        notify the other promptly and resume performance as soon as reasonably possible once the
        cause is resolved.
      </p>
    ),
  },
  {
    id: "governing-law",
    heading: "Governing law and dispute resolution",
    body: (
      <p>
        These Terms and any engagement with Comlabs are governed by the laws of India, without
        regard to conflict-of-law principles. The parties will first attempt to resolve any
        dispute through good-faith negotiation between designated representatives. If a dispute is
        not resolved within 30 days, it will be subject to the exclusive jurisdiction of the
        courts at Pune, Maharashtra, India, unless the applicable Services Agreement specifies
        binding arbitration or another dispute resolution mechanism, in which case that mechanism
        controls.
      </p>
    ),
  },
  {
    id: "general",
    heading: "General provisions",
    body: (
      <>
        <LegalList
          items={[
            <>
              <span className="font-medium text-foreground">Independent contractor.</span> Comlabs
              performs Services as an independent contractor, not as an employee, agent, partner
              or joint venturer of the Client.
            </>,
            <>
              <span className="font-medium text-foreground">Assignment.</span> Neither party may
              assign a Services Agreement without the other&rsquo;s written consent, except to a
              successor in connection with a merger, acquisition or sale of substantially all of
              its assets.
            </>,
            <>
              <span className="font-medium text-foreground">Severability.</span> If any provision
              of these Terms is found unenforceable, the remaining provisions continue in full
              force and effect.
            </>,
            <>
              <span className="font-medium text-foreground">No waiver.</span> Failure to enforce
              any provision of these Terms is not a waiver of the right to enforce it later.
            </>,
            <>
              <span className="font-medium text-foreground">Entire agreement.</span> These Terms,
              together with the applicable Services Agreement, constitute the entire agreement
              between the parties for that engagement and supersede prior discussions on the same
              subject matter.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "changes",
    heading: "Changes to these Terms",
    body: (
      <p>
        We may update these Terms from time to time; the &ldquo;Last updated&rdquo; date above
        reflects the most recent revision. Changes apply prospectively and do not alter the terms
        of a Services Agreement already signed, unless that agreement is itself amended in
        writing. Continued use of the Site after a change constitutes acceptance of the revised
        Terms.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact us",
    body: (
      <p>
        Questions about these Terms can be sent to Comlabs Technologies Private Limited, Pune,
        Maharashtra, India, at{" "}
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

export default async function TermsAndConditionsPage() {
  const summaries = await listPublishedCaseStudySummaries();
  const footerCaseStudies = summaries.map((study) => ({ label: study.title, href: study.href }));

  return (
    <>
      <JsonLdScript
        data={getWebPageSchema({ url: "/terms-and-conditions", name: TITLE, description: DESCRIPTION })}
      />
      <LegalPageLayout
        eyebrow="Legal"
        title="Terms and Conditions"
        intro="The terms that govern use of this website and engagements for Comlabs services."
        lastUpdated={LAST_UPDATED}
        sections={SECTIONS}
        footerCaseStudies={footerCaseStudies}
      />
    </>
  );
}
