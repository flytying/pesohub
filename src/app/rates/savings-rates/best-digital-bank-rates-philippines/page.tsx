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
import { SavingsInterestCalculator } from "@/components/calculators/savings-interest-calculator";
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
    "Best Digital Bank Rates in the Philippines 2026 | PesoHub",
  description:
    "Compare digital bank interest rates in the Philippines for 2026. See savings rates, promo rates, balance caps, requirements, and estimated earnings.",
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
      "For the highest standard yield, Tonik leads at up to 6% p.a. on the Tonik Account (8% on its 12-month time deposit). Maya advertises up to 15% p.a., but only as a conditional promo capped at ₱100,000.",
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
    body: "Tonik's Solo Stash earns 4% p.a. for goal-based saving. The main Tonik Account pays up to 6% p.a., the Group Stash 4.5% p.a. (with at least 3 members), and Tonik time deposits go up to 8% p.a. on a 12-month term. None require promo missions, and deposits are PDIC-insured up to ₱1,000,000.",
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
  const calculatorAccounts = digitalBankRates.map((bank) => ({
    label: bank.bankName,
    rate: bank.baseRate,
  }));

  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: "Best Digital Bank Rates in the Philippines 2026",
          description:
            "Compare digital bank interest rates in the Philippines. Find the highest interest rate digital bank for your needs.",
          updatedAt: DIGITAL_BANK_RATES_UPDATED_AT,
          slug: "rates/savings-rates/best-digital-bank-rates-philippines",
        })}
      />

      <PageHero
        title="Best Digital Bank Rates in the Philippines 2026"
        description="Compare digital bank interest rates in the Philippines for 2026 — SeaBank (now MariBank), Tonik, GoTyme, Maya, CIMB, GCash, UNO, OwnBank, and NetBank. See base rates, promo rates, balance caps, and the conditions behind each headline number."
        badge={DIGITAL_BANK_RATES_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Digital Bank Comparison Table */}
        <section>
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            High Yield Savings Accounts: Digital Bank Comparison
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
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
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
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Digital Bank Interest Calculator
          </h2>
          <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
            Pick a digital bank, enter your balance, and estimate the monthly
            and annual interest. Promo rates often apply only up to a balance
            cap, so compare the base rate too.
          </p>
          <div className="mt-6">
            <SavingsInterestCalculator
              accounts={calculatorAccounts}
              title="Digital Bank Interest Calculator"
            />
          </div>
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
            Best Digital Bank in the Philippines by Need
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

        {/* Bank-specific rate sections */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Digital Bank Interest Rates 2026 (By Bank)
          </h2>
          <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
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
                <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
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
