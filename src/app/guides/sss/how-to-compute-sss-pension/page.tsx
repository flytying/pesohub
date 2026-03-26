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
  "Confusing monthly salary credit with actual salary. Your MSC is capped at a maximum amount (currently PHP 30,000). Even if you earn more, your contributions and pension are based on the capped MSC.",
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
        variant="dark"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Quick Answer */}
        <section>
          <div className="flex gap-3 rounded-xl border border-gray-200 bg-white p-6">
            <PiggyBank className="mt-0.5 size-5 shrink-0 text-brand" />
            <div>
              <p className="text-[20px] font-semibold leading-[26px] text-gray-500">
                Quick Answer
              </p>
              <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
                {sssPensionMeta.directAnswer}
              </p>
            </div>
          </div>
        </section>

        {/* 1. What Is the SSS Retirement Pension? */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            1. What Is the SSS Retirement Pension?
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            The SSS (Social Security System) retirement pension is a monthly
            cash benefit paid to qualified members who have reached retirement
            age and have made enough contributions. It is designed to provide
            a basic income replacement during retirement and is paid for the
            rest of the member&apos;s life.
          </p>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            The pension amount depends on three factors: your{" "}
            <strong>average monthly salary credit (AMSC)</strong>, your{" "}
            <strong>total number of credited years of service (CYS)</strong>,
            and which of the three pension formulas produces the highest
            result.
          </p>
        </section>

        {/* 2. Eligibility Requirements */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            2. Eligibility Requirements
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            To qualify for the SSS retirement pension, you must meet:
          </p>
          <ul className="mt-4 space-y-3">
            {eligibilityRequirements.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 3. The Three SSS Pension Formulas */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            3. The Three SSS Pension Formulas
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            The SSS computes your pension using all three formulas below and
            gives you <strong>whichever is highest</strong>:
          </p>
          <div className="mt-8 space-y-4">
            {pensionFormulas.map((formula) => (
              <div key={formula.label} className="rounded-xl border border-gray-200 bg-white p-6">
                <span className="inline-block rounded-full bg-gray-50 px-3 py-1 text-[14px] font-medium text-gray-500">
                  {formula.label}
                </span>
                <p className="mt-3 font-mono text-[16px] leading-[22px] text-gray-500">
                  {formula.formula}
                </p>
                <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
                  {formula.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <p className="text-[16px] font-semibold leading-[22px] text-gray-500">
              Key terms:
            </p>
            <ul className="mt-3 space-y-3">
              {keyTerms.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                  <ArrowRight className="size-4 shrink-0 text-gray-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. SSS Contribution Table Reference */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            4. SSS Contribution Table Reference
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Your monthly salary credit (MSC) is determined by the SSS
            contribution schedule. The MSC is not your actual salary but the
            nearest bracket amount used to compute your contribution and
            benefits. Here are some representative MSC brackets:
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Monthly Salary Range</TableHead>
                  <TableHead className="text-right">MSC</TableHead>
                  <TableHead className="text-right">Employee Share</TableHead>
                  <TableHead className="text-right">Employer Share</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>PHP 4,000 - PHP 4,249.99</TableCell>
                  <TableCell className="text-right">{formatPeso(4000, 0)}</TableCell>
                  <TableCell className="text-right">{formatPeso(180, 0)}</TableCell>
                  <TableCell className="text-right">{formatPeso(380, 0)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>PHP 9,750 - PHP 10,249.99</TableCell>
                  <TableCell className="text-right">{formatPeso(10000, 0)}</TableCell>
                  <TableCell className="text-right">{formatPeso(450, 0)}</TableCell>
                  <TableCell className="text-right">{formatPeso(950, 0)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>PHP 14,750 - PHP 15,249.99</TableCell>
                  <TableCell className="text-right">{formatPeso(15000, 0)}</TableCell>
                  <TableCell className="text-right">{formatPeso(675, 0)}</TableCell>
                  <TableCell className="text-right">{formatPeso(1425, 0)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>PHP 19,750 - PHP 20,249.99</TableCell>
                  <TableCell className="text-right">{formatPeso(20000, 0)}</TableCell>
                  <TableCell className="text-right">{formatPeso(900, 0)}</TableCell>
                  <TableCell className="text-right">{formatPeso(1900, 0)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>PHP 29,750 and above</TableCell>
                  <TableCell className="text-right">{formatPeso(30000, 0)}</TableCell>
                  <TableCell className="text-right">{formatPeso(1350, 0)}</TableCell>
                  <TableCell className="text-right">{formatPeso(2850, 0)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <p className="mt-3 text-[14px] text-gray-400">
            This is a simplified excerpt. The full SSS contribution table has
            more brackets. Contribution amounts are based on the 2023 SSS
            schedule and may be updated.
          </p>
        </section>

        {/* 5. How to Check Your SSS Contributions */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            5. How to Check Your SSS Contributions
          </h2>
          <ul className="mt-6 space-y-3">
            {checkSteps.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            You can also download the SSS Mobile App (available on iOS and
            Android) to check your records on the go.
          </p>
        </section>

        {/* Worked Example */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Worked Example: MSC of PHP 20,000 with 25 Years of Contributions
          </h2>
          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
            {/* Header */}
            <div className="border-b border-dashed border-gray-200 bg-gray-50 px-6 py-4">
              <p className="text-[16px] font-semibold leading-[22px] text-gray-500">
                A member has an AMSC of PHP 20,000 and 25 credited years of
                service (CYS).
              </p>
            </div>

            {/* Formula 1 */}
            <div className="px-6 py-4">
              <dl className="space-y-2.5 text-[16px] leading-[22px]">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Formula 1</dt>
                  <dd className="font-mono tabular-nums text-gray-500">PHP 300 + (20% x AMSC) + (2% x AMSC x CYS over 10)</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="pl-4 text-gray-400">Base amount</dt>
                  <dd className="font-mono tabular-nums text-gray-500">PHP 300</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="pl-4 text-gray-400">20% x AMSC</dt>
                  <dd className="font-mono tabular-nums text-gray-500">20% x PHP 20,000 = PHP 4,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="pl-4 text-gray-400">2% x AMSC x CYS over 10</dt>
                  <dd className="font-mono tabular-nums text-gray-500">2% x PHP 20,000 x 15 = PHP 6,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Formula 1 result</dt>
                  <dd className="font-mono tabular-nums font-semibold text-brand">PHP 10,300/month</dd>
                </div>
              </dl>
            </div>

            <div className="mx-6 border-t border-dashed border-gray-200" />

            {/* Formula 2 */}
            <div className="px-6 py-4">
              <dl className="space-y-2.5 text-[16px] leading-[22px]">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Formula 2</dt>
                  <dd className="font-mono tabular-nums text-gray-500">40% x AMSC</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="pl-4 text-gray-400">Computation</dt>
                  <dd className="font-mono tabular-nums text-gray-500">40% x PHP 20,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Formula 2 result</dt>
                  <dd className="font-mono tabular-nums font-semibold text-gray-500">PHP 8,000/month</dd>
                </div>
              </dl>
            </div>

            <div className="mx-6 border-t border-dashed border-gray-200" />

            {/* Formula 3 */}
            <div className="px-6 py-4">
              <dl className="space-y-2.5 text-[16px] leading-[22px]">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Formula 3</dt>
                  <dd className="font-mono tabular-nums text-gray-500">Minimum pension (CYS &ge; 10)</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Formula 3 result</dt>
                  <dd className="font-mono tabular-nums font-semibold text-gray-500">PHP 2,000/month</dd>
                </div>
              </dl>
            </div>

            {/* Result total */}
            <div className="border-t border-dashed border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex justify-between text-[16px] leading-[22px]">
                <span className="font-semibold text-gray-500">Monthly Pension (highest of 3 formulas)</span>
                <span className="font-mono tabular-nums font-bold text-brand">{formatPeso(10300, 0)}</span>
              </div>
            </div>

            {/* Note */}
            <div className="border-t border-gray-100 px-6 py-3">
              <p className="text-[14px] text-gray-300">
                Members who retire at age 60 receive a 1.5% additional pension
                for every year of CYS beyond 10 years. Actual amounts may vary
                based on your specific SSS contribution history.
              </p>
            </div>
          </div>
        </section>

        {/* Common Mistakes to Avoid */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Common Mistakes to Avoid
          </h2>
          <ul className="mt-6 space-y-4">
            {commonMistakes.map((item, i) => (
              <li key={i} className="flex gap-3 text-[16px] leading-[22px] text-gray-400">
                <HelpCircle className="mt-0.5 size-5 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </section>

      </div>

      {/* Calculator CTA */}
      <section className="bg-surface-tertiary py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Want to Estimate Your SSS Retirement Pension?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-[22px] text-gray-400">
            Use the SSS Pension Calculator to estimate your retirement
            pension based on your salary credit and years of contribution.
          </p>
          <div className="mt-6">
            <Link
              href="/calculators/retirement/sss-pension-calculator"
              className="inline-flex items-center rounded-full bg-brand px-6 py-3 text-[14px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
            >
              USE THE SSS PENSION CALCULATOR
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-0 pb-20 sm:px-6 lg:px-8">
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
      </div>
    </>
  );
}
