import { generatePageMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/config/site";
import { LegalPage } from "@/components/shared/legal-page";

export const metadata = generatePageMetadata({
  title: "Disclaimer",
  description: `Financial disclaimer for ${SITE_NAME}. Important information about the limitations of our calculators, rates, and guides.`,
  slug: "disclaimer",
  noIndex: true,
});

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      lastUpdated="March 14, 2026"
      breadcrumbLabel="Disclaimer"
      sections={[
        {
          heading: "General disclaimer",
          body: (
            <p>
              The information provided on {SITE_NAME} is for general informational
              and educational purposes only. It should not be construed as
              professional financial, investment, legal, or tax advice. You should
              consult with a qualified professional before making any financial
              decisions.
            </p>
          ),
        },
        {
          heading: "Calculator disclaimer",
          body: (
            <p>
              The calculators on this website use standard financial formulas to
              generate estimates. Results are approximate and may not account for
              all fees, charges, taxes, or specific terms that a financial
              institution may apply. Actual loan payments, tax amounts, pension
              benefits, and other financial figures may vary from the estimates
              provided by our calculators.
            </p>
          ),
        },
        {
          heading: "Rate disclaimer",
          body: (
            <p>
              Exchange rates, interest rates, and other financial data displayed on
              this website are gathered from publicly available sources and are
              provided for reference only. These rates may not be current,
              complete, or accurate at the time you view them. Always verify rates
              directly with the relevant financial institution before making any
              financial decision.
            </p>
          ),
        },
        {
          heading: "Government information disclaimer",
          body: (
            <p>
              {SITE_NAME} is not affiliated with any Philippine government agency,
              including but not limited to SSS, BIR, BSP, Pag-IBIG, and PhilHealth.
              Information about government programs, contribution tables, and
              benefit computations is based on publicly available official sources.
              Rules, rates, and requirements may change. Always verify details with
              the relevant government office.
            </p>
          ),
        },
        {
          heading: "No guarantee",
          body: (
            <p>
              While we strive to keep the information on {SITE_NAME} accurate and
              up-to-date, we make no representations or warranties of any kind,
              express or implied, about the completeness, accuracy, reliability, or
              availability of the information, tools, or services on this website.
            </p>
          ),
        },
      ]}
    />
  );
}
