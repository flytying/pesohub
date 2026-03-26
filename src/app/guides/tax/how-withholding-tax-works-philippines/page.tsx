import Link from "next/link";
import {
  Landmark,
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
  withholdingTaxMeta,
  trainLawBrackets,
  withholdingTaxFaqs,
  WITHHOLDING_TAX_UPDATED_AT,
} from "@/data/guides/withholding-tax-guide";

export const metadata = generatePageMetadata({
  title: withholdingTaxMeta.metaTitle,
  description: withholdingTaxMeta.metaDescription,
  slug: withholdingTaxMeta.slug,
  updatedAt: WITHHOLDING_TAX_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Guides", href: "/guides" },
  { label: "Withholding Tax" },
];

const exemptGroups = [
  "Minimum wage earners — those receiving only the statutory minimum wage for their region are exempt from income tax regardless of the amount.",
  "Employees earning PHP 250,000 or less per year — under the TRAIN Law, the first PHP 250,000 of annual taxable income is tax-free.",
];

const computeSteps = [
  "Determine annual gross compensation. Multiply your monthly basic salary by 12 and add other taxable benefits (overtime, commissions, etc.).",
  "Subtract mandatory deductions. Deduct your employee share of SSS, PhilHealth, and Pag-IBIG contributions. This gives you your taxable income.",
  "Locate your tax bracket in the TRAIN Law table above.",
  "Apply the formula. Take the base tax for your bracket, then add the tax rate multiplied by the amount your income exceeds the bracket floor.",
  "Divide by 12 (or by the number of pay periods) to get your monthly withholding tax.",
];

const commonMistakes = [
  "Forgetting to subtract mandatory contributions. Your taxable income is your gross pay minus SSS, PhilHealth, and Pag-IBIG. Using gross pay directly will overestimate your tax.",
  "Confusing the tax rate with the effective tax rate. If you fall in the 15% bracket, it does not mean 15% of your entire income goes to tax. Only the amount exceeding PHP 250,000 is taxed at 15%.",
  "Not accounting for 13th-month pay and bonuses. Under the TRAIN Law, the first PHP 90,000 of 13th-month pay and other benefits is tax-exempt. Any excess is added to your taxable income.",
  "Not filing BIR Form 2316. Even if your employer handles withholding, make sure you receive your Certificate of Compensation Payment/Tax Withheld (BIR Form 2316) every year for your records.",
  "Assuming minimum wage = automatic tax exemption. You are only exempt if your pay is exactly the statutory minimum wage. If you receive any amount above minimum wage (such as night differential or overtime beyond legal limits), the excess may be taxable.",
];

const relatedContent = [
  {
    title: "Withholding Tax Calculator",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Take-Home Pay Guide",
    href: "/guides/tax/take-home-pay-guide-philippines",
    icon: BookOpen,
  },
  {
    title: "SSS Contribution Calculator",
    href: "/calculators/sss/sss-contribution-calculator-philippines",
    icon: Calculator,
  },
];

export default function WithholdingTaxGuidePage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: withholdingTaxMeta.metaTitle,
          description: withholdingTaxMeta.metaDescription,
          updatedAt: WITHHOLDING_TAX_UPDATED_AT,
          slug: withholdingTaxMeta.slug,
        })}
      />

      <PageHero
        title="How Withholding Tax Works in the Philippines"
        description="A practical, plain-language guide to understanding Philippine withholding tax under the TRAIN Law. Learn the tax brackets, computation formula, and how to verify your payslip."
        badge={WITHHOLDING_TAX_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Quick Answer */}
        <section>
          <div className="flex gap-3 rounded-xl border border-gray-200 bg-white p-6">
            <Landmark className="mt-0.5 size-5 shrink-0 text-brand" />
            <div>
              <p className="text-[20px] font-semibold leading-[26px] text-gray-500">
                Quick Answer
              </p>
              <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
                {withholdingTaxMeta.directAnswer}
              </p>
            </div>
          </div>
        </section>

        {/* 1. What Is Withholding Tax? */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            1. What Is Withholding Tax?
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Withholding tax is the Philippine government&apos;s method of
            collecting income tax at the source. Instead of paying your entire
            annual tax bill in one lump sum, your employer deducts a portion
            of your salary every payday and sends it directly to the Bureau of
            Internal Revenue (BIR).
          </p>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Think of it as a &ldquo;pay-as-you-earn&rdquo; system. By the end
            of the year, most of your income tax obligation has already been
            collected through these regular deductions.
          </p>
        </section>

        {/* 2. Who Pays Withholding Tax? */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            2. Who Pays Withholding Tax?
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Most employees in the Philippines are subject to withholding tax.
            However, these groups are <strong>exempt</strong>:
          </p>
          <ul className="mt-4 space-y-3">
            {exemptGroups.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Self-employed individuals and freelancers also pay income tax but
            through a different mechanism (quarterly filings via BIR Form
            1701Q).
          </p>
        </section>

        {/* 3. TRAIN Law Tax Brackets */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            3. TRAIN Law Tax Brackets (2023 Onwards)
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            The Tax Reform for Acceleration and Inclusion (TRAIN) Law, or
            Republic Act No. 10963, revised the Philippine income tax brackets.
            The table below shows the graduated rates effective January 1, 2023:
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Taxable Income (Over)</TableHead>
                  <TableHead>But Not Over</TableHead>
                  <TableHead className="text-right">Base Tax</TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                  <TableHead className="text-right">Of Excess Over</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainLawBrackets.map((bracket, index) => (
                  <TableRow key={index}>
                    <TableCell>PHP {bracket.overBut}</TableCell>
                    <TableCell>
                      {bracket.notOver === "No limit"
                        ? "No limit"
                        : `PHP ${bracket.notOver}`}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPeso(bracket.baseTax, 0)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {bracket.rate}%
                    </TableCell>
                    <TableCell className="text-right">
                      {bracket.ofExcessOver === 0
                        ? "-"
                        : formatPeso(bracket.ofExcessOver, 0)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* 4. How to Compute Your Withholding Tax */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            4. How to Compute Your Withholding Tax
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            The basic formula is:
          </p>
          <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6">
            <p className="font-mono text-[16px] leading-[22px] text-gray-400">
              Annual Tax = Base Tax + (Tax Rate x (Taxable Income - Lower
              Bracket Limit))
            </p>
          </div>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Follow these steps:
          </p>
          <ul className="mt-4 space-y-3">
            {computeSteps.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. How Employers Withhold Tax */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            5. How Employers Withhold Tax
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Employers use the BIR&apos;s Revised Withholding Tax Table to
            determine how much to deduct from each payroll. The amount depends
            on the employee&apos;s pay frequency (monthly, semi-monthly,
            weekly, or daily) and their taxable compensation for that period.
          </p>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            At year-end (usually in December), the employer performs an{" "}
            <strong>annualization</strong>: they compute the actual annual tax
            based on total compensation, compare it to the total amount
            already withheld, and either refund the excess or collect the
            shortfall through the final payroll.
          </p>
        </section>

        {/* Worked Example */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Worked Example: PHP 35,000 Monthly Salary
          </h2>
          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
            {/* Header */}
            <div className="border-b border-dashed border-gray-200 bg-gray-50 px-6 py-4">
              <p className="text-[16px] font-semibold leading-[22px] text-gray-500">
                An employee earns PHP 35,000/month in basic salary with no other
                taxable benefits.
              </p>
            </div>

            {/* Step 1 */}
            <div className="px-6 py-4">
              <dl className="space-y-2.5 text-[16px] leading-[22px]">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Step 1: Annual Gross Compensation</dt>
                  <dd className="font-mono tabular-nums text-gray-500">PHP 35,000 x 12</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400" />
                  <dd className="font-mono tabular-nums font-semibold text-gray-500">= PHP 420,000</dd>
                </div>
              </dl>
            </div>

            <div className="mx-6 border-t border-dashed border-gray-200" />

            {/* Step 2 */}
            <div className="px-6 py-4">
              <dl className="space-y-2.5 text-[16px] leading-[22px]">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Step 2: Subtract Mandatory Contributions</dt>
                  <dd className="font-mono tabular-nums text-gray-500" />
                </div>
                <div className="flex justify-between">
                  <dt className="pl-4 text-gray-400">SSS</dt>
                  <dd className="font-mono tabular-nums text-gray-500">PHP 1,750 x 12 = PHP 21,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="pl-4 text-gray-400">PhilHealth</dt>
                  <dd className="font-mono tabular-nums text-gray-500">PHP 612.50 x 12 = PHP 7,350</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="pl-4 text-gray-400">Pag-IBIG</dt>
                  <dd className="font-mono tabular-nums text-gray-500">PHP 200 x 12 = PHP 2,400</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Total deductions</dt>
                  <dd className="font-mono tabular-nums font-semibold text-gray-500">PHP 30,750</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Taxable income</dt>
                  <dd className="font-mono tabular-nums font-semibold text-gray-500">PHP 420,000 - PHP 30,750 = PHP 389,250</dd>
                </div>
              </dl>
            </div>

            <div className="mx-6 border-t border-dashed border-gray-200" />

            {/* Step 3 */}
            <div className="px-6 py-4">
              <dl className="space-y-2.5 text-[16px] leading-[22px]">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Step 3: Identify Tax Bracket</dt>
                  <dd className="font-mono tabular-nums text-gray-500">Over PHP 250,000 but not over PHP 400,000</dd>
                </div>
              </dl>
            </div>

            <div className="mx-6 border-t border-dashed border-gray-200" />

            {/* Step 4 */}
            <div className="px-6 py-4">
              <dl className="space-y-2.5 text-[16px] leading-[22px]">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Step 4: Apply the Formula</dt>
                  <dd className="font-mono tabular-nums text-gray-500" />
                </div>
                <div className="flex justify-between">
                  <dt className="pl-4 text-gray-400">Base tax + rate x excess</dt>
                  <dd className="font-mono tabular-nums text-gray-500">PHP 0 + 15% x (PHP 389,250 - PHP 250,000)</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="pl-4 text-gray-400" />
                  <dd className="font-mono tabular-nums text-gray-500">= 15% x PHP 139,250</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Annual tax</dt>
                  <dd className="font-mono tabular-nums font-semibold text-gray-500">= PHP 20,887.50</dd>
                </div>
              </dl>
            </div>

            <div className="mx-6 border-t border-dashed border-gray-200" />

            {/* Step 5 */}
            <div className="px-6 py-4">
              <dl className="space-y-2.5 text-[16px] leading-[22px]">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Step 5: Monthly Withholding Tax</dt>
                  <dd className="font-mono tabular-nums text-gray-500">PHP 20,887.50 / 12</dd>
                </div>
              </dl>
            </div>

            {/* Result total */}
            <div className="border-t border-dashed border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex justify-between text-[16px] leading-[22px]">
                <span className="font-semibold text-gray-500">Monthly Withholding Tax</span>
                <span className="font-mono tabular-nums font-bold text-brand">{formatPeso(1740.63)}</span>
              </div>
            </div>

            {/* Note */}
            <div className="border-t border-gray-100 px-6 py-3">
              <p className="text-[14px] text-gray-300">
                Actual withholding may vary slightly due to employer annualization
                adjustments and rounding differences per pay period.
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
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Want to Compute Your Exact Withholding Tax?
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Use the Withholding Tax Calculator to compute your exact withholding
            tax based on your salary and deductions. You can also try the
            Take-Home Pay Calculator to see a full deduction breakdown.
          </p>
          <Link
            href="/calculators/tax/withholding-tax-calculator-philippines"
            className="mt-6 inline-block rounded-full bg-brand px-8 py-3 text-[14px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
          >
            Use the Withholding Tax Calculator
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-0 pb-20 sm:px-6 lg:px-8">
        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={withholdingTaxFaqs} />
        </div>

        {/* Source Citation */}
        <div className="mt-16">
          <SourceCitation
            source="Bureau of Internal Revenue (BIR) — TRAIN Law (RA 10963)"
            sourceUrl="https://www.bir.gov.ph/tax-information/tax-rates"
            updatedAt={WITHHOLDING_TAX_UPDATED_AT}
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
