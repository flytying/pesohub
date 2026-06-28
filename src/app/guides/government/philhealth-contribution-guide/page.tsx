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

        containerClassName="max-w-[1240px] px-[clamp(20px,3vw,36px)]"
        variant="dark"
      />

      <div className="mx-auto max-w-[1240px] px-[clamp(20px,3vw,36px)] pb-20 pt-[clamp(20px,3vw,32px)]">
        {/* What Is PhilHealth Deduction on Payroll? */}
        <section className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            What Is PhilHealth Deduction on Payroll?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
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
              <p className="text-[16px] font-semibold leading-[1.6] text-gray-500">
                In simple terms:
              </p>
              <ul className="mt-3 space-y-3">
                {simpleTerms.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[16px] leading-[1.6] text-[#5A6478]">
                    <CheckCircle className="size-4 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Who Pays the PhilHealth Contribution? */}

        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Who Pays the PhilHealth Contribution?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
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
                className={`rounded-[16px] border-[1.5px] p-6 text-center ${
                  item.highlight
                    ? "border-brand bg-[#EAF0FF]"
                    : "border-[#EDF1F8] bg-[#F7F9FD]"
                }`}
              >
                <p className={`text-[11.5px] font-bold uppercase tracking-[.07em] ${
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
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            How PhilHealth Usually Appears on a Payslip
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            PhilHealth is usually one of the standard government payroll
            deductions shown together with SSS, Pag-IBIG, and withholding tax. It
            may appear as a separate line item on a payslip, and the amount shown
            is often the employee-side share only.
          </p>
          <ul className="mt-4 space-y-3">
            {payslipPatterns.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[1.6] text-[#5A6478]">
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Why PhilHealth Deduction Can Change */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Why PhilHealth Deduction Can Change
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            PhilHealth deduction may change when salary changes, when the
            contribution basis changes, or when official premium schedules are
            updated. This is why payroll users often need both a simple guide and a
            current contribution table.
          </p>
          <ul className="mt-4 space-y-3">
            {whyDeductionChanges.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[1.6] text-[#5A6478]">
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Where to Verify Your PhilHealth Deduction */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Where to Verify Your PhilHealth Deduction
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            If you want to confirm whether your PhilHealth deduction looks
            correct, the best next step is to compare it against the current
            PhilHealth contribution table or your employer&apos;s payroll basis.
          </p>
          <ul className="mt-4 space-y-3">
            {verifyNextSteps.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[1.6] text-[#5A6478]">
                <CheckCircle className="size-4 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* What This Guide Helps You Check */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            What This Guide Helps You Check
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            Use this page if you want to:
          </p>
          <ul className="mt-4 space-y-3">
            {whatThisHelps.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[1.6] text-[#5A6478]">
                <CheckCircle className="size-4 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </section>

      </div>

      <div className="mx-auto max-w-[1240px] px-[clamp(20px,3vw,36px)] pb-20">
        {/* What to Do Next */}
        <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-center text-[clamp(22px,2.6vw,28px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            What to Do Next
          </h2>
          <div className="mt-7 grid gap-6 sm:grid-cols-2 sm:divide-x sm:divide-[#DDE4F5]">
            <div className="px-2 text-center sm:px-8">
              <span className="mx-auto mb-3.5 flex size-[46px] items-center justify-center rounded-[13px] bg-[#EAF0FF] text-brand">
                <Heart className="size-[22px]" />
              </span>
              <h3 className="text-[17px] font-semibold text-[#0E1525]">
                Contribution Reference
              </h3>
              <p className="mx-auto mb-4 mt-1.5 text-[14.5px] leading-[1.55] text-[#5A6478]">
                See the contribution structure itself, including employee share,
                employer share, and salary basis.
              </p>
              <Link
                href="/government/philhealth/philhealth-contribution-table-philippines"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-[22px] py-[11px] text-[12.5px] font-bold uppercase tracking-[.04em] text-white transition-colors hover:bg-brand-dark"
              >
                View Table
              </Link>
            </div>
            <div className="px-2 text-center sm:px-8">
              <span className="mx-auto mb-3.5 flex size-[46px] items-center justify-center rounded-[13px] bg-[#EAF0FF] text-brand">
                <Calculator className="size-[22px]" />
              </span>
              <h3 className="text-[17px] font-semibold text-[#0E1525]">
                Full Payroll Estimate
              </h3>
              <p className="mx-auto mb-4 mt-1.5 text-[14.5px] leading-[1.55] text-[#5A6478]">
                See PhilHealth alongside SSS, Pag-IBIG, and withholding tax in
                one salary estimate.
              </p>
              <Link
                href="/calculators/tax/take-home-pay-calculator-philippines"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-[22px] py-[11px] text-[12.5px] font-bold uppercase tracking-[.04em] text-white transition-colors hover:bg-brand-dark"
              >
                Use Calculator
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={philhealthGuideFaqs} />
        </div>

        {/* Related Payroll Pages */}
        <section className="mt-6">
          <h2 className="mb-6 text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Related Payroll Pages
          </h2>
          <p className="mb-6 text-[16px] leading-[1.6] text-[#5A6478]">
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
