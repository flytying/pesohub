import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  BookOpen,
  Landmark,
  Shield,
  Percent,
  Wallet,
  TrendingUp,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
import { SourceCitation } from "@/components/shared/source-citation";
import { GovCtaBanner } from "@/components/government/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema-markup";
import { formatPeso } from "@/lib/formatters";
import { GOVERNMENT_DISCLAIMER } from "@/lib/constants";
import {
  philhealthMeta,
  philhealthContributionTable,
  philhealthPayrollExamples,
  philhealthFaqs,
  PHILHEALTH_UPDATED_AT,
  PHILHEALTH_PREMIUM_RATE,
  PHILHEALTH_SALARY_FLOOR,
  PHILHEALTH_SALARY_CEILING,
} from "@/data/government/philhealth";

export const metadata = generatePageMetadata({
  title: philhealthMeta.metaTitle,
  description: philhealthMeta.metaDescription,
  slug: philhealthMeta.slug,
  updatedAt: PHILHEALTH_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "PhilHealth Contribution Table" },
];

const WRAP = "mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)]";
const CARD =
  "rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]";
const H2 =
  "font-display text-[clamp(20px,2.2vw,24px)] font-semibold tracking-[-.02em] text-[#0E1525]";

const floorPremium = PHILHEALTH_SALARY_FLOOR * PHILHEALTH_PREMIUM_RATE;
const ceilingPremium = PHILHEALTH_SALARY_CEILING * PHILHEALTH_PREMIUM_RATE;
const ratePct = `${(PHILHEALTH_PREMIUM_RATE * 100).toFixed(1)}%`;

const structureCards: {
  label: string;
  value: string;
  sub: string;
  accent: boolean;
  icon: LucideIcon;
}[] = [
  {
    label: "PREMIUM RATE USED",
    value: ratePct,
    sub: "Of monthly basic salary",
    accent: true,
    icon: Percent,
  },
  {
    label: "MONTHLY SALARY FLOOR",
    value: formatPeso(PHILHEALTH_SALARY_FLOOR),
    sub: "Minimum basis for premium",
    accent: true,
    icon: Wallet,
  },
  {
    label: "MONTHLY SALARY CEILING",
    value: formatPeso(PHILHEALTH_SALARY_CEILING),
    sub: "Maximum basis for premium",
    accent: true,
    icon: TrendingUp,
  },
  {
    label: "TOTAL MONTHLY PREMIUM",
    value: `${formatPeso(floorPremium)} – ${formatPeso(ceilingPremium)}`,
    sub: "Range from floor to ceiling",
    accent: false,
    icon: HeartPulse,
  },
  {
    label: "EMPLOYEE SHARE",
    value: "50%",
    sub: "Half of total premium",
    accent: false,
    icon: Shield,
  },
  {
    label: "EMPLOYER SHARE",
    value: "50%",
    sub: "Half of total premium",
    accent: false,
    icon: Landmark,
  },
];

const capCards: {
  label: string;
  value: string;
  sub: string;
  tone: "amber" | "blue";
}[] = [
  {
    label: "BELOW FLOOR",
    value: `Uses ${formatPeso(PHILHEALTH_SALARY_FLOOR)}`,
    sub: `Premium = ${formatPeso(floorPremium)} total`,
    tone: "amber",
  },
  {
    label: "WITHIN RANGE",
    value: "Uses actual salary",
    sub: "Premium = 5% of salary",
    tone: "blue",
  },
  {
    label: "ABOVE CEILING",
    value: `Uses ${formatPeso(PHILHEALTH_SALARY_CEILING)}`,
    sub: `Premium = ${formatPeso(ceilingPremium)} total`,
    tone: "amber",
  },
];

const shareCards: { title: string; icon: LucideIcon; sub: string }[] = [
  { title: "Employee Share", icon: Shield, sub: "Deducted from your payslip" },
  { title: "Employer Share", icon: Landmark, sub: "Paid by your employer" },
];

const relatedPages = [
  {
    title: "PhilHealth Contribution Guide",
    href: "/guides/government/philhealth-contribution-guide",
    icon: BookOpen,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Wallet,
  },
  {
    title: "SSS Contribution Calculator",
    href: "/calculators/sss/sss-contribution-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Withholding Tax Calculator",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    icon: Percent,
  },
  {
    title: "SSS Contribution Table",
    href: "/government/sss/sss-contribution-guide",
    icon: BookOpen,
  },
  {
    title: "Government Hub",
    href: "/government",
    icon: Landmark,
  },
];

export default function PhilHealthContributionTablePage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: philhealthMeta.metaTitle,
          description: philhealthMeta.metaDescription,
          updatedAt: PHILHEALTH_UPDATED_AT,
          slug: philhealthMeta.slug,
        })}
      />

      <PageHero
        title={philhealthMeta.title}
        description={philhealthMeta.directAnswer}
        badge={PHILHEALTH_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
        containerClassName={WRAP}
      />

      <div className={`${WRAP} space-y-5 pt-6`}>
        {/* 1. Current PhilHealth contribution structure */}
        <section className={CARD}>
          <h2 className={H2}>Current PhilHealth contribution structure</h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            PhilHealth&rsquo;s published contribution table shows the premium
            schedule for direct contributors under Circular No. 2019-0009. The
            table applies a {ratePct} premium rate to monthly basic salary,
            subject to the published salary floor and salary ceiling.
          </p>
          <div className="mt-4 grid gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
            {structureCards.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.label}
                  className="flex flex-col gap-[13px] rounded-[15px] border border-[#EDF1F8] bg-[#F7F9FD] p-[18px]"
                >
                  <span className="flex size-[38px] items-center justify-center rounded-[11px] bg-[#EAF0FF]">
                    <Icon className="size-[19px] text-brand" />
                  </span>
                  <div>
                    <div className="text-[11.5px] font-bold tracking-[.06em] text-[#6B7488]">
                      {c.label}
                    </div>
                    <div
                      className={`mt-[5px] font-display text-[22px] font-semibold ${
                        c.accent ? "text-brand" : "text-[#0E1525]"
                      }`}
                    >
                      {c.value}
                    </div>
                    <div className="mt-[4px] text-[13px] text-[#8A93A6]">
                      {c.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. PhilHealth contribution table reference */}
        <section className={CARD}>
          <h2 className={H2}>PhilHealth contribution table reference</h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            For employed members, the total PhilHealth premium is commonly split
            equally between employee and employer. If salary is below the floor,
            the premium is based on the floor. If salary is above the ceiling,
            the premium is based on the ceiling.
          </p>
          <div className="mt-4 overflow-hidden rounded-[16px] border border-[#E7EBF3] bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)]">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#E7EBF3] bg-[#F4F7FE]">
                    <th className="px-4 py-[13px] text-left text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                      Monthly Basic Salary
                    </th>
                    <th className="px-4 py-[13px] text-right text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                      Premium Rate
                    </th>
                    <th className="px-4 py-[13px] text-right text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                      Total Premium
                    </th>
                    <th className="px-4 py-[13px] text-right text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                      Employee
                    </th>
                    <th className="px-4 py-[13px] text-right text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                      Employer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {philhealthContributionTable.map((row, i) => (
                    <tr
                      key={row.salaryRange}
                      className={`border-b border-[#F0F3F8] ${
                        i % 2 ? "bg-[#FAFBFE]" : "bg-white"
                      }`}
                    >
                      <td className="px-4 py-3 text-[14px] text-[#0E1525]">
                        {row.salaryRange}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-[14px] tabular-nums text-[#5A6478]">
                        {row.premiumRate}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-[14px] tabular-nums text-[#0E1525]">
                        {formatPeso(row.totalPremium)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-[14px] font-semibold tabular-nums text-brand">
                        {formatPeso(row.employeeShare)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-[14px] tabular-nums text-[#5A6478]">
                        {formatPeso(row.employerShare)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-3 text-[13.5px] leading-[1.6] text-[#8A93A6]">
            Always verify the latest PhilHealth table or advisory if you need the
            exact current payroll basis.
          </p>
        </section>

        {/* 3. How salary floor and ceiling affect PhilHealth contribution */}
        <section className={CARD}>
          <h2 className={H2}>
            How salary floor and ceiling affect PhilHealth contribution
          </h2>
          <p className="mt-[12px] text-[16px] leading-[1.7] text-[#475069]">
            PhilHealth contribution does not increase without limit. If salary is
            below the salary floor, the contribution is computed using the
            minimum salary floor of {formatPeso(PHILHEALTH_SALARY_FLOOR)}. If
            salary is above the salary ceiling, the contribution is computed
            using the maximum salary ceiling of{" "}
            {formatPeso(PHILHEALTH_SALARY_CEILING)}. This helps explain why
            payroll deductions may stop increasing after a certain salary level.
          </p>
          <div className="mt-4 grid gap-[14px] sm:grid-cols-3">
            {capCards.map((c) => {
              const amber = c.tone === "amber";
              return (
                <div
                  key={c.label}
                  className={`rounded-[16px] border-[1.5px] p-5 text-center ${
                    amber
                      ? "border-[#F6E2B0] bg-[#FFF8E8]"
                      : "border-[#C9D6F7] bg-[#EAF0FF]"
                  }`}
                >
                  <div
                    className={`text-[11.5px] font-bold tracking-[.07em] ${
                      amber ? "text-[#B7791F]" : "text-brand"
                    }`}
                  >
                    {c.label}
                  </div>
                  <div
                    className={`mb-[5px] mt-[7px] font-display text-[17px] font-semibold ${
                      amber ? "text-[#7A5B12]" : "text-brand"
                    }`}
                  >
                    {c.value}
                  </div>
                  <div className="text-[13.5px] leading-[1.45] text-[#6B7488]">
                    {c.sub}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Sample PhilHealth payroll cuts */}
        <section className={CARD}>
          <h2 className={H2}>Sample PhilHealth payroll cuts</h2>
          <div className="mt-4 grid gap-[14px] sm:grid-cols-3">
            {philhealthPayrollExamples.map((ex) => (
              <div
                key={ex.label}
                className="flex flex-col overflow-hidden rounded-[16px] border border-[#EDF1F8] bg-[#F7F9FD]"
              >
                <div className="border-b border-[#E3E9F7] bg-[#EEF2FB] px-[18px] py-[14px] font-display text-[15px] font-semibold leading-[1.25] text-[#0E1525]">
                  {ex.label}
                </div>
                <div className="px-[18px] pb-[18px] pt-2">
                  <Row label="Monthly Salary" value={formatPeso(ex.salary)} />
                  <Row label="Basis Used" value={formatPeso(ex.basisUsed)} />
                  <Row
                    label="Total Premium"
                    value={formatPeso(ex.totalPremium)}
                    strong
                  />
                  <Row
                    label="Employee Share"
                    value={formatPeso(ex.employeeShare)}
                    accent
                  />
                  <Row
                    label="Employer Share"
                    value={formatPeso(ex.employerShare)}
                    muted
                    last
                  />
                  <p className="mt-[10px] text-[12.5px] leading-[1.5] text-[#8A93A6]">
                    {ex.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Employee share vs employer share */}
        <section className={CARD}>
          <h2 className={H2}>Employee share vs employer share</h2>
          <p className="mt-[12px] text-[16px] leading-[1.7] text-[#475069]">
            For employed members, the total monthly premium is typically shared
            equally between employer and employee. That means the employee-side
            payroll deduction is usually half of the total premium, while the
            employer pays the other half. Many users only see the employee-side
            deduction on their payslip and do not realize the total premium is
            larger.
          </p>
          <div className="mt-4 grid gap-[14px] sm:grid-cols-2">
            {shareCards.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="rounded-[16px] border border-[#EDF1F8] bg-[#F7F9FD] p-6 text-center"
                >
                  <span className="mx-auto mb-3 flex size-[48px] items-center justify-center rounded-[13px] bg-[#EAF0FF]">
                    <Icon className="size-[22px] text-brand" />
                  </span>
                  <div className="font-display text-[16px] font-semibold text-[#0E1525]">
                    {c.title}
                  </div>
                  <div className="my-[6px] font-display text-[26px] font-bold text-brand">
                    50%
                  </div>
                  <div className="text-[13.5px] text-[#6B7488]">{c.sub}</div>
                  <div className="mt-[5px] text-[13.5px] font-semibold text-[#475069]">
                    {formatPeso(floorPremium / 2)} –{" "}
                    {formatPeso(ceilingPremium / 2)} per month
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. Why your actual PhilHealth deduction may differ */}
        <section className={CARD}>
          <h2 className={H2}>Why your actual PhilHealth deduction may differ</h2>
          <p className="mt-[12px] text-[16px] leading-[1.7] text-[#475069]">
            Your actual payroll deduction may differ from a simple reference
            table because payroll systems may apply specific timing, salary
            treatment, rounding, or updated implementation guidance. This page
            should be used as a practical reference, not as a replacement for
            your employer&rsquo;s payroll system or official PhilHealth notices.
          </p>
        </section>
      </div>

      {/* CTA */}
      <div className={`${WRAP} pt-[clamp(28px,4vw,40px)]`}>
        <GovCtaBanner
          title="Want a full payroll estimate?"
          description="If you want to see how PhilHealth combines with SSS, Pag-IBIG, and withholding tax to produce your net pay, use the Take-Home Pay Calculator for a fuller deduction estimate."
          href="/calculators/tax/take-home-pay-calculator-philippines"
          ctaLabel="Use the take-home pay calculator"
        />
      </div>

      <div className={`${WRAP} pb-20 pt-[clamp(34px,5vw,48px)]`}>
        {/* FAQ */}
        <FaqSection faqs={philhealthFaqs} />

        {/* Related */}
        <section className="mt-[clamp(34px,5vw,48px)]">
          <h2 className="mb-6 font-display text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-.02em] text-[#0E1525]">
            Related payroll tools and guides
          </h2>
          <div
            className={`grid gap-4 ${relatedPages.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}
          >
            {relatedPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.title}
                  href={page.href}
                  className="group flex items-center gap-[14px] rounded-[14px] border border-[#E7EBF3] bg-white px-[18px] py-[15px] transition-colors hover:border-[#C3D0F2] hover:bg-[#FBFCFE]"
                >
                  <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[11px] bg-[#EAF0FF]">
                    <Icon className="size-[18px] text-brand" />
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

        {/* Source & disclaimer */}
        <div className="mt-[clamp(34px,5vw,48px)]">
          <SourceCitation
            source="PhilHealth — Circular No. 2019-0009, PhilHealth Premium Contribution Schedule"
            sourceUrl="https://www.philhealth.gov.ph/"
            updatedAt={PHILHEALTH_UPDATED_AT}
            reviewCadence="Every 90 days"
          />
        </div>
        <div className="mt-4">
          <DisclaimerBox text={GOVERNMENT_DISCLAIMER} />
        </div>
      </div>
    </>
  );
}

function Row({
  label,
  value,
  strong,
  accent,
  muted,
  last,
}: {
  label: string;
  value: string;
  strong?: boolean;
  accent?: boolean;
  muted?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-[9px] ${
        last ? "" : "border-b border-[#F0F3F8]"
      }`}
    >
      <span
        className={`text-[14px] ${
          strong || accent ? "font-semibold text-[#475069]" : "text-[#6B7488]"
        }`}
      >
        {label}
      </span>
      <span
        className={`font-mono text-[14px] tabular-nums ${
          accent
            ? "font-bold text-brand"
            : muted
              ? "text-[#5A6478]"
              : "text-[#0E1525]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
