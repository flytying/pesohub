import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Home,
  Shield,
  Landmark,
  Info,
  Coins,
  Calendar,
  TrendingUp,
  CircleCheck,
  RefreshCw,
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

const WRAP = "mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)]";
const CARD =
  "rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]";
const H2 =
  "font-display text-[clamp(20px,2.2vw,24px)] font-semibold tracking-[-.02em] text-[#0E1525]";

const glanceIcons: LucideIcon[] = [
  Coins,
  Calendar,
  TrendingUp,
  Shield,
  CircleCheck,
  RefreshCw,
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
        containerClassName={WRAP}
      />

      <div className={`${WRAP} space-y-5 pt-6`}>
        {/* What is MP2 */}
        <section className={CARD}>
          <h2 className={H2}>What is the Pag-IBIG MP2 savings program</h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            Pag-IBIG MP2 (Modified Pag-IBIG II) is a voluntary savings program
            administered by the Home Development Mutual Fund (HDMF), also known
            as Pag-IBIG Fund. It is designed to help members grow their savings
            with higher dividends compared to typical bank savings accounts,
            while keeping earnings tax-exempt.
          </p>
          <p className="mt-[14px] text-[16px] leading-[1.7] text-[#475069]">
            Unlike the mandatory Pag-IBIG contribution (which is automatically
            deducted from payroll), MP2 is entirely optional. You decide whether
            to join, how much to save, and whether to contribute through your
            employer or on your own.
          </p>
        </section>

        {/* MP2 at a glance */}
        <section className={CARD}>
          <h2 className={H2}>MP2 at a glance</h2>
          <div className="mt-[14px] grid gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
            {mp2AtAGlance.map((fact, i) => {
              const Icon = glanceIcons[i] ?? Coins;
              return (
                <div
                  key={fact.label}
                  className="flex flex-col gap-[13px] rounded-[15px] border border-[#EDF1F8] bg-[#F7F9FD] p-[18px]"
                >
                  <span className="flex size-[38px] items-center justify-center rounded-[11px] bg-[#EAF0FF]">
                    <Icon className="size-[19px] text-brand" />
                  </span>
                  <div>
                    <div className="text-[11.5px] font-bold uppercase tracking-[.06em] text-[#6B7488]">
                      {fact.label}
                    </div>
                    <div className="mt-[5px] font-display text-[22px] font-semibold text-brand">
                      {fact.value}
                    </div>
                    <div className="mt-1 text-[13px] text-[#8A93A6]">
                      {fact.note}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* How MP2 salary deduction works */}
        <section className={CARD}>
          <h2 className={H2}>
            How MP2 salary deduction by the company works
          </h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            If you are employed, one of the easiest ways to contribute to MP2 is
            through your employer&rsquo;s payroll system. Here is how the salary
            deduction process works in practice.
          </p>
          <ul className="mt-[14px] space-y-3">
            {mp2SalaryDeductionSteps.map((step) => (
              <li key={step} className="flex items-start gap-3">
                <ArrowRight className="mt-[3px] size-[18px] shrink-0 text-brand" />
                <span className="text-[16px] leading-[1.55] text-[#344054]">
                  {step}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 grid gap-[14px] sm:grid-cols-2">
            <div className="overflow-hidden rounded-[16px] border border-[#E7EBF3] bg-white">
              <div className="border-b border-[#E7EBF3] bg-[#F4F7FE] px-[18px] py-3 text-[11.5px] font-bold uppercase tracking-[.06em] text-[#6B7488]">
                Regular Pag-IBIG
              </div>
              <div className="p-[18px]">
                <div className="mb-[6px] font-display text-[16px] font-semibold text-[#0E1525]">
                  Mandatory
                </div>
                <p className="text-[14.5px] leading-[1.55] text-[#5A6478]">
                  Automatically deducted by the employer. Employee share up to
                  ₱200/month. Employer also pays a matching share.
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-[16px] border-[1.5px] border-[#C9D6F7] bg-white">
              <div className="border-b border-[#D6E0FA] bg-[#EAF0FF] px-[18px] py-3 text-[11.5px] font-bold uppercase tracking-[.06em] text-brand">
                MP2 Savings
              </div>
              <div className="p-[18px]">
                <div className="mb-[6px] font-display text-[16px] font-semibold text-[#0E1525]">
                  Voluntary
                </div>
                <p className="text-[14.5px] leading-[1.55] text-[#5A6478]">
                  Deducted only if you request it. ₱500/month minimum, no
                  maximum. Employee pays the full amount — no employer match.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MP2 vs regular Pag-IBIG */}
        <section className={CARD}>
          <h2 className={H2}>MP2 vs regular Pag-IBIG contribution</h2>
          <p className="mt-[10px] mb-[14px] text-[16px] leading-[1.7] text-[#475069]">
            Understanding how MP2 differs from the regular Pag-IBIG contribution
            helps you decide whether it fits your savings plan. Here is a
            side-by-side comparison.
          </p>
          <div className="overflow-hidden rounded-[16px] border border-[#E7EBF3] bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr className="border-b border-[#E7EBF3] bg-[#F4F7FE]">
                    <th className="px-4 py-[13px] text-left text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                      Feature
                    </th>
                    <th className="px-4 py-[13px] text-left text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                      Regular Pag-IBIG
                    </th>
                    <th className="px-4 py-[13px] text-left text-[12px] font-bold uppercase tracking-[.05em] text-brand">
                      MP2
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mp2VsRegularComparison.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`border-b border-[#F0F3F8] ${
                        i % 2 ? "bg-[#FAFBFE]" : "bg-white"
                      }`}
                    >
                      <td className="px-4 py-[13px] align-top text-[14px] font-bold text-[#0E1525]">
                        {row.feature}
                      </td>
                      <td className="px-4 py-[13px] align-top text-[14px] leading-[1.45] text-[#5A6478]">
                        {row.regularPagibig}
                      </td>
                      <td className="px-4 py-[13px] align-top text-[14px] leading-[1.45] text-[#475069]">
                        {row.mp2}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-3 text-[13.5px] leading-[1.6] text-[#8A93A6]">
            Both programs earn the same annual dividend rate and are tax-exempt.
            The key difference is that MP2 is voluntary, has a higher minimum
            contribution, and matures in 5 years.
          </p>
        </section>

        {/* Enroll through employer */}
        <section className={CARD}>
          <h2 className={H2}>
            How to enroll in Pag-IBIG MP2 through your employer
          </h2>
          <p className="mt-[10px] mb-[14px] text-[16px] leading-[1.7] text-[#475069]">
            Enrolling through your employer is the most convenient way to start
            MP2 because contributions are automatically deducted each payday.
          </p>
          <div className="grid gap-[14px] sm:grid-cols-2">
            {mp2EnrollmentSteps.map((item) => (
              <div
                key={item.step}
                className="flex gap-[15px] rounded-[14px] border border-[#EDF1F8] bg-[#F7F9FD] px-5 py-[18px]"
              >
                <span className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-brand font-display text-[14px] font-bold text-white">
                  {item.step}
                </span>
                <div>
                  <div className="mb-1 font-display text-[16px] font-semibold text-[#0E1525]">
                    {item.title}
                  </div>
                  <p className="text-[14.5px] leading-[1.55] text-[#5A6478]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contribute without employer */}
        <section className={CARD}>
          <h2 className={H2}>
            How to contribute to Pag-IBIG MP2 without an employer
          </h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            If you are self-employed, a freelancer, or an OFW, you can
            contribute to MP2 directly through any of the following channels:
          </p>
          <ul className="mt-[14px] space-y-3">
            {mp2OtcOptions.map((option) => (
              <li key={option} className="flex items-start gap-3">
                <ArrowRight className="mt-[3px] size-[18px] shrink-0 text-brand" />
                <span className="text-[16px] leading-[1.55] text-[#344054]">
                  {option}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Dividend history */}
        <section className={CARD}>
          <h2 className={H2}>MP2 dividend rate history</h2>
          <p className="mt-[10px] mb-[14px] text-[16px] leading-[1.7] text-[#475069]">
            MP2 dividends are computed annually based on the fund&rsquo;s
            performance. Here are the dividend rates from recent years:
          </p>
          <div className="overflow-hidden rounded-[16px] border border-[#E7EBF3] bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr className="border-b border-[#E7EBF3] bg-[#F4F7FE]">
                    <th className="px-[18px] py-[13px] text-left text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                      Year
                    </th>
                    <th className="px-[18px] py-[13px] text-right text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                      Dividend Rate
                    </th>
                    <th className="px-[18px] py-[13px] text-left text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mp2DividendHistory.map((row, i) => (
                    <tr
                      key={row.year}
                      className={`border-b border-[#F0F3F8] ${
                        i % 2 ? "bg-[#FAFBFE]" : "bg-white"
                      }`}
                    >
                      <td className="px-[18px] py-[13px] font-mono text-[14px] tabular-nums text-[#0E1525]">
                        {row.year}
                      </td>
                      <td className="px-[18px] py-[13px] text-right font-mono text-[14px] font-semibold tabular-nums text-brand">
                        {row.dividendRate}
                      </td>
                      <td className="px-[18px] py-[13px] text-[13.5px] text-[#6B7488]">
                        {row.note || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-3 text-[13.5px] leading-[1.6] text-[#8A93A6]">
            Dividend rates are not guaranteed and may vary each year based on
            fund performance. Past rates do not guarantee future returns.
          </p>
        </section>

        {/* Withdrawal & maturity */}
        <section className={CARD}>
          <h2 className={H2}>MP2 withdrawal and maturity rules</h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            Understanding when and how you can access your MP2 savings is
            important before committing to the 5-year lock-in period.
          </p>
          <ul className="mt-[14px] space-y-3">
            {mp2WithdrawalRules.map((rule) => (
              <li key={rule} className="flex items-start gap-3">
                <ArrowRight className="mt-[3px] size-[18px] shrink-0 text-brand" />
                <span className="text-[16px] leading-[1.55] text-[#344054]">
                  {rule}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* CTA */}
      <div className={`${WRAP} pt-[clamp(28px,4vw,40px)]`}>
        <GovCtaBanner
          title="Want to see your full payroll deductions?"
          description="Use the Take-Home Pay Calculator to see how MP2, regular Pag-IBIG, SSS, PhilHealth, and withholding tax affect your net pay."
          href="/calculators/tax/take-home-pay-calculator-philippines"
          ctaLabel="Use the take-home pay calculator"
        />
      </div>

      <div className={`${WRAP} pb-20 pt-[clamp(34px,5vw,48px)]`}>
        {/* FAQ */}
        <FaqSection faqs={pagibigMp2Faqs} />

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
            source="Pag-IBIG Fund (HDMF) — MP2 Savings Program"
            sourceUrl="https://www.pagibigfund.gov.ph/MP2.html"
            updatedAt={PAGIBIG_MP2_UPDATED_AT}
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
