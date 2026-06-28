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
        variant="dark"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* What Does Pag-IBIG Deduction Usually Mean? */}
        <section className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            What Does Pag-IBIG Deduction Usually Mean?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            In many payroll situations, a Pag-IBIG deduction refers to the
            regular Pag-IBIG contribution deducted from salary. But some users
            also confuse this with Pag-IBIG housing loan payments or MP2 savings,
            which are not always treated the same way in payroll.
          </p>

          {/* In simple terms */}
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[16px] font-semibold leading-[1.6] text-gray-500">
              In simple terms:
            </p>
            <ul className="mt-3 space-y-3">
              {simpleTerms.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[16px] leading-[1.6] text-[#5A6478]">
                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-gray-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Regular Pag-IBIG Deduction vs Housing Loan vs MP2 */}

        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Regular Pag-IBIG Deduction vs Housing Loan vs MP2
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
                <h3 className="mt-3 text-[20px] font-semibold leading-[26px] text-gray-500">
                  {type.title}
                </h3>
                <p className="mt-2 text-[16px] leading-[1.6] text-[#5A6478]">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Where Pag-IBIG Appears on Payroll */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Where Pag-IBIG Appears on Payroll
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
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[1.6] text-[#5A6478]">
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* How to Tell Which Pag-IBIG Amount You Are Seeing */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            How to Tell Which Pag-IBIG Amount You Are Seeing
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            If you are not sure what a Pag-IBIG deduction refers to, compare the
            amount against the regular contribution reference first. If the amount
            is different from the expected regular contribution, it may be
            connected to a housing loan payment or another separate arrangement.
          </p>
          <p className="mt-4 text-[16px] font-semibold leading-[1.6] text-gray-500">
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
            Why a Pag-IBIG-Related Amount May Be Different From the Regular
            Deduction
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            Not every Pag-IBIG-related payroll amount is the standard employee
            contribution. The amount may look different because the deduction is
            tied to a housing loan, a salary-based remittance setup, or another
            payroll-specific arrangement.
          </p>
          <ul className="mt-4 space-y-3">
            {whyAmountDiffers.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[1.6] text-[#5A6478]">
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* What This Guide Helps You Understand */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            What This Guide Helps You Understand
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

      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        {/* What to Do Next */}
        <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-center text-[clamp(22px,2.6vw,28px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            What to Do Next
          </h2>
          <div className="mt-7 grid gap-6 sm:grid-cols-3 sm:divide-x sm:divide-[#DDE4F5]">
            {[
              {
                icon: Shield,
                title: "Contribution Reference",
                desc: "Verify the standard employee and employer contribution structure.",
                href: "/government/pag-ibig/pag-ibig-contribution-table-philippines",
                cta: "View Table",
              },
              {
                icon: Home,
                title: "Housing Loan Guide",
                desc: "If the Pag-IBIG amount is connected to a housing loan, start here.",
                href: "/government/pag-ibig/pag-ibig-housing-loan-guide",
                cta: "Read Guide",
              },
              {
                icon: Calculator,
                title: "Full Payroll Estimate",
                desc: "See Pag-IBIG alongside SSS, PhilHealth, and withholding tax in one estimate.",
                href: "/calculators/tax/take-home-pay-calculator-philippines",
                cta: "Use Calculator",
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="px-2 text-center sm:px-6">
                  <span className="mx-auto mb-3.5 flex size-[46px] items-center justify-center rounded-[13px] bg-[#EAF0FF] text-brand">
                    <Icon className="size-[22px]" />
                  </span>
                  <h3 className="text-[17px] font-semibold text-[#0E1525]">
                    {card.title}
                  </h3>
                  <p className="mx-auto mb-4 mt-1.5 text-[14.5px] leading-[1.55] text-[#5A6478]">
                    {card.desc}
                  </p>
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-[22px] py-[11px] text-[12.5px] font-bold uppercase tracking-[.04em] text-white transition-colors hover:bg-brand-dark"
                  >
                    {card.cta}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={pagibigGuideFaqs} />
        </div>

        {/* Related Pag-IBIG Pages */}
        <section className="mt-6">
          <h2 className="mb-6 text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Related Pag-IBIG Pages
          </h2>
          <p className="mb-6 text-[16px] leading-[1.6] text-[#5A6478]">
            After reading this guide, you may also want to review these related
            pages.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
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
