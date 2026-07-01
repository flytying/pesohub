import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Info,
  Clock,
  CircleCheck,
  PiggyBank,
  Target,
  TrendingUp,
  Calculator,
  ShieldCheck,
  Banknote,
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
const H2 =
  "font-display text-[22px] font-semibold tracking-[-0.02em] text-[#0E1525]";
const LEAD = "mt-[10px] text-[16px] leading-[1.65] text-[#475069]";

const formulaLines = [
  "Gross interest = Deposit amount × Annual rate × Term in years",
  "Tax withheld = Gross interest × 20%",
  "After-tax interest = Gross interest − Tax withheld",
  "Maturity amount = Deposit amount + After-tax interest",
];

const exampleRows: { label: string; value: string; kind?: "total" }[] = [
  { label: "Deposit amount", value: "₱100,000" },
  { label: "Annual rate", value: "5.5%" },
  { label: "Term", value: "12 months" },
  { label: "Gross interest", value: "₱5,500" },
  { label: "Tax withheld at 20%", value: "−₱1,100" },
  { label: "After-tax interest", value: "₱4,400" },
  { label: "Maturity amount", value: "₱104,400", kind: "total" },
];

const maturityMeaning = [
  "Principal is your original deposit",
  "Gross interest is the estimated return before tax",
  "After-tax interest is the estimated return after the 20% withholding tax",
  "Net maturity value is the estimated total you may receive at the end of the term",
];

const vsRows: { feature: string; td: string; savings: string }[] = [
  {
    feature: "Access to funds",
    td: "Locked until maturity",
    savings: "Withdraw anytime",
  },
  {
    feature: "Interest rate",
    td: "Usually higher, fixed for the term",
    savings: "Usually lower, can change",
  },
  {
    feature: "Lock-in period",
    td: "Fixed term (days to years)",
    savings: "None",
  },
  {
    feature: "Early withdrawal",
    td: "Penalty or reduced interest",
    savings: "No penalty",
  },
  {
    feature: "Best for",
    td: "Money you can lock in for a fixed period",
    savings: "Emergency funds and money you may need anytime",
  },
  {
    feature: "Risk / protection",
    td: "PDIC-insured up to ₱1M per depositor, per bank",
    savings: "PDIC-insured up to ₱1M per depositor, per bank",
  },
];

const beforeYouOpen = [
  "Check the gross annual interest rate.",
  "Confirm the term and maturity date.",
  "Ask if interest is credited at maturity or periodically.",
  "Check if the rate is promotional or standard.",
  "Ask about early withdrawal penalties.",
  "Check the minimum placement amount.",
  "Confirm whether the bank is covered by PDIC.",
  "Keep total deposits within PDIC coverage if protection is important to you.",
];

const ratesBridge = [
  {
    title: "Time deposit rates Philippines",
    href: "/rates/savings-rates/time-deposit-rates-philippines",
    icon: Banknote,
  },
  {
    title: "Best savings interest rates Philippines",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    icon: PiggyBank,
  },
  {
    title: "Best digital bank rates Philippines",
    href: "/rates/savings-rates/best-digital-bank-rates-philippines",
    icon: TrendingUp,
  },
];

const relatedPages = [
  {
    title: "best savings interest rates in the Philippines",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    icon: PiggyBank,
  },
  {
    title: "best digital bank rates",
    href: "/rates/savings-rates/best-digital-bank-rates-philippines",
    icon: TrendingUp,
  },
  {
    title: "time deposit rates Philippines",
    href: "/rates/savings-rates/time-deposit-rates-philippines",
    icon: Banknote,
  },
  {
    title: "savings goal calculator",
    href: "/calculators/savings/savings-goal-calculator-philippines",
    icon: Target,
  },
  {
    title: "Philippine rates hub",
    href: "/rates",
    icon: Calculator,
  },
];

export default function TimeDepositCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: "Time Deposit Calculator Philippines",
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
                      <span className={last ? "text-[#5A6478]" : ""}>
                        {b.label}
                      </span>
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
          <p className="mt-[9px] text-[16px] leading-[1.55] text-[#5A6478]">
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
          {/* How to compute */}
          <section className={CARD}>
            <h2 className={H2}>How to Compute Time Deposit Interest</h2>
            <p className={LEAD}>
              For a simple time deposit estimate, gross interest is computed
              using deposit amount, annual interest rate, and term. Tax is then
              deducted from the interest, not from the principal.
            </p>
            <div className="mt-4 space-y-2">
              {formulaLines.map((line) => (
                <div
                  key={line}
                  className="rounded-[12px] border border-[#E7EBF3] bg-[#F7F9FC] px-4 py-3 font-mono text-[14.5px] text-[#0E1525]"
                >
                  {line}
                </div>
              ))}
            </div>
            <p className="mt-5 text-[15px] font-bold text-[#0E1525]">
              Example: ₱100,000 at 5.5% for 12 months
            </p>
            <div className="mt-3 overflow-hidden rounded-[14px] border border-[#E7EBF3]">
              {exampleRows.map((r, i) => (
                <div
                  key={r.label}
                  className={`flex items-center justify-between px-[18px] py-[12px] ${
                    i < exampleRows.length - 1
                      ? "border-b border-[#EEF1F7]"
                      : ""
                  } ${r.kind === "total" ? "bg-[#EAF5F1]" : ""}`}
                >
                  <span
                    className={`text-[15px] ${
                      r.kind === "total"
                        ? "font-bold text-[#0E1525]"
                        : "text-[#475069]"
                    }`}
                  >
                    {r.label}
                  </span>
                  <span
                    className={`font-mono text-[14.5px] tabular-nums ${
                      r.kind === "total"
                        ? "font-bold text-[#0B8270]"
                        : "text-[#0E1525]"
                    }`}
                  >
                    {r.value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Tax */}
          <section className={CARD}>
            <h2 className={H2}>Time Deposit Tax in the Philippines</h2>
            <p className={LEAD}>
              In the Philippines, interest earned from peso bank deposits is
              generally subject to 20% final withholding tax. This means the
              advertised rate is usually a gross rate, and the amount credited to
              you may be lower after tax. The bank withholds the tax automatically
              and remits it to the BIR, so your interest is credited net of tax.
            </p>
            <div className="mt-4 flex items-start gap-[11px] rounded-[13px] border border-[#C9D6F7] bg-[#EAF0FF] p-[14px_16px]">
              <Info className="mt-0.5 size-[18px] shrink-0 text-brand" />
              <span className="text-[15px] leading-[1.55] text-[#26408B]">
                This calculator uses 20% as the default tax rate for simple
                planning. Always confirm the final tax treatment with your bank or
                official tax guidance.
              </span>
            </div>
          </section>

          {/* What maturity means */}
          <section className={CARD}>
            <h2 className={H2}>What your maturity amount means</h2>
            <p className={LEAD}>
              Your maturity amount is the estimated total value of your deposit at
              the end of the selected term. It includes your original principal
              plus the interest earned over the deposit period, after tax.
            </p>
            <ul className="mt-4 space-y-3">
              {maturityMeaning.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[16px] leading-[1.55] text-[#475069]"
                >
                  <CircleCheck className="mt-0.5 size-[18px] shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* TD vs savings — table */}
          <section className={CARD}>
            <h2 className={H2}>Time Deposit vs Savings Account</h2>
            <p className={LEAD}>
              A time deposit is good for money you can lock in for a fixed period.
              A savings account is better for emergency funds and money you may
              need anytime.
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#E7EBF3] bg-[#F4F7FE]">
                    <th className="px-4 py-3 text-[13px] font-bold uppercase tracking-[.04em] text-[#475069]">
                      Feature
                    </th>
                    <th className="px-4 py-3 text-[13px] font-bold uppercase tracking-[.04em] text-[#475069]">
                      Time deposit
                    </th>
                    <th className="px-4 py-3 text-[13px] font-bold uppercase tracking-[.04em] text-[#475069]">
                      Savings account
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vsRows.map((r, i) => (
                    <tr
                      key={r.feature}
                      className={
                        i < vsRows.length - 1
                          ? "border-b border-[#EEF1F7]"
                          : ""
                      }
                    >
                      <td className="px-4 py-[13px] text-[15px] font-semibold text-[#0E1525]">
                        {r.feature}
                      </td>
                      <td className="px-4 py-[13px] text-[15px] leading-[1.5] text-[#475069]">
                        {r.td}
                      </td>
                      <td className="px-4 py-[13px] text-[15px] leading-[1.5] text-[#475069]">
                        {r.savings}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[15px] text-[#475069]">
              <Link
                href="/rates/savings-rates/best-savings-interest-rates-philippines"
                className="font-bold text-brand hover:underline"
              >
                Compare savings interest rates
              </Link>{" "}
              to see how current savings yields stack up against time deposit
              rates.
            </p>
          </section>

          {/* Before you open */}
          <section className={CARD}>
            <h2 className={H2}>Before You Open a Time Deposit</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {beforeYouOpen.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[15.5px] leading-[1.5] text-[#344054]"
                >
                  <CircleCheck className="mt-0.5 size-[18px] shrink-0 text-[#0E9F6E]" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-start gap-[11px] rounded-[13px] border border-[#BDE9CF] bg-[#F2FAF6] p-[14px_16px]">
              <ShieldCheck className="mt-0.5 size-[18px] shrink-0 text-[#0E9F6E]" />
              <span className="text-[15px] leading-[1.55] text-[#1B5E43]">
                PDIC deposit insurance is currently up to ₱1 million per
                depositor, per bank.
              </span>
            </div>
          </section>

          {/* Rates bridge */}
          <section className={CARD}>
            <h2 className={H2}>Looking for Current Time Deposit Rates?</h2>
            <p className={LEAD}>
              This calculator helps you estimate your return once you already have
              a deposit amount, rate, and term. If you are still comparing banks,
              check PesoHub&apos;s time deposit rates page or savings rates guide
              first, then return here to compute the estimated maturity amount.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {ratesBridge.map((page) => {
                const Icon = page.icon;
                return (
                  <Link
                    key={page.title}
                    href={page.href}
                    className="group flex items-center gap-3 rounded-[14px] border border-[#E7EBF3] bg-white p-4 transition-colors hover:border-[#C3D0F2] hover:bg-[#FBFCFE]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] bg-[#EAF0FF] text-brand">
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="flex-1 text-[15px] font-bold leading-[1.3] text-[#0E1525] group-hover:text-brand">
                      {page.title}
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-[#C4CCDB]" />
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Disclaimer */}
          <div className="flex gap-3 rounded-[14px] border border-[#F0E2BE] bg-[#FFF8E8] p-5">
            <Info className="mt-0.5 size-5 shrink-0 text-[#C99A22]" />
            <p className="text-[15px] leading-[1.6] text-[#7A6320]">
              This calculator provides estimates for planning purposes only.
              Actual bank products may use different compounding, rates, crediting,
              or early-withdrawal rules, and promotional rates may have conditions.
              It is not an official bank quote — always confirm final figures with
              the bank.
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
                    <span className="flex-1 text-[15px] font-bold capitalize text-[#0E1525] group-hover:text-brand">
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
