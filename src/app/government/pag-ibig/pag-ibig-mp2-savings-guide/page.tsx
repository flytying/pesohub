import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Home,
  Shield,
  Landmark,
  TrendingUp,
  Info,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
import { SourceCitation } from "@/components/shared/source-citation";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema-markup";
import { GOVERNMENT_DISCLAIMER } from "@/lib/constants";
import {
  pagibigMp2Meta,
  mp2AtAGlance,
  mp2SalaryDeductionSteps,
  mp2VsRegularComparison,
  mp2EnrollmentSteps,
  mp2OtcOptions,
  mp2DividendHistory,
  mp2WithdrawalRules,
  pagibigMp2Faqs,
  PAGIBIG_MP2_UPDATED_AT,
} from "@/data/government/pag-ibig-mp2";

export const metadata = generatePageMetadata({
  title: pagibigMp2Meta.metaTitle,
  description: pagibigMp2Meta.metaDescription,
  slug: pagibigMp2Meta.slug,
  updatedAt: PAGIBIG_MP2_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "Pag-IBIG MP2 Savings Guide" },
];

const relatedPages = [
  {
    title: "Pag-IBIG Contribution Table",
    href: "/government/pag-ibig/pag-ibig-contribution-table-philippines",
    icon: Shield,
  },
  {
    title: "Pag-IBIG Housing Loan Guide",
    href: "/government/pag-ibig/pag-ibig-housing-loan-guide",
    icon: Home,
  },
  {
    title: "Pag-IBIG Deduction Guide",
    href: "/guides/government/pag-ibig-deduction-guide",
    icon: Info,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Government Hub",
    href: "/government",
    icon: Landmark,
  },
];

export default function PagibigMp2SavingsGuidePage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: pagibigMp2Meta.metaTitle,
          description: pagibigMp2Meta.metaDescription,
          updatedAt: PAGIBIG_MP2_UPDATED_AT,
          slug: pagibigMp2Meta.slug,
        })}
      />

      <PageHero
        title={pagibigMp2Meta.title}
        description={pagibigMp2Meta.directAnswer}
        badge={PAGIBIG_MP2_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* What Is Pag-IBIG MP2 */}
        <section>
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            What Is Pag-IBIG MP2
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Pag-IBIG MP2 (Modified Pag-IBIG II) is a voluntary savings program
            administered by the Home Development Mutual Fund (HDMF), also known
            as Pag-IBIG Fund. It is designed to help members grow their savings
            with higher dividends compared to typical bank savings accounts,
            while keeping earnings tax-exempt.
          </p>
          <p className="mt-3 text-[16px] leading-[22px] text-gray-400">
            Unlike the mandatory Pag-IBIG contribution (which is automatically
            deducted from payroll), MP2 is entirely optional. You decide whether
            to join, how much to save, and whether to contribute through your
            employer or on your own.
          </p>
        </section>

        {/* MP2 at a Glance */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            MP2 at a Glance
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mp2AtAGlance.map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border border-gray-200 bg-white p-6"
              >
                <p className="text-[12px] font-semibold uppercase tracking-wider text-gray-300">
                  {fact.label}
                </p>
                <p className="mt-1 text-[24px] font-semibold leading-[32px] text-brand">
                  {fact.value}
                </p>
                <p className="mt-1 text-[14px] text-gray-400">{fact.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How MP2 Salary Deduction by the Company Works */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            How MP2 Salary Deduction by the Company Works
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            If you are employed, one of the easiest ways to contribute to MP2 is
            through your employer&apos;s payroll system. Here is how the salary
            deduction process works in practice:
          </p>
          <ul className="mt-6 space-y-3">
            {mp2SalaryDeductionSteps.map((step) => (
              <li
                key={step}
                className="flex items-start gap-3 text-[16px] leading-[22px] text-gray-400"
              >
                <ArrowRight className="mt-0.5 size-4 shrink-0 text-gray-300" />
                <span>{step}</span>
              </li>
            ))}
          </ul>

          {/* Visual distinction cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-gray-300">
                Regular Pag-IBIG
              </p>
              <p className="mt-2 text-[20px] font-semibold text-gray-500">
                Mandatory
              </p>
              <p className="mt-2 text-[14px] text-gray-400">
                Automatically deducted by the employer. Employee share up to
                ₱100/month. Employer also pays a matching share.
              </p>
            </div>
            <div className="rounded-xl border border-brand/30 bg-brand/5 p-6">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-brand">
                MP2 Savings
              </p>
              <p className="mt-2 text-[20px] font-semibold text-gray-500">
                Voluntary
              </p>
              <p className="mt-2 text-[14px] text-gray-400">
                Deducted only if you request it. ₱500/month minimum, no maximum.
                Employee pays the full amount — no employer match.
              </p>
            </div>
          </div>
        </section>

        {/* MP2 vs Regular Pag-IBIG */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            MP2 vs Regular Pag-IBIG Contribution
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Understanding how MP2 differs from the regular Pag-IBIG contribution
            helps you decide whether it fits your savings plan. Here is a
            side-by-side comparison.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-[16px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-200/20">
                  <th className="px-4 py-3 text-left font-medium text-gray-500">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">
                    Regular Pag-IBIG
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">
                    MP2
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mp2VsRegularComparison.map((row) => (
                  <tr key={row.feature}>
                    <td className="px-4 py-2.5 font-medium text-gray-500">
                      {row.feature}
                    </td>
                    <td className="px-4 py-2.5 text-gray-400">
                      {row.regularPagibig}
                    </td>
                    <td className="px-4 py-2.5 text-gray-400">{row.mp2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[14px] text-gray-400">
            Both programs earn the same annual dividend rate and are
            tax-exempt. The key difference is that MP2 is voluntary, has a
            higher minimum contribution, and matures in 5 years.
          </p>
        </section>

        {/* How to Enroll Through Employer */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            How to Enroll in MP2 Through Your Employer
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Enrolling through your employer is the most convenient way to start
            MP2 because contributions are automatically deducted each payday.
            Here are the steps:
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {mp2EnrollmentSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-gray-200 bg-white p-6"
              >
                <div className="flex size-8 items-center justify-center rounded-full bg-brand/10 text-[14px] font-bold text-brand">
                  {item.step}
                </div>
                <h3 className="mt-3 text-[16px] font-semibold text-gray-500">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[20px] text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How to Contribute Without an Employer */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            How to Contribute to MP2 Without an Employer
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            If you are self-employed, a freelancer, or an OFW, you can
            contribute to MP2 directly through any of the following channels:
          </p>
          <ul className="mt-6 space-y-3">
            {mp2OtcOptions.map((option) => (
              <li
                key={option}
                className="flex items-start gap-3 text-[16px] leading-[22px] text-gray-400"
              >
                <ArrowRight className="mt-0.5 size-4 shrink-0 text-gray-300" />
                <span>{option}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* MP2 Dividend History */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            MP2 Dividend History
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            MP2 dividends are computed annually based on the fund&apos;s
            performance. Here are the dividend rates from recent years:
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-[16px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-200/20">
                  <th className="px-4 py-3 text-left font-medium text-gray-500">
                    Year
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500">
                    Dividend Rate
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mp2DividendHistory.map((row) => (
                  <tr key={row.year}>
                    <td className="px-4 py-2.5 text-gray-400">{row.year}</td>
                    <td className="px-4 py-2.5 text-right font-medium text-brand">
                      {row.dividendRate}
                    </td>
                    <td className="px-4 py-2.5 text-gray-400">
                      {row.note || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[14px] text-gray-400">
            Dividend rates are not guaranteed and may vary each year based on
            fund performance. Past rates do not guarantee future returns.
          </p>
        </section>

        {/* MP2 Withdrawal and Maturity Rules */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            MP2 Withdrawal and Maturity Rules
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Understanding when and how you can access your MP2 savings is
            important before committing to the 5-year lock-in period.
          </p>
          <ul className="mt-6 space-y-3">
            {mp2WithdrawalRules.map((rule) => (
              <li
                key={rule}
                className="flex items-start gap-3 text-[16px] leading-[22px] text-gray-400"
              >
                <ArrowRight className="mt-0.5 size-4 shrink-0 text-gray-300" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Calculator CTA */}
      <section className="bg-surface-tertiary py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Want to See Your Full Payroll Deductions?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-[22px] text-gray-400">
            Use the Take-Home Pay Calculator to see how MP2, regular Pag-IBIG,
            SSS, PhilHealth, and withholding tax affect your net pay.
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
          <FaqSection faqs={pagibigMp2Faqs} />
        </div>

        {/* Related Pages */}
        <section className="mt-16">
          <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
            Related Pag-IBIG Pages
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
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
            source="Pag-IBIG Fund (HDMF) — MP2 Savings Program"
            sourceUrl="https://www.pagibigfund.gov.ph/MP2.html"
            updatedAt={PAGIBIG_MP2_UPDATED_AT}
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
