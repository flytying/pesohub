import type { Metadata } from "next";
import Link from "next/link";
import {
  HelpCircle,
  Calculator,
  BookOpen,
  BarChart3,
  Target,
  TrendingUp,
  GraduationCap,
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
import { SavingsGoalCalculator } from "@/components/calculators/savings-goal-calculator";

export const metadata: Metadata = generatePageMetadata({
  title:
    "Savings Goal Calculator Philippines: Monthly Savings Needed | PesoHub",
  description:
    "Calculate how much you need to save each month to reach your financial goal. Set a target amount and timeline, then compare different scenarios to find a plan that works.",
  slug: "calculators/savings/savings-goal-calculator-philippines",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Savings Goal Calculator" },
];

const commonGoals = [
  {
    icon: Target,
    title: "Down Payment",
    description:
      "Saving for a home or car down payment is one of the most common savings goals in the Philippines. A 20% down payment on a ₱2,000,000 home means targeting ₱400,000.",
    example: "₱400,000 in 3 years = ~₱11,111/month",
  },
  {
    icon: GraduationCap,
    title: "Education Fund",
    description:
      "College tuition, review classes, or professional certifications. Setting a target early gives you more time and smaller monthly amounts.",
    example: "₱200,000 in 2 years = ~₱8,333/month",
  },
  {
    icon: TrendingUp,
    title: "Investment Capital",
    description:
      "Building a lump sum to invest in stocks, mutual funds, or a small business. Starting with a specific target amount makes the goal measurable.",
    example: "₱100,000 in 1 year = ~₱8,333/month",
  },
];

const savingsTips = [
  "Automate your savings with a standing transfer on payday so you save before you spend.",
  "Keep your goal savings in a separate account from your daily spending money.",
  "Use a high-interest digital bank account to earn while you save — even small rate differences add up over time.",
  "Review your progress monthly and adjust if your income or expenses change.",
  "If you receive a bonus or 13th month pay, consider putting a portion toward your goal to reach it faster.",
];

const questionsToConsider = [
  "Is my target amount realistic given my current income and expenses?",
  "Can I commit to this monthly savings amount for the full timeline?",
  "Should I keep my savings in a regular account or a higher-interest option?",
  "What happens if I miss a month — can I make up for it later?",
  "Would a longer timeline with smaller monthly amounts be more sustainable?",
];

const faqs = [
  {
    question: "How do I calculate how much to save each month?",
    answer:
      "Divide your target amount by the number of months in your timeline. For example, if you want to save ₱120,000 in 12 months, you need ₱10,000 per month. If you include an interest rate (from a savings account), the monthly amount needed will be slightly lower because your money earns interest while you save.",
  },
  {
    question: "Should I include interest in my savings goal calculation?",
    answer:
      "Including interest gives a more accurate picture if you plan to keep your savings in a high-interest account. However, interest rates can change, so treat the interest portion as a bonus rather than something to depend on. The calculator shows both your total contributions and estimated interest earned.",
  },
  {
    question: "What is a realistic savings timeline?",
    answer:
      "It depends on the goal amount and how much you can save each month. Use the Compare Timelines section to see different options. A good rule of thumb: if the monthly amount is more than 20-30% of your take-home pay, consider extending the timeline or reducing the target amount.",
  },
  {
    question: "Can I use this calculator for multiple savings goals?",
    answer:
      "Yes. Run the calculator separately for each goal to see the monthly amount needed for each one. Then add up all the monthly amounts to check whether your total savings capacity can cover all goals at once. If not, prioritize your goals or extend timelines.",
  },
  {
    question:
      "What is the difference between a savings goal and an emergency fund?",
    answer:
      "A savings goal is for planned expenses with a specific target and timeline — like a vacation, gadget, tuition, or down payment. An emergency fund is for unexpected events and should be kept liquid and accessible at all times. We recommend building your emergency fund first before saving for other goals. Use our Emergency Fund Calculator to set your emergency fund target.",
  },
  {
    question: "Where should I keep my savings goal money?",
    answer:
      "For goals under 1 year away, a high-interest savings account is ideal — easy to access and earns some interest. For goals 1-3 years away, consider a time deposit for slightly higher returns if you will not need the money before maturity. For goals beyond 3 years, you might explore investment options, though these carry more risk. Check our Best Savings Interest Rates page for current rates.",
  },
];

const relatedContent = [
  {
    title: "Best Savings Interest Rates",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    icon: BarChart3,
  },
  {
    title: "Time Deposit Calculator",
    href: "/calculators/savings/time-deposit-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Emergency Fund Calculator",
    href: "/calculators/savings/emergency-fund-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Best Digital Bank Rates",
    href: "/rates/savings-rates/best-digital-bank-rates-philippines",
    icon: BarChart3,
  },
  {
    title: "Guides Hub",
    href: "/guides",
    icon: BookOpen,
  },
];

export default function SavingsGoalCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: "Savings Goal Calculator Philippines",
          description:
            "Calculate how much you need to save each month to reach your financial goal in the Philippines.",
        })}
      />

      <PageHero
        title="Savings Goal Calculator Philippines"
        description="Estimate how much you need to save each month to reach a target amount by your chosen timeline. Adjust the goal, timeline, and interest rate to compare different scenarios and find a monthly savings plan that works for you."
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <SavingsGoalCalculator />
        </div>

        {/* How It Works */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            How Savings Goal Calculation Works
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            The calculator divides the remaining amount you need to save by the
            number of months in your timeline. If you include an annual interest
            rate, it factors in the compound interest your savings will earn each
            month, which reduces the monthly contribution needed.
          </p>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            The formula accounts for your starting balance growing with
            interest, plus regular monthly deposits that also earn interest over
            time. The result is the minimum monthly savings needed to reach your
            exact target by the end of your timeline.
          </p>
        </section>

        {/* Common Savings Goals */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Common Savings Goals in the Philippines
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Having a specific target amount makes saving easier to plan and
            track. Here are some of the most common savings goals among
            Filipinos:
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {commonGoals.map((goal) => {
              const Icon = goal.icon;
              return (
                <div
                  key={goal.title}
                  className="rounded-xl border border-gray-200 bg-white p-6"
                >
                  <div className="flex size-14 items-center justify-center rounded-full bg-gray-50 text-brand">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-4 text-[20px] font-semibold leading-[26px] text-gray-500">
                    {goal.title}
                  </h3>
                  <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
                    {goal.description}
                  </p>
                  <p className="mt-3 text-[14px] font-medium text-brand">
                    {goal.example}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Worked Example */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Example: Saving for a ₱100,000 Goal
          </h2>
          <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[16px] leading-[22px] text-gray-400">
              Suppose you want to save ₱100,000 in 12 months. You already have
              ₱20,000 set aside, and you plan to keep the savings in a digital
              bank account earning 3% per year.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Goal Amount</span>
                <span className="font-mono tabular-nums">₱100,000</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Starting Balance</span>
                <span className="font-mono tabular-nums">₱20,000</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Remaining to Save</span>
                <span className="font-mono tabular-nums">₱80,000</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Timeline</span>
                <span className="font-mono tabular-nums">12 months</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Annual Interest Rate</span>
                <span className="font-mono tabular-nums">3.00%</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-gray-100 pt-2 font-medium text-gray-500">
                <span>Monthly Savings Needed</span>
                <span className="font-mono tabular-nums">~₱6,530</span>
              </div>
            </div>
            <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
              Without interest, you would need about ₱6,667 per month. The
              interest earned reduces the monthly amount slightly. Over 12
              months, the difference may be modest, but over longer timelines the
              interest impact grows.
            </p>
          </div>
        </section>

        {/* Tips for Reaching Your Goal */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Tips for Reaching Your Savings Goal
          </h2>
          <ul className="mt-6 space-y-4">
            {savingsTips.map((tip, i) => (
              <li
                key={i}
                className="flex gap-3 text-[16px] leading-[22px] text-gray-400"
              >
                <ArrowRight className="mt-0.5 size-4 shrink-0 text-brand" />
                {tip}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-3 rounded-lg border border-gray-200 bg-white p-6">
            <Info className="mt-0.5 size-5 shrink-0 text-gray-300" />
            <p className="text-[16px] leading-[22px] text-gray-400">
              Compare current rates on our{" "}
              <Link
                href="/rates/savings-rates/best-savings-interest-rates-philippines"
                className="text-brand hover:underline"
              >
                Best Savings Interest Rates
              </Link>{" "}
              page to find the best account for your savings goal.
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
            This calculator provides estimates for planning purposes only.
            Actual interest earned may vary depending on the bank, account type,
            and rate changes over time. Consider consulting a qualified financial
            advisor for personalized guidance.
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
