import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Info,
  Calculator,
  Landmark,
  BookOpen,
  FileText,
  Wallet,
  Clock,
} from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateCalculatorSchema,
} from "@/lib/schema-markup";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/shared/faq-section";
import { WithholdingTaxCalculator } from "@/components/calculators/withholding-tax-calculator";
import { withholdingTaxData, TRAIN_BRACKETS } from "@/data/calculators/withholding-tax";

export const metadata: Metadata = generatePageMetadata({
  title: withholdingTaxData.metaTitle,
  description: withholdingTaxData.metaDescription,
  slug: withholdingTaxData.slug,
  updatedAt: withholdingTaxData.updatedAt,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Withholding Tax Calculator" },
];

const CARD =
  "rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,30px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]";
const H2 = "font-display text-[22px] font-semibold tracking-[-0.02em] text-[#0E1525]";
const LEAD = "mt-[10px] max-w-[80ch] text-[16px] leading-[1.65] text-[#475069]";

const RATE_PILL: Record<string, string> = {
  "0%": "bg-[#EEF1F7] text-[#5B6678]",
  "15%": "bg-[#E4EDFB] text-[#1E5FD0]",
  "20%": "bg-[#E7E9FB] text-[#3D49C4]",
  "25%": "bg-[#EDE8FC] text-[#6D4DE0]",
  "30%": "bg-[#FBF0DC] text-[#B7791F]",
  "35%": "bg-[#FBE6E7] text-[#C2484D]",
};

const exampleRows = [
  { label: "Monthly gross pay", val: "₱35,000" },
  { label: "− SSS + PhilHealth + Pag-IBIG", val: "₱2,825" },
  { label: "Monthly taxable compensation", val: "₱32,175" },
  { label: "Annualized taxable income", val: "₱386,100" },
  { label: "Matching bracket", val: "₱250K – ₱400K" },
  { label: "Estimated annual tax", val: "₱20,415" },
  { label: "Effective rate (on taxable)", val: "≈ 5.29%" },
];

const differList = [
  "Mandatory deductions may reduce taxable income beyond the estimates used here.",
  "Employer payroll settings may apply more specific tax treatment.",
  "Bonuses, allowances, or irregular pay may affect taxable income.",
  "Payroll systems may compute using more detailed assumptions and annualization.",
  "This calculator is designed for estimation, not final payroll output.",
];

const relatedPages = [
  {
    title: "BIR Withholding Tax Table 2026",
    href: "/government/bir/withholding-tax-table-philippines",
    icon: FileText,
  },
  {
    title: "Withholding Tax Guide",
    href: "/guides/tax/how-withholding-tax-works-philippines",
    icon: BookOpen,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Wallet,
  },
  {
    title: "Calculators Hub",
    href: "/calculators",
    icon: Calculator,
  },
  {
    title: "Guides Hub",
    href: "/guides",
    icon: Landmark,
  },
];

export default function WithholdingTaxCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: withholdingTaxData.metaTitle,
          description: withholdingTaxData.metaDescription,
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
            {withholdingTaxData.h1}
          </h1>
          <p className="mt-[9px] max-w-[80ch] text-[16px] leading-[1.55] text-[#5A6478]">
            {withholdingTaxData.intro}
          </p>
          <div className="mt-[11px] flex items-center gap-[6px] text-[15px] font-semibold text-[#6B7488]">
            <Clock className="size-[15px]" />
            Updated June 26, 2026
          </div>
        </div>

        {/* Calculator + live bracket table */}
        <div id="calculator" className="scroll-mt-20">
          <WithholdingTaxCalculator />
        </div>

        <div className="mt-9 space-y-[14px]">
          {/* Support line */}
          <p className="text-[15px] leading-[1.65] text-[#5A6478]">
            This estimate deducts your SSS, PhilHealth, and Pag-IBIG employee shares and
            tax-exempt allowances to get taxable compensation, then applies the TRAIN Law
            table for your chosen pay frequency. For the official brackets, see the{" "}
            <Link
              href="/government/bir/withholding-tax-table-philippines"
              className="font-bold text-brand hover:underline"
            >
              BIR withholding tax table 2026
            </Link>
            .
          </p>

          {/* Yellow callout */}
          <div className="flex gap-3 rounded-[16px] border border-[#F0E2BE] bg-[#FFF8E8] p-5">
            <Info className="mt-0.5 size-5 shrink-0 text-[#C99A22]" />
            <div>
              <div className="mb-[6px] text-[14.5px] font-bold text-[#7A5B12]">
                How this estimate is computed
              </div>
              <p className="mb-2 text-[14.5px] leading-[1.6] text-[#7A6320]">
                The calculator subtracts your SSS, PhilHealth, and Pag-IBIG employee shares
                (estimated automatically or entered manually) and any tax-exempt allowances,
                then applies the BIR table for your pay frequency.
              </p>
              <p className="text-[14.5px] leading-[1.6] text-[#7A6320]">
                Your actual payroll withholding may still differ due to employer rounding,
                supplementary compensation, and payroll-specific rules.
              </p>
            </div>
          </div>

          {/* Why frequency matters */}
          <section className={CARD}>
            <h2 className={H2}>Why pay frequency and deductions matter</h2>
            <p className={LEAD}>
              Philippine income tax brackets are based on annual taxable income. Because
              payroll is processed monthly, semi-monthly, weekly, or daily, the BIR publishes
              a withholding table for each frequency so employers can deduct the right amount
              each period. This calculator annualizes your taxable compensation, applies the
              correct bracket, then splits the tax back across your pay frequency.
            </p>
            <p className={LEAD}>
              Taxable compensation is your gross pay plus taxable allowances, minus your SSS,
              PhilHealth, and Pag-IBIG contributions and any tax-exempt allowances — which is
              why deductions are entered before the tax is computed.
            </p>
          </section>

          {/* Reference bracket table */}
          <section className={CARD}>
            <h2 className={H2}>Current income tax brackets in the Philippines</h2>
            <p className="mt-[10px] text-[15px] leading-[1.6] text-[#6B7488]">
              These are the annual income tax brackets used for the estimate. Annual taxable
              income up to ₱250,000 is generally exempt from income tax under the current
              structure.
            </p>
            <div className="mt-4 overflow-x-auto rounded-[14px] border border-[#E0E6F2]">
              <div className="min-w-[540px]">
                <div className="grid grid-cols-[1.2fr_0.5fr_1.7fr] gap-[14px] border-b border-[#E0E6F2] bg-[#EEF2FB] px-5 py-[13px] text-[12px] font-bold tracking-[.05em] text-[#56607A]">
                  <span>ANNUAL TAXABLE INCOME</span>
                  <span>TAX RATE</span>
                  <span>BASE TAX + MARGINAL RULE</span>
                </div>
                {TRAIN_BRACKETS.map((b, i) => (
                  <div
                    key={b.range}
                    className={`grid grid-cols-[1.2fr_0.5fr_1.7fr] items-center gap-[14px] px-5 py-[14px] ${
                      i < TRAIN_BRACKETS.length - 1 ? "border-b border-[#EEF1F7]" : ""
                    } ${i % 2 === 1 ? "bg-[#FBFCFE]" : ""}`}
                  >
                    <span className="font-mono text-[13.5px] font-medium text-[#0E1525]">{b.range}</span>
                    <span>
                      <span className={`inline-flex items-center rounded-[7px] px-[9px] py-[3px] font-display text-[12px] font-bold ${RATE_PILL[b.rate]}`}>
                        {b.rate}
                      </span>
                    </span>
                    <span className="font-mono text-[13px] text-[#475069]">{b.due}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-[14px] text-[13px] text-[#8A93A6]">
              Source: TRAIN Law (RA 10963), effective January 1, 2023.
            </p>
          </section>

          {/* Example */}
          <section className={CARD}>
            <h2 className={H2}>Example: how withholding tax is estimated from monthly salary</h2>
            <p className="mt-[10px] text-[15px] leading-[1.6] text-[#6B7488]">
              Here is a simple example to show how the estimate works in practice.
            </p>
            <div className="mt-4 overflow-hidden rounded-[15px] border border-[#E0E6F2]">
              <div className="border-b border-[#E0E6F2] bg-[#EEF2FB] px-[22px] py-[15px] font-display text-[16px] font-semibold text-[#0E1525]">
                ₱35,000 monthly pay (contributions estimated)
              </div>
              {exampleRows.map((e, i) => (
                <div
                  key={e.label}
                  className={`flex items-center justify-between gap-4 px-[22px] py-[13px] ${
                    i < exampleRows.length - 1 ? "border-b border-[#EEF1F7]" : ""
                  } ${i % 2 === 1 ? "bg-[#FBFCFE]" : ""}`}
                >
                  <span className="text-[15px] text-[#475069]">{e.label}</span>
                  <span className="font-mono text-[14.5px] font-medium text-[#0E1525]">{e.val}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-4 border-t-2 border-[#E0E6F2] bg-[#F4F7FE] px-[22px] py-4">
                <span className="font-display text-[16px] font-semibold text-[#0E1525]">
                  Est. monthly withholding
                </span>
                <span className="font-mono text-[18px] font-semibold text-brand">₱1,701/mo</span>
              </div>
            </div>
            <p className="mt-[14px] text-[13px] leading-[1.6] text-[#8A93A6]">
              15% of excess over ₱250,000 = ₱20,415/yr ÷ 12. SSS share is approximate and varies
              with the current SSS table. This example is for illustration only; actual payroll
              withholding may differ depending on your exact contributions and employer payroll
              treatment.
            </p>
          </section>

          {/* Why different */}
          <section className={CARD}>
            <h2 className={H2}>Why your actual payroll withholding may be different</h2>
            <p className="mt-[10px] text-[15px] leading-[1.6] text-[#6B7488]">
              Your actual withholding tax in payroll may differ from this estimate for several
              reasons.
            </p>
            <ul className="mt-4 space-y-[13px]">
              {differList.map((d) => (
                <li key={d} className="flex items-start gap-3 text-[16px] leading-[1.55] text-[#344054]">
                  <ArrowRight className="mt-1 size-[18px] shrink-0 text-brand" />
                  {d}
                </li>
              ))}
            </ul>
          </section>

          {/* Net pay next steps */}
          <section className={CARD}>
            <h2 className={H2}>Net pay and next steps</h2>
            <p className={LEAD}>
              The calculator shows your net pay for the pay period after withholding tax and your
              SSS, PhilHealth, and Pag-IBIG contributions. For a dedicated monthly take-home
              breakdown, use the{" "}
              <Link
                href="/calculators/tax/take-home-pay-calculator-philippines"
                className="font-bold text-brand hover:underline"
              >
                Take-Home Pay Calculator
              </Link>
              , and to learn the rules behind the numbers, read{" "}
              <Link
                href="/guides/tax/how-withholding-tax-works-philippines"
                className="font-bold text-brand hover:underline"
              >
                how withholding tax works
              </Link>
              .
            </p>
          </section>

          {/* FAQ */}
          <section className="pt-7">
            <FaqSection faqs={withholdingTaxData.faqs} />
          </section>

          {/* Related */}
          <section className="pt-7">
            <h2 className={`mb-4 ${H2}`}>Related tax pages and tools</h2>
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
