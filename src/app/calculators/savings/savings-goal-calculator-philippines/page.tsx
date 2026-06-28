import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Info,
  Check,
  Target,
  GraduationCap,
  TrendingUp,
  PiggyBank,
  Clock,
  Shield,
  BookOpen,
} from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateCalculatorSchema,
} from "@/lib/schema-markup";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/shared/faq-section";
import { SavingsGoalCalculator } from "@/components/calculators/savings-goal-calculator";

const TITLE = "Savings Goal Calculator Philippines";
const INTRO =
  "Estimate how much you need to save each month to reach a target amount by your chosen timeline. Adjust the goal, timeline, starting balance, and interest rate to compare scenarios and find a monthly savings plan that works for you.";

export const metadata: Metadata = generatePageMetadata({
  title: "Savings Goal Calculator Philippines: Monthly Savings Needed",
  description:
    "Calculate how much you need to save each month to reach your financial goal. Set a target amount and timeline, then compare different scenarios to find a plan that works.",
  slug: "calculators/savings/savings-goal-calculator-philippines",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Savings Goal Calculator" },
];

const CARD =
  "rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,30px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]";
const H2 = "font-display text-[22px] font-semibold tracking-[-0.02em] text-[#0E1525]";
const LEAD = "mt-[10px] max-w-[80ch] text-[16px] leading-[1.65] text-[#475069]";

const commonGoals = [
  {
    icon: Target,
    title: "Down payment",
    desc: "Saving for a home or car down payment is one of the most common goals. A 20% down payment on a ₱2,000,000 home means targeting ₱400,000.",
    example: "₱400,000 in 3 years ≈ ₱11,111/month",
  },
  {
    icon: GraduationCap,
    title: "Education fund",
    desc: "College tuition, review classes, or professional certifications. Setting a target early gives you more time and smaller monthly amounts.",
    example: "₱200,000 in 2 years ≈ ₱8,333/month",
  },
  {
    icon: TrendingUp,
    title: "Investment capital",
    desc: "Building a lump sum to invest in stocks, mutual funds, or a small business. A specific target makes the goal measurable.",
    example: "₱100,000 in 1 year ≈ ₱8,333/month",
  },
];

const tips = [
  "Automate your savings with a standing transfer on payday so you save before you spend.",
  "Keep your goal savings in a separate account from your daily spending money.",
  "Use a high-interest digital bank account to earn while you save — even small rate differences add up over time.",
  "Review your progress monthly and adjust if your income or expenses change.",
  "If you receive a bonus or 13th month pay, consider putting a portion toward your goal to reach it faster.",
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
    question: "What is the difference between a savings goal and an emergency fund?",
    answer:
      "A savings goal is for planned expenses with a specific target and timeline — like a vacation, gadget, tuition, or down payment. An emergency fund is for unexpected events and should be kept liquid and accessible at all times. We recommend building your emergency fund first before saving for other goals.",
  },
  {
    question: "Where should I keep my savings goal money?",
    answer:
      "For goals under 1 year away, a high-interest savings account is ideal — easy to access and earns some interest. For goals 1-3 years away, consider a time deposit for slightly higher returns if you will not need the money before maturity. For goals beyond 3 years, you might explore investment options, though these carry more risk.",
  },
];

const relatedPages = [
  {
    title: "Best Savings Interest Rates",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    icon: PiggyBank,
  },
  {
    title: "Time Deposit Calculator",
    href: "/calculators/savings/time-deposit-calculator-philippines",
    icon: Clock,
  },
  {
    title: "Emergency Fund Calculator",
    href: "/calculators/savings/emergency-fund-calculator-philippines",
    icon: Shield,
  },
  {
    title: "Best Digital Bank Rates",
    href: "/rates/savings-rates/best-digital-bank-rates-philippines",
    icon: TrendingUp,
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
          title: TITLE,
          description:
            "Calculate how much you need to save each month to reach your financial goal in the Philippines.",
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
          <p className="mt-[9px] max-w-[80ch] text-[16px] leading-[1.55] text-[#5A6478]">{INTRO}</p>
        </div>

        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <SavingsGoalCalculator />
        </div>

        <div className="mt-9 space-y-[14px]">
          {/* How it works */}
          <section className={CARD}>
            <h2 className={H2}>How savings goal calculation works</h2>
            <p className={LEAD}>
              The calculator divides the remaining amount you need to save by the number of months
              in your timeline. If you include an annual interest rate, it factors in the compound
              interest your savings will earn each month, which reduces the monthly contribution
              needed.
            </p>
            <p className={LEAD}>
              The formula accounts for your starting balance growing with interest, plus regular
              monthly deposits that also earn interest over time. The result is the minimum monthly
              savings needed to reach your exact target by the end of your timeline.
            </p>
          </section>

          {/* Common goals */}
          <section className={CARD}>
            <h2 className={H2}>Common savings goals in the Philippines</h2>
            <p className={LEAD}>
              Having a specific target amount makes saving easier to plan and track. Here are some of
              the most common goals.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {commonGoals.map((g) => {
                const Icon = g.icon;
                return (
                  <div key={g.title} className="rounded-[16px] border border-[#E7EBF3] bg-white p-[22px]">
                    <span className="flex size-11 items-center justify-center rounded-[12px] bg-[#EAF0FF] text-brand">
                      <Icon className="size-[22px]" />
                    </span>
                    <h3 className="mt-[14px] font-display text-[18px] font-semibold text-[#0E1525]">{g.title}</h3>
                    <p className="mb-3 mt-2 text-[14.5px] leading-[1.55] text-[#5A6478]">{g.desc}</p>
                    <div className="text-[14px] font-bold text-brand">{g.example}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Tips */}
          <section className={CARD}>
            <h2 className={H2}>Tips for reaching your savings goal</h2>
            <ul className="mt-5 space-y-[14px]">
              {tips.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[16px] leading-[1.55] text-[#344054]">
                  <Check className="mt-1 size-[18px] shrink-0 text-[#0E9F6E]" />
                  {t}
                </li>
              ))}
            </ul>
          </section>

          {/* Disclaimer */}
          <div className="flex gap-3 rounded-[14px] border border-[#F0E2BE] bg-[#FFF8E8] p-5">
            <Info className="mt-0.5 size-5 shrink-0 text-[#C99A22]" />
            <p className="text-[15px] leading-[1.6] text-[#7A6320]">
              This calculator provides estimates for planning purposes only. Actual interest earned
              may vary depending on the bank, account type, and rate changes over time. Consider
              consulting a qualified financial advisor for personalized guidance.
            </p>
          </div>

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
