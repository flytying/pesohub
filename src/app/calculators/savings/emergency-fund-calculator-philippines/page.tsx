import type { Metadata } from "next";
import Link from "next/link";
import {
  HelpCircle,
  Calculator,
  BookOpen,
  BarChart3,
  Shield,
  Wallet,
  PiggyBank,
  ArrowRight,
  Info,
  TriangleAlert,
} from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateCalculatorSchema,
} from "@/lib/schema-markup";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { EmergencyFundCalculator } from "@/components/calculators/emergency-fund-calculator";

export const metadata: Metadata = generatePageMetadata({
  title:
    "Emergency Fund Calculator Philippines: How Much Do You Need? | PesoHub",
  description:
    "Calculate your emergency fund target based on your actual monthly expenses. Find out how many months of coverage you need and where to keep your emergency savings in the Philippines.",
  slug: "calculators/savings/emergency-fund-calculator-philippines",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Emergency Fund Calculator" },
];

const whereToKeep = [
  {
    icon: PiggyBank,
    title: "High-Interest Savings Account",
    description:
      "Digital banks in the Philippines currently offer some of the highest savings rates. Your money stays accessible and earns interest daily. This is the most common choice for emergency funds.",
  },
  {
    icon: Wallet,
    title: "Regular Savings Account",
    description:
      "A traditional bank savings account offers lower interest but may feel more familiar. Choose a bank with a branch near you if you prefer in-person transactions.",
  },
  {
    icon: Shield,
    title: "Short-Term Time Deposit",
    description:
      "A 30-day or 90-day time deposit can earn slightly higher interest, but your money is locked during that period. Consider this only for the portion of your emergency fund you are less likely to need right away.",
  },
];

const questionsToConsider = [
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
      "The time depends on how much you can set aside each month. If your target is ₱150,000 and you save ₱10,000 per month, it would take about 15 months. The key is consistency. Even small, regular contributions add up over time. Use the calculator to see how different savings amounts affect your timeline.",
  },
  {
    question:
      "Is an emergency fund different from a savings goal?",
    answer:
      "Yes. An emergency fund is specifically for unexpected events like job loss, medical emergencies, or urgent home repairs. It should be kept liquid and accessible at all times. A savings goal is for planned expenses like a vacation, gadget, or down payment. You can use our Savings Goal Calculator for planned targets.",
  },
];

const relatedContent = [
  {
    title: "Best Savings Interest Rates",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    icon: BarChart3,
  },
  {
    title: "Best Digital Bank Rates",
    href: "/rates/savings-rates/best-digital-bank-rates-philippines",
    icon: BarChart3,
  },
  {
    title: "Savings Goal Calculator",
    href: "/calculators/savings/savings-goal-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Time Deposit Calculator",
    href: "/calculators/savings/time-deposit-calculator-philippines",
    icon: Calculator,
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
          title:
            "Emergency Fund Calculator Philippines",
          description:
            "Calculate your emergency fund target based on your actual monthly expenses in the Philippines.",
        })}
      />

      <PageHero
        title="Emergency Fund Calculator Philippines"
        description="Calculate how much you need to set aside for emergencies based on your actual monthly expenses. Adjust each expense category and target months to find an emergency fund goal that fits your situation."
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <EmergencyFundCalculator />
        </div>

        {/* What Is an Emergency Fund */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            What Is an Emergency Fund?
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            An emergency fund is money set aside specifically for unexpected
            events that affect your ability to pay for essential needs. This
            includes sudden job loss, medical emergencies, major home or
            appliance repairs, or any situation where your regular income is
            disrupted.
          </p>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Unlike regular savings, an emergency fund is not meant for planned
            purchases. It acts as a financial buffer that keeps you from relying
            on credit cards, personal loans, or borrowing from family during a
            crisis.
          </p>
        </section>

        {/* How Much Do You Need */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            How Much Emergency Fund Do You Need?
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            The right amount depends on your personal situation. A common
            guideline is to save three to six months of essential living
            expenses. Here is how to decide where you fall on that range:
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                3 months may be enough if...
              </h3>
              <ul className="mt-3 space-y-2 text-[16px] leading-[22px] text-gray-400">
                <li className="flex gap-2">
                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-gray-300" />
                  You have a stable, salaried job with separation pay
                </li>
                <li className="flex gap-2">
                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-gray-300" />
                  You have no dependents
                </li>
                <li className="flex gap-2">
                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-gray-300" />
                  You have low or no debt obligations
                </li>
                <li className="flex gap-2">
                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-gray-300" />
                  You could find new work relatively quickly
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                6 months or more if...
              </h3>
              <ul className="mt-3 space-y-2 text-[16px] leading-[22px] text-gray-400">
                <li className="flex gap-2">
                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-gray-300" />
                  You are self-employed, freelance, or on a contract
                </li>
                <li className="flex gap-2">
                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-gray-300" />
                  You support dependents (children, parents, siblings)
                </li>
                <li className="flex gap-2">
                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-gray-300" />
                  You have significant monthly debt payments
                </li>
                <li className="flex gap-2">
                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-gray-300" />
                  Your industry has longer job search timelines
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Where to Keep */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Where to Keep Your Emergency Fund
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Your emergency fund should be easy to access and not at risk of
            losing value. Avoid stocks, mutual funds, or long-term investments
            for this purpose. Here are the most common options in the
            Philippines:
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {whereToKeep.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.title}
                  className="rounded-xl border border-gray-200 bg-white p-6"
                >
                  <div className="flex size-14 items-center justify-center rounded-full bg-gray-50 text-brand">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-4 text-[20px] font-semibold leading-[26px] text-gray-500">
                    {option.title}
                  </h3>
                  <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
                    {option.description}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex gap-3 rounded-lg border border-gray-200 bg-white p-6">
            <Info className="mt-0.5 size-5 shrink-0 text-gray-300" />
            <p className="text-[16px] leading-[22px] text-gray-400">
              Compare current savings rates on our{" "}
              <Link
                href="/rates/savings-rates/best-savings-interest-rates-philippines"
                className="text-brand hover:underline"
              >
                Best Savings Interest Rates
              </Link>{" "}
              page to find the best place for your emergency fund.
            </p>
          </div>
        </section>

        {/* Worked Example */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Example: Computing Your Emergency Fund
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Suppose your monthly essential expenses look like this:
          </p>
          <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Rent</span>
                <span className="font-mono tabular-nums">₱10,000</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Food & Groceries</span>
                <span className="font-mono tabular-nums">₱8,000</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Utilities</span>
                <span className="font-mono tabular-nums">₱4,000</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Transportation</span>
                <span className="font-mono tabular-nums">₱3,000</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-gray-100 pt-2 font-medium text-gray-500">
                <span>Total Monthly Expenses</span>
                <span className="font-mono tabular-nums">₱25,000</span>
              </div>
            </div>
            <div className="mt-4 space-y-1 text-[16px] leading-[22px] text-gray-400">
              <p>
                <strong className="text-gray-500">3-month target:</strong>{" "}
                ₱25,000 x 3 = ₱75,000
              </p>
              <p>
                <strong className="text-gray-500">6-month target:</strong>{" "}
                ₱25,000 x 6 = ₱150,000
              </p>
            </div>
            <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
              If you save ₱10,000 per month toward your emergency fund, you
              would reach the 3-month target in about 8 months and the 6-month
              target in about 15 months.
            </p>
          </div>
        </section>

        {/* Questions to consider */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Questions to Consider
          </h2>
          <ul className="mt-6 space-y-4">
            {questionsToConsider.map((question, i) => (
              <li
                key={i}
                className="flex gap-3 text-[16px] leading-[22px] text-gray-400"
              >
                <HelpCircle className="mt-0.5 size-5 shrink-0 text-brand" />
                {question}
              </li>
            ))}
          </ul>
        </section>

        {/* Disclaimer */}
        <div className="mt-16 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
          <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
          <p className="text-[16px] leading-[22px] text-gray-400">
            This calculator provides estimates for planning purposes only. The
            right emergency fund amount depends on your personal circumstances,
            risk tolerance, and financial obligations. Consider consulting a
            qualified financial advisor for personalized guidance.
          </p>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={faqs} />
        </div>

        {/* Related Calculators and Guides */}
        <section className="mt-16">
          <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
            Related Calculators and Guides
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedContent.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-brand">
                    <Icon className="size-4" />
                  </div>
                  <span className="flex-1 text-[16px] font-semibold text-gray-500 group-hover:text-brand">
                    {item.title}
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-gray-300" />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
