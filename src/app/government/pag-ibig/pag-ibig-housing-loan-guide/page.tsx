import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle,
  Home,
  Shield,
  HelpCircle,
  FileText,
  Landmark,
  BarChart3,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
import { SourceCitation } from "@/components/shared/source-citation";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { buttonVariants } from "@/lib/button-variants";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema-markup";
import { GOVERNMENT_DISCLAIMER } from "@/lib/constants";
import {
  pagibigHousingLoanMeta,
  housingLoanRates,
  loanLimits,
  eligibilityItems,
  loanableAmountFactors,
  rateComparisonPoints,
  documentChecklist,
  housingPurposes,
  questionsBeforeApplying,
  pagibigHousingLoanFaqs,
  PAGIBIG_HOUSING_LOAN_UPDATED_AT,
} from "@/data/government/pag-ibig-housing-loan";

export const metadata = generatePageMetadata({
  title: pagibigHousingLoanMeta.metaTitle,
  description: pagibigHousingLoanMeta.metaDescription,
  slug: pagibigHousingLoanMeta.slug,
  updatedAt: PAGIBIG_HOUSING_LOAN_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "Pag-IBIG Housing Loan Guide" },
];

const howToUsePoints = [
  "who may be eligible",
  "what affects the amount you may borrow",
  "how rates and repricing can affect monthly payments",
  "what requirements are usually needed",
  "where to go next if you want to estimate payments",
];

const relatedPages = [
  {
    title: "Home Loan Calculator",
    href: "/calculators/loans/home-loan-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Pag-IBIG Contribution Table",
    href: "/government/pag-ibig/pag-ibig-contribution-table-philippines",
    icon: Shield,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Government Hub",
    href: "/government",
    icon: Landmark,
  },
];

export default function PagibigHousingLoanGuidePage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: pagibigHousingLoanMeta.metaTitle,
          description: pagibigHousingLoanMeta.metaDescription,
          updatedAt: PAGIBIG_HOUSING_LOAN_UPDATED_AT,
          slug: pagibigHousingLoanMeta.slug,
        })}
      />

      <PageHero
        title={pagibigHousingLoanMeta.title}
        description={pagibigHousingLoanMeta.directAnswer}
        badge={PAGIBIG_HOUSING_LOAN_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Support text */}
      <p className="-mt-4 mb-8 text-sm text-muted-foreground">
        Useful for homebuyers who want a plain-language overview before using a
        calculator or starting a housing loan application.
      </p>

      {/* What This Guide Helps You Understand */}
      <section className="mb-10 rounded-lg border border-border bg-muted/30 p-6">
        <h2 className="text-sm font-semibold text-foreground">
          What This Guide Helps You Understand
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          This page is designed to help you understand the main parts of a
          Pag-IBIG housing loan without reading a long, technical document
          first.
        </p>
        <p className="mt-3 text-sm font-medium text-foreground/80">
          Use this guide to understand:
        </p>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          {howToUsePoints.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Who May Qualify */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Who May Qualify for a Pag-IBIG Housing Loan
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          A Pag-IBIG housing loan is generally intended for qualified members
          who meet the program&apos;s contribution, age, and repayment-related
          conditions. This section helps you answer the question: &ldquo;Am I
          likely to qualify before I spend time preparing documents?&rdquo;
        </p>
        <Card>
          <CardContent className="p-6">
            <ul className="space-y-2">
              {eligibilityItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <p className="mt-3 text-xs text-muted-foreground">
          This is not an approval tool, but it gives you a clearer starting
          point before you go deeper into the process.
        </p>
      </section>

      {/* What Affects How Much You May Borrow */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          What Affects How Much You May Borrow
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          The amount you may be able to borrow is not based on one factor alone.
          It usually depends on a combination of repayment capacity,
          property-related valuation rules, contribution record, and the loan
          structure you choose.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {loanableAmountFactors.map((item) => (
            <div
              key={item}
              className="flex items-start gap-2 rounded-lg border border-border p-3 text-sm"
            >
              <BarChart3 className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Maximum Loanable Amount Table */}
        <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">
          Maximum Loanable Amount by Contribution Years
        </h3>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Years of Contribution
                </th>
                <th className="px-4 py-3 text-right font-medium text-foreground">
                  Max Loan Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loanLimits.map((limit) => (
                <tr key={limit.contributionYears}>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    {limit.contributionYears}
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium text-foreground">
                    {limit.maxLoanAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Actual loan amount also depends on paying capacity, property appraisal
          value, and age at maturity.
        </p>

        <p className="mt-4 text-sm text-muted-foreground">
          If you want to turn these factors into a monthly payment estimate, use
          the{" "}
          <Link
            href="/calculators/loans/home-loan-calculator-philippines"
            className="text-primary hover:underline"
          >
            Home Loan Calculator
          </Link>{" "}
          next.
        </p>
      </section>

      {/* How Rates and Repricing Affect Your Loan */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          How Rates and Repricing Affect Your Loan
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          One of the most important parts of any housing loan is understanding
          how the interest rate affects the monthly payment. A lower rate or a
          longer fixed period can change affordability, while repricing terms may
          affect what happens later in the loan.
        </p>
        <p className="mb-4 text-sm text-muted-foreground">
          This is why it helps to compare:
        </p>
        <ul className="mb-6 space-y-1.5 text-sm text-muted-foreground">
          {rateComparisonPoints.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Interest Rate Table */}
        <h3 className="mb-3 text-lg font-semibold text-foreground">
          Pag-IBIG Housing Loan Interest Rates
        </h3>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Loan Amount
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Repricing Period
                </th>
                <th className="px-4 py-3 text-right font-medium text-foreground">
                  Interest Rate
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {housingLoanRates.map((rate) => (
                <tr key={rate.loanAmount}>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    {rate.loanAmount}
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    {rate.repricingPeriod}
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium text-primary">
                    {rate.interestRate}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Rates are subject to change. Loans above ₱1.5M are subject to
          repricing after 3 years based on prevailing rates.
        </p>
      </section>

      {/* What You Will Usually Need */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          What You Will Usually Need
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          You will usually need some combination of the following. The exact
          document set may vary depending on your employment type, property
          type, and application scenario.
        </p>
        <Card>
          <CardContent className="p-6">
            <ul className="space-y-2">
              {documentChecklist.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* What a Pag-IBIG Housing Loan May Help Finance */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          What a Pag-IBIG Housing Loan May Help Finance
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          A Pag-IBIG housing loan guide is more useful when it explains not just
          the loan itself, but also the kinds of housing goals it may support.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {housingPurposes.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-lg border border-border p-3 text-sm"
            >
              <Home className="size-4 shrink-0 text-primary" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Questions to Ask Before Applying */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Questions to Ask Before Applying
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Before moving forward, it helps to ask a few practical questions.
          These can help you decide whether to estimate first, prepare documents
          next, or compare more than one financing path.
        </p>
        <div className="space-y-3">
          {questionsBeforeApplying.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-lg border border-border p-4"
            >
              <HelpCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Want to Estimate Your Monthly Payment First? */}
      <Card className="my-8 border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Calculator className="size-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-foreground">
              Want to Estimate Your Monthly Payment First?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              If you already know the property price, down payment, and target
              term, use the Home Loan Calculator to estimate your monthly
              payment before applying.
            </p>
          </div>
          <Link
            href="/calculators/loans/home-loan-calculator-philippines"
            className={buttonVariants({
              className: "shrink-0 font-medium",
            })}
          >
            Use the Home Loan Calculator
            <ArrowRight className="size-4" />
          </Link>
        </CardContent>
      </Card>

      {/* FAQ */}
      <FaqSection faqs={pagibigHousingLoanFaqs} />

      {/* Related Pag-IBIG Pages */}
      <section className="pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Related Pag-IBIG Pages
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          This guide works best as part of a broader Pag-IBIG cluster. After
          reading this page, the next useful references are:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {relatedPages.map((page) => {
            const Icon = page.icon;
            return (
              <Link
                key={page.title}
                href={page.href}
                className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon className="size-4" />
                </div>
                <span className="text-sm font-medium group-hover:text-primary">
                  {page.title}
                </span>
                <ArrowRight className="ml-auto size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Source Citation */}
      <div className="py-8">
        <SourceCitation
          source="Pag-IBIG Fund (HDMF) — Housing Loan Program Guidelines"
          sourceUrl="https://www.pagibigfund.gov.ph/HousingLoan.html"
          updatedAt={PAGIBIG_HOUSING_LOAN_UPDATED_AT}
          reviewCadence="Every 90 days"
        />
      </div>

      {/* Disclaimer */}
      <DisclaimerBox text={GOVERNMENT_DISCLAIMER} />
    </div>
    </>
  );
}
