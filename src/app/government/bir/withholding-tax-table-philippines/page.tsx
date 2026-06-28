import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle,
  BookOpen,
  BarChart3,
  Landmark,
  FileText,
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
import { GOVERNMENT_DISCLAIMER } from "@/lib/constants";
import {
  withholdingTaxTableMeta,
  withholdingTaxTableFaqs,
  payrollPeriodTables,
  taxExemptions,
  type TaxBracketRow,
  WITHHOLDING_TAX_TABLE_UPDATED_AT,
} from "@/data/government/withholding-tax-table";

export const metadata = generatePageMetadata({
  title: withholdingTaxTableMeta.metaTitle,
  description: withholdingTaxTableMeta.metaDescription,
  slug: withholdingTaxTableMeta.slug,
  updatedAt: WITHHOLDING_TAX_TABLE_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "Withholding Tax Table" },
];

const WRAP = "mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)]";
const CARD =
  "rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]";
const H2 =
  "font-display text-[clamp(20px,2.2vw,24px)] font-semibold tracking-[-.02em] text-[#0E1525]";

// Rate badge color scale, mirrored from the Withholding Tax Guide prototype.
const RATE_SCALE: Record<number, { text: string; bg: string }> = {
  0: { text: "#5B6678", bg: "#EEF1F7" },
  15: { text: "#1E5FD0", bg: "#E4EDFB" },
  20: { text: "#3D49C4", bg: "#E7E9FB" },
  25: { text: "#6D4DE0", bg: "#EDE8FC" },
  30: { text: "#B7791F", bg: "#FBF0DC" },
  35: { text: "#C2484D", bg: "#FBE6E7" },
};

function RateBadge({ rate }: { rate: number }) {
  const sc = RATE_SCALE[rate] ?? { text: "#0E1525", bg: "#EEF1F7" };
  return (
    <span
      className="inline-flex font-display text-[12px] font-bold rounded-[7px] px-[9px] py-[3px]"
      style={{ color: sc.text, backgroundColor: sc.bg }}
    >
      {rate}%
    </span>
  );
}

const TABLE_SECTIONS: {
  id: string;
  anchor: string;
  heading: string;
  intro: string;
}[] = [
  {
    id: "monthly",
    anchor: "monthly-table",
    heading: "Monthly Withholding Tax Table 2026 Philippines",
    intro:
      "For employees paid once a month. Match your monthly taxable compensation (gross pay less SSS, PhilHealth, and Pag-IBIG) to the row below.",
  },
  {
    id: "semi-monthly",
    anchor: "semi-monthly-table",
    heading: "Semi-Monthly Withholding Tax Table 2026 Philippines",
    intro:
      "For employees paid twice a month (for example, on the 15th and the 30th). Each cut-off uses half-month taxable compensation.",
  },
  {
    id: "weekly",
    anchor: "weekly-table",
    heading: "Weekly Withholding Tax Table 2026 Philippines",
    intro: "For employees paid every week.",
  },
  {
    id: "daily",
    anchor: "daily-table",
    heading: "Daily Withholding Tax Table 2026 Philippines",
    intro: "For employees paid on a daily basis.",
  },
  {
    id: "annual",
    anchor: "annual-table",
    heading: "Annual Income Tax Brackets 2026",
    intro:
      "The underlying annual TRAIN Law brackets that the payroll-period tables are derived from.",
  },
];

const commonMistakes = [
  "Using gross salary instead of taxable compensation — subtract SSS, PhilHealth, and Pag-IBIG first.",
  "Reading the wrong payroll-frequency table (e.g. using the monthly table for semi-monthly pay).",
  "Using the old 2018–2022 table instead of the current 2023-onwards schedule.",
  "Forgetting that 13th month pay and de minimis benefits are tax-exempt within limits.",
  "Assuming the table already nets out contributions — it applies to taxable compensation only.",
  "Skipping year-end annualization, which can create a tax refund or extra tax due in December.",
];

const relatedPages = [
  {
    title: "Withholding Tax Calculator",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "How Withholding Tax Works",
    href: "/guides/tax/how-withholding-tax-works-philippines",
    icon: BookOpen,
  },
  {
    title: "How to Compute Withholding Tax",
    href: "/blog/how-to-compute-withholding-tax-philippines",
    icon: FileText,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: BarChart3,
  },
  {
    title: "SSS Contribution Calculator",
    href: "/calculators/sss/sss-contribution-calculator-philippines",
    icon: Landmark,
  },
];

function TaxTable({ brackets }: { brackets: TaxBracketRow[] }) {
  return (
    <div className="mt-4 overflow-hidden rounded-[16px] border border-[#E7EBF3] bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)]">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#E0E6F2] bg-[#F4F7FE]">
              <th className="whitespace-nowrap px-[18px] py-[13px] text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                Compensation Range
              </th>
              <th className="whitespace-nowrap px-[18px] py-[13px] text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                Prescribed Withholding Tax
              </th>
              <th className="whitespace-nowrap px-[18px] py-[13px] text-right text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {brackets.map((row, i) => (
              <tr
                key={i}
                className={`border-b border-[#F0F3F8] last:border-b-0 ${
                  i % 2 === 1 ? "bg-[#FAFBFE]" : ""
                }`}
              >
                <td className="px-[18px] py-[13px] font-mono text-[12.5px] tabular-nums font-medium text-[#0E1525]">
                  {row.range}
                </td>
                <td className="px-[18px] py-[13px] font-mono text-[12.5px] tabular-nums text-[#475069]">
                  {row.taxDue}
                </td>
                <td className="px-[18px] py-[13px] text-right">
                  <RateBadge rate={row.rate} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function WithholdingTaxTablePage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: withholdingTaxTableMeta.metaTitle,
          description: withholdingTaxTableMeta.metaDescription,
          updatedAt: WITHHOLDING_TAX_TABLE_UPDATED_AT,
          slug: withholdingTaxTableMeta.slug,
        })}
      />

      <PageHero
        title={withholdingTaxTableMeta.title}
        description={withholdingTaxTableMeta.directAnswer}
        badge={WITHHOLDING_TAX_TABLE_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
        containerClassName={WRAP}
      />

      <div className={`${WRAP} space-y-5 pt-6`}>
        {/* Overview */}
        <section className={CARD}>
          <h2 className={H2}>2026 BIR Withholding Tax Table</h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            The TRAIN Law (Republic Act 10963) restructured Philippine income tax
            brackets, with the current lower-rate schedule effective January 1,
            2023. Under this schedule, annual taxable income up to ₱250,000 is
            exempt from withholding tax, while income above that is taxed
            progressively from 15% to 35%. The BIR publishes a separate table for
            each payroll frequency so employers can withhold the right amount each
            pay period.
          </p>
        </section>

        {/* Per-frequency tables */}
        {TABLE_SECTIONS.map((section) => {
          const period = payrollPeriodTables.find((p) => p.id === section.id);
          if (!period) return null;
          return (
            <section
              key={section.id}
              id={section.anchor}
              className={`${CARD} scroll-mt-20`}
            >
              <h2 className={H2}>{section.heading}</h2>
              <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
                {section.intro}
              </p>
              <TaxTable brackets={period.current} />
            </section>
          );
        })}

        {/* How to compute */}
        <section id="how-to-compute" className={`${CARD} scroll-mt-20`}>
          <h2 className={H2}>
            How to Compute Withholding Tax Using the BIR Table
          </h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            Subtract your SSS, PhilHealth, and Pag-IBIG employee shares (and any
            non-taxable benefits) from gross pay to get taxable compensation, then
            match it to the row for your payroll frequency. Here is an example
            using the monthly table with ₱35,000 of taxable compensation.
          </p>
          <div className="mt-4 rounded-[16px] border border-[#EDF1F8] bg-[#F7F9FD] p-5">
            <div className="mb-3 font-display text-[16px] font-semibold text-[#0E1525]">
              ₱35,000 Monthly Taxable Compensation
            </div>
            <dl className="space-y-[10px]">
              <ComputeRow
                label="Monthly taxable compensation"
                value="₱35,000"
              />
              <ComputeRow
                label="Matching monthly bracket"
                value="₱33,333 – ₱66,666"
              />
              <div className="border-t border-dashed border-[#D9E0EC]" />
              <ComputeRow label="Prescribed tax" value="₱1,875" />
              <ComputeRow label="Excess over ₱33,333" value="₱1,667" />
              <ComputeRow label="Additional tax (20%)" value="₱333.40" />
              <div className="border-t border-dashed border-[#D9E0EC]" />
              <div className="flex items-center justify-between pt-[2px]">
                <span className="text-[14px] font-semibold text-[#475069]">
                  Prescribed Monthly Withholding
                </span>
                <span className="font-mono text-[15px] font-bold tabular-nums text-brand">
                  ₱2,208.40
                </span>
              </div>
            </dl>
          </div>
          <p className="mt-3 text-[13.5px] leading-[1.6] text-[#8A93A6]">
            Actual payroll withholding may differ if taxable compensation is
            adjusted for supplementary compensation, allowances, rounding, or
            year-end annualization. RR 11-2018 notes that more detailed
            computation methods may apply in some cases.
          </p>
        </section>

        {/* Tax-exempt income */}
        <section className={CARD}>
          <h2 className={H2}>Income Exempt From Withholding Tax</h2>
          <p className="mt-[10px] mb-4 text-[16px] leading-[1.7] text-[#475069]">
            These items are excluded from taxable compensation before the
            withholding tax table is applied:
          </p>
          <ul className="space-y-3">
            {taxExemptions.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="mt-[3px] size-[18px] shrink-0 text-[#0E9F6E]" />
                <span className="text-[16px] leading-[1.55] text-[#344054]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* 2025 vs 2026 */}
        <section className={CARD}>
          <h2 className={H2}>
            Is the 2026 Withholding Tax Table Different From 2025?
          </h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            No. The 2026 withholding tax table is identical to 2025. The TRAIN
            Law&apos;s lower second-phase rates took effect on January 1, 2023 and
            have not changed since, so the 2023, 2024, 2025, and 2026 tables are
            the same. If you searched for a &ldquo;new 2026 BIR tax table,&rdquo;
            this is the schedule you are looking for — there is no separate 2026
            rate change for compensation income.
          </p>
          <p className="mt-[14px] text-[16px] leading-[1.7] text-[#475069]">
            The only thing to double-check is whether you are looking at the
            current table (2023 onwards) rather than the older 2018–2022 table,
            which used higher 20%–32% middle rates.
          </p>
        </section>

        {/* Common mistakes */}
        <section className={CARD}>
          <h2 className={H2}>Common Withholding Tax Mistakes</h2>
          <p className="mt-[10px] mb-4 text-[16px] leading-[1.7] text-[#475069]">
            The most frequent errors when reading the BIR withholding tax table:
          </p>
          <ul className="space-y-3">
            {commonMistakes.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <ArrowRight className="mt-[3px] size-[18px] shrink-0 text-brand" />
                <span className="text-[16px] leading-[1.55] text-[#344054]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* CTA */}
      <div className={`${WRAP} pt-[clamp(28px,4vw,40px)]`}>
        <GovCtaBanner
          title="Want to compute your exact withholding tax?"
          description="Skip the manual lookup. The Withholding Tax Calculator deducts your SSS, PhilHealth, and Pag-IBIG shares, handles allowances, and shows your withholding tax and net pay for the period, the month, and the year."
          href="/calculators/tax/withholding-tax-calculator-philippines"
          ctaLabel="Use the withholding tax calculator"
        />
      </div>

      <div className={`${WRAP} pb-20 pt-[clamp(34px,5vw,48px)]`}>
        {/* FAQ */}
        <FaqSection faqs={withholdingTaxTableFaqs} />

        {/* Related */}
        <section className="mt-[clamp(34px,5vw,48px)]">
          <h2 className="mb-6 font-display text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-.02em] text-[#0E1525]">
            Related tax pages and payroll tools
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
            source="Bureau of Internal Revenue (BIR) — TRAIN Law (RA 10963), RR 11-2018, Annex E"
            sourceUrl="https://www.bir.gov.ph/tax-information/tax-rates"
            updatedAt={WITHHOLDING_TAX_TABLE_UPDATED_AT}
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

function ComputeRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[14px] text-[#6B7488]">{label}</span>
      <span className="font-mono text-[14px] tabular-nums text-[#0E1525]">
        {value}
      </span>
    </div>
  );
}
