import type { Metadata } from "next";
import Link from "next/link";
import {
  Banknote,
  ShoppingBag,
  Wallet,
  Timer,
  HelpCircle,
  Calculator,
  BookOpen,
  DollarSign,
  Percent,
  Clock,
  AlertTriangle,
  TrendingUp,
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
import { PersonalLoanCalculator } from "@/components/calculators/personal-loan-calculator";
import { personalLoanData } from "@/data/calculators/personal-loan";

export const metadata: Metadata = generatePageMetadata({
  title: personalLoanData.metaTitle,
  description: personalLoanData.metaDescription,
  slug: personalLoanData.slug,
  updatedAt: personalLoanData.updatedAt,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Personal Loan Calculator" },
];

const beforeYouBorrow = [
  "Borrow only what you actually need",
  "Compare shorter and longer repayment terms",
  "Check whether the monthly payment fits your regular budget",
  "Ask whether fees will be deducted from the amount you receive",
  "Compare more than one lender type before deciding",
];

const scenarioCards = [
  {
    icon: Banknote,
    title: "Small emergency loan",
    description:
      "A smaller personal loan may be useful for urgent but manageable expenses such as medical bills, repairs, or short-term cash needs. This type of scenario can help you check whether a shorter repayment term keeps the total borrowing cost lower.",
  },
  {
    icon: ShoppingBag,
    title: "Mid-size planned expense",
    description:
      "A mid-size personal loan may be used for tuition, appliances, travel, or other planned costs. This scenario is useful if you want to compare whether a slightly longer term makes the monthly payment easier without making the total repayment too expensive.",
  },
  {
    icon: Wallet,
    title: "Larger personal loan",
    description:
      "A larger personal loan can result in a much higher monthly payment and total interest cost. This type of scenario helps you test whether the loan amount is still realistic for your monthly budget before applying.",
  },
  {
    icon: Timer,
    title: "Shorter term vs longer term",
    description:
      "Use the same loan amount, then compare a shorter repayment term with a longer one. A longer term may reduce the monthly payment, but it often increases the total interest paid over time. This is one of the most useful comparisons to make before choosing between loan offers.",
  },
];

const paymentFactors = [
  {
    icon: DollarSign,
    title: "Loan Amount",
    description:
      "A higher loan amount usually increases both the monthly payment and the total amount repaid.",
  },
  {
    icon: Clock,
    title: "Repayment Term",
    description:
      "A longer term spreads the cost over more months, which can reduce the monthly payment. However, it may also increase the total interest paid.",
  },
  {
    icon: Percent,
    title: "Interest Rate",
    description:
      "Even a small change in interest rate can affect both your monthly payment and your total repayment. When comparing lenders, check the full cost, not just the monthly amount.",
  },
];

const compareBeforeApplying = [
  "estimated monthly payment",
  "total repayment over the full term",
  "total interest cost",
  "processing fees or service charges",
  "whether fees are deducted upfront",
  "repayment term flexibility",
  "early repayment terms",
  "bank, financing company, or online lender differences",
];

const questionsToAsk = [
  "Do I really need this full amount?",
  "Can I still afford the monthly payment if other expenses increase?",
  "Is a shorter term possible without straining my budget?",
  "Are there fees that change the real cost of borrowing?",
  "Have I compared more than one lender or lender type?",
];

const relatedContent = [
  {
    title: "Guides Hub",
    href: "/guides",
    icon: BookOpen,
  },
  {
    title: "Rates Hub",
    href: "/rates",
    icon: TrendingUp,
  },
  {
    title: "Car Loan Calculator",
    href: "/calculators/loans/car-loan-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Home Loan Calculator",
    href: "/calculators/loans/home-loan-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "All Calculators",
    href: "/calculators",
    icon: Calculator,
  },
];

export default function PersonalLoanCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: personalLoanData.metaTitle,
          description: personalLoanData.metaDescription,
        })}
      />

      <PageHero
        title={personalLoanData.h1}
        description={personalLoanData.intro}
        badge={personalLoanData.updatedAt}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <PersonalLoanCalculator
            beforeYouStart={{
              title: "Before You Borrow",
              description:
                "A personal loan can help cover planned expenses or urgent needs, but it should still fit comfortably within your monthly budget. Before applying, test different loan amounts and repayment terms so you can compare affordability, not just approval.",
              items: beforeYouBorrow,
            }}
          />
        </div>

        {/* How to Tell if the Monthly Payment Is Realistic */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            How to Tell if the Monthly Payment Is Realistic
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            A monthly personal loan payment may look manageable at first, but it
            should still leave room for rent, food, bills, savings, and
            emergency expenses. Before applying, check whether the payment still
            feels comfortable even during tighter months.
          </p>
          <div className="mt-4 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <p className="text-[16px] leading-[22px] text-gray-400">
              A lower monthly payment is not always the lower-cost option overall.
              A longer repayment term can reduce the monthly amount, but it may
              also increase the total interest paid over time. A higher loan
              amount increases both the monthly payment and the total repayment.
            </p>
          </div>
        </section>

        {/* Worked Examples */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Personal Loan Comparison: Common Amounts and Terms
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            These three examples show how the loan amount, term, and interest
            rate affect your monthly payment and total borrowing cost. Use them
            as a quick reference, then run your own numbers in the calculator
            above.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {/* Small */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-dashed border-gray-200 bg-gray-50 px-6 py-4">
                <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                  Small Emergency Loan
                </h3>
              </div>
              <div className="px-6 py-4">
                <dl className="space-y-2.5 text-[16px] leading-[22px]">
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Loan Amount</dt>
                    <dd className="font-mono tabular-nums text-gray-500">₱30,000</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Term</dt>
                    <dd className="font-mono tabular-nums text-gray-500">12 months</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Rate</dt>
                    <dd className="font-mono tabular-nums text-gray-500">18%</dd>
                  </div>
                  <div className="my-3 border-t border-dashed border-gray-200" />
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Total Interest</dt>
                    <dd className="font-mono tabular-nums text-gray-500">₱3,005</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Total Repayment</dt>
                    <dd className="font-mono tabular-nums text-gray-500">₱33,005</dd>
                  </div>
                </dl>
              </div>
              <div className="border-t border-dashed border-gray-200 bg-gray-50 px-6 py-4">
                <div className="flex justify-between text-[16px] leading-[22px]">
                  <span className="font-semibold text-gray-500">Monthly Payment</span>
                  <span className="font-mono tabular-nums font-bold text-brand">₱2,750</span>
                </div>
              </div>
            </div>

            {/* Mid */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-dashed border-gray-200 bg-gray-50 px-6 py-4">
                <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                  Mid-Size Planned Expense
                </h3>
              </div>
              <div className="px-6 py-4">
                <dl className="space-y-2.5 text-[16px] leading-[22px]">
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Loan Amount</dt>
                    <dd className="font-mono tabular-nums text-gray-500">₱100,000</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Term</dt>
                    <dd className="font-mono tabular-nums text-gray-500">24 months</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Rate</dt>
                    <dd className="font-mono tabular-nums text-gray-500">15%</dd>
                  </div>
                  <div className="my-3 border-t border-dashed border-gray-200" />
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Total Interest</dt>
                    <dd className="font-mono tabular-nums text-gray-500">₱16,368</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Total Repayment</dt>
                    <dd className="font-mono tabular-nums text-gray-500">₱116,368</dd>
                  </div>
                </dl>
              </div>
              <div className="border-t border-dashed border-gray-200 bg-gray-50 px-6 py-4">
                <div className="flex justify-between text-[16px] leading-[22px]">
                  <span className="font-semibold text-gray-500">Monthly Payment</span>
                  <span className="font-mono tabular-nums font-bold text-brand">₱4,849</span>
                </div>
              </div>
            </div>

            {/* Larger */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-dashed border-gray-200 bg-gray-50 px-6 py-4">
                <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                  Larger Personal Loan
                </h3>
              </div>
              <div className="px-6 py-4">
                <dl className="space-y-2.5 text-[16px] leading-[22px]">
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Loan Amount</dt>
                    <dd className="font-mono tabular-nums text-gray-500">₱300,000</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Term</dt>
                    <dd className="font-mono tabular-nums text-gray-500">36 months</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Rate</dt>
                    <dd className="font-mono tabular-nums text-gray-500">12%</dd>
                  </div>
                  <div className="my-3 border-t border-dashed border-gray-200" />
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Total Interest</dt>
                    <dd className="font-mono tabular-nums text-gray-500">₱58,715</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Total Repayment</dt>
                    <dd className="font-mono tabular-nums text-gray-500">₱358,715</dd>
                  </div>
                </dl>
              </div>
              <div className="border-t border-dashed border-gray-200 bg-gray-50 px-6 py-4">
                <div className="flex justify-between text-[16px] leading-[22px]">
                  <span className="font-semibold text-gray-500">Monthly Payment</span>
                  <span className="font-mono tabular-nums font-bold text-brand">₱9,964</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <p className="text-[16px] leading-[22px] text-gray-400">
              These are planning estimates only. Actual lender offers will vary
              based on approval terms, fees, and repayment structure. Use the
              calculator above to test your own numbers.
            </p>
          </div>
        </section>

        {/* What Affects Your Personal Loan Payment */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            How Interest Rate Affects Your Loan Monthly Payment
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Your estimated payment depends on three main factors: the loan
            amount, the repayment term, and the interest rate. Understanding how
            each one works can help you compare offers more clearly.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {paymentFactors.map((factor) => {
              const Icon = factor.icon;
              return (
                <div key={factor.title} className="rounded-xl border border-gray-200 bg-white p-6">
                  <div className="flex size-14 items-center justify-center rounded-full bg-gray-50 text-brand">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-4 text-[20px] font-semibold leading-[26px] text-gray-500">
                    {factor.title}
                  </h3>
                  <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
                    {factor.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* What to Compare Before Choosing */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            What to Compare Before Choosing a Personal Loan
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Do not compare personal loans based on monthly payment alone. Two
            offers may look similar at first, but the total borrowing cost,
            fees, and repayment structure can be very different depending on the
            lender type. Before applying, compare:
          </p>
          <ul className="mt-4 space-y-3">
            {compareBeforeApplying.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Use this calculator more than once so you can compare multiple loan
            options side by side before making a decision.
          </p>
        </section>

        {/* Release Amount Warning */}
        <section className="mt-16">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex gap-3">
              <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
              <div>
                <h2 className="text-[16px] font-semibold text-gray-500">
                  You May Not Receive the Full Loan Amount in Cash
                </h2>
                <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
                  Some lenders charge processing fees, service fees, insurance,
                  or other deductions that may reduce the actual amount released
                  to you. That means the approved loan amount and the cash you
                  receive may not always be the same.
                </p>
                <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
                  Before applying, ask the lender whether any fees will be
                  deducted upfront or added to your repayment amount.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Questions to Ask */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Questions to Ask Before Applying for a Personal Loan
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Before choosing a personal loan, it helps to ask a few practical
            questions:
          </p>
          <ul className="mt-6 space-y-4">
            {questionsToAsk.map((question, i) => (
              <li key={i} className="flex gap-3 text-[16px] leading-[22px] text-gray-400">
                <HelpCircle className="mt-0.5 size-5 shrink-0 text-brand" />
                {question}
              </li>
            ))}
          </ul>
        </section>

        {/* Sample Personal Loan Scenarios */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Sample Personal Loan Scenarios
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            These examples can help you compare common borrowing situations. Use
            them as planning references, then adjust the numbers based on your
            actual loan amount, term, and lender offer.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {scenarioCards.map((scenario) => {
              const Icon = scenario.icon;
              return (
                <div key={scenario.title} className="rounded-xl border border-gray-200 bg-white p-6">
                  <div className="flex size-14 items-center justify-center rounded-full bg-gray-50 text-brand">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-4 text-[20px] font-semibold leading-[26px] text-gray-500">
                    {scenario.title}
                  </h3>
                  <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
                    {scenario.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={personalLoanData.faqs} />
        </div>

        {/* Related Calculators and Guides */}
        <section className="mt-16">
          <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
            Related calculators and guides
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
