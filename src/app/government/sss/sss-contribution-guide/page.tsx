import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Briefcase,
  User,
  Users,
  Plane,
  BarChart3,
  Landmark,
  FileText,
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

const WRAP = "mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)]";
const CARD =
  "rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]";
const H2 =
  "font-display text-[clamp(20px,2.2vw,24px)] font-semibold tracking-[-.02em] text-[#0E1525]";

const readCards = [
  {
    label: "EMPLOYEE SHARE",
    value: "Your payslip deduction",
    sub: "Deducted from your salary",
    active: true,
  },
  {
    label: "EMPLOYER SHARE",
    value: "Paid by your employer",
    sub: "On top of your salary",
    active: false,
  },
  {
    label: "TOTAL CONTRIBUTION",
    value: "Both combined",
    sub: "Remitted to SSS",
    active: false,
  },
];

const memberIcons: Record<string, LucideIcon> = {
  Employee: Briefcase,
  "Self-Employed": User,
  Voluntary: Users,
  "Non-Working Spouse": User,
  OFW: Plane,
};

const whyDifferent = [
  "The member type may be different from what the user assumes",
  "Payroll may use newer data and classification logic",
  "SSS may later publish a new contribution schedule",
  "The Employees’ Compensation (EC) component may apply separately",
  "Rounding or timing differences may affect the exact amount",
];

const scheduleCards = [
  { label: "EFFECTIVE PERIOD", value: "January 2025" },
  { label: "CONTRIBUTION RATE", value: "15%" },
  { label: "MINIMUM MSC", value: "₱5,000" },
  { label: "MAXIMUM MSC", value: "₱35,000" },
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
        containerClassName={WRAP}
      />

      <div className={`${WRAP} space-y-5 pt-6`}>
        {/* Contribution table reference */}
        <section className={CARD}>
          <h2 className={H2}>SSS contribution table reference</h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            Select your member type to see the contribution split that applies
            to you. For employed and salaried members, the contribution is split
            between the employee and the employer. For self-employed, voluntary,
            OFW, and non-working spouse members, the member pays the full amount.
          </p>
          <div className="mt-4">
            <SSSContributionTabs />
          </div>
          <p className="mt-3 text-[13.5px] leading-[1.6] text-[#8A93A6]">
            Based on the SSS contribution schedule effective January 2025. Always
            verify the latest official SSS schedule if you need the exact
            contribution basis for payroll or remittance.
          </p>
        </section>

        {/* How to read the shares */}
        <section className={CARD}>
          <h2 className={H2}>How to read the employee and employer shares</h2>
          <div className="mt-[14px] grid gap-[14px] sm:grid-cols-3">
            {readCards.map((c) => (
              <div
                key={c.label}
                className={`rounded-[16px] border-[1.5px] p-5 text-center ${
                  c.active
                    ? "border-[#1535C7] bg-[#EAF0FF]"
                    : "border-[#EDF1F8] bg-[#F7F9FD]"
                }`}
              >
                <div
                  className={`text-[11.5px] font-bold tracking-[.07em] ${
                    c.active ? "text-brand" : "text-[#6B7488]"
                  }`}
                >
                  {c.label}
                </div>
                <div className="mt-[7px] mb-[5px] font-display text-[17px] font-semibold text-[#0E1525]">
                  {c.value}
                </div>
                <div className="text-[13.5px] leading-[1.45] text-[#6B7488]">
                  {c.sub}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What is MSC */}
        <section className={CARD}>
          <h2 className={H2}>What is Monthly Salary Credit?</h2>
          <p className="mt-[14px] text-[16px] leading-[1.7] text-[#475069]">
            Monthly Salary Credit, or MSC, is the salary band SSS uses to
            determine contribution amounts and some benefit computations. The
            official SSS table stipulates that monthly contributions are based on
            member compensation, and that the MSC is the compensation base used
            in contribution and benefit calculations.
          </p>
          <p className="mt-[14px] text-[16px] leading-[1.7] text-[#475069]">
            This is why contributions move by bracket instead of changing by very
            small peso amounts every time salary changes.
          </p>
        </section>

        {/* Member type cards */}
        <section className={CARD}>
          <h2 className={H2}>How member type affects the table</h2>
          <p className="mt-[14px] mb-4 text-[16px] leading-[1.7] text-[#475069]">
            Different member classifications may not use the same contribution
            breakdown. Employees typically have both employer and employee
            shares. Voluntary, self-employed, OFW, and non-working spouse members
            should be understood separately.
          </p>
          <div className="grid gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
            {memberTypeCards.map((card) => {
              const Icon = memberIcons[card.type] ?? User;
              return (
                <div
                  key={card.type}
                  className="rounded-[16px] border border-[#EDF1F8] bg-[#F7F9FD] p-5"
                >
                  <span className="mb-[13px] flex size-[42px] items-center justify-center rounded-[12px] bg-[#EAF0FF]">
                    <Icon className="size-[21px] text-brand" />
                  </span>
                  <div className="mb-[6px] font-display text-[16px] font-semibold text-[#0E1525]">
                    {card.type}
                  </div>
                  <p className="text-[14px] leading-[1.55] text-[#5A6478]">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Sample payroll cuts */}
        <section className={CARD}>
          <h2 className={H2}>Sample SSS payroll cuts</h2>
          <p className="mt-[14px] mb-4 text-[16px] leading-[1.7] text-[#475069]">
            These examples help show how the SSS contribution may look in a
            payroll context for employed members.
          </p>
          <div className="grid gap-[14px] sm:grid-cols-3">
            {sssPayrollExamples.map((ex) => {
              const eePct = Math.round(
                (ex.employeeShare / ex.totalContribution) * 100
              );
              const erPct = 100 - eePct;
              return (
                <div
                  key={ex.label}
                  className="flex flex-col overflow-hidden rounded-[18px] border border-[#EDF1F8] bg-[#F7F9FD] shadow-[0_1px_2px_rgba(16,24,40,.04)]"
                >
                  <div className="flex items-start gap-3 border-b border-[#EEF1F7] px-[18px] pb-[15px] pt-[18px]">
                    <span className="flex size-[42px] shrink-0 items-center justify-center rounded-[12px] bg-[#EAF0FF]">
                      <BarChart3 className="size-5 text-brand" />
                    </span>
                    <div>
                      <div className="text-[11px] font-bold tracking-[.07em] text-brand">
                        {ex.tier}
                      </div>
                      <div className="mt-[3px] font-display text-[15px] font-semibold leading-[1.25] text-[#0E1525]">
                        {ex.label}
                      </div>
                    </div>
                  </div>
                  <div className="px-[18px] pb-2 pt-[14px]">
                    <Row label="Monthly Salary" value={formatPeso(ex.salary)} />
                    <Row label="MSC Used" value={formatPeso(ex.msc)} />
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
                      {ex.note}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why differ */}
        <section className={CARD}>
          <h2 className={H2}>Why your actual SSS contribution may differ</h2>
          <ul className="mt-[14px] space-y-3">
            {whyDifferent.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <ArrowRight className="mt-[3px] size-[18px] shrink-0 text-brand" />
                <span className="text-[16px] leading-[1.55] text-[#344054]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Current schedule */}
        <section className={CARD}>
          <h2 className={H2}>Current schedule used on this page</h2>
          <div className="mt-[14px] grid grid-cols-2 gap-[14px] lg:grid-cols-4">
            {scheduleCards.map((s) => (
              <div
                key={s.label}
                className="rounded-[15px] border border-[#EDF1F8] bg-[#F7F9FD] p-[18px]"
              >
                <div className="text-[11.5px] font-bold tracking-[.06em] text-[#6B7488]">
                  {s.label}
                </div>
                <div className="mt-[7px] font-display text-[20px] font-semibold text-brand">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className={`${WRAP} pt-[clamp(28px,4vw,40px)]`}>
        <GovCtaBanner
          title="Want a faster estimate?"
          description="If you already know your salary and member type, use the SSS Contribution Calculator to get a quick estimate without scanning the full table."
          href="/calculators/sss/sss-contribution-calculator-philippines"
          ctaLabel="Use the SSS contribution calculator"
        />
      </div>

      <div className={`${WRAP} pb-20 pt-[clamp(34px,5vw,48px)]`}>
        {/* FAQ */}
        <FaqSection faqs={sssContributionFaqs} />

        {/* Related */}
        <section className="mt-[clamp(34px,5vw,48px)]">
          <h2 className="mb-6 font-display text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-.02em] text-[#0E1525]">
            Related payroll tools and guides
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
            source="Social Security System (SSS) — Schedule of Contributions"
            sourceUrl="https://www.sss.gov.ph/sss/appmanager/pages.jsp?page=scheduleofcontribution"
            updatedAt={SSS_CONTRIBUTION_UPDATED_AT}
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
