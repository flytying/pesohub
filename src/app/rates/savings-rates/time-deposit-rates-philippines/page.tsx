import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  ArrowUp,
  CheckCircle,
  Info,
  Clock,
  Wallet,
  Smartphone,
  Shield,
  Calculator,
  TrendingUp,
  PiggyBank,
  BookOpen,
  Target,
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
import { formatPeso, formatPercent } from "@/lib/formatters";
import {
  bankTimeDepositRates,
  timeDepositRateFaqs,
  TIME_DEPOSIT_RATES_UPDATED_AT,
} from "@/data/rates/time-deposit-rates";

export const metadata = generatePageMetadata({
  title:
    "Time Deposit Rates Philippines – Compare Terms, Minimum Deposit & Gross Rates | PesoHub",
  description:
    "Compare time deposit rates in the Philippines by term length, minimum deposit, gross rate, and tax note. Review fixed-term deposit options in one place with PesoHub.",
  slug: "rates/savings-rates/time-deposit-rates-philippines",
  updatedAt: TIME_DEPOSIT_RATES_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Rates", href: "/rates" },
  { label: "Time Deposit Rates" },
];

const needCards = [
  {
    icon: Clock,
    title: "Best for Short-Term Parking",
    description:
      "Best for users who want a shorter lock-in period and easier access after maturity.",
  },
  {
    icon: TrendingUp,
    title: "Best for Longer-Term Return",
    description:
      "Best for users who can leave funds untouched for a longer period.",
  },
  {
    icon: Wallet,
    title: "Best for Lower Minimum Deposit",
    description:
      "Best for users who want to start with a smaller placement amount.",
  },
  {
    icon: Smartphone,
    title: "Best for Digital-First Access",
    description:
      "Best for users who prefer app-based banks or digital account opening.",
  },
  {
    icon: Shield,
    title: "Best for Simpler Product Terms",
    description:
      "Best for users who want easier-to-understand rate structures.",
  },
];

const taxExamples = [
  { gross: 4, net: 3.2 },
  { gross: 5, net: 4 },
  { gross: 6, net: 4.8 },
];

const termLengthPoints = [
  "shorter terms may suit parked cash",
  "longer terms may suit planned savings you will not need immediately",
  "a higher rate may not be worth it if the lock-in is too restrictive",
];

const notesChecklist = [
  "a visible notes column",
  "a visible update date",
  "clear distinction between current and older terms",
  "careful handling of promotional or segment-based rates",
];

const relatedPages = [
  {
    title: "Time Deposit Calculator",
    href: "/calculators/savings/time-deposit-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Best Savings Interest Rates",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    icon: PiggyBank,
  },
  {
    title: "Rates Hub",
    href: "/rates",
    icon: TrendingUp,
  },
  {
    title: "Savings Goal Calculator",
    href: "/calculators/savings/savings-goal-calculator-philippines",
    icon: Target,
  },
  {
    title: "Guides Hub",
    href: "/guides",
    icon: BookOpen,
  },
];

export default function TimeDepositRatesPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: "Time Deposit Rates Philippines",
          description:
            "Compare time deposit rates in the Philippines by term length, minimum deposit, gross rate, and tax note.",
          updatedAt: TIME_DEPOSIT_RATES_UPDATED_AT,
          slug: "rates/savings-rates/time-deposit-rates-philippines",
        })}
      />

      <PageHero
        title="Time Deposit Rates Philippines"
        description="Compare time deposit rates in the Philippines across different banks, terms, and minimum deposit requirements. Use this page to review gross advertised rates, check lock-in periods, compare minimum placement amounts, and understand what to look at before choosing a fixed-term deposit."
        badge={TIME_DEPOSIT_RATES_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Time Deposit Comparison Table */}
        <section>
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Time Deposit Comparison Table
          </h2>
          <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
            Compare time deposit products using the factors that matter most in
            real use, not just the highest advertised rate.
          </p>
          <div className="mt-4 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <p className="text-[16px] leading-[22px] text-gray-400">
              Use this table to compare time deposit products by tenor, rate, and
              minimum placement. Check the notes column carefully because banks
              may revise rates or remove certain terms over time.
            </p>
          </div>
          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bank</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Term</TableHead>
                  <TableHead className="text-right">Gross Rate</TableHead>
                  <TableHead className="text-right">Min. Deposit</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Tax Note
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Best For
                  </TableHead>
                  <TableHead className="hidden xl:table-cell">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bankTimeDepositRates.map((rate, i) => (
                  <TableRow key={`${rate.bankName}-${rate.termLength}-${i}`}>
                    <TableCell className="font-medium">
                      {rate.bankName}
                    </TableCell>
                    <TableCell className="text-[14px]">
                      {rate.product}
                    </TableCell>
                    <TableCell className="text-[14px]">
                      {rate.termLength}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-brand">
                      {formatPercent(rate.grossRate)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPeso(rate.minimumDeposit, 0)}
                    </TableCell>
                    <TableCell className="hidden text-[14px] text-gray-400 sm:table-cell">
                      {rate.taxNote}
                    </TableCell>
                    <TableCell className="hidden text-[14px] text-gray-400 lg:table-cell">
                      {rate.bestFor}
                    </TableCell>
                    <TableCell className="hidden text-[14px] text-gray-400 xl:table-cell">
                      {rate.notes}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-3 text-[14px] text-gray-400">
            Rates, terms, and product details may change. Always verify the
            latest bank terms before placing funds.
          </p>
        </section>

        {/* Time Deposit Rates Are Usually Shown Before Tax */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Time Deposit Rates Are Usually Shown Before Tax
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Banks often show time deposit rates as gross annual rates. But
            interest income from bank deposits is generally subject to final
            withholding tax, which means your actual earnings may be lower than
            the headline rate. Recent BIR guidance and bank advisories reflect a
            20% final withholding tax environment for deposit interest.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {taxExamples.map((ex) => (
              <div
                key={ex.gross}
                className="rounded-xl border border-gray-200 bg-white p-4 text-center"
              >
                <p className="text-2xl font-bold text-gray-500">
                  {formatPercent(ex.gross)}
                </p>
                <p className="text-[14px] text-gray-400">gross rate</p>
                <div className="my-2 border-t border-gray-200" />
                <p className="text-lg font-semibold text-brand">
                  ≈ {formatPercent(ex.net)}
                </p>
                <p className="text-[14px] text-gray-400">
                  after 20% withholding tax
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[14px] text-gray-400">
            Use gross rates for comparison, but keep after-tax return in mind
            when deciding where to place your money.
          </p>
        </section>

        {/* Why Term Length Matters */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Why Term Length Matters
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            A longer time deposit term may offer a different rate from a shorter
            one, but it also means your funds are locked in longer. The best
            option depends on whether you value flexibility or are willing to
            commit for a higher or more stable return.
          </p>
          <ul className="mt-6 space-y-3">
            {termLengthPoints.map((item) => (
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

        {/* Why Minimum Deposit Matters */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Why Minimum Deposit Matters
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Some time deposit products are accessible with smaller starting
            amounts, while others require a much larger placement. This is one
            of the biggest practical filters users apply when comparing rates, so
            it should be easy to scan in the table.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex size-14 items-center justify-center rounded-full bg-gray-50 text-brand">
                <ArrowDown className="size-6" />
              </div>
              <h3 className="mt-4 text-[20px] font-semibold leading-[26px] text-gray-500">
                Lower minimum deposit
              </h3>
              <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
                May be more useful if you are testing a product for the first
                time or starting with a smaller amount.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex size-14 items-center justify-center rounded-full bg-gray-50 text-brand">
                <ArrowUp className="size-6" />
              </div>
              <h3 className="mt-4 text-[20px] font-semibold leading-[26px] text-gray-500">
                Higher minimum deposit
              </h3>
              <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
                May be acceptable if the product fits a larger parked-cash
                strategy or if you already have the funds available.
              </p>
            </div>
          </div>
        </section>

        {/* Why Notes Matter */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Why Notes Matter on a Time Deposit Page
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Time deposit products can change over time. A product may revise
            rates, remove certain tenors, or apply different rates based on
            customer segment. CIMB Bank PH, for example, announced revised
            MaxSave rates effective January 9, 2026, and later announced that
            the 24-month tenor would no longer be offered for new placements
            effective February 11, 2026.
          </p>
          <p className="mt-4 text-[16px] font-medium text-gray-500">
            That is why a good comparison page needs:
          </p>
          <ul className="mt-4 space-y-3">
            {notesChecklist.map((item) => (
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

        {/* Quick Picks by Deposit Need */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Quick Picks by Deposit Need
          </h2>
          <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
            Start with the kind of time deposit setup you want, not just the
            highest published number.
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

      </div>

      {/* Calculator CTA */}
      <section className="bg-surface-tertiary py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Want to Estimate Your Return?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-[22px] text-gray-400">
            After comparing rates, use the Time Deposit Calculator to
            estimate gross interest, after-tax interest, and maturity amount
            for a specific deposit scenario.
          </p>
          <div className="mt-6">
            <Link
              href="/calculators/savings/time-deposit-calculator-philippines"
              className="inline-flex items-center rounded-full bg-brand px-6 py-3 text-[14px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
            >
              USE THE TIME DEPOSIT CALCULATOR
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-0 pb-20 sm:px-6 lg:px-8">
        {/* Editorial note */}
        <section className="mt-16 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
          <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
          <div>
            <h3 className="text-[16px] font-semibold text-gray-500">
              How we compare time deposits
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-gray-400">
              PesoHub compares time deposit products using publicly available
              product information such as advertised gross rates, term lengths,
              minimum deposit requirements, and product notes. Rates and account
              details may change, so always verify the latest information with
              the bank directly.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={timeDepositRateFaqs} />
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
            updatedAt={TIME_DEPOSIT_RATES_UPDATED_AT}
            reviewCadence="Every 2 weeks"
          />
        </div>

        {/* Disclaimer */}
        <div className="mt-8">
          <DisclaimerBox text="Time deposit rates shown are subject to change without prior notice. Rates are gross (before the 20% final withholding tax on interest income). Promotional rates may expire, and product tenors may be revised or removed. Always verify the current rate and terms directly with the bank before placing funds. This page is not affiliated with any bank listed." />
        </div>
      </div>
    </>
  );
}
