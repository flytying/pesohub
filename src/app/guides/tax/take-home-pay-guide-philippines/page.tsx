import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle,
  BookOpen,
  Shield,
  Heart,
  Home,
  Minus,
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
import { formatPeso } from "@/lib/formatters";
import { GOVERNMENT_DISCLAIMER } from "@/lib/constants";
import {
  takeHomePayGuideMeta,
  sampleBreakdown,
  deductionExplainers,
  whyPayslipDiffers,
  whatThisHelps,
  takeHomePayGuideFaqs,
  TAKE_HOME_PAY_GUIDE_UPDATED_AT,
} from "@/data/guides/take-home-pay-guide";

export const metadata = generatePageMetadata({
  title: takeHomePayGuideMeta.metaTitle,
  description: takeHomePayGuideMeta.metaDescription,
  slug: takeHomePayGuideMeta.slug,
  updatedAt: TAKE_HOME_PAY_GUIDE_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Guides", href: "/guides" },
  { label: "Take-Home Pay Guide" },
];

const simpleTerms = [
  "Gross salary is before deductions",
  "Take-home pay is after deductions",
  "Tax and government contributions reduce the final amount received",
  "Some payslips may also include employer-specific deductions or adjustments",
];

const relatedPages = [
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
    title: "PhilHealth Contribution Table",
    href: "/government/philhealth/philhealth-contribution-table-philippines",
    icon: Heart,
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

export default function TakeHomePayGuidePage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: takeHomePayGuideMeta.metaTitle,
          description: takeHomePayGuideMeta.metaDescription,
          updatedAt: TAKE_HOME_PAY_GUIDE_UPDATED_AT,
          slug: takeHomePayGuideMeta.slug,
        })}
      />

      <PageHero
        title={takeHomePayGuideMeta.title}
        description={takeHomePayGuideMeta.directAnswer}
        badge={TAKE_HOME_PAY_GUIDE_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Why Is Take-Home Pay Lower Than Gross Salary? */}
        <section>
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Why Is Take-Home Pay Lower Than Gross Salary?
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Gross salary is your pay before deductions. Take-home pay, or net pay,
            is what remains after common payroll deductions such as withholding
            tax, SSS, PhilHealth, and Pag-IBIG are subtracted. That is why the
            amount that reaches your payslip or bank account is usually lower than
            your gross monthly salary.
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

        {/* Sample Gross-to-Net Salary Breakdown */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Sample Gross-to-Net Salary Breakdown
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            The easiest way to understand take-home pay is to compare a sample
            gross salary with the deductions taken from it. This before-and-after
            format helps show that take-home pay is not a different kind of salary
            — it is simply your gross pay after payroll deductions.
          </p>

          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
            <div className="divide-y divide-gray-200">
              {sampleBreakdown.map((row) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between px-5 py-3 ${
                    row.highlight
                      ? "bg-gray-200/20 font-semibold"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-2 text-[16px] leading-[22px]">
                    {row.isDeduction && (
                      <Minus className="size-3.5 text-gray-400" />
                    )}
                    <span
                      className={
                        row.highlight
                          ? "text-gray-500"
                          : row.isDeduction
                            ? "text-gray-400"
                            : "text-gray-500 font-medium"
                      }
                    >
                      {row.label}
                    </span>
                  </div>
                  <span
                    className={`text-[16px] tabular-nums ${
                      row.highlight
                        ? "text-brand text-lg font-bold"
                        : row.isDeduction
                          ? "text-gray-400"
                          : "font-medium text-gray-500"
                    }`}
                  >
                    {row.isDeduction ? `(${formatPeso(row.amount)})` : formatPeso(row.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-[14px] text-gray-400">
            Based on a sample ₱35,000 monthly salary. Actual amounts depend on
            payroll handling and current contribution schedules.
          </p>
        </section>

        {/* What Deductions Reduce Take-Home Pay? */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            What Deductions Reduce Take-Home Pay?
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            The most common payroll deductions in the Philippines usually include
            the following. Together, these deductions reduce gross salary into
            take-home pay.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {deductionExplainers.map((item) => (
              <div key={item.title} className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                  {item.title}
                </h3>
                <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Gross Pay Is Not Always the Same as Taxable Pay */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Gross Pay Is Not Always the Same as Taxable Pay
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            One reason payroll can feel confusing is that gross salary is not
            always the same as the amount used to compute tax. Some deductions and
            payroll treatments affect taxable compensation differently, which is
            one reason tax estimates and actual payslips do not always match
            perfectly.
          </p>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            This is why payroll explanations often need both a{" "}
            <Link
              href="/guides/tax/how-withholding-tax-works-philippines"
              className="text-brand hover:underline"
            >
              tax guide
            </Link>{" "}
            and a full{" "}
            <Link
              href="/calculators/tax/take-home-pay-calculator-philippines"
              className="text-brand hover:underline"
            >
              take-home pay calculator
            </Link>
            .
          </p>
        </section>

        {/* Why Your Actual Payslip May Be Different */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Why Your Actual Payslip May Be Different
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Even if two employees have the same gross salary, their actual
            take-home pay may differ depending on payroll treatment and added
            deductions. This is why a simple guide or calculator should be treated
            as a planning tool, not a replacement for your actual payslip.
          </p>
          <p className="mt-4 text-[16px] font-semibold leading-[22px] text-gray-500">
            Common reasons include:
          </p>
          <ul className="mt-4 space-y-3">
            {whyPayslipDiffers.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
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

      {/* Calculator CTA */}
      <section className="bg-surface-tertiary py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Want to Estimate Your Take-Home Pay Directly?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-[22px] text-gray-400">
            If you already know your monthly gross salary and want to estimate
            your net pay, use the Take-Home Pay Calculator to see a deduction
            breakdown faster.
          </p>
          <div className="mt-6">
            <Link
              href="/calculators/tax/take-home-pay-calculator-philippines"
              className="inline-flex items-center rounded-full bg-brand px-6 py-3 text-[14px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
            >
              USE THE TAKE-HOME PAY CALCULATOR
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-0 pb-20 sm:px-6 lg:px-8">
        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={takeHomePayGuideFaqs} />
        </div>

        {/* Related Payroll Guides and Tools */}
        <section className="mt-16">
          <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
            Related Payroll Guides and Tools
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
            source="BIR TRAIN Law, SSS, PhilHealth, and Pag-IBIG official contribution schedules"
            sourceUrl="https://www.bir.gov.ph/"
            updatedAt={TAKE_HOME_PAY_GUIDE_UPDATED_AT}
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
