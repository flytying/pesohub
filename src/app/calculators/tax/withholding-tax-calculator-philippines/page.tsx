import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Calculator,
  Landmark,
  BookOpen,
  BarChart3,
  FileText,
} from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateCalculatorSchema,
} from "@/lib/schema-markup";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/lib/button-variants";
import { WithholdingTaxCalculator } from "@/components/calculators/withholding-tax-calculator";
import { withholdingTaxData } from "@/data/calculators/withholding-tax";

export const metadata: Metadata = generatePageMetadata({
  title: withholdingTaxData.metaTitle,
  description: withholdingTaxData.metaDescription,
  slug: withholdingTaxData.slug,
  updatedAt: withholdingTaxData.updatedAt,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Withholding Tax Calculator" },
];

const howItWorksSteps = [
  "Start with your gross monthly salary",
  "Multiply it by 12 to estimate annual taxable income",
  "Match that amount to the correct income tax bracket",
  "Apply the bracket formula to compute annual income tax",
  "Divide the result by 12 to estimate monthly withholding tax",
];

const whyDifferent = [
  "mandatory deductions may reduce taxable income",
  "employer payroll settings may apply more specific tax treatment",
  "bonuses, allowances, or irregular pay may affect taxable income",
  "payroll systems may compute using more detailed assumptions",
  "this calculator is designed for estimation, not final payroll output",
];

const relatedPages = [
  {
    title: "Withholding Tax Table 2026",
    href: "/government/bir/withholding-tax-table-philippines",
    icon: FileText,
  },
  {
    title: "Withholding Tax Guide",
    href: "/guides/tax/how-withholding-tax-works-philippines",
    icon: BookOpen,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Calculators Hub",
    href: "/calculators",
    icon: BarChart3,
  },
  {
    title: "Guides Hub",
    href: "/guides",
    icon: Landmark,
  },
];

export default function WithholdingTaxCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: withholdingTaxData.metaTitle,
          description: withholdingTaxData.metaDescription,
        })}
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <PageHero
          title={withholdingTaxData.h1}
          description={withholdingTaxData.intro}
          badge={withholdingTaxData.updatedAt}
          breadcrumbs={breadcrumbs}
        />

        {/* Support text */}
        <p className="-mt-4 mb-8 text-sm text-muted-foreground">
          Useful for employees who want a quick estimate of how income tax
          affects monthly pay.
        </p>

        {/* Calculator */}
        <WithholdingTaxCalculator />

        {/* Result support text */}
        <p className="mt-4 text-xs text-muted-foreground">
          This estimate is based on your gross monthly salary annualized over
          12 months using the current Philippine income tax brackets.
        </p>

        {/* Important: Simplified Estimate Warning */}
        <div className="mt-6 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-50/50 p-4 dark:bg-amber-950/20">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Important: This Is a Simplified Estimate
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              This calculator uses gross monthly salary multiplied by 12 to
              estimate annual taxable income. It does not yet subtract
              mandatory contributions such as SSS, PhilHealth, and Pag-IBIG
              before computing tax.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Because of that, your actual payroll withholding may be lower
              than this estimate.
            </p>
          </div>
        </div>

        {/* How This Withholding Tax Estimate Works */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            How This Withholding Tax Estimate Works
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            This calculator follows a simple step-by-step logic to estimate
            your withholding tax from monthly salary.
          </p>
          <ol className="mt-4 space-y-2">
            {howItWorksSteps.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-muted-foreground"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-muted-foreground">
            In short, your monthly tax estimate comes from annual tax logic
            converted back into a monthly view.
          </p>
        </section>

        {/* Why Monthly Salary Is Converted to Annual Taxable Income */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Why Monthly Salary Is Converted to Annual Taxable Income
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Philippine income tax brackets are based on annual taxable income,
            not just one month of pay. That is why this calculator first
            annualizes your gross salary, then applies the correct bracket,
            then converts the result back into a monthly estimate.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            This makes it easier to estimate monthly withholding using the
            annual tax framework.
          </p>
        </section>

        {/* Current Income Tax Brackets */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Current Income Tax Brackets in the Philippines
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            These are the annual income tax brackets used for the estimate.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Annual taxable income up to ₱250,000 is generally exempt from
            income tax under the current structure.
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-foreground">
                    Annual Taxable Income
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-foreground">
                    Tax Rate
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-foreground">
                    Base Tax + Marginal Rule
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    Up to ₱250,000
                  </td>
                  <td className="px-4 py-2.5 text-center text-muted-foreground">
                    0%
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">₱0</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    ₱250,001 – ₱400,000
                  </td>
                  <td className="px-4 py-2.5 text-center text-muted-foreground">
                    15%
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    15% of excess over ₱250,000
                  </td>
                </tr>
                <tr className="bg-primary/5">
                  <td className="px-4 py-2.5 font-medium text-foreground">
                    ₱400,001 – ₱800,000
                  </td>
                  <td className="px-4 py-2.5 text-center font-medium text-foreground">
                    20%
                  </td>
                  <td className="px-4 py-2.5 font-medium text-foreground">
                    ₱22,500 + 20% of excess over ₱400,000
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    ₱800,001 – ₱2,000,000
                  </td>
                  <td className="px-4 py-2.5 text-center text-muted-foreground">
                    25%
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    ₱102,500 + 25% of excess over ₱800,000
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    ₱2,000,001 – ₱8,000,000
                  </td>
                  <td className="px-4 py-2.5 text-center text-muted-foreground">
                    30%
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    ₱402,500 + 30% of excess over ₱2,000,000
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    Over ₱8,000,000
                  </td>
                  <td className="px-4 py-2.5 text-center text-muted-foreground">
                    35%
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    ₱2,202,500 + 35% of excess over ₱8,000,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Source: TRAIN Law (RA 10963), effective January 1, 2023.
          </p>
        </section>

        {/* Worked Example */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Example: How Withholding Tax Is Estimated From Monthly Salary
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Here is a simple example to show how the estimate works in
            practice.
          </p>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">
                ₱35,000 Monthly Gross Salary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Monthly gross salary</dt>
                  <dd className="font-medium text-foreground">₱35,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Annualized income</dt>
                  <dd className="font-medium text-foreground">
                    ₱35,000 × 12 = ₱420,000
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Matching bracket</dt>
                  <dd className="font-medium text-foreground">
                    Over ₱400,000 up to ₱800,000
                  </dd>
                </div>
                <div className="border-t border-border pt-2">
                  <p className="text-xs text-muted-foreground">
                    Tax formula: ₱22,500 + 20% of excess over ₱400,000
                  </p>
                  <p className="text-xs text-muted-foreground">
                    = ₱22,500 + 20% × ₱20,000 = ₱22,500 + ₱4,000
                  </p>
                </div>
                <div className="flex justify-between border-t border-border pt-2">
                  <dt className="text-muted-foreground">
                    Estimated annual income tax
                  </dt>
                  <dd className="font-semibold text-foreground">₱26,500</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">
                    Estimated monthly withholding tax
                  </dt>
                  <dd className="font-semibold text-primary">
                    ₱26,500 ÷ 12 ≈ ₱2,208/mo
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Effective tax rate</dt>
                  <dd className="font-medium text-foreground">≈ 6.31%</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          <p className="mt-3 text-xs text-muted-foreground">
            This example is for illustration only. Actual payroll withholding
            may differ depending on deductions and employer payroll treatment.
          </p>
        </section>

        {/* Why Your Actual Payroll Withholding May Be Different */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Why Your Actual Payroll Withholding May Be Different
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your actual withholding tax in payroll may differ from this
            estimate for several reasons.
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {whyDifferent.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Tax-Only Take-Home Pay vs Full Net Pay */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Tax-Only Take-Home Pay vs Full Net Pay
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            This page estimates take-home pay after income tax only. It does
            not fully calculate your final payroll net pay after all mandatory
            deductions.
          </p>
          <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">
              If you want a broader estimate of what may actually reach your
              payslip or bank account, use the{" "}
              <Link
                href="/calculators/tax/take-home-pay-calculator-philippines"
                className="text-primary hover:underline"
              >
                Take-Home Pay Calculator
              </Link>{" "}
              as your next step.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <FaqSection faqs={withholdingTaxData.faqs} />

        {/* Related Tax Pages and Tools */}
        <section className="pt-16">
          <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
            Related Tax Pages and Tools
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            After estimating your withholding tax, you may also want to check
            the related tax table, read the guide, or estimate fuller net pay.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.title}
                  href={page.href}
                  className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Icon className="size-4" />
                  </div>
                  <span className="text-sm font-medium group-hover:text-primary">
                    {page.title}
                  </span>
                  <ArrowRight className="ml-auto size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mb-4 mt-16 rounded-lg border border-border bg-muted/30 p-8 text-center sm:p-10">
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
            Use this estimate to check withholding tax more clearly
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            A withholding tax calculator can help you understand the likely tax
            portion of your payroll deductions before reviewing your payslip or
            employer estimate. Use it to check salary-based tax scenarios, then
            use related tools if you also need contribution or net-pay
            estimates.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/calculators/tax/withholding-tax-calculator-philippines"
              className={buttonVariants({ className: "font-medium" })}
            >
              Calculate tax
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/calculators/tax/take-home-pay-calculator-philippines"
              className={buttonVariants({
                variant: "outline",
                className: "font-medium",
              })}
            >
              See take-home pay instead
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
