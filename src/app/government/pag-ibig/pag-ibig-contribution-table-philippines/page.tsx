import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Home,
  Shield,
  Heart,
  Landmark,
  TrendingUp,
  Wallet,
  Percent,
  PiggyBank,
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
  pagibigContributionMeta,
  pagibigContributionTable,
  pagibigPayrollExamples,
  pagibigContributionFaqs,
  PAGIBIG_CONTRIBUTION_UPDATED_AT,
  PAGIBIG_MAX_MSC,
  PAGIBIG_LOW_SALARY_THRESHOLD,
} from "@/data/government/pag-ibig-contribution";

export const metadata = generatePageMetadata({
  title: pagibigContributionMeta.metaTitle,
  description: pagibigContributionMeta.metaDescription,
  slug: pagibigContributionMeta.slug,
  updatedAt: PAGIBIG_CONTRIBUTION_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "Pag-IBIG Contribution Table" },
];

const WRAP = "mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)]";
const CARD =
  "rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]";
const H2 =
  "font-display text-[clamp(20px,2.2vw,24px)] font-semibold tracking-[-.02em] text-[#0E1525]";

const TAKE_HOME_HREF =
  "/calculators/tax/take-home-pay-calculator-philippines";

const structureCards: {
  label: string;
  value: string;
  sub: string;
  icon: LucideIcon;
}[] = [
  {
    label: "EMPLOYEE SHARE",
    value: "1% – 2%",
    sub: `1% if salary ≤ ${formatPeso(PAGIBIG_LOW_SALARY_THRESHOLD)}, else 2%`,
    icon: Percent,
  },
  {
    label: "EMPLOYER SHARE",
    value: "2%",
    sub: "Paid on top, regardless of salary",
    icon: Landmark,
  },
  {
    label: "MAXIMUM MSC",
    value: formatPeso(PAGIBIG_MAX_MSC),
    sub: "Cap on monthly compensation",
    icon: Wallet,
  },
  {
    label: "MAX EMPLOYEE SHARE",
    value: formatPeso(200),
    sub: "Per month once salary hits the cap",
    icon: PiggyBank,
  },
];

const capCards: {
  label: string;
  value: string;
  sub: string;
  tone: "amber" | "blue";
}[] = [
  {
    label: `BELOW ${formatPeso(PAGIBIG_LOW_SALARY_THRESHOLD)}`,
    value: "Employee 1%",
    sub: "Lower rate on actual salary",
    tone: "amber",
  },
  {
    label: `${formatPeso(PAGIBIG_LOW_SALARY_THRESHOLD)} – ${formatPeso(PAGIBIG_MAX_MSC)}`,
    value: "Employee 2%",
    sub: "Standard rate on actual salary",
    tone: "blue",
  },
  {
    label: `ABOVE ${formatPeso(PAGIBIG_MAX_MSC)}`,
    value: `Capped at ${formatPeso(200)}`,
    sub: "Contribution stops increasing",
    tone: "amber",
  },
];

const relatedPages = [
  {
    title: "Take-Home Pay Calculator",
    href: TAKE_HOME_HREF,
    icon: Calculator,
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
    title: "PhilHealth Contribution Table",
    href: "/government/philhealth/philhealth-contribution-table-philippines",
    icon: Heart,
  },
  {
    title: "SSS Contribution Table",
    href: "/government/sss/sss-contribution-guide",
    icon: Shield,
  },
  {
    title: "Withholding Tax Calculator",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Government Hub",
    href: "/government",
    icon: Landmark,
  },
];

export default function PagIBIGContributionTablePage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: pagibigContributionMeta.metaTitle,
          description: pagibigContributionMeta.metaDescription,
          updatedAt: PAGIBIG_CONTRIBUTION_UPDATED_AT,
          slug: pagibigContributionMeta.slug,
        })}
      />

      <PageHero
        title={pagibigContributionMeta.title}
        description={pagibigContributionMeta.directAnswer}
        badge={PAGIBIG_CONTRIBUTION_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
        containerClassName={WRAP}
      />

      <div className={`${WRAP} space-y-5 pt-6`}>
        {/* Current contribution structure */}
        <section className={CARD}>
          <h2 className={H2}>Current Pag-IBIG contribution structure</h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            Pag-IBIG (HDMF) contributions are based on a member&rsquo;s monthly
            compensation under HDMF Circular No. 460. The employee share is 1%
            for salaries at or below {formatPeso(PAGIBIG_LOW_SALARY_THRESHOLD)}{" "}
            and 2% above it, while the employer pays a 2% share on top —
            computed only up to the maximum monthly salary of{" "}
            {formatPeso(PAGIBIG_MAX_MSC)}.
          </p>
          <div className="mt-[14px] grid grid-cols-2 gap-[14px] lg:grid-cols-4">
            {structureCards.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.label}
                  className="rounded-[15px] border border-[#EDF1F8] bg-[#F7F9FD] p-[18px]"
                >
                  <span className="flex size-[38px] items-center justify-center rounded-[11px] bg-[#EAF0FF]">
                    <Icon className="size-[19px] text-brand" />
                  </span>
                  <div className="mt-[13px] text-[11.5px] font-bold tracking-[.06em] text-[#6B7488]">
                    {c.label}
                  </div>
                  <div className="mt-[7px] font-display text-[22px] font-semibold text-brand">
                    {c.value}
                  </div>
                  <div className="mt-[5px] text-[13px] leading-[1.45] text-[#8A93A6]">
                    {c.sub}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contribution table reference */}
        <section className={CARD}>
          <h2 className={H2}>Pag-IBIG contribution table reference</h2>
          <p className="mt-[10px] mb-[16px] text-[16px] leading-[1.7] text-[#475069]">
            Check the employee share first if you want to match what usually
            appears on a payslip. The employer pays its share separately, and
            the total contribution is the sum of both sides.
          </p>
          <div className="rounded-[16px] border border-[#E7EBF3] overflow-hidden bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse">
                <thead>
                  <tr className="bg-[#F4F7FE] border-b border-[#E7EBF3]">
                    <th className="px-[18px] py-[13px] text-left text-[12px] font-bold tracking-[.05em] uppercase text-[#475069]">
                      Monthly Compensation
                    </th>
                    <th className="px-[18px] py-[13px] text-right text-[12px] font-bold tracking-[.05em] uppercase text-[#475069]">
                      Employee Share
                    </th>
                    <th className="px-[18px] py-[13px] text-right text-[12px] font-bold tracking-[.05em] uppercase text-[#475069]">
                      Employer Share
                    </th>
                    <th className="px-[18px] py-[13px] text-right text-[12px] font-bold tracking-[.05em] uppercase text-[#475069]">
                      Total Contribution
                    </th>
                    <th className="hidden px-[18px] py-[13px] text-left text-[12px] font-bold tracking-[.05em] uppercase text-[#475069] sm:table-cell">
                      Payroll Note
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pagibigContributionTable.map((row, i) => (
                    <tr
                      key={row.compensationRange}
                      className={`border-b border-[#F0F3F8] ${
                        i % 2 === 1 ? "bg-[#FAFBFE]" : ""
                      }`}
                    >
                      <td className="px-[18px] py-[12px] text-[14px] text-[#344054]">
                        {row.compensationRange}
                      </td>
                      <td className="px-[18px] py-[12px] text-right font-mono text-[14px] tabular-nums font-semibold text-brand">
                        {row.employeeShare}
                      </td>
                      <td className="px-[18px] py-[12px] text-right font-mono text-[14px] tabular-nums text-[#5A6478]">
                        {row.employerShare}
                      </td>
                      <td className="px-[18px] py-[12px] text-right font-mono text-[14px] tabular-nums text-[#0E1525]">
                        {row.totalContribution}
                      </td>
                      <td className="hidden px-[18px] py-[12px] text-[13.5px] text-[#8A93A6] sm:table-cell">
                        {row.payrollNote}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-3 text-[13.5px] leading-[1.6] text-[#8A93A6]">
            Always verify the latest official Pag-IBIG contribution schedule if
            you need the exact current payroll basis.
          </p>
        </section>

        {/* Threshold & cap explanation */}
        <section className={CARD}>
          <h2 className={H2}>
            How the salary threshold and cap affect your contribution
          </h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            Pag-IBIG payroll deductions are easier to understand once two limits
            are clear. Salaries at or below{" "}
            {formatPeso(PAGIBIG_LOW_SALARY_THRESHOLD)} use the lower 1% employee
            rate, while salaries above it use 2%. The contribution is then
            computed only up to a maximum monthly salary of{" "}
            {formatPeso(PAGIBIG_MAX_MSC)}.
          </p>
          <p className="mt-[14px] text-[16px] leading-[1.7] text-[#475069]">
            Once salary exceeds {formatPeso(PAGIBIG_MAX_MSC)}, the contribution
            stops increasing — it stays at {formatPeso(200)} for the employee
            share and {formatPeso(200)} for the employer share, for a combined{" "}
            {formatPeso(400)} per month.
          </p>
          <div className="mt-[16px] grid gap-[14px] sm:grid-cols-3">
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
                    className={`text-[11.5px] font-bold tracking-[.06em] ${
                      amber ? "text-[#B4811C]" : "text-brand"
                    }`}
                  >
                    {c.label}
                  </div>
                  <div
                    className={`mt-[7px] mb-[5px] font-display text-[18px] font-semibold ${
                      amber ? "text-[#B4811C]" : "text-brand"
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

        {/* Sample payroll cuts */}
        <section className={CARD}>
          <h2 className={H2}>Sample Pag-IBIG payroll cuts</h2>
          <p className="mt-[10px] mb-4 text-[16px] leading-[1.7] text-[#475069]">
            These examples connect the reference table to actual payslip
            expectations across different salary levels.
          </p>
          <div className="grid gap-[14px] sm:grid-cols-3">
            {pagibigPayrollExamples.map((ex) => {
              const eePct = Math.round(
                (ex.employeeShare / ex.totalContribution) * 100
              );
              const erPct = 100 - eePct;
              return (
                <div
                  key={ex.label}
                  className="flex flex-col overflow-hidden rounded-[18px] border border-[#EDF1F8] bg-[#F7F9FD] shadow-[0_1px_2px_rgba(16,24,40,.04)]"
                >
                  <div className="border-b border-[#EEF1F7] px-[18px] pb-[15px] pt-[18px]">
                    <div className="font-display text-[15px] font-semibold leading-[1.25] text-[#0E1525]">
                      {ex.label}
                    </div>
                  </div>
                  <div className="px-[18px] pb-2 pt-[14px]">
                    <Row label="Monthly Salary" value={formatPeso(ex.salary)} />
                    <Row
                      label="Employee Share"
                      value={formatPeso(ex.employeeShare)}
                      strong
                    />
                    <Row
                      label="Employer Share"
                      value={formatPeso(ex.employerShare)}
                      muted
                      last
                    />
                  </div>
                  <div className="mt-auto border-t border-[#E3E9F7] bg-[#EEF2FB] px-[18px] pb-[18px] pt-[15px]">
                    <div className="mb-3 flex items-baseline justify-between">
                      <span className="text-[13px] font-bold text-[#475069]">
                        Total contribution
                      </span>
                      <span className="font-display text-[21px] font-bold text-brand">
                        {formatPeso(ex.totalContribution)}
                      </span>
                    </div>
                    <div className="flex h-2 gap-[2px] overflow-hidden rounded-[6px] bg-[#E3E8F2]">
                      <div
                        className="rounded-[6px] bg-[#1535C7]"
                        style={{ width: `${eePct}%` }}
                      />
                      <div
                        className="rounded-[6px] bg-[#9DB2F0]"
                        style={{ width: `${erPct}%` }}
                      />
                    </div>
                    <div className="mt-[9px] flex justify-between text-[11.5px] text-[#6B7488]">
                      <span className="flex items-center gap-[6px]">
                        <span className="size-2 rounded-[2px] bg-[#1535C7]" />
                        Employee {eePct}%
                      </span>
                      <span className="flex items-center gap-[6px]">
                        <span className="size-2 rounded-[2px] bg-[#9DB2F0]" />
                        Employer {erPct}%
                      </span>
                    </div>
                    <div className="mt-3 text-[12px] leading-[1.5] text-[#8A93A6]">
                      {ex.payslipNote}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Where it appears on payroll */}
        <section className={CARD}>
          <h2 className={H2}>Where Pag-IBIG appears on payroll</h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            Pag-IBIG is usually one of the standard government deductions shown
            on a payslip together with SSS, PhilHealth, and withholding tax. The
            employee share is typically listed as a separate line item in the
            deductions section, so it helps to remember that Pag-IBIG is only
            one part of the full payroll deduction picture.
          </p>
          <p className="mt-[14px] text-[16px] leading-[1.7] text-[#475069]">
            If you want to see Pag-IBIG together with other common deductions,
            use the{" "}
            <Link href={TAKE_HOME_HREF} className="text-brand hover:underline">
              Take-Home Pay Calculator
            </Link>{" "}
            next.
          </p>
        </section>
      </div>

      {/* CTA */}
      <div className={`${WRAP} pt-[clamp(28px,4vw,40px)]`}>
        <GovCtaBanner
          title="Want a full payroll estimate?"
          description="If you want to see how Pag-IBIG combines with SSS, PhilHealth, and withholding tax to produce your net pay, use the Take-Home Pay Calculator for a fuller deduction estimate."
          href={TAKE_HOME_HREF}
          ctaLabel="Use the take-home pay calculator"
        />
      </div>

      <div className={`${WRAP} pb-20 pt-[clamp(34px,5vw,48px)]`}>
        {/* FAQ */}
        <FaqSection faqs={pagibigContributionFaqs} />

        {/* Related */}
        <section className="mt-[clamp(34px,5vw,48px)]">
          <h2 className="mb-6 font-display text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-.02em] text-[#0E1525]">
            Related payroll and Pag-IBIG pages
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
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
            source="Pag-IBIG Fund — Circular No. 274 (as amended), Pag-IBIG Contribution Guidelines"
            sourceUrl="https://www.pagibigfund.gov.ph/"
            updatedAt={PAGIBIG_CONTRIBUTION_UPDATED_AT}
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
  muted,
  last,
}: {
  label: string;
  value: string;
  strong?: boolean;
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
          strong ? "font-semibold text-[#475069]" : "text-[#6B7488]"
        }`}
      >
        {label}
      </span>
      <span
        className={`font-mono text-[14px] tabular-nums ${
          strong
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
