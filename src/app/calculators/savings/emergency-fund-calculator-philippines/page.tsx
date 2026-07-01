import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Info,
  Check,
  PiggyBank,
  Wallet,
  Shield,
  Target,
  Clock,
  TrendingUp,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateCalculatorSchema,
} from "@/lib/schema-markup";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/shared/faq-section";
import { CalculatorNotice } from "@/components/shared/calculator-notice";
import { EmergencyFundCalculator } from "@/components/calculators/emergency-fund-calculator";

const TITLE = "Emergency Fund Calculator Philippines";
const INTRO =
  "Calculate how much you need to set aside for emergencies based on your actual monthly expenses. Adjust each expense category and target months to find an emergency fund goal that fits your situation.";

export const metadata: Metadata = generatePageMetadata({
  title: "Emergency Fund Calculator Philippines: How Much Do You Need?",
  description:
    "Calculate your emergency fund target based on your actual monthly expenses. Find out how many months of coverage you need and where to keep your emergency savings in the Philippines.",
  slug: "calculators/savings/emergency-fund-calculator-philippines",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Emergency Fund Calculator" },
];

const CARD =
  "rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,30px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]";
const H2 = "font-display text-[22px] font-semibold tracking-[-0.02em] text-[#0E1525]";
const LEAD = "mt-[10px] text-[16px] leading-[1.65] text-[#475069]";

const threeMonth = [
  "You have a stable, salaried job with separation pay",
  "You have no dependents",
  "You have low or no debt obligations",
  "You could find new work relatively quickly",
];

const sixMonth = [
  "You are self-employed, freelance, or on contract",
  "You support dependents (children, parents, siblings)",
  "You have significant monthly debt payments",
  "Your industry has longer job-search timelines",
];

const whereToKeep = [
  {
    icon: PiggyBank,
    title: "High-interest savings account",
    desc: "Digital banks in the Philippines currently offer some of the highest savings rates. Your money stays accessible and earns interest daily — the most common choice for emergency funds.",
  },
  {
    icon: Wallet,
    title: "Regular savings account",
    desc: "A traditional bank savings account offers lower interest but may feel more familiar. Choose a bank with a branch near you if you prefer in-person transactions.",
  },
  {
    icon: Shield,
    title: "Short-term time deposit",
    desc: "A 30-day or 90-day time deposit can earn slightly higher interest, but your money is locked for that period. Use only for the portion you are less likely to need right away.",
  },
];

const exampleRows = [
  { label: "Rent", val: "₱10,000", total: false },
  { label: "Food & groceries", val: "₱8,000", total: false },
  { label: "Utilities", val: "₱4,000", total: false },
  { label: "Transportation", val: "₱3,000", total: false },
  { label: "Total monthly expenses", val: "₱25,000", total: true },
];

const questions = [
  "How stable is my income? Freelancers and contractual workers may need 6 months or more.",
  "Do I have dependents who rely on my income for daily expenses?",
  "Do I have existing debt payments that cannot be paused if I lose my income?",
  "Does my employer provide separation pay or other safety nets?",
  "How quickly could I find a new source of income if I lost my current one?",
];

const faqs = [
  {
    question: "How much emergency fund do I need in the Philippines?",
    answer:
      "Most financial advisors recommend saving three to six months of essential living expenses. If your income is irregular, you are self-employed, or you have dependents, consider saving closer to six months or more. Use the calculator above to estimate your personal target based on your actual monthly expenses.",
  },
  {
    question: "What counts as an essential expense for emergency fund planning?",
    answer:
      "Essential expenses are the costs you cannot avoid even if you lose your income. These typically include housing (rent or mortgage), food, utilities (electricity, water, internet), transportation, loan payments, insurance premiums, and other basic needs. Discretionary spending like dining out, entertainment, and shopping should not be included.",
  },
  {
    question: "Where should I keep my emergency fund?",
    answer:
      "Keep your emergency fund in a savings account that is easy to access and earns interest. High-interest digital bank accounts are a popular choice in the Philippines because they offer better rates than traditional banks while still allowing withdrawals when needed. Avoid putting your emergency fund in investments like stocks or mutual funds, as their value can drop when you need the money most.",
  },
  {
    question: "Should I save for an emergency fund or pay off debt first?",
    answer:
      "It depends on your situation. Many advisors suggest building a small starter emergency fund (at least one month of expenses) before aggressively paying off high-interest debt. This prevents you from going deeper into debt if an unexpected expense comes up. Once your high-interest debt is paid off, focus on building your full emergency fund.",
  },
  {
    question: "How long does it take to build an emergency fund?",
    answer:
      "The time depends on how much you can set aside each month. If your target is ₱150,000 and you save ₱10,000 per month, it would take about 15 months. The key is consistency. Even small, regular contributions add up over time.",
  },
  {
    question: "Is an emergency fund different from a savings goal?",
    answer:
      "Yes. An emergency fund is specifically for unexpected events like job loss, medical emergencies, or urgent home repairs. It should be kept liquid and accessible at all times. A savings goal is for planned expenses like a vacation, gadget, or down payment.",
  },
];

const relatedPages = [
  {
    title: "Best Savings Interest Rates",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    icon: PiggyBank,
  },
  {
    title: "Best Digital Bank Rates",
    href: "/rates/savings-rates/best-digital-bank-rates-philippines",
    icon: TrendingUp,
  },
  {
    title: "Savings Goal Calculator",
    href: "/calculators/savings/savings-goal-calculator-philippines",
    icon: Target,
  },
  {
    title: "Time Deposit Calculator",
    href: "/calculators/savings/time-deposit-calculator-philippines",
    icon: Clock,
  },
  {
    title: "Guides Hub",
    href: "/guides",
    icon: BookOpen,
  },
];

export default function EmergencyFundCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: TITLE,
          description:
            "Calculate your emergency fund target based on your actual monthly expenses in the Philippines.",
        })}
      />

      <div className="mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)] py-[clamp(18px,3vw,34px)]">
        {/* Heading */}
        <div className="mb-5">
          <nav aria-label="Breadcrumb" className="mb-[10px]">
            <ol className="flex flex-wrap items-center gap-[7px] text-[15px] font-semibold text-[#6B7488]">
              {breadcrumbs.map((b, i) => {
                const last = i === breadcrumbs.length - 1;
                return (
                  <li key={i} className="flex items-center gap-[7px]">
                    {i > 0 && <span className="text-[#C4CCDB]">/</span>}
                    {last || !b.href ? (
                      <span className={last ? "text-[#5A6478]" : ""}>{b.label}</span>
                    ) : (
                      <Link href={b.href} className="font-bold text-brand">
                        {b.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
          <h1 className="font-display text-[clamp(26px,3.4vw,38px)] font-semibold leading-[1.1] tracking-[-.02em] text-[#0E1525]">
            {TITLE}
          </h1>
          <p className="mt-[9px] text-[16px] leading-[1.55] text-[#5A6478]">{INTRO}</p>
        </div>

        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <EmergencyFundCalculator />
        </div>

        <div className="mt-9 space-y-[14px]">
          {/* What is an emergency fund */}
          <section className={CARD}>
            <h2 className={H2}>What is an emergency fund?</h2>
            <p className={LEAD}>
              An emergency fund is money set aside specifically for unexpected events that affect
              your ability to pay for essential needs. This includes sudden job loss, medical
              emergencies, major home or appliance repairs, or any situation where your regular
              income is disrupted.
            </p>
            <p className={LEAD}>
              Unlike regular savings, an emergency fund is not meant for planned purchases. It acts
              as a financial buffer that keeps you from relying on credit cards, personal loans, or
              borrowing from family during a crisis.
            </p>
          </section>

          {/* How much do you need */}
          <section className={CARD}>
            <h2 className={H2}>How much emergency fund do you need?</h2>
            <p className={LEAD}>
              A common guideline is three to six months of essential living expenses. Here is how to
              decide where you fall on that range.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[16px] border border-[#E7EBF3] bg-white p-[22px]">
                <h3 className="mb-[14px] font-display text-[18px] font-semibold text-[#0E1525]">
                  3 months may be enough if…
                </h3>
                <ul className="space-y-3">
                  {threeMonth.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-[#344054]">
                      <Check className="mt-0.5 size-[18px] shrink-0 text-[#0E9F6E]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[16px] border border-[#E7EBF3] bg-white p-[22px]">
                <h3 className="mb-[14px] font-display text-[18px] font-semibold text-[#0E1525]">
                  6 months or more if…
                </h3>
                <ul className="space-y-3">
                  {sixMonth.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-[#344054]">
                      <Check className="mt-0.5 size-[18px] shrink-0 text-[#0E9F6E]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Where to keep */}
          <section className={CARD}>
            <h2 className={H2}>Where to keep your emergency fund</h2>
            <p className={LEAD}>
              Your emergency fund should be easy to access and not at risk of losing value. Here are
              the most common options.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {whereToKeep.map((w) => {
                const Icon = w.icon;
                return (
                  <div key={w.title} className="rounded-[16px] border border-[#E7EBF3] bg-white p-[22px]">
                    <span className="flex size-11 items-center justify-center rounded-[12px] bg-[#EAF0FF] text-brand">
                      <Icon className="size-[22px]" />
                    </span>
                    <h3 className="mt-[14px] font-display text-[18px] font-semibold text-[#0E1525]">{w.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-[1.55] text-[#5A6478]">{w.desc}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-start gap-[11px] rounded-[13px] border border-[#C9D6F7] bg-[#EAF0FF] p-[14px_16px]">
              <Info className="mt-0.5 size-[18px] shrink-0 text-brand" />
              <span className="text-[15px] leading-[1.55] text-[#26408B]">
                Compare current savings rates on the{" "}
                <Link
                  href="/rates/savings-rates/best-savings-interest-rates-philippines"
                  className="font-bold text-brand hover:underline"
                >
                  Best Savings Interest Rates
                </Link>{" "}
                page to find the best place for your emergency fund.
              </span>
            </div>
          </section>

          {/* Example */}
          <section className={CARD}>
            <h2 className={H2}>Example: computing your emergency fund</h2>
            <p className="mt-[10px] text-[15px] text-[#5A6478]">
              Suppose your monthly essential expenses look like this:
            </p>
            <div className="mt-4 overflow-hidden rounded-[14px] border border-[#E7EBF3]">
              {exampleRows.map((e, i) => (
                <div
                  key={e.label}
                  className={`flex items-center justify-between px-[18px] py-[13px] ${
                    i < exampleRows.length - 1 ? "border-b border-[#EEF1F7]" : ""
                  } ${e.total ? "bg-[#F1ECFB]" : ""}`}
                >
                  <span className={`text-[15px] ${e.total ? "font-bold text-[#0E1525]" : "text-[#475069]"}`}>
                    {e.label}
                  </span>
                  <span className={`font-display text-[15px] font-bold tabular-nums ${e.total ? "text-[#6D4DE0]" : "text-[#0E1525]"}`}>
                    {e.val}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[15px] leading-[1.6] text-[#475069]">
              <strong className="text-[#0E1525]">3-month target:</strong> ₱25,000 × 3 = ₱75,000
              <br />
              <strong className="text-[#0E1525]">6-month target:</strong> ₱25,000 × 6 = ₱150,000
            </p>
          </section>

          {/* Questions */}
          <section className={CARD}>
            <h2 className={H2}>Questions to consider</h2>
            <ul className="mt-4 space-y-3">
              {questions.map((q) => (
                <li key={q} className="flex items-start gap-3 text-[16px] leading-[1.55] text-[#344054]">
                  <HelpCircle className="mt-0.5 size-[18px] shrink-0 text-brand" />
                  {q}
                </li>
              ))}
            </ul>
          </section>

          {/* Disclaimer */}
          <CalculatorNotice text="This calculator provides estimates for planning purposes only. The right emergency fund amount depends on your personal circumstances, risk tolerance, and financial obligations. Consider consulting a qualified financial advisor for personalized guidance." />

          {/* FAQ */}
          <section className="pt-7">
            <FaqSection faqs={faqs} />
          </section>

          {/* Related */}
          <section className="pt-7">
            <h2 className={`mb-4 ${H2}`}>Related calculators and guides</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPages.map((page) => {
                const Icon = page.icon;
                return (
                  <Link
                    key={page.title}
                    href={page.href}
                    className="group flex items-center gap-3 rounded-[14px] border border-[#E7EBF3] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,.04)] transition-colors hover:border-[#C3D0F2] hover:bg-[#FBFCFE]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] bg-[#EAF0FF] text-brand">
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="flex-1 text-[15px] font-bold text-[#0E1525] group-hover:text-brand">
                      {page.title}
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-[#C4CCDB]" />
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
