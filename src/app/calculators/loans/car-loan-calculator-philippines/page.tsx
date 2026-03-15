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
import { CarLoanCalculator } from "@/components/calculators/car-loan-calculator";
import { carLoanData } from "@/data/calculators/car-loan";

export const metadata: Metadata = generatePageMetadata({
  title: carLoanData.metaTitle,
  description: carLoanData.metaDescription,
  slug: carLoanData.slug,
  updatedAt: carLoanData.updatedAt,
});

export default function CarLoanCalculatorPage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Calculators", href: "/calculators" },
          { label: "Car Loan Calculator" },
        ])}
      />
      <JsonLd
        data={generateCalculatorSchema({
          title: carLoanData.metaTitle,
          description: carLoanData.metaDescription,
        })}
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHero
          title={carLoanData.h1}
          description={carLoanData.intro}
          badge={carLoanData.updatedAt}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Calculators", href: "/calculators" },
            { label: "Car Loan Calculator" },
          ]}
        />

        <CarLoanCalculator />

        {/* <AdPlaceholder slot="calc-below-results" className="my-8" /> */}

        {/* Formula Explanation */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            How Is Your Car Loan Payment Calculated?
          </h2>
          <p className="mt-3 text-muted-foreground">
            {carLoanData.formula.explanation}
          </p>
        </section>

        {/* Worked Example */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Example Calculation
          </h2>
          <div className="mt-3 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">
              {carLoanData.exampleCalculation.scenario}
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1">
              <li>
                Down Payment: 20% of ₱1,200,000 ={" "}
                <strong className="text-foreground">₱240,000</strong>
              </li>
              <li>
                Loan Amount: ₱1,200,000 - ₱240,000 ={" "}
                <strong className="text-foreground">₱960,000</strong>
              </li>
              <li>
                Monthly Payment:{" "}
                <strong className="text-foreground">≈ ₱18,797</strong>
              </li>
              <li>
                Total Interest over 60 months:{" "}
                <strong className="text-foreground">≈ ₱167,831</strong>
              </li>
              <li>
                Total Cost (down payment + all payments):{" "}
                <strong className="text-foreground">≈ ₱1,367,831</strong>
              </li>
            </ul>
          </div>
        </section>

        {/* <AdPlaceholder slot="calc-mid-content" className="my-8" /> */}

        {/* Tips */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Tips for Getting a Car Loan in the Philippines
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-muted-foreground">
            {carLoanData.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </section>

        <FaqSection faqs={carLoanData.faqs} />
        <RelatedPages currentSlug={carLoanData.slug} />
        <DisclaimerBox />
      </div>
    </>
  );
}
