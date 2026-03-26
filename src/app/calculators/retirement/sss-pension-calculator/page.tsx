import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Info,
  Calculator,
  Landmark,
  BookOpen,
  BarChart3,
  FileText,
  HelpCircle,
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
import { SSSPensionCalculator } from "@/components/calculators/sss-pension-calculator";
import { sssPensionData } from "@/data/calculators/sss-pension";

export const metadata: Metadata = generatePageMetadata({
  title: sssPensionData.metaTitle,
  description: sssPensionData.metaDescription,
  slug: sssPensionData.slug,
  updatedAt: sssPensionData.updatedAt,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "SSS Pension Calculator" },
];

const relatedPages = [
  {
    title: "SSS Contribution Table",
    href: "/government/sss/sss-contribution-guide",
    icon: FileText,
  },
  {
    title: "SSS Contribution Calculator",
    href: "/calculators/sss/sss-contribution-calculator-philippines",
    icon: BarChart3,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
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

export default function SSSPensionCalculatorPage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema(breadcrumbs)}
      />
      <JsonLd
        data={generateCalculatorSchema({
          title: sssPensionData.metaTitle,
          description: sssPensionData.metaDescription,
        })}
      />

      <PageHero
        title={sssPensionData.h1}
        description={sssPensionData.intro}
        badge={sssPensionData.updatedAt}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SSSPensionCalculator />

        {/* Formula Explanation */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            How Is Your SSS Pension Calculated?
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            {sssPensionData.formula.explanation}
          </p>
          <div className="mt-4 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <div>
              <p className="mb-2 text-[16px] font-semibold leading-[22px] text-gray-500">
                The Three SSS Pension Formulas:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                  <ArrowRight className="size-4 shrink-0 text-gray-300" />
                  <span><strong className="text-gray-500">Formula A:</strong> ₱300 +
                  20% of average MSC + 2% of average MSC for each CYS over 10</span>
                </li>
                <li className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                  <ArrowRight className="size-4 shrink-0 text-gray-300" />
                  <span><strong className="text-gray-500">Formula B:</strong> 40% of
                  average Monthly Salary Credit</span>
                </li>
                <li className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                  <ArrowRight className="size-4 shrink-0 text-gray-300" />
                  <span><strong className="text-gray-500">Minimum Pension:</strong>{" "}
                  ₱2,000 for 10-19 CYS, or ₱4,000 for 20+ CYS</span>
                </li>
              </ul>
              <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
                SSS automatically selects whichever formula produces the highest
                pension amount for you.
              </p>
            </div>
          </div>
        </section>

        {/* Worked Example */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Example Calculation
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            {sssPensionData.exampleCalculation.scenario}
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-dashed border-gray-200 bg-gray-50 px-6 py-4">
              <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                SSS Pension Estimate
              </h3>
            </div>
            <div className="px-6 py-4">
              <dl className="space-y-2.5 text-[16px] leading-[22px]">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Monthly Salary Credit</dt>
                  <dd className="font-mono tabular-nums text-gray-500">₱20,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Years of Contribution</dt>
                  <dd className="font-mono tabular-nums text-gray-500">25 years</dd>
                </div>
                <div className="my-3 border-t border-dashed border-gray-200" />
                <div className="flex justify-between">
                  <dt className="text-gray-400">Formula A</dt>
                  <dd className="font-mono tabular-nums text-gray-500">₱10,300</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Formula B</dt>
                  <dd className="font-mono tabular-nums text-gray-500">₱8,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Minimum Pension (20+ CYS)</dt>
                  <dd className="font-mono tabular-nums text-gray-500">₱4,000</dd>
                </div>
              </dl>
            </div>
            <div className="border-t border-dashed border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex justify-between text-[16px] leading-[22px]">
                <span className="font-semibold text-gray-500">Highest Pension (Formula A)</span>
                <span className="font-mono tabular-nums font-bold text-brand">₱10,300/mo</span>
              </div>
            </div>
            <div className="border-t border-gray-100 px-6 py-3">
              <p className="text-[14px] text-gray-300">
                Formula A: ₱300 + (20% x ₱20,000) + (2% x ₱20,000 x 15) = ₱10,300
              </p>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Tips for Maximizing Your SSS Pension
          </h2>
          <ul className="mt-4 space-y-3">
            {sssPensionData.tips.map((tip, i) => (
              <li key={i} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
                {tip}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={sssPensionData.faqs} />
        </div>

        {/* Related Tools and Reference Pages */}
        <section className="mt-16">
          <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
            Related tools and reference pages
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
