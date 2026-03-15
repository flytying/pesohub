import { generatePageMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/config/site";

export const metadata = generatePageMetadata({
  title: "Disclaimer",
  description: `Financial disclaimer for ${SITE_NAME}. Important information about the limitations of our calculators, rates, and guides.`,
  slug: "disclaimer",
  noIndex: true,
});

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Disclaimer</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: March 14, 2026</p>

      <div className="mt-6 space-y-6 text-muted-foreground leading-relaxed">
        <h2 className="text-xl font-semibold text-foreground pt-4">General Disclaimer</h2>
        <p>
          The information provided on {SITE_NAME} is for general informational and
          educational purposes only. It should not be construed as professional
          financial, investment, legal, or tax advice. You should consult with a
          qualified professional before making any financial decisions.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">Calculator Disclaimer</h2>
        <p>
          The calculators on this website use standard financial formulas to generate
          estimates. Results are approximate and may not account for all fees,
          charges, taxes, or specific terms that a financial institution may apply.
          Actual loan payments, tax amounts, pension benefits, and other financial
          figures may vary from the estimates provided by our calculators.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">Rate Disclaimer</h2>
        <p>
          Exchange rates, interest rates, and other financial data displayed on this
          website are gathered from publicly available sources and are provided for
          reference only. These rates may not be current, complete, or accurate at
          the time you view them. Always verify rates directly with the relevant
          financial institution before making any financial decision.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">Government Information Disclaimer</h2>
        <p>
          {SITE_NAME} is not affiliated with any Philippine government agency,
          including but not limited to SSS, BIR, BSP, Pag-IBIG, and PhilHealth.
          Information about government programs, contribution tables, and benefit
          computations is based on publicly available official sources. Rules,
          rates, and requirements may change. Always verify details with the
          relevant government office.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">No Guarantee</h2>
        <p>
          While we strive to keep the information on {SITE_NAME} accurate and
          up-to-date, we make no representations or warranties of any kind,
          express or implied, about the completeness, accuracy, reliability, or
          availability of the information, tools, or services on this website.
        </p>
      </div>
    </div>
  );
}
