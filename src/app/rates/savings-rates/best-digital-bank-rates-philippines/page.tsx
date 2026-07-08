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
  ArrowLeftRight,
  TriangleAlert,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
import { SourceCitation } from "@/components/shared/source-citation";
import { DigitalBankComparison } from "@/components/calculators/savings-comparison-calculator";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateCalculatorSchema,
  generateItemListSchema,
} from "@/lib/schema-markup";
import { SITE_URL } from "@/config/site";
import { formatDate, formatPercent } from "@/lib/formatters";
import {
  digitalBankRates,
  digitalBankFaqs,
  DIGITAL_BANK_RATES_UPDATED_AT,
} from "@/data/rates/digital-bank-rates";

export const metadata = generatePageMetadata({
  title:
    "High-Yield Savings Accounts Philippines 2026: Digital Banks",
  description:
    "Compare high-yield savings accounts at Philippine digital banks. Tonik Stash pays up to 4.5%, OwnBank 3.8%, UNO 3.5%. Rates, caps, and PDIC notes.",
  slug: "rates/savings-rates/best-digital-bank-rates-philippines",
  updatedAt: DIGITAL_BANK_RATES_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Rates", href: "/rates" },
  { label: "Best Digital Banks" },
];

const needCards = [
  {
    icon: TrendingUp,
    title: "Best digital bank for high interest",
    description:
      "For the highest standard yield, Tonik's Group Stash pays 4.5% p.a. and its 12-month time deposit 5.5% p.a.; OwnBank reaches 3.8% p.a. Maya advertises up to 15% p.a., but only as a conditional promo capped at ₱100,000.",
  },
  {
    icon: PiggyBank,
    title: "Best digital bank for simple savings",
    description:
      "GoTyme (3% p.a.) and MariBank (3.25% p.a.) pay a flat rate with no missions or promo mechanics — good if you just want interest without tracking conditions.",
  },
  {
    icon: Shield,
    title: "Best digital bank for no complicated requirements",
    description:
      "UNO Digital Bank (up to 3.5% p.a.) and NetBank (3.25% p.a.) keep things simple — no spending missions and no maintaining balance to earn the headline rate.",
  },
  {
    icon: Wallet,
    title: "Best digital bank for small balances",
    description:
      "Maya's promo rate is most useful on smaller balances since it caps at ₱100,000. Most digital banks have zero maintaining balance, so you can start small.",
  },
  {
    icon: ArrowLeftRight,
    title: "Best digital bank for larger balances",
    description:
      "Above ₱1,000,000, MariBank pays a higher 3.75% p.a. tier. Remember PDIC insurance covers up to ₱1,000,000 per depositor, per bank, so very large balances may be worth splitting.",
  },
];

// Bank-specific sections that answer high-intent "[bank] interest rate 2026"
// queries directly. Each rate is sourced from the digital bank data file.
const bankSections = [
  {
    id: "seabank-maribank",
    name: "SeaBank / MariBank interest rate 2026",
    rate: "3.25% p.a. (3.75% above ₱1M)",
    body: "SeaBank Philippines has rebranded to MariBank. The account pays 3.25% p.a. on balances up to ₱1,000,000 and 3.75% p.a. on the portion above ₱1,000,000 (effective January 15, 2026), with no maintaining balance. It is a BSP-licensed digital bank backed by Sea Group (Shopee) and is PDIC-insured up to ₱1,000,000.",
  },
  {
    id: "tonik-solo-stash",
    name: "Tonik Solo Stash interest rate 2026",
    rate: "4% p.a. (Solo Stash)",
    body: "Tonik's Solo Stash earns 4% p.a. for goal-based saving and the Group Stash 4.5% p.a. (owner plus at least 2 participants). Tonik time deposits pay up to 5.5% p.a. on a 12-month term (effective June 5, 2026, down from 8%). Note the plain Tonik Account was cut to 1% p.a. on the same date. None of the Stash products require promo missions, and deposits are PDIC-insured up to ₱1,000,000.",
  },
  {
    id: "gotyme",
    name: "GoTyme interest rate 2026",
    rate: "3% p.a. (GoSave)",
    body: "GoTyme's GoSave pays a flat 3% p.a. (cut from 3.5% effective January 1, 2026) with no balance cap and no spending requirements. It includes a physical debit card and kiosk withdrawals, making it convenient for everyday access. PDIC-insured up to ₱1,000,000.",
  },
  {
    id: "maya",
    name: "Maya savings interest rate 2026",
    rate: "3% base, up to 15% promo",
    body: "Maya pays a 3% p.a. base rate (lowered from 3.5% effective April 1, 2026). Its headline up-to-15% p.a. promo is conditional — it requires monthly missions such as deposits, bill payments, and card spending, and the boosted rate is capped at ₱100,000. PDIC-insured up to ₱1,000,000.",
  },
  {
    id: "cimb",
    name: "CIMB interest rate 2026",
    rate: "2.5% p.a. (UpSave base)",
    body: "CIMB's UpSave pays a 2.5% p.a. base rate. Higher rates are available on CIMB GROW (4% base + up to 3% conditional = up to 7% p.a.) and CIMB Prime, both tied to growing your average daily balance. CIMB is a BSP-licensed digital bank and PDIC-insured up to ₱1,000,000.",
  },
  {
    id: "gcash-gsave",
    name: "GCash (GSave) savings interest rate 2026",
    rate: "From 2.5% p.a. (via CIMB)",
    body: "GSave inside GCash is powered by partner bank CIMB, so the base rate tracks CIMB UpSave at 2.5% p.a., with higher conditional tiers available on CIMB's GROW product. Because GSave is a partner-bank deposit, coverage and terms follow the underlying bank.",
  },
  {
    id: "uno",
    name: "UNO Digital Bank interest rate 2026",
    rate: "Up to 3.5% p.a.",
    body: "UNO Digital Bank's UNOReady savings pays up to 3.5% p.a. with daily interest crediting and no spending missions. Time deposits go up to 4.75% p.a. (UNOEarn) and 5.5% p.a. (UNOBoost) depending on tenure. PDIC-insured up to ₱1,000,000.",
  },
  {
    id: "ownbank",
    name: "OwnBank interest rate 2026",
    rate: "Up to 3.8% p.a.",
    body: "OwnBank's \"Own It\" savings pays up to 3.8% p.a. with daily interest and no maintaining balance. Time deposits go up to 5.2% p.a. (with 8% p.a. for the first 7 days for new users only). OwnBank has adjusted rates several times, so confirm the current rate in-app. PDIC-insured up to ₱1,000,000.",
  },
  {
    id: "netbank",
    name: "NetBank interest rate 2026",
    rate: "3.25% p.a. (PesoSAVERS)",
    body: "NetBank's PesoSAVERS pays 3.25% p.a. with daily interest crediting and compounding, no minimum initial deposit, and no maintaining balance (a ₱69 end-of-day balance is needed to earn interest). Time deposits sit around 4.5% p.a. (6-month) and 5% p.a. (12-month). PDIC-insured up to ₱1,000,000.",
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
    title: "High-Interest Savings Accounts Guide",
    href: "/blog/high-interest-savings-account-philippines",
    icon: BookOpen,
  },
  {
    title: "Savings Account Interest Rates (Full List)",
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
  const calculatorAccounts = digitalBankRates.map((bank) => ({
    label: bank.bankName,
    rate: bank.baseRate,
  }));
  const comparisonRows = digitalBankRates.map((bank) => ({
    bankName: bank.bankName,
    baseRate: bank.baseRate,
    promoRate: bank.promoRate,
    balanceCap: bank.balanceCap,
    requirement: bank.requirement,
  }));
  // Top high-yield savings accounts by base rate — derived from data so the
  // direct answer never drifts from the comparison table below it. Time-deposit
  // products are excluded so we don't call a locked-term product a "savings account".
  const topHighYield = [...digitalBankRates]
    .filter((b) => !/time deposit/i.test(b.bankName))
    .sort((a, b) => b.baseRate - a.baseRate)
    .slice(0, 3);

  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: "High-Yield Savings Accounts Philippines 2026: Digital Banks",
          description:
            "Compare high-yield savings accounts and interest rates at Philippine digital banks, with balance caps, requirements, and PDIC coverage notes.",
          updatedAt: DIGITAL_BANK_RATES_UPDATED_AT,
          slug: "rates/savings-rates/best-digital-bank-rates-philippines",
          author: "PesoHub Team",
        })}
      />
      <JsonLd
        data={generateCalculatorSchema({
          title: "Digital Bank Interest Calculator",
          description:
            "Compare estimated monthly, annual, and after-tax interest across Philippine digital banks using base or promo rates.",
        })}
      />
      <JsonLd
        data={generateItemListSchema({
          name: "Best High-Yield Savings Accounts in the Philippines 2026: Digital Banks",
          items: digitalBankRates.map((bank) => ({
            name: `${bank.bankName} (${formatPercent(bank.baseRate)} p.a. base${
              bank.promoRate != null
                ? `, up to ${formatPercent(bank.promoRate)} promo`
                : ""
            })`,
            url: `${SITE_URL}/rates/savings-rates/best-digital-bank-rates-philippines`,
          })),
        })}
      />

      <PageHero
        title="Best High-Yield Savings Accounts in the Philippines 2026: Digital Bank Rates Compared"
        description="Compare high-yield savings accounts from Philippine digital banks for 2026, including base interest rates, promo rates, balance caps, requirements, PDIC coverage notes, and estimated interest earnings."
        badge={DIGITAL_BANK_RATES_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
        containerClassName="w-full max-w-[1240px] px-[clamp(20px,3vw,36px)]"
      />

      <div className="mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)] py-[clamp(18px,3vw,34px)]">
        {/* Direct answer — targets "high yield savings account 2026 philippines" */}
        <section className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            What is the highest-yield savings account in the Philippines in 2026?
          </h2>
          <p className="mt-3 text-[16px] leading-[1.6] text-[#5A6478]">
            The highest-yield savings accounts in the Philippines in 2026 are
            offered by digital banks. As of{" "}
            {formatDate(DIGITAL_BANK_RATES_UPDATED_AT)}, the top base rates come
            from{" "}
            {topHighYield.map((bank, i) => (
              <span key={bank.bankName}>
                {i > 0 ? (i === topHighYield.length - 1 ? ", and " : ", ") : ""}
                <strong className="text-[#0E1525]">{bank.bankName}</strong> (
                {formatPercent(bank.baseRate)} p.a.)
              </span>
            ))}
            . Promo rates can run higher on capped balances. Compare every
            high-yield savings account below by base rate, promo rate, balance
            cap, requirements, and PDIC coverage before you open one.
          </p>
          <p className="mt-4 border-t border-[#E7EBF3] pt-3 text-[13px] leading-[1.6] text-[#6B7488]">
            Reviewed by the PesoHub editorial team · Last reviewed{" "}
            {formatDate(DIGITAL_BANK_RATES_UPDATED_AT)}. Rates are verified
            against the
            Bangko Sentral ng Pilipinas (BSP) and each bank&rsquo;s published
            product rates; promotional and conditional rates change often.
          </p>
        </section>

        {/* Digital Bank Comparison Table */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            High-Yield Savings Account Rates 2026 (Philippine Digital Banks)
          </h2>
          <p className="mt-2 text-[16px] leading-[1.6] text-[#5A6478]">
            Compare digital banks side by side using the features that matter
            most in real use, not just the highest rate on a promo banner.
          </p>
          <div className="mt-4 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <p className="text-[16px] leading-[1.6] text-[#5A6478]">
              This table separates regular rates from promo-driven rates and
              makes access features easy to scan. Start with your use case
              first, then compare base rate, promo rate, access features, and
              product notes.
            </p>
          </div>
          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <Table>
              <TableCaption className="sr-only">
                Digital bank savings interest rates in the Philippines, compared by
                base rate, promo rate, and balance cap.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Digital Bank</TableHead>
                  <TableHead className="text-right">Base Rate</TableHead>
                  <TableHead className="text-right">Promo Rate</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Balance Cap
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Requirement
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Good For</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {digitalBankRates.map((bank) => (
                  <TableRow key={bank.bankName}>
                    <TableCell className="font-medium">
                      {bank.bankName}
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
                      {bank.balanceCap}
                    </TableCell>
                    <TableCell className="hidden text-[14px] text-gray-400 lg:table-cell">
                      {bank.requirement}
                    </TableCell>
                    <TableCell className="hidden text-[14px] text-gray-400 md:table-cell">
                      {bank.bestFor}
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
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            Want to see how much you can earn?{" "}
            <Link
              href="#digital-bank-calculator"
              className="font-semibold text-brand underline-offset-2 hover:underline"
            >
              Try the digital bank interest calculator
            </Link>{" "}
            below, or jump to a specific bank:{" "}
            {bankSections.map((s, i) => (
              <span key={s.id}>
                {i > 0 && ", "}
                <Link
                  href={`#${s.id}`}
                  className="text-brand underline-offset-2 hover:underline"
                >
                  {s.name.replace(" interest rate 2026", "")}
                </Link>
              </span>
            ))}
            .
          </p>
        </section>

        {/* Digital Bank Interest Calculator */}
        <section id="digital-bank-calculator" className="mt-16 scroll-mt-20">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Digital Bank Interest Calculator
          </h2>
          <p className="mt-2 text-[16px] leading-[1.6] text-[#5A6478]">
            Compare estimated earnings across digital banks at once, or switch to
            a single bank for a detailed breakdown. Enter your balance and
            holding period, then choose base or promo rates and a tax assumption.
            Promo rates often apply only up to a balance cap, so compare the base
            rate too.
          </p>
          <div className="mt-6">
            <DigitalBankComparison
              rows={comparisonRows}
              accounts={calculatorAccounts}
            />
          </div>
        </section>

        {/* Base Rate vs Promo Rate */}

        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Base Rate vs Promo Rate
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            One of the biggest reasons digital bank comparisons can be misleading
            is that some banks highlight promotional rates while others emphasize
            a simpler regular rate. A fair comparison should separate these two
            clearly.
          </p>
          <ul className="mt-6 space-y-3">
            {baseRatePoints.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[16px] leading-[1.6] text-[#5A6478]"
              >
                <ArrowRight className="mt-0.5 size-4 shrink-0 text-gray-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <p className="text-[16px] leading-[1.6] text-[#5A6478]">
              This is why the comparison table shows both base rate and promo
              rate instead of combining them into one number.
            </p>
          </div>
        </section>

        {/* Why Access Features Matter */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Why Access Features Matter
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            A digital bank can look attractive on rate alone, but access matters
            just as much for daily use. Some users care more about cash access,
            debit cards, and transfers than about squeezing out the highest
            possible yield.
          </p>
          <ul className="mt-6 space-y-3">
            {accessPoints.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[16px] leading-[1.6] text-[#5A6478]"
              >
                <ArrowRight className="mt-0.5 size-4 shrink-0 text-gray-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Deposit Insurance and Trust Notes */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Deposit Insurance and Trust Notes
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            For deposit products, trust and protection matter. PDIC increased
            the maximum deposit insurance coverage to ₱1,000,000 per depositor,
            per bank effective March 15, 2025, and that should be clearly
            reflected in the comparison notes for any deposit-focused digital
            bank page.
          </p>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            This does not replace product due diligence, but it is one of the
            clearest trust signals users look for when comparing where to keep
            money.
          </p>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            The coverage is per depositor, per bank. If you keep more than
            ₱1,000,000 with a single bank, only the first ₱1,000,000 is insured.
            Savers with larger balances often spread deposits across two or
            three PDIC member banks so each balance stays within the insured
            limit.
          </p>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            One distinction matters here: e-wallet balances are not bank
            deposits. Money sitting in a GCash or Maya wallet is e-money
            regulated by the BSP, but it is not PDIC-insured. Only funds held
            inside a BSP-licensed bank account, such as a Maya Bank savings
            account or a CIMB account behind GSave, carry PDIC coverage. UITFs
            and other investment products sold through bank apps are not
            deposits either and are not covered.
          </p>
        </section>

        {/* Best Digital Bank Options by Need */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Best Digital Bank in the Philippines by Need
          </h2>
          <p className="mt-2 text-[16px] leading-[1.6] text-[#5A6478]">
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
                  <p className="mt-2 text-[16px] leading-[1.6] text-[#5A6478]">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bank-specific rate sections */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            High-Yield Savings Account Rates by Bank (2026)
          </h2>
          <p className="mt-2 text-[16px] leading-[1.6] text-[#5A6478]">
            The exact rate, conditions, and balance caps for the digital banks
            people search for most. Rates are gross (before the 20% withholding
            tax) and last checked {DIGITAL_BANK_RATES_UPDATED_AT}.
          </p>
          <div className="mt-8 space-y-8">
            {bankSections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-20">
                <h3 className="text-[22px] font-semibold leading-[28px] text-gray-500">
                  {section.name}
                </h3>
                <p className="mt-1 text-[18px] font-semibold text-brand">
                  {section.rate}
                </p>
                <p className="mt-2 text-[16px] leading-[1.6] text-[#5A6478]">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[14px] text-gray-400">
            Digital bank rates change frequently. Always confirm the current
            rate in the bank&apos;s app before depositing.
          </p>
        </section>

        {/* How BSP policy rates affect savings rates */}
        <section className="mt-6 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            How BSP Policy Rates Affect Digital Bank Savings Rates
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            Digital bank savings rates track the Bangko Sentral ng Pilipinas
            policy rate, the benchmark that sets how much it costs banks to
            borrow. When the BSP raises its policy rate, banks compete harder
            for deposits and savings rates tend to rise. When the BSP cuts,
            banks can fund themselves more cheaply and deposit rates usually
            follow downward. Several of the rate cuts in the table above
            happened during the current easing cycle.
          </p>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            Most high-yield savings accounts pay a variable rate, so the bank
            can change it at any time. A time deposit works differently: the
            rate you open at is locked for the full term regardless of what the
            BSP does afterward. If you have funds you will not need for a fixed
            period and expect rates to keep falling, a time deposit locks in
            today&apos;s rate. The BSP Monetary Board reviews the policy rate
            roughly every six weeks, and those announcements are the earliest
            signal of where savings rates are heading.
          </p>
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
        <section className="mt-6">
          <h2 className="mb-6 text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
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
