import Link from "next/link";
import { TrendingUp, ArrowRight, Landmark } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
import { SourceCitation } from "@/components/shared/source-citation";
import { JsonLd } from "@/components/seo/json-ld";
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

const WRAP = "mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)]";
const CARD =
  "rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]";
const H2 =
  "font-display text-[clamp(20px,2.2vw,24px)] font-semibold tracking-[-.02em] text-[#0E1525]";

const howToUse = [
  {
    lead: "For receiving remittances:",
    text: "Compare the rate you receive against the BSP rate. If the difference is more than PHP 0.50–1.00, you may get a better deal from a different provider.",
  },
  {
    lead: "For buying USD:",
    text: "The sell rate at banks is always higher than the BSP rate. Compare sell rates across multiple banks and money changers before purchasing.",
  },
  {
    lead: "For business transactions:",
    text: "The BSP rate is commonly used as the reference for import/export invoicing, government transactions, and financial reporting.",
  },
];

const exampleSteps = [
  "Today’s BSP reference rate: PHP 56.20 per USD",
  "At the BSP rate, $500 = PHP 28,100",
  "Your remittance provider offers a rate of PHP 55.80 per USD",
  "At the provider’s rate, $500 = PHP 27,900",
  "Difference: PHP 28,100 − PHP 27,900 = PHP 200 less due to the spread",
];

const relatedPages = [
  {
    title: "View Today's Exchange Rate",
    href: "/rates/exchange-rates/usd-to-php-today",
    icon: TrendingUp,
  },
  {
    title: "Government Hub",
    href: "/government",
    icon: Landmark,
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
        containerClassName={WRAP}
      />

      <div className={`${WRAP} space-y-5 pt-6`}>
        {/* At a glance */}
        <section className={CARD}>
          <h2 className={H2}>BSP reference rate at a glance</h2>
          <div className="mt-[14px] overflow-hidden rounded-[16px] border border-[#E7EBF3] bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)]">
            {keyFacts.map((fact, i) => (
              <div
                key={fact.label}
                className={`grid grid-cols-1 gap-2 px-5 py-[15px] sm:grid-cols-[0.7fr_2fr] sm:gap-4 ${
                  i % 2 ? "bg-[#FAFBFE]" : "bg-white"
                } ${i < keyFacts.length - 1 ? "border-b border-[#F0F3F8]" : ""}`}
              >
                <div className="text-[14.5px] font-bold text-[#0E1525]">
                  {fact.label}
                </div>
                <div className="text-[14.5px] leading-[1.5] text-[#475069]">
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What is the PDS */}
        <section className={CARD}>
          <h2 className={H2}>What is the Philippine Dealing System (PDS)?</h2>
          <div className="mt-3 space-y-[14px] text-[16px] leading-[1.7] text-[#475069]">
            <p>
              The Philippine Dealing System is an electronic trading platform
              where banks and authorized dealer institutions trade foreign
              currencies with each other. It is the primary interbank foreign
              exchange market in the Philippines.
            </p>
            <p>
              At the end of each trading day, the BSP computes the weighted
              average of all USD/PHP trades executed on the PDS. This weighted
              average becomes the official BSP reference exchange rate for that
              day.
            </p>
            <p>
              The BSP reference rate is not a fixed rate — it reflects actual
              market transactions and changes daily based on supply and demand
              for US dollars in the Philippine interbank market.
            </p>
          </div>
        </section>

        {/* Why bank rates differ */}
        <section className={CARD}>
          <h2 className={H2}>Why bank rates differ from the BSP rate</h2>
          <p className="mt-3 text-[16px] leading-[1.7] text-[#475069]">
            Banks, money changers, and remittance services add a spread (markup)
            to the BSP reference rate. Here is a typical comparison:
          </p>
          <div className="mt-4 overflow-hidden rounded-[16px] border border-[#E7EBF3] bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)]">
            <div className="overflow-x-auto">
              <div className="min-w-[560px]">
                <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] border-b border-[#E7EBF3] bg-[#F4F7FE]">
                  <div className="px-[18px] py-[13px] text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                    Provider
                  </div>
                  <div className="px-[18px] py-[13px] text-right text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                    Buy rate
                  </div>
                  <div className="px-[18px] py-[13px] text-right text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                    Sell rate
                  </div>
                  <div className="px-[18px] py-[13px] text-right text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]">
                    Spread
                  </div>
                </div>
                {bankSpreadExamples.map((row, i) => {
                  const highlight = row.type === "BSP Reference Rate";
                  return (
                    <div
                      key={row.type}
                      className={`grid grid-cols-[1.6fr_1fr_1fr_1fr] ${
                        highlight
                          ? "bg-[#F4F7FE]"
                          : i % 2
                            ? "bg-[#FAFBFE]"
                            : "bg-white"
                      } ${
                        i < bankSpreadExamples.length - 1
                          ? "border-b border-[#F0F3F8]"
                          : ""
                      }`}
                    >
                      <div
                        className={`px-[18px] py-[13px] text-[14px] ${
                          highlight
                            ? "font-bold text-brand"
                            : "text-[#0E1525]"
                        }`}
                      >
                        {row.type}
                      </div>
                      <div className="px-[18px] py-[13px] text-right font-mono text-[14px] tabular-nums text-[#0E1525]">
                        {row.buyRate}
                      </div>
                      <div className="px-[18px] py-[13px] text-right font-mono text-[14px] tabular-nums text-[#0E1525]">
                        {row.sellRate}
                      </div>
                      <div className="px-[18px] py-[13px] text-right font-mono text-[14px] tabular-nums text-[#5A6478]">
                        {row.spread}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <p className="mt-3 text-[13.5px] leading-[1.6] text-[#8A93A6]">
            Rates are illustrative examples. Actual rates vary by provider and
            transaction size.
          </p>
        </section>

        {/* How to use */}
        <section className={CARD}>
          <h2 className={H2}>How to use the BSP reference rate</h2>
          <p className="mt-3 text-[16px] leading-[1.7] text-[#475069]">
            The BSP reference rate is a benchmark — use it to evaluate whether
            the rate offered by your bank or money changer is reasonable. A
            smaller spread means a better deal for you.
          </p>
          <div className="mt-4 flex flex-col gap-[14px]">
            {howToUse.map((item) => (
              <p
                key={item.lead}
                className="text-[16px] leading-[1.7] text-[#475069]"
              >
                <strong className="text-[#0E1525]">{item.lead}</strong>{" "}
                {item.text}
              </p>
            ))}
          </div>
        </section>

        {/* Worked example */}
        <section className={CARD}>
          <h2 className={H2}>Worked example</h2>
          <div className="mt-[14px] rounded-[16px] border border-[#EDF1F8] bg-[#F7F9FD] p-5">
            <p className="text-[16px] leading-[1.7] text-[#475069]">
              <strong className="text-[#0E1525]">Scenario:</strong> You need to
              send $500 USD to a family member in the Philippines.
            </p>
            <div className="mt-4 flex flex-col gap-[11px]">
              {exampleSteps.map((step, i) => (
                <div key={step} className="flex items-start gap-[13px]">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#EAF0FF] font-display text-[13px] font-bold text-brand">
                    {i + 1}
                  </span>
                  <span className="text-[15.5px] leading-[1.5] text-[#344054]">
                    {step}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 border-t border-[#EEF1F7] pt-4 text-[15.5px] leading-[1.7] text-[#475069]">
              A second provider offers PHP 56.10 per USD, giving PHP 28,050 —
              only PHP 50 less than the BSP rate. Comparing rates across
              providers before sending can save you hundreds of pesos per
              transaction.
            </p>
          </div>
        </section>
      </div>

      <div className={`${WRAP} pb-20 pt-[clamp(34px,5vw,48px)]`}>
        {/* FAQ */}
        <FaqSection faqs={bspExchangeRateFaqs} />

        {/* Related */}
        <section className="mt-[clamp(34px,5vw,48px)]">
          <h2 className="mb-6 font-display text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-.02em] text-[#0E1525]">
            Related pages
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {relatedPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.title}
                  href={page.href}
                  className="group flex items-center gap-[14px] rounded-[14px] border border-[#E7EBF3] bg-white px-[18px] py-[15px] transition-colors hover:border-[#C3D0F2] hover:bg-[#FBFCFE]"
                >
                  <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[11px] bg-[#EAF0FF]">
                    <Icon className="size-[18px] text-brand" />
                  </span>
                  <span className="flex-1 text-[15.5px] font-bold leading-[1.3] text-[#0E1525]">
                    {page.title}
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-[#C4CCDB] transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Source & disclaimer */}
        <div className="mt-[clamp(34px,5vw,48px)]">
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
