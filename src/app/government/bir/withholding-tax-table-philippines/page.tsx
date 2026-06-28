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
import { GOVERNMENT_DISCLAIMER } from "@/lib/constants";
import { WithholdingTaxTables } from "@/components/government/withholding-tax-tables";
import {
  withholdingTaxTableMeta,
  withholdingTaxTableFaqs,
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

const whyDifferent = [
  "employers may compute on taxable compensation after mandatory contributions",
  "supplementary compensation may be included separately",
  "more detailed payroll rules and rounding may apply",
  "RR 11-2018 discusses both regular and supplementary compensation methods",
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
        variant="dark"
      />

    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Overview + jump links */}
      <section className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
        <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
          2026 BIR Withholding Tax Table
        </h2>
        <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
          The TRAIN Law (Republic Act 10963) restructured Philippine income tax
          brackets, with the current lower-rate schedule effective January 1,
          2023. Under this schedule, annual taxable income up to ₱250,000 is
          exempt from withholding tax, while income above that is taxed
          progressively from 15% to 35%. The BIR publishes a separate table for
          each payroll frequency so employers can withhold the right amount each
          pay period.
        </p>
        <nav aria-label="On this page" className="mt-6">
          <p className="text-[14px] font-semibold text-gray-500">On this page</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {[
              { label: "Monthly table", href: "#monthly-table" },
              { label: "Semi-monthly table", href: "#semi-monthly-table" },
              { label: "Weekly table", href: "#weekly-table" },
              { label: "Daily table", href: "#daily-table" },
              { label: "Annual table", href: "#annual-table" },
              { label: "How to compute", href: "#how-to-compute" },
              { label: "Calculator", href: "#calculator" },
              { label: "FAQs", href: "#faqs" },
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[14px] font-medium text-gray-500 transition-colors hover:border-brand hover:text-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* Static, crawlable per-frequency tables */}
      <div className="mt-12">
        <WithholdingTaxTables />
      </div>

      {/* How to Compute */}
      <section id="how-to-compute" className="mt-6 scroll-mt-20 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
        <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
          How to Compute Withholding Tax Using the BIR Table
        </h2>
        <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
          Subtract your SSS, PhilHealth, and Pag-IBIG employee shares (and any
          non-taxable benefits) from gross pay to get taxable compensation, then
          match it to the row for your payroll frequency. Here is an example
          using the monthly table with ₱35,000 of taxable compensation.
        </p>
        <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-dashed border-gray-200 bg-gray-50 px-6 py-4">
            <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
              ₱35,000 Monthly Taxable Compensation
            </h3>
          </div>
          <div className="px-6 py-4">
            <dl className="space-y-2.5 text-[16px] leading-[1.6]">
              <div className="flex justify-between">
                <dt className="text-gray-400">Monthly taxable compensation</dt>
                <dd className="font-mono tabular-nums text-gray-500">₱35,000</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Matching monthly bracket</dt>
                <dd className="font-mono tabular-nums text-gray-500">₱33,333 – ₱66,666</dd>
              </div>
              <div className="my-3 border-t border-dashed border-gray-200" />
              <div className="flex justify-between">
                <dt className="text-gray-400">Prescribed tax</dt>
                <dd className="font-mono tabular-nums text-gray-500">₱1,875</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Excess over ₱33,333</dt>
                <dd className="font-mono tabular-nums text-gray-500">₱1,667</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Additional tax (20%)</dt>
                <dd className="font-mono tabular-nums text-gray-500">₱333.40</dd>
              </div>
            </dl>
          </div>
          <div className="border-t border-dashed border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex justify-between text-[16px] leading-[1.6]">
              <span className="font-semibold text-gray-500">Prescribed Monthly Withholding</span>
              <span className="font-mono tabular-nums font-bold text-brand">₱2,208.40</span>
            </div>
          </div>
        </div>
        <p className="mt-3 text-[14px] text-gray-400">
          Actual payroll withholding may differ if taxable compensation is
          adjusted for supplementary compensation, allowances, rounding, or
          year-end annualization. RR 11-2018 notes that more detailed
          computation methods may apply in some cases.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {whyDifferent.map((item) => (
            <span
              key={item}
              className="inline-flex items-start gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-[14px] text-gray-400"
            >
              <Info className="mt-0.5 size-4 shrink-0 text-gray-300" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Use the Calculator */}
      <section id="calculator" className="mt-6 scroll-mt-20 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
        <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
          Use the Withholding Tax Calculator
        </h2>
        <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
          Skip the manual lookup. The Withholding Tax Calculator lets you pick
          your pay frequency (monthly, semi-monthly, weekly, or daily), deducts
          your SSS, PhilHealth, and Pag-IBIG employee shares automatically (or
          enter your own), handles taxable and tax-exempt allowances, and shows
          your withholding tax and net pay for the period, the month, and the
          year.
        </p>
        <div className="mt-6">
          <Link
            href="/calculators/tax/withholding-tax-calculator-philippines"
            className="inline-flex items-center rounded-full bg-brand px-6 py-3 text-[14px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
          >
            Open the Withholding Tax Calculator
          </Link>
        </div>
      </section>

      {/* 2025 vs 2026 */}
      <section className="mt-6 scroll-mt-20 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
        <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
          Is the 2026 Withholding Tax Table Different From 2025?
        </h2>
        <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
          No. The 2026 withholding tax table is identical to 2025. The TRAIN
          Law&apos;s lower second-phase rates took effect on January 1, 2023 and
          have not changed since, so the 2023, 2024, 2025, and 2026 tables are
          the same. If you searched for a &ldquo;new 2026 BIR tax table,&rdquo;
          this is the schedule you are looking for — there is no separate 2026
          rate change for compensation income.
        </p>
        <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
          The only thing to double-check is whether you are looking at the
          current table (2023 onwards) rather than the older 2018–2022 table,
          which used higher 20%–32% middle rates.
        </p>
      </section>

      {/* Common Mistakes */}
      <section className="mt-6 scroll-mt-20 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
        <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
          Common Withholding Tax Mistakes
        </h2>
        <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
          The most frequent errors when reading the BIR withholding tax table:
        </p>
        <ul className="mt-4 space-y-3">
          {commonMistakes.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-[16px] leading-[1.6] text-[#5A6478]"
            >
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-brand" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>

      <div className="mx-auto max-w-6xl px-4 pt-0 pb-20 sm:px-6 lg:px-8">
      {/* FAQ */}
      <div id="faqs" className="mt-16 scroll-mt-20">
        <FaqSection faqs={withholdingTaxTableFaqs} />
      </div>

      {/* Related Tax Pages and Payroll Tools */}
      <section className="mt-6 scroll-mt-20">
        <h2 className="mb-6 text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
          Related tax pages and payroll tools
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
      <section className="mt-6 scroll-mt-20 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
        <h2 className="mb-6 text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
          Official BIR Source and Freshness
        </h2>
        <SourceCitation
          source="Bureau of Internal Revenue (BIR) — TRAIN Law (RA 10963), RR 11-2018, Annex E"
          sourceUrl="https://www.bir.gov.ph/tax-information/tax-rates"
          updatedAt={WITHHOLDING_TAX_TABLE_UPDATED_AT}
          reviewCadence="Every 90 days"
        />
      </section>

      {/* Disclaimer */}
      <div className="mt-4">
        <DisclaimerBox text={GOVERNMENT_DISCLAIMER} />
      </div>
    </div>
    </>
  );
}
