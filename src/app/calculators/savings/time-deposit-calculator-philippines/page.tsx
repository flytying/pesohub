import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  X,
  CheckCircle,
  XCircle,
  Info,
  Calculator,
  Landmark,
  BookOpen,
  BarChart3,
  Clock,
  Banknote,
} from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateCalculatorSchema,
} from "@/lib/schema-markup";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { TimeDepositCalculator } from "@/components/calculators/time-deposit-calculator";
import { timeDepositData } from "@/data/calculators/time-deposit";

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

const maturityMeaning = [
  "Principal is your original deposit",
  "Gross interest is the estimated return before tax",
  "After-tax interest is the estimated return after tax treatment",
  "Net maturity value is the estimated total amount you may receive at the end of the term",
];

const toolIncludes = [
  "estimated gross interest",
  "estimated after-tax interest",
  "estimated maturity amount",
  "simple term comparison",
];

const toolDoesNotInclude = [
  "every bank's exact product rules",
  "early withdrawal penalties",
  "official bank quotations or disclosures",
  "compounding or special crediting rules",
  "promotional rate conditions",
];

const whyDifferent = [
  "bank products may use different compounding or crediting rules",
  "promotional rates may have specific terms",
  "early withdrawal may reduce earnings",
  "minimum deposit rules may affect eligibility",
  "actual product disclosures may include additional conditions",
];

const tdVsSavings = {
  timeDeposit: [
    "usually involves a lock-in period",
    "may offer higher rates for fixed terms",
    "suited for parked funds you won't need soon",
    "early withdrawal may reduce returns",
  ],
  savingsAccount: [
    "usually offers easier access to funds",
    "suited for emergency funds or daily liquidity",
    "may offer lower rates than time deposits",
    "no lock-in period in most cases",
  ],
};

const relatedPages = [
  {
    title: "Best Savings Interest Rates",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    icon: BarChart3,
  },
  {
    title: "Savings Goal Calculator",
    href: "/calculators/savings/savings-goal-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Rates Hub",
    href: "/rates",
    icon: Landmark,
  },
  {
    title: "Calculators Hub",
    href: "/calculators",
    icon: Calculator,
  },
  {
    title: "Guides Hub",
    href: "/guides",
    icon: BookOpen,
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

      <PageHero
        title={timeDepositData.h1}
        description={timeDepositData.intro}
        badge={timeDepositData.updatedAt}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <TimeDepositCalculator />
        </div>

        {/* Result support text */}
        <p className="mt-4 text-xs text-gray-400">
          This estimate is based on the amount, rate, and term you entered using
          a simplified time deposit return calculation.
        </p>

        {/* Gross Interest vs After-Tax Interest */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Gross Interest vs After-Tax Interest
          </h2>
          <p className="mt-3 text-[16px] leading-[22px] text-gray-400">
            A time deposit may advertise a gross interest rate, but the amount
            you actually receive at maturity may be lower after applicable tax
            treatment is considered. This is why it helps to compare both gross
            return and estimated net return when evaluating deposit options.
          </p>
          <div className="mt-4 flex gap-3 rounded-lg border border-gray-200 bg-white p-6">
            <Info className="size-5 shrink-0 mt-0.5 text-gray-300" />
            <p className="text-[16px] leading-[22px] text-gray-400">
              Use gross return for headline comparison, but use after-tax
              return when deciding how much your money may actually grow.
            </p>
          </div>
        </section>

        {/* What Your Maturity Amount Means */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            What Your Maturity Amount Means
          </h2>
          <p className="mt-3 text-[16px] leading-[22px] text-gray-400">
            Your maturity amount is the estimated total value of your deposit at
            the end of the selected term. It includes your original principal
            plus the interest earned over the deposit period.
          </p>
          <ul className="mt-4 text-[16px] leading-[22px] text-gray-400 space-y-2">
            {maturityMeaning.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-brand" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What This Calculator Includes and Does Not Include */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            What This Calculator Includes and Does Not Include
          </h2>
          <p className="mt-3 text-[16px] leading-[22px] text-gray-400">
            This page is designed for a simple time deposit estimate and does
            not replace bank-specific product terms.
          </p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
              <h3 className="text-[16px] font-semibold leading-[22px] text-emerald-800">
                Includes
              </h3>
              <ul className="mt-4 space-y-3">
                {toolIncludes.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-emerald-700">
                    <Check className="size-4 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
              <h3 className="text-[16px] font-semibold leading-[22px] text-red-800">
                Does not include
              </h3>
              <ul className="mt-4 space-y-3">
                {toolDoesNotInclude.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-red-700">
                    <X className="size-4 shrink-0 text-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 flex gap-3 rounded-lg border border-gray-200 bg-white p-6">
            <Info className="size-5 shrink-0 mt-0.5 text-gray-300" />
            <p className="text-[16px] leading-[22px] text-gray-400">
              Actual bank products may use different terms, rates, or early
              withdrawal rules. This estimate is for planning purposes only.
            </p>
          </div>
        </section>

        {/* Why Your Actual Time Deposit Return May Be Different */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Why Your Actual Time Deposit Return May Be Different
          </h2>
          <p className="mt-3 text-[16px] leading-[22px] text-gray-400">
            Your actual return may differ from this estimate for several
            reasons.
          </p>
          <ul className="mt-3 text-[16px] leading-[22px] text-gray-400 space-y-2">
            {whyDifferent.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-brand" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Time Deposit vs Savings Account */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Time Deposit vs Savings Account
          </h2>
          <p className="mt-3 text-[16px] leading-[22px] text-gray-400">
            A time deposit is usually better for money you can leave untouched
            for a fixed period. A savings account is usually better if you want
            easier access to your funds. The right choice depends on whether you
            value liquidity more than a fixed-term return.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                Time Deposit
              </h3>
              <ul className="mt-3 text-[16px] leading-[22px] text-gray-400 space-y-2">
                {tdVsSavings.timeDeposit.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                Savings Account
              </h3>
              <ul className="mt-3 text-[16px] leading-[22px] text-gray-400 space-y-2">
                {tdVsSavings.savingsAccount.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={timeDepositData.faqs} />
        </div>

        {/* Related Savings and Rates Pages */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Related Savings and Rates Pages
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </>
  );
}
