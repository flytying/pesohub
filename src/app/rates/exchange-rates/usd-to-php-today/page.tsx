import Link from "next/link";
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  ArrowRight,
  Info,
  BookOpen,
  Calculator,
  TriangleAlert,
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
import { formatDate, formatNumber } from "@/lib/formatters";
import {
  currentRate,
  bspRateDetails,
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

const bestRateTips = [
  {
    text: (
      <>
        <strong>Licensed money changers</strong> in business districts (Makati,
        Ortigas, Cebu IT Park) typically offer rates closest to the BSP
        reference rate. Always check that the establishment is BSP-licensed.
      </>
    ),
  },
  {
    text: (
      <>
        <strong>Digital remittance services</strong> like Wise, Remitly, and
        Western Union Digital offer competitive rates with transparent fees.
        Compare total cost (rate + fees) rather than the exchange rate alone.
      </>
    ),
  },
  {
    text: (
      <>
        <strong>Bank telegraphic transfers</strong> are reliable for large
        amounts but usually have wider spreads and higher fees compared to
        specialized services.
      </>
    ),
  },
  {
    text: (
      <>
        <strong>Avoid airport money changers</strong>&mdash;they typically offer
        the worst rates due to high overhead and a captive audience.
      </>
    ),
  },
  {
    text: (
      <>
        <strong>Compare multiple sources</strong> before transacting. Even small
        differences in the rate can matter significantly on larger amounts.
      </>
    ),
  },
];

const relatedContent = [
  {
    title: "Savings Interest Rates",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    icon: TrendingUp,
  },
  {
    title: "Digital Banks Comparison",
    href: "/rates/savings-rates/best-digital-bank-rates-philippines",
    icon: Calculator,
  },
  {
    title: "Time Deposit Rates",
    href: "/rates/savings-rates/time-deposit-rates-philippines",
    icon: DollarSign,
  },
  {
    title: "Rates Hub",
    href: "/rates",
    icon: TrendingUp,
  },
  {
    title: "Guides Hub",
    href: "/guides",
    icon: BookOpen,
  },
];

export default function UsdToPhpPage() {
  return (
    <>
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
        variant="dark"
        containerClassName="w-full max-w-[1240px] px-[clamp(20px,3vw,36px)]"
      />

      <div className="mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)] py-[clamp(18px,3vw,34px)]">
        {/* Current Rate Summary */}
        <section>
          <div
            className="relative overflow-hidden rounded-[20px] p-[clamp(24px,3vw,36px)] text-white shadow-[0_24px_50px_-22px_rgba(21,53,199,.6)]"
            style={{ background: "var(--ph-grad-panel)" }}
          >
            <div
              aria-hidden
              className="absolute -right-10 -top-12 size-[220px] rounded-full"
              style={{ background: "var(--ph-glow-cyan)" }}
            />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#B9C6FF]">
                  <DollarSign className="size-4" />
                  BSP Reference Rate
                </div>
                <p className="mt-4 text-[14px] text-[#C9D4FF]">1 US Dollar =</p>
                <p className="mt-1 font-display text-5xl font-bold leading-none tracking-tight tabular-nums sm:text-6xl">
                  {formatNumber(currentRate.rate, 4)}
                  <span className="ml-2 text-2xl font-medium text-[#B9C6FF] sm:text-3xl">
                    PHP
                  </span>
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[13px] font-bold ${
                      currentRate.change < 0
                        ? "bg-red-400/15 text-red-200"
                        : "bg-[#43E6A0]/20 text-[#6BEFC0]"
                    }`}
                  >
                    {currentRate.change < 0 ? (
                      <TrendingDown className="size-3" />
                    ) : (
                      <TrendingUp className="size-3" />
                    )}
                    {currentRate.change > 0 ? "+" : ""}
                    {currentRate.change.toFixed(2)}
                  </span>
                  <span className="text-[13px] text-[#C9D4FF]">
                    vs previous day
                  </span>
                </div>
              </div>
              <div className="text-[13px] text-[#C9D4FF] sm:text-right">
                <p>
                  Source:{" "}
                  <span className="text-white">{EXCHANGE_RATE_SOURCE}</span>
                </p>
                <p className="mt-0.5">{formatDate(currentRate.date)}</p>
              </div>
            </div>
          </div>
        </section>

        {/* BSP Rate Details */}
        <div className="mt-6 overflow-hidden rounded-[16px] border border-[#E7EBF3] bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)]">
          <table className="w-full text-[15px]">
            <tbody className="divide-y divide-[#F0F3F8]">
              <tr>
                <td className="px-6 py-[14px] text-[#5A6478]">BSP Buying Rate (T/T)</td>
                <td className="px-6 py-[14px] text-right font-display font-bold tabular-nums text-[#0E1525]">PHP {formatNumber(bspRateDetails.buyingRate, 3)}</td>
              </tr>
              <tr>
                <td className="px-6 py-[14px] text-[#5A6478]">BSP Selling Rate (T/T)</td>
                <td className="px-6 py-[14px] text-right font-display font-bold tabular-nums text-[#0E1525]">PHP {formatNumber(bspRateDetails.sellingRate, 3)}</td>
              </tr>
              <tr>
                <td className="px-6 py-[14px] text-[#5A6478]">BSP Reference Rate</td>
                <td className="px-6 py-[14px] text-right font-display font-bold tabular-nums text-[#0E1525]">PHP {formatNumber(bspRateDetails.referenceRate, 3)}</td>
              </tr>
              <tr>
                <td className="px-6 py-[14px] text-[#5A6478]">PDS Closing Rate ({formatDate(bspRateDetails.pdsClosingDate)})</td>
                <td className="px-6 py-[14px] text-right font-display font-bold tabular-nums text-[#0E1525]">PHP {formatNumber(bspRateDetails.pdsClosingRate, 3)}</td>
              </tr>
              <tr>
                <td className="px-6 py-[14px] text-[#5A6478]">SDR Rate</td>
                <td className="px-6 py-[14px] text-right font-display font-bold tabular-nums text-[#0E1525]">{bspRateDetails.sdrRate.toFixed(5)} / SDR</td>
              </tr>
              <tr>
                <td className="px-6 py-[14px] text-[#5A6478]">Gold Buying</td>
                <td className="px-6 py-[14px] text-right font-display font-bold tabular-nums text-[#0E1525]">$ {formatNumber(bspRateDetails.goldBuying, 2)}</td>
              </tr>
              <tr>
                <td className="px-6 py-[14px] text-[#5A6478]">Silver Buying</td>
                <td className="px-6 py-[14px] text-right font-display font-bold tabular-nums text-[#0E1525]">$ {bspRateDetails.silverBuying.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Historical Rates Table */}

        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Historical USD to PHP Rates (Last 7 Business Days)
          </h2>
          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">
                    BSP Reference Rate
                  </TableHead>
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
                            ? "text-red-600"
                            : entry.change > 0
                              ? "text-green-600"
                              : "text-gray-400"
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
          </div>
        </section>

        {/* How to Read Exchange Rates */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            How to Read Exchange Rates
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            The BSP reference rate tells you how many Philippine Pesos one US
            Dollar is worth. When the number goes <strong>up</strong> (e.g.,
            from 56.00 to 57.00), the peso has <strong>weakened</strong>
            &mdash;you need more pesos to buy one dollar. When it goes{" "}
            <strong>down</strong>, the peso has <strong>strengthened</strong>.
          </p>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            For <strong>OFW remittances</strong>, a higher rate is generally
            better because your dollars convert to more pesos. For{" "}
            <strong>importers or travelers going abroad</strong>, a lower rate
            means your pesos go further.
          </p>
          <div className="mt-4 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <p className="text-[16px] leading-[1.6] text-[#5A6478]">
              Keep in mind that banks and money changers apply a{" "}
              <strong>spread</strong> (markup) on top of the BSP rate. The
              &ldquo;buying rate&rdquo; is what they pay you when you sell
              dollars, and the &ldquo;selling rate&rdquo; is what you pay when
              you buy dollars. The BSP reference rate falls somewhere in between.
            </p>
          </div>
        </section>

        {/* Where to Get the Best Exchange Rate */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Where to Get the Best Exchange Rate
          </h2>
          <ul className="mt-6 space-y-3">
            {bestRateTips.map((tip, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[16px] leading-[1.6] text-[#5A6478]"
              >
                <ArrowRight className="mt-0.5 size-4 shrink-0 text-gray-300" />
                <span>{tip.text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={exchangeRateFaqs} />
        </div>

        {/* Related Pages */}
        <section className="mt-6">
          <h2 className="mb-6 text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Related rates and guides
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

        {/* Source Citation */}
        <div className="mt-16">
          <SourceCitation
            source="Bangko Sentral ng Pilipinas (BSP)"
            sourceUrl="https://www.bsp.gov.ph/SitePages/Statistics/ExchangeRate.aspx"
            updatedAt={USD_PHP_UPDATED_AT}
            reviewCadence="Daily (weekdays)"
          />
        </div>
        <div className="mt-8">
          <DisclaimerBox text="Exchange rates shown are BSP reference rates for informational purposes only. Actual rates at banks and money changers will differ due to spreads and fees. Always confirm the final rate with your provider before making a transaction." />
        </div>
      </div>
    </>
  );
}
