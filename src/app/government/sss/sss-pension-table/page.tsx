import Link from "next/link";
import { Calculator, ArrowRight, Info } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
import { SourceCitation } from "@/components/shared/source-citation";
// import { AdPlaceholder } from "@/components/ads/ad-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema-markup";
import { formatPeso } from "@/lib/formatters";
import { GOVERNMENT_DISCLAIMER } from "@/lib/constants";
import { pensionFormulas } from "@/data/guides/sss-pension-guide";
import {
  sssPensionTableMeta,
  pensionEstimates,
  eligibilityRequirements,
  sssPensionTableFaqs,
  SSS_PENSION_TABLE_UPDATED_AT,
} from "@/data/government/sss-pension-table";

export const metadata = generatePageMetadata({
  title: sssPensionTableMeta.metaTitle,
  description: sssPensionTableMeta.metaDescription,
  slug: sssPensionTableMeta.slug,
  updatedAt: SSS_PENSION_TABLE_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "SSS Pension Table" },
];

const memberTypes = [
  {
    title: "Employed members",
    description: "private sector employees whose employers remit SSS contributions",
  },
  {
    title: "Self-employed members",
    description: "freelancers, business owners, and professionals who pay their own contributions",
  },
  {
    title: "Voluntary members",
    description: "separated employees, overseas Filipino workers (OFWs), and non-working spouses who continue contributing",
  },
];

const relatedContent = [
  {
    title: "SSS Pension Calculator",
    href: "/calculators/retirement/sss-pension-calculator",
    icon: Calculator,
  },
];

export default function SSSPensionTablePage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: sssPensionTableMeta.metaTitle,
          description: sssPensionTableMeta.metaDescription,
          updatedAt: SSS_PENSION_TABLE_UPDATED_AT,
          slug: sssPensionTableMeta.slug,
        })}
      />

      <PageHero
        title={sssPensionTableMeta.title}
        description={sssPensionTableMeta.directAnswer}
        badge={SSS_PENSION_TABLE_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Pension Estimate Table */}
      <section>
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Estimated Monthly Pension by Salary Credit & Years
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          This table shows estimated monthly pension amounts based on your Average
          Monthly Salary Credit (AMSC) and total Credited Years of Service (CYS).
          The highest of the three SSS pension formulas is used.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">MSC</TableHead>
                <TableHead className="text-right whitespace-nowrap">10 yrs</TableHead>
                <TableHead className="text-right whitespace-nowrap">15 yrs</TableHead>
                <TableHead className="text-right whitespace-nowrap">20 yrs</TableHead>
                <TableHead className="text-right whitespace-nowrap">25 yrs</TableHead>
                <TableHead className="text-right whitespace-nowrap">30 yrs</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pensionEstimates.map((row) => (
                <TableRow key={row.monthlySalaryCredit}>
                  <TableCell className="font-medium text-[16px] whitespace-nowrap">
                    {formatPeso(row.monthlySalaryCredit)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-[16px]">
                    {formatPeso(row.pensionAt10Years)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-[16px]">
                    {formatPeso(row.pensionAt15Years)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-[16px]">
                    {formatPeso(row.pensionAt20Years)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-[16px]">
                    {formatPeso(row.pensionAt25Years)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-[16px] font-medium">
                    {formatPeso(row.pensionAt30Years)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 text-[14px] text-gray-400">
          Estimates based on the SSS pension formula. Actual pension may vary based on
          contribution history and average monthly salary credit.
        </p>
      </section>

      {/* Three Pension Formulas */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          The Three SSS Pension Formulas
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          SSS computes your pension using all three formulas and gives you the
          highest amount.
        </p>
        <div className="mt-6 space-y-4">
          {pensionFormulas.map((formula) => (
            <div key={formula.label} className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                {formula.label}
              </h3>
              <p className="mt-2 font-mono text-[16px] font-medium text-gray-500">{formula.formula}</p>
              <p className="mt-2 text-[16px] leading-[22px] text-gray-400">{formula.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* <AdPlaceholder slot="gov-sss-pension-mid" className="my-8" /> */}

      {/* Who It Applies To */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Who It Applies To
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          The SSS retirement pension applies to all SSS members who have reached
          retirement age (60 for optional, 65 for mandatory) and have made at least
          120 monthly contributions (10 years).
        </p>
        <p className="mt-3 text-[16px] leading-[22px] text-gray-400">This includes:</p>
        <ul className="mt-4 space-y-3">
          {memberTypes.map((member) => (
            <li key={member.title} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
              <ArrowRight className="size-4 shrink-0 text-gray-300" />
              <span><strong className="text-gray-500">{member.title}</strong> — {member.description}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          Members who do not meet the minimum 120 contributions will receive a
          lump-sum benefit instead of a monthly pension.
        </p>
      </section>

      {/* Eligibility */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Eligibility Requirements
        </h2>
        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6">
          <ul className="space-y-3">
            {eligibilityRequirements.map((req) => (
              <li key={req} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
                {req}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Worked Example */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Worked Example
        </h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
          {/* Scenario header */}
          <div className="border-b border-dashed border-gray-200 bg-gray-50 px-6 py-4">
            <p className="text-[16px] font-semibold leading-[22px] text-gray-500">
              Average MSC of ₱20,000 with 25 years of contributions
            </p>
          </div>
          {/* Formula line items */}
          <div className="px-6 py-4">
            <dl className="space-y-2.5 text-[16px] leading-[22px]">
              <div className="flex justify-between">
                <dt className="text-gray-400">Formula 1</dt>
                <dd className="font-mono tabular-nums text-gray-500">₱10,300/mo</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Formula 2</dt>
                <dd className="font-mono tabular-nums text-gray-500">₱8,000/mo</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Formula 3 (minimum)</dt>
                <dd className="font-mono tabular-nums text-gray-500">₱4,000/mo</dd>
              </div>
            </dl>
          </div>
          {/* Result */}
          <div className="border-t border-dashed border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex justify-between text-[16px] leading-[22px]">
              <span className="font-semibold text-gray-500">Monthly Pension</span>
              <span className="font-mono tabular-nums font-bold text-brand">₱10,300</span>
            </div>
          </div>
          {/* Note */}
          <div className="border-t border-gray-100 px-6 py-3">
            <p className="text-[14px] text-gray-300">
              Highest of three formulas. Plus a 13th month pension every December.
            </p>
          </div>
        </div>
      </section>

    </div>

    {/* Calculator CTA */}
    <section className="bg-surface-tertiary py-20">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Want to Estimate Your SSS Pension?
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          Enter your salary credit and years of contribution to get a
          personalized pension estimate.
        </p>
        <Link
          href="/calculators/retirement/sss-pension-calculator"
          className="mt-6 inline-block rounded-full bg-brand px-8 py-3 text-[14px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
        >
          Use the SSS Pension Calculator
        </Link>
      </div>
    </section>

    <div className="mx-auto max-w-6xl px-4 pt-0 pb-20 sm:px-6 lg:px-8">
      <div className="mt-20">
        <FaqSection faqs={sssPensionTableFaqs} />
      </div>

      {/* Related Content */}
      <section className="mt-16">
        <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
          Related calculators and guides
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedContent.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-brand">
                  <Icon className="size-4" />
                </div>
                <span className="flex-1 text-[16px] font-semibold text-gray-500 group-hover:text-brand">
                  {item.title}
                </span>
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
              </Link>
            );
          })}
        </div>
      </section>

      <div className="mt-16">
        <SourceCitation
          source="Social Security System (SSS)"
          sourceUrl="https://www.sss.gov.ph/sss/appmanager/pages.jsp?page=retirementbenefits"
          updatedAt={SSS_PENSION_TABLE_UPDATED_AT}
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
