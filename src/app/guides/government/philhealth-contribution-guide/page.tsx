import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle,
  BookOpen,
  Shield,
  Heart,
  Home,
  Info,
  TriangleAlert,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
import { SourceCitation } from "@/components/shared/source-citation";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema-markup";
import { GOVERNMENT_DISCLAIMER } from "@/lib/constants";
import {
  philhealthGuideMeta,
  payslipPatterns,
  whyDeductionChanges,
  verifyNextSteps,
  whatThisHelps,
  philhealthGuideFaqs,
  PHILHEALTH_GUIDE_UPDATED_AT,
} from "@/data/guides/philhealth-guide";

export const metadata = generatePageMetadata({
  title: philhealthGuideMeta.metaTitle,
  description: philhealthGuideMeta.metaDescription,
  slug: philhealthGuideMeta.slug,
  updatedAt: PHILHEALTH_GUIDE_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Guides", href: "/guides" },
  { label: "PhilHealth Contribution Guide" },
];

const simpleTerms = [
  "It is a payroll deduction related to PhilHealth contribution",
  "The employee usually pays a share through salary deduction",
  "The employer usually pays a separate share",
  "The full premium is larger than the employee-side payslip deduction",
];

const contributionSplit = [
  {
    label: "Employee Share",
    description: "Deducted from salary",
    note: "Usually shown on payslip",
    highlight: true,
  },
  {
    label: "Employer Share",
    description: "Paid separately",
    note: "Not usually visible on payslip",
    highlight: false,
  },
  {
    label: "Total Premium",
    description: "Sum of both shares",
    note: "Full contribution to PhilHealth",
    highlight: false,
  },
];

const relatedPages = [
  {
    title: "PhilHealth Contribution Table",
    href: "/government/philhealth/philhealth-contribution-table-philippines",
    icon: Heart,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Withholding Tax Guide",
    href: "/guides/tax/how-withholding-tax-works-philippines",
    icon: BookOpen,
  },
  {
    title: "Pag-IBIG Contribution Table",
    href: "/government/pag-ibig/pag-ibig-contribution-table-philippines",
    icon: Home,
  },
  {
    title: "SSS Contribution Table",
    href: "/government/sss/sss-contribution-guide",
    icon: Shield,
  },
];

export default function PhilHealthContributionGuidePage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: philhealthGuideMeta.metaTitle,
          description: philhealthGuideMeta.metaDescription,
          updatedAt: PHILHEALTH_GUIDE_UPDATED_AT,
          slug: philhealthGuideMeta.slug,
        })}
      />

      <PageHero
        title={philhealthGuideMeta.title}
        description={philhealthGuideMeta.directAnswer}
        badge={PHILHEALTH_GUIDE_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* What Is PhilHealth Deduction on Payroll? */}
        <section>
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            What Is PhilHealth Deduction on Payroll?
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            PhilHealth deduction is the employee-side share of the monthly
            PhilHealth premium that may be taken from salary through payroll. For
            employed members, the total premium is commonly split between employee
            and employer, so the deduction you see on your payslip is often only
            one part of the full contribution.
          </p>

          {/* In simple terms */}
          <div className="mt-6 flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-6">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <div>
              <p className="text-[16px] font-semibold leading-[22px] text-gray-500">
                In simple terms:
              </p>
              <ul className="mt-3 space-y-3">
                {simpleTerms.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                    <CheckCircle className="size-4 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Who Pays the PhilHealth Contribution? */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Who Pays the PhilHealth Contribution?
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            One of the most common points of confusion is whether the deduction on
            the payslip is the full PhilHealth contribution or only the employee
            portion. This is why the amount on your payslip may be lower than the
            full monthly premium shown in the contribution table.
          </p>

          {/* Visual split */}
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {contributionSplit.map((item) => (
              <div
                key={item.label}
                className={`rounded-xl border p-6 text-center ${
                  item.highlight
                    ? "border-brand/20 bg-brand/5"
                    : "border-gray-200 bg-white"
                }`}
              >
                <p className={`text-[14px] font-medium uppercase tracking-wide ${
                  item.highlight ? "text-brand" : "text-gray-400"
                }`}>
                  {item.label}
                </p>
                <p className="mt-2 text-[20px] font-semibold leading-[26px] text-gray-500">
                  {item.description}
                </p>
                <p className="mt-1 text-[14px] text-gray-400">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How PhilHealth Usually Appears on a Payslip */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            How PhilHealth Usually Appears on a Payslip
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            PhilHealth is usually one of the standard government payroll
            deductions shown together with SSS, Pag-IBIG, and withholding tax. It
            may appear as a separate line item on a payslip, and the amount shown
            is often the employee-side share only.
          </p>
          <ul className="mt-4 space-y-3">
            {payslipPatterns.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Why PhilHealth Deduction Can Change */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Why PhilHealth Deduction Can Change
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            PhilHealth deduction may change when salary changes, when the
            contribution basis changes, or when official premium schedules are
            updated. This is why payroll users often need both a simple guide and a
            current contribution table.
          </p>
          <ul className="mt-4 space-y-3">
            {whyDeductionChanges.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Where to Verify Your PhilHealth Deduction */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Where to Verify Your PhilHealth Deduction
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            If you want to confirm whether your PhilHealth deduction looks
            correct, the best next step is to compare it against the current
            PhilHealth contribution table or your employer&apos;s payroll basis.
          </p>
          <ul className="mt-4 space-y-3">
            {verifyNextSteps.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                <CheckCircle className="size-4 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* What This Guide Helps You Check */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            What This Guide Helps You Check
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Use this page if you want to:
          </p>
          <ul className="mt-4 space-y-3">
            {whatThisHelps.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                <CheckCircle className="size-4 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </section>

      </div>

      {/* What to Do Next */}
      <section className="bg-surface-tertiary py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-[32px] font-medium leading-[48px] text-gray-500">
            What to Do Next
          </h2>
          <div className="mt-10 grid divide-y divide-gray-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <div className="flex flex-col items-center px-8 py-6 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-gray-50 text-brand">
                <Heart className="size-6" />
              </div>
              <h3 className="mt-4 text-[20px] font-semibold leading-[26px] text-gray-500">
                Contribution Reference
              </h3>
              <p className="mt-2 flex-1 text-[16px] leading-[22px] text-gray-400">
                See the contribution structure itself, including employee share,
                employer share, and salary basis.
              </p>
              <Link
                href="/government/philhealth/philhealth-contribution-table-philippines"
                className="mt-6 inline-block rounded-full bg-brand px-6 py-3 text-[14px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
              >
                View Table
              </Link>
            </div>
            <div className="flex flex-col items-center px-8 py-6 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-gray-50 text-brand">
                <Calculator className="size-6" />
              </div>
              <h3 className="mt-4 text-[20px] font-semibold leading-[26px] text-gray-500">
                Full Payroll Estimate
              </h3>
              <p className="mt-2 flex-1 text-[16px] leading-[22px] text-gray-400">
                See PhilHealth alongside SSS, Pag-IBIG, and withholding tax in
                one salary estimate.
              </p>
              <Link
                href="/calculators/tax/take-home-pay-calculator-philippines"
                className="mt-6 inline-block rounded-full bg-brand px-6 py-3 text-[14px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
              >
                Use Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-0 pb-20 sm:px-6 lg:px-8">
        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={philhealthGuideFaqs} />
        </div>

        {/* Related Payroll Pages */}
        <section className="mt-16">
          <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
            Related Payroll Pages
          </h2>
          <p className="mb-6 text-[16px] leading-[22px] text-gray-400">
            After reading this guide, you may also want to review these related
            pages.
          </p>
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

        {/* Source Citation */}
        <div className="mt-16">
          <SourceCitation
            source="PhilHealth — Circular No. 2019-0009, PhilHealth Premium Contribution Schedule"
            sourceUrl="https://www.philhealth.gov.ph/"
            updatedAt={PHILHEALTH_GUIDE_UPDATED_AT}
            reviewCadence="Every 90 days"
          />
        </div>

        {/* Disclaimer */}
        <div className="mt-8">
          <DisclaimerBox text={GOVERNMENT_DISCLAIMER} />
        </div>
      </div>
    </>
  );
}
