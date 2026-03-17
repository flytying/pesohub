import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle,
  BookOpen,
  BarChart3,
  Landmark,
  Shield,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
import { SourceCitation } from "@/components/shared/source-citation";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { buttonVariants } from "@/lib/button-variants";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema-markup";
import { formatPeso } from "@/lib/formatters";
import { GOVERNMENT_DISCLAIMER } from "@/lib/constants";
import {
  philhealthMeta,
  philhealthContributionTable,
  philhealthPayrollExamples,
  philhealthFaqs,
  PHILHEALTH_UPDATED_AT,
  PHILHEALTH_SALARY_FLOOR,
  PHILHEALTH_SALARY_CEILING,
} from "@/data/government/philhealth";

export const metadata = generatePageMetadata({
  title: philhealthMeta.metaTitle,
  description: philhealthMeta.metaDescription,
  slug: philhealthMeta.slug,
  updatedAt: PHILHEALTH_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "PhilHealth Contribution Table" },
];

const howToUsePoints = [
  "check the current premium rate",
  "view the salary floor and salary ceiling",
  "see employee and employer share",
  "review sample monthly payroll cuts",
  "move to the Take-Home Pay Calculator for a fuller deduction estimate",
];

const whatThisHelps = [
  "verify the PhilHealth contribution basis used in payroll",
  "understand why PhilHealth deduction changes as salary changes",
  "see how the salary floor and ceiling work",
  "check employee share versus employer share",
  "compare PhilHealth with other payroll deductions",
];

const relatedPages = [
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "SSS Contribution Calculator",
    href: "/calculators/sss/sss-contribution-calculator-philippines",
    icon: BarChart3,
  },
  {
    title: "Withholding Tax Calculator",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "SSS Contribution Table",
    href: "/government/sss/sss-contribution-guide",
    icon: BookOpen,
  },
  {
    title: "Government Hub",
    href: "/government",
    icon: Landmark,
  },
];

export default function PhilHealthContributionTablePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: philhealthMeta.metaTitle,
          description: philhealthMeta.metaDescription,
          updatedAt: PHILHEALTH_UPDATED_AT,
          slug: philhealthMeta.slug,
        })}
      />

      {/* Hero */}
      <PageHero
        title={philhealthMeta.title}
        description={philhealthMeta.directAnswer}
        badge={PHILHEALTH_UPDATED_AT}
        breadcrumbs={breadcrumbs}
      />

      {/* Support text */}
      <p className="-mt-4 mb-8 text-sm text-muted-foreground">
        Useful for employees, employers, and payroll users who want a
        plain-language PhilHealth contribution reference.
      </p>

      {/* How to Use This Page */}
      <section className="mb-10 rounded-lg border border-border bg-muted/30 p-6">
        <h2 className="text-sm font-semibold text-foreground">
          How to Use This Page
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          This page summarizes the current PhilHealth premium contribution
          structure in a format that is easier to scan than a raw circular or
          PDF. Use it to understand how PhilHealth premium is computed, how the
          monthly salary floor and ceiling affect the amount, and how the
          contribution is usually split for employed members.
        </p>
        <p className="mt-3 text-sm font-medium text-foreground/80">
          Use this page to:
        </p>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          {howToUsePoints.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Current PhilHealth Contribution Structure */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Current PhilHealth Contribution Structure
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          PhilHealth&apos;s published employer contribution table shows the
          premium schedule for direct contributors under Circular No. 2019-0009.
          The table shows a 5.0% premium rate for 2025, applied to monthly basic
          salary, subject to the published salary floor and salary ceiling.
        </p>

        {/* Summary cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Premium Rate Used
              </p>
              <p className="mt-1 text-2xl font-bold text-primary">5.0%</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Of monthly basic salary
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Monthly Salary Floor
              </p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {formatPeso(PHILHEALTH_SALARY_FLOOR)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Minimum basis for premium
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Monthly Salary Ceiling
              </p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {formatPeso(PHILHEALTH_SALARY_CEILING)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Maximum basis for premium
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Total Monthly Premium
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {formatPeso(500)} – {formatPeso(5_000)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Range from floor to ceiling
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Employee Share
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">50%</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Half of total premium
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Employer Share
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">50%</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Half of total premium
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* PhilHealth Contribution Table Reference */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          PhilHealth Contribution Table Reference
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          For employed members, the total PhilHealth premium is commonly split
          equally between employee and employer. If salary is below the floor,
          the premium is based on the floor. If salary is above the ceiling, the
          premium is based on the ceiling.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Monthly Basic Salary
                </th>
                <th className="px-4 py-3 text-center font-medium text-foreground">
                  Premium Rate
                </th>
                <th className="px-4 py-3 text-right font-medium text-foreground">
                  Total Monthly Premium
                </th>
                <th className="px-4 py-3 text-right font-medium text-foreground">
                  Employee Share
                </th>
                <th className="px-4 py-3 text-right font-medium text-foreground">
                  Employer Share
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {philhealthContributionTable.map((row) => (
                <tr key={row.salaryRange}>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    {row.salaryRange}
                  </td>
                  <td className="px-4 py-2.5 text-center text-muted-foreground">
                    {row.premiumRate}
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium text-foreground">
                    {formatPeso(row.totalPremium)}
                  </td>
                  <td className="px-4 py-2.5 text-right text-primary font-medium">
                    {formatPeso(row.employeeShare)}
                  </td>
                  <td className="px-4 py-2.5 text-right text-muted-foreground">
                    {formatPeso(row.employerShare)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Always verify the latest PhilHealth table or advisory if you need the
          exact current payroll basis.
        </p>
      </section>

      {/* How Salary Floor and Ceiling Affect PhilHealth Contribution */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          How Salary Floor and Ceiling Affect PhilHealth Contribution
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          PhilHealth contribution does not increase without limit. If salary is
          below the salary floor, the contribution is computed using the minimum
          salary floor of {formatPeso(PHILHEALTH_SALARY_FLOOR)}. If salary is
          above the salary ceiling, the contribution is computed using the
          maximum salary ceiling of {formatPeso(PHILHEALTH_SALARY_CEILING)}.
          This helps explain why payroll deductions may stop increasing after a
          certain salary level.
        </p>

        {/* Visual floor/ceiling diagram */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Card className="border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
            <CardContent className="p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-amber-700 dark:text-amber-400">
                Below Floor
              </p>
              <p className="mt-1 text-lg font-bold text-amber-700 dark:text-amber-400">
                Uses {formatPeso(PHILHEALTH_SALARY_FLOOR)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Premium = {formatPeso(500)} total
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-primary">
                Within Range
              </p>
              <p className="mt-1 text-lg font-bold text-primary">
                Uses Actual Salary
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Premium = 5% of salary
              </p>
            </CardContent>
          </Card>
          <Card className="border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
            <CardContent className="p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-amber-700 dark:text-amber-400">
                Above Ceiling
              </p>
              <p className="mt-1 text-lg font-bold text-amber-700 dark:text-amber-400">
                Uses {formatPeso(PHILHEALTH_SALARY_CEILING)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Premium = {formatPeso(5_000)} total
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sample PhilHealth Payroll Cuts */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Sample PhilHealth Payroll Cuts
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          These examples help show how the PhilHealth deduction may look in a
          payroll context.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {philhealthPayrollExamples.map((example, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-sm">{example.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Monthly Salary</dt>
                    <dd className="font-medium text-foreground">
                      {formatPeso(example.salary)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Basis Used</dt>
                    <dd className="font-medium text-foreground">
                      {formatPeso(example.basisUsed)}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <dt className="text-muted-foreground">
                      Total PhilHealth Premium
                    </dt>
                    <dd className="font-medium text-foreground">
                      {formatPeso(example.totalPremium)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Employee Share</dt>
                    <dd className="font-semibold text-primary">
                      {formatPeso(example.employeeShare)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Employer Share</dt>
                    <dd className="font-medium text-foreground">
                      {formatPeso(example.employerShare)}
                    </dd>
                  </div>
                </dl>
                <p className="mt-3 text-xs text-muted-foreground">
                  {example.note}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Employee Share vs Employer Share */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Employee Share vs Employer Share
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          For employed members, the total monthly premium is typically shared
          equally between employer and employee. That means the employee-side
          payroll deduction is usually half of the total premium, while the
          employer pays the other half.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          This is one of the most important things to understand because many
          users only see the employee-side deduction on their payslip and do not
          realize the total premium is larger.
        </p>

        {/* Visual split */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-5 text-center">
              <Shield className="mx-auto size-8 text-primary" />
              <p className="mt-2 text-sm font-semibold text-foreground">
                Employee Share
              </p>
              <p className="mt-1 text-2xl font-bold text-primary">50%</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Deducted from your payslip
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {formatPeso(250)} – {formatPeso(2_500)} per month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 text-center">
              <Landmark className="mx-auto size-8 text-muted-foreground" />
              <p className="mt-2 text-sm font-semibold text-foreground">
                Employer Share
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">50%</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Paid by your employer
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {formatPeso(250)} – {formatPeso(2_500)} per month
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What This Page Helps You Check */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          What This Page Helps You Check
        </h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Use this page if you want to:
        </p>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          {whatThisHelps.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Why Your Actual PhilHealth Deduction May Differ */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Why Your Actual PhilHealth Deduction May Differ
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Your actual payroll deduction may differ from a simple reference table
          because payroll systems may apply specific timing, salary treatment,
          rounding, or updated implementation guidance. This page should be used
          as a practical reference, not as a replacement for your
          employer&apos;s payroll system or official PhilHealth notices.
        </p>
      </section>

      {/* Want a Full Payroll Estimate? */}
      <Card className="my-8 border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Calculator className="size-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-foreground">
              Want a Full Payroll Estimate?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              If you want to see how PhilHealth combines with SSS, Pag-IBIG, and
              withholding tax to produce your net pay, use the Take-Home Pay
              Calculator for a fuller deduction estimate.
            </p>
          </div>
          <Link
            href="/calculators/tax/take-home-pay-calculator-philippines"
            className={buttonVariants({
              className: "shrink-0 font-medium",
            })}
          >
            Use the Calculator
            <ArrowRight className="size-4" />
          </Link>
        </CardContent>
      </Card>

      {/* FAQ */}
      <FaqSection faqs={philhealthFaqs} />

      {/* Related Payroll Tools and Guides */}
      <section className="pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Related Payroll Tools and Guides
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          After checking the PhilHealth contribution table, you may also want to
          review these related pages.
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

      {/* Source Citation */}
      <div className="py-8">
        <SourceCitation
          source="PhilHealth — Circular No. 2019-0009, PhilHealth Premium Contribution Schedule"
          sourceUrl="https://www.philhealth.gov.ph/"
          updatedAt={PHILHEALTH_UPDATED_AT}
          reviewCadence="Every 90 days"
        />
      </div>

      {/* Disclaimer */}
      <DisclaimerBox text={GOVERNMENT_DISCLAIMER} />
    </div>
  );
}
