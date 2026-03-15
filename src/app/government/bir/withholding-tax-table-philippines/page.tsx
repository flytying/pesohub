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
import {
  withholdingTaxTableMeta,
  monthlyTaxBrackets,
  taxExemptions,
  withholdingTaxTableFaqs,
  WITHHOLDING_TAX_TABLE_UPDATED_AT,
} from "@/data/government/withholding-tax-table";

export const metadata = generatePageMetadata({
  title: withholdingTaxTableMeta.metaTitle,
  description: withholdingTaxTableMeta.metaDescription,
  slug: withholdingTaxTableMeta.slug,
  updatedAt: WITHHOLDING_TAX_TABLE_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "Withholding Tax Table" },
];

export default function WithholdingTaxTablePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: withholdingTaxTableMeta.metaTitle,
          description: withholdingTaxTableMeta.metaDescription,
          updatedAt: WITHHOLDING_TAX_TABLE_UPDATED_AT,
          slug: withholdingTaxTableMeta.slug,
        })}
      />

      <PageHero
        title={withholdingTaxTableMeta.title}
        description={withholdingTaxTableMeta.directAnswer}
        badge={WITHHOLDING_TAX_TABLE_UPDATED_AT}
        breadcrumbs={breadcrumbs}
      />

      {/* Government Disclaimer */}
      <Card className="mb-8 border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
        <CardContent className="p-4 text-sm text-muted-foreground">
          {GOVERNMENT_DISCLAIMER}
        </CardContent>
      </Card>

      {/* <AdPlaceholder slot="gov-bir-tax-top" className="my-8" /> */}

      {/* Annual Tax Table */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Annual Income Tax Table (TRAIN Law, 2023 onwards)
        </h2>
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Taxable Income (Annual)</TableHead>
                <TableHead className="text-right whitespace-nowrap">Tax Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-sm">PHP 0 – PHP 250,000</TableCell>
                <TableCell className="text-right text-sm font-medium">0% (Exempt)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-sm">PHP 250,001 – PHP 400,000</TableCell>
                <TableCell className="text-right text-sm">15% of excess over PHP 250,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-sm">PHP 400,001 – PHP 800,000</TableCell>
                <TableCell className="text-right text-sm">PHP 22,500 + 20% of excess over PHP 400,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-sm">PHP 800,001 – PHP 2,000,000</TableCell>
                <TableCell className="text-right text-sm">PHP 102,500 + 25% of excess over PHP 800,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-sm">PHP 2,000,001 – PHP 8,000,000</TableCell>
                <TableCell className="text-right text-sm">PHP 402,500 + 30% of excess over PHP 2,000,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-sm">Over PHP 8,000,000</TableCell>
                <TableCell className="text-right text-sm">PHP 2,202,500 + 35% of excess over PHP 8,000,000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Monthly Tax Table */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Monthly Withholding Tax Table
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          This is the monthly equivalent used by employers to compute the tax
          withheld from your salary each month.
        </p>
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Over</TableHead>
                <TableHead className="whitespace-nowrap">But Not Over</TableHead>
                <TableHead className="text-right whitespace-nowrap">Base Tax</TableHead>
                <TableHead className="text-right whitespace-nowrap">Rate</TableHead>
                <TableHead className="text-right whitespace-nowrap">Of Excess Over</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyTaxBrackets.map((bracket, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm whitespace-nowrap">{bracket.overBut}</TableCell>
                  <TableCell className="text-sm whitespace-nowrap">{bracket.notOver}</TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatPeso(bracket.baseTax)}
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium">
                    {bracket.rate}%
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatPeso(bracket.ofExcessOver)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* <AdPlaceholder slot="gov-bir-tax-mid" className="my-8" /> */}

      {/* Who It Applies To */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Who It Applies To
        </h2>
        <Card>
          <CardContent className="space-y-3 p-6 text-sm text-muted-foreground">
            <p>
              Withholding tax on compensation applies to all individuals earning
              employment income in the Philippines. Your employer is required by law to
              withhold income tax from your salary each pay period and remit it to the BIR.
            </p>
            <ul className="space-y-1.5 pl-4">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span><strong>Private sector employees</strong> — regular, contractual, and probationary employees of private companies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span><strong>Government employees</strong> — national and local government workers (except those covered by special tax rules)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span><strong>Minimum wage earners</strong> — exempt from withholding tax, including holiday pay, overtime, and night differential</span>
              </li>
            </ul>
            <p>
              Self-employed individuals and freelancers file their own taxes quarterly
              using BIR Form 1701Q and are not subject to employer withholding.
            </p>
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
            <p><strong>Scenario:</strong> Employee with gross monthly salary of PHP 30,000.</p>
            <ol className="list-decimal space-y-2 pl-5">
              <li>Monthly gross salary: PHP 30,000</li>
              <li>Less mandatory deductions (SSS, PhilHealth, Pag-IBIG): ~PHP 1,800</li>
              <li>Monthly taxable income: ~PHP 28,200</li>
              <li>Falls in bracket: PHP 20,833 – PHP 33,333 (15% rate)</li>
              <li>Tax: PHP 0 + 15% x (28,200 – 20,833) = 15% x 7,367 = <strong>PHP 1,105</strong></li>
              <li>Monthly take-home: PHP 30,000 – 1,800 – 1,105 = <strong>PHP 27,095</strong></li>
            </ol>
          </CardContent>
        </Card>
      </section>

      {/* Tax-Exempt Items */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Common Tax-Exempt Compensation
        </h2>
        <Card>
          <CardContent className="p-6">
            <ul className="space-y-2">
              {taxExemptions.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-green-500" />
                  {item}
                </li>
              ))}
            </ul>
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
            <p className="font-medium text-sm">Compute Your Withholding Tax</p>
            <p className="text-sm text-muted-foreground">
              Enter your salary and see your exact monthly tax and take-home pay.
            </p>
          </div>
          <Link
            href="/calculators/tax/withholding-tax-calculator-philippines"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Calculate <ArrowRight className="size-3.5" />
          </Link>
        </CardContent>
      </Card>

      {/* <AdPlaceholder slot="gov-bir-tax-bottom" className="my-8" /> */}

      <FaqSection faqs={withholdingTaxTableFaqs} />

      <RelatedPages currentSlug="/government/bir/withholding-tax-table-philippines" />

      <div className="py-4">
        <SourceCitation
          source="Bureau of Internal Revenue (BIR) — TRAIN Law (RA 10963)"
          sourceUrl="https://www.bir.gov.ph/tax-information/tax-rates"
          updatedAt={WITHHOLDING_TAX_TABLE_UPDATED_AT}
          reviewCadence="Every 90 days"
        />
      </div>
      <DisclaimerBox text={GOVERNMENT_DISCLAIMER} />
    </div>
  );
}
