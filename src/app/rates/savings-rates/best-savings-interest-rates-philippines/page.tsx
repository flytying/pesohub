import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  Trophy,
  CheckCircle,
  Info,
  Star,
  Smartphone,
  Landmark,
  Wallet,
  Clock,
  PiggyBank,
  TrendingUp,
  Calculator,
  Target,
  TriangleAlert,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
import { SourceCitation } from "@/components/shared/source-citation";
import { SavingsComparison } from "@/components/calculators/savings-comparison-calculator";
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
  generateCalculatorSchema,
  generateItemListSchema,
} from "@/lib/schema-markup";
import { SITE_URL } from "@/config/site";
import { formatPeso, formatPercent } from "@/lib/formatters";
import {
  bankSavingsRates,
  savingsRateFaqs,
  SAVINGS_RATES_UPDATED_AT,
} from "@/data/rates/savings-rates";

export const metadata = generatePageMetadata({
  title:
    "Best Savings Accounts Philippines 2026: Highest Interest Rates",
  description:
    "Compare the best savings accounts in the Philippines for 2026, including high-yield digital banks, traditional bank savings rates, promo conditions, minimum balances, and estimated earnings.",
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
    title: "Best Digital Bank Rates",
    href: "/rates/savings-rates/best-digital-bank-rates-philippines",
    icon: Smartphone,
  },
  {
    title: "Time Deposit Rates & Calculator",
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
    title: "Emergency Fund Calculator",
    href: "/calculators/savings/emergency-fund-calculator-philippines",
    icon: Wallet,
  },
  {
    title: "Rates Hub",
    href: "/rates",
    icon: TrendingUp,
  },
];

export default function BestSavingsRatesPage() {
  const rankedBanks = [...bankSavingsRates].sort(
    (a, b) => b.interestRate - a.interestRate
  );
  const topBanks = rankedBanks.slice(0, 3);
  const calculatorAccounts = rankedBanks.map((bank) => ({
    label: `${bank.bankName} — ${bank.accountType}`,
    rate: bank.interestRate,
  }));
  const comparisonRows = rankedBanks.map((bank) => ({
    bankName: bank.bankName,
    accountType: bank.accountType,
    rate: bank.interestRate,
    rateType: bank.rateType,
    bankType: bank.bankType,
    minimumBalance: bank.minimumBalance,
    conditions: `${bank.rateType} rate · ${
      bank.minimumBalance === 0
        ? "No min. balance"
        : `Min. ${formatPeso(bank.minimumBalance, 0)}`
    }${bank.bestFor ? ` · ${bank.bestFor}` : ""}`,
  }));

  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: "Best Savings Accounts Philippines 2026: Highest Interest Rates",
          description:
            "Compare the best savings accounts in the Philippines across digital and traditional banks.",
          updatedAt: SAVINGS_RATES_UPDATED_AT,
          slug: "rates/savings-rates/best-savings-interest-rates-philippines",
        })}
      />
      <JsonLd
        data={generateCalculatorSchema({
          title: "Savings Account Comparison Calculator",
          description:
            "Compare estimated monthly, annual, and after-tax interest across Philippine savings accounts.",
        })}
      />
      <JsonLd
        data={generateItemListSchema({
          name: "Best Savings Accounts in the Philippines 2026",
          items: rankedBanks.map((bank) => ({
            name: `${bank.bankName} — ${bank.accountType} (${formatPercent(
              bank.interestRate
            )} p.a.)`,
            url: `${SITE_URL}/rates/savings-rates/best-savings-interest-rates-philippines`,
          })),
        })}
      />

      <PageHero
        title="Best Savings Accounts in the Philippines 2026"
        description="Compare the best savings accounts in the Philippines for 2026, including high-yield digital banks, traditional bank savings accounts, promo rates, minimum balance requirements, and estimated interest earnings."
        badge={SAVINGS_RATES_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
        containerClassName="w-full max-w-[1240px] px-[clamp(20px,3vw,36px)]"
      />

      <div className="mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)] py-[clamp(18px,3vw,34px)]">
        {/* What Is a Savings Rate? */}
        <section className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            What Is a Savings Rate?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            A savings rate is the annual interest a bank pays you for keeping
            money in a savings account. In the Philippines, savings rates are
            expressed as a percentage per annum (p.a.) — for example, a 5% p.a.
            rate means you earn roughly ₱5,000 per year on a ₱100,000 deposit.
            Rates vary widely between banks: traditional banks typically offer
            0.10%–0.25% p.a., while digital banks may offer 3%–5% p.a. or
            higher through promotional rates.
          </p>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            The table below compares savings interest rates from both
            traditional and digital banks in the Philippines so you can find the
            best savings account for your situation.
          </p>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            Looking only for app-based banks?{" "}
            <Link
              href="/rates/savings-rates/best-digital-bank-rates-philippines"
              className="font-semibold text-brand underline-offset-2 hover:underline"
            >
              Compare the best digital bank rates in the Philippines
            </Link>
            .
          </p>
        </section>

        {/* Top 3 Banks Summary */}

        <section className="mt-16">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Highest Savings Interest Rates in the Philippines
          </h2>
          <p className="mt-2 text-[14px] text-gray-400">
            These are not universal winners. They are starting points based on
            the highest advertised yield.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {topBanks.map((bank, index) => {
              const top = index === 0;
              return (
                <div
                  key={`${bank.bankName}-${bank.accountType}`}
                  className={`relative overflow-hidden rounded-[18px] p-5 ${
                    top
                      ? "text-white shadow-[0_24px_50px_-22px_rgba(21,53,199,.6)]"
                      : "border border-[#E7EBF3] bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)]"
                  }`}
                  style={top ? { background: "var(--ph-grad-panel)" } : undefined}
                >
                  {top && (
                    <div
                      aria-hidden
                      className="absolute -right-8 -top-10 size-[160px] rounded-full"
                      style={{ background: "var(--ph-glow-cyan)" }}
                    />
                  )}
                  <div className="relative flex items-center justify-between">
                    <p className={`text-[14px] font-bold ${top ? "text-white" : "text-[#0E1525]"}`}>
                      {bank.bankName}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-bold ${
                        top ? "bg-[#43E6A0]/20 text-[#6BEFC0]" : "bg-[#EEF1F7] text-[#5A6478]"
                      }`}
                    >
                      {top && <Trophy className="size-3" />}#{index + 1}
                    </span>
                  </div>
                  <p
                    className={`relative mt-3 font-display text-[40px] font-bold tracking-[-.02em] tabular-nums ${
                      top ? "text-white" : "text-[#0E1525]"
                    }`}
                  >
                    {formatPercent(bank.interestRate)}
                  </p>
                  <p className={`relative text-[14px] ${top ? "text-[#C9D4FF]" : "text-[#6B7488]"}`}>
                    per annum
                  </p>
                  <div className={`relative mt-3 border-t pt-3 ${top ? "border-white/15" : "border-[#E7EBF3]"}`}>
                    <p className={`text-[14px] font-bold ${top ? "text-white" : "text-[#0E1525]"}`}>
                      {bank.accountType}
                    </p>
                    <p className={`mt-1 text-[14px] ${top ? "text-[#C9D4FF]" : "text-[#6B7488]"}`}>
                      {bank.rateType === "Promo" ? "Promo rate" : "Standard rate"}
                      {" · "}
                      {bank.minimumBalance === 0
                        ? "No min. balance"
                        : `Min. ${formatPeso(bank.minimumBalance, 0)}`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Savings Account Comparison Table */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Savings Account Comparison Table
          </h2>
          <p className="mt-2 text-[16px] leading-[1.6] text-[#5A6478]">
            Compare savings account options using the factors that matter most in
            real use, not just the highest advertised yield.
          </p>
          <div className="mt-4 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <p className="text-[16px] leading-[1.6] text-[#5A6478]">
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
                  <TableRow key={`${bank.bankName}-${bank.accountType}`}>
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

        {/* Savings Interest Calculator */}
        <section className="mt-16">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            How Much Interest Can You Earn?
          </h2>
          <p className="mt-2 text-[16px] leading-[1.6] text-[#5A6478]">
            Compare estimated earnings across every account at once, or switch to
            a single account for a detailed breakdown. Enter your deposit and
            holding period, then filter by account type or rate type and toggle
            the tax assumption.
          </p>
          <div className="mt-6">
            <SavingsComparison
              rows={comparisonRows}
              accounts={calculatorAccounts}
            />
          </div>
        </section>

        {/* Promo Rates vs Standard Rates */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Promo Rates vs Standard Rates
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            Some banks advertise high promotional yields that may depend on
            spending activity, time-limited offers, balance tiers, or other
            conditions. Others offer lower but simpler rates that are easier to
            understand and maintain.
          </p>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
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
                    className="flex items-start gap-3 text-[16px] leading-[1.6] text-[#5A6478]"
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
                    className="flex items-start gap-3 text-[16px] leading-[1.6] text-[#5A6478]"
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
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Savings Interest Tax in the Philippines
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            Savings interest rates are often shown as gross rates. In the
            Philippines, interest income from deposit accounts is generally
            subject to withholding tax, which means your effective return may be
            lower than the advertised figure.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {taxExamples.map((ex) => (
              <div
                key={ex.gross}
                className="overflow-hidden rounded-2xl border border-[#E7EBF3] bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)]"
              >
                <div className="px-5 pt-5 text-center">
                  <p className="font-display text-[34px] font-bold leading-none tracking-[-.02em] tabular-nums text-[#0E1525]">
                    {formatPercent(ex.gross)}
                  </p>
                  <p className="mt-1.5 text-[12px] font-semibold uppercase tracking-[.12em] text-[#8A93A6]">
                    gross rate
                  </p>
                </div>
                <div className="my-3 flex justify-center">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[12px] font-bold text-amber-700">
                    <ArrowDown className="size-3" />
                    20% tax
                  </span>
                </div>
                <div className="bg-[#EEF1FF] px-5 py-4 text-center">
                  <p className="font-display text-[26px] font-bold leading-none tracking-[-.02em] tabular-nums text-brand">
                    ≈ {formatPercent(ex.net)}
                  </p>
                  <p className="mt-1.5 text-[13px] text-[#6B7488]">
                    after withholding tax
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[14px] text-gray-400">
            Use gross rates for comparison, but keep after-tax return in mind
            when deciding where to park your money.
          </p>
        </section>

        {/* Digital Banks vs Traditional Banks */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Digital Banks vs Traditional Banks
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
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
                    className="flex items-start gap-3 text-[16px] leading-[1.6] text-[#5A6478]"
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
                    className="flex items-start gap-3 text-[16px] leading-[1.6] text-[#5A6478]"
                  >
                    <CheckCircle className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            The better option depends on how you plan to use the account, not
            just which one advertises the highest rate.
          </p>
        </section>

        {/* How to Choose the Right Savings Account */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            How to Choose the Right Savings Account
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
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
                className="flex items-start gap-3 text-[16px] leading-[1.6] text-[#5A6478]"
              >
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-brand" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <p className="text-[16px] leading-[1.6] text-[#5A6478]">
              If the money is for emergencies or everyday use, easy access may
              matter more than the highest possible yield. If the funds are
              parked for a short period, a stronger promotional rate may be worth
              considering if the conditions are manageable.
            </p>
          </div>
        </section>

        {/* Savings Accounts with Low Maintaining Balance */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Savings Accounts with Low Maintaining Balance
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            Many digital banks in the Philippines now offer savings accounts
            with zero maintaining balance, making them accessible even for
            first-time savers. If you are looking for the cheapest savings
            account to open in the Philippines, digital banks like Maya, Tonik,
            GoTyme, and SeaBank all allow you to start with no minimum deposit
            and no maintaining balance requirement.
          </p>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            Traditional banks like BDO, BPI, and Metrobank typically require a
            maintaining balance of ₱2,000–₱10,000, with fees charged if your
            balance falls below. Check the comparison table above for the exact
            minimum balance for each bank.
          </p>
        </section>

        {/* Best Savings Account Options by Need */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Best High-Yield Savings Accounts by Need
          </h2>
          <p className="mt-2 text-[16px] leading-[1.6] text-[#5A6478]">
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
                  <p className="mt-2 text-[16px] leading-[1.6] text-[#5A6478]">
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
        <section className="mt-6">
          <h2 className="mb-6 text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
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
