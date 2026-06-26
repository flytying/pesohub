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
          This estimate deducts your SSS, PhilHealth, and Pag-IBIG employee
          shares and tax-exempt allowances to get taxable compensation, then
          applies the TRAIN Law table for your chosen pay frequency. For the
          official brackets, see the{" "}
          <Link
            href="/government/bir/withholding-tax-table-philippines"
            className="text-brand hover:underline"
          >
            BIR withholding tax table 2026
          </Link>
          .
        </p>

        {/* Note: Estimate */}
        <div className="mt-6 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
          <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
          <div>
            <h3 className="text-[16px] font-semibold leading-[22px] text-gray-500">
              How this estimate is computed
            </h3>
            <p className="mt-1 text-[16px] leading-[22px] text-gray-400">
              The calculator subtracts your SSS, PhilHealth, and Pag-IBIG
              employee shares (estimated automatically or entered manually) and
              any tax-exempt allowances, then applies the BIR table for your
              pay frequency.
            </p>
            <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
              Your actual payroll withholding may still differ due to employer
              rounding, supplementary compensation, and payroll-specific rules.
            </p>
          </div>
        </div>

        {/* Why Pay Frequency and Deductions Matter */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Why Pay Frequency and Deductions Matter
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Philippine income tax brackets are based on annual taxable income.
            Because payroll is processed monthly, semi-monthly, weekly, or
            daily, the BIR publishes a withholding table for each frequency so
            employers can deduct the right amount each pay period. This
            calculator annualizes your taxable compensation, applies the
            correct bracket, then splits the tax back across your pay frequency.
          </p>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Taxable compensation is your gross pay plus taxable allowances,
            minus your SSS, PhilHealth, and Pag-IBIG contributions and any
            tax-exempt allowances — which is why deductions are entered before
            the tax is computed.
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
                ₱35,000 Monthly Pay (contributions estimated)
              </h3>
            </div>
            <div className="px-6 py-4">
              <dl className="space-y-2.5 text-[16px] leading-[22px]">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Monthly gross pay</dt>
                  <dd className="font-mono tabular-nums text-gray-500">₱35,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">− SSS + PhilHealth + Pag-IBIG</dt>
                  <dd className="font-mono tabular-nums text-gray-500">₱2,825</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Monthly taxable compensation</dt>
                  <dd className="font-mono tabular-nums text-gray-500">₱32,175</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Annualized taxable income</dt>
                  <dd className="font-mono tabular-nums text-gray-500">₱386,100</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Matching bracket</dt>
                  <dd className="font-mono tabular-nums text-gray-500">₱250K – ₱400K</dd>
                </div>
                <div className="my-3 border-t border-dashed border-gray-200" />
                <div className="flex justify-between">
                  <dt className="text-gray-400">Estimated annual tax</dt>
                  <dd className="font-mono tabular-nums text-gray-500">₱20,415</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Effective rate (on taxable)</dt>
                  <dd className="font-mono tabular-nums text-gray-500">≈ 5.29%</dd>
                </div>
              </dl>
            </div>
            <div className="border-t border-dashed border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex justify-between text-[16px] leading-[22px]">
                <span className="font-semibold text-gray-500">Est. Monthly Withholding</span>
                <span className="font-mono tabular-nums font-bold text-brand">₱1,701/mo</span>
              </div>
            </div>
            <div className="border-t border-gray-100 px-6 py-3">
              <p className="text-[14px] text-gray-300">
                15% of excess over ₱250,000 = ₱20,415/yr ÷ 12. SSS share is
                approximate and varies with the current SSS table.
              </p>
            </div>
          </div>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            This example is for illustration only. Actual payroll withholding
            may differ depending on your exact contributions and employer
            payroll treatment.
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

        {/* Net Pay and Next Steps */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Net Pay and Next Steps
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            The calculator shows your net pay for the pay period after
            withholding tax and your SSS, PhilHealth, and Pag-IBIG
            contributions. For a dedicated monthly take-home breakdown, use the{" "}
            <Link
              href="/calculators/tax/take-home-pay-calculator-philippines"
              className="text-brand hover:underline"
            >
              Take-Home Pay Calculator
            </Link>
            , and to learn the rules behind the numbers, read{" "}
            <Link
              href="/guides/tax/how-withholding-tax-works-philippines"
              className="text-brand hover:underline"
            >
              how withholding tax works
            </Link>
            .
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
