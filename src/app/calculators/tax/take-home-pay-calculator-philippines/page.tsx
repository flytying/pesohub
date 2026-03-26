import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  X,
  Info,
  HelpCircle,
  Calculator,
  Landmark,
  BookOpen,
  BarChart3,
  FileText,
  TriangleAlert,
} from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateCalculatorSchema,
} from "@/lib/schema-markup";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { TakeHomePayCalculator } from "@/components/calculators/take-home-pay-calculator";
import { takeHomePayData } from "@/data/calculators/take-home-pay";

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

const grossToNetBreakdown = [
  "Gross Monthly Salary",
  "Less: Withholding Tax",
  "Less: SSS Employee Share",
  "Less: PhilHealth Employee Share",
  "Less: Pag-IBIG Employee Share",
  "Equals: Estimated Take-Home Pay",
];

const whyGrossDifferent = [
  "withholding tax reduces pay based on taxable income",
  "SSS is a mandatory employee contribution",
  "PhilHealth is a mandatory health insurance contribution",
  "Pag-IBIG is a mandatory savings contribution",
  "total deductions reduce the amount that becomes net pay",
];

const toolIncludes = [
  "estimated withholding tax",
  "estimated SSS employee share",
  "estimated PhilHealth employee share",
  "estimated Pag-IBIG employee share",
  "total deductions",
  "estimated monthly take-home pay",
];

const toolDoesNotInclude = [
  "employer-specific deductions",
  "salary loans",
  "allowances",
  "overtime",
  "bonuses",
  "commissions",
  "voluntary deductions",
  "special payroll adjustments",
];

const whyPayslipDifferent = [
  "employer payroll systems may use more detailed inputs",
  "taxable income may differ from the gross salary used in a simple estimate",
  "loans or company-specific deductions may be applied",
  "bonuses or variable pay may affect deductions",
  "payroll timing, rounding, or special treatments may vary",
];

const checkOneDeduction = [
  {
    title: "Withholding Tax Calculator",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "SSS Contribution Calculator",
    href: "/calculators/sss/sss-contribution-calculator-philippines",
    icon: BarChart3,
  },
  {
    title: "SSS Contribution Table",
    href: "/government/sss/sss-contribution-guide",
    icon: FileText,
  },
  {
    title: "Withholding Tax Table",
    href: "/government/bir/withholding-tax-table-philippines",
    icon: FileText,
  },
];

const relatedPages = [
  {
    title: "Withholding Tax Calculator",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "SSS Contribution Calculator",
    href: "/calculators/sss/sss-contribution-calculator-philippines",
    icon: BarChart3,
  },
  {
    title: "SSS Contribution Table",
    href: "/government/sss/sss-contribution-guide",
    icon: FileText,
  },
  {
    title: "Withholding Tax Table",
    href: "/government/bir/withholding-tax-table-philippines",
    icon: FileText,
  },
  {
    title: "Guides Hub",
    href: "/guides",
    icon: BookOpen,
  },
  {
    title: "Calculators Hub",
    href: "/calculators",
    icon: Landmark,
  },
];

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

      <PageHero
        title={takeHomePayData.h1}
        description={takeHomePayData.intro}
        badge={takeHomePayData.updatedAt}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <TakeHomePayCalculator />
        </div>

        {/* Result support text */}
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          This estimate shows standard monthly deductions based on the
          assumptions currently used by the calculator.
        </p>

        {/* How Gross Salary Turns Into Take-Home Pay */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            How Gross Salary Turns Into Take-Home Pay
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Your take-home pay is your salary after common deductions are
            subtracted. This breakdown helps show where the difference between
            gross pay and net pay comes from.
          </p>
          <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6">
            <div className="space-y-2 text-[16px] leading-[22px]">
              {grossToNetBreakdown.map((item, i) => (
                <div
                  key={item}
                  className={`flex items-center gap-2 ${
                    i === 0
                      ? "font-medium text-gray-500"
                      : i === grossToNetBreakdown.length - 1
                        ? "border-t border-gray-200 pt-2 font-semibold text-brand"
                        : "text-gray-400"
                  }`}
                >
                  {i > 0 && i < grossToNetBreakdown.length - 1 && (
                    <span className="text-red-500">−</span>
                  )}
                  {i === grossToNetBreakdown.length - 1 && (
                    <span className="text-brand">=</span>
                  )}
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            This is the core paycheck breakdown most employees want to
            understand at a glance.
          </p>
        </section>

        {/* Why Your Gross Pay Is Different From Your Net Pay */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Why Your Gross Pay Is Different From Your Net Pay
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Gross pay is your salary before deductions. Net pay, or take-home
            pay, is what remains after common mandatory deductions are taken
            out. Even if your gross salary stays the same, your estimated
            take-home pay will be lower because payroll deductions reduce the
            amount you actually receive.
          </p>
          <ul className="mt-4 space-y-3">
            {whyGrossDifferent.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* What This Calculator Includes and Does Not Include */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            What This Calculator Includes and Does Not Include
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            This estimate is designed to show the most common payroll
            deductions used in a standard salary scenario. It does not
            replace your employer&apos;s actual payroll system or full payslip.
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
          <div className="mt-4 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <p className="text-[16px] leading-[22px] text-gray-400">
              Because of these exclusions, your actual payslip may differ from
              the estimate.
            </p>
          </div>
        </section>

        {/* Why Your Actual Payslip May Be Different */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Why Your Actual Payslip May Be Different
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Your actual payslip may differ from this estimate for several
            reasons.
          </p>
          <ul className="mt-4 space-y-3">
            {whyPayslipDifferent.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Want to Check One Deduction at a Time? */}
        <section className="mt-16">
          <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
            Want to Check One Deduction at a Time?
          </h2>
          <p className="mb-6 text-[16px] leading-[22px] text-gray-400">
            If you want to understand one payroll deduction more closely, use
            the matching calculator or reference page below.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {checkOneDeduction.map((page) => {
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

        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={takeHomePayData.faqs} />
        </div>

        {/* Related Payroll Tools and Guides */}
        <section className="mt-16">
          <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
            Related Payroll Tools and Guides
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
