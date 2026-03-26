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
import { WithholdingTaxTabs } from "@/components/government/withholding-tax-tabs";
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

const relatedPages = [
  {
    title: "Withholding Tax Calculator",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Withholding Tax Guide",
    href: "/guides/tax/how-withholding-tax-works-philippines",
    icon: BookOpen,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: BarChart3,
  },
  {
    title: "Calculators Hub",
    href: "/calculators",
    icon: FileText,
  },
  {
    title: "Government Hub",
    href: "/government",
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
      {/* Withholding Tax Tables */}
      <section>
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Withholding Tax Table Reference
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          View the current and previous withholding tax tables for
          compensation income. The current table is effective January 1, 2023
          onwards under the TRAIN Law (RA 10963). The previous table was in
          effect from January 1, 2018 to December 31, 2022.
        </p>
        <div className="mt-4">
          <WithholdingTaxTabs />
        </div>
        <p className="mt-3 text-[14px] text-gray-400">
          Source: TRAIN Law (RA 10963), BIR Revenue Regulations No. 11-2018,
          Annex E.
        </p>
      </section>

      {/* Worked Example */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Worked Example: Monthly Salary Estimate
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          Here is a simple example using the current monthly withholding tax
          table.
        </p>
        <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-dashed border-gray-200 bg-gray-50 px-6 py-4">
            <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
              ₱35,000 Monthly Taxable Compensation
            </h3>
          </div>
          <div className="px-6 py-4">
            <dl className="space-y-2.5 text-[16px] leading-[22px]">
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
            <div className="flex justify-between text-[16px] leading-[22px]">
              <span className="font-semibold text-gray-500">Est. Monthly Withholding</span>
              <span className="font-mono tabular-nums font-bold text-brand">₱2,208.40</span>
            </div>
          </div>
        </div>
        <p className="mt-3 text-[14px] text-gray-400">
          This is a simplified reference example. Actual payroll withholding
          may differ if taxable compensation is adjusted for mandatory
          deductions, allowances, supplementary compensation, or
          payroll-specific computation rules. RR 11-2018 notes that
          supplementary compensation and exceptional computations can affect
          the result.
        </p>
      </section>

      {/* Why Your Actual Payroll Withholding May Differ */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Why Your Actual Payroll Withholding May Differ
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          The table is a strong reference, but actual payroll withholding can
          differ because:
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

    </div>

      {/* Calculator CTA */}
      <section className="bg-surface-tertiary py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Want a Faster Estimate?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-[22px] text-gray-400">
            If you already know your salary and want a quick estimate, use
            the Withholding Tax Calculator to see your monthly withholding
            tax, annual tax, and tax-only take-home pay faster.
          </p>
          <div className="mt-6">
            <Link
              href="/calculators/tax/withholding-tax-calculator-philippines"
              className="inline-flex items-center rounded-full bg-brand px-6 py-3 text-[14px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
            >
              USE THE WITHHOLDING TAX CALCULATOR
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-0 pb-20 sm:px-6 lg:px-8">
      {/* FAQ */}
      <div className="mt-16">
        <FaqSection faqs={withholdingTaxTableFaqs} />
      </div>

      {/* Related Tax Pages and Payroll Tools */}
      <section className="mt-16">
        <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
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
      <div className="mt-16">
        <SourceCitation
          source="Bureau of Internal Revenue (BIR) — TRAIN Law (RA 10963), RR 11-2018, Annex E"
          sourceUrl="https://www.bir.gov.ph/tax-information/tax-rates"
          updatedAt={WITHHOLDING_TAX_TABLE_UPDATED_AT}
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
