import Link from "next/link";
import { Calculator, ArrowRight, Shield, Landmark } from "lucide-react";
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

const WRAP = "mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)]";
const CARD =
  "rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]";
const H2 =
  "font-display text-[clamp(20px,2.2vw,24px)] font-semibold tracking-[-.02em] text-[#0E1525]";

const yearColumns = ["10 yrs", "15 yrs", "20 yrs", "25 yrs", "30 yrs"] as const;

const pensionFormulaCards = [
  {
    title: "Formula 1",
    formula: "PHP 300 + (20% × AMSC) + (2% × AMSC × CYS over 10)",
    description:
      "This formula rewards long tenure. The 2% bonus applies for every credited year of service beyond the first 10 years. For members with 25+ years of contributions, this formula usually yields the highest pension.",
  },
  {
    title: "Formula 2",
    formula: "40% × AMSC",
    description:
      "A simpler calculation that gives you 40% of your average monthly salary credit. This formula tends to produce the highest amount for members with shorter contribution periods but higher salary credits.",
  },
  {
    title: "Formula 3 (Minimum Pension)",
    formula: "PHP 2,420 (if CYS ≥ 10 years) or PHP 1,452 (if CYS < 10 years)",
    description:
      "The guaranteed minimum pension floor. If Formulas 1 and 2 produce an amount below this floor, the minimum pension applies. The SSS Pension Reform Program applied two 10% increases to existing pensions: the ₱2,000 floor for members with at least 10 credited years of service rose to ₱2,420, and the ₱1,200 floor for members with fewer than 10 CYS rose to ₱1,452.",
  },
];

const appliesList = [
  {
    lead: "Employed members",
    text: "— private sector employees whose employers remit SSS contributions",
  },
  {
    lead: "Self-employed members",
    text: "— freelancers, business owners, and professionals who pay their own contributions",
  },
  {
    lead: "Voluntary members",
    text: "— separated employees, overseas Filipino workers (OFWs), and non-working spouses who continue contributing",
  },
];

const exampleRows = [
  { label: "Formula 1", value: "₱10,300/mo" },
  { label: "Formula 2", value: "₱8,000/mo" },
  { label: "Formula 3 (minimum)", value: "₱2,420/mo" },
];

const relatedContent = [
  {
    title: "SSS Pension Calculator",
    href: "/calculators/retirement/sss-pension-calculator",
    icon: Calculator,
  },
  {
    title: "SSS Contribution Table",
    href: "/government/sss/sss-contribution-guide",
    icon: Shield,
  },
  {
    title: "SSS Contribution Calculator",
    href: "/calculators/sss/sss-contribution-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Government Hub",
    href: "/government",
    icon: Landmark,
  },
];

const ROW_GRID = "grid grid-cols-[1.3fr_1fr_1fr_1fr_1fr_1fr]";

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
        containerClassName={WRAP}
      />

      <div className={`${WRAP} space-y-5 pt-6`}>
        {/* Pension estimate table */}
        <section className={CARD}>
          <h2 className={H2}>
            Estimated monthly pension by salary credit &amp; years
          </h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            This table shows estimated monthly pension amounts based on your
            Average Monthly Salary Credit (AMSC) and total Credited Years of
            Service (CYS). The highest of the three SSS pension formulas is used.
          </p>
          <div className="mt-4 overflow-x-auto">
            <div className="overflow-hidden rounded-[16px] border border-[#E7EBF3] bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)] min-w-[620px]">
              <div className={`${ROW_GRID} border-b border-[#E7EBF3] bg-[#F4F7FE]`}>
                <div className="px-4 py-[13px] text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                  MSC
                </div>
                {yearColumns.map((col) => (
                  <div
                    key={col}
                    className="px-4 py-[13px] text-right text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]"
                  >
                    {col}
                  </div>
                ))}
              </div>
              {pensionEstimates.map((row, i) => {
                const cells = [
                  row.pensionAt10Years,
                  row.pensionAt15Years,
                  row.pensionAt20Years,
                  row.pensionAt25Years,
                  row.pensionAt30Years,
                ];
                const isLast = i === pensionEstimates.length - 1;
                return (
                  <div
                    key={row.monthlySalaryCredit}
                    className={`${ROW_GRID} ${i % 2 ? "bg-[#FAFBFE]" : "bg-white"} ${
                      isLast ? "" : "border-b border-[#F0F3F8]"
                    }`}
                  >
                    <div className="px-4 py-[13px] font-mono tabular-nums text-[14px] font-semibold text-[#0E1525]">
                      {formatPeso(row.monthlySalaryCredit)}
                    </div>
                    {cells.map((value, j) => (
                      <div
                        key={j}
                        className="px-4 py-[13px] text-right font-mono tabular-nums text-[14px] text-[#475069]"
                      >
                        {formatPeso(value)}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
          <p className="mt-3 text-[13.5px] leading-[1.6] text-[#8A93A6]">
            Estimates based on the SSS pension formula. Actual pension may vary
            based on contribution history and average monthly salary credit.
          </p>
        </section>

        {/* Three pension formulas */}
        <section className={CARD}>
          <h2 className={H2}>The three SSS pension formulas</h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            SSS computes your pension using all three formulas and gives you the
            highest amount.
          </p>
          <div className="mt-4 space-y-[14px]">
            {pensionFormulaCards.map((f) => (
              <div
                key={f.title}
                className="rounded-[16px] border border-[#EDF1F8] bg-[#F7F9FD] p-5"
              >
                <div className="font-display text-[17px] font-semibold text-[#0E1525]">
                  {f.title}
                </div>
                <div className="my-3 rounded-[10px] border border-[#E3E9F7] bg-[#F4F7FE] px-[14px] py-3 font-mono text-[14.5px] text-brand">
                  {f.formula}
                </div>
                <p className="text-[15px] leading-[1.65] text-[#5A6478]">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Who it applies to */}
        <section className={CARD}>
          <h2 className={H2}>Who it applies to</h2>
          <p className="mt-[10px] text-[16px] leading-[1.7] text-[#475069]">
            The SSS retirement pension applies to all SSS members who have
            reached retirement age (60 for optional, 65 for mandatory) and have
            made at least 120 monthly contributions (10 years). This includes:
          </p>
          <ul className="mt-[14px] space-y-3">
            {appliesList.map((item) => (
              <li key={item.lead} className="flex items-start gap-3">
                <ArrowRight className="mt-[3px] size-[18px] shrink-0 text-brand" />
                <span className="text-[16px] leading-[1.55] text-[#344054]">
                  <strong className="text-[#0E1525]">{item.lead}</strong>{" "}
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-[14px] text-[16px] leading-[1.7] text-[#475069]">
            Members who do not meet the minimum 120 contributions will receive a
            lump-sum benefit instead of a monthly pension.
          </p>
        </section>

        {/* Eligibility requirements */}
        <section className={CARD}>
          <h2 className={H2}>Eligibility requirements</h2>
          <div className="mt-[14px] rounded-[16px] border border-[#EDF1F8] bg-[#F7F9FD] p-5">
            <ul className="space-y-3">
              {eligibilityRequirements.map((req) => (
                <li key={req} className="flex items-start gap-3">
                  <ArrowRight className="mt-[3px] size-[18px] shrink-0 text-brand" />
                  <span className="text-[16px] leading-[1.55] text-[#344054]">
                    {req}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Worked example */}
        <section className={CARD}>
          <h2 className={H2}>Worked example</h2>
          <div className="mt-[14px] overflow-hidden rounded-[16px] border border-[#EDF1F8] bg-[#F7F9FD]">
            <div className="bg-[#EAF0FF] px-5 py-[15px] font-display text-[15px] font-semibold text-brand">
              Average MSC of ₱20,000 with 25 years of contributions
            </div>
            <div className="px-5 py-2">
              {exampleRows.map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between border-b border-[#F0F3F8] py-[11px] last:border-b-0"
                >
                  <span className="text-[15px] text-[#475069]">{r.label}</span>
                  <span className="font-mono tabular-nums text-[15px] text-[#5A6478]">
                    {r.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between bg-[#EAF0FF] px-5 py-[15px]">
              <span className="text-[16px] font-bold text-[#0E1525]">
                Monthly pension
              </span>
              <span className="font-display text-[20px] font-bold text-brand">
                ₱10,300
              </span>
            </div>
          </div>
          <p className="mt-3 text-[13.5px] leading-[1.6] text-[#8A93A6]">
            Highest of three formulas. Plus a 13th month pension every December.
          </p>
        </section>
      </div>

      {/* CTA */}
      <div className={`${WRAP} pt-[clamp(28px,4vw,40px)]`}>
        <GovCtaBanner
          title="Want to estimate your SSS pension?"
          description="Enter your salary credit and years of contribution to get a personalized pension estimate."
          href="/calculators/retirement/sss-pension-calculator"
          ctaLabel="Use the SSS pension calculator"
        />
      </div>

      <div className={`${WRAP} pb-20 pt-[clamp(34px,5vw,48px)]`}>
        {/* FAQ */}
        <FaqSection faqs={sssPensionTableFaqs} />

        {/* Related */}
        <section className="mt-[clamp(34px,5vw,48px)]">
          <h2 className="mb-6 font-display text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-.02em] text-[#0E1525]">
            Related calculators and guides
          </h2>
          <div
            className={`grid gap-4 ${relatedContent.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}
          >
            {relatedContent.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex items-center gap-[14px] rounded-[14px] border border-[#E7EBF3] bg-white px-[18px] py-[15px] transition-colors hover:border-[#C3D0F2] hover:bg-[#FBFCFE]"
                >
                  <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[11px] bg-[#EAF0FF]">
                    <Icon className="size-[18px] text-brand" />
                  </span>
                  <span className="flex-1 text-[15.5px] font-bold leading-[1.3] text-[#0E1525]">
                    {item.title}
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
