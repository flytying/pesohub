import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle,
  BookOpen,
  BarChart3,
  Landmark,
  FileText,
  Info,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
import { SourceCitation } from "@/components/shared/source-citation";
import { JsonLd } from "@/components/seo/json-ld";
import { buttonVariants } from "@/lib/button-variants";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema-markup";
import { formatPeso } from "@/lib/formatters";
import { GOVERNMENT_DISCLAIMER } from "@/lib/constants";
import { SSSContributionTabs } from "@/components/government/sss-contribution-tabs";
import {
  sssContributionMeta,
  sssPayrollExamples,
  memberTypeCards,
  sssContributionFaqs,
  SSS_CONTRIBUTION_UPDATED_AT,
} from "@/data/government/sss-contribution";

export const metadata = generatePageMetadata({
  title: sssContributionMeta.metaTitle,
  description: sssContributionMeta.metaDescription,
  slug: sssContributionMeta.slug,
  updatedAt: SSS_CONTRIBUTION_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "SSS Contribution Table" },
];

const whyDifferent = [
  "the member type may be different from what the user assumes",
  "payroll may use more detailed classification logic",
  "SSS may later publish a new contribution schedule",
  "the Employees\u2019 Compensation (EC) component may apply separately",
  "rounding or timing differences may affect the exact amount",
];

const relatedPages = [
  {
    title: "SSS Contribution Calculator",
    href: "/calculators/sss/sss-contribution-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "SSS Pension Table",
    href: "/government/sss/sss-pension-table",
    icon: FileText,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: BarChart3,
  },
  {
    title: "Calculators Hub",
    href: "/calculators",
    icon: Calculator,
  },
  {
    title: "Government Hub",
    href: "/government",
    icon: Landmark,
  },
];

export default function SSSContributionGuidePage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: sssContributionMeta.metaTitle,
          description: sssContributionMeta.metaDescription,
          updatedAt: SSS_CONTRIBUTION_UPDATED_AT,
          slug: sssContributionMeta.slug,
        })}
      />

      <PageHero
        title={sssContributionMeta.title}
        description={sssContributionMeta.directAnswer}
        badge={SSS_CONTRIBUTION_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      {/* SSS Contribution Table Reference */}
      <section>
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          SSS Contribution Table Reference
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          Select your member type to see the contribution table that applies to
          you. For employed and kasambahay members, the contribution is split
          between the member and the employer. For self-employed, voluntary, OFW,
          and non-working spouse members, the member pays the full amount.
        </p>
        <div className="mt-4">
          <SSSContributionTabs />
        </div>
        <p className="mt-3 text-[14px] text-gray-400">
          Based on the SSS contribution schedule effective January 2025.
          Always verify the latest official SSS schedule if you need the exact
          contribution basis for payroll or remittance.
        </p>
      </section>

      {/* How to Read the Employee and Employer Shares */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          How to Read the Employee and Employer Shares
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          For employed members, the SSS table separates the employee share and
          employer share. The employee portion is what usually appears as the
          payroll deduction, while the employer contributes its own share on top
          of that.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
            <p className="text-[14px] font-medium uppercase tracking-wide text-gray-400">
              Employee Share
            </p>
            <p className="mt-1 text-xl font-bold text-brand">
              Your Payslip Deduction
            </p>
            <p className="mt-1 text-[14px] text-gray-400">
              Deducted from your salary
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
            <p className="text-[14px] font-medium uppercase tracking-wide text-gray-400">
              Employer Share
            </p>
            <p className="mt-1 text-xl font-bold text-gray-500">
              Paid by Your Employer
            </p>
            <p className="mt-1 text-[14px] text-gray-400">
              On top of your salary
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
            <p className="text-[14px] font-medium uppercase tracking-wide text-gray-400">
              Total Contribution
            </p>
            <p className="mt-1 text-xl font-bold text-gray-500">
              Both Combined
            </p>
            <p className="mt-1 text-[14px] text-gray-400">
              Remitted to SSS
            </p>
          </div>
        </div>
      </section>

      {/* What Is Monthly Salary Credit? */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          What Is Monthly Salary Credit?
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          Monthly Salary Credit, or MSC, is the salary band SSS uses to
          determine contribution amounts and some benefit computations. The
          official SSS site explains that monthly contributions are based on
          member compensation and that MSC is the compensation base used in
          contribution and benefit calculations.
        </p>
        <p className="mt-3 text-[16px] leading-[22px] text-gray-400">
          This is why contributions move by bracket instead of changing by very
          small peso amounts every time salary changes.
        </p>
      </section>

      {/* How Member Type Affects the Table */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          How Member Type Affects the Table
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          Different member classifications may not use the same contribution
          breakdown. Employees typically have both employer and employee shares.
          Voluntary, self-employed, OFW, and non-working spouse views should be
          understood separately.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {memberTypeCards.map((card) => (
            <div key={card.type} className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                {card.type}
              </h3>
              <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Sample SSS Payroll Cuts */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Sample SSS Payroll Cuts
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          These examples help show how the SSS contribution may look in a
          payroll context for employed members.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {sssPayrollExamples.map((example) => (
            <div key={example.label} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              {/* Header */}
              <div className="border-b border-dashed border-gray-200 bg-gray-50 px-6 py-4">
                <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                  {example.label}
                </h3>
              </div>
              {/* Line items */}
              <div className="px-6 py-4">
                <dl className="space-y-2.5 text-[16px] leading-[22px]">
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Monthly Salary</dt>
                    <dd className="font-mono tabular-nums text-gray-500">
                      {formatPeso(example.salary)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">MSC Used</dt>
                    <dd className="font-mono tabular-nums text-gray-500">
                      {formatPeso(example.msc)}
                    </dd>
                  </div>
                </dl>
                {/* Dashed divider */}
                <div className="my-3 border-t border-dashed border-gray-200" />
                <dl className="space-y-2.5 text-[16px] leading-[22px]">
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Employee Share</dt>
                    <dd className="font-mono tabular-nums font-semibold text-brand">
                      {formatPeso(example.employeeShare)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Employer Share</dt>
                    <dd className="font-mono tabular-nums text-gray-500">
                      {formatPeso(example.employerShare)}
                    </dd>
                  </div>
                </dl>
              </div>
              {/* Total */}
              <div className="border-t border-dashed border-gray-200 bg-gray-50 px-6 py-4">
                <div className="flex justify-between text-[16px] leading-[22px]">
                  <span className="font-semibold text-gray-500">Total Contribution</span>
                  <span className="font-mono tabular-nums font-bold text-gray-500">
                    {formatPeso(example.totalContribution)}
                  </span>
                </div>
              </div>
              {/* Note */}
              <div className="border-t border-gray-100 px-6 py-3">
                <p className="text-[14px] text-gray-300">
                  {example.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Your Actual SSS Contribution May Differ */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Why Your Actual SSS Contribution May Differ
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          Actual contributions may differ from this reference table for several
          reasons. That is why this page should always show the effective period
          of the table prominently.
        </p>
        <ul className="mt-4 space-y-3">
          {whyDifferent.map((item) => (
            <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
              <ArrowRight className="size-4 shrink-0 text-gray-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Current Schedule Used on This Page */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Current Schedule Used on This Page
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          As of the latest official SSS publication currently available, the
          contribution table is Effective January 2025. SSS also states that the
          contribution rate increased to 15%, with the minimum MSC at ₱5,000 and
          the maximum MSC at ₱35,000 starting January 2025.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[14px] font-medium uppercase tracking-wide text-gray-400">
              Effective Period
            </p>
            <p className="mt-1 text-lg font-bold text-brand">
              January 2025
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[14px] font-medium uppercase tracking-wide text-gray-400">
              Contribution Rate
            </p>
            <p className="mt-1 text-lg font-bold text-brand">15%</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[14px] font-medium uppercase tracking-wide text-gray-400">
              Minimum MSC
            </p>
            <p className="mt-1 text-lg font-bold text-brand">₱5,000</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[14px] font-medium uppercase tracking-wide text-gray-400">
              Maximum MSC
            </p>
            <p className="mt-1 text-lg font-bold text-brand">₱35,000</p>
          </div>
        </div>
      </section>

    </div>

      {/* Calculator CTA */}
      <section className="bg-surface-tertiary py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Want a Faster Estimate?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-[22px] text-gray-400">
            If you already know your salary and member type, use the SSS
            Contribution Calculator to get a quicker estimate without scanning
            the full table.
          </p>
          <div className="mt-6">
            <Link
              href="/calculators/sss/sss-contribution-calculator-philippines"
              className="inline-flex items-center rounded-full bg-brand px-6 py-3 text-[14px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
            >
              USE THE SSS CONTRIBUTION CALCULATOR
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-0 pb-20 sm:px-6 lg:px-8">
      {/* FAQ */}
      <div className="mt-16">
        <FaqSection faqs={sssContributionFaqs} />
      </div>

      {/* Related Payroll Tools and Guides */}
      <section className="mt-16">
        <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
          Related payroll tools and guides
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

      {/* Source Citation */}
      <div className="mt-16">
        <SourceCitation
          source="Social Security System (SSS) — Schedule of Contributions"
          sourceUrl="https://www.sss.gov.ph/sss/appmanager/pages.jsp?page=scheduleofcontribution"
          updatedAt={SSS_CONTRIBUTION_UPDATED_AT}
          reviewCadence="Every 90 days"
        />
      </div>

      {/* Disclaimer */}
      <div className="mt-4">
        <DisclaimerBox text={GOVERNMENT_DISCLAIMER} />
      </div>
    </div>
    </>
  );
}
