import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Home,
  Shield,
  Heart,
  Landmark,
  TrendingUp,
  Info,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
import { SourceCitation } from "@/components/shared/source-citation";
import { JsonLd } from "@/components/seo/json-ld";
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
    title: "Pag-IBIG MP2 Savings Guide",
    href: "/government/pag-ibig/pag-ibig-mp2-savings-guide",
    icon: TrendingUp,
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

    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Current Pag-IBIG Contribution Structure */}
      <section>
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Current Pag-IBIG Contribution Structure
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          This section shows the contribution assumptions currently used by
          this page. Because payroll reference pages are year-sensitive, the
          contribution basis, cap, and employee-employer split should be
          verified against the latest official Pag-IBIG guidance.
        </p>

        {/* Summary cards */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[14px] font-medium uppercase tracking-wide text-gray-400">
              Employee Share Used
            </p>
            <p className="mt-1 text-2xl font-bold text-brand">
              1% – 2%
            </p>
            <p className="mt-1 text-[14px] text-gray-400">
              1% if salary ≤ ₱1,500, else 2%
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[14px] font-medium uppercase tracking-wide text-gray-400">
              Employer Share Used
            </p>
            <p className="mt-1 text-2xl font-bold text-brand">2%</p>
            <p className="mt-1 text-[14px] text-gray-400">
              Regardless of salary level
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[14px] font-medium uppercase tracking-wide text-gray-400">
              Salary Cap Used
            </p>
            <p className="mt-1 text-2xl font-bold text-brand">
              {formatPeso(PAGIBIG_MAX_MSC)}
            </p>
            <p className="mt-1 text-[14px] text-gray-400">
              Maximum Monthly Salary Credit
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[14px] font-medium uppercase tracking-wide text-gray-400">
              Total Monthly Contribution
            </p>
            <p className="mt-1 text-lg font-bold text-gray-500">
              Up to {formatPeso(200)}
            </p>
            <p className="mt-1 text-[14px] text-gray-400">
              ₱100 employee + ₱100 employer (max)
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[14px] font-medium uppercase tracking-wide text-gray-400">
              Effective Period
            </p>
            <p className="mt-1 text-lg font-bold text-gray-500">
              Current Schedule
            </p>
            <p className="mt-1 text-[14px] text-gray-400">
              Based on Pag-IBIG Fund guidelines
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[14px] font-medium uppercase tracking-wide text-gray-400">
              Source Note
            </p>
            <p className="mt-1 text-lg font-bold text-gray-500">
              Pag-IBIG Fund
            </p>
            <p className="mt-1 text-[14px] text-gray-400">
              Official contribution guidelines
            </p>
          </div>
        </div>
      </section>

      {/* Pag-IBIG Contribution Table Reference */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Pag-IBIG Contribution Table Reference
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          Check the employee share first if you want to match what usually
          appears on a payslip.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-[16px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-200/20">
                <th className="px-4 py-3 text-left font-medium text-gray-500">
                  Monthly Compensation
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">
                  Employee Share
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">
                  Employer Share
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">
                  Total Contribution
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-gray-500 sm:table-cell">
                  Payroll Note
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pagibigContributionTable.map((row) => (
                <tr key={row.compensationRange}>
                  <td className="px-4 py-2.5 text-gray-400">
                    {row.compensationRange}
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium text-brand">
                    {row.employeeShare}
                  </td>
                  <td className="px-4 py-2.5 text-right text-gray-400">
                    {row.employerShare}
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium text-gray-500">
                    {row.totalContribution}
                  </td>
                  <td className="hidden px-4 py-2.5 text-[14px] text-gray-400 sm:table-cell">
                    {row.payrollNote}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[14px] text-gray-400">
          Always verify the latest official Pag-IBIG contribution schedule if
          you need the exact current payroll basis.
        </p>
      </section>

      {/* Who Pays the Pag-IBIG Contribution? */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Who Pays the Pag-IBIG Contribution?
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          For payroll users, one of the most important questions is whether the
          Pag-IBIG amount on the payslip is only the employee share or the full
          contribution. Here is how it works:
        </p>
        <ul className="mt-4 space-y-3">
          <li className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
            <ArrowRight className="size-4 shrink-0 text-gray-300" />
            <span>
              <strong className="text-gray-500">Employee share</strong> is the
              part usually deducted from salary
            </span>
          </li>
          <li className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
            <ArrowRight className="size-4 shrink-0 text-gray-300" />
            <span>
              <strong className="text-gray-500">Employer share</strong> is the
              part paid separately by the employer
            </span>
          </li>
          <li className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
            <ArrowRight className="size-4 shrink-0 text-gray-300" />
            <span>
              <strong className="text-gray-500">Total contribution</strong> is
              the sum of both sides
            </span>
          </li>
          <li className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
            <ArrowRight className="size-4 shrink-0 text-gray-300" />
            <span>
              The payslip often shows only the employee-side deduction
            </span>
          </li>
        </ul>

        {/* Visual split */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
            <Shield className="mx-auto size-8 text-brand" />
            <p className="mt-2 text-[16px] font-semibold text-gray-500">
              Employee Share
            </p>
            <p className="mt-1 text-2xl font-bold text-brand">
              Up to {formatPeso(100)}
            </p>
            <p className="mt-1 text-[14px] text-gray-400">
              Deducted from your payslip
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
            <Landmark className="mx-auto size-8 text-gray-300" />
            <p className="mt-2 text-[16px] font-semibold text-gray-500">
              Employer Share
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-500">
              Up to {formatPeso(100)}
            </p>
            <p className="mt-1 text-[14px] text-gray-400">
              Paid by your employer
            </p>
          </div>
        </div>
      </section>

      {/* How Salary Caps Affect the Deduction */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          How Salary Caps Affect the Deduction
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          Pag-IBIG payroll deductions are easier to understand when the salary
          cap is explained clearly. The contribution is computed on monthly
          salary up to a maximum of {formatPeso(PAGIBIG_MAX_MSC)}. Once salary
          exceeds this cap, the contribution does not increase further — it
          stays at {formatPeso(100)} for the employee share and{" "}
          {formatPeso(100)} for the employer share.
        </p>

        {/* Visual cap diagram */}
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
            <p className="text-[14px] font-medium uppercase tracking-wide text-gray-400">
              Below ₱1,500
            </p>
            <p className="mt-1 text-lg font-bold text-gray-500">
              Employee 1%
            </p>
            <p className="mt-1 text-[14px] text-gray-400">
              Lower rate applies
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
            <p className="text-[14px] font-medium uppercase tracking-wide text-brand">
              ₱1,500 – ₱5,000
            </p>
            <p className="mt-1 text-lg font-bold text-brand">
              Employee 2%
            </p>
            <p className="mt-1 text-[14px] text-gray-400">
              Standard rate, actual salary
            </p>
          </div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-50/50 p-6 text-center">
            <p className="text-[14px] font-medium uppercase tracking-wide text-amber-700">
              Above ₱5,000
            </p>
            <p className="mt-1 text-lg font-bold text-amber-700">
              Capped at {formatPeso(100)}
            </p>
            <p className="mt-1 text-[14px] text-gray-400">
              Contribution stops increasing
            </p>
          </div>
        </div>
      </section>

      {/* Sample Pag-IBIG Payroll Cuts */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Sample Pag-IBIG Payroll Cuts
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          These examples help connect the reference table to actual payslip
          expectations.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {pagibigPayrollExamples.map((example, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                {example.label}
              </h3>
              <dl className="mt-4 space-y-2 text-[16px] leading-[22px]">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Monthly Salary</dt>
                  <dd className="font-medium text-gray-500">
                    {formatPeso(example.salary)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <dt className="text-gray-400">Employee Share</dt>
                  <dd className="font-semibold text-brand">
                    {formatPeso(example.employeeShare)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Employer Share</dt>
                  <dd className="font-medium text-gray-500">
                    {formatPeso(example.employerShare)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <dt className="text-gray-400">
                    Total Contribution
                  </dt>
                  <dd className="font-medium text-gray-500">
                    {formatPeso(example.totalContribution)}
                  </dd>
                </div>
              </dl>
              <p className="mt-3 text-[14px] text-gray-400">
                {example.payslipNote}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Where Pag-IBIG Appears on Payroll */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Where Pag-IBIG Appears on Payroll
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          Pag-IBIG is usually one of the standard government deductions shown on
          a payslip together with SSS, PhilHealth, and withholding tax. The
          employee share is typically listed as a separate line item in the
          deductions section. Understanding that Pag-IBIG is only one part of
          the full payroll deduction picture helps when comparing it against
          other deductions.
        </p>
        <p className="mt-3 text-[16px] leading-[22px] text-gray-400">
          If you want to see Pag-IBIG together with other common deductions,
          use the{" "}
          <Link
            href="/calculators/tax/take-home-pay-calculator-philippines"
            className="text-brand hover:underline"
          >
            Take-Home Pay Calculator
          </Link>{" "}
          next.
        </p>
      </section>

      {/* Why Your Actual Pag-IBIG Deduction May Differ */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Why Your Actual Pag-IBIG Deduction May Differ
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          Actual payroll deductions may differ from a simplified reference page
          because payroll systems may apply updated contribution settings,
          compensation treatment, timing differences, or company-specific
          payroll handling. This page should be used as a practical reference,
          not a replacement for official payroll computation.
        </p>
        <ul className="mt-4 space-y-3">
          {whyDifferItems.map((item) => (
            <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
              <ArrowRight className="size-4 shrink-0 text-gray-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

    </div>

      {/* Calculator CTA */}
      <section className="bg-surface-tertiary py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Want a Full Payroll Estimate?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-[22px] text-gray-400">
            If you want to see how Pag-IBIG combines with SSS, PhilHealth,
            and withholding tax to produce your net pay, use the Take-Home
            Pay Calculator for a fuller deduction estimate.
          </p>
          <div className="mt-6">
            <Link
              href="/calculators/tax/take-home-pay-calculator-philippines"
              className="inline-flex items-center rounded-full bg-brand px-6 py-3 text-[14px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
            >
              USE THE TAKE-HOME PAY CALCULATOR
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-0 pb-20 sm:px-6 lg:px-8">
      {/* FAQ */}
      <div className="mt-16">
        <FaqSection faqs={pagibigContributionFaqs} />
      </div>

      {/* Related Payroll and Pag-IBIG Pages */}
      <section className="mt-16">
        <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
          Related payroll and Pag-IBIG pages
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedPages.map((page) => {
            const Icon = page.icon;
            return (
              <Link
                key={page.title}
                href={page.href}
                className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-brand">
                  <Icon className="size-4" />
                </div>
                <span className="flex-1 text-[16px] font-semibold text-gray-500 group-hover:text-brand">
                  {page.title}
                </span>
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Source Citation */}
      <div className="mt-16">
        <SourceCitation
          source="Pag-IBIG Fund — Circular No. 274 (as amended), Pag-IBIG Contribution Guidelines"
          sourceUrl="https://www.pagibigfund.gov.ph/"
          updatedAt={PAGIBIG_CONTRIBUTION_UPDATED_AT}
          reviewCadence="Every 90 days"
        />
      </div>

      {/* Disclaimer */}
      <div className="mt-4">
        <DisclaimerBox text={GOVERNMENT_DISCLAIMER} />
      </div>
    </div>
    </>
  );
}
