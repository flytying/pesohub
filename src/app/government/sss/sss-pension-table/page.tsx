import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { RelatedPages } from "@/components/shared/related-pages";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
import { SourceCitation } from "@/components/shared/source-citation";
// import { AdPlaceholder } from "@/components/ads/ad-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema-markup";
import { formatPeso } from "@/lib/formatters";
import { GOVERNMENT_DISCLAIMER } from "@/lib/constants";
import { pensionFormulas } from "@/data/guides/sss-pension-guide";
import {
  sssPensionTableMeta,
  pensionEstimates,
  eligibilityRequirements,
  sssPensionTableFaqs,
  SSS_PENSION_TABLE_UPDATED_AT,
} from "@/data/government/sss-pension-table";

export const metadata = generatePageMetadata({
  title: sssPensionTableMeta.metaTitle,
  description: sssPensionTableMeta.metaDescription,
  slug: sssPensionTableMeta.slug,
  updatedAt: SSS_PENSION_TABLE_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "SSS Pension Table" },
];

export default function SSSPensionTablePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: sssPensionTableMeta.metaTitle,
          description: sssPensionTableMeta.metaDescription,
          updatedAt: SSS_PENSION_TABLE_UPDATED_AT,
          slug: sssPensionTableMeta.slug,
        })}
      />

      <PageHero
        title={sssPensionTableMeta.title}
        description={sssPensionTableMeta.directAnswer}
        badge={SSS_PENSION_TABLE_UPDATED_AT}
        breadcrumbs={breadcrumbs}
      />

      {/* Government Disclaimer */}
      <Card className="mb-8 border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
        <CardContent className="p-4 text-sm text-muted-foreground">
          {GOVERNMENT_DISCLAIMER}
        </CardContent>
      </Card>

      {/* <AdPlaceholder slot="gov-sss-pension-top" className="my-8" /> */}

      {/* Pension Estimate Table */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Estimated Monthly Pension by Salary Credit & Years
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          This table shows estimated monthly pension amounts based on your Average
          Monthly Salary Credit (AMSC) and total Credited Years of Service (CYS).
          The highest of the three SSS pension formulas is used.
        </p>
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">MSC</TableHead>
                <TableHead className="text-right whitespace-nowrap">10 yrs</TableHead>
                <TableHead className="text-right whitespace-nowrap">15 yrs</TableHead>
                <TableHead className="text-right whitespace-nowrap">20 yrs</TableHead>
                <TableHead className="text-right whitespace-nowrap">25 yrs</TableHead>
                <TableHead className="text-right whitespace-nowrap">30 yrs</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pensionEstimates.map((row) => (
                <TableRow key={row.monthlySalaryCredit}>
                  <TableCell className="font-medium text-sm whitespace-nowrap">
                    {formatPeso(row.monthlySalaryCredit)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatPeso(row.pensionAt10Years)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatPeso(row.pensionAt15Years)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatPeso(row.pensionAt20Years)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatPeso(row.pensionAt25Years)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm font-medium">
                    {formatPeso(row.pensionAt30Years)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Estimates based on the SSS pension formula. Actual pension may vary based on
          contribution history and average monthly salary credit.
        </p>
      </section>

      {/* Three Pension Formulas */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          The Three SSS Pension Formulas
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          SSS computes your pension using all three formulas and gives you the
          highest amount.
        </p>
        <div className="space-y-4">
          {pensionFormulas.map((formula) => (
            <Card key={formula.label}>
              <CardHeader>
                <CardTitle className="text-base">{formula.label}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-mono text-sm font-medium">{formula.formula}</p>
                <p className="text-sm text-muted-foreground">{formula.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* <AdPlaceholder slot="gov-sss-pension-mid" className="my-8" /> */}

      {/* Who It Applies To */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Who It Applies To
        </h2>
        <Card>
          <CardContent className="space-y-3 p-6 text-sm text-muted-foreground">
            <p>
              The SSS retirement pension applies to all SSS members who have reached
              retirement age (60 for optional, 65 for mandatory) and have made at least
              120 monthly contributions (10 years).
            </p>
            <p>This includes:</p>
            <ul className="space-y-1.5 pl-4">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span><strong>Employed members</strong> — private sector employees whose employers remit SSS contributions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span><strong>Self-employed members</strong> — freelancers, business owners, and professionals who pay their own contributions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span><strong>Voluntary members</strong> — separated employees, overseas Filipino workers (OFWs), and non-working spouses who continue contributing</span>
              </li>
            </ul>
            <p>
              Members who do not meet the minimum 120 contributions will receive a
              lump-sum benefit instead of a monthly pension.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Eligibility */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Eligibility Requirements
        </h2>
        <Card>
          <CardContent className="p-6">
            <ul className="space-y-2">
              {eligibilityRequirements.map((req) => (
                <li key={req} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {req}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Worked Example */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Worked Example
        </h2>
        <Card>
          <CardContent className="space-y-3 p-6 text-sm">
            <p><strong>Scenario:</strong> Average MSC of PHP 20,000 with 25 years of contributions.</p>
            <div className="space-y-2 pl-1">
              <p><strong>Formula 1:</strong> PHP 300 + (20% x 20,000) + (2% x 20,000 x 15) = PHP 300 + 4,000 + 6,000 = <strong>PHP 10,300</strong></p>
              <p><strong>Formula 2:</strong> 40% x 20,000 = <strong>PHP 8,000</strong></p>
              <p><strong>Formula 3:</strong> Minimum pension (20+ CYS) = <strong>PHP 4,000</strong></p>
            </div>
            <p className="mt-2 font-medium">
              Highest amount: PHP 10,300/month (Formula 1 wins)
            </p>
            <p className="text-muted-foreground">
              Plus a 13th month pension of PHP 10,300 every December.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Related Calculator Callout */}
      <Card className="my-8 border-primary/20 bg-primary/5">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Calculator className="size-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">Calculate Your SSS Pension</p>
            <p className="text-sm text-muted-foreground">
              Enter your salary credit and years to get a personalized pension estimate.
            </p>
          </div>
          <Link
            href="/calculators/retirement/sss-pension-calculator"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Calculate <ArrowRight className="size-3.5" />
          </Link>
        </CardContent>
      </Card>

      {/* <AdPlaceholder slot="gov-sss-pension-bottom" className="my-8" /> */}

      <FaqSection faqs={sssPensionTableFaqs} />

      <RelatedPages currentSlug="/government/sss/sss-pension-table" />

      <div className="py-4">
        <SourceCitation
          source="Social Security System (SSS)"
          sourceUrl="https://www.sss.gov.ph/sss/appmanager/pages.jsp?page=retirementbenefits"
          updatedAt={SSS_PENSION_TABLE_UPDATED_AT}
          reviewCadence="Every 90 days"
        />
      </div>
      <DisclaimerBox text={GOVERNMENT_DISCLAIMER} />
    </div>
  );
}
