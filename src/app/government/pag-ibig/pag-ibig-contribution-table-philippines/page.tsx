import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle,
  BookOpen,
  Landmark,
  Home,
  Shield,
  Heart,
  BarChart3,
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
  pagibigContributionMeta,
  pagibigContributionTable,
  pagibigPayrollExamples,
  pagibigContributionFaqs,
  PAGIBIG_CONTRIBUTION_UPDATED_AT,
  PAGIBIG_MAX_MSC,
} from "@/data/government/pag-ibig-contribution";

export const metadata = generatePageMetadata({
  title: pagibigContributionMeta.metaTitle,
  description: pagibigContributionMeta.metaDescription,
  slug: pagibigContributionMeta.slug,
  updatedAt: PAGIBIG_CONTRIBUTION_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "Pag-IBIG Contribution Table" },
];

const whyDifferItems = [
  "Payroll systems may apply updated contribution settings not yet reflected in a simplified reference",
  "Compensation treatment may differ depending on how salary components are classified",
  "Timing differences between payroll cut-off and actual contribution remittance",
  "Company-specific payroll handling or rounding rules",
  "Updated Pag-IBIG circulars or contribution guidelines released after the schedule shown here",
];

const relatedPages = [
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Pag-IBIG Housing Loan Guide",
    href: "/government/pag-ibig/pag-ibig-housing-loan-guide",
    icon: Home,
  },
  {
    title: "PhilHealth Contribution Table",
    href: "/government/philhealth/philhealth-contribution-table-philippines",
    icon: Heart,
  },
  {
    title: "SSS Contribution Table",
    href: "/government/sss/sss-contribution-guide",
    icon: Shield,
  },
  {
    title: "Withholding Tax Calculator",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Government Hub",
    href: "/government",
    icon: Landmark,
  },
];

export default function PagIBIGContributionTablePage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: pagibigContributionMeta.metaTitle,
          description: pagibigContributionMeta.metaDescription,
          updatedAt: PAGIBIG_CONTRIBUTION_UPDATED_AT,
          slug: pagibigContributionMeta.slug,
        })}
      />

      <PageHero
        title={pagibigContributionMeta.title}
        description={pagibigContributionMeta.directAnswer}
        badge={PAGIBIG_CONTRIBUTION_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Current Pag-IBIG Contribution Structure */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Current Pag-IBIG Contribution Structure
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          This section shows the contribution assumptions currently used by
          this page. Because payroll reference pages are year-sensitive, the
          contribution basis, cap, and employee-employer split should be
          verified against the latest official Pag-IBIG guidance.
        </p>

        {/* Summary cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Employee Share Used
              </p>
              <p className="mt-1 text-2xl font-bold text-primary">
                1% – 2%
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                1% if salary ≤ ₱1,500, else 2%
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Employer Share Used
              </p>
              <p className="mt-1 text-2xl font-bold text-primary">2%</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Regardless of salary level
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Salary Cap Used
              </p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {formatPeso(PAGIBIG_MAX_MSC)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Maximum Monthly Salary Credit
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Total Monthly Contribution
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                Up to {formatPeso(200)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                ₱100 employee + ₱100 employer (max)
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Effective Period
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                Current Schedule
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Based on Pag-IBIG Fund guidelines
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Source Note
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                Pag-IBIG Fund
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Official contribution guidelines
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pag-IBIG Contribution Table Reference */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Pag-IBIG Contribution Table Reference
        </h2>
        <p className="mb-2 text-sm text-muted-foreground">
          Check the employee share first if you want to match what usually
          appears on a payslip.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Monthly Compensation
                </th>
                <th className="px-4 py-3 text-right font-medium text-foreground">
                  Employee Share
                </th>
                <th className="px-4 py-3 text-right font-medium text-foreground">
                  Employer Share
                </th>
                <th className="px-4 py-3 text-right font-medium text-foreground">
                  Total Contribution
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-foreground sm:table-cell">
                  Payroll Note
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pagibigContributionTable.map((row) => (
                <tr key={row.compensationRange}>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    {row.compensationRange}
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium text-primary">
                    {row.employeeShare}
                  </td>
                  <td className="px-4 py-2.5 text-right text-muted-foreground">
                    {row.employerShare}
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium text-foreground">
                    {row.totalContribution}
                  </td>
                  <td className="hidden px-4 py-2.5 text-xs text-muted-foreground sm:table-cell">
                    {row.payrollNote}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Always verify the latest official Pag-IBIG contribution schedule if
          you need the exact current payroll basis.
        </p>
      </section>

      {/* Who Pays the Pag-IBIG Contribution? */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Who Pays the Pag-IBIG Contribution?
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          For payroll users, one of the most important questions is whether the
          Pag-IBIG amount on the payslip is only the employee share or the full
          contribution. Here is how it works:
        </p>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>
              <strong className="text-foreground">Employee share</strong> is the
              part usually deducted from salary
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>
              <strong className="text-foreground">Employer share</strong> is the
              part paid separately by the employer
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>
              <strong className="text-foreground">Total contribution</strong> is
              the sum of both sides
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>
              The payslip often shows only the employee-side deduction
            </span>
          </li>
        </ul>

        {/* Visual split */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-5 text-center">
              <Shield className="mx-auto size-8 text-primary" />
              <p className="mt-2 text-sm font-semibold text-foreground">
                Employee Share
              </p>
              <p className="mt-1 text-2xl font-bold text-primary">
                Up to {formatPeso(100)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Deducted from your payslip
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 text-center">
              <Landmark className="mx-auto size-8 text-muted-foreground" />
              <p className="mt-2 text-sm font-semibold text-foreground">
                Employer Share
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                Up to {formatPeso(100)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Paid by your employer
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How Salary Caps Affect the Deduction */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          How Salary Caps Affect the Deduction
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Pag-IBIG payroll deductions are easier to understand when the salary
          cap is explained clearly. The contribution is computed on monthly
          salary up to a maximum of {formatPeso(PAGIBIG_MAX_MSC)}. Once salary
          exceeds this cap, the contribution does not increase further — it
          stays at {formatPeso(100)} for the employee share and{" "}
          {formatPeso(100)} for the employer share.
        </p>

        {/* Visual cap diagram */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Below ₱1,500
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                Employee 1%
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Lower rate applies
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-primary">
                ₱1,500 – ₱5,000
              </p>
              <p className="mt-1 text-lg font-bold text-primary">
                Employee 2%
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Standard rate, actual salary
              </p>
            </CardContent>
          </Card>
          <Card className="border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
            <CardContent className="p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-amber-700 dark:text-amber-400">
                Above ₱5,000
              </p>
              <p className="mt-1 text-lg font-bold text-amber-700 dark:text-amber-400">
                Capped at {formatPeso(100)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Contribution stops increasing
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sample Pag-IBIG Payroll Cuts */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Sample Pag-IBIG Payroll Cuts
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          These examples help connect the reference table to actual payslip
          expectations.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {pagibigPayrollExamples.map((example, i) => (
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
                  <div className="flex justify-between border-t border-border pt-2">
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
                  <div className="flex justify-between border-t border-border pt-2">
                    <dt className="text-muted-foreground">
                      Total Contribution
                    </dt>
                    <dd className="font-medium text-foreground">
                      {formatPeso(example.totalContribution)}
                    </dd>
                  </div>
                </dl>
                <p className="mt-3 text-xs text-muted-foreground">
                  {example.payslipNote}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Where Pag-IBIG Appears on Payroll */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Where Pag-IBIG Appears on Payroll
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Pag-IBIG is usually one of the standard government deductions shown on
          a payslip together with SSS, PhilHealth, and withholding tax. The
          employee share is typically listed as a separate line item in the
          deductions section. Understanding that Pag-IBIG is only one part of
          the full payroll deduction picture helps when comparing it against
          other deductions.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          If you want to see Pag-IBIG together with other common deductions,
          use the{" "}
          <Link
            href="/calculators/tax/take-home-pay-calculator-philippines"
            className="text-primary hover:underline"
          >
            Take-Home Pay Calculator
          </Link>{" "}
          next.
        </p>
      </section>

      {/* Why Your Actual Pag-IBIG Deduction May Differ */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Why Your Actual Pag-IBIG Deduction May Differ
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          Actual payroll deductions may differ from a simplified reference page
          because payroll systems may apply updated contribution settings,
          compensation treatment, timing differences, or company-specific
          payroll handling. This page should be used as a practical reference,
          not a replacement for official payroll computation.
        </p>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          {whyDifferItems.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
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
              If you want to see how Pag-IBIG combines with SSS, PhilHealth,
              and withholding tax to produce your net pay, use the Take-Home
              Pay Calculator for a fuller deduction estimate.
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
      <FaqSection faqs={pagibigContributionFaqs} />

      {/* Related Payroll and Pag-IBIG Pages */}
      <section className="pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Related Payroll and Pag-IBIG Pages
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          After checking the Pag-IBIG contribution table, you may also want to
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
          source="Pag-IBIG Fund — Circular No. 274 (as amended), Pag-IBIG Contribution Guidelines"
          sourceUrl="https://www.pagibigfund.gov.ph/"
          updatedAt={PAGIBIG_CONTRIBUTION_UPDATED_AT}
          reviewCadence="Every 90 days"
        />
      </div>

      {/* Disclaimer */}
      <DisclaimerBox text={GOVERNMENT_DISCLAIMER} />
    </div>
    </>
  );
}
