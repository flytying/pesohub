import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  BookOpen,
  BarChart3,
  Landmark,
  Shield,
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
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: philhealthMeta.metaTitle,
          description: philhealthMeta.metaDescription,
          updatedAt: PHILHEALTH_UPDATED_AT,
          slug: philhealthMeta.slug,
        })}
      />

      <PageHero
        title={philhealthMeta.title}
        description={philhealthMeta.directAnswer}
        badge={PHILHEALTH_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Current PhilHealth Contribution Structure */}
      <section>
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Current PhilHealth Contribution Structure
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          PhilHealth&apos;s published employer contribution table shows the
          premium schedule for direct contributors under Circular No. 2019-0009.
          The table shows a 5.0% premium rate for 2025, applied to monthly basic
          salary, subject to the published salary floor and salary ceiling.
        </p>

        {/* Summary cards */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[14px] font-medium uppercase tracking-wide text-gray-400">
              Premium Rate Used
            </p>
            <p className="mt-1 text-2xl font-bold text-brand">5.0%</p>
            <p className="mt-1 text-[14px] text-gray-400">
              Of monthly basic salary
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[14px] font-medium uppercase tracking-wide text-gray-400">
              Monthly Salary Floor
            </p>
            <p className="mt-1 text-2xl font-bold text-brand">
              {formatPeso(PHILHEALTH_SALARY_FLOOR)}
            </p>
            <p className="mt-1 text-[14px] text-gray-400">
              Minimum basis for premium
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[14px] font-medium uppercase tracking-wide text-gray-400">
              Monthly Salary Ceiling
            </p>
            <p className="mt-1 text-2xl font-bold text-brand">
              {formatPeso(PHILHEALTH_SALARY_CEILING)}
            </p>
            <p className="mt-1 text-[14px] text-gray-400">
              Maximum basis for premium
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[14px] font-medium uppercase tracking-wide text-gray-400">
              Total Monthly Premium
            </p>
            <p className="mt-1 text-lg font-bold text-gray-500">
              {formatPeso(500)} – {formatPeso(5_000)}
            </p>
            <p className="mt-1 text-[14px] text-gray-400">
              Range from floor to ceiling
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[14px] font-medium uppercase tracking-wide text-gray-400">
              Employee Share
            </p>
            <p className="mt-1 text-lg font-bold text-gray-500">50%</p>
            <p className="mt-1 text-[14px] text-gray-400">
              Half of total premium
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[14px] font-medium uppercase tracking-wide text-gray-400">
              Employer Share
            </p>
            <p className="mt-1 text-lg font-bold text-gray-500">50%</p>
            <p className="mt-1 text-[14px] text-gray-400">
              Half of total premium
            </p>
          </div>
        </div>
      </section>

      {/* PhilHealth Contribution Table Reference */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          PhilHealth Contribution Table Reference
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          For employed members, the total PhilHealth premium is commonly split
          equally between employee and employer. If salary is below the floor,
          the premium is based on the floor. If salary is above the ceiling, the
          premium is based on the ceiling.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-[16px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-200/20">
                <th className="px-4 py-3 text-left font-medium text-gray-500">
                  Monthly Basic Salary
                </th>
                <th className="px-4 py-3 text-center font-medium text-gray-500">
                  Premium Rate
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">
                  Total Monthly Premium
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">
                  Employee Share
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">
                  Employer Share
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {philhealthContributionTable.map((row) => (
                <tr key={row.salaryRange}>
                  <td className="px-4 py-2.5 text-gray-400">
                    {row.salaryRange}
                  </td>
                  <td className="px-4 py-2.5 text-center text-gray-400">
                    {row.premiumRate}
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium text-gray-500">
                    {formatPeso(row.totalPremium)}
                  </td>
                  <td className="px-4 py-2.5 text-right text-brand font-medium">
                    {formatPeso(row.employeeShare)}
                  </td>
                  <td className="px-4 py-2.5 text-right text-gray-400">
                    {formatPeso(row.employerShare)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[14px] text-gray-400">
          Always verify the latest PhilHealth table or advisory if you need the
          exact current payroll basis.
        </p>
      </section>

      {/* How Salary Floor and Ceiling Affect PhilHealth Contribution */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          How Salary Floor and Ceiling Affect PhilHealth Contribution
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          PhilHealth contribution does not increase without limit. If salary is
          below the salary floor, the contribution is computed using the minimum
          salary floor of {formatPeso(PHILHEALTH_SALARY_FLOOR)}. If salary is
          above the salary ceiling, the contribution is computed using the
          maximum salary ceiling of {formatPeso(PHILHEALTH_SALARY_CEILING)}.
          This helps explain why payroll deductions may stop increasing after a
          certain salary level.
        </p>

        {/* Visual floor/ceiling diagram */}
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <div className="rounded-xl border border-amber-500/30 bg-amber-50/50 p-6 text-center">
            <p className="text-[14px] font-medium uppercase tracking-wide text-amber-700">
              Below Floor
            </p>
            <p className="mt-1 text-lg font-bold text-amber-700">
              Uses {formatPeso(PHILHEALTH_SALARY_FLOOR)}
            </p>
            <p className="mt-1 text-[14px] text-gray-400">
              Premium = {formatPeso(500)} total
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
            <p className="text-[14px] font-medium uppercase tracking-wide text-brand">
              Within Range
            </p>
            <p className="mt-1 text-lg font-bold text-brand">
              Uses Actual Salary
            </p>
            <p className="mt-1 text-[14px] text-gray-400">
              Premium = 5% of salary
            </p>
          </div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-50/50 p-6 text-center">
            <p className="text-[14px] font-medium uppercase tracking-wide text-amber-700">
              Above Ceiling
            </p>
            <p className="mt-1 text-lg font-bold text-amber-700">
              Uses {formatPeso(PHILHEALTH_SALARY_CEILING)}
            </p>
            <p className="mt-1 text-[14px] text-gray-400">
              Premium = {formatPeso(5_000)} total
            </p>
          </div>
        </div>
      </section>

      {/* Sample PhilHealth Payroll Cuts */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Sample PhilHealth Payroll Cuts
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          These examples help show how the PhilHealth deduction may look in a
          payroll context.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {philhealthPayrollExamples.map((example, i) => (
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
                <div className="flex justify-between">
                  <dt className="text-gray-400">Basis Used</dt>
                  <dd className="font-medium text-gray-500">
                    {formatPeso(example.basisUsed)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <dt className="text-gray-400">
                    Total PhilHealth Premium
                  </dt>
                  <dd className="font-medium text-gray-500">
                    {formatPeso(example.totalPremium)}
                  </dd>
                </div>
                <div className="flex justify-between">
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
              </dl>
              <p className="mt-3 text-[14px] text-gray-400">
                {example.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Employee Share vs Employer Share */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Employee Share vs Employer Share
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          For employed members, the total monthly premium is typically shared
          equally between employer and employee. That means the employee-side
          payroll deduction is usually half of the total premium, while the
          employer pays the other half.
        </p>
        <p className="mt-3 text-[16px] leading-[22px] text-gray-400">
          This is one of the most important things to understand because many
          users only see the employee-side deduction on their payslip and do not
          realize the total premium is larger.
        </p>

        {/* Visual split */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
            <Shield className="mx-auto size-8 text-brand" />
            <p className="mt-2 text-[16px] font-semibold text-gray-500">
              Employee Share
            </p>
            <p className="mt-1 text-2xl font-bold text-brand">50%</p>
            <p className="mt-1 text-[14px] text-gray-400">
              Deducted from your payslip
            </p>
            <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
              {formatPeso(250)} – {formatPeso(2_500)} per month
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
            <Landmark className="mx-auto size-8 text-gray-300" />
            <p className="mt-2 text-[16px] font-semibold text-gray-500">
              Employer Share
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-500">50%</p>
            <p className="mt-1 text-[14px] text-gray-400">
              Paid by your employer
            </p>
            <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
              {formatPeso(250)} – {formatPeso(2_500)} per month
            </p>
          </div>
        </div>
      </section>

      {/* Why Your Actual PhilHealth Deduction May Differ */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Why Your Actual PhilHealth Deduction May Differ
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          Your actual payroll deduction may differ from a simple reference table
          because payroll systems may apply specific timing, salary treatment,
          rounding, or updated implementation guidance. This page should be used
          as a practical reference, not as a replacement for your
          employer&apos;s payroll system or official PhilHealth notices.
        </p>
      </section>

    </div>

      {/* Calculator CTA */}
      <section className="bg-surface-tertiary py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Want a Full Payroll Estimate?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-[22px] text-gray-400">
            If you want to see how PhilHealth combines with SSS, Pag-IBIG, and
            withholding tax to produce your net pay, use the Take-Home Pay
            Calculator for a fuller deduction estimate.
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
        <FaqSection faqs={philhealthFaqs} />
      </div>

      {/* Related Payroll Tools and Guides */}
      <section className="mt-16">
        <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
          Related payroll tools and guides
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
          source="PhilHealth — Circular No. 2019-0009, PhilHealth Premium Contribution Schedule"
          sourceUrl="https://www.philhealth.gov.ph/"
          updatedAt={PHILHEALTH_UPDATED_AT}
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
