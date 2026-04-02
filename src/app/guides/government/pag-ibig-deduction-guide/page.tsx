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
        <section>
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            What Does Pag-IBIG Deduction Usually Mean?
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            In many payroll situations, a Pag-IBIG deduction refers to the
            regular Pag-IBIG contribution deducted from salary. But some users
            also confuse this with Pag-IBIG housing loan payments or MP2 savings,
            which are not always treated the same way in payroll.
          </p>

          {/* In simple terms */}
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[16px] font-semibold leading-[22px] text-gray-500">
              In simple terms:
            </p>
            <ul className="mt-3 space-y-3">
              {simpleTerms.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[16px] leading-[22px] text-gray-400">
                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-gray-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Regular Pag-IBIG Deduction vs Housing Loan vs MP2 */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Regular Pag-IBIG Deduction vs Housing Loan vs MP2
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            This is the most important distinction. These are all Pag-IBIG-related,
            but they are not the same thing. If you see a Pag-IBIG-related amount
            on payroll, the first step is to identify which of these it actually
            refers to.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {deductionTypes.map((type) => (
              <div
                key={type.title}
                className={`rounded-xl border p-6 ${
                  type.tag === "Payroll deduction"
                    ? "border-brand/20 bg-brand/5"
                    : "border-gray-200 bg-white"
                }`}
              >
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-[14px] font-medium ${
                  type.tag === "Payroll deduction"
                    ? "bg-brand/10 text-brand"
                    : type.tag === "Loan payment"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-gray-50 text-gray-500"
                }`}>
                  {type.tag}
                </span>
                <h3 className="mt-3 text-[20px] font-semibold leading-[26px] text-gray-500">
                  {type.title}
                </h3>
                <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Where Pag-IBIG Appears on Payroll */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Where Pag-IBIG Appears on Payroll
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            The regular Pag-IBIG contribution usually appears as one of the
            standard government deductions on a payslip, together with SSS,
            PhilHealth, and withholding tax. Housing loan payments and other
            Pag-IBIG-related amounts may or may not appear the same way depending
            on payroll handling and salary arrangements.
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

        {/* How to Tell Which Pag-IBIG Amount You Are Seeing */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            How to Tell Which Pag-IBIG Amount You Are Seeing
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            If you are not sure what a Pag-IBIG deduction refers to, compare the
            amount against the regular contribution reference first. If the amount
            is different from the expected regular contribution, it may be
            connected to a housing loan payment or another separate arrangement.
          </p>
          <p className="mt-4 text-[16px] font-semibold leading-[22px] text-gray-500">
            A practical way to check:
          </p>
          <ul className="mt-4 space-y-3">
            {howToCheck.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                <CheckCircle className="size-4 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Why a Pag-IBIG-Related Amount May Be Different */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Why a Pag-IBIG-Related Amount May Be Different From the Regular
            Deduction
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Not every Pag-IBIG-related payroll amount is the standard employee
            contribution. The amount may look different because the deduction is
            tied to a housing loan, a salary-based remittance setup, or another
            payroll-specific arrangement.
          </p>
          <ul className="mt-4 space-y-3">
            {whyAmountDiffers.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* What This Guide Helps You Understand */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            What This Guide Helps You Understand
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

      {/* Next Steps */}
      <section className="bg-surface-tertiary py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-[32px] font-medium leading-[48px] text-gray-500">
            What to Do Next
          </h2>
          <div className="mt-10 grid divide-y divide-gray-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="flex h-full flex-col items-center px-8 py-6 text-center sm:py-0">
              <div className="flex size-16 items-center justify-center rounded-full bg-gray-50 text-brand">
                <Shield className="size-6" />
              </div>
              <h3 className="mt-4 text-[20px] font-semibold leading-[26px] text-gray-500">
                Contribution Reference
              </h3>
              <p className="mt-2 flex-1 text-[16px] leading-[22px] text-gray-400">
                Verify the standard employee and employer contribution structure.
              </p>
              <Link
                href="/government/pag-ibig/pag-ibig-contribution-table-philippines"
                className="mt-6 inline-block rounded-full bg-brand px-6 py-2.5 text-[14px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
              >
                View Table
              </Link>
            </div>
            <div className="flex h-full flex-col items-center px-8 py-6 text-center sm:py-0">
              <div className="flex size-16 items-center justify-center rounded-full bg-gray-50 text-brand">
                <Home className="size-6" />
              </div>
              <h3 className="mt-4 text-[20px] font-semibold leading-[26px] text-gray-500">
                Housing Loan Guide
              </h3>
              <p className="mt-2 flex-1 text-[16px] leading-[22px] text-gray-400">
                If the Pag-IBIG amount is connected to a housing loan, start here.
              </p>
              <Link
                href="/government/pag-ibig/pag-ibig-housing-loan-guide"
                className="mt-6 inline-block rounded-full bg-brand px-6 py-2.5 text-[14px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
              >
                Read Guide
              </Link>
            </div>
            <div className="flex h-full flex-col items-center px-8 py-6 text-center sm:py-0">
              <div className="flex size-16 items-center justify-center rounded-full bg-gray-50 text-brand">
                <Calculator className="size-6" />
              </div>
              <h3 className="mt-4 text-[20px] font-semibold leading-[26px] text-gray-500">
                Full Payroll Estimate
              </h3>
              <p className="mt-2 flex-1 text-[16px] leading-[22px] text-gray-400">
                See Pag-IBIG alongside SSS, PhilHealth, and withholding tax in one estimate.
              </p>
              <Link
                href="/calculators/tax/take-home-pay-calculator-philippines"
                className="mt-6 inline-block rounded-full bg-brand px-6 py-2.5 text-[14px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
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
          <FaqSection faqs={pagibigGuideFaqs} />
        </div>

        {/* Related Pag-IBIG Pages */}
        <section className="mt-16">
          <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
            Related Pag-IBIG Pages
          </h2>
          <p className="mb-6 text-[16px] leading-[22px] text-gray-400">
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
