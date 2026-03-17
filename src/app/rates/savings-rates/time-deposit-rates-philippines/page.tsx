import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Info,
  Clock,
  Wallet,
  Smartphone,
  Landmark,
  Shield,
  Calculator,
  TrendingUp,
  PiggyBank,
  BookOpen,
  Target,
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
  CardDescription,
  CardContent,
} from "@/components/ui/card";
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

const beforeYouChoose = [
  "gross advertised rate",
  "deposit term",
  "minimum deposit",
  "lock-in period",
  "product notes or eligibility conditions",
  "tax treatment on interest income",
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

const howToUsePoints = [
  "compare multiple banks side by side",
  "sort by term or minimum deposit",
  "check whether a higher rate is worth a longer lock-in",
  "move from rate comparison to actual return estimation",
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
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
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

      {/* Hero */}
      <PageHero
        title="Time Deposit Rates Philippines"
        description="Compare time deposit rates in the Philippines across different banks, terms, and minimum deposit requirements. Use this page to review gross advertised rates, check lock-in periods, compare minimum placement amounts, and understand what to look at before choosing a fixed-term deposit."
        badge={TIME_DEPOSIT_RATES_UPDATED_AT}
        breadcrumbs={breadcrumbs}
      />

      {/* Support text */}
      <p className="-mt-4 mb-8 text-sm text-muted-foreground">
        Useful for comparing fixed-term deposit options before opening an
        account or using a time deposit calculator.
      </p>

      {/* What to Compare Before Choosing */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          What to Compare Before Choosing a Time Deposit
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          The highest rate is not always the best option on its own. A time
          deposit should be compared using the full product context, including
          term length, minimum placement, liquidity, and whether the rate is
          gross before tax.
        </p>
        <p className="mt-4 text-sm font-medium text-foreground/80">
          Before choosing, compare:
        </p>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          {beforeYouChoose.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Quick Picks by Deposit Need */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Quick Picks by Deposit Need
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Start with the kind of time deposit setup you want, not just the
          highest published number.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {needCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className="h-full">
                <CardHeader>
                  <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Icon className="size-4" />
                  </div>
                  <CardTitle className="mt-2 text-sm">{card.title}</CardTitle>
                  <CardDescription className="text-xs leading-relaxed">
                    {card.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Time Deposit Comparison Table */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Time Deposit Comparison Table
        </h2>
        <p className="mb-2 text-sm text-muted-foreground">
          Compare time deposit products using the factors that matter most in
          real use, not just the highest advertised rate.
        </p>
        <div className="mb-4 flex items-start gap-2 rounded-md border border-blue-200/50 bg-blue-50/50 p-3 text-xs text-blue-800 dark:border-blue-900/50 dark:bg-blue-950/20 dark:text-blue-300">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          <span>
            Use this table to compare time deposit products by tenor, rate, and
            minimum placement. Check the notes column carefully because banks may
            revise rates or remove certain terms over time.
          </span>
        </div>
        <Card>
          <CardContent>
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
                    <TableCell className="text-sm">{rate.product}</TableCell>
                    <TableCell className="text-sm">{rate.termLength}</TableCell>
                    <TableCell className="text-right font-semibold text-primary">
                      {formatPercent(rate.grossRate)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPeso(rate.minimumDeposit, 0)}
                    </TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">
                      {rate.taxNote}
                    </TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">
                      {rate.bestFor}
                    </TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground xl:table-cell">
                      {rate.notes}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <p className="mt-3 text-xs text-muted-foreground">
          Rates, terms, and product details may change. Always verify the latest
          bank terms before placing funds.
        </p>
      </section>

      {/* Time Deposit Rates Are Usually Shown Before Tax */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Time Deposit Rates Are Usually Shown Before Tax
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Banks often show time deposit rates as gross annual rates. But
          interest income from bank deposits is generally subject to final
          withholding tax, which means your actual earnings may be lower than the
          headline rate. Recent BIR guidance and bank advisories reflect a 20%
          final withholding tax environment for deposit interest.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {taxExamples.map((ex) => (
            <div
              key={ex.gross}
              className="rounded-lg border border-border bg-card p-4 text-center"
            >
              <p className="text-2xl font-bold text-foreground">
                {formatPercent(ex.gross)}
              </p>
              <p className="text-xs text-muted-foreground">gross rate</p>
              <div className="my-2 border-t border-border" />
              <p className="text-lg font-semibold text-primary">
                ≈ {formatPercent(ex.net)}
              </p>
              <p className="text-xs text-muted-foreground">
                after 20% withholding tax
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Use gross rates for comparison, but keep after-tax return in mind when
          deciding where to place your money.
        </p>
      </section>

      {/* Why Term Length Matters */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Why Term Length Matters
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A longer time deposit term may offer a different rate from a shorter
          one, but it also means your funds are locked in longer. The best
          option depends on whether you value flexibility or are willing to
          commit for a higher or more stable return.
        </p>
        <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>shorter terms may suit parked cash</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>
              longer terms may suit planned savings you will not need
              immediately
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>
              a higher rate may not be worth it if the lock-in is too
              restrictive
            </span>
          </li>
        </ul>
      </section>

      {/* Why Minimum Deposit Matters */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Why Minimum Deposit Matters
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Some time deposit products are accessible with smaller starting
          amounts, while others require a much larger placement. This is one of
          the biggest practical filters users apply when comparing rates, so it
          should be easy to scan in the table.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="p-5">
              <p className="text-sm font-semibold text-foreground">
                Lower minimum deposit
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                May be more useful if you are testing a product for the first
                time or starting with a smaller amount.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm font-semibold text-foreground">
                Higher minimum deposit
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                May be acceptable if the product fits a larger parked-cash
                strategy or if you already have the funds available.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Notes Matter */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Why Notes Matter on a Time Deposit Page
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Time deposit products can change over time. A product may revise
          rates, remove certain tenors, or apply different rates based on
          customer segment. CIMB Bank PH, for example, announced revised
          MaxSave rates effective January 9, 2026, and later announced that the
          24-month tenor would no longer be offered for new placements effective
          February 11, 2026.
        </p>
        <p className="mt-4 text-sm font-medium text-foreground/80">
          That is why a good comparison page needs:
        </p>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>a visible notes column</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>a visible update date</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>clear distinction between current and older terms</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>careful handling of promotional or segment-based rates</span>
          </li>
        </ul>
      </section>

      {/* How to Use This Comparison Page */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          How to Use This Comparison Page
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Use this page to narrow your shortlist first, then move to the
          calculator or the bank&apos;s product page. Start by filtering
          products based on your deposit amount and preferred term, then compare
          gross rate, tax note, and product conditions before deciding.
        </p>
        <p className="mt-4 text-sm font-medium text-foreground/80">
          This page is most useful if you want to:
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

      {/* Calculator CTA */}
      <Card className="my-8 border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Calculator className="size-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-foreground">
              Want to Estimate Your Return?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              After comparing rates, use the Time Deposit Calculator to estimate
              gross interest, after-tax interest, and maturity amount for a
              specific deposit scenario.
            </p>
          </div>
          <Link
            href="/calculators/savings/time-deposit-calculator-philippines"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Use the Calculator
            <ArrowRight className="size-4" />
          </Link>
        </CardContent>
      </Card>

      {/* Editorial note */}
      <section className="rounded-lg border border-border bg-muted/30 p-5">
        <h3 className="text-sm font-semibold text-foreground">
          How we compare time deposits
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          PesoHub compares time deposit products using publicly available product
          information such as advertised gross rates, term lengths, minimum
          deposit requirements, and product notes. Rates and account details may
          change, so always verify the latest information with the bank directly.
        </p>
      </section>

      {/* FAQ */}
      <FaqSection faqs={timeDepositRateFaqs} />

      {/* Related Pages */}
      <section className="pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Related Savings and Rates Pages
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          After comparing time deposit rates, you may also want to review these
          related pages.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          source="Individual bank websites and product disclosures"
          sourceUrl="https://www.bsp.gov.ph/SitePages/FinancialStability/DirBanksFIs.aspx"
          updatedAt={TIME_DEPOSIT_RATES_UPDATED_AT}
          reviewCadence="Every 2 weeks"
        />
      </div>

      {/* Disclaimer */}
      <div className="pb-4">
        <DisclaimerBox text="Time deposit rates shown are subject to change without prior notice. Rates are gross (before the 20% final withholding tax on interest income). Promotional rates may expire, and product tenors may be revised or removed. Always verify the current rate and terms directly with the bank before placing funds. This page is not affiliated with any bank listed." />
      </div>
    </div>
  );
}
