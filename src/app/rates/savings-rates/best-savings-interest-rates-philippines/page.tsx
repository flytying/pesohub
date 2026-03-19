import Link from "next/link";
import {
  ArrowRight,
  Trophy,
  CheckCircle,
  Info,
  Star,
  Smartphone,
  Landmark,
  Wallet,
  Clock,
  PiggyBank,
  BookOpen,
  TrendingUp,
  Calculator,
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
  bankSavingsRates,
  savingsRateFaqs,
  SAVINGS_RATES_UPDATED_AT,
} from "@/data/rates/savings-rates";

export const metadata = generatePageMetadata({
  title:
    "Best Savings Interest Rates Philippines 2026: Compare Banks | PesoHub",
  description:
    "Compare savings account interest rates in the Philippines, including traditional and digital bank options, to find accounts with better returns.",
  slug: "rates/savings-rates/best-savings-interest-rates-philippines",
  updatedAt: SAVINGS_RATES_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Rates", href: "/rates" },
  { label: "Savings Rates" },
];

const needCards = [
  {
    icon: Trophy,
    title: "Best for Highest Promo Rate",
    description:
      "Best for users willing to track promo mechanics, qualifying conditions, and changing offers in exchange for a higher advertised yield.",
  },
  {
    icon: Smartphone,
    title: "Best for Everyday Digital Savings",
    description:
      "Best for users who want a competitive savings rate with easy app-based access and fewer branch-related steps.",
  },
  {
    icon: Landmark,
    title: "Best for Traditional Bank Users",
    description:
      "Best for users who prefer established banks, branch access, or more familiar account structures.",
  },
  {
    icon: Wallet,
    title: "Best for Low Minimum Balance",
    description:
      "Best for users who want to start small, keep flexibility, or avoid maintaining a large balance.",
  },
  {
    icon: Clock,
    title: "Best for Parked Short-Term Cash",
    description:
      "Best for users comparing where to place idle funds while keeping money relatively liquid.",
  },
];

const promoUseful = [
  "you are willing to track changing requirements",
  "you actively use the bank's app or ecosystem",
  "you are comfortable moving funds when promos change",
];

const standardBetter = [
  "you prefer a simpler long-term setup",
  "you do not want to monitor promo mechanics often",
  "you value consistency more than headline yield",
];

const taxExamples = [
  { gross: 5, net: 4 },
  { gross: 6, net: 4.8 },
  { gross: 10, net: 8 },
];

const digitalBankPros = [
  "you want stronger headline savings rates",
  "you are comfortable managing money through an app",
  "you prefer quick account setup and digital transfers",
];

const traditionalBankPros = [
  "you value branch access and in-person service",
  "you already keep your main accounts with a traditional bank",
  "you want a more familiar savings setup",
];

const chooseChecklist = [
  "choose flexibility for emergency funds",
  "compare stable rates versus temporary promos",
  "check minimum balance rules",
  "confirm BSP licensing and PDIC coverage",
  "avoid chasing yield if the account is hard to use",
  "match the product to your savings goal",
];

const relatedPages = [
  {
    title: "Time Deposit Rates",
    href: "/rates/savings-rates/time-deposit-rates-philippines",
    icon: Clock,
  },
  {
    title: "Digital Banks Comparison",
    href: "/rates/savings-rates/best-digital-bank-rates-philippines",
    icon: Smartphone,
  },
  {
    title: "Savings Goal Calculator",
    href: "/calculators/savings/savings-goal-calculator-philippines",
    icon: Target,
    comingSoon: true,
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

export default function BestSavingsRatesPage() {
  const topBanks = bankSavingsRates.slice(0, 3);

  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: "Best Savings Interest Rates Philippines",
          description:
            "Compare the best savings interest rates in the Philippines across digital and traditional banks.",
          updatedAt: SAVINGS_RATES_UPDATED_AT,
          slug: "rates/savings-rates/best-savings-interest-rates-philippines",
        })}
      />

      <PageHero
        title="Best Savings Interest Rates Philippines"
        description="Compare the best savings interest rates in the Philippines across digital banks and traditional banks. Use this page to review headline rates, minimum balance requirements, liquidity, and account notes so you can find a savings option that fits how you actually use your money."
        badge={SAVINGS_RATES_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top 3 Banks Summary */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Top 3 Highest Interest Rates
        </h2>
        <p className="mb-4 text-xs text-muted-foreground">
          These are not universal winners. They are starting points based on
          the highest advertised yield.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {topBanks.map((bank, index) => (
            <div
              key={bank.bankName}
              className={`overflow-hidden rounded-lg p-5 ${
                index === 0
                  ? "gradient-result text-white"
                  : "bg-card ring-1 ring-foreground/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <p
                  className={`text-sm font-semibold ${index === 0 ? "text-white" : "text-foreground"}`}
                >
                  {bank.bankName}
                </p>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                    index === 0
                      ? "bg-white/15 text-white/80"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {index === 0 && <Trophy className="size-3" />}
                  #{index + 1}
                </span>
              </div>
              <p
                className={`mt-3 text-4xl font-bold tracking-tight ${
                  index === 0 ? "text-white" : "text-foreground"
                }`}
              >
                {formatPercent(bank.interestRate)}
              </p>
              <p
                className={`text-xs ${index === 0 ? "text-white/70" : "text-muted-foreground"}`}
              >
                per annum
              </p>
              <div
                className={`mt-3 border-t pt-3 ${index === 0 ? "border-white/15" : "border-border"}`}
              >
                <p
                  className={`text-sm ${index === 0 ? "text-white/70" : "text-muted-foreground"}`}
                >
                  {bank.accountType}
                </p>
                <p
                  className={`mt-1 text-xs ${index === 0 ? "text-white/70" : "text-muted-foreground"}`}
                >
                  {bank.rateType === "Promo" ? "Promo rate" : "Standard rate"}
                  {" · "}
                  {bank.minimumBalance === 0
                    ? "No min. balance"
                    : `Min. ${formatPeso(bank.minimumBalance, 0)}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Savings Account Comparison Table */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Savings Account Comparison Table
        </h2>
        <p className="mb-2 text-sm text-muted-foreground">
          Compare savings account options using the factors that matter most in
          real use, not just the highest advertised yield.
        </p>
        <div className="mb-4 flex items-start gap-2 rounded-md border border-blue-200/50 bg-blue-50/50 p-3 text-xs text-blue-800 dark:border-blue-900/50 dark:bg-blue-950/20 dark:text-blue-300">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          <span>
            Use this table to compare both the advertised return and the
            practical tradeoffs of each account. A higher rate may come with
            promo conditions, limited duration, or account requirements.
          </span>
        </div>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bank</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Headline Rate</TableHead>
                  <TableHead>Promo or Standard</TableHead>
                  <TableHead className="text-right">Min. Balance</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Liquidity / Access
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Best For
                  </TableHead>
                  <TableHead className="hidden xl:table-cell">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bankSavingsRates.map((bank) => (
                  <TableRow key={bank.bankName}>
                    <TableCell className="font-medium">
                      {bank.bankName}
                    </TableCell>
                    <TableCell className="text-sm">
                      {bank.accountType}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-primary">
                      {formatPercent(bank.interestRate)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          bank.rateType === "Promo"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {bank.rateType}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {bank.minimumBalance === 0
                        ? "None"
                        : formatPeso(bank.minimumBalance, 0)}
                    </TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">
                      {bank.liquidity}
                    </TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">
                      {bank.bestFor}
                    </TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground xl:table-cell">
                      {bank.notes}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <p className="mt-3 text-xs text-muted-foreground">
          Rates, terms, and product details may change. Always verify the
          latest information directly with the bank before opening an account
          or moving funds.
        </p>
      </section>

      {/* Promo Rates vs Standard Rates */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Promo Rates vs Standard Rates
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Some banks advertise high promotional yields that may depend on
          spending activity, time-limited offers, balance tiers, or other
          conditions. Others offer lower but simpler rates that are easier to
          understand and maintain.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          If you want a simpler savings setup, do not compare headline rates
          alone. Check whether the rate is promotional, conditional, or more
          stable over time.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                A promo rate may be useful if:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {promoUseful.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Star className="mt-0.5 size-3.5 shrink-0 text-amber-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                A more standard rate may be better if:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {standardBetter.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 size-3.5 shrink-0 text-green-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Savings Interest Is Usually Shown Before Tax */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Savings Interest Is Usually Shown Before Tax
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Savings interest rates are often shown as gross rates. In the
          Philippines, interest income from deposit accounts is generally
          subject to withholding tax, which means your effective return may be
          lower than the advertised figure.
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
          Use gross rates for comparison, but keep after-tax return in mind
          when deciding where to park your money.
        </p>
      </section>

      {/* Digital Banks vs Traditional Banks */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Digital Banks vs Traditional Banks
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Digital banks may offer higher advertised savings rates, app-first
          convenience, and lower minimum balance requirements. Traditional
          banks may offer broader branch access, more familiar service models,
          and easier integration with existing accounts.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Smartphone className="size-4 text-primary" />
                Digital banks may suit you if:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {digitalBankPros.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Landmark className="size-4 text-primary" />
                Traditional banks may suit you if:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {traditionalBankPros.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          The better option depends on how you plan to use the account, not
          just which one advertises the highest rate.
        </p>
      </section>

      {/* How to Choose the Right Savings Account */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          How to Choose the Right Savings Account
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          The right account depends on how you plan to use the money. A strong
          savings rate matters, but it should be considered together with
          access, requirements, and account purpose.
        </p>
        <p className="mt-4 text-sm font-medium text-foreground/80">
          Before choosing an account:
        </p>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          {chooseChecklist.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4">
          <p className="text-sm text-muted-foreground">
            If the money is for emergencies or everyday use, easy access may
            matter more than the highest possible yield. If the funds are
            parked for a short period, a stronger promotional rate may be worth
            considering if the conditions are manageable.
          </p>
        </div>
      </section>

      {/* Best Savings Account Options by Need */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Best Savings Account Options by Need
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Start with the type of savings experience you want, not just the
          highest percentage.
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

      {/* Editorial note */}
      <section className="rounded-lg border border-border bg-muted/30 p-5">
        <h3 className="text-sm font-semibold text-foreground">
          How we compare savings accounts
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          PesoHub compares savings accounts using publicly available product
          information such as advertised interest rates, account type, minimum
          balance, access method, and notes about promo conditions. Rates and
          account details may change, so always verify the latest information
          with the bank directly.
        </p>
      </section>

      {/* FAQ */}
      <FaqSection faqs={savingsRateFaqs} />

      {/* Related Pages */}
      <section className="pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Related Pages
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          After comparing savings accounts, you may also want to explore these
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
                <div className="flex-1">
                  <span className="text-sm font-medium group-hover:text-primary">
                    {page.title}
                  </span>
                  {page.comingSoon && (
                    <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                      Coming Soon
                    </span>
                  )}
                </div>
                <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Source Citation */}
      <div className="py-8">
        <SourceCitation
          source="Individual bank websites"
          sourceUrl="https://www.bsp.gov.ph/SitePages/FinancialStability/DirBanksFIs.aspx"
          updatedAt={SAVINGS_RATES_UPDATED_AT}
          reviewCadence="Every 2 weeks"
        />
      </div>

      {/* Disclaimer */}
      <div className="pb-4">
        <DisclaimerBox text="Interest rates shown are subject to change without prior notice. Rates are gross (before the 20% final withholding tax on interest income). Promotional rates may expire. Always verify the current rate directly with the bank before opening an account. This page is not affiliated with any bank listed." />
      </div>
    </div>
    </>
  );
}
