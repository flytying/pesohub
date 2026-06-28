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
  taxExemptions,
  WITHHOLDING_TAX_TABLE_UPDATED_AT,
} from "@/data/government/withholding-tax-table";
import { WithholdingTaxTables } from "@/components/government/withholding-tax-tables";

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

const jumpLinks = [
  { label: "Monthly table", href: "#monthly-table" },
  { label: "Semi-monthly table", href: "#semi-monthly-table" },
  { label: "Weekly table", href: "#weekly-table" },
  { label: "Daily table", href: "#daily-table" },
  { label: "Annual table", href: "#annual-table" },
  { label: "How to compute", href: "#how-to-compute" },
  { label: "Calculator", href: "#calculator" },
  { label: "FAQs", href: "#faqs" },
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
        containerClassName={WRAP}
      />

      <div className={`${WRAP} space-y-5 pt-6`}>
        {/* Jump links */}
        <nav
          aria-label="On this page"
          className="rounded-[16px] border border-[#E7EBF3] bg-white p-[clamp(16px,2.4vw,22px)]"
        >
          <p className="mb-3 text-[12px] font-bold uppercase tracking-[.05em] text-[#8A93A6]">
            On this page
          </p>
          <ul className="flex flex-wrap gap-2">
            {jumpLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-flex rounded-[9px] border border-[#E7EBF3] bg-[#FBFCFE] px-[13px] py-[8px] text-[14px] font-semibold text-[#344054] transition-colors hover:border-[#C3D0F2] hover:text-brand"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Overview */}
        <section id="tax-table" className={`${CARD} scroll-mt-24`}>
          <h2 className={H2}>2026 BIR Withholding Tax Table</h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            View the current and previous withholding tax tables for compensation
            income. The current table is effective January 1, 2023 onwards under
            the TRAIN Law (RA 10963); the previous table was in effect from
            January 1, 2018 to December 31, 2022. Each payroll frequency —
            monthly, semi-monthly, weekly, daily, and the annual income tax
            brackets — is listed in full below.
          </p>
        </section>

        {/* Per-frequency tables (crawlable: each its own H2 + anchor) */}
        <WithholdingTaxTables />

        {/* Worked example */}
        <section id="how-to-compute" className={`${CARD} scroll-mt-24`}>
          <h2 className={H2}>
            How to Compute Withholding Tax Using the BIR Table
          </h2>
          <p className="mt-[10px] mb-4 text-[16px] leading-[1.7] text-[#475069]">
            Here is a simple example using the current monthly withholding tax
            table.
          </p>
          <div className="overflow-hidden rounded-[16px] border border-[#EDF1F8] bg-white">
            <div className="bg-[#EEF2FB] px-5 py-[15px] font-display text-[15px] font-semibold text-[#0E1525]">
              ₱35,000 monthly taxable compensation
            </div>
            <div className="px-5">
              <ExampleRow label="Monthly taxable compensation" value="₱35,000" />
              <ExampleRow
                label="Matching monthly bracket"
                value="₱33,333 – ₱66,666"
              />
              <ExampleRow label="Prescribed tax" value="₱1,875.00" />
              <ExampleRow label="Excess over ₱33,333" value="₱1,667.00" />
              <ExampleRow label="Additional tax (20%)" value="₱333.40" last />
            </div>
            <div className="flex items-center justify-between bg-[#EEF2FB] px-5 py-[15px]">
              <span className="text-[15px] font-bold text-[#0E1525]">
                Est. monthly withholding
              </span>
              <span className="font-mono text-[17px] font-bold tabular-nums text-brand">
                ₱2,208.40
              </span>
            </div>
          </div>
          <p className="mt-3 text-[13.5px] leading-[1.6] text-[#8A93A6]">
            This is a simplified reference example. Actual payroll withholding may
            differ if taxable compensation is adjusted for mandatory deductions,
            allowances, supplementary compensation, or payroll-specific
            computation rules. RR 11–2018 notes that supplementary compensation
            and exceptional computations can affect the result.
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

        {/* Calculator */}
        <section id="calculator" className={`${CARD} scroll-mt-24`}>
          <h2 className={H2}>Use the Withholding Tax Calculator</h2>
          <p className="mt-[10px] mb-[18px] text-[16px] leading-[1.7] text-[#475069]">
            Skip the manual lookup. The Withholding Tax Calculator deducts your
            SSS, PhilHealth, and Pag-IBIG shares (automatically or with your own
            figures), handles taxable and tax-exempt allowances, and shows your
            withholding tax and net pay for the period, the month, and the year.
          </p>
          <GovCtaBanner
            title="Want to compute your exact withholding tax?"
            description="Enter your gross pay and pay frequency — the calculator nets out mandatory contributions and applies the matching BIR table for you."
            href="/calculators/tax/withholding-tax-calculator-philippines"
            ctaLabel="Use the withholding tax calculator"
          />
        </section>

        {/* 2025 vs 2026 */}
        <section id="different-2025" className={`${CARD} scroll-mt-24`}>
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
        <section id="mistakes" className={`${CARD} scroll-mt-24`}>
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

      <div className={`${WRAP} pb-20 pt-[clamp(34px,5vw,48px)]`}>
        {/* FAQ */}
        <div id="faqs" className="scroll-mt-24">
          <FaqSection faqs={withholdingTaxTableFaqs} />
        </div>

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
        <section id="source" className="mt-[clamp(34px,5vw,48px)] scroll-mt-24">
          <h2 className="mb-6 font-display text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-.02em] text-[#0E1525]">
            Official BIR Source and Freshness
          </h2>
          <SourceCitation
            source="Bureau of Internal Revenue (BIR) — TRAIN Law (RA 10963), RR 11-2018, Annex E"
            sourceUrl="https://www.bir.gov.ph/tax-information/tax-rates"
            updatedAt={WITHHOLDING_TAX_TABLE_UPDATED_AT}
            reviewCadence="Every 90 days"
          />
          <div className="mt-4">
            <DisclaimerBox text={GOVERNMENT_DISCLAIMER} />
          </div>
        </section>
      </div>
    </>
  );
}

function ExampleRow({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-[13px] ${
        last ? "" : "border-b border-[#F0F3F8]"
      }`}
    >
      <span className="text-[15px] text-[#475069]">{label}</span>
      <span className="font-mono text-[14px] tabular-nums text-[#0E1525]">
        {value}
      </span>
    </div>
  );
}
