import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Info,
  Smartphone,
  Clock,
  Wallet,
  Shield,
  TrendingUp,
  PiggyBank,
  BookOpen,
  Calculator,
  Target,
  CreditCard,
  ArrowLeftRight,
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
import { formatPercent } from "@/lib/formatters";
import {
  digitalBankRates,
  digitalBankFaqs,
  DIGITAL_BANK_RATES_UPDATED_AT,
} from "@/data/rates/digital-bank-rates";

export const metadata = generatePageMetadata({
  title:
    "Digital Banks Comparison Philippines – Rates, Transfers, Cards & Best Use Cases | PesoHub",
  description:
    "Compare digital banks in the Philippines by base rate, promo rate, transfers, card access, limits, and deposit insurance notes. Find the best fit for your use case.",
  slug: "rates/savings-rates/best-digital-bank-rates-philippines",
  updatedAt: DIGITAL_BANK_RATES_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Rates", href: "/rates" },
  { label: "Digital Banks Comparison" },
];

const needCards = [
  {
    icon: Wallet,
    title: "Best for Everyday Spending",
    description:
      "Best for users who want a digital bank that works well for regular payments and daily account use.",
  },
  {
    icon: TrendingUp,
    title: "Best for Rate-Focused Savers",
    description:
      "Best for users comparing where to park cash for stronger savings yield.",
  },
  {
    icon: ArrowLeftRight,
    title: "Best for Transfer-Heavy Users",
    description:
      "Best for users who care most about app-based transfers and day-to-day movement of money.",
  },
  {
    icon: CreditCard,
    title: "Best for Card and ATM Access",
    description:
      "Best for users who want easier cash access or debit-card convenience.",
  },
  {
    icon: Shield,
    title: "Best for Simpler Setup",
    description:
      "Best for users who want a cleaner, easier-to-understand product with fewer moving parts.",
  },
];

const baseRatePoints = [
  "base rate is the more stable savings rate",
  "promo rate may depend on conditions or limited periods",
  "a higher promo rate is not always easier to maintain",
  "users should compare both headline yield and practicality",
];

const accessPoints = [
  "some users want a bank for daily spending",
  "some want a bank mainly for savings",
  "card and ATM access may matter more than rate for cash users",
  "transfer experience matters for people moving money often",
];

const relatedPages = [
  {
    title: "Best Savings Interest Rates",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    icon: PiggyBank,
  },
  {
    title: "Time Deposit Rates",
    href: "/rates/savings-rates/time-deposit-rates-philippines",
    icon: Clock,
  },
  {
    title: "Time Deposit Calculator",
    href: "/calculators/savings/time-deposit-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Savings Goal Calculator",
    href: "/calculators/savings/savings-goal-calculator-philippines",
    icon: Target,
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

export default function DigitalBankRatesPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: "Digital Banks Comparison Philippines",
          description:
            "Compare digital banks in the Philippines based on savings rates, transfer experience, card and ATM access, deposit insurance, account limits, and everyday usability.",
          updatedAt: DIGITAL_BANK_RATES_UPDATED_AT,
          slug: "rates/savings-rates/best-digital-bank-rates-philippines",
        })}
      />

      <PageHero
        title="Digital Banks Comparison Philippines"
        description="Compare digital banks in the Philippines based on savings rates, transfer experience, card and ATM access, deposit insurance, account limits, and everyday usability. Use this page to find the digital bank that fits your actual use case, not just the one with the highest advertised rate."
        badge={DIGITAL_BANK_RATES_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Digital Bank Comparison Table */}
        <section>
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Digital Bank Comparison Table
          </h2>
          <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
            Compare digital banks side by side using the features that matter
            most in real use, not just the highest rate on a promo banner.
          </p>
          <div className="mt-4 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <p className="text-[16px] leading-[22px] text-gray-400">
              This table separates regular rates from promo-driven rates and
              makes access features easy to scan. Start with your use case
              first, then compare base rate, promo rate, access features, and
              product notes.
            </p>
          </div>
          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bank</TableHead>
                  <TableHead>Best For</TableHead>
                  <TableHead className="text-right">Base Rate</TableHead>
                  <TableHead className="text-right">Promo Rate</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Card / ATM Access
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Transfers
                  </TableHead>
                  <TableHead className="hidden xl:table-cell">
                    Deposit Insurance
                  </TableHead>
                  <TableHead className="hidden xl:table-cell">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {digitalBankRates.map((bank) => (
                  <TableRow key={bank.bankName}>
                    <TableCell className="font-medium">
                      {bank.bankName}
                    </TableCell>
                    <TableCell className="text-[14px] text-gray-400">
                      {bank.bestFor}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-brand">
                      {formatPercent(bank.baseRate)}
                    </TableCell>
                    <TableCell className="text-right">
                      {bank.promoRate ? (
                        <span className="font-semibold text-amber-600">
                          {formatPercent(bank.promoRate)}
                        </span>
                      ) : (
                        <span className="text-gray-400">&mdash;</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden text-[14px] text-gray-400 sm:table-cell">
                      {bank.cardAtmAccess}
                    </TableCell>
                    <TableCell className="hidden text-[14px] text-gray-400 lg:table-cell">
                      {bank.transfers}
                    </TableCell>
                    <TableCell className="hidden text-[14px] text-gray-400 xl:table-cell">
                      {bank.depositInsurance}
                    </TableCell>
                    <TableCell className="hidden text-[14px] text-gray-400 xl:table-cell">
                      {bank.notes}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-3 text-[14px] text-gray-400">
            Always verify the latest product terms, promos, and account
            conditions directly with the bank before opening an account or
            moving funds.
          </p>
        </section>

        {/* Base Rate vs Promo Rate */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Base Rate vs Promo Rate
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            One of the biggest reasons digital bank comparisons can be misleading
            is that some banks highlight promotional rates while others emphasize
            a simpler regular rate. A fair comparison should separate these two
            clearly.
          </p>
          <ul className="mt-6 space-y-3">
            {baseRatePoints.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[16px] leading-[22px] text-gray-400"
              >
                <ArrowRight className="mt-0.5 size-4 shrink-0 text-gray-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <p className="text-[16px] leading-[22px] text-gray-400">
              This is why the comparison table shows both base rate and promo
              rate instead of combining them into one number.
            </p>
          </div>
        </section>

        {/* Why Access Features Matter */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Why Access Features Matter
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            A digital bank can look attractive on rate alone, but access matters
            just as much for daily use. Some users care more about cash access,
            debit cards, and transfers than about squeezing out the highest
            possible yield.
          </p>
          <ul className="mt-6 space-y-3">
            {accessPoints.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[16px] leading-[22px] text-gray-400"
              >
                <ArrowRight className="mt-0.5 size-4 shrink-0 text-gray-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Deposit Insurance and Trust Notes */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Deposit Insurance and Trust Notes
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            For deposit products, trust and protection matter. PDIC increased
            the maximum deposit insurance coverage to ₱1,000,000 per depositor,
            per bank effective March 15, 2025, and that should be clearly
            reflected in the comparison notes for any deposit-focused digital
            bank page.
          </p>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            This does not replace product due diligence, but it is one of the
            clearest trust signals users look for when comparing where to keep
            money.
          </p>
        </section>

        {/* Best Digital Bank Options by Need */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Best Digital Bank Options by Need
          </h2>
          <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
            Start with how you plan to use the account, not just the headline
            rate.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {needCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-xl border border-gray-200 bg-white p-6"
                >
                  <div className="flex size-14 items-center justify-center rounded-full bg-gray-50 text-brand">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-4 text-[20px] font-semibold leading-[26px] text-gray-500">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Editorial note */}
        <section className="mt-16 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
          <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
          <div>
            <h3 className="text-[16px] font-semibold text-gray-500">
              How we compare digital banks
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-gray-400">
              PesoHub compares digital banks using publicly available product
              information such as advertised base and promo rates, card and ATM
              access, transfer features, account limits, and deposit insurance
              notes. Rates and account details may change, so always verify the
              latest information with the bank directly.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={digitalBankFaqs} />
        </div>

        {/* Related Pages */}
        <section className="mt-16">
          <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
            Related savings and rates pages
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.title}
                  href={page.href}
                  className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-brand">
                    <Icon className="size-4" />
                  </div>
                  <span className="flex-1 text-[16px] font-semibold text-gray-500 group-hover:text-brand">
                    {page.title}
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
            source="Individual bank websites and product disclosures"
            sourceUrl="https://www.bsp.gov.ph/SitePages/FinancialStability/DirBanksFIList.aspx"
            updatedAt={DIGITAL_BANK_RATES_UPDATED_AT}
            reviewCadence="Every 2 weeks"
          />
        </div>

        {/* Disclaimer */}
        <div className="mt-8">
          <DisclaimerBox text="Interest rates shown are subject to change without prior notice. Rates are gross (before the 20% final withholding tax on interest income). Promotional rates may expire. Always verify the current rate directly with the bank before opening an account. This page is not affiliated with any bank listed." />
        </div>
      </div>
    </>
  );
}
