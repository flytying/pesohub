import type { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  Building2,
  ArrowDownUp,
  Timer,
  HelpCircle,
  Calculator,
  BookOpen,
  Landmark,
  DollarSign,
  Percent,
  Clock,
  ShieldCheck,
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
import { HomeLoanCalculator } from "@/components/calculators/home-loan-calculator";
import { homeLoanData } from "@/data/calculators/home-loan";

export const metadata: Metadata = generatePageMetadata({
  title: homeLoanData.metaTitle,
  description: homeLoanData.metaDescription,
  slug: homeLoanData.slug,
  updatedAt: homeLoanData.updatedAt,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Home Loan Calculator" },
];

const beforeYouStart = [
  "Start with the property price you are considering",
  "Test 10%, 20%, and higher down payment options",
  "Compare 15-, 20-, and 30-year loan terms",
  "Try different interest rates if you are comparing lenders",
  "Leave room in your budget for fees, insurance, dues, taxes, and emergency savings",
];

const financingScenarios = [
  {
    icon: Landmark,
    title: "Pag-IBIG-style example",
    description:
      "A Pag-IBIG-style financing scenario can be useful for borrowers looking for a more structured, long-term housing loan option. Try a property price, a realistic down payment, and a long repayment term to estimate whether the monthly amount fits your budget.",
  },
  {
    icon: Building2,
    title: "Bank financing example",
    description:
      "A bank financing scenario can help you estimate how a different interest rate or repayment structure may affect your monthly payment and total borrowing cost. Use this type of example if you want to compare more than one financing path before making a decision.",
  },
  {
    icon: ArrowDownUp,
    title: "Higher vs lower down payment",
    description:
      "Using the same property price, compare what happens when you increase your down payment. A larger upfront amount often reduces the amount financed, lowers the monthly payment, and decreases the total interest paid over time.",
  },
  {
    icon: Timer,
    title: "Shorter term vs longer term",
    description:
      "Use the same property price and down payment, then compare a shorter loan term with a longer one. A longer term may reduce the monthly payment, but it often increases the total interest paid over time.",
  },
];

const affordabilityRanges = [
  {
    icon: Home,
    title: "Entry-level property",
    description:
      "An entry-level condo or smaller home may be easier to finance if you are buying your first property or trying to keep your monthly commitment lower. This type of scenario is useful for estimating a more conservative starting point.",
  },
  {
    icon: Building2,
    title: "Mid-range family home",
    description:
      "A mid-range property may offer more space or a better location, but it will usually result in a higher monthly obligation and larger total borrowing cost. This type of scenario is useful if you are balancing affordability with long-term livability.",
  },
  {
    icon: TrendingUp,
    title: "Higher-value property",
    description:
      "A higher-value property can significantly increase both the monthly payment and the total interest cost. This scenario helps you test whether a larger home budget is realistic once the monthly amortization and other housing expenses are considered.",
  },
];

const paymentFactors = [
  {
    icon: DollarSign,
    title: "Property Price",
    description:
      "A higher property price increases the total amount you need to finance, which usually increases the monthly payment.",
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
      "Even a small difference in interest rate can meaningfully change the total cost of borrowing. When comparing financing options, check both the monthly payment and the full loan cost.",
  },
];

const housingBudgetItems = [
  "down payment",
  "processing fees",
  "appraisal or documentary fees",
  "mortgage insurance or similar insurance costs",
  "property taxes",
  "association dues",
  "move-in and furnishing costs",
  "maintenance and repairs",
];

const compareBeforeApplying = [
  "estimated monthly payment",
  "down payment required",
  "total interest over the full term",
  "total estimated loan cost",
  "fees and charges",
  "insurance requirements",
  "fixed-rate period or repricing terms",
  "Pag-IBIG versus bank financing structure",
];

const questionsToConsider = [
  "Can I comfortably afford the estimated monthly payment along with association dues, insurance, maintenance, property taxes, and other housing-related costs?",
  "Would a larger down payment make the loan more manageable?",
  "Should I compare offers from several banks or housing loan providers before deciding?",
  "Does a shorter term save more in total cost, even if the monthly payment is higher?",
  "Are there extra fees or required charges not included in this estimate?",
];

const relatedContent = [
  {
    title: "Pag-IBIG Housing Loan Guide",
    href: "/government/pag-ibig/pag-ibig-housing-loan-guide",
    icon: Landmark,
  },
  {
    title: "Pag-IBIG Contribution Table",
    href: "/government/pag-ibig/pag-ibig-housing-loan-guide",
    icon: Landmark,
  },
  {
    title: "Rates Hub",
    href: "/rates",
    icon: TrendingUp,
  },
  {
    title: "Personal Loan Calculator",
    href: "/calculators/loans/personal-loan-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Car Loan Calculator",
    href: "/calculators/loans/car-loan-calculator-philippines",
    icon: Calculator,
  },
];

export default function HomeLoanCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: homeLoanData.metaTitle,
          description: homeLoanData.metaDescription,
        })}
      />

      <PageHero
        title={homeLoanData.h1}
        description={homeLoanData.intro}
        badge={homeLoanData.updatedAt}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <HomeLoanCalculator
            beforeYouStart={{
              description:
                "If you are still deciding what property budget makes sense, start by testing a few simple scenarios. Use the property price you are considering, then compare different down payments, loan terms, and interest rates to see how the monthly amount changes.",
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
            A monthly home loan payment may look affordable at first, but it
            should still fit comfortably within your overall monthly budget.
            Before applying, check whether you can still cover regular expenses,
            savings, emergency funds, and other debt payments after adding the
            estimated amortization.
          </p>
          <div className="mt-4 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <p className="text-[16px] leading-[22px] text-gray-400">
              A lower monthly payment is not always the lower-cost option overall.
              A longer loan term can reduce the monthly amount, but it may also
              increase the total interest paid over time. A bigger down payment
              usually lowers both the monthly payment and the total borrowing cost.
            </p>
          </div>
        </section>

        {/* Worked Examples */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Side-by-Side: Pag-IBIG vs Bank Financing
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            These two worked examples show how the same type of decision —
            financing a home — can produce very different numbers depending on
            the interest rate, loan term, and property price. Use them to
            understand the tradeoffs before running your own scenario above.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {/* Pag-IBIG Example */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-dashed border-gray-200 bg-gray-50 px-6 py-4">
                <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                  Pag-IBIG-Style Example
                </h3>
              </div>
              <div className="px-6 py-4">
                <dl className="space-y-2.5 text-[16px] leading-[22px]">
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Property Price</dt>
                    <dd className="font-mono tabular-nums text-gray-500">₱2,500,000</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Down Payment (20%)</dt>
                    <dd className="font-mono tabular-nums text-gray-500">₱500,000</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Loan Amount</dt>
                    <dd className="font-mono tabular-nums text-gray-500">₱2,000,000</dd>
                  </div>
                  <div className="my-3 border-t border-dashed border-gray-200" />
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Interest Rate</dt>
                    <dd className="font-mono tabular-nums text-gray-500">5.375%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Loan Term</dt>
                    <dd className="font-mono tabular-nums text-gray-500">30 years</dd>
                  </div>
                  <div className="my-3 border-t border-dashed border-gray-200" />
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Total Interest</dt>
                    <dd className="font-mono tabular-nums text-gray-500">₱2,031,793</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Total Loan Cost</dt>
                    <dd className="font-mono tabular-nums text-gray-500">₱4,031,793</dd>
                  </div>
                </dl>
              </div>
              <div className="border-t border-dashed border-gray-200 bg-gray-50 px-6 py-4">
                <div className="flex justify-between text-[16px] leading-[22px]">
                  <span className="font-semibold text-gray-500">Est. Monthly Payment</span>
                  <span className="font-mono tabular-nums font-bold text-brand">₱11,199</span>
                </div>
              </div>
              <div className="border-t border-gray-100 px-6 py-3">
                <p className="text-[14px] text-gray-300">
                  Lower monthly payment, but the 30-year term means you pay over ₱2M in interest.
                </p>
              </div>
            </div>

            {/* Bank Example */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-dashed border-gray-200 bg-gray-50 px-6 py-4">
                <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                  Bank Financing Example
                </h3>
              </div>
              <div className="px-6 py-4">
                <dl className="space-y-2.5 text-[16px] leading-[22px]">
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Property Price</dt>
                    <dd className="font-mono tabular-nums text-gray-500">₱3,500,000</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Down Payment (20%)</dt>
                    <dd className="font-mono tabular-nums text-gray-500">₱700,000</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Loan Amount</dt>
                    <dd className="font-mono tabular-nums text-gray-500">₱2,800,000</dd>
                  </div>
                  <div className="my-3 border-t border-dashed border-gray-200" />
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Interest Rate</dt>
                    <dd className="font-mono tabular-nums text-gray-500">7%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Loan Term</dt>
                    <dd className="font-mono tabular-nums text-gray-500">20 years</dd>
                  </div>
                  <div className="my-3 border-t border-dashed border-gray-200" />
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Total Interest</dt>
                    <dd className="font-mono tabular-nums text-gray-500">₱2,410,009</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Total Loan Cost</dt>
                    <dd className="font-mono tabular-nums text-gray-500">₱5,210,009</dd>
                  </div>
                </dl>
              </div>
              <div className="border-t border-dashed border-gray-200 bg-gray-50 px-6 py-4">
                <div className="flex justify-between text-[16px] leading-[22px]">
                  <span className="font-semibold text-gray-500">Est. Monthly Payment</span>
                  <span className="font-mono tabular-nums font-bold text-brand">₱21,708</span>
                </div>
              </div>
              <div className="border-t border-gray-100 px-6 py-3">
                <p className="text-[14px] text-gray-300">
                  Higher monthly payment, but the shorter term reduces total interest per peso borrowed.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <p className="text-[16px] leading-[22px] text-gray-400">
              These are planning estimates only. Actual Pag-IBIG and bank offers
              will vary based on lender terms, borrower profile, fees, and
              approved conditions. Use the calculator above to test your own
              numbers.
            </p>
          </div>
        </section>

        {/* What Affects Your Monthly Home Loan Payment */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            What Affects Your Monthly Home Loan Payment
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Your estimated monthly home loan payment depends on four main
            factors: the property price, the down payment, the loan term, and
            the interest rate. Understanding how each one works can help you
            compare offers more clearly.
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

        {/* Your Loan Payment Is Not Your Full Housing Budget */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Your Loan Payment Is Not Your Full Housing Budget
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            A home loan calculator helps estimate the financing side of the
            purchase, but your total housing budget should include more than just
            the monthly amortization. Also consider:
          </p>
          <ul className="mt-4 space-y-3">
            {housingBudgetItems.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
                <ArrowRight className="size-4 shrink-0 text-gray-300" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Use the calculator to estimate the loan payment, then add these
            costs before deciding what property price range is truly affordable.
          </p>
        </section>

        {/* What to Compare Before Choosing a Home Loan */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            What to Compare Before Choosing a Home Loan
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            Do not compare financing options based on monthly payment alone. Two
            offers may look similar at first, but the total borrowing cost can
            vary depending on the term, interest rate, fees, and financing
            structure. Before applying, compare:
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
            Use this calculator more than once so you can compare multiple
            options side by side before making a decision.
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

        {/* Sample Home Financing Scenarios */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Sample Home Financing Scenarios
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            These examples can help you compare common home financing paths in
            the Philippines. Use them as a starting point, then adjust the
            numbers based on your target property, down payment, and preferred
            financing option.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {financingScenarios.map((scenario) => {
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

        {/* Example Affordability Ranges */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Example Affordability Ranges
          </h2>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            These example ranges can help you think about what different property
            budgets may feel like in practice. Use them as planning references,
            not lender quotes.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {affordabilityRanges.map((range) => {
              const Icon = range.icon;
              return (
                <div key={range.title} className="rounded-xl border border-gray-200 bg-white p-6">
                  <div className="flex size-14 items-center justify-center rounded-full bg-gray-50 text-brand">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-4 text-[20px] font-semibold leading-[26px] text-gray-500">
                    {range.title}
                  </h3>
                  <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
                    {range.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <div className="mt-16">
          <FaqSection faqs={homeLoanData.faqs} />
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
