import Link from "next/link";
import { TrendingUp, ArrowRight, Info } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
import { SourceCitation } from "@/components/shared/source-citation";
// import { AdPlaceholder } from "@/components/ads/ad-placeholder";
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

const relatedContent = [
  {
    title: "View Today's Exchange Rate",
    href: "/rates/exchange-rates/usd-to-php-today",
    icon: TrendingUp,
  },
];

export default function BSPExchangeRateGuidePage() {
  return (
    <>
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
        variant="dark"
      />

    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Key Facts */}
      <section>
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          BSP Reference Rate at a Glance
        </h2>
        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6">
          <dl className="space-y-2">
            {keyFacts.map((fact) => (
              <div key={fact.label} className="flex gap-2 text-[16px] leading-[22px]">
                <dt className="font-medium shrink-0 w-36 text-gray-500">{fact.label}:</dt>
                <dd className="text-gray-400">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* <AdPlaceholder slot="gov-bsp-rate-top" className="my-8" /> */}

      {/* What is the PDS */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          What Is the Philippine Dealing System (PDS)?
        </h2>
        <div className="mt-4 space-y-3 text-[16px] leading-[22px] text-gray-400">
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
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Why Bank Rates Differ from the BSP Rate
        </h2>
        <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
          Banks, money changers, and remittance services add a spread (markup) to
          the BSP reference rate. Here is a typical comparison:
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
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
                  <TableCell className="text-[16px] font-medium">{row.type}</TableCell>
                  <TableCell className="text-right font-mono text-[16px]">{row.buyRate}</TableCell>
                  <TableCell className="text-right font-mono text-[16px]">{row.sellRate}</TableCell>
                  <TableCell className="text-right text-[16px]">{row.spread}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 text-[14px] text-gray-400">
          Rates are illustrative examples. Actual rates vary by provider and transaction size.
        </p>
      </section>

      {/* <AdPlaceholder slot="gov-bsp-rate-mid" className="my-8" /> */}

      {/* How to Use the BSP Rate */}
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          How to Use the BSP Reference Rate
        </h2>
        <div className="mt-4 space-y-3 text-[16px] leading-[22px] text-gray-400">
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
      <section className="mt-16">
        <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
          Worked Example
        </h2>
        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6">
          <div className="space-y-3 text-[16px] leading-[22px]">
            <p className="text-gray-500"><strong>Scenario:</strong> You need to send $500 USD to a family member in the Philippines.</p>
            <ol className="list-decimal space-y-2 pl-5 text-gray-400">
              <li>Today&apos;s BSP reference rate: PHP 56.20 per USD</li>
              <li>At the BSP rate, $500 = PHP 28,100</li>
              <li>Your remittance provider offers a rate of PHP 55.80 per USD</li>
              <li>At the provider&apos;s rate, $500 = PHP 27,900</li>
              <li>Difference: PHP 28,100 – PHP 27,900 = <strong>PHP 200 less</strong> due to the spread</li>
            </ol>
            <p className="text-gray-400">
              A second provider offers PHP 56.10 per USD, giving PHP 28,050 — only PHP 50
              less than the BSP rate. Comparing rates across providers before sending can
              save you hundreds of pesos per transaction.
            </p>
          </div>
        </div>
      </section>

      {/* <AdPlaceholder slot="gov-bsp-rate-bottom" className="my-8" /> */}

      <div className="mt-16">
        <FaqSection faqs={bspExchangeRateFaqs} />
      </div>

      {/* Related Content */}
      <section className="mt-16">
        <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
          Related pages
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

      <div className="mt-16">
        <SourceCitation
          source="Bangko Sentral ng Pilipinas (BSP)"
          sourceUrl="https://www.bsp.gov.ph/SitePages/Statistics/ExchangeRate.aspx"
          updatedAt={BSP_EXCHANGE_RATE_UPDATED_AT}
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
