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
import { GuideCtaCard } from "@/components/guides/guide-cta-card";
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
        {/* What is PhilHealth deduction on payroll? */}
        <section className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            What is PhilHealth deduction on payroll?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            PhilHealth deduction is the employee-side share of the monthly
            PhilHealth premium that may be taken from salary through payroll. For
            employed members, the total premium is commonly split between employee
            and employer, so the deduction you see on your payslip is often only
            one part of the full contribution.
          </p>

          {/* In simple terms */}
          <div className="mt-6 rounded-[16px] border border-[#F6E2B0] bg-[#FFF8E8] px-5 py-[18px]">
            <div className="mb-3 flex items-center gap-[9px]">
              <TriangleAlert className="size-[17px] shrink-0 text-[#C99A22]" />
              <span className="text-[15px] font-bold text-[#7A5B12]">
                In simple terms:
              </span>
            </div>
            <ul className="space-y-[11px]">
              {simpleTerms.map((item) => (
                <li key={item} className="flex items-start gap-[11px]">
                  <CheckCircle className="mt-0.5 size-[17px] shrink-0 text-[#C99A22]" />
                  <span className="text-[15px] leading-[1.5] text-[#5C4A1A]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Who pays the PhilHealth contribution? */}

        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Who pays the PhilHealth contribution?
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
                  item.highlight ? "text-brand" : "text-[#6B7488]"
                }`}>
                  {item.label}
                </p>
                <p className="mt-[7px] text-[17px] font-semibold text-[#0E1525]">
                  {item.description}
                </p>
                <p className="mt-[5px] text-[13.5px] leading-[1.45] text-[#6B7488]">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How PhilHealth usually appears on a payslip */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            How PhilHealth usually appears on a payslip
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            PhilHealth is usually one of the standard government payroll
            deductions shown together with SSS, Pag-IBIG, and withholding tax. It
            may appear as a separate line item on a payslip, and the amount shown
            is often the employee-side share only.
          </p>
          <ul className="mt-4 space-y-3">
            {payslipPatterns.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[16px] leading-[1.6] text-[#344054]">
                <ArrowRight className="mt-1 size-4 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Why PhilHealth deduction can change */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Why PhilHealth deduction can change
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            PhilHealth deduction may change when salary changes, when the
            contribution basis changes, or when official premium schedules are
            updated. This is why payroll users often need both a simple guide and a
            current contribution table.
          </p>
          <ul className="mt-4 space-y-3">
            {whyDeductionChanges.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[16px] leading-[1.6] text-[#344054]">
                <ArrowRight className="mt-1 size-4 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Where to verify your PhilHealth deduction */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Where to verify your PhilHealth deduction
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

        {/* What this guide helps you check */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            What this guide helps you check
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

      <div className="mx-auto max-w-[1240px] px-[clamp(20px,3vw,36px)]">
        {/* Calculator CTA */}
        <GuideCtaCard
          title="Want to See PhilHealth in Your Full Take-Home Pay?"
          description="Use the Take-Home Pay Calculator to see PhilHealth alongside SSS, Pag-IBIG, and withholding tax in one salary estimate."
          href="/calculators/tax/take-home-pay-calculator-philippines"
          ctaLabel="Use the Take-Home Pay Calculator"
        />

        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={philhealthGuideFaqs} />
        </div>

        {/* Related payroll pages */}
        <section className="mt-6">
          <h2 className="mb-6 text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Related payroll pages
          </h2>
          <p className="mb-6 text-[16px] leading-[1.6] text-[#5A6478]">
            After reading this guide, you may also want to review these related
            pages.
          </p>
          <div className="grid gap-[14px] sm:grid-cols-2">
            {relatedPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.title}
                  href={page.href}
                  className="group flex items-center gap-[14px] rounded-[14px] border border-[#E7EBF3] bg-white px-[18px] py-[15px] transition-colors hover:border-[#C3D0F2] hover:bg-[#FBFCFE]"
                >
                  <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[11px] bg-[#EAF0FF] text-brand">
                    <Icon className="size-[18px]" />
                  </span>
                  <span className="flex-1 text-[15.5px] font-bold leading-[1.3] text-[#0E1525]">
                    {page.title}
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-[#C4CCDB] transition-transform group-hover:translate-x-0.5" />
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
