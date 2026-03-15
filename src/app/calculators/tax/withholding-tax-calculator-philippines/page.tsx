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
import { WithholdingTaxCalculator } from "@/components/calculators/withholding-tax-calculator";
import { withholdingTaxData } from "@/data/calculators/withholding-tax";

export const metadata: Metadata = generatePageMetadata({
  title: withholdingTaxData.metaTitle,
  description: withholdingTaxData.metaDescription,
  slug: withholdingTaxData.slug,
  updatedAt: withholdingTaxData.updatedAt,
});

export default function WithholdingTaxCalculatorPage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Calculators", href: "/calculators" },
          { label: "Withholding Tax Calculator" },
        ])}
      />
      <JsonLd
        data={generateCalculatorSchema({
          title: withholdingTaxData.metaTitle,
          description: withholdingTaxData.metaDescription,
        })}
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHero
          title={withholdingTaxData.h1}
          description={withholdingTaxData.intro}
          badge={withholdingTaxData.updatedAt}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Calculators", href: "/calculators" },
            { label: "Withholding Tax Calculator" },
          ]}
        />

        <WithholdingTaxCalculator />

        {/* <AdPlaceholder slot="calc-below-results" className="my-8" /> */}

        {/* Formula Explanation */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            How Is Your Withholding Tax Calculated?
          </h2>
          <p className="mt-3 text-muted-foreground">
            {withholdingTaxData.formula.explanation}
          </p>
        </section>

        {/* Worked Example */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Example Calculation
          </h2>
          <div className="mt-3 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">
              {withholdingTaxData.exampleCalculation.scenario}
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1">
              <li>
                Annual Taxable Income: ₱35,000 x 12 ={" "}
                <strong className="text-foreground">₱420,000</strong>
              </li>
              <li>
                Tax Bracket:{" "}
                <strong className="text-foreground">
                  ₱400,001 - ₱800,000 (20%)
                </strong>
              </li>
              <li>
                Tax Computation: ₱22,500 + 20% of (₱420,000 - ₱400,000) =
                ₱22,500 + ₱4,000 ={" "}
                <strong className="text-foreground">₱26,500</strong>
              </li>
              <li>
                Monthly Withholding Tax: ₱26,500 / 12 ={" "}
                <strong className="text-foreground">≈ ₱2,208</strong>
              </li>
              <li>
                Effective Tax Rate:{" "}
                <strong className="text-foreground">≈ 6.31%</strong>
              </li>
              <li>
                Monthly Take-Home Pay:{" "}
                <strong className="text-foreground">≈ ₱32,792</strong>
              </li>
            </ul>
          </div>
        </section>

        {/* <AdPlaceholder slot="calc-mid-content" className="my-8" /> */}

        {/* Tips */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Tips for Managing Your Income Tax in the Philippines
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-muted-foreground">
            {withholdingTaxData.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </section>

        <FaqSection faqs={withholdingTaxData.faqs} />
        <RelatedPages currentSlug={withholdingTaxData.slug} />
        <DisclaimerBox />
      </div>
    </>
  );
}
