import { generatePageMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/config/site";
import { LegalPage } from "@/components/shared/legal-page";

export const metadata = generatePageMetadata({
  title: "Terms of Use",
  description: `Terms of Use for ${SITE_NAME}. Read the terms and conditions for using our website and tools.`,
  slug: "terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      lastUpdated="March 14, 2026"
      breadcrumbLabel="Terms of Use"
      intro={`By accessing and using ${SITE_NAME} (${SITE_URL}), you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use the website.`}
      sections={[
        {
          heading: "Use of content",
          body: (
            <p>
              The content on {SITE_NAME}, including calculators, rate tables,
              guides, and other materials, is provided for general informational
              and educational purposes only. It is not intended as professional
              financial, legal, or tax advice.
            </p>
          ),
        },
        {
          heading: "Calculator accuracy",
          body: (
            <p>
              Our calculators use standard financial formulas and are designed to
              provide reasonable estimates. However, actual amounts may differ
              based on specific lender terms, fees, and other factors not captured
              by our tools. Always verify results with the relevant financial
              institution.
            </p>
          ),
        },
        {
          heading: "Rate information",
          body: (
            <p>
              Exchange rates, interest rates, and other financial data displayed on
              this website are gathered from publicly available sources and may not
              reflect real-time values. Rates are subject to change without notice.
              Always confirm current rates with the relevant institution before
              making financial decisions.
            </p>
          ),
        },
        {
          heading: "No affiliation",
          body: (
            <p>
              {SITE_NAME} is an independent website. We are not affiliated with,
              endorsed by, or officially connected to any bank, government agency,
              or financial institution mentioned on this website.
            </p>
          ),
        },
        {
          heading: "Limitation of liability",
          body: (
            <p>
              {SITE_NAME} and its operators shall not be liable for any damages
              arising from the use of this website or reliance on any information
              provided. Use all tools and content at your own risk.
            </p>
          ),
        },
        {
          heading: "Changes",
          body: (
            <p>
              We reserve the right to modify these Terms of Use at any time.
              Continued use of the website after changes constitutes acceptance of
              the updated terms.
            </p>
          ),
        },
      ]}
    />
  );
}
