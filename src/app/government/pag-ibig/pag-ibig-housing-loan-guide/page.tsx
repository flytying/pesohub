import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { RelatedPages } from "@/components/shared/related-pages";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
// import { AdPlaceholder } from "@/components/ads/ad-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import { GOVERNMENT_DISCLAIMER } from "@/lib/constants";
import {
  pagibigHousingLoanMeta,
  housingLoanRates,
  loanLimits,
  eligibilityRequirements,
  documentRequirements,
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

export default function PagibigHousingLoanGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
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
        title="Pag-IBIG Housing Loan Guide Philippines"
        description={pagibigHousingLoanMeta.directAnswer}
        badge={PAGIBIG_HOUSING_LOAN_UPDATED_AT}
        breadcrumbs={breadcrumbs}
      />

      {/* Government Disclaimer */}
      <Card className="mb-8 border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
        <CardContent className="p-4 text-sm text-muted-foreground">
          {GOVERNMENT_DISCLAIMER}
        </CardContent>
      </Card>

      {/* Quick Summary */}
      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg">Pag-IBIG Housing Loan at a Glance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><strong>Interest Rates:</strong> 5.375% – 10.375% per year (varies by loan amount)</p>
          <p><strong>Max Loan Amount:</strong> PHP 6,000,000 (regular) / PHP 10,000,000 (affordable housing)</p>
          <p><strong>Max Loan Term:</strong> 30 years</p>
          <p><strong>Min Contributions:</strong> 24 monthly Pag-IBIG contributions</p>
          <p><strong>Max Age:</strong> Not over 65 years old at time of application</p>
        </CardContent>
      </Card>

      {/* <AdPlaceholder slot="gov-pagibig-top" className="my-8" /> */}

      {/* Interest Rate Table */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Pag-IBIG Housing Loan Interest Rates
        </h2>
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Loan Amount</TableHead>
                <TableHead className="whitespace-nowrap">Repricing Period</TableHead>
                <TableHead className="text-right whitespace-nowrap">Interest Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {housingLoanRates.map((rate) => (
                <TableRow key={rate.loanAmount}>
                  <TableCell className="text-sm">{rate.loanAmount}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{rate.repricingPeriod}</TableCell>
                  <TableCell className="text-right font-mono text-sm font-medium">
                    {rate.interestRate}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Rates are subject to change. Loans above PHP 1.5M are subject to repricing after 3 years
          based on prevailing rates.
        </p>
      </section>

      {/* Maximum Loanable Amount */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Maximum Loanable Amount by Contribution Years
        </h2>
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Years of Contribution</TableHead>
                <TableHead className="text-right whitespace-nowrap">Max Loan Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loanLimits.map((limit) => (
                <TableRow key={limit.contributionYears}>
                  <TableCell className="text-sm">{limit.contributionYears}</TableCell>
                  <TableCell className="text-right font-mono text-sm font-medium">
                    {limit.maxLoanAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Actual loan amount also depends on paying capacity, property appraisal value, and age at maturity.
        </p>
      </section>

      {/* <AdPlaceholder slot="gov-pagibig-mid" className="my-8" /> */}

      {/* Eligibility */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Eligibility Requirements
        </h2>
        <Card>
          <CardContent className="p-6">
            <ul className="space-y-2">
              {eligibilityRequirements.map((req) => (
                <li key={req} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {req}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Document Requirements */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Document Requirements
        </h2>
        <Card>
          <CardContent className="p-6">
            <ul className="space-y-2">
              {documentRequirements.map((doc) => (
                <li key={doc} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                  {doc}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* How to Apply */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          How to Apply
        </h2>
        <div className="space-y-4">
          {[
            { step: "1", title: "Register or Update Your Membership", description: "Ensure your Pag-IBIG membership is active and you have at least 24 monthly contributions. You can check your status through the Pag-IBIG Virtual Office." },
            { step: "2", title: "Prepare Your Documents", description: "Gather all required documents including valid IDs, proof of income, property documents, and the housing loan application form." },
            { step: "3", title: "Submit Your Application", description: "File your application online through the Pag-IBIG Virtual Office or submit in person at any Pag-IBIG branch. Pay the processing fee." },
            { step: "4", title: "Wait for Appraisal & Credit Check", description: "Pag-IBIG will conduct a property appraisal and credit investigation. This typically takes 20-30 business days." },
            { step: "5", title: "Sign Loan Documents", description: "Once approved, sign the loan and mortgage documents. The loan proceeds will be released to the seller or developer." },
          ].map((item) => (
            <Card key={item.step}>
              <CardContent className="flex gap-4 p-4">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {item.step}
                </div>
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Worked Example */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Worked Example
        </h2>
        <Card>
          <CardContent className="space-y-3 p-6 text-sm">
            <p><strong>Scenario:</strong> You want to buy a PHP 2,000,000 house using a Pag-IBIG housing loan.</p>
            <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
              <li>Property price: PHP 2,000,000</li>
              <li>Down payment (20%): PHP 400,000</li>
              <li>Loan amount: PHP 2,000,000 – PHP 400,000 = PHP 1,600,000</li>
              <li>Interest rate (for loans up to PHP 1.75M): 5.375% per year</li>
              <li>Loan term: 30 years (360 months)</li>
              <li>Estimated monthly amortization: approximately <strong>PHP 8,963</strong></li>
            </ol>
            <p className="text-muted-foreground">
              This estimate uses a fixed 5.375% rate. For loans above PHP 1.5M, the rate
              is subject to repricing after 3 years based on prevailing Pag-IBIG rates.
              Use the home loan calculator for a detailed amortization schedule.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Related Calculator Callout */}
      <Card className="my-8 border-primary/20 bg-primary/5">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Calculator className="size-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">Estimate Your Monthly Payment</p>
            <p className="text-sm text-muted-foreground">
              Use our home loan calculator to estimate monthly amortization for Pag-IBIG rates.
            </p>
          </div>
          <Link
            href="/calculators/loans/home-loan-calculator-philippines"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Calculate <ArrowRight className="size-3.5" />
          </Link>
        </CardContent>
      </Card>

      {/* <AdPlaceholder slot="gov-pagibig-bottom" className="my-8" /> */}

      <FaqSection faqs={pagibigHousingLoanFaqs} />

      <RelatedPages currentSlug="/government/pag-ibig/pag-ibig-housing-loan-guide" />

      <DisclaimerBox text={GOVERNMENT_DISCLAIMER} />
    </div>
  );
}
