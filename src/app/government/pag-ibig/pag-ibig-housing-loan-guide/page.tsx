import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Home,
  Shield,
  HelpCircle,
  FileText,
  Landmark,
  BarChart3,
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
import { GOVERNMENT_DISCLAIMER } from "@/lib/constants";
import {
  pagibigHousingLoanMeta,
  housingLoanRates,
  loanLimits,
  eligibilityItems,
  loanableAmountFactors,
  rateComparisonPoints,
  documentChecklist,
  housingPurposes,
  questionsBeforeApplying,
  pagibigHousingLoanFaqs,
  PAGIBIG_HOUSING_LOAN_UPDATED_AT,
} from "@/data/government/pag-ibig-housing-loan";

export const metadata = generatePageMetadata({
  title: pagibigHousingLoanMeta.metaTitle,
  description: pagibigHousingLoanMeta.metaDescription,
  slug: pagibigHousingLoanMeta.slug,
  updatedAt: PAGIBIG_HOUSING_LOAN_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "Pag-IBIG Housing Loan Guide" },
];

const relatedPages = [
  {
    title: "Home Loan Calculator",
    href: "/calculators/loans/home-loan-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Pag-IBIG Contribution Table",
    href: "/government/pag-ibig/pag-ibig-contribution-table-philippines",
    icon: Shield,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Pag-IBIG MP2 Savings Guide",
    href: "/government/pag-ibig/pag-ibig-mp2-savings-guide",
    icon: TrendingUp,
  },
  {
    title: "Government Hub",
    href: "/government",
    icon: Landmark,
  },
];

export default function PagibigHousingLoanGuidePage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: pagibigHousingLoanMeta.metaTitle,
          description: pagibigHousingLoanMeta.metaDescription,
          updatedAt: PAGIBIG_HOUSING_LOAN_UPDATED_AT,
          slug: pagibigHousingLoanMeta.slug,
        })}
      />

      <PageHero
        title={pagibigHousingLoanMeta.title}
        description={pagibigHousingLoanMeta.directAnswer}
        badge={PAGIBIG_HOUSING_LOAN_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Who May Qualify */}
      <section>
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Who May Qualify for a Pag-IBIG Housing Loan
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          A Pag-IBIG housing loan is generally intended for qualified members
          who meet the program&apos;s contribution, age, and repayment-related
          conditions. This section helps you answer the question: &ldquo;Am I
          likely to qualify before I spend time preparing documents?&rdquo;
        </p>
        <ul className="mt-4 space-y-3">
          {eligibilityItems.map((item) => (
            <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
              <ArrowRight className="size-4 shrink-0 text-gray-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[14px] text-gray-400">
          This is not an approval tool, but it gives you a clearer starting
          point before you go deeper into the process.
        </p>
      </section>

      {/* What Affects How Much You May Borrow */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          What Affects How Much You May Borrow
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          The amount you may be able to borrow is not based on one factor alone.
          It usually depends on a combination of repayment capacity,
          property-related valuation rules, contribution record, and the loan
          structure you choose.
        </p>
        <ul className="mt-6 space-y-3">
          {loanableAmountFactors.map((item) => (
            <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
              <ArrowRight className="size-4 shrink-0 text-gray-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Maximum Loanable Amount Table */}
        <h3 className="mb-3 mt-8 text-[20px] font-semibold leading-[26px] text-gray-500">
          Maximum Loanable Amount by Contribution Years
        </h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-[16px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-200/20">
                <th className="px-4 py-3 text-left font-medium text-gray-500">
                  Years of Contribution
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">
                  Max Loan Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loanLimits.map((limit) => (
                <tr key={limit.contributionYears}>
                  <td className="px-4 py-2.5 text-gray-400">
                    {limit.contributionYears}
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium text-gray-500">
                    {limit.maxLoanAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[14px] text-gray-400">
          Actual loan amount also depends on paying capacity, property appraisal
          value, and age at maturity.
        </p>

      </section>

      {/* How Rates and Repricing Affect Your Loan */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          How Rates and Repricing Affect Your Loan
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          One of the most important parts of any housing loan is understanding
          how the interest rate affects the monthly payment. A lower rate or a
          longer fixed period can change affordability, while repricing terms may
          affect what happens later in the loan.
        </p>
        <p className="mt-3 text-[16px] leading-[22px] text-gray-400">
          This is why it helps to compare:
        </p>
        <ul className="mt-4 space-y-3">
          {rateComparisonPoints.map((item) => (
            <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
              <ArrowRight className="size-4 shrink-0 text-gray-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Interest Rate Table */}
        <h3 className="mb-3 mt-8 text-[20px] font-semibold leading-[26px] text-gray-500">
          Pag-IBIG Housing Loan Interest Rates
        </h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-[16px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-200/20">
                <th className="px-4 py-3 text-left font-medium text-gray-500">
                  Loan Amount
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">
                  Repricing Period
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">
                  Interest Rate
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {housingLoanRates.map((rate) => (
                <tr key={rate.loanAmount}>
                  <td className="px-4 py-2.5 text-gray-400">
                    {rate.loanAmount}
                  </td>
                  <td className="px-4 py-2.5 text-gray-400">
                    {rate.repricingPeriod}
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium text-brand">
                    {rate.interestRate}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[14px] text-gray-400">
          Rates are subject to change. Loans above ₱1.5M are subject to
          repricing after 3 years based on prevailing rates.
        </p>
      </section>

      {/* What You Will Usually Need */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          What You Will Usually Need
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          You will usually need some combination of the following. The exact
          document set may vary depending on your employment type, property
          type, and application scenario.
        </p>
        <ul className="mt-4 space-y-3">
          {documentChecklist.map((item) => (
            <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
              <ArrowRight className="size-4 shrink-0 text-gray-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* What a Pag-IBIG Housing Loan May Help Finance */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          What a Pag-IBIG Housing Loan May Help Finance
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          A Pag-IBIG housing loan guide is more useful when it explains not just
          the loan itself, but also the kinds of housing goals it may support.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {housingPurposes.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-xl border border-gray-200 p-4 text-[16px] leading-[22px]"
            >
              <Home className="size-4 shrink-0 text-brand" />
              <span className="text-gray-400">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Questions to Ask Before Applying */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Questions to Ask Before Applying
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          Before moving forward, it helps to ask a few practical questions.
          These can help you decide whether to estimate first, prepare documents
          next, or compare more than one financing path.
        </p>
        <ul className="mt-6 space-y-4">
          {questionsBeforeApplying.map((item) => (
            <li key={item} className="flex gap-3 text-[16px] leading-[22px] text-gray-400">
              <HelpCircle className="mt-0.5 size-5 shrink-0 text-brand" />
              {item}
            </li>
          ))}
        </ul>
      </section>

    </div>

      {/* Calculator CTA */}
      <section className="bg-surface-tertiary py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Want to Estimate Your Monthly Payment First?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-[22px] text-gray-400">
            If you already know the property price, down payment, and target
            term, use the Home Loan Calculator to estimate your monthly
            payment before applying.
          </p>
          <div className="mt-6">
            <Link
              href="/calculators/loans/home-loan-calculator-philippines"
              className="inline-flex items-center rounded-full bg-brand px-6 py-3 text-[14px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
            >
              USE THE HOME LOAN CALCULATOR
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-0 pb-20 sm:px-6 lg:px-8">
      {/* FAQ */}
      <div className="mt-16">
        <FaqSection faqs={pagibigHousingLoanFaqs} />
      </div>

      {/* Related Pag-IBIG Pages */}
      <section className="mt-16">
        <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
          Related Pag-IBIG pages
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
          source="Pag-IBIG Fund (HDMF) — Housing Loan Program Guidelines"
          sourceUrl="https://www.pagibigfund.gov.ph/HousingLoan.html"
          updatedAt={PAGIBIG_HOUSING_LOAN_UPDATED_AT}
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
