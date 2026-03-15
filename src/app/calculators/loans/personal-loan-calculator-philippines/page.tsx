import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateCalculatorSchema,
} from "@/lib/schema-markup";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { RelatedPages } from "@/components/shared/related-pages";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
// import { AdPlaceholder } from "@/components/ads/ad-placeholder";
import { PersonalLoanCalculator } from "@/components/calculators/personal-loan-calculator";
import { personalLoanData } from "@/data/calculators/personal-loan";

export const metadata: Metadata = generatePageMetadata({
  title: personalLoanData.metaTitle,
  description: personalLoanData.metaDescription,
  slug: personalLoanData.slug,
  updatedAt: personalLoanData.updatedAt,
});

export default function PersonalLoanCalculatorPage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Calculators", href: "/calculators" },
          { label: "Personal Loan Calculator" },
        ])}
      />
      <JsonLd
        data={generateCalculatorSchema({
          title: personalLoanData.metaTitle,
          description: personalLoanData.metaDescription,
        })}
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHero
          title={personalLoanData.h1}
          description={personalLoanData.intro}
          badge={personalLoanData.updatedAt}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Calculators", href: "/calculators" },
            { label: "Personal Loan Calculator" },
          ]}
        />

        <PersonalLoanCalculator />

        {/* <AdPlaceholder slot="calc-below-results" className="my-8" /> */}

        {/* Formula Explanation */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            How Is Your Personal Loan Payment Calculated?
          </h2>
          <p className="mt-3 text-muted-foreground">
            {personalLoanData.formula.explanation}
          </p>
        </section>

        {/* Worked Example */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Example Calculation
          </h2>
          <div className="mt-3 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">
              {personalLoanData.exampleCalculation.scenario}
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1">
              <li>
                Loan Amount:{" "}
                <strong className="text-foreground">₱100,000</strong>
              </li>
              <li>
                Loan Term:{" "}
                <strong className="text-foreground">36 months</strong>
              </li>
              <li>
                Annual Interest Rate (declining balance):{" "}
                <strong className="text-foreground">12%</strong>
              </li>
              <li>
                Monthly Payment:{" "}
                <strong className="text-foreground">≈ ₱3,321</strong>
              </li>
              <li>
                Total Interest over 36 months:{" "}
                <strong className="text-foreground">≈ ₱19,572</strong>
              </li>
              <li>
                Total Repayment:{" "}
                <strong className="text-foreground">≈ ₱119,572</strong>
              </li>
            </ul>
          </div>
        </section>

        {/* <AdPlaceholder slot="calc-mid-content" className="my-8" /> */}

        {/* Tips */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Tips for Getting a Personal Loan in the Philippines
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-muted-foreground">
            {personalLoanData.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </section>

        <FaqSection faqs={personalLoanData.faqs} />
        <RelatedPages currentSlug={personalLoanData.slug} />
        <DisclaimerBox />
      </div>
    </>
  );
}
