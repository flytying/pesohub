import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { RelatedPages } from "@/components/shared/related-pages";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
// import { AdPlaceholder } from "@/components/ads/ad-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import { Card, CardContent } from "@/components/ui/card";
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
import { formatDate, formatNumber } from "@/lib/formatters";
import {
  currentRate,
  historicalRates,
  exchangeRateFaqs,
  EXCHANGE_RATE_SOURCE,
  USD_PHP_UPDATED_AT,
} from "@/data/rates/exchange-rates";

export const metadata = generatePageMetadata({
  title: "USD to PHP Exchange Rate Today",
  description:
    "View the latest US Dollar to Philippine Peso (USD/PHP) exchange rate from the BSP. See historical rates, trends, and tips for getting the best conversion rate.",
  slug: "rates/exchange-rates/usd-to-php-today",
  updatedAt: USD_PHP_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Rates", href: "/rates" },
  { label: "USD to PHP" },
];

export default function UsdToPhpPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: "USD to PHP Exchange Rate Today",
          description:
            "Latest US Dollar to Philippine Peso exchange rate from the Bangko Sentral ng Pilipinas.",
          updatedAt: USD_PHP_UPDATED_AT,
          slug: "rates/exchange-rates/usd-to-php-today",
        })}
      />

      <PageHero
        title="USD to PHP Exchange Rate Today"
        description="Track the latest US Dollar to Philippine Peso conversion rate sourced from the Bangko Sentral ng Pilipinas (BSP)."
        badge={USD_PHP_UPDATED_AT}
        breadcrumbs={breadcrumbs}
      />

      {/* Current Rate Summary */}
      <section className="py-8">
        <div className="gradient-result overflow-hidden rounded-lg p-6 text-white sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/50">
            <DollarSign className="size-4" />
            BSP Reference Rate
          </div>
          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-white/60">1 US Dollar =</p>
              <p className="mt-1 text-5xl font-bold tracking-tight sm:text-6xl">
                {formatNumber(currentRate.rate, 4)}
                <span className="ml-2 text-2xl font-medium text-white/50 sm:text-3xl">PHP</span>
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                  currentRate.change < 0
                    ? "bg-red-500/20 text-red-300"
                    : "bg-emerald-500/20 text-emerald-300"
                }`}>
                  {currentRate.change < 0 ? (
                    <TrendingDown className="size-3" />
                  ) : (
                    <TrendingUp className="size-3" />
                  )}
                  {currentRate.change > 0 ? "+" : ""}{currentRate.change.toFixed(2)}
                </span>
                <span className="text-xs text-white/40">vs previous day</span>
              </div>
            </div>
            <div className="text-sm text-white/50 sm:text-right">
              <p>Source: <span className="text-white/70">{EXCHANGE_RATE_SOURCE}</span></p>
              <p>{formatDate(currentRate.date)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* <AdPlaceholder slot="usd-php-top" /> */}

      {/* Historical Rates Table */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Historical USD to PHP Rates (Last 7 Business Days)
        </h2>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">BSP Reference Rate</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historicalRates.map((entry) => (
                  <TableRow key={entry.date}>
                    <TableCell>{formatDate(entry.date)}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatNumber(entry.rate, 4)}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={
                          entry.change < 0
                            ? "text-red-600 dark:text-red-400"
                            : entry.change > 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-muted-foreground"
                        }
                      >
                        {entry.change > 0 ? "+" : ""}
                        {entry.change.toFixed(2)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* How to Read Exchange Rates */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          How to Read Exchange Rates
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            The BSP reference rate tells you how many Philippine Pesos one US
            Dollar is worth. When the number goes <strong>up</strong> (e.g.,
            from 56.00 to 57.00), the peso has <strong>weakened</strong>
            &mdash;you need more pesos to buy one dollar. When it goes{" "}
            <strong>down</strong>, the peso has <strong>strengthened</strong>.
          </p>
          <p>
            For <strong>OFW remittances</strong>, a higher rate is generally
            better because your dollars convert to more pesos. For{" "}
            <strong>importers or travelers going abroad</strong>, a lower rate
            means your pesos go further.
          </p>
          <p>
            Keep in mind that banks and money changers apply a{" "}
            <strong>spread</strong> (markup) on top of the BSP rate. The
            &ldquo;buying rate&rdquo; is what they pay you when you sell
            dollars, and the &ldquo;selling rate&rdquo; is what you pay when
            you buy dollars. The BSP reference rate falls somewhere in between.
          </p>
        </div>
      </section>

      {/* <AdPlaceholder slot="usd-php-mid" /> */}

      {/* Where to Get the Best Exchange Rate */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Where to Get the Best Exchange Rate
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong>Licensed money changers</strong> in business districts
              (Makati, Ortigas, Cebu IT Park) typically offer rates closest to
              the BSP reference rate. Always check that the establishment is
              BSP-licensed.
            </li>
            <li>
              <strong>Digital remittance services</strong> like Wise,
              Remitly, and Western Union Digital offer competitive rates with
              transparent fees. Compare total cost (rate + fees) rather than
              the exchange rate alone.
            </li>
            <li>
              <strong>Bank telegraphic transfers</strong> are reliable for
              large amounts but usually have wider spreads and higher fees
              compared to specialized services.
            </li>
            <li>
              <strong>Avoid airport money changers</strong>&mdash;they
              typically offer the worst rates due to high overhead and a
              captive audience.
            </li>
            <li>
              <strong>Compare multiple sources</strong> before transacting.
              Even small differences in the rate can matter significantly on
              larger amounts.
            </li>
          </ul>
        </div>
      </section>

      {/* <AdPlaceholder slot="usd-php-bottom" /> */}

      <FaqSection faqs={exchangeRateFaqs} />

      <RelatedPages currentSlug="rates/exchange-rates/usd-to-php-today" />

      <div className="py-8">
        <DisclaimerBox text="Exchange rates shown are BSP reference rates for informational purposes only. Actual rates at banks and money changers will differ due to spreads and fees. Always confirm the final rate with your provider before making a transaction." />
      </div>
    </div>
  );
}
