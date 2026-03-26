import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  X,
  Info,
  Users,
  Briefcase,
  UserCheck,
  Heart,
  Globe,
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
import { SSSContributionCalculator } from "@/components/calculators/sss-contribution-calculator";
import { sssContributionCalcData } from "@/data/calculators/sss-contribution";

export const metadata: Metadata = generatePageMetadata({
  title: sssContributionCalcData.metaTitle,
  description: sssContributionCalcData.metaDescription,
  slug: sssContributionCalcData.slug,
  updatedAt: sssContributionCalcData.updatedAt,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "SSS Contribution Calculator" },
];

const memberTypes = [
  {
    icon: Briefcase,
    title: "Employee",
    description:
      "For employed members, the estimate may show both employee share and employer share.",
  },
  {
    icon: Users,
    title: "Self-Employed",
    description:
      "For self-employed members, the estimate usually depends on declared monthly earnings and may not include an employer share.",
  },
  {
    icon: UserCheck,
    title: "Voluntary",
    description:
      "For voluntary members, the contribution is usually based on the selected contribution basis under the current schedule.",
  },
  {
    icon: Heart,
    title: "Non-Working Spouse",
    description:
      "For non-working spouses, contribution treatment may follow separate eligibility or basis rules depending on the applicable SSS classification.",
  },
  {
    icon: Globe,
    title: "OFW",
    description:
      "For OFWs, contribution rules may follow a separate contribution basis from standard local employee payroll computation.",
  },
];

const toolIncludes = [
  "SSS contribution estimate",
  "Employee share and employer share depending on member type",
];

const toolDoesNotInclude = [
  "Withholding tax",
  "PhilHealth or Pag-IBIG deductions",
  "Full net pay or take-home pay",
  "Official SSS table replacement or payroll system",
];

const whyDifferent = [
  "official SSS schedules may be updated",
  "member classification may be different from the one selected",
  "payroll setup may use more detailed assumptions",
  "compensation basis may be treated differently",
  "reference schedule changes may not yet be reflected in older estimates",
];

const relatedPages = [
  {
    title: "SSS Contribution Table",
    href: "/government/sss/sss-contribution-guide",
    icon: FileText,
  },
  {
    title: "SSS Guide",
    href: "/guides/sss/how-to-compute-sss-pension",
    icon: BookOpen,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Withholding Tax Calculator",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    icon: BarChart3,
  },
  {
    title: "Calculators Hub",
    href: "/calculators",
    icon: Landmark,
  },
];

export default function SSSContributionCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: sssContributionCalcData.metaTitle,
          description: sssContributionCalcData.metaDescription,
        })}
      />

      <PageHero
        title={sssContributionCalcData.h1}
        description={sssContributionCalcData.intro}
        badge={sssContributionCalcData.updatedAt}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <SSSContributionCalculator />
        </div>

        {/* Result support text */}
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          This estimate is based on the member type and contribution schedule
          assumptions currently used by the calculator.
        </p>

        {/* Important note */}
        <div className="mt-6 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
          <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
          <div>
            <h3 className="text-[16px] font-semibold leading-[22px] text-gray-500">
              Important
            </h3>
            <p className="mt-1 text-[16px] leading-[22px] text-gray-400">
              If the official SSS schedule changes, the final contribution may
              differ from this estimate. Always verify against the latest
              official SSS contribution table.
            </p>
          </div>
        </div>

        {/* What Is Monthly Salary Credit? */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            What Is Monthly Salary Credit?
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Monthly Salary Credit, or MSC, is the salary band used by SSS to
            determine the contribution amount. Your actual salary is mapped to
            a contribution bracket, and the contribution is computed using the
            MSC assigned to that bracket.
          </p>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            You do not need to compute MSC manually, but understanding it
            helps explain why contributions change in steps instead of changing
            by small amounts every time salary changes.
          </p>
        </section>

        {/* What This Calculator Includes and Does Not Include */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            What This Calculator Includes and Does Not Include
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            This page estimates SSS contribution only. It does not calculate
            your full net pay, total deductions, or income tax.
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
              If you want a broader estimate of payroll deductions, use the{" "}
              <Link
                href="/calculators/tax/take-home-pay-calculator-philippines"
                className="text-brand hover:underline"
              >
                Take-Home Pay Calculator
              </Link>{" "}
              next.
            </p>
          </div>
        </section>

        {/* Why Your Actual SSS Contribution May Be Different */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Why Your Actual SSS Contribution May Be Different
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Your actual contribution may differ from this estimate for several
            reasons.
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

        {/* How Member Type Affects the Estimate */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            How Member Type Affects the Estimate
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            SSS contribution schedules are not interpreted the same way for
            every member classification. That is why choosing the correct
            member type matters before relying on the result.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {memberTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div key={type.title} className="rounded-xl border border-gray-200 bg-white p-6">
                  <div className="flex size-14 items-center justify-center rounded-full bg-gray-50 text-brand">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-4 text-[20px] font-semibold leading-[26px] text-gray-500">
                    {type.title}
                  </h3>
                  <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
                    {type.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={sssContributionCalcData.faqs} />
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
