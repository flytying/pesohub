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
import { SSSPensionCalculator } from "@/components/calculators/sss-pension-calculator";
import { sssPensionData } from "@/data/calculators/sss-pension";

export const metadata: Metadata = generatePageMetadata({
  title: sssPensionData.metaTitle,
  description: sssPensionData.metaDescription,
  slug: sssPensionData.slug,
  updatedAt: sssPensionData.updatedAt,
});

export default function SSSPensionCalculatorPage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Calculators", href: "/calculators" },
          { label: "SSS Pension Calculator" },
        ])}
      />
      <JsonLd
        data={generateCalculatorSchema({
          title: sssPensionData.metaTitle,
          description: sssPensionData.metaDescription,
        })}
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHero
          title={sssPensionData.h1}
          description={sssPensionData.intro}
          badge={sssPensionData.updatedAt}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Calculators", href: "/calculators" },
            { label: "SSS Pension Calculator" },
          ]}
        />

        <SSSPensionCalculator />

        {/* <AdPlaceholder slot="calc-below-results" className="my-8" /> */}

        {/* Formula Explanation */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            How Is Your SSS Pension Calculated?
          </h2>
          <p className="mt-3 text-muted-foreground">
            {sssPensionData.formula.explanation}
          </p>
          <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            <p className="mb-2 font-medium text-foreground">
              The Three SSS Pension Formulas:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                <strong className="text-foreground">Formula A:</strong> ₱300 +
                20% of average MSC + 2% of average MSC for each CYS over 10
              </li>
              <li>
                <strong className="text-foreground">Formula B:</strong> 40% of
                average Monthly Salary Credit
              </li>
              <li>
                <strong className="text-foreground">Minimum Pension:</strong>{" "}
                ₱2,000 for 10-19 CYS, or ₱4,000 for 20+ CYS
              </li>
            </ul>
            <p className="mt-2">
              SSS automatically selects whichever formula produces the highest
              pension amount for you.
            </p>
          </div>
        </section>

        {/* Worked Example */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Example Calculation
          </h2>
          <div className="mt-3 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">
              {sssPensionData.exampleCalculation.scenario}
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1">
              <li>
                Monthly Salary Credit:{" "}
                <strong className="text-foreground">₱20,000</strong>
              </li>
              <li>
                Years of Contribution:{" "}
                <strong className="text-foreground">25 years</strong>
              </li>
              <li>
                Formula A: ₱300 + (20% x ₱20,000) + (2% x ₱20,000 x 15) =
                ₱300 + ₱4,000 + ₱6,000 ={" "}
                <strong className="text-foreground">₱10,300</strong>
              </li>
              <li>
                Formula B: 40% x ₱20,000 ={" "}
                <strong className="text-foreground">₱8,000</strong>
              </li>
              <li>
                Minimum Pension (20+ CYS):{" "}
                <strong className="text-foreground">₱4,000</strong>
              </li>
              <li>
                Highest pension (Formula A):{" "}
                <strong className="text-foreground">₱10,300/month</strong>
              </li>
            </ul>
          </div>
        </section>

        {/* <AdPlaceholder slot="calc-mid-content" className="my-8" /> */}

        {/* Tips */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Tips for Maximizing Your SSS Pension
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-muted-foreground">
            {sssPensionData.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </section>

        <FaqSection faqs={sssPensionData.faqs} />
        <RelatedPages currentSlug={sssPensionData.slug} />
        <DisclaimerBox />
      </div>
    </>
  );
}
