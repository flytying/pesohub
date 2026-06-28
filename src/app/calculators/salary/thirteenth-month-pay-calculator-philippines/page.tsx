import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Info,
  Clock,
  Check,
  X,
  Wallet,
  Percent,
  Shield,
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
import { ThirteenthMonthCalculator } from "@/components/calculators/thirteenth-month-calculator";
import { thirteenthMonthData } from "@/data/calculators/thirteenth-month";
import { formatDate } from "@/lib/formatters";

export const metadata: Metadata = generatePageMetadata({
  title: thirteenthMonthData.metaTitle,
  description: thirteenthMonthData.metaDescription,
  slug: thirteenthMonthData.slug,
  updatedAt: thirteenthMonthData.updatedAt,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "13th Month Pay Calculator" },
];

const CARD =
  "rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,30px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]";
const H2 = "font-display text-[22px] font-semibold tracking-[-0.02em] text-[#0E1525]";
const LEAD = "mt-[10px] max-w-[80ch] text-[16px] leading-[1.65] text-[#475069]";

const usuallyIncluded = [
  "Regular basic salary",
  "Fixed salary actually earned during the covered months",
];

const usuallyExcluded = [
  "Overtime pay",
  "Holiday pay",
  "Night shift differential",
  "Allowances",
  "Commissions that are not part of basic salary",
  "Non-cash benefits",
];

const whyDifferent = [
  "Your salary changed during the year",
  "Payroll items were classified differently",
  "Your employer already provides a 13th month pay equivalent",
  "Case law around PD 851 may affect how compliance is measured",
  "Additional company-specific compensation rules apply",
];

const relatedPages = [
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Wallet,
  },
  {
    title: "Withholding Tax Calculator",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    icon: Percent,
  },
  {
    title: "SSS Contribution Calculator",
    href: "/calculators/sss/sss-contribution-calculator-philippines",
    icon: Shield,
  },
  {
    title: "Guides Hub",
    href: "/guides",
    icon: BookOpen,
  },
  {
    title: "Calculators Hub",
    href: "/calculators",
    icon: Calculator,
  },
];

const exampleRows = [
  { label: "Monthly basic salary", val: "₱24,000", kind: "plain" },
  { label: "× Months worked", val: "12", kind: "plain" },
  { label: "Total basic salary earned", val: "₱288,000", kind: "sub" },
  { label: "÷ 12", val: "—", kind: "plain" },
  { label: "Estimated 13th month pay", val: "₱24,000", kind: "total" },
] as const;

export default function ThirteenthMonthPayCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: thirteenthMonthData.metaTitle,
          description: thirteenthMonthData.metaDescription,
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
            {thirteenthMonthData.h1}
          </h1>
          <p className="mt-[9px] max-w-[80ch] text-[16px] leading-[1.55] text-[#5A6478]">
            {thirteenthMonthData.intro}
          </p>
          <div className="mt-[11px] flex items-center gap-[6px] text-[15px] font-semibold text-[#6B7488]">
            <Clock className="size-[15px]" />
            Updated {formatDate(thirteenthMonthData.updatedAt)}
          </div>
        </div>

        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <ThirteenthMonthCalculator />
        </div>

        <div className="mt-9 space-y-[14px]">
          {/* How it's computed */}
          <section className={CARD}>
            <h2 className={H2}>How 13th month pay is computed</h2>
            <p className={LEAD}>
              Under PD 851, 13th month pay is one-twelfth of the basic salary you earned during
              the calendar year. For a fixed monthly basic salary, that works out to your monthly
              basic salary multiplied by the months worked, divided by 12.
            </p>
            <p className={LEAD}>
              If you worked the full year, the result usually equals one month&apos;s basic salary.
              If you worked only part of the year, the amount is prorated based on the basic salary
              actually earned during the months counted.
            </p>
          </section>

          {/* Full-year vs prorated */}
          <section className={CARD}>
            <h2 className={H2}>Full-year vs prorated 13th month pay</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[16px] border border-[#E7EBF3] bg-white p-[22px]">
                <h3 className="font-display text-[18px] font-semibold text-[#0E1525]">Full-year estimate</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-[#5A6478]">
                  For employees who worked the full calendar year. Usually equals one month&apos;s
                  basic salary.
                </p>
                <p className="mt-3 font-mono text-[14px] text-[#0B8270]">₱24,000 × 12 ÷ 12 = ₱24,000</p>
              </div>
              <div className="rounded-[16px] border border-[#E7EBF3] bg-white p-[22px]">
                <h3 className="font-display text-[18px] font-semibold text-[#0E1525]">Prorated estimate</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-[#5A6478]">
                  For employees who worked part of the year. Based on basic salary earned during the
                  months counted.
                </p>
                <p className="mt-3 font-mono text-[14px] text-[#0B8270]">₱24,000 × 6 ÷ 12 = ₱12,000</p>
              </div>
            </div>
          </section>

          {/* Included vs excluded */}
          <section className={CARD}>
            <h2 className={H2}>What&apos;s included and excluded</h2>
            <p className={LEAD}>
              The computation base is your basic salary. Supplementary pay items are generally left
              out.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[16px] border border-[#BDE9CF] bg-[#F2FAF6] p-5">
                <div className="mb-3 text-[14px] font-bold text-[#0E9F6E]">Usually included</div>
                <ul className="space-y-[10px]">
                  {usuallyIncluded.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-[#344054]">
                      <Check className="mt-0.5 size-[18px] shrink-0 text-[#0E9F6E]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[16px] border border-[#F3C9C9] bg-[#FDF2F2] p-5">
                <div className="mb-3 text-[14px] font-bold text-[#C0392B]">Usually excluded</div>
                <ul className="space-y-[10px]">
                  {usuallyExcluded.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-[#344054]">
                      <X className="mt-0.5 size-[18px] shrink-0 text-[#C0392B]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Example */}
          <section className={CARD}>
            <h2 className={H2}>Example: a ₱24,000 monthly salary</h2>
            <p className="mt-[10px] text-[15px] text-[#5A6478]">
              Here is the computation for an employee earning ₱24,000 basic per month who worked the
              full year.
            </p>
            <div className="mt-4 overflow-hidden rounded-[14px] border border-[#E7EBF3]">
              {exampleRows.map((r, i) => {
                const isTotal = r.kind === "total";
                const isSub = r.kind === "sub";
                return (
                  <div
                    key={r.label}
                    className={`flex items-center justify-between px-[18px] py-[13px] ${
                      i < exampleRows.length - 1 ? "border-b border-[#EEF1F7]" : ""
                    } ${isTotal ? "bg-[#EAF5F1]" : isSub ? "bg-[#F7F9FD]" : ""}`}
                  >
                    <span className={`text-[15px] ${isTotal || isSub ? "font-bold text-[#0E1525]" : "text-[#475069]"}`}>
                      {r.label}
                    </span>
                    <span className={`font-mono text-[14.5px] font-medium ${isTotal ? "text-[#0B8270]" : "text-[#0E1525]"}`}>
                      {r.val}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-[14px] leading-[1.6] text-[#8A93A6]">
              The first ₱90,000 of 13th month pay and other bonuses per year is exempt from income
              tax; any excess is taxable.
            </p>
          </section>

          {/* Why different */}
          <section className={CARD}>
            <h2 className={H2}>Why your 13th month pay may differ</h2>
            <ul className="mt-4 space-y-[13px]">
              {whyDifferent.map((d) => (
                <li key={d} className="flex items-start gap-3 text-[16px] leading-[1.55] text-[#344054]">
                  <ArrowRight className="mt-1 size-[18px] shrink-0 text-brand" />
                  {d}
                </li>
              ))}
            </ul>
          </section>

          {/* Disclaimer */}
          <div className="flex gap-3 rounded-[14px] border border-[#F0E2BE] bg-[#FFF8E8] p-5">
            <Info className="mt-0.5 size-5 shrink-0 text-[#C99A22]" />
            <p className="text-[15px] leading-[1.6] text-[#7A6320]">
              This calculator provides a basic salary-based estimate for planning only. It does not
              classify every payroll item, apply company-specific rules, or constitute legal advice.
              Confirm your final 13th month pay with your employer&apos;s payroll.
            </p>
          </div>

          {/* FAQ */}
          <section className="pt-7">
            <FaqSection faqs={thirteenthMonthData.faqs} />
          </section>

          {/* Related */}
          <section className="pt-7">
            <h2 className={`mb-4 ${H2}`}>Related calculators and guides</h2>
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
