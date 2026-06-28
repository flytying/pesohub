import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Info,
  Clock,
  Check,
  X,
  CircleCheck,
  PiggyBank,
  Target,
  TrendingUp,
  BookOpen,
  Calculator,
} from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateCalculatorSchema,
} from "@/lib/schema-markup";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/shared/faq-section";
import { TimeDepositCalculator } from "@/components/calculators/time-deposit-calculator";
import { timeDepositData } from "@/data/calculators/time-deposit";
import { formatDate } from "@/lib/formatters";

export const metadata: Metadata = generatePageMetadata({
  title: timeDepositData.metaTitle,
  description: timeDepositData.metaDescription,
  slug: timeDepositData.slug,
  updatedAt: timeDepositData.updatedAt,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Time Deposit Calculator" },
];

const CARD =
  "rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,30px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]";
const H2 = "font-display text-[22px] font-semibold tracking-[-0.02em] text-[#0E1525]";
const LEAD = "mt-[10px] max-w-[80ch] text-[16px] leading-[1.65] text-[#475069]";

const maturityMeaning = [
  "Principal is your original deposit",
  "Gross interest is the estimated return before tax",
  "After-tax interest is the estimated return after the 20% withholding tax",
  "Net maturity value is the estimated total you may receive at the end of the term",
];

const toolIncludes = [
  "Estimated gross interest",
  "Estimated after-tax interest",
  "Estimated maturity amount",
  "Simple term comparison",
];

const toolDoesNotInclude = [
  "Every bank's exact product rules",
  "Early withdrawal penalties",
  "Official bank quotations or disclosures",
  "Compounding or special crediting rules",
  "Promotional rate conditions",
];

const whyDifferent = [
  "Bank products may use different compounding or crediting rules",
  "Promotional rates may have specific terms",
  "Early withdrawal may reduce earnings",
  "Minimum deposit rules may affect eligibility",
  "Actual product disclosures may include additional conditions",
];

const tdVsSavings = {
  timeDeposit: [
    "Usually involves a lock-in period",
    "May offer higher rates for fixed terms",
    "Suited for parked funds you won't need soon",
    "Early withdrawal may reduce returns",
  ],
  savingsAccount: [
    "Usually offers easier access to funds",
    "Suited for emergency funds or daily liquidity",
    "May offer lower rates than time deposits",
    "No lock-in period in most cases",
  ],
};

const relatedPages = [
  {
    title: "Best Savings Interest Rates",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    icon: PiggyBank,
  },
  {
    title: "Savings Goal Calculator",
    href: "/calculators/savings/savings-goal-calculator-philippines",
    icon: Target,
  },
  {
    title: "Emergency Fund Calculator",
    href: "/calculators/savings/emergency-fund-calculator-philippines",
    icon: TrendingUp,
  },
  {
    title: "Rates Hub",
    href: "/rates",
    icon: TrendingUp,
  },
  {
    title: "Calculators Hub",
    href: "/calculators",
    icon: Calculator,
  },
];

export default function TimeDepositCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: timeDepositData.metaTitle,
          description: timeDepositData.metaDescription,
        })}
      />

      <div className="mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)] py-[clamp(18px,3vw,34px)]">
        {/* Heading */}
        <div className="mb-5">
          <nav aria-label="Breadcrumb" className="mb-[10px]">
            <ol className="flex flex-wrap items-center gap-[7px] text-[15px] font-semibold text-[#6B7488]">
              {breadcrumbs.map((b, i) => {
                const last = i === breadcrumbs.length - 1;
                return (
                  <li key={i} className="flex items-center gap-[7px]">
                    {i > 0 && <span className="text-[#C4CCDB]">/</span>}
                    {last || !b.href ? (
                      <span className={last ? "text-[#5A6478]" : ""}>{b.label}</span>
                    ) : (
                      <Link href={b.href} className="font-bold text-brand">
                        {b.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
          <h1 className="font-display text-[clamp(26px,3.4vw,38px)] font-semibold leading-[1.1] tracking-[-.02em] text-[#0E1525]">
            {timeDepositData.h1}
          </h1>
          <p className="mt-[9px] max-w-[80ch] text-[16px] leading-[1.55] text-[#5A6478]">
            {timeDepositData.intro}
          </p>
          <div className="mt-[11px] flex items-center gap-[6px] text-[15px] font-semibold text-[#6B7488]">
            <Clock className="size-[15px]" />
            Updated {formatDate(timeDepositData.updatedAt)}
          </div>
        </div>

        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <TimeDepositCalculator />
        </div>

        <div className="mt-9 space-y-[14px]">
          {/* Gross vs after-tax */}
          <section className={CARD}>
            <h2 className={H2}>Gross interest vs after-tax interest</h2>
            <p className={LEAD}>
              A time deposit may advertise a gross interest rate, but the amount you actually
              receive at maturity is lower after the 20% withholding tax on interest income. This is
              why it helps to compare both the gross return and the estimated net return when
              evaluating deposit options.
            </p>
            <div className="mt-4 flex items-start gap-[11px] rounded-[13px] border border-[#C9D6F7] bg-[#EAF0FF] p-[14px_16px]">
              <Info className="mt-0.5 size-[18px] shrink-0 text-brand" />
              <span className="text-[15px] leading-[1.55] text-[#26408B]">
                Use gross return for headline comparison, but use after-tax return when deciding how
                much your money may actually grow.
              </span>
            </div>
          </section>

          {/* What maturity means */}
          <section className={CARD}>
            <h2 className={H2}>What your maturity amount means</h2>
            <p className={LEAD}>
              Your maturity amount is the estimated total value of your deposit at the end of the
              selected term. It includes your original principal plus the interest earned over the
              deposit period.
            </p>
            <ul className="mt-4 space-y-3">
              {maturityMeaning.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[16px] leading-[1.55] text-[#475069]">
                  <CircleCheck className="mt-0.5 size-[18px] shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Includes / doesn't */}
          <section className={CARD}>
            <h2 className={H2}>What this calculator includes and does not include</h2>
            <p className={LEAD}>
              This page is designed for a simple time deposit estimate and does not replace
              bank-specific product terms.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[16px] border border-[#BDE9CF] bg-[#F2FAF6] p-5">
                <div className="mb-3 text-[14px] font-bold text-[#0E9F6E]">Includes</div>
                <ul className="space-y-[10px]">
                  {toolIncludes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-[#344054]">
                      <Check className="mt-0.5 size-[18px] shrink-0 text-[#0E9F6E]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[16px] border border-[#F3C9C9] bg-[#FDF2F2] p-5">
                <div className="mb-3 text-[14px] font-bold text-[#C0392B]">Does not include</div>
                <ul className="space-y-[10px]">
                  {toolDoesNotInclude.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-[#344054]">
                      <X className="mt-0.5 size-[18px] shrink-0 text-[#C0392B]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Why different */}
          <section className={CARD}>
            <h2 className={H2}>Why your actual time deposit return may be different</h2>
            <ul className="mt-4 space-y-[13px]">
              {whyDifferent.map((d) => (
                <li key={d} className="flex items-start gap-3 text-[16px] leading-[1.55] text-[#344054]">
                  <ArrowRight className="mt-1 size-[18px] shrink-0 text-brand" />
                  {d}
                </li>
              ))}
            </ul>
          </section>

          {/* TD vs savings */}
          <section className={CARD}>
            <h2 className={H2}>Time deposit vs savings account</h2>
            <p className={LEAD}>
              A time deposit is usually better for money you can leave untouched for a fixed period.
              A savings account is usually better if you want easier access to your funds. The right
              choice depends on whether you value liquidity more than a fixed-term return.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[16px] border border-[#E7EBF3] bg-white p-[22px]">
                <h3 className="font-display text-[18px] font-semibold text-[#0E1525]">Time deposit</h3>
                <ul className="mt-3 space-y-[10px]">
                  {tdVsSavings.timeDeposit.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-[#475069]">
                      <CircleCheck className="mt-0.5 size-[18px] shrink-0 text-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[16px] border border-[#E7EBF3] bg-white p-[22px]">
                <h3 className="font-display text-[18px] font-semibold text-[#0E1525]">Savings account</h3>
                <ul className="mt-3 space-y-[10px]">
                  {tdVsSavings.savingsAccount.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-[#475069]">
                      <CircleCheck className="mt-0.5 size-[18px] shrink-0 text-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="flex gap-3 rounded-[14px] border border-[#F0E2BE] bg-[#FFF8E8] p-5">
            <Info className="mt-0.5 size-5 shrink-0 text-[#C99A22]" />
            <p className="text-[15px] leading-[1.6] text-[#7A6320]">
              This calculator provides estimates for planning purposes only. Actual bank products
              may use different compounding, rates, or early-withdrawal rules, and promotional rates
              may have conditions. Always confirm final figures with the bank.
            </p>
          </div>

          {/* FAQ */}
          <section className="pt-7">
            <FaqSection faqs={timeDepositData.faqs} />
          </section>

          {/* Related */}
          <section className="pt-7">
            <h2 className={`mb-4 ${H2}`}>Related savings and rates pages</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPages.map((page) => {
                const Icon = page.icon;
                return (
                  <Link
                    key={page.title}
                    href={page.href}
                    className="group flex items-center gap-3 rounded-[14px] border border-[#E7EBF3] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,.04)] transition-colors hover:border-[#C3D0F2] hover:bg-[#FBFCFE]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] bg-[#EAF0FF] text-brand">
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="flex-1 text-[15px] font-bold text-[#0E1525] group-hover:text-brand">
                      {page.title}
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-[#C4CCDB]" />
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
