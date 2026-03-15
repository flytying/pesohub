import { generatePageMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/config/site";

export const metadata = generatePageMetadata({
  title: "Terms of Use",
  description: `Terms of Use for ${SITE_NAME}. Read the terms and conditions for using our website and tools.`,
  slug: "terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Terms of Use</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: March 14, 2026</p>

      <div className="mt-6 space-y-6 text-muted-foreground leading-relaxed">
        <p>
          By accessing and using {SITE_NAME} ({SITE_URL}), you agree to be bound
          by these Terms of Use. If you do not agree with any part of these terms,
          please do not use the website.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">Use of Content</h2>
        <p>
          The content on {SITE_NAME}, including calculators, rate tables, guides,
          and other materials, is provided for general informational and educational
          purposes only. It is not intended as professional financial, legal, or tax
          advice.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">Calculator Accuracy</h2>
        <p>
          Our calculators use standard financial formulas and are designed to
          provide reasonable estimates. However, actual amounts may differ based
          on specific lender terms, fees, and other factors not captured by our
          tools. Always verify results with the relevant financial institution.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">Rate Information</h2>
        <p>
          Exchange rates, interest rates, and other financial data displayed on
          this website are gathered from publicly available sources and may not
          reflect real-time values. Rates are subject to change without notice.
          Always confirm current rates with the relevant institution before making
          financial decisions.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">No Affiliation</h2>
        <p>
          {SITE_NAME} is an independent website. We are not affiliated with,
          endorsed by, or officially connected to any bank, government agency,
          or financial institution mentioned on this website.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">Limitation of Liability</h2>
        <p>
          {SITE_NAME} and its operators shall not be liable for any damages
          arising from the use of this website or reliance on any information
          provided. Use all tools and content at your own risk.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">Changes</h2>
        <p>
          We reserve the right to modify these Terms of Use at any time. Continued
          use of the website after changes constitutes acceptance of the updated
          terms.
        </p>
      </div>
    </div>
  );
}
