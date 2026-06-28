import Link from "next/link";
import {
  Landmark,
  Calculator,
  ArrowRight,
  Info,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
import { SourceCitation } from "@/components/shared/source-citation";
import { GuideCtaCard } from "@/components/guides/guide-cta-card";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema-markup";
import { formatPeso } from "@/lib/formatters";
import { DISCLAIMER_TEXT, GOVERNMENT_DISCLAIMER } from "@/lib/constants";
import {
  withholdingTaxMeta,
  trainLawBrackets,
  withholdingTaxFaqs,
  WITHHOLDING_TAX_UPDATED_AT,
} from "@/data/guides/withholding-tax-guide";

export const metadata = generatePageMetadata({
  title: withholdingTaxMeta.metaTitle,
  description: withholdingTaxMeta.metaDescription,
  slug: withholdingTaxMeta.slug,
  updatedAt: WITHHOLDING_TAX_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Guides", href: "/guides" },
  { label: "Withholding Tax" },
];

const exemptGroups = [
  "Minimum wage earners — those receiving only the statutory minimum wage for their region are exempt from income tax regardless of the amount.",
  "Employees earning PHP 250,000 or less per year — under the TRAIN Law, the first PHP 250,000 of annual taxable income is tax-free.",
];

const computeSteps = [
  "Determine annual gross compensation. Multiply your monthly basic salary by 12 and add other taxable benefits (overtime, commissions, etc.).",
  "Subtract mandatory deductions. Deduct your employee share of SSS, PhilHealth, and Pag-IBIG contributions. This gives you your taxable income.",
  "Locate your tax bracket in the TRAIN Law table above.",
  "Apply the formula. Take the base tax for your bracket, then add the tax rate multiplied by the amount your income exceeds the bracket floor.",
  "Divide by 12 (or by the number of pay periods) to get your monthly withholding tax.",
];

const commonMistakes = [
  "Forgetting to subtract mandatory contributions. Your taxable income is your gross pay minus SSS, PhilHealth, and Pag-IBIG. Using gross pay directly will overestimate your tax.",
  "Confusing the tax rate with the effective tax rate. If you fall in the 15% bracket, it does not mean 15% of your entire income goes to tax. Only the amount exceeding PHP 250,000 is taxed at 15%.",
  "Not accounting for 13th-month pay and bonuses. Under the TRAIN Law, the first PHP 90,000 of 13th-month pay and other benefits is tax-exempt. Any excess is added to your taxable income.",
  "Not filing BIR Form 2316. Even if your employer handles withholding, make sure you receive your Certificate of Compensation Payment/Tax Withheld (BIR Form 2316) every year for your records.",
  "Assuming minimum wage = automatic tax exemption. You are only exempt if your pay is exactly the statutory minimum wage. If you receive any amount above minimum wage (such as night differential or overtime beyond legal limits), the excess may be taxable.",
];

const relatedContent = [
  {
    title: "Withholding Tax Calculator",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Take-Home Pay Guide",
    href: "/guides/tax/take-home-pay-guide-philippines",
    icon: BookOpen,
  },
  {
    title: "SSS Contribution Calculator",
    href: "/calculators/sss/sss-contribution-calculator-philippines",
    icon: Calculator,
  },
];

const rateBadge: Record<number, string> = {
  0: "bg-[#EEF1F7] text-[#5B6678]",
  15: "bg-[#E4EDFB] text-[#1E5FD0]",
  20: "bg-[#E7E9FB] text-[#3D49C4]",
  25: "bg-[#EDE8FC] text-[#6D4DE0]",
  30: "bg-[#FBF0DC] text-[#B7791F]",
  35: "bg-[#FBE6E7] text-[#C2484D]",
};

export default function WithholdingTaxGuidePage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: withholdingTaxMeta.metaTitle,
          description: withholdingTaxMeta.metaDescription,
          updatedAt: WITHHOLDING_TAX_UPDATED_AT,
          slug: withholdingTaxMeta.slug,
        })}
      />

      <PageHero
        title="How Withholding Tax Works in the Philippines"
        description="A practical, plain-language guide to understanding Philippine withholding tax under the TRAIN Law. Learn the tax brackets, computation formula, and how to verify your payslip."
        badge={WITHHOLDING_TAX_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        containerClassName="max-w-[1240px] px-[clamp(20px,3vw,36px)]"
        variant="dark"
      />

      <div className="mx-auto max-w-[1240px] px-[clamp(20px,3vw,36px)] pb-20 pt-[clamp(20px,3vw,32px)]">
        {/* Quick Answer */}
        <section>
          <div className="flex gap-[13px] rounded-[16px] border border-[#D3DEFA] bg-[#EAF0FF] p-5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] bg-white shadow-[0_1px_2px_rgba(16,24,40,.05)]">
              <Landmark className="size-5 text-brand" />
            </span>
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[.06em] text-brand">
                Quick answer
              </p>
              <p className="mt-1.5 text-[16px] leading-[1.6] text-[#344054]">
                {withholdingTaxMeta.directAnswer}
              </p>
            </div>
          </div>
        </section>

        {/* Pointer to the canonical table page */}
        <Link
          href="/government/bir/withholding-tax-table-philippines"
          className="group mt-4 flex items-center gap-3 rounded-[14px] border border-[#E7EBF3] bg-white px-5 py-4 transition-colors hover:border-[#BCC9F4]"
        >
          <Info className="size-5 shrink-0 text-brand" />
          <p className="flex-1 text-[15px] leading-[1.5] text-[#5A6478]">
            Need the actual tax brackets? See the{" "}
            <span className="font-semibold text-brand">
              2026 BIR withholding tax table
            </span>
            .
          </p>
          <ArrowRight className="size-4 shrink-0 text-[#C4CCDB] transition-transform group-hover:translate-x-0.5" />
        </Link>

        {/* 1. What Is Withholding Tax? */}

        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            1. What Is Withholding Tax?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            Withholding tax is the Philippine government&apos;s method of
            collecting income tax at the source. Instead of paying your entire
            annual tax bill in one lump sum, your employer deducts a portion
            of your salary every payday and sends it directly to the Bureau of
            Internal Revenue (BIR).
          </p>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            Think of it as a &ldquo;pay-as-you-earn&rdquo; system. By the end
            of the year, most of your income tax obligation has already been
            collected through these regular deductions.
          </p>
        </section>

        {/* 2. Who Pays Withholding Tax? */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            2. Who Pays Withholding Tax?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            Most employees in the Philippines are subject to withholding tax.
            However, these groups are <strong>exempt</strong>:
          </p>
          <ul className="mt-4 space-y-3">
            {exemptGroups.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[1.6] text-[#5A6478]">
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            Self-employed individuals and freelancers also pay income tax but
            through a different mechanism (quarterly filings via BIR Form
            1701Q).
          </p>
        </section>

        {/* 3. TRAIN Law Tax Brackets */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            3. TRAIN Law Tax Brackets (2023 Onwards)
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            The Tax Reform for Acceleration and Inclusion (TRAIN) Law, or
            Republic Act No. 10963, revised the Philippine income tax brackets.
            The table below shows the graduated rates effective January 1, 2023:
          </p>
          <div className="mt-6 overflow-x-auto rounded-[14px] border border-[#E0E6F2]">
            <div className="min-w-[560px]">
              <div className="grid grid-cols-[1.2fr_1fr_0.85fr_0.55fr_1fr] gap-[10px] border-b border-[#E0E6F2] bg-[#EEF2FB] px-5 py-[13px] text-[11px] font-bold uppercase tracking-[.04em] text-[#56607A]">
                <span>Taxable income (over)</span>
                <span>But not over</span>
                <span className="text-right">Base tax</span>
                <span className="text-right">Rate</span>
                <span className="text-right">Of excess over</span>
              </div>
              {trainLawBrackets.map((bracket, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-[1.2fr_1fr_0.85fr_0.55fr_1fr] items-center gap-[10px] px-5 py-[13px] ${
                    index < trainLawBrackets.length - 1
                      ? "border-b border-[#EEF1F7]"
                      : ""
                  } ${index % 2 === 1 ? "bg-[#FBFCFE]" : ""}`}
                >
                  <span className="font-mono text-[12.5px] font-medium text-[#0E1525]">
                    ₱{bracket.overBut}
                  </span>
                  <span className="font-mono text-[12.5px] text-[#475069]">
                    {bracket.notOver === "No limit"
                      ? "No limit"
                      : `₱${bracket.notOver}`}
                  </span>
                  <span className="text-right font-mono text-[12.5px] font-semibold text-[#0E1525]">
                    {formatPeso(bracket.baseTax, 0)}
                  </span>
                  <span className="text-right">
                    <span
                      className={`inline-flex items-center rounded-[7px] px-[9px] py-[3px] text-[12px] font-bold ${
                        rateBadge[bracket.rate] ?? "bg-[#EEF1F7] text-[#0E1525]"
                      }`}
                    >
                      {bracket.rate}%
                    </span>
                  </span>
                  <span className="text-right font-mono text-[12.5px] text-[#475069]">
                    {bracket.ofExcessOver === 0
                      ? "—"
                      : formatPeso(bracket.ofExcessOver, 0)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. How to Compute Your Withholding Tax */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            4. How to Compute Your Withholding Tax
          </h2>
          <p className="mt-3 text-[16px] leading-[1.6] text-[#5A6478]">
            The basic formula is:
          </p>
          <div className="mt-4 overflow-x-auto rounded-[12px] border border-[#E4E9F4] bg-[#F5F7FC] px-[18px] py-4">
            <p className="font-mono text-[13.5px] leading-[1.5] text-[#1A2540]">
              Annual Tax = Base Tax + (Tax Rate × (Taxable Income − Lower Bracket
              Limit))
            </p>
          </div>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            Follow these steps:
          </p>
          <ul className="mt-4 space-y-[13px]">
            {computeSteps.map((item, i) => (
              <li key={i} className="flex items-start gap-[13px]">
                <span className="flex size-[26px] shrink-0 items-center justify-center rounded-[8px] bg-[#EAF0FF] text-[14px] font-bold text-brand">
                  {i + 1}
                </span>
                <span className="text-[16px] leading-[1.625] text-[#344054]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. How Employers Withhold Tax */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            5. How Employers Withhold Tax
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            Employers use the BIR&apos;s Revised Withholding Tax Table to
            determine how much to deduct from each payroll. The amount depends
            on the employee&apos;s pay frequency (monthly, semi-monthly,
            weekly, or daily) and their taxable compensation for that period.
          </p>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            At year-end (usually in December), the employer performs an{" "}
            <strong>annualization</strong>: they compute the actual annual tax
            based on total compensation, compare it to the total amount
            already withheld, and either refund the excess or collect the
            shortfall through the final payroll.
          </p>
        </section>

        {/* Worked Example */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Worked Example: PHP 35,000 Monthly Salary
          </h2>
          {/* Scenario */}
          <div className="mt-6 flex flex-wrap items-start gap-[13px] rounded-[14px] border border-[#DFE9FB] bg-[#F4F8FF] px-[18px] py-[15px]">
            <span className="rounded-[7px] bg-[#E3ECFF] px-[9px] py-[5px] text-[10.5px] font-bold uppercase leading-none tracking-[.1em] text-brand">
              Scenario
            </span>
            <span className="text-[15px] leading-[1.55] text-[#2A3550]">
              An employee earns <strong className="text-[#0E1525]">₱35,000/month</strong>{" "}
              in basic salary with no other taxable benefits.
            </span>
          </div>

          {/* Timeline */}
          <div className="mt-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex size-[30px] items-center justify-center rounded-full bg-[#EAF0FF] text-[13.5px] font-bold text-brand">
                  1
                </div>
                <div className="my-2 w-[2px] flex-1 bg-[#E5EBF7]" />
              </div>
              <div className="min-w-0 flex-1 pb-6">
                <div className="mb-[11px] mt-[5px] text-[15.5px] font-semibold text-[#0E1525]">
                  Annual gross compensation
                </div>
                <div className="inline-flex flex-wrap items-center gap-[9px] font-mono text-[13px]">
                  <span className="rounded-[9px] border border-[#E8EDF7] bg-[#F4F6FB] px-3 py-2 text-[#5A6478]">
                    ₱35,000 × 12
                  </span>
                  <span className="text-[#AAB3C6]">=</span>
                  <span className="rounded-[9px] border border-[#D6E1FB] bg-[#EAF0FF] px-3 py-2 font-semibold text-brand">
                    ₱420,000
                  </span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex size-[30px] items-center justify-center rounded-full bg-[#EAF0FF] text-[13.5px] font-bold text-brand">
                  2
                </div>
                <div className="my-2 w-[2px] flex-1 bg-[#E5EBF7]" />
              </div>
              <div className="min-w-0 flex-1 pb-6">
                <div className="mb-[11px] mt-[5px] text-[15.5px] font-semibold text-[#0E1525]">
                  Subtract mandatory contributions
                </div>
                <div className="max-w-[420px] overflow-hidden rounded-[12px] border border-[#ECEFF6]">
                  {[
                    ["SSS", "₱1,750 × 12 = ₱21,000"],
                    ["PhilHealth", "₱612.50 × 12 = ₱7,350"],
                    ["Pag-IBIG", "₱200 × 12 = ₱2,400"],
                  ].map(([label, val]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-3 border-b border-[#F0F2F8] px-[14px] py-[10px]"
                    >
                      <span className="text-[13.5px] text-[#5A6478]">{label}</span>
                      <span className="font-mono text-[12.5px] text-[#475069]">
                        {val}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between gap-3 bg-[#FAFBFE] px-[14px] py-[11px]">
                    <span className="text-[13.5px] font-semibold text-[#344054]">
                      Total deductions
                    </span>
                    <span className="font-mono text-[12.5px] font-semibold text-[#0E1525]">
                      − ₱30,750
                    </span>
                  </div>
                </div>
                <div className="mt-3 inline-flex flex-wrap items-center gap-[9px] font-mono text-[13px]">
                  <span className="rounded-[9px] border border-[#E8EDF7] bg-[#F4F6FB] px-3 py-2 text-[#5A6478]">
                    ₱420,000 − ₱30,750
                  </span>
                  <span className="text-[#AAB3C6]">=</span>
                  <span className="rounded-[9px] border border-[#D6E1FB] bg-[#EAF0FF] px-3 py-2 font-semibold text-brand">
                    ₱389,250 taxable
                  </span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex size-[30px] items-center justify-center rounded-full bg-[#EAF0FF] text-[13.5px] font-bold text-brand">
                  3
                </div>
                <div className="my-2 w-[2px] flex-1 bg-[#E5EBF7]" />
              </div>
              <div className="min-w-0 flex-1 pb-6">
                <div className="mb-[11px] mt-[5px] text-[15.5px] font-semibold text-[#0E1525]">
                  Identify the tax bracket
                </div>
                <div className="inline-flex flex-wrap items-center gap-[9px] rounded-[9px] border border-[#E8EDF7] bg-[#F4F6FB] px-3 py-2 font-mono text-[13px] text-[#475069]">
                  Over ₱250,000 — not over ₱400,000
                  <span className="rounded-[6px] bg-[#EAF0FF] px-[7px] py-0.5 font-semibold text-brand">
                    15% bracket
                  </span>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex size-[30px] items-center justify-center rounded-full bg-[#EAF0FF] text-[13.5px] font-bold text-brand">
                  4
                </div>
                <div className="my-2 w-[2px] flex-1 bg-[#E5EBF7]" />
              </div>
              <div className="min-w-0 flex-1 pb-6">
                <div className="mb-[11px] mt-[5px] text-[15.5px] font-semibold text-[#0E1525]">
                  Apply the formula
                </div>
                <div className="max-w-[420px] rounded-[10px] border border-[#E8EDF7] bg-[#F4F6FB] px-[14px] py-[11px] font-mono text-[13px] leading-[1.9] text-[#475069]">
                  base ₱0 + 15% × (₱389,250 − ₱250,000)
                  <br />= 15% × ₱139,250
                </div>
                <div className="mt-3 inline-flex flex-wrap items-center gap-[9px] font-mono text-[13px]">
                  <span className="text-[#5A6478]">annual tax</span>
                  <span className="text-[#AAB3C6]">=</span>
                  <span className="rounded-[9px] border border-[#D6E1FB] bg-[#EAF0FF] px-3 py-2 font-semibold text-brand">
                    ₱20,887.50
                  </span>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex size-[30px] items-center justify-center rounded-full bg-[#EAF0FF] text-[13.5px] font-bold text-brand">
                  5
                </div>
              </div>
              <div className="min-w-0 flex-1 pb-1.5">
                <div className="mb-[11px] mt-[5px] text-[15.5px] font-semibold text-[#0E1525]">
                  Divide into monthly withholding
                </div>
                <div className="inline-flex flex-wrap items-center gap-[9px] font-mono text-[13px]">
                  <span className="rounded-[9px] border border-[#E8EDF7] bg-[#F4F6FB] px-3 py-2 text-[#5A6478]">
                    ₱20,887.50 ÷ 12
                  </span>
                  <span className="text-[#AAB3C6]">=</span>
                  <span className="rounded-[9px] border border-[#D6E1FB] bg-[#EAF0FF] px-3 py-2 font-semibold text-brand">
                    ₱1,740.63
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Result block */}
          <div className="mt-2 flex flex-wrap items-center justify-between gap-[18px] rounded-[16px] bg-[#1430BE] px-[26px] py-[22px]">
            <div>
              <p className="text-[11.5px] font-semibold uppercase tracking-[.09em] text-[#B9C7FF]">
                Est. monthly withholding tax
              </p>
              <p className="mt-1.5 text-[36px] font-bold leading-none tracking-[-0.02em] text-white">
                {formatPeso(1740.63)}
              </p>
            </div>
            <div className="flex flex-wrap gap-[10px]">
              <div className="rounded-[11px] bg-white/[.12] px-[14px] py-[10px]">
                <p className="text-[11px] text-[#B9C7FF]">Annual tax</p>
                <p className="mt-0.5 font-mono text-[14px] font-semibold text-white">
                  {formatPeso(20887.5)}
                </p>
              </div>
              <div className="rounded-[11px] bg-white/[.12] px-[14px] py-[10px]">
                <p className="text-[11px] text-[#B9C7FF]">Effective rate</p>
                <p className="mt-0.5 font-mono text-[14px] font-semibold text-white">
                  ≈ 5.0%
                </p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-[13px] leading-[1.6] text-gray-300">
            Actual withholding may vary slightly due to employer annualization
            adjustments and rounding differences per pay period.
          </p>
        </section>

        {/* Common Mistakes to Avoid */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Common Mistakes to Avoid
          </h2>
          <ul className="mt-6 space-y-4">
            {commonMistakes.map((item, i) => (
              <li key={i} className="flex gap-3 text-[16px] leading-[1.6] text-[#5A6478]">
                <HelpCircle className="mt-0.5 size-5 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </section>

      </div>

      <div className="mx-auto max-w-[1240px] px-[clamp(20px,3vw,36px)] pb-20">
        {/* Calculator CTA */}
        <GuideCtaCard
          title="Want to Compute Your Exact Withholding Tax?"
          description="Use the Withholding Tax Calculator to compute your exact withholding tax based on your salary and deductions. You can also try the Take-Home Pay Calculator to see a full deduction breakdown."
          href="/calculators/tax/withholding-tax-calculator-philippines"
          ctaLabel="Use the Withholding Tax Calculator"
        />
        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={withholdingTaxFaqs} />
        </div>

        {/* Source Citation */}
        <div className="mt-16">
          <SourceCitation
            source="Bureau of Internal Revenue (BIR) — TRAIN Law (RA 10963)"
            sourceUrl="https://www.bir.gov.ph/tax-information/tax-rates"
            updatedAt={WITHHOLDING_TAX_UPDATED_AT}
            reviewCadence="Every 90 days"
          />
        </div>

        <div className="mt-8">
          <DisclaimerBox text={[GOVERNMENT_DISCLAIMER, DISCLAIMER_TEXT]} />
        </div>

        {/* Related Calculators and Guides */}
        <section className="mt-6">
          <h2 className="mb-6 text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Related calculators and guides
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedContent.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-brand">
                    <Icon className="size-4" />
                  </div>
                  <span className="flex-1 text-[16px] font-semibold text-gray-500 group-hover:text-brand">
                    {item.title}
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
