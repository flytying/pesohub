import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  X,
  Info,
  Calculator,
  BookOpen,
  BarChart3,
  Landmark,
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
import { ThirteenthMonthCalculator } from "@/components/calculators/thirteenth-month-calculator";
import { thirteenthMonthData } from "@/data/calculators/thirteenth-month";

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

const usuallyIncluded = [
  "regular basic salary",
  "fixed salary actually earned during the covered months",
];

const usuallyExcluded = [
  "overtime pay",
  "holiday pay",
  "night shift differential",
  "allowances",
  "commissions that are not part of basic salary",
  "non-cash benefits",
];

const toolIncludes = [
  "a basic salary-based estimate",
  "full-year and prorated scenarios",
  "calendar-year computation illustration",
  "simple term comparison support",
];

const toolDoesNotInclude = [
  "automatic classification of every payroll item",
  "company payroll rules or legal advice",
  "determination of disputed pay items",
];

const whyDifferent = [
  "your salary changed during the year",
  "payroll items were classified differently",
  "your employer already provides a 13th month pay equivalent",
  "case law around PD 851 may affect how compliance is measured",
  "additional company-specific compensation rules apply",
];

const relatedPages = [
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
  },
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

      <PageHero
        title={thirteenthMonthData.h1}
        description={thirteenthMonthData.intro}
        badge={thirteenthMonthData.updatedAt}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <ThirteenthMonthCalculator />
        </div>

        {/* Result support text */}
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          This estimate follows the standard rule that 13th month pay is based
          on 1/12 of the basic salary earned within the calendar year.
        </p>

        {/* Full-Year vs Prorated 13th Month Pay */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Full-Year vs Prorated 13th Month Pay
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            If you worked the full calendar year, the estimate is usually based
            on your total basic salary earned during the year divided by 12. If
            you did not work the full year, the amount is usually prorated based
            on the basic salary earned during the months counted for the
            computation.
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="text-[16px] font-semibold leading-[22px] text-gray-500">
                Full-Year Estimate
              </p>
              <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
                For employees who worked the full calendar year. Usually equals
                one month&apos;s basic salary.
              </p>
              <p className="mt-3 font-mono text-sm text-gray-400">
                ₱24,000 x 12 / 12 = ₱24,000
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="text-[16px] font-semibold leading-[22px] text-gray-500">
                Prorated Estimate
              </p>
              <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
                For employees who started later, resigned earlier, or had
                incomplete service during the year.
              </p>
              <p className="mt-3 font-mono text-sm text-gray-400">
                ₱24,000 x 8 / 12 = ₱16,000
              </p>
            </div>
          </div>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Both scenarios still use basic salary as the base. This is why the
            months worked matter when estimating 13th month pay.
          </p>
        </section>

        {/* How 13th Month Pay Is Computed */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            How 13th Month Pay Is Computed
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            The standard idea is simple: add the employee&apos;s basic salary
            earned within the calendar year, then divide by 12. For a fixed
            monthly basic salary, this often becomes monthly basic salary
            multiplied by months worked, then divided by 12.
          </p>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            PD 851 and its implementing rule define 13th month pay as
            one-twelfth of the basic salary earned during the calendar year.
          </p>
          <div className="mt-4 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <div>
              <p className="text-[16px] font-semibold leading-[22px] text-gray-500">Formula</p>
              <p className="mt-2 font-mono text-sm text-brand">
                13th Month Pay = Total Basic Salary Earned During the Year / 12
              </p>
              <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
                If monthly basic salary stayed the same, the estimate is usually
                straightforward.
              </p>
            </div>
          </div>
        </section>

        {/* What Is Included and Excluded */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            What Is Included and Excluded in the Computation
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            The most important rule to understand is that 13th month pay is
            based on basic salary, not all forms of pay. Philippine rulings on
            PD 851 consistently treat basic salary as the computation base.
          </p>

          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
              <h3 className="text-[16px] font-semibold leading-[22px] text-emerald-800">
                Usually Included
              </h3>
              <ul className="mt-4 space-y-3">
                {usuallyIncluded.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-emerald-700">
                    <Check className="size-4 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
              <h3 className="text-[16px] font-semibold leading-[22px] text-red-800">
                Usually Excluded
              </h3>
              <ul className="mt-4 space-y-3">
                {usuallyExcluded.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-red-700">
                    <X className="size-4 shrink-0 text-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            If you are unsure whether a pay item counts, check your company
            payroll policy or labor guidance before relying on the estimate.
          </p>
        </section>

        {/* Sample 13th Month Pay Computations */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Sample 13th Month Pay Computations
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            These examples help show how the estimate works for common
            scenarios.
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Full-Year Example */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">Full-Year Example</h3>
              <dl className="mt-3 space-y-2 text-[16px] leading-[22px]">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Monthly Basic Salary</dt>
                  <dd className="font-medium text-gray-500">₱24,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Months Worked</dt>
                  <dd className="font-medium text-gray-500">12</dd>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <p className="text-sm text-gray-400">
                    ₱24,000 x 12 / 12
                  </p>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <dt className="text-gray-400">Estimated 13th Month Pay</dt>
                  <dd className="font-semibold text-brand">₱24,000</dd>
                </div>
              </dl>
            </div>

            {/* Prorated Example */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">Prorated Example</h3>
              <dl className="mt-3 space-y-2 text-[16px] leading-[22px]">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Monthly Basic Salary</dt>
                  <dd className="font-medium text-gray-500">₱24,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Months Worked</dt>
                  <dd className="font-medium text-gray-500">8</dd>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <p className="text-sm text-gray-400">
                    ₱24,000 x 8 / 12
                  </p>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <dt className="text-gray-400">Estimated 13th Month Pay</dt>
                  <dd className="font-semibold text-brand">₱16,000</dd>
                </div>
              </dl>
            </div>

            {/* Changing Salary Note */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">Changing Salary</h3>
              <p className="mt-3 text-[16px] leading-[22px] text-gray-400">
                If your salary changed during the year, the safer approach is
                to total the actual basic salary earned during each covered
                month, then divide the annual total by 12.
              </p>
              <p className="mt-3 text-[16px] leading-[22px] text-gray-400">
                This calculator uses a fixed monthly salary for simplicity.
              </p>
            </div>
          </div>
        </section>

        {/* What This Calculator Includes and Does Not Include */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            What This Calculator Includes and Does Not Include
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            This page is designed for a simple 13th month pay estimate and does
            not replace payroll review.
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
              This estimate focuses on basic salary and may not reflect every
              payroll-specific classification. Always check your company payroll
              policy for final amounts.
            </p>
          </div>
        </section>

        {/* Why Your Actual 13th Month Pay May Be Different */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Why Your Actual 13th Month Pay May Be Different
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Your actual 13th month pay may differ from a simple estimate for
            several reasons.
          </p>
          <ul className="mt-4 space-y-3">
            {whyDifferent.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={thirteenthMonthData.faqs} />
        </div>

        {/* Related Payroll Pages and Guides */}
        <section className="mt-16">
          <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
            Related payroll pages and guides
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
