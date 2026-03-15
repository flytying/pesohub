import Link from "next/link";
import { Landmark, Calculator, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { RelatedPages } from "@/components/shared/related-pages";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
// import { AdPlaceholder } from "@/components/ads/ad-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  withholdingTaxMeta,
  trainLawBrackets,
  withholdingTaxFaqs,
  WITHHOLDING_TAX_UPDATED_AT,
} from "@/data/guides/withholding-tax-guide";

export const metadata = generatePageMetadata({
  title: withholdingTaxMeta.metaTitle,
  description: withholdingTaxMeta.metaDescription,
  slug: withholdingTaxMeta.slug,
  updatedAt: WITHHOLDING_TAX_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Guides", href: "/guides" },
  { label: "Withholding Tax" },
];

export default function WithholdingTaxGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: withholdingTaxMeta.metaTitle,
          description: withholdingTaxMeta.metaDescription,
          updatedAt: WITHHOLDING_TAX_UPDATED_AT,
          slug: withholdingTaxMeta.slug,
        })}
      />

      <PageHero
        title="How Withholding Tax Works in the Philippines"
        description="A practical, plain-language guide to understanding Philippine withholding tax under the TRAIN Law. Learn the tax brackets, computation formula, and how to verify your payslip."
        badge={WITHHOLDING_TAX_UPDATED_AT}
        breadcrumbs={breadcrumbs}
      />

      {/* Direct Answer Box */}
      <section className="py-8">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Landmark className="size-5 text-primary" />
              Quick Answer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {withholdingTaxMeta.directAnswer}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Step 1: What is Withholding Tax */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          1. What Is Withholding Tax?
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Withholding tax is the Philippine government&apos;s method of
            collecting income tax at the source. Instead of paying your entire
            annual tax bill in one lump sum, your employer deducts a portion
            of your salary every payday and sends it directly to the Bureau of
            Internal Revenue (BIR).
          </p>
          <p>
            Think of it as a &ldquo;pay-as-you-earn&rdquo; system. By the end
            of the year, most of your income tax obligation has already been
            collected through these regular deductions.
          </p>
        </div>
      </section>

      {/* Step 2: Who Pays */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          2. Who Pays Withholding Tax?
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Most employees in the Philippines are subject to withholding tax.
            However, these groups are <strong>exempt</strong>:
          </p>
          <ul className="list-inside list-disc space-y-1">
            <li>
              <strong>Minimum wage earners</strong> &mdash; those receiving
              only the statutory minimum wage for their region are exempt from
              income tax regardless of the amount.
            </li>
            <li>
              <strong>Employees earning PHP 250,000 or less per year</strong>{" "}
              &mdash; under the TRAIN Law, the first PHP 250,000 of annual
              taxable income is tax-free.
            </li>
          </ul>
          <p>
            Self-employed individuals and freelancers also pay income tax but
            through a different mechanism (quarterly filings via BIR Form
            1701Q).
          </p>
        </div>
      </section>

      {/* <AdPlaceholder slot="withholding-tax-top" /> */}

      {/* Step 3: TRAIN Law Tax Brackets */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          3. TRAIN Law Tax Brackets (2023 Onwards)
        </h2>
        <p className="mb-4 text-muted-foreground">
          The Tax Reform for Acceleration and Inclusion (TRAIN) Law, or
          Republic Act No. 10963, revised the Philippine income tax brackets.
          The table below shows the graduated rates effective January 1, 2023:
        </p>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Taxable Income (Over)</TableHead>
                  <TableHead>But Not Over</TableHead>
                  <TableHead className="text-right">Base Tax</TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                  <TableHead className="text-right">Of Excess Over</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainLawBrackets.map((bracket, index) => (
                  <TableRow key={index}>
                    <TableCell>PHP {bracket.overBut}</TableCell>
                    <TableCell>
                      {bracket.notOver === "No limit"
                        ? "No limit"
                        : `PHP ${bracket.notOver}`}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPeso(bracket.baseTax, 0)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {bracket.rate}%
                    </TableCell>
                    <TableCell className="text-right">
                      {bracket.ofExcessOver === 0
                        ? "-"
                        : formatPeso(bracket.ofExcessOver, 0)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* Step 4: How to Compute */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          4. How to Compute Your Withholding Tax
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>The basic formula is:</p>
          <Card className="bg-muted/50">
            <CardContent className="py-4">
              <p className="font-mono text-sm">
                Annual Tax = Base Tax + (Tax Rate x (Taxable Income - Lower
                Bracket Limit))
              </p>
            </CardContent>
          </Card>
          <p>Follow these steps:</p>
          <ol className="list-inside list-decimal space-y-2">
            <li>
              <strong>Determine annual gross compensation.</strong> Multiply
              your monthly basic salary by 12 and add other taxable benefits
              (overtime, commissions, etc.).
            </li>
            <li>
              <strong>Subtract mandatory deductions.</strong> Deduct your
              employee share of SSS, PhilHealth, and Pag-IBIG contributions.
              This gives you your <strong>taxable income</strong>.
            </li>
            <li>
              <strong>Locate your tax bracket</strong> in the TRAIN Law table
              above.
            </li>
            <li>
              <strong>Apply the formula.</strong> Take the base tax for your
              bracket, then add the tax rate multiplied by the amount your
              income exceeds the bracket floor.
            </li>
            <li>
              <strong>Divide by 12</strong> (or by the number of pay periods)
              to get your monthly withholding tax.
            </li>
          </ol>
        </div>
      </section>

      {/* Step 5: How Employers Withhold */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          5. How Employers Withhold Tax
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Employers use the BIR&apos;s Revised Withholding Tax Table to
            determine how much to deduct from each payroll. The amount depends
            on the employee&apos;s pay frequency (monthly, semi-monthly,
            weekly, or daily) and their taxable compensation for that period.
          </p>
          <p>
            At year-end (usually in December), the employer performs an{" "}
            <strong>annualization</strong>: they compute the actual annual tax
            based on total compensation, compare it to the total amount
            already withheld, and either refund the excess or collect the
            shortfall through the final payroll.
          </p>
        </div>
      </section>

      {/* <AdPlaceholder slot="withholding-tax-mid" /> */}

      {/* Worked Example */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Worked Example: PHP 35,000 Monthly Salary
        </h2>
        <Card>
          <CardContent className="space-y-4">
            <p className="text-sm font-medium text-foreground">
              Scenario: An employee earns PHP 35,000 per month in basic salary
              with no other taxable benefits.
            </p>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">
                Step 1: Annual Gross Compensation
              </p>
              <p className="font-mono">PHP 35,000 x 12 = PHP 420,000</p>

              <p className="font-medium text-foreground">
                Step 2: Subtract Mandatory Contributions (estimated annual)
              </p>
              <ul className="list-inside list-disc pl-4">
                <li>SSS: PHP 1,750/month x 12 = PHP 21,000</li>
                <li>PhilHealth: PHP 612.50/month x 12 = PHP 7,350</li>
                <li>Pag-IBIG: PHP 200/month x 12 = PHP 2,400</li>
              </ul>
              <p className="font-mono">
                Total deductions: PHP 30,750
              </p>
              <p className="font-mono">
                Taxable income: PHP 420,000 - PHP 30,750 = PHP 389,250
              </p>

              <p className="font-medium text-foreground">
                Step 3: Identify Tax Bracket
              </p>
              <p>
                PHP 389,250 falls in the bracket: Over PHP 250,000 but not
                over PHP 400,000.
              </p>

              <p className="font-medium text-foreground">
                Step 4: Apply the Formula
              </p>
              <p className="font-mono">
                Tax = PHP 0 + 15% x (PHP 389,250 - PHP 250,000)
              </p>
              <p className="font-mono">
                Tax = 15% x PHP 139,250
              </p>
              <p className="font-mono">Tax = PHP 20,887.50 per year</p>

              <p className="font-medium text-foreground">
                Step 5: Monthly Withholding Tax
              </p>
              <p className="font-mono">
                PHP 20,887.50 / 12 = approximately PHP 1,740.63 per month
              </p>
            </div>

            <div className="rounded-md bg-primary/5 p-3">
              <p className="text-sm font-medium text-foreground">
                Result: The employee can expect approximately{" "}
                <strong>{formatPeso(1740.63)}</strong> deducted monthly as
                withholding tax.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Common Mistakes */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Common Mistakes to Avoid
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong>Forgetting to subtract mandatory contributions.</strong>{" "}
              Your taxable income is your gross pay minus SSS, PhilHealth, and
              Pag-IBIG. Using gross pay directly will overestimate your tax.
            </li>
            <li>
              <strong>
                Confusing the tax rate with the effective tax rate.
              </strong>{" "}
              If you fall in the 15% bracket, it does not mean 15% of your
              entire income goes to tax. Only the amount exceeding PHP 250,000
              is taxed at 15%.
            </li>
            <li>
              <strong>Not accounting for 13th-month pay and bonuses.</strong>{" "}
              Under the TRAIN Law, the first PHP 90,000 of 13th-month pay and
              other benefits is tax-exempt. Any excess is added to your
              taxable income.
            </li>
            <li>
              <strong>Not filing BIR Form 2316.</strong>{" "}
              Even if your employer handles withholding, make sure you receive
              your Certificate of Compensation Payment/Tax Withheld (BIR Form
              2316) every year for your records.
            </li>
            <li>
              <strong>
                Assuming minimum wage = automatic tax exemption.
              </strong>{" "}
              You are only exempt if your pay is exactly the statutory minimum
              wage. If you receive any amount above minimum wage (such as
              night differential or overtime beyond legal limits), the excess
              may be taxable.
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculator Callout */}
      <section className="py-8">
        <Card className="border-primary/20">
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Calculator className="size-8 text-primary" />
              <div>
                <p className="font-semibold text-foreground">
                  Withholding Tax Calculator
                </p>
                <p className="text-sm text-muted-foreground">
                  Compute your exact withholding tax based on your salary and
                  deductions.
                </p>
              </div>
            </div>
            <Link
              href="/calculators/tax/withholding-tax-calculator-philippines"
              className="inline-flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Use Calculator
              <ArrowRight className="size-4" />
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* <AdPlaceholder slot="withholding-tax-bottom" /> */}

      <FaqSection faqs={withholdingTaxFaqs} />

      <RelatedPages currentSlug="guides/tax/how-withholding-tax-works-philippines" />

      <div className="py-8 space-y-4">
        <DisclaimerBox text={GOVERNMENT_DISCLAIMER} />
        <DisclaimerBox />
      </div>
    </div>
  );
}
