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
import { HomeLoanCalculator } from "@/components/calculators/home-loan-calculator";
import { homeLoanData } from "@/data/calculators/home-loan";

export const metadata: Metadata = generatePageMetadata({
  title: homeLoanData.metaTitle,
  description: homeLoanData.metaDescription,
  slug: homeLoanData.slug,
  updatedAt: homeLoanData.updatedAt,
});

export default function HomeLoanCalculatorPage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Calculators", href: "/calculators" },
          { label: "Home Loan Calculator" },
        ])}
      />
      <JsonLd
        data={generateCalculatorSchema({
          title: homeLoanData.metaTitle,
          description: homeLoanData.metaDescription,
        })}
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHero
          title={homeLoanData.h1}
          description={homeLoanData.intro}
          badge={homeLoanData.updatedAt}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Calculators", href: "/calculators" },
            { label: "Home Loan Calculator" },
          ]}
        />

        <HomeLoanCalculator />

        {/* <AdPlaceholder slot="calc-below-results" className="my-8" /> */}

        {/* Formula Explanation */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            How Is Your Home Loan Payment Calculated?
          </h2>
          <p className="mt-3 text-muted-foreground">
            {homeLoanData.formula.explanation}
          </p>
        </section>

        {/* Worked Example */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Example Calculation
          </h2>
          <div className="mt-3 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">
              {homeLoanData.exampleCalculation.scenario}
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1">
              <li>
                Down Payment: 20% of ₱3,500,000 ={" "}
                <strong className="text-foreground">₱700,000</strong>
              </li>
              <li>
                Loan Amount: ₱3,500,000 - ₱700,000 ={" "}
                <strong className="text-foreground">₱2,800,000</strong>
              </li>
              <li>
                Loan Term: 20 years ={" "}
                <strong className="text-foreground">240 months</strong>
              </li>
              <li>
                Monthly Payment:{" "}
                <strong className="text-foreground">≈ ₱21,709</strong>
              </li>
              <li>
                Total Interest over 20 years:{" "}
                <strong className="text-foreground">≈ ₱2,410,160</strong>
              </li>
              <li>
                Total Cost (down payment + all payments):{" "}
                <strong className="text-foreground">≈ ₱5,910,160</strong>
              </li>
            </ul>
          </div>
        </section>

        {/* <AdPlaceholder slot="calc-mid-content" className="my-8" /> */}

        {/* Tips */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Tips for Getting a Home Loan in the Philippines
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-muted-foreground">
            {homeLoanData.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </section>

        <FaqSection faqs={homeLoanData.faqs} />
        <RelatedPages currentSlug={homeLoanData.slug} />
        <DisclaimerBox />
      </div>
    </>
  );
}
