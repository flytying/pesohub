import Link from "next/link";
import {
  PiggyBank,
  Calculator,
  ArrowRight,
  Info,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
import { SourceCitation } from "@/components/shared/source-citation";
import { GuideCtaCard } from "@/components/guides/guide-cta-card";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema-markup";
import { formatPeso } from "@/lib/formatters";
import { DISCLAIMER_TEXT, GOVERNMENT_DISCLAIMER } from "@/lib/constants";
import {
  sssPensionMeta,
  pensionFormulas,
  sssPensionFaqs,
  SSS_PENSION_UPDATED_AT,
} from "@/data/guides/sss-pension-guide";

export const metadata = generatePageMetadata({
  title: sssPensionMeta.metaTitle,
  description: sssPensionMeta.metaDescription,
  slug: sssPensionMeta.slug,
  updatedAt: SSS_PENSION_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Guides", href: "/guides" },
  { label: "SSS Pension" },
];

const eligibilityRequirements = [
  "At least 120 monthly contributions (equivalent to 10 years). These do not need to be consecutive.",
  "Age requirement: 60 years old for optional retirement (must be separated from employment) or 65 years old for technical/mandatory retirement.",
  "If you have less than 120 contributions, you may receive a lump sum benefit instead of a monthly pension.",
];

const keyTerms = [
  "AMSC (Average Monthly Salary Credit) — the average of your last 60 monthly salary credits, or the average of all your monthly salary credits, whichever is higher.",
  "CYS (Credited Years of Service) — the total number of years you have made contributions. 120 monthly contributions = 10 CYS.",
];

const checkSteps = [
  "Go to www.sss.gov.ph and log in to your My.SSS account.",
  "Click on \"Inquiry\" in the menu, then select \"Contributions\".",
  "Review your monthly contributions to confirm they are posted correctly. Look for any gaps or missed months.",
  "Note your total posted months and your most recent monthly salary credits to use in the pension formulas.",
];

const commonMistakes = [
  "Not checking for gaps in contributions. Even one missing month reduces your credited years. If you change jobs, make sure the new employer starts contributing immediately. Voluntary members should pay on time every month.",
  "Confusing monthly salary credit with actual salary. Your MSC is capped at a maximum amount (currently ₱30,000). Even if you earn more, your contributions and pension are based on the capped MSC.",
  "Assuming you automatically qualify for a pension. You need at least 120 monthly contributions. If you fall short, you only receive a lump sum, which is significantly less than a lifetime monthly pension.",
  "Not factoring in the 13th-month pension. SSS pensioners receive a 13th-month pension (paid in December) in addition to the regular monthly amount. When planning for retirement income, include this extra month.",
  "Forgetting to update your SSS records after life changes. Marriages, new dependents, and change of beneficiaries should be updated at the SSS to ensure your benefits go to the right people.",
];

const relatedContent = [
  {
    title: "SSS Pension Calculator",
    href: "/calculators/retirement/sss-pension-calculator",
    icon: Calculator,
  },
  {
    title: "SSS Contribution Calculator",
    href: "/calculators/sss/sss-contribution-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Withholding Tax Guide",
    href: "/guides/tax/how-withholding-tax-works-philippines",
    icon: BookOpen,
  },
];

const mscRows = [
  { range: "₱4,000 – ₱4,249.99", msc: "₱4,000", ee: "₱180", er: "₱380" },
  { range: "₱9,750 – ₱10,249.99", msc: "₱10,000", ee: "₱450", er: "₱950" },
  { range: "₱14,750 – ₱15,249.99", msc: "₱15,000", ee: "₱675", er: "₱1,425" },
  { range: "₱19,750 – ₱20,249.99", msc: "₱20,000", ee: "₱900", er: "₱1,900" },
  { range: "₱29,750 and above", msc: "₱30,000", ee: "₱1,350", er: "₱2,850" },
];

const exampleSteps = [
  {
    n: "1",
    title: "Formula 1 — rewards long tenure",
    formula:
      "base ₱300\n+ 20% × ₱20,000 = ₱4,000\n+ 2% × ₱20,000 × 15 = ₱6,000",
    result: "₱10,300/month",
  },
  {
    n: "2",
    title: "Formula 2 — 40% of AMSC",
    formula: "40% × ₱20,000",
    result: "₱8,000/month",
  },
  {
    n: "3",
    title: "Formula 3 — minimum pension",
    formula: "minimum pension (CYS ≥ 10)",
    result: "₱2,000/month",
  },
];

export default function SssPensionGuidePage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: sssPensionMeta.metaTitle,
          description: sssPensionMeta.metaDescription,
          updatedAt: SSS_PENSION_UPDATED_AT,
          slug: sssPensionMeta.slug,
        })}
      />

      <PageHero
        title="How to Compute Your SSS Pension"
        description="A step-by-step guide to understanding how your SSS retirement pension is calculated. Learn the three pension formulas, eligibility requirements, and see a worked example."
        badge={SSS_PENSION_UPDATED_AT}
        breadcrumbs={breadcrumbs}

        containerClassName="max-w-[1240px] px-[clamp(20px,3vw,36px)]"
        variant="dark"
      />

      <div className="mx-auto max-w-[1240px] px-[clamp(20px,3vw,36px)] pb-20 pt-[clamp(20px,3vw,32px)]">
        {/* Quick Answer */}
        <section>
          <div className="flex gap-[13px] rounded-[16px] border border-[#D3DEFA] bg-[#EAF0FF] p-5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] bg-white shadow-[0_1px_2px_rgba(16,24,40,.05)]">
              <PiggyBank className="size-5 text-brand" />
            </span>
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[.06em] text-brand">
                Quick answer
              </p>
              <p className="mt-1.5 text-[16px] leading-[1.6] text-[#344054]">
                {sssPensionMeta.directAnswer}
              </p>
            </div>
          </div>
        </section>

        {/* 1. What is the SSS retirement pension? */}

        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            1. What is the SSS retirement pension?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            The SSS (Social Security System) retirement pension is a monthly
            cash benefit paid to qualified members who have reached retirement
            age and have made enough contributions. It is designed to provide
            a basic income replacement during retirement and is paid for the
            rest of the member&apos;s life.
          </p>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            The pension amount depends on three factors: your{" "}
            <strong>average monthly salary credit (AMSC)</strong>, your{" "}
            <strong>total number of credited years of service (CYS)</strong>,
            and which of the three pension formulas produces the highest
            result.
          </p>
        </section>

        {/* 2. Eligibility requirements */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            2. Eligibility requirements
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            To qualify for the SSS retirement pension, you must meet:
          </p>
          <ul className="mt-4 space-y-3">
            {eligibilityRequirements.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[16px] leading-[1.6] text-[#344054]">
                <ArrowRight className="mt-1 size-4 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 3. The three SSS pension formulas */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            3. The three SSS pension formulas
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            The SSS computes your pension using all three formulas below and
            gives you <strong>whichever is highest</strong>:
          </p>
          <div className="mt-8 space-y-4">
            {pensionFormulas.map((formula) => (
              <div
                key={formula.label}
                className="rounded-[16px] border border-[#EDF1F8] bg-[#F7F9FD] p-5"
              >
                <span className="inline-block rounded-[7px] bg-[#EAF0FF] px-[11px] py-1 text-[11px] font-bold tracking-[.05em] text-brand">
                  {formula.label}
                </span>
                <p className="mt-3 overflow-x-auto rounded-[10px] border border-[#E4E9F4] bg-[#F5F7FC] px-[14px] py-3 font-mono text-[14px] leading-[1.5] text-[#1A2540]">
                  {formula.formula}
                </p>
                <p className="mt-3 text-[15px] leading-[1.6] text-[#5A6478]">
                  {formula.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <p className="text-[14px] font-bold text-[#0E1525]">
              Key terms:
            </p>
            <ul className="mt-3 space-y-3">
              {keyTerms.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[16px] leading-[1.6] text-[#344054]">
                  <ArrowRight className="mt-1 size-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. SSS contribution table reference */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            4. SSS contribution table reference
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            Your monthly salary credit (MSC) is determined by the SSS
            contribution schedule. The MSC is not your actual salary but the
            nearest bracket amount used to compute your contribution and
            benefits. Here are some representative MSC brackets:
          </p>
          <div className="mt-6 overflow-x-auto rounded-[14px] border border-[#E0E6F2]">
            <div className="min-w-[540px]">
              <div className="grid grid-cols-[1.4fr_0.8fr_0.9fr_0.9fr] gap-[10px] border-b border-[#E0E6F2] bg-[#EEF2FB] px-5 py-[13px] text-[11px] font-bold uppercase tracking-[.04em] text-[#56607A]">
                <span>Monthly salary range</span>
                <span className="text-right">MSC</span>
                <span className="text-right">Employee share</span>
                <span className="text-right">Employer share</span>
              </div>
              {mscRows.map((row, i) => (
                <div
                  key={row.range}
                  className={`grid grid-cols-[1.4fr_0.8fr_0.9fr_0.9fr] items-center gap-[10px] px-5 py-[13px] ${
                    i < mscRows.length - 1 ? "border-b border-[#EEF1F7]" : ""
                  } ${i % 2 === 1 ? "bg-[#FBFCFE]" : ""}`}
                >
                  <span className="font-mono text-[13px] text-[#0E1525]">
                    {row.range}
                  </span>
                  <span className="text-right font-mono text-[13px] font-semibold text-[#0E1525]">
                    {row.msc}
                  </span>
                  <span className="text-right font-mono text-[13px] text-[#475069]">
                    {row.ee}
                  </span>
                  <span className="text-right font-mono text-[13px] text-[#475069]">
                    {row.er}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-[14px] text-[#8A93A6]">
            This is a simplified excerpt. The full SSS contribution table has
            more brackets. Contribution amounts are based on the 2023 SSS
            schedule and may be updated.
          </p>
        </section>

        {/* 5. How to check your SSS contributions */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            5. How to check your SSS contributions
          </h2>
          <ul className="mt-6 space-y-3">
            {checkSteps.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[16px] leading-[1.6] text-[#344054]">
                <ArrowRight className="mt-1 size-4 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            You can also download the SSS Mobile App (available on iOS and
            Android) to check your records on the go.
          </p>
        </section>

        {/* Worked Example */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Worked example: MSC of ₱20,000 with 25 years of contributions
          </h2>
          {/* Scenario */}
          <div className="mt-6 flex flex-wrap items-start gap-[13px] rounded-[14px] border border-[#DFE9FB] bg-[#F4F8FF] px-[18px] py-[15px]">
            <span className="rounded-[7px] bg-[#E3ECFF] px-[9px] py-[5px] text-[10.5px] font-bold uppercase leading-none tracking-[.1em] text-brand">
              Scenario
            </span>
            <span className="text-[15px] leading-[1.55] text-[#2A3550]">
              A member has an <strong className="text-[#0E1525]">AMSC of ₱20,000</strong>{" "}
              and <strong className="text-[#0E1525]">25 credited years of service</strong> (CYS).
            </span>
          </div>

          {/* Timeline */}
          <div className="mt-6">
            {exampleSteps.map((step, i) => (
              <div key={step.n} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex size-[30px] items-center justify-center rounded-full bg-[#EAF0FF] text-[13.5px] font-bold text-brand">
                    {step.n}
                  </div>
                  {i < exampleSteps.length - 1 && (
                    <div className="my-2 w-[2px] flex-1 bg-[#E5EBF7]" />
                  )}
                </div>
                <div className="min-w-0 flex-1 pb-6">
                  <div className="mb-[11px] mt-[5px] text-[15.5px] font-semibold text-[#0E1525]">
                    {step.title}
                  </div>
                  <div className="max-w-[440px] whitespace-pre-line rounded-[10px] border border-[#E8EDF7] bg-[#F4F6FB] px-[14px] py-[11px] font-mono text-[13px] leading-[1.8] text-[#475069]">
                    {step.formula}
                  </div>
                  <div className="mt-3 inline-flex flex-wrap items-center gap-[9px] font-mono text-[13px]">
                    <span className="text-[#5A6478]">{step.n === "3" ? "minimum" : `formula ${step.n}`}</span>
                    <span className="text-[#AAB3C6]">=</span>
                    <span className="rounded-[9px] border border-[#D6E1FB] bg-[#EAF0FF] px-3 py-2 font-semibold text-brand">
                      {step.result}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Result block */}
          <div className="mt-2 flex flex-wrap items-center justify-between gap-[18px] rounded-[16px] bg-[#1430BE] px-[26px] py-[22px]">
            <div>
              <p className="text-[11.5px] font-semibold uppercase tracking-[.09em] text-[#B9C7FF]">
                Est. monthly pension
              </p>
              <p className="mt-1.5 text-[36px] font-bold leading-none tracking-[-0.02em] text-white">
                {formatPeso(10300, 0)}
              </p>
            </div>
            <div className="flex flex-wrap gap-[10px]">
              <div className="rounded-[11px] bg-white/[.12] px-[14px] py-[10px]">
                <p className="text-[11px] text-[#B9C7FF]">Highest formula</p>
                <p className="mt-0.5 font-mono text-[14px] font-semibold text-white">
                  Formula 1
                </p>
              </div>
              <div className="rounded-[11px] bg-white/[.12] px-[14px] py-[10px]">
                <p className="text-[11px] text-[#B9C7FF]">Credited years</p>
                <p className="mt-0.5 font-mono text-[14px] font-semibold text-white">
                  25 CYS
                </p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-[14px] leading-[1.6] text-[#8A93A6]">
            Members who retire at age 60 receive a 1.5% additional pension for
            every year of CYS beyond 10 years. Actual amounts may vary based on
            your specific SSS contribution history.
          </p>
        </section>

        {/* Common mistakes to avoid */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Common mistakes to avoid
          </h2>
          <ul className="mt-6 space-y-4">
            {commonMistakes.map((item, i) => (
              <li key={i} className="flex gap-3 text-[16px] leading-[1.6] text-[#5A6478]">
                <HelpCircle className="mt-0.5 size-5 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </section>

      </div>

      <div className="mx-auto max-w-[1240px] px-[clamp(20px,3vw,36px)]">
        {/* Calculator CTA */}
        <GuideCtaCard
          title="Want to Estimate Your SSS Retirement Pension?"
          description="Use the SSS Pension Calculator to estimate your retirement pension based on your salary credit and years of contribution."
          href="/calculators/retirement/sss-pension-calculator"
          ctaLabel="Use the SSS Pension Calculator"
        />
        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={sssPensionFaqs} />
        </div>

        {/* Source Citation */}
        <div className="mt-16">
          <SourceCitation
            source="Social Security System (SSS)"
            sourceUrl="https://www.sss.gov.ph/sss/appmanager/pages.jsp?page=retirementbenefits"
            updatedAt={SSS_PENSION_UPDATED_AT}
            reviewCadence="Every 90 days"
          />
        </div>

        <div className="mt-8">
          <DisclaimerBox text={[GOVERNMENT_DISCLAIMER, DISCLAIMER_TEXT]} />
        </div>

        {/* Related Calculators and Guides */}
        <section className="mt-6">
          <h2 className="mb-6 text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Related calculators and guides
          </h2>
          <div
            className={`grid gap-[14px] ${relatedContent.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}
          >
            {relatedContent.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex items-center gap-[14px] rounded-[14px] border border-[#E7EBF3] bg-white px-[18px] py-[15px] transition-colors hover:border-[#C3D0F2] hover:bg-[#FBFCFE]"
                >
                  <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[11px] bg-[#EAF0FF] text-brand">
                    <Icon className="size-[18px]" />
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
      </div>
    </>
  );
}
