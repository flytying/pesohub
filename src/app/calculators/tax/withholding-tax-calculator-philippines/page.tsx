import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
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
import { WithholdingTaxCalculator } from "@/components/calculators/withholding-tax-calculator";
import { withholdingTaxData } from "@/data/calculators/withholding-tax";

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

const whyDifferent = [
  "mandatory deductions may reduce taxable income",
  "employer payroll settings may apply more specific tax treatment",
  "bonuses, allowances, or irregular pay may affect taxable income",
  "payroll systems may compute using more detailed assumptions",
  "this calculator is designed for estimation, not final payroll output",
];

const relatedPages = [
  {
    title: "Withholding Tax Table 2026",
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
    icon: Calculator,
  },
  {
    title: "Calculators Hub",
    href: "/calculators",
    icon: BarChart3,
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

      <PageHero
        title={withholdingTaxData.h1}
        description={withholdingTaxData.intro}
        badge={withholdingTaxData.updatedAt}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <WithholdingTaxCalculator />
        </div>

        {/* Result support text */}
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          This estimate is based on your gross monthly salary annualized over
          12 months using the current Philippine income tax brackets.
        </p>

        {/* Important: Simplified Estimate Warning */}
        <div className="mt-6 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
          <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
          <div>
            <h3 className="text-[16px] font-semibold leading-[22px] text-gray-500">
              Important: This Is a Simplified Estimate
            </h3>
            <p className="mt-1 text-[16px] leading-[22px] text-gray-400">
              This calculator uses gross monthly salary multiplied by 12 to
              estimate annual taxable income. It does not yet subtract
              mandatory contributions such as SSS, PhilHealth, and Pag-IBIG
              before computing tax.
            </p>
            <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
              Because of that, your actual payroll withholding may be lower
              than this estimate.
            </p>
          </div>
        </div>

        {/* Why Monthly Salary Is Converted to Annual Taxable Income */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Why Monthly Salary Is Converted to Annual Taxable Income
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Philippine income tax brackets are based on annual taxable income,
            not just one month of pay. That is why this calculator first
            annualizes your gross salary, then applies the correct bracket,
            then converts the result back into a monthly estimate.
          </p>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            This makes it easier to estimate monthly withholding using the
            annual tax framework.
          </p>
        </section>

        {/* Current Income Tax Brackets */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Current Income Tax Brackets in the Philippines
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            These are the annual income tax brackets used for the estimate.
          </p>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Annual taxable income up to ₱250,000 is generally exempt from
            income tax under the current structure.
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-500">
                    Annual Taxable Income
                  </th>
                  <th className="px-4 py-3 text-center text-[14px] font-semibold text-gray-500">
                    Tax Rate
                  </th>
                  <th className="px-4 py-3 text-left text-[14px] font-semibold text-gray-500">
                    Base Tax + Marginal Rule
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="px-4 py-2.5 text-gray-400">
                    Up to ₱250,000
                  </td>
                  <td className="px-4 py-2.5 text-center text-gray-400">
                    0%
                  </td>
                  <td className="px-4 py-2.5 text-gray-400">₱0</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="px-4 py-2.5 text-gray-400">
                    ₱250,001 – ₱400,000
                  </td>
                  <td className="px-4 py-2.5 text-center text-gray-400">
                    15%
                  </td>
                  <td className="px-4 py-2.5 text-gray-400">
                    15% of excess over ₱250,000
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="px-4 py-2.5 text-gray-400">
                    ₱400,001 – ₱800,000
                  </td>
                  <td className="px-4 py-2.5 text-center text-gray-400">
                    20%
                  </td>
                  <td className="px-4 py-2.5 text-gray-400">
                    ₱22,500 + 20% of excess over ₱400,000
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="px-4 py-2.5 text-gray-400">
                    ₱800,001 – ₱2,000,000
                  </td>
                  <td className="px-4 py-2.5 text-center text-gray-400">
                    25%
                  </td>
                  <td className="px-4 py-2.5 text-gray-400">
                    ₱102,500 + 25% of excess over ₱800,000
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="px-4 py-2.5 text-gray-400">
                    ₱2,000,001 – ₱8,000,000
                  </td>
                  <td className="px-4 py-2.5 text-center text-gray-400">
                    30%
                  </td>
                  <td className="px-4 py-2.5 text-gray-400">
                    ₱402,500 + 30% of excess over ₱2,000,000
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="px-4 py-2.5 text-gray-400">
                    Over ₱8,000,000
                  </td>
                  <td className="px-4 py-2.5 text-center text-gray-400">
                    35%
                  </td>
                  <td className="px-4 py-2.5 text-gray-400">
                    ₱2,202,500 + 35% of excess over ₱8,000,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Source: TRAIN Law (RA 10963), effective January 1, 2023.
          </p>
        </section>

        {/* Worked Example */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Example: How Withholding Tax Is Estimated From Monthly Salary
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Here is a simple example to show how the estimate works in
            practice.
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-dashed border-gray-200 bg-gray-50 px-6 py-4">
              <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                ₱35,000 Monthly Gross Salary
              </h3>
            </div>
            <div className="px-6 py-4">
              <dl className="space-y-2.5 text-[16px] leading-[22px]">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Monthly gross salary</dt>
                  <dd className="font-mono tabular-nums text-gray-500">₱35,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Annualized income</dt>
                  <dd className="font-mono tabular-nums text-gray-500">₱420,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Matching bracket</dt>
                  <dd className="font-mono tabular-nums text-gray-500">₱400K – ₱800K</dd>
                </div>
                <div className="my-3 border-t border-dashed border-gray-200" />
                <div className="flex justify-between">
                  <dt className="text-gray-400">Estimated annual tax</dt>
                  <dd className="font-mono tabular-nums text-gray-500">₱26,500</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Effective tax rate</dt>
                  <dd className="font-mono tabular-nums text-gray-500">≈ 6.31%</dd>
                </div>
              </dl>
            </div>
            <div className="border-t border-dashed border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex justify-between text-[16px] leading-[22px]">
                <span className="font-semibold text-gray-500">Est. Monthly Withholding</span>
                <span className="font-mono tabular-nums font-bold text-brand">₱2,208/mo</span>
              </div>
            </div>
            <div className="border-t border-gray-100 px-6 py-3">
              <p className="text-[14px] text-gray-300">
                ₱22,500 + 20% of excess over ₱400,000 = ₱26,500/yr ÷ 12
              </p>
            </div>
          </div>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            This example is for illustration only. Actual payroll withholding
            may differ depending on deductions and employer payroll treatment.
          </p>
        </section>

        {/* Why Your Actual Payroll Withholding May Be Different */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Why Your Actual Payroll Withholding May Be Different
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Your actual withholding tax in payroll may differ from this
            estimate for several reasons.
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

        {/* Tax-Only Take-Home Pay vs Full Net Pay */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Tax-Only Take-Home Pay vs Full Net Pay
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            This page estimates take-home pay after income tax only. It does
            not fully calculate your final payroll net pay after all mandatory
            deductions.
          </p>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            If you want a broader estimate of what may actually reach your
            payslip or bank account, use the{" "}
            <Link
              href="/calculators/tax/take-home-pay-calculator-philippines"
              className="text-brand hover:underline"
            >
              Take-Home Pay Calculator
            </Link>{" "}
            as your next step.
          </p>
        </section>

        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={withholdingTaxData.faqs} />
        </div>

        {/* Related Tax Pages and Tools */}
        <section className="mt-16">
          <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
            Related Tax Pages and Tools
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
