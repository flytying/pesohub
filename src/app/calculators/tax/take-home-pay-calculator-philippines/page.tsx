import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Info,
  HelpCircle,
  Calculator,
  Landmark,
  Shield,
  HeartPulse,
  House,
  Percent,
  PiggyBank,
  Target,
  Clock,
} from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateCalculatorSchema,
} from "@/lib/schema-markup";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/shared/faq-section";
import { TakeHomePayCalculator } from "@/components/calculators/take-home-pay-calculator";
import { takeHomePayData } from "@/data/calculators/take-home-pay";
import { calculateTakeHomePay } from "@/lib/calculators/take-home-pay";
import { formatPeso } from "@/lib/formatters";

export const metadata: Metadata = generatePageMetadata({
  title: takeHomePayData.metaTitle,
  description: takeHomePayData.metaDescription,
  slug: takeHomePayData.slug,
  updatedAt: takeHomePayData.updatedAt,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Take-Home Pay Calculator" },
];

const CARD =
  "rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,30px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]";
const H2 = "font-display text-[22px] font-semibold tracking-[-0.02em] text-[#0E1525]";
const LEAD = "mt-[10px] max-w-[80ch] text-[16px] leading-[1.65] text-[#475069]";

const deductions = [
  {
    title: "SSS",
    rate: "5% employee share",
    desc: "Social Security System contributions are based on your monthly salary credit, currently capped at ₱35,000. The employee pays 5% and the employer pays 10%.",
    icon: Shield,
  },
  {
    title: "PhilHealth",
    rate: "2.5% employee share",
    desc: "The national health insurance premium is 5% of your monthly salary, split equally with your employer, within an income floor of ₱10,000 and a ceiling of ₱100,000.",
    icon: HeartPulse,
  },
  {
    title: "Pag-IBIG",
    rate: "₱200 maximum",
    desc: "The Home Development Mutual Fund contribution is 2% of monthly pay, computed on a maximum of ₱10,000 — so the mandatory employee share tops out at ₱200 per month.",
    icon: House,
  },
];

const tips = [
  "Mandatory contributions lower your taxable income, so a higher contribution can slightly reduce your withholding tax.",
  "The 13th-month pay and other bonuses up to ₱90,000 per year are tax-exempt and are not part of this monthly estimate.",
  "If you are paid semi-monthly, your payslip usually splits each deduction in half across the two paydays.",
  "Salary increases can push you into a higher tax bracket, so your take-home rate may drop as your gross rises.",
  "Check your payslip against this estimate — large differences may point to taxable allowances or company-specific rules.",
];

const relatedPages = [
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
    title: "SSS Pension Calculator",
    href: "/calculators/retirement/sss-pension-calculator",
    icon: PiggyBank,
  },
  {
    title: "Savings Goal Calculator",
    href: "/calculators/savings/savings-goal-calculator-philippines",
    icon: Target,
  },
  {
    title: "Calculators Hub",
    href: "/calculators",
    icon: Calculator,
  },
];

// Worked example at ₱35,000 (computed from the live calc library)
const ex = calculateTakeHomePay({ monthlySalary: 35_000 });
const exTaxable =
  35_000 - ex.sssContribution - ex.philhealthContribution - ex.pagibigContribution;
const exampleRows = [
  { label: "Gross monthly salary", val: formatPeso(35_000), kind: "plain" },
  { label: "Less: SSS contribution", val: `−${formatPeso(ex.sssContribution)}`, kind: "minus" },
  { label: "Less: PhilHealth", val: `−${formatPeso(ex.philhealthContribution)}`, kind: "minus" },
  { label: "Less: Pag-IBIG", val: `−${formatPeso(ex.pagibigContribution)}`, kind: "minus" },
  { label: "Taxable income", val: formatPeso(exTaxable), kind: "sub" },
  { label: "Less: Withholding tax", val: `−${formatPeso(ex.withholdingTax)}`, kind: "minus" },
  { label: "Net take-home pay", val: formatPeso(ex.takeHomePay), kind: "total" },
] as const;

export default function TakeHomePayCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: takeHomePayData.metaTitle,
          description: takeHomePayData.metaDescription,
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
            {takeHomePayData.h1}
          </h1>
          <p className="mt-[9px] max-w-[80ch] text-[16px] leading-[1.55] text-[#5A6478]">
            {takeHomePayData.intro}
          </p>
          <div className="mt-[11px] flex items-center gap-[6px] text-[15px] font-semibold text-[#6B7488]">
            <Clock className="size-[15px]" />
            Updated March 16, 2026
          </div>
        </div>

        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <TakeHomePayCalculator />
        </div>

        <div className="mt-9 space-y-[14px]">
          {/* How take-home pay is computed */}
          <section className={CARD}>
            <h2 className={H2}>How take-home pay is computed</h2>
            <p className={LEAD}>
              Your take-home pay is your gross salary minus four mandatory
              deductions. Three are government contributions — SSS, PhilHealth,
              and Pag-IBIG — and the fourth is withholding tax, which is computed
              on what is left after those contributions.
            </p>
            <p className={LEAD}>
              Because the contributions lower your taxable income, the order
              matters: contributions are deducted first, then withholding tax is
              applied to the reduced amount, and the remainder is your net pay.
            </p>
          </section>

          {/* The four deductions */}
          <section className={CARD}>
            <h2 className={H2}>The four deductions</h2>
            <p className={LEAD}>
              Each deduction follows its own schedule and ceiling. Here is what
              comes out of a private employee&apos;s payslip.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {deductions.map((d) => {
                const Icon = d.icon;
                return (
                  <div key={d.title} className="rounded-[16px] border border-[#E7EBF3] bg-white p-[22px]">
                    <span className="flex size-11 items-center justify-center rounded-[12px] bg-[#EAF0FF] text-brand">
                      <Icon className="size-[22px]" />
                    </span>
                    <h3 className="mt-[14px] font-display text-[18px] font-semibold text-[#0E1525]">
                      {d.title}
                    </h3>
                    <div className="mb-2 mt-[5px] text-[14px] font-bold text-brand">{d.rate}</div>
                    <p className="text-[14.5px] leading-[1.55] text-[#5A6478]">{d.desc}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-start gap-[11px] rounded-[13px] border border-[#C9D6F7] bg-[#EAF0FF] p-[14px_16px]">
              <Info className="mt-0.5 size-[18px] shrink-0 text-brand" />
              <span className="text-[15px] leading-[1.55] text-[#26408B]">
                Withholding tax is the fourth deduction. It follows the{" "}
                <Link
                  href="/government/bir/withholding-tax-table-philippines"
                  className="font-bold text-brand hover:underline"
                >
                  BIR withholding tax table
                </Link>{" "}
                and is applied to your salary after SSS, PhilHealth, and Pag-IBIG
                are deducted.
              </span>
            </div>
          </section>

          {/* Example */}
          <section className={CARD}>
            <h2 className={H2}>Example: a ₱35,000 monthly salary</h2>
            <p className="mt-[10px] text-[15px] text-[#5A6478]">
              Here is how the deductions stack up for a private employee earning
              ₱35,000 per month.
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
                    <span
                      className={`text-[15px] ${
                        isTotal || isSub ? "font-bold text-[#0E1525]" : "text-[#475069]"
                      }`}
                    >
                      {r.label}
                    </span>
                    <span
                      className={`font-display text-[15px] font-semibold tabular-nums ${
                        isTotal
                          ? "text-[#0B8270]"
                          : r.kind === "minus"
                            ? "text-[#C0392B]"
                            : "text-[#0E1525]"
                      }`}
                    >
                      {r.val}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-[14px] leading-[1.6] text-[#8A93A6]">
              Contribution amounts depend on the current SSS, PhilHealth, and
              Pag-IBIG schedules and may be rounded differently by your
              employer&apos;s payroll system.
            </p>
          </section>

          {/* Tips */}
          <section className={CARD}>
            <h2 className={H2}>Tips for managing your take-home pay</h2>
            <ul className="mt-5 space-y-[14px]">
              {tips.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[16px] leading-[1.55] text-[#344054]">
                  <ArrowRight className="mt-1 size-[18px] shrink-0 text-brand" />
                  {t}
                </li>
              ))}
            </ul>
          </section>

          {/* Disclaimer */}
          <div className="flex gap-3 rounded-[14px] border border-[#F0E2BE] bg-[#FFF8E8] p-5">
            <Info className="mt-0.5 size-5 shrink-0 text-[#C99A22]" />
            <p className="text-[15px] leading-[1.6] text-[#7A6320]">
              This calculator provides estimates for planning purposes only.
              Actual deductions depend on the current SSS, PhilHealth, and
              Pag-IBIG schedules, your exact salary bracket, taxable allowances,
              and your employer&apos;s payroll rules. Always check your official
              payslip.
            </p>
          </div>

          {/* FAQ */}
          <section className="pt-7">
            <FaqSection faqs={takeHomePayData.faqs} />
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
