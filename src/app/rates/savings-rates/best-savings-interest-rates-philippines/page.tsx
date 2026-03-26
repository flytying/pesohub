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

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Top 3 Banks Summary */}
        <section>
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Top 3 Highest Interest Rates
          </h2>
          <p className="mt-2 text-[14px] text-gray-400">
            These are not universal winners. They are starting points based on
            the highest advertised yield.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {topBanks.map((bank, index) => (
              <div
                key={bank.bankName}
                className={`overflow-hidden rounded-xl p-5 ${
                  index === 0
                    ? "bg-brand text-white"
                    : "bg-white ring-1 ring-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p
                    className={`text-[14px] font-semibold ${index === 0 ? "text-white" : "text-gray-500"}`}
                  >
                    {bank.bankName}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[14px] font-medium ${
                      index === 0
                        ? "bg-white/15 text-white/80"
                        : "bg-gray-50 text-gray-400"
                    }`}
                  >
                    {index === 0 && <Trophy className="size-3" />}
                    #{index + 1}
                  </span>
                </div>
                <p
                  className={`mt-3 text-4xl font-bold tracking-tight ${
                    index === 0 ? "text-white" : "text-gray-500"
                  }`}
                >
                  {formatPercent(bank.interestRate)}
                </p>
                <p
                  className={`text-[14px] ${index === 0 ? "text-white/70" : "text-gray-400"}`}
                >
                  per annum
                </p>
                <div
                  className={`mt-3 border-t pt-3 ${index === 0 ? "border-white/15" : "border-gray-200"}`}
                >
                  <p
                    className={`text-[14px] ${index === 0 ? "text-white/70" : "text-gray-400"}`}
                  >
                    {bank.accountType}
                  </p>
                  <p
                    className={`mt-1 text-[14px] ${index === 0 ? "text-white/70" : "text-gray-400"}`}
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
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Savings Account Comparison Table
          </h2>
          <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
            Compare savings account options using the factors that matter most in
            real use, not just the highest advertised yield.
          </p>
          <div className="mt-4 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <p className="text-[16px] leading-[22px] text-gray-400">
              Use this table to compare both the advertised return and the
              practical tradeoffs of each account. A higher rate may come with
              promo conditions, limited duration, or account requirements.
            </p>
          </div>
          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
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
                    <TableCell className="text-[14px]">
                      {bank.accountType}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-brand">
                      {formatPercent(bank.interestRate)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[14px] font-medium ${
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
                    <TableCell className="hidden text-[14px] text-gray-400 lg:table-cell">
                      {bank.liquidity}
                    </TableCell>
                    <TableCell className="hidden text-[14px] text-gray-400 sm:table-cell">
                      {bank.bestFor}
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
            Rates, terms, and product details may change. Always verify the
            latest information directly with the bank before opening an account
            or moving funds.
          </p>
        </section>

        {/* Promo Rates vs Standard Rates */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Promo Rates vs Standard Rates
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Some banks advertise high promotional yields that may depend on
            spending activity, time-limited offers, balance tiers, or other
            conditions. Others offer lower but simpler rates that are easier to
            understand and maintain.
          </p>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            If you want a simpler savings setup, do not compare headline rates
            alone. Check whether the rate is promotional, conditional, or more
            stable over time.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                A promo rate may be useful if:
              </h3>
              <ul className="mt-4 space-y-3">
                {promoUseful.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[16px] leading-[22px] text-gray-400"
                  >
                    <Star className="mt-0.5 size-4 shrink-0 text-amber-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                A more standard rate may be better if:
              </h3>
              <ul className="mt-4 space-y-3">
                {standardBetter.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[16px] leading-[22px] text-gray-400"
                  >
                    <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Savings Interest Is Usually Shown Before Tax */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Savings Interest Is Usually Shown Before Tax
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Savings interest rates are often shown as gross rates. In the
            Philippines, interest income from deposit accounts is generally
            subject to withholding tax, which means your effective return may be
            lower than the advertised figure.
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
            when deciding where to park your money.
          </p>
        </section>

        {/* Digital Banks vs Traditional Banks */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Digital Banks vs Traditional Banks
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Digital banks may offer higher advertised savings rates, app-first
            convenience, and lower minimum balance requirements. Traditional
            banks may offer broader branch access, more familiar service models,
            and easier integration with existing accounts.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                Digital banks may suit you if:
              </h3>
              <ul className="mt-4 space-y-3">
                {digitalBankPros.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[16px] leading-[22px] text-gray-400"
                  >
                    <CheckCircle className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                Traditional banks may suit you if:
              </h3>
              <ul className="mt-4 space-y-3">
                {traditionalBankPros.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[16px] leading-[22px] text-gray-400"
                  >
                    <CheckCircle className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            The better option depends on how you plan to use the account, not
            just which one advertises the highest rate.
          </p>
        </section>

        {/* How to Choose the Right Savings Account */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            How to Choose the Right Savings Account
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            The right account depends on how you plan to use the money. A strong
            savings rate matters, but it should be considered together with
            access, requirements, and account purpose.
          </p>
          <p className="mt-4 text-[16px] font-medium text-gray-500">
            Before choosing an account:
          </p>
          <ul className="mt-4 space-y-3">
            {chooseChecklist.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[16px] leading-[22px] text-gray-400"
              >
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-brand" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <p className="text-[16px] leading-[22px] text-gray-400">
              If the money is for emergencies or everyday use, easy access may
              matter more than the highest possible yield. If the funds are
              parked for a short period, a stronger promotional rate may be worth
              considering if the conditions are manageable.
            </p>
          </div>
        </section>

        {/* Best Savings Account Options by Need */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Best Savings Account Options by Need
          </h2>
          <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
            Start with the type of savings experience you want, not just the
            highest percentage.
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
              How we compare savings accounts
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-gray-400">
              PesoHub compares savings accounts using publicly available product
              information such as advertised interest rates, account type,
              minimum balance, access method, and notes about promo conditions.
              Rates and account details may change, so always verify the latest
              information with the bank directly.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={savingsRateFaqs} />
        </div>

        {/* Related Pages */}
        <section className="mt-16">
          <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
            Related rates and guides
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
            source="Individual bank websites"
            sourceUrl="https://www.bsp.gov.ph/SitePages/FinancialStability/DirBanksFIList.aspx"
            updatedAt={SAVINGS_RATES_UPDATED_AT}
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
