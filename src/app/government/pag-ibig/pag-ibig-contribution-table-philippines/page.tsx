import Link from "next/link";
import {
  ArrowRight,
  Percent,
  Landmark,
  Coins,
  Wallet,
  Calendar,
  House,
  Shield,
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
  pagibigContributionMeta,
  pagibigContributionFaqs,
  PAGIBIG_CONTRIBUTION_UPDATED_AT,
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
const TAKE_HOME_HREF = "/calculators/tax/take-home-pay-calculator-philippines";

const structureCards: {
  label: string;
  value: string;
  sub: string;
  accent: boolean;
  icon: LucideIcon;
}[] = [
  { label: "EMPLOYEE SHARE USED", value: "1% – 2%", sub: "1% if salary ≤ ₱1,500, else 2%", accent: true, icon: Percent },
  { label: "EMPLOYER SHARE USED", value: "2%", sub: "Regardless of salary level", accent: true, icon: Landmark },
  { label: "SALARY CAP USED", value: "₱10,000.00", sub: "Maximum Monthly Salary Credit", accent: true, icon: Coins },
  { label: "TOTAL MONTHLY CONTRIBUTION", value: "Up to ₱400.00", sub: "₱200 employee + ₱200 employer (max)", accent: false, icon: Wallet },
  { label: "EFFECTIVE PERIOD", value: "Current schedule", sub: "Based on Pag-IBIG Fund guidelines", accent: false, icon: Calendar },
  { label: "SOURCE NOTE", value: "Pag-IBIG Fund", sub: "Official contribution guidelines", accent: false, icon: House },
];

const shareTable = [
  { comp: "₱1,500 and below", ee: "1% of salary", er: "2% of salary", total: "3% of salary", note: "Both shares computed on actual salary" },
  { comp: "Over ₱1,500 – ₱10,000", ee: "2% of salary", er: "2% of salary", total: "4% of salary", note: "Both shares computed on actual salary" },
  { comp: "Over ₱10,000", ee: "₱200 (capped)", er: "₱200 (capped)", total: "₱400 (capped)", note: "Contribution capped at ₱10,000 MSC" },
];

const whoPaysList = [
  { h: "Employee share", t: "is the part usually deducted from salary" },
  { h: "Employer share", t: "is the part paid separately by the employer" },
  { h: "Total contribution", t: "is the sum of both sides" },
  { h: "The payslip", t: "often shows only the employee-side deduction" },
];

const whoCards = [
  { title: "Employee Share", sub: "Deducted from your payslip", icon: Shield },
  { title: "Employer Share", sub: "Paid by your employer", icon: Landmark },
];

const capCards: {
  label: string;
  value: string;
  sub: string;
  tone: "plain" | "blue" | "amber";
}[] = [
  { label: "BELOW ₱1,500", value: "Employee 1%", sub: "Lower rate applies", tone: "plain" },
  { label: "₱1,500 – ₱10,000", value: "Employee 2%", sub: "Standard rate, actual salary", tone: "blue" },
  { label: "ABOVE ₱10,000", value: "Capped at ₱200.00", sub: "Contribution stops increasing", tone: "amber" },
];

const levelCards = [
  { title: "Salary below the cap", salary: 3_000, ee: 60, er: 60, note: "₱60 employee deduction shown on payslip" },
  { title: "Salary at the cap", salary: 10_000, ee: 200, er: 200, note: "₱200 employee deduction shown on payslip" },
  { title: "Salary above the cap", salary: 25_000, ee: 200, er: 200, note: "₱200 employee deduction — same as at the cap" },
];

const differList = [
  "Payroll systems may apply updated contribution settings not yet reflected in a simplified reference",
  "Compensation treatment may differ depending on how salary components are classified",
  "Timing differences between payroll cut-off and actual contribution remittance",
  "Company-specific payroll handling or rounding rules",
  "Updated Pag-IBIG circulars or contribution guidelines released after the schedule shown here",
];

const relatedPages: { title: string; href: string; icon: LucideIcon }[] = [
  { title: "Take-Home Pay Calculator", href: TAKE_HOME_HREF, icon: Wallet },
  { title: "Pag-IBIG Housing Loan Guide", href: "/government/pag-ibig/pag-ibig-housing-loan-guide", icon: House },
  { title: "Pag-IBIG MP2 Savings Guide", href: "/government/pag-ibig/pag-ibig-mp2-savings-guide", icon: Coins },
  { title: "PhilHealth Contribution Table", href: "/government/philhealth/philhealth-contribution-table-philippines", icon: HeartPulse },
  { title: "SSS Contribution Table", href: "/government/sss/sss-contribution-guide", icon: Shield },
  { title: "Withholding Tax Calculator", href: "/calculators/tax/withholding-tax-calculator-philippines", icon: Percent },
  { title: "Government Hub", href: "/government", icon: Landmark },
];

const SHARE_GRID = "grid grid-cols-[1.3fr_1fr_1fr_1fr_1.6fr]";
const SHARE_HEAD =
  "px-4 py-[13px] text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]";

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
        containerClassName={WRAP}
      />

      <div className={`${WRAP} space-y-5 pt-6`}>
        {/* Contribution structure */}
        <section className={CARD}>
          <h2 className={H2}>Pag-IBIG (HDMF) contribution structure 2026</h2>
          <p className="mt-[10px] mb-4 text-[16px] leading-[1.7] text-[#475069]">
            This section shows the contribution assumptions currently used by this
            page. Because payroll reference pages are year-sensitive, the
            contribution basis, cap, and employee-employer split should be
            verified against the latest official Pag-IBIG guidance.
          </p>
          <div className="grid gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
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
                    <div className="mt-1 text-[13px] text-[#8A93A6]">{c.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Employee/employer share table */}
        <section className={CARD}>
          <h2 className={H2}>Pag-IBIG employee and employer share table</h2>
          <p className="mt-[10px] mb-4 text-[16px] leading-[1.7] text-[#475069]">
            Check the employee share first if you want to match what usually
            appears on a payslip.
          </p>
          <div className="overflow-hidden rounded-[16px] border border-[#E7EBF3] bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)]">
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                <div className={`${SHARE_GRID} border-b border-[#E7EBF3] bg-[#F4F7FE]`}>
                  <div className={SHARE_HEAD}>Monthly Compensation</div>
                  <div className={SHARE_HEAD}>Employee</div>
                  <div className={SHARE_HEAD}>Employer</div>
                  <div className={SHARE_HEAD}>Total</div>
                  <div className={SHARE_HEAD}>Payroll Note</div>
                </div>
                {shareTable.map((r, i) => (
                  <div
                    key={r.comp}
                    className={`${SHARE_GRID} items-center ${
                      i < shareTable.length - 1 ? "border-b border-[#F0F3F8]" : ""
                    } ${i % 2 ? "bg-[#FAFBFE]" : "bg-white"}`}
                  >
                    <div className="px-4 py-[14px] text-[14px] text-[#0E1525]">
                      {r.comp}
                    </div>
                    <div className="px-4 py-[14px] text-[14px] font-semibold text-brand">
                      {r.ee}
                    </div>
                    <div className="px-4 py-[14px] text-[14px] text-[#5A6478]">
                      {r.er}
                    </div>
                    <div className="px-4 py-[14px] text-[14px] font-semibold text-[#0E1525]">
                      {r.total}
                    </div>
                    <div className="px-4 py-[14px] text-[13px] leading-[1.4] text-[#6B7488]">
                      {r.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-3 text-[13.5px] leading-[1.6] text-[#8A93A6]">
            Always verify the latest official Pag-IBIG contribution schedule if
            you need the exact current payroll basis.
          </p>
        </section>

        {/* Who pays */}
        <section className={CARD}>
          <h2 className={H2}>Who pays the Pag-IBIG contribution?</h2>
          <p className="mt-[10px] mb-4 text-[16px] leading-[1.7] text-[#475069]">
            For payroll users, one of the most important questions is whether the
            Pag-IBIG amount on the payslip is only the employee share or the full
            contribution. Here is how it works:
          </p>
          <ul className="mb-[18px] space-y-[11px]">
            {whoPaysList.map((w) => (
              <li key={w.h} className="flex items-start gap-3">
                <ArrowRight className="mt-[3px] size-[18px] shrink-0 text-brand" />
                <span className="text-[16px] leading-[1.55] text-[#344054]">
                  <strong className="text-[#0E1525]">{w.h}</strong> {w.t}
                </span>
              </li>
            ))}
          </ul>
          <div className="grid gap-[14px] sm:grid-cols-2">
            {whoCards.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="rounded-[16px] border border-[#EDF1F8] bg-[#F7F9FD] p-6 text-center"
                >
                  <span className="mx-auto mb-3 flex size-12 items-center justify-center rounded-[13px] bg-[#EAF0FF]">
                    <Icon className="size-[22px] text-brand" />
                  </span>
                  <div className="font-display text-[16px] font-semibold text-[#0E1525]">
                    {c.title}
                  </div>
                  <div className="my-1.5 font-display text-[22px] font-bold text-brand">
                    Up to ₱200.00
                  </div>
                  <div className="text-[13.5px] text-[#6B7488]">{c.sub}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Salary caps */}
        <section className={CARD}>
          <h2 className={H2}>How salary caps affect the deduction</h2>
          <p className="mt-[10px] mb-4 text-[16px] leading-[1.7] text-[#475069]">
            Pag-IBIG payroll deductions are easier to understand when the salary
            cap is explained clearly. The contribution is computed on monthly
            salary up to a maximum of ₱10,000.00. Once salary exceeds this cap,
            the contribution does not increase further — it stays at ₱200.00 for
            the employee share and ₱200.00 for the employer share.
          </p>
          <div className="grid gap-[14px] sm:grid-cols-3">
            {capCards.map((c) => {
              const tone =
                c.tone === "amber"
                  ? { wrap: "border-[#F6E2B0] bg-[#FFF8E8]", lab: "text-[#B7791F]", val: "text-[#7A5B12]" }
                  : c.tone === "blue"
                    ? { wrap: "border-[#C9D6F7] bg-[#EAF0FF]", lab: "text-brand", val: "text-brand" }
                    : { wrap: "border-[#E7EBF3] bg-white", lab: "text-[#6B7488]", val: "text-[#0E1525]" };
              return (
                <div
                  key={c.label}
                  className={`rounded-[16px] border-[1.5px] p-5 text-center ${tone.wrap}`}
                >
                  <div className={`text-[11.5px] font-bold tracking-[.07em] ${tone.lab}`}>
                    {c.label}
                  </div>
                  <div className={`my-[7px] font-display text-[17px] font-semibold ${tone.val}`}>
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

        {/* Per salary level */}
        <section className={CARD}>
          <h2 className={H2}>How much is Pag-IBIG contribution per salary level</h2>
          <p className="mt-[10px] mb-4 text-[16px] leading-[1.7] text-[#475069]">
            These examples help connect the reference table to actual payslip
            expectations.
          </p>
          <div className="grid gap-[14px] sm:grid-cols-3">
            {levelCards.map((p) => (
              <div
                key={p.title}
                className="overflow-hidden rounded-[16px] border border-[#EDF1F8] bg-[#F7F9FD]"
              >
                <div className="border-b border-[#E3E9F7] bg-[#EEF2FB] px-[18px] py-[14px] font-display text-[15px] font-semibold text-[#0E1525]">
                  {p.title}
                </div>
                <div className="px-[18px] py-4">
                  <Row label="Monthly Salary" value={formatPeso(p.salary)} />
                  <Row label="Employee Share" value={formatPeso(p.ee)} strong />
                  <Row label="Employer Share" value={formatPeso(p.er)} muted />
                  <div className="mt-1 flex items-center justify-between border-t border-[#E7EBF3] pt-[11px]">
                    <span className="text-[14px] font-bold text-[#0E1525]">
                      Total Contribution
                    </span>
                    <span className="font-mono text-[14px] font-bold tabular-nums text-[#0E1525]">
                      {formatPeso(p.ee + p.er)}
                    </span>
                  </div>
                  <div className="mt-[10px] text-[12.5px] leading-[1.5] text-[#8A93A6]">
                    {p.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Where it appears */}
        <section className={CARD}>
          <h2 className={H2}>Where Pag-IBIG appears on payroll</h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            Pag-IBIG is usually one of the standard government deductions shown on
            a payslip together with SSS, PhilHealth, and withholding tax. The
            employee share is typically listed as a separate line item in the
            deductions section. Understanding that Pag-IBIG is only part of the
            full payroll deduction picture helps when comparing it against other
            deductions.
          </p>
          <p className="mt-[14px] text-[16px] leading-[1.7] text-[#475069]">
            If you want to see Pag-IBIG together with other common deductions, use
            the{" "}
            <Link href={TAKE_HOME_HREF} className="font-bold text-brand">
              Take-Home Pay Calculator
            </Link>{" "}
            next.
          </p>
        </section>

        {/* Why differ */}
        <section className={CARD}>
          <h2 className={H2}>Why your actual Pag-IBIG deduction may differ</h2>
          <p className="mt-[10px] mb-4 text-[16px] leading-[1.7] text-[#475069]">
            Actual payroll deductions may differ from a simplified reference page
            because payroll systems may apply updated contribution settings,
            compensation treatment, timing differences, or company-specific
            payroll handling. This page should be used as a practical reference,
            not a replacement for official payroll computation.
          </p>
          <ul className="space-y-3">
            {differList.map((d) => (
              <li key={d} className="flex items-start gap-3">
                <ArrowRight className="mt-[3px] size-[18px] shrink-0 text-brand" />
                <span className="text-[16px] leading-[1.55] text-[#344054]">
                  {d}
                </span>
              </li>
            ))}
          </ul>
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
          <h2 className="mb-2 font-display text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-.02em] text-[#0E1525]">
            Related payroll and Pag-IBIG pages
          </h2>
          <p className="mb-[18px] text-[15px] text-[#5A6478]">
            After checking the table, you may also want to review these related
            pages.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                  <span className="flex-1 text-[15px] font-bold leading-[1.3] text-[#0E1525]">
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
            sourceUrl="https://www.pagibigfund.gov.ph"
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
}: {
  label: string;
  value: string;
  strong?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#F0F3F8] py-[9px]">
      <span
        className={`text-[14px] ${
          strong ? "font-semibold text-[#475069]" : "text-[#6B7488]"
        }`}
      >
        {label}
      </span>
      <span
        className={`font-mono text-[14px] tabular-nums ${
          strong ? "font-bold text-brand" : muted ? "text-[#5A6478]" : "text-[#0E1525]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
