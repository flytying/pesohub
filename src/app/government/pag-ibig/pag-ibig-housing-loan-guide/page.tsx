import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Wallet,
  Coins,
  HelpCircle,
  Landmark,
  House,
  Home,
  Building,
  Hammer,
  Paintbrush,
  Repeat,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
import { SourceCitation } from "@/components/shared/source-citation";
import { GovCtaBanner } from "@/components/government/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
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

const WRAP = "mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)]";
const CARD =
  "rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]";
const H2 =
  "font-display text-[clamp(20px,2.2vw,24px)] font-semibold tracking-[-.02em] text-[#0E1525]";

const purposeIcons: LucideIcon[] = [
  House,
  Home,
  Building,
  Hammer,
  Paintbrush,
  Repeat,
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
    icon: Home,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Wallet,
  },
  {
    title: "Pag-IBIG MP2 Savings Guide",
    href: "/government/pag-ibig/pag-ibig-mp2-savings-guide",
    icon: Coins,
  },
  {
    title: "Government Hub",
    href: "/government",
    icon: Landmark,
  },
];

const homeLoanCalculatorHref =
  "/calculators/loans/home-loan-calculator-philippines";

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
        containerClassName={WRAP}
      />

      <div className={`${WRAP} space-y-5 pt-6`}>
        {/* Who may qualify */}
        <section className={CARD}>
          <h2 className={H2}>Who may qualify for a Pag-IBIG housing loan</h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            A Pag-IBIG housing loan is generally intended for qualified members
            who meet the program&rsquo;s contribution, age, and
            repayment-related conditions. This section helps you answer the
            question: &ldquo;Am I likely to qualify before I spend time
            preparing documents?&rdquo;
          </p>
          <ul className="mt-4 space-y-3">
            {eligibilityItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <ArrowRight className="mt-[3px] size-[18px] shrink-0 text-brand" />
                <span className="text-[16px] leading-[1.55] text-[#344054]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[13.5px] leading-[1.6] text-[#8A93A6]">
            This is not an approval tool, but it gives you a clearer starting
            point before you go deeper in the process.
          </p>
        </section>

        {/* What affects how much you may borrow */}
        <section className={CARD}>
          <h2 className={H2}>What affects how much you may borrow</h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            The amount you may be able to borrow is not based on one factor
            alone. It usually depends on a combination of repayment capacity,
            property-related valuation rules, contribution record, and the loan
            structure you choose.
          </p>
          <ul className="mt-4 space-y-3">
            {loanableAmountFactors.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <ArrowRight className="mt-[3px] size-[18px] shrink-0 text-brand" />
                <span className="text-[16px] leading-[1.55] text-[#344054]">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="mt-6 mb-[10px] font-display text-[16px] font-semibold text-[#0E1525]">
            Maximum loanable amount by contribution years
          </h3>
          <div className="overflow-hidden rounded-[16px] border border-[#E7EBF3] bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)]">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#E7EBF3] bg-[#F4F7FE]">
                    <th className="px-[18px] py-[13px] text-left text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                      Years of contribution
                    </th>
                    <th className="px-[18px] py-[13px] text-right text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                      Max loan amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loanLimits.map((limit, i) => (
                    <tr
                      key={limit.contributionYears}
                      className={`border-b border-[#F0F3F8] ${
                        i % 2 ? "bg-[#FAFBFE]" : "bg-white"
                      }`}
                    >
                      <td className="px-[18px] py-[13px] text-[14.5px] text-[#0E1525]">
                        {limit.contributionYears}
                      </td>
                      <td className="px-[18px] py-[13px] text-right font-mono text-[14.5px] font-semibold tabular-nums text-[#0E1525]">
                        {limit.maxLoanAmount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-3 text-[13.5px] leading-[1.6] text-[#8A93A6]">
            Actual loan amount also depends on paying capacity, property
            appraisal value, and age at maturity.
          </p>
        </section>

        {/* How rates and repricing affect your loan */}
        <section className={CARD}>
          <h2 className={H2}>How rates and repricing affect your loan</h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            One of the most important parts of any housing loan is understanding
            how the interest rate affects the monthly payment. A lower rate or a
            longer fixed period can change affordability, while repricing terms
            may affect what happens later in the loan.
          </p>
          <ul className="mt-4 space-y-3">
            {rateComparisonPoints.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <ArrowRight className="mt-[3px] size-[18px] shrink-0 text-brand" />
                <span className="text-[16px] leading-[1.55] text-[#344054]">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="mt-6 mb-[10px] font-display text-[16px] font-semibold text-[#0E1525]">
            Pag-IBIG housing loan interest rates
          </h3>
          <div className="overflow-hidden rounded-[16px] border border-[#E7EBF3] bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)]">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#E7EBF3] bg-[#F4F7FE]">
                    <th className="px-[18px] py-[13px] text-left text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                      Loan amount
                    </th>
                    <th className="px-[18px] py-[13px] text-left text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                      Repricing period
                    </th>
                    <th className="px-[18px] py-[13px] text-right text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                      Interest rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {housingLoanRates.map((rate, i) => (
                    <tr
                      key={rate.loanAmount}
                      className={`border-b border-[#F0F3F8] ${
                        i % 2 ? "bg-[#FAFBFE]" : "bg-white"
                      }`}
                    >
                      <td className="px-[18px] py-[13px] text-[14px] text-[#0E1525]">
                        {rate.loanAmount}
                      </td>
                      <td className="px-[18px] py-[13px] text-[14px] text-[#5A6478]">
                        {rate.repricingPeriod}
                      </td>
                      <td className="px-[18px] py-[13px] text-right font-mono text-[14px] font-semibold tabular-nums text-brand">
                        {rate.interestRate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-3 text-[13.5px] leading-[1.6] text-[#8A93A6]">
            Rates are subject to change. Loans above ₱1.5M are subject to
            repricing after 3 years based on prevailing rates.
          </p>
        </section>

        {/* What you will usually need */}
        <section className={CARD}>
          <h2 className={H2}>What you will usually need</h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            You will usually need some combination of the following. The exact
            document set may vary depending on your employment type, property
            type, and application scenario.
          </p>
          <ul className="mt-4 space-y-3">
            {documentChecklist.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <ArrowRight className="mt-[3px] size-[18px] shrink-0 text-brand" />
                <span className="text-[16px] leading-[1.55] text-[#344054]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* What a Pag-IBIG housing loan may help finance */}
        <section className={CARD}>
          <h2 className={H2}>What a Pag-IBIG housing loan may help finance</h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            A Pag-IBIG housing loan guide is more useful when it explains not
            just the loan itself, but also the kinds of housing goals it may
            support.
          </p>
          <div className="mt-5 grid gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
            {housingPurposes.map((purpose, i) => {
              const Icon = purposeIcons[i % purposeIcons.length];
              return (
                <div
                  key={purpose}
                  className="flex items-center gap-3 rounded-[14px] border border-[#EDF1F8] bg-[#F7F9FD] px-4 py-[15px]"
                >
                  <span className="flex size-[34px] shrink-0 items-center justify-center rounded-[10px] bg-[#EAF0FF]">
                    <Icon className="size-[17px] text-brand" />
                  </span>
                  <span className="text-[14.5px] font-semibold leading-[1.35] text-[#0E1525]">
                    {purpose}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Questions to ask before applying */}
        <section className={CARD}>
          <h2 className={H2}>Questions to ask before applying</h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            Before moving forward, it helps to ask a few practical questions.
            These can help you decide whether to estimate first, prepare
            documents next, or compare more than one financing path.
          </p>
          <ul className="mt-4 space-y-3">
            {questionsBeforeApplying.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <HelpCircle className="mt-[3px] size-[18px] shrink-0 text-brand" />
                <span className="text-[16px] leading-[1.55] text-[#344054]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* CTA */}
      <div className={`${WRAP} pt-[clamp(28px,4vw,40px)]`}>
        <GovCtaBanner
          title="Want to estimate your monthly payment first?"
          description="If you already know the property price, down payment, and target term, use the Home Loan Calculator to estimate your monthly payment before applying."
          href={homeLoanCalculatorHref}
          ctaLabel="Use the home loan calculator"
        />
      </div>

      <div className={`${WRAP} pb-20 pt-[clamp(34px,5vw,48px)]`}>
        {/* FAQ */}
        <FaqSection faqs={pagibigHousingLoanFaqs} />

        {/* Related */}
        <section className="mt-[clamp(34px,5vw,48px)]">
          <h2 className="mb-6 font-display text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-.02em] text-[#0E1525]">
            Related Pag-IBIG pages
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {relatedPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.title}
                  href={page.href}
                  className="group flex items-center gap-[14px] rounded-[14px] border border-[#E7EBF3] bg-white px-[18px] py-[15px] transition-colors hover:border-[#C3D0F2] hover:bg-[#FBFCFE]"
                >
                  <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[11px] bg-[#EAF0FF]">
                    <Icon className="size-[18px] text-brand" />
                  </span>
                  <span className="flex-1 text-[15.5px] font-bold leading-[1.3] text-[#0E1525]">
                    {page.title}
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-[#C4CCDB] transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Source & disclaimer */}
        <div className="mt-[clamp(34px,5vw,48px)]">
          <SourceCitation
            source="Pag-IBIG Fund (HDMF) — Housing Loan Program Guidelines"
            sourceUrl="https://www.pagibigfund.gov.ph/HousingLoan.html"
            updatedAt={PAGIBIG_HOUSING_LOAN_UPDATED_AT}
            reviewCadence="Every 90 days"
          />
        </div>
        <div className="mt-4">
          <DisclaimerBox text={GOVERNMENT_DISCLAIMER} />
        </div>
      </div>
    </>
  );
}
