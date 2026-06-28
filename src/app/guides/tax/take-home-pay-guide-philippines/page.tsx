import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle,
  BookOpen,
  Shield,
  Heart,
  Home,
  House,
  HeartPulse,
  Percent,
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

        containerClassName="max-w-[1240px] px-[clamp(20px,3vw,36px)]"
        variant="dark"
      />

      <div className="mx-auto max-w-[1240px] px-[clamp(20px,3vw,36px)] pb-20 pt-[clamp(20px,3vw,32px)]">
        {/* Why is take-home pay lower than gross salary? */}
        <section className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Why is take-home pay lower than gross salary?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            Gross salary is your pay before deductions. Take-home pay, or net pay,
            is what remains after common payroll deductions such as withholding
            tax, SSS, PhilHealth, and Pag-IBIG are subtracted. That is why the
            amount that reaches your payslip or bank account is usually lower than
            your gross monthly salary.
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

        {/* Sample gross-to-net salary breakdown */}

        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Sample gross-to-net salary breakdown
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            The easiest way to understand take-home pay is to compare a sample
            gross salary with the deductions taken from it. This before-and-after
            format helps show that take-home pay is not a different kind of salary
            — it is simply your gross pay after payroll deductions.
          </p>

          <div className="mt-6 overflow-hidden rounded-[16px] border border-[#E7EBF3]">
            {sampleBreakdown.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between gap-3 px-5 py-[14px] ${
                  i < sampleBreakdown.length - 1 ? "border-b border-[#EEF1F7]" : ""
                } ${row.highlight ? "bg-[#F4F7FE]" : ""}`}
              >
                <span
                  className={`text-[15.5px] ${
                    row.highlight
                      ? "font-bold text-[#0E1525]"
                      : "text-[#475069]"
                  }`}
                >
                  {row.isDeduction ? `− ${row.label}` : row.label}
                </span>
                <span
                  className={`text-[15.5px] font-semibold tabular-nums ${
                    row.highlight
                      ? "text-brand"
                      : row.isDeduction
                        ? "text-[#C0392B]"
                        : "text-[#0E1525]"
                  }`}
                >
                  {row.isDeduction
                    ? `(${formatPeso(row.amount)})`
                    : formatPeso(row.amount)}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[14px] text-[#8A93A6]">
            Based on a sample ₱35,000 monthly salary. Actual amounts depend on
            payroll handling and current contribution schedules.
          </p>
        </section>

        {/* What deductions reduce take-home pay? */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            What deductions reduce take-home pay?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            The most common payroll deductions in the Philippines usually include
            the following. Together, these deductions reduce gross salary into
            take-home pay.
          </p>
          <div className="mt-8 grid gap-[14px] sm:grid-cols-2">
            {deductionExplainers.map((item, i) => {
              const Icon = [Percent, Shield, HeartPulse, House][i] ?? Percent;
              return (
                <div
                  key={item.title}
                  className="rounded-[16px] border border-[#EDF1F8] bg-[#F7F9FD] p-5"
                >
                  <div className="mb-[9px] flex items-center gap-[11px]">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#EAF0FF] text-brand">
                      <Icon className="size-[19px]" />
                    </span>
                    <h3 className="text-[16.5px] font-semibold text-[#0E1525]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[14.5px] leading-[1.6] text-[#5A6478]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Gross pay is not always the same as taxable pay */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Gross pay is not always the same as taxable pay
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            One reason payroll can feel confusing is that gross salary is not
            always the same as the amount used to compute tax. Some deductions and
            payroll treatments affect taxable compensation differently, which is
            one reason tax estimates and actual payslips do not always match
            perfectly.
          </p>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
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

        {/* Why your actual payslip may be different */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Why your actual payslip may be different
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            Even if two employees have the same gross salary, their actual
            take-home pay may differ depending on payroll treatment and added
            deductions. This is why a simple guide or calculator should be treated
            as a planning tool, not a replacement for your actual payslip.
          </p>
          <p className="mt-4 text-[14px] font-bold text-[#0E1525]">
            Common reasons include:
          </p>
          <ul className="mt-4 space-y-3">
            {whyPayslipDiffers.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[16px] leading-[1.6] text-[#344054]">
                <ArrowRight className="mt-1 size-4 shrink-0 text-brand" />
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
          title="Want to Estimate Your Take-Home Pay Directly?"
          description="If you already know your monthly gross salary and want to estimate your net pay, use the Take-Home Pay Calculator to see a deduction breakdown faster."
          href="/calculators/tax/take-home-pay-calculator-philippines"
          ctaLabel="Use the Take-Home Pay Calculator"
        />
        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={takeHomePayGuideFaqs} />
        </div>

        {/* Related payroll guides and tools */}
        <section className="mt-6">
          <h2 className="mb-6 text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Related payroll guides and tools
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
