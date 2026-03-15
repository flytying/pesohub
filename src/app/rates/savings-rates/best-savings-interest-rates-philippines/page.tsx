import { Trophy } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { RelatedPages } from "@/components/shared/related-pages";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
import { SourceCitation } from "@/components/shared/source-citation";
// import { AdPlaceholder } from "@/components/ads/ad-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { formatPeso, formatPercent } from "@/lib/formatters";
import {
  bankSavingsRates,
  savingsRateFaqs,
  SAVINGS_RATES_UPDATED_AT,
} from "@/data/rates/savings-rates";

export const metadata = generatePageMetadata({
  title: "Best Savings Interest Rates Philippines 2026",
  description:
    "Compare the highest savings account interest rates in the Philippines for 2026. See rates from Maya, Tonik, GoTyme, SeaBank, CIMB, BDO, BPI, and more.",
  slug: "rates/savings-rates/best-savings-interest-rates-philippines",
  updatedAt: SAVINGS_RATES_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Rates", href: "/rates" },
  { label: "Savings Rates" },
];

export default function BestSavingsRatesPage() {
  const topBanks = bankSavingsRates.slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: "Best Savings Interest Rates Philippines 2026",
          description:
            "Compare the highest savings account interest rates from Philippine banks in 2026.",
          updatedAt: SAVINGS_RATES_UPDATED_AT,
          slug: "rates/savings-rates/best-savings-interest-rates-philippines",
        })}
      />

      <PageHero
        title="Best Savings Interest Rates Philippines 2026"
        description="Compare interest rates from the top digital banks and traditional banks in the Philippines. Find the highest-yield savings account for your money."
        badge={SAVINGS_RATES_UPDATED_AT}
        breadcrumbs={breadcrumbs}
      />

      {/* Top 3 Banks Summary */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Top 3 Highest Interest Rates
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {topBanks.map((bank, index) => (
            <div
              key={bank.bankName}
              className={`overflow-hidden rounded-lg p-5 ${
                index === 0
                  ? "gradient-result text-white"
                  : "ring-1 ring-foreground/10 bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className={`text-sm font-semibold ${index === 0 ? "text-white" : "text-foreground"}`}>
                  {bank.bankName}
                </p>
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                  index === 0
                    ? "bg-white/15 text-white/80"
                    : "bg-secondary text-secondary-foreground"
                }`}>
                  {index === 0 && <Trophy className="size-3" />}
                  #{index + 1}
                </span>
              </div>
              <p className={`mt-3 text-4xl font-bold tracking-tight ${
                index === 0 ? "text-white" : "text-foreground"
              }`}>
                {formatPercent(bank.interestRate)}
              </p>
              <p className={`text-xs ${index === 0 ? "text-white/50" : "text-muted-foreground"}`}>
                per annum
              </p>
              <div className={`mt-3 border-t pt-3 ${index === 0 ? "border-white/15" : "border-border"}`}>
                <p className={`text-sm ${index === 0 ? "text-white/70" : "text-muted-foreground"}`}>
                  {bank.accountType}
                </p>
                {bank.notes && (
                  <p className={`mt-1 text-xs italic ${index === 0 ? "text-white/40" : "text-muted-foreground/70"}`}>
                    {bank.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* <AdPlaceholder slot="savings-rates-top" /> */}

      {/* Full Comparison Table */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          All Savings Account Rates Compared
        </h2>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bank</TableHead>
                  <TableHead>Account Type</TableHead>
                  <TableHead className="text-right">Interest Rate</TableHead>
                  <TableHead className="text-right">Min. Balance</TableHead>
                  <TableHead className="hidden sm:table-cell">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bankSavingsRates.map((bank) => (
                  <TableRow key={bank.bankName}>
                    <TableCell className="font-medium">
                      {bank.bankName}
                    </TableCell>
                    <TableCell>{bank.accountType}</TableCell>
                    <TableCell className="text-right font-semibold text-primary">
                      {formatPercent(bank.interestRate)}
                    </TableCell>
                    <TableCell className="text-right">
                      {bank.minimumBalance === 0
                        ? "None"
                        : formatPeso(bank.minimumBalance, 0)}
                    </TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">
                      {bank.notes}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <p className="mt-2 text-xs text-muted-foreground">
          Rates are gross (before the 20% withholding tax on interest income).
          Actual credited interest will be lower. Rates may change without
          prior notice.
        </p>
      </section>

      {/* Digital Banks vs Traditional Banks */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Digital Banks vs Traditional Banks
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Digital banks in the Philippines consistently offer interest rates
            that are <strong>10x to 60x higher</strong> than traditional banks.
            This is because they operate without physical branches, which
            significantly reduces overhead costs. They pass these savings to
            depositors through higher interest rates.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Digital Banks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  <li>Higher interest rates (3% to 15% p.a.)</li>
                  <li>No or very low minimum balance</li>
                  <li>Easy account opening via mobile app</li>
                  <li>PDIC-insured up to PHP 1,000,000</li>
                  <li>Limited or no physical branch access</li>
                  <li>Some promo rates may expire</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Traditional Banks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  <li>Lower interest rates (0.10% to 0.50% p.a.)</li>
                  <li>Higher minimum balance requirements</li>
                  <li>Physical branch and ATM network</li>
                  <li>PDIC-insured up to PHP 1,000,000</li>
                  <li>More comprehensive services (loans, checks, etc.)</li>
                  <li>Established reputation and track record</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* <AdPlaceholder slot="savings-rates-mid" /> */}

      {/* How to Choose a Savings Account */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          How to Choose a Savings Account
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong>Check if the bank is BSP-licensed and PDIC-insured.</strong>{" "}
              This is the most important factor. All banks listed above are
              BSP-regulated and covered by PDIC deposit insurance up to PHP
              1,000,000 per depositor per bank.
            </li>
            <li>
              <strong>Look beyond the headline rate.</strong> Some rates are
              promotional and may drop after a few months. Ask the bank how
              long the rate is guaranteed and what the base rate will be after
              the promo period ends.
            </li>
            <li>
              <strong>Consider the 20% withholding tax.</strong> The interest
              rate you see is the gross rate. The bank withholds 20% tax on
              interest earned. A 6% gross rate gives you an effective 4.8%
              after tax.
            </li>
            <li>
              <strong>Evaluate ease of access.</strong> Can you easily withdraw
              your money through InstaPay, PESONet, or ATM? Are there
              withdrawal limits or fees? Make sure the account fits your
              liquidity needs.
            </li>
            <li>
              <strong>Diversify across banks.</strong> Since PDIC coverage is
              capped at PHP 1,000,000 per bank, consider spreading larger
              deposits across multiple banks to maximize your insured
              coverage.
            </li>
          </ul>
        </div>
      </section>

      {/* <AdPlaceholder slot="savings-rates-bottom" /> */}

      <FaqSection faqs={savingsRateFaqs} />

      <RelatedPages currentSlug="rates/savings-rates/best-savings-interest-rates-philippines" />

      <div className="py-4">
        <SourceCitation
          source="Individual bank websites"
          sourceUrl="https://www.bsp.gov.ph/SitePages/FinancialStability/DirBanksFIs.aspx"
          updatedAt={SAVINGS_RATES_UPDATED_AT}
          reviewCadence="Every 2 weeks"
        />
      </div>
      <div className="py-8">
        <DisclaimerBox text="Interest rates shown are subject to change without prior notice. Rates are gross (before the 20% final withholding tax on interest income). Promotional rates may expire. Always verify the current rate directly with the bank before opening an account. This page is not affiliated with any bank listed." />
      </div>
    </div>
  );
}
