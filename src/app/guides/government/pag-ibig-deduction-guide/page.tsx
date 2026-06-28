import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle,
  Home,
  Shield,
  Landmark,
  TrendingUp,
  Info,
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
  pagibigGuideMeta,
  deductionTypes,
  payslipPatterns,
  howToCheck,
  whyAmountDiffers,
  whatThisHelps,
  pagibigGuideFaqs,
  PAGIBIG_GUIDE_UPDATED_AT,
} from "@/data/guides/pag-ibig-guide";

export const metadata = generatePageMetadata({
  title: pagibigGuideMeta.metaTitle,
  description: pagibigGuideMeta.metaDescription,
  slug: pagibigGuideMeta.slug,
  updatedAt: PAGIBIG_GUIDE_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Guides", href: "/guides" },
  { label: "Pag-IBIG Deduction Guide" },
];

const simpleTerms = [
  "Regular Pag-IBIG contribution is the standard payroll-related deduction",
  "Housing loan payment is a separate loan obligation",
  "MP2 is a separate savings product",
  "Not every Pag-IBIG-related amount appears the same way on a payslip",
];

const relatedPages = [
  {
    title: "Pag-IBIG Contribution Table",
    href: "/government/pag-ibig/pag-ibig-contribution-table-philippines",
    icon: Shield,
  },
  {
    title: "Pag-IBIG Housing Loan Guide",
    href: "/government/pag-ibig/pag-ibig-housing-loan-guide",
    icon: Home,
  },
  {
    title: "Pag-IBIG MP2 Savings Guide",
    href: "/government/pag-ibig/pag-ibig-mp2-savings-guide",
    icon: TrendingUp,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Government Hub",
    href: "/government",
    icon: Landmark,
  },
];

export default function PagIBIGDeductionGuidePage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: pagibigGuideMeta.metaTitle,
          description: pagibigGuideMeta.metaDescription,
          updatedAt: PAGIBIG_GUIDE_UPDATED_AT,
          slug: pagibigGuideMeta.slug,
        })}
      />

      <PageHero
        title={pagibigGuideMeta.title}
        description={pagibigGuideMeta.directAnswer}
        badge={PAGIBIG_GUIDE_UPDATED_AT}
        breadcrumbs={breadcrumbs}

        containerClassName="max-w-[1240px] px-[clamp(20px,3vw,36px)]"
        variant="dark"
      />

      <div className="mx-auto max-w-[1240px] px-[clamp(20px,3vw,36px)] pb-20 pt-[clamp(20px,3vw,32px)]">
        {/* What does Pag-IBIG deduction usually mean? */}
        <section className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            What does Pag-IBIG deduction usually mean?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            In many payroll situations, a Pag-IBIG deduction refers to the
            regular Pag-IBIG contribution deducted from salary. But some users
            also confuse this with Pag-IBIG housing loan payments or MP2 savings,
            which are not always treated the same way in payroll.
          </p>

          {/* In simple terms */}
          <div className="mt-6 rounded-[16px] border border-[#EDF1F8] bg-[#F7F9FD] px-5 py-[18px]">
            <p className="mb-3 text-[15px] font-bold text-[#0E1525]">
              In simple terms:
            </p>
            <ul className="space-y-[11px]">
              {simpleTerms.map((item) => (
                <li key={item} className="flex items-start gap-[11px] text-[15px] leading-[1.5] text-[#475069]">
                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Regular Pag-IBIG deduction vs housing loan vs MP2 */}

        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Regular Pag-IBIG deduction vs housing loan vs MP2
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            This is the most important distinction. These are all Pag-IBIG-related,
            but they are not the same thing. If you see a Pag-IBIG-related amount
            on payroll, the first step is to identify which of these it actually
            refers to.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {deductionTypes.map((type) => (
              <div
                key={type.title}
                className={`rounded-[16px] border-[1.5px] p-6 ${
                  type.tag === "Payroll deduction"
                    ? "border-brand bg-[#EAF0FF]"
                    : "border-[#E7EBF3] bg-white"
                }`}
              >
                <span className={`inline-block rounded-[7px] px-2.5 py-1 text-[11px] font-bold tracking-[.04em] ${
                  type.tag === "Payroll deduction"
                    ? "bg-[#EAF0FF] text-brand"
                    : type.tag === "Loan payment"
                      ? "bg-[#FBF0DC] text-[#B7791F]"
                      : "bg-[#DEF5F0] text-[#0E9A86]"
                }`}>
                  {type.tag}
                </span>
                <h3 className="mt-3 text-[16.5px] font-semibold leading-[1.25] text-[#0E1525]">
                  {type.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-[#5A6478]">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Where Pag-IBIG appears on payroll */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Where Pag-IBIG appears on payroll
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            The regular Pag-IBIG contribution usually appears as one of the
            standard government deductions on a payslip, together with SSS,
            PhilHealth, and withholding tax. Housing loan payments and other
            Pag-IBIG-related amounts may or may not appear the same way depending
            on payroll handling and salary arrangements.
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

        {/* How to tell which Pag-IBIG amount you are seeing */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            How to tell which Pag-IBIG amount you are seeing
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            If you are not sure what a Pag-IBIG deduction refers to, compare the
            amount against the regular contribution reference first. If the amount
            is different from the expected regular contribution, it may be
            connected to a housing loan payment or another separate arrangement.
          </p>
          <p className="mt-4 text-[14px] font-bold text-[#0E1525]">
            A practical way to check:
          </p>
          <ul className="mt-4 space-y-3">
            {howToCheck.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[1.6] text-[#5A6478]">
                <CheckCircle className="size-4 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Why a Pag-IBIG-Related Amount May Be Different */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Why a Pag-IBIG-related amount may be different from the regular deduction
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            Not every Pag-IBIG-related payroll amount is the standard employee
            contribution. The amount may look different because the deduction is
            tied to a housing loan, a salary-based remittance setup, or another
            payroll-specific arrangement.
          </p>
          <ul className="mt-4 space-y-3">
            {whyAmountDiffers.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[16px] leading-[1.6] text-[#344054]">
                <ArrowRight className="mt-1 size-4 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* What this guide helps you understand */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            What this guide helps you understand
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
          title="Want to See Pag-IBIG in Your Full Take-Home Pay?"
          description="Use the Take-Home Pay Calculator to see Pag-IBIG alongside SSS, PhilHealth, and withholding tax in one salary estimate."
          href="/calculators/tax/take-home-pay-calculator-philippines"
          ctaLabel="Use the Take-Home Pay Calculator"
        />

        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={pagibigGuideFaqs} />
        </div>

        {/* Related Pag-IBIG pages */}
        <section className="mt-6">
          <h2 className="mb-6 text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Related Pag-IBIG pages
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
            source="Pag-IBIG Fund (HDMF) — Contribution and Housing Loan Guidelines"
            sourceUrl="https://www.pagibigfund.gov.ph/"
            updatedAt={PAGIBIG_GUIDE_UPDATED_AT}
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
