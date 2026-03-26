import type { Metadata } from "next";
import Link from "next/link";
import {
  HelpCircle,
  Calculator,
  BookOpen,
  DollarSign,
  Percent,
  Clock,
  ShieldCheck,
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
import { CarLoanCalculator } from "@/components/calculators/car-loan-calculator";
import { carLoanData } from "@/data/calculators/car-loan";

export const metadata: Metadata = generatePageMetadata({
  title: carLoanData.metaTitle,
  description: carLoanData.metaDescription,
  slug: carLoanData.slug,
  updatedAt: carLoanData.updatedAt,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Car Loan Calculator" },
];

const beforeYouStart = [
  "Start with the car's total purchase price",
  "Choose a down payment you can comfortably afford",
  "Compare 36-, 48-, and 60-month loan terms",
  "Test different interest rates if you are comparing lenders",
  "Leave room in your budget for insurance, registration, fuel, and maintenance",
];

const paymentFactors = [
  {
    icon: DollarSign,
    title: "Vehicle Price",
    description:
      "A more expensive car increases the total amount you need to finance, which usually increases the monthly payment.",
  },
  {
    icon: ShieldCheck,
    title: "Down Payment",
    description:
      "A larger down payment reduces the amount borrowed. This often lowers both your monthly payment and the total interest you pay over the life of the loan.",
  },
  {
    icon: Clock,
    title: "Loan Term",
    description:
      "A longer term spreads the cost over more months, which can lower the monthly payment. However, it may also increase the total interest paid overall.",
  },
  {
    icon: Percent,
    title: "Interest Rate",
    description:
      "Even a small difference in interest rate can change the total cost of borrowing. When comparing lenders, check both the monthly payment and the full loan cost.",
  },
];

const ownershipCosts = [
  "comprehensive insurance",
  "chattel mortgage fees",
  "LTO registration and renewal costs",
  "fuel",
  "maintenance and repairs",
  "parking and tolls",
];

const compareBeforeApplying = [
  "estimated monthly payment",
  "down payment required",
  "total interest over the full term",
  "total estimated loan cost",
  "required insurance or add-on products",
  "chattel mortgage and processing fees",
  "early repayment terms",
  "dealer financing versus bank financing",
];

const questionsToConsider = [
  "Can I comfortably afford the estimated monthly payment along with fuel, insurance, maintenance, parking, and registration costs?",
  "Would a larger down payment make the loan more manageable?",
  "Should I compare dealer financing and bank financing before deciding?",
  "Does a shorter term save more in total cost, even if the monthly payment is higher?",
  "Are there extra fees or required charges not included in this estimate?",
];

const relatedContent = [
  {
    title: "Personal Loan Calculator",
    href: "/calculators/loans/personal-loan-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Home Loan Calculator",
    href: "/calculators/loans/home-loan-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Loan Guides",
    href: "/guides",
    icon: BookOpen,
  },
  {
    title: "Interest Rate Guides",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    icon: BookOpen,
  },
  {
    title: "Financial Planning Guides",
    href: "/guides",
    icon: BookOpen,
  },
];

export default function CarLoanCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: carLoanData.metaTitle,
          description: carLoanData.metaDescription,
        })}
      />

      <PageHero
        title={carLoanData.h1}
        description={carLoanData.intro}
        badge={carLoanData.updatedAt}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <CarLoanCalculator
            beforeYouStart={{
              description:
                "If you are still deciding what car budget makes sense, start with a few simple assumptions. Use the full vehicle price, then test different down payments and loan terms to see how your monthly payment changes.",
              items: beforeYouStart,
            }}
          />
        </div>

        {/* How to Tell if the Monthly Payment Is Realistic */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            How to Tell if the Monthly Payment Is Realistic
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            A monthly car payment may look manageable at first, but it should
            still fit comfortably within your overall monthly budget. Before
            applying, check whether you can still cover your regular expenses,
            savings, emergency fund, and other debt payments after adding the
            estimated monthly amortization.
          </p>
          <div className="mt-4 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <p className="text-[16px] leading-[22px] text-gray-400">
              A lower monthly payment is not always the cheaper option overall. A
              longer loan term can reduce the monthly amount, but it may also
              increase the total interest paid over time. A bigger down payment
              usually lowers both the monthly payment and the total borrowing cost.
            </p>
          </div>
        </section>

        {/* What Affects Your Monthly Car Loan Payment */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            What Affects Your Monthly Car Loan Payment
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Your estimated car loan payment depends on four main factors: the
            vehicle price, the down payment, the loan term, and the interest
            rate. Understanding how each one works can help you compare offers
            more clearly.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
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

        {/* Your Monthly Loan Payment Is Not the Full Cost */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Your Monthly Loan Payment Is Not the Full Cost of Owning a Car
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            A car loan calculator helps estimate the financing side of the
            purchase, but your total car budget should include more than just the
            monthly amortization. Also consider:
          </p>
          <ul className="mt-4 space-y-3">
            {ownershipCosts.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Use the calculator to estimate your loan payment, then add these
            ownership costs before deciding what vehicle price range is truly
            affordable.
          </p>
        </section>

        {/* What to Compare Before Choosing a Car Loan */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            What to Compare Before Choosing a Car Loan
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Do not compare lenders based on monthly payment alone. Two offers may
            look similar at first, but the total cost can be very different
            depending on the term, interest rate, and fees. Before applying,
            compare:
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
            Use this calculator more than once so you can compare multiple offers
            side by side before making a decision.
          </p>
        </section>

        {/* Questions to Consider */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Questions to consider before applying
          </h2>
          <ul className="mt-6 space-y-4">
            {questionsToConsider.map((question, i) => (
              <li key={i} className="flex gap-3 text-[16px] leading-[22px] text-gray-400">
                <HelpCircle className="mt-0.5 size-5 shrink-0 text-brand" />
                {question}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={carLoanData.faqs} />
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
