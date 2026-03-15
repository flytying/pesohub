import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";
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
  bspExchangeRateMeta,
  keyFacts,
  bankSpreadExamples,
  bspExchangeRateFaqs,
  BSP_EXCHANGE_RATE_UPDATED_AT,
} from "@/data/government/bsp-exchange-rate";

export const metadata = generatePageMetadata({
  title: bspExchangeRateMeta.metaTitle,
  description: bspExchangeRateMeta.metaDescription,
  slug: bspExchangeRateMeta.slug,
  updatedAt: BSP_EXCHANGE_RATE_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "BSP Exchange Rate Guide" },
];

export default function BSPExchangeRateGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: bspExchangeRateMeta.metaTitle,
          description: bspExchangeRateMeta.metaDescription,
          updatedAt: BSP_EXCHANGE_RATE_UPDATED_AT,
          slug: bspExchangeRateMeta.slug,
        })}
      />

      <PageHero
        title={bspExchangeRateMeta.title}
        description={bspExchangeRateMeta.directAnswer}
        badge={BSP_EXCHANGE_RATE_UPDATED_AT}
        breadcrumbs={breadcrumbs}
      />

      {/* Government Disclaimer */}
      <Card className="mb-8 border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
        <CardContent className="p-4 text-sm text-muted-foreground">
          {GOVERNMENT_DISCLAIMER}
        </CardContent>
      </Card>

      {/* Key Facts */}
      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg">BSP Reference Rate at a Glance</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2">
            {keyFacts.map((fact) => (
              <div key={fact.label} className="flex gap-2 text-sm">
                <dt className="font-medium shrink-0 w-36">{fact.label}:</dt>
                <dd className="text-muted-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      {/* <AdPlaceholder slot="gov-bsp-rate-top" className="my-8" /> */}

      {/* What is the PDS */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          What Is the Philippine Dealing System (PDS)?
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            The Philippine Dealing System is an electronic trading platform where
            banks and authorized dealer institutions trade foreign currencies with
            each other. It is the primary interbank foreign exchange market in the
            Philippines.
          </p>
          <p>
            At the end of each trading day, the BSP computes the weighted average of
            all USD/PHP trades executed on the PDS. This weighted average becomes the
            official BSP reference exchange rate for that day.
          </p>
          <p>
            The BSP reference rate is not a fixed rate — it reflects actual market
            transactions and changes daily based on supply and demand for US dollars
            in the Philippine interbank market.
          </p>
        </div>
      </section>

      {/* Bank Spreads Explained */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Why Bank Rates Differ from the BSP Rate
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Banks, money changers, and remittance services add a spread (markup) to
          the BSP reference rate. Here is a typical comparison:
        </p>
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Provider</TableHead>
                <TableHead className="text-right whitespace-nowrap">Buy Rate</TableHead>
                <TableHead className="text-right whitespace-nowrap">Sell Rate</TableHead>
                <TableHead className="text-right whitespace-nowrap">Spread</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bankSpreadExamples.map((row) => (
                <TableRow key={row.type}>
                  <TableCell className="text-sm font-medium">{row.type}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{row.buyRate}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{row.sellRate}</TableCell>
                  <TableCell className="text-right text-sm">{row.spread}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Rates are illustrative examples. Actual rates vary by provider and transaction size.
        </p>
      </section>

      {/* <AdPlaceholder slot="gov-bsp-rate-mid" className="my-8" /> */}

      {/* How to Use the BSP Rate */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          How to Use the BSP Reference Rate
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            The BSP reference rate is a benchmark — use it to evaluate whether the
            rate offered by your bank or money changer is reasonable. A smaller
            spread means a better deal for you.
          </p>
          <p>
            <strong>For receiving remittances:</strong> Compare the rate you receive
            against the BSP rate. If the difference is more than PHP 0.50–1.00, you
            may get a better deal from a different provider.
          </p>
          <p>
            <strong>For buying USD:</strong> The sell rate at banks is always higher
            than the BSP rate. Compare sell rates across multiple banks and money
            changers before purchasing.
          </p>
          <p>
            <strong>For business transactions:</strong> The BSP rate is commonly used
            as the reference for import/export invoicing, government transactions, and
            financial reporting.
          </p>
        </div>
      </section>

      {/* Worked Example */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Worked Example
        </h2>
        <Card>
          <CardContent className="space-y-3 p-6 text-sm">
            <p><strong>Scenario:</strong> You need to send $500 USD to a family member in the Philippines.</p>
            <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
              <li>Today&apos;s BSP reference rate: PHP 56.20 per USD</li>
              <li>At the BSP rate, $500 = PHP 28,100</li>
              <li>Your remittance provider offers a rate of PHP 55.80 per USD</li>
              <li>At the provider&apos;s rate, $500 = PHP 27,900</li>
              <li>Difference: PHP 28,100 – PHP 27,900 = <strong>PHP 200 less</strong> due to the spread</li>
            </ol>
            <p className="text-muted-foreground">
              A second provider offers PHP 56.10 per USD, giving PHP 28,050 — only PHP 50
              less than the BSP rate. Comparing rates across providers before sending can
              save you hundreds of pesos per transaction.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Related Page Callout */}
      <Card className="my-8 border-primary/20 bg-primary/5">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <TrendingUp className="size-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">View Today&apos;s Exchange Rate</p>
            <p className="text-sm text-muted-foreground">
              See the current USD to PHP rate with historical trends.
            </p>
          </div>
          <Link
            href="/rates/exchange-rates/usd-to-php-today"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View Rate <ArrowRight className="size-3.5" />
          </Link>
        </CardContent>
      </Card>

      {/* <AdPlaceholder slot="gov-bsp-rate-bottom" className="my-8" /> */}

      <FaqSection faqs={bspExchangeRateFaqs} />

      <RelatedPages currentSlug="/government/bsp/bsp-exchange-rate-guide" />

      <DisclaimerBox text={GOVERNMENT_DISCLAIMER} />
    </div>
  );
}
