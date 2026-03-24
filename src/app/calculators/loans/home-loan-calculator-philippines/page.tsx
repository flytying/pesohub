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
} from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateCalculatorSchema,
} from "@/lib/schema-markup";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
    description:
      "Review Pag-IBIG housing loan rates, terms, and requirements.",
    href: "/government/pag-ibig/pag-ibig-housing-loan-guide",
    icon: Landmark,
  },
  {
    title: "Pag-IBIG Contribution Table",
    description:
      "Check Pag-IBIG contribution amounts based on your salary bracket.",
    href: "/government/pag-ibig/pag-ibig-housing-loan-guide",
    icon: Landmark,
  },
  {
    title: "Rates Hub",
    description:
      "Compare savings rates, exchange rates, and other financial references.",
    href: "/rates",
    icon: TrendingUp,
  },
  {
    title: "Personal Loan Calculator",
    description: "Estimate payments for a different type of borrowing.",
    href: "/calculators/loans/personal-loan-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Car Loan Calculator",
    description: "Estimate monthly car loan payments and total interest.",
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

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
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
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            How to Tell if the Monthly Payment Is Realistic
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            A monthly home loan payment may look affordable at first, but it
            should still fit comfortably within your overall monthly budget.
            Before applying, check whether you can still cover regular expenses,
            savings, emergency funds, and other debt payments after adding the
            estimated amortization.
          </p>
          <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            A lower monthly payment is not always the lower-cost option overall.
            A longer loan term can reduce the monthly amount, but it may also
            increase the total interest paid over time. A bigger down payment
            usually lowers both the monthly payment and the total borrowing cost.
          </div>
        </section>

        {/* Worked Examples */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Side-by-Side: Pag-IBIG vs Bank Financing
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            These two worked examples show how the same type of decision —
            financing a home — can produce very different numbers depending on
            the interest rate, loan term, and property price. Use them to
            understand the tradeoffs before running your own scenario above.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {/* Pag-IBIG Example */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Landmark className="size-4" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  Pag-IBIG-Style Example
                </h3>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                A ₱2,500,000 property with 20% down payment, financed at 5.375%
                over 30 years through Pag-IBIG.
              </p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Property Price</dt>
                  <dd className="font-medium tabular-nums">₱2,500,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Down Payment (20%)</dt>
                  <dd className="font-medium tabular-nums">₱500,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Loan Amount</dt>
                  <dd className="font-medium tabular-nums">₱2,000,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Interest Rate</dt>
                  <dd className="font-medium tabular-nums">5.375%</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Loan Term</dt>
                  <dd className="font-medium tabular-nums">30 years</dd>
                </div>
                <div className="my-2 border-t border-border" />
                <div className="flex justify-between">
                  <dt className="font-medium text-foreground">
                    Est. Monthly Payment
                  </dt>
                  <dd className="font-semibold tabular-nums text-primary">
                    ₱11,199
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Total Interest</dt>
                  <dd className="font-medium tabular-nums">₱2,031,793</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Total Loan Cost</dt>
                  <dd className="font-medium tabular-nums">₱4,031,793</dd>
                </div>
              </dl>
              <p className="mt-4 text-xs text-muted-foreground">
                Lower monthly payment, but the 30-year term means you pay over
                ₱2M in interest — more than the original loan amount.
              </p>
            </div>

            {/* Bank Example */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Building2 className="size-4" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  Bank Financing Example
                </h3>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                A ₱3,500,000 property with 20% down payment, financed at 7%
                over 20 years through a commercial bank.
              </p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Property Price</dt>
                  <dd className="font-medium tabular-nums">₱3,500,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Down Payment (20%)</dt>
                  <dd className="font-medium tabular-nums">₱700,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Loan Amount</dt>
                  <dd className="font-medium tabular-nums">₱2,800,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Interest Rate</dt>
                  <dd className="font-medium tabular-nums">7%</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Loan Term</dt>
                  <dd className="font-medium tabular-nums">20 years</dd>
                </div>
                <div className="my-2 border-t border-border" />
                <div className="flex justify-between">
                  <dt className="font-medium text-foreground">
                    Est. Monthly Payment
                  </dt>
                  <dd className="font-semibold tabular-nums text-primary">
                    ₱21,708
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Total Interest</dt>
                  <dd className="font-medium tabular-nums">₱2,410,009</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Total Loan Cost</dt>
                  <dd className="font-medium tabular-nums">₱5,210,009</dd>
                </div>
              </dl>
              <p className="mt-4 text-xs text-muted-foreground">
                Higher monthly payment, but the shorter term and higher loan
                amount explain the larger total cost. Compare the interest-to-loan
                ratio to see which deal costs more per peso borrowed.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            These are planning estimates only. Actual Pag-IBIG and bank offers
            will vary based on lender terms, borrower profile, fees, and
            approved conditions. Use the calculator above to test your own
            numbers.
          </div>
        </section>

        {/* What Affects Your Monthly Home Loan Payment */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            What Affects Your Monthly Home Loan Payment
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your estimated monthly home loan payment depends on four main
            factors: the property price, the down payment, the loan term, and
            the interest rate. Understanding how each one works can help you
            compare offers more clearly.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {paymentFactors.map((factor) => {
              const Icon = factor.icon;
              return (
                <div key={factor.title} className="space-y-2">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-sm font-semibold">{factor.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {factor.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Your Loan Payment Is Not Your Full Housing Budget */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Your Loan Payment Is Not Your Full Housing Budget
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            A home loan calculator helps estimate the financing side of the
            purchase, but your total housing budget should include more than just
            the monthly amortization. Also consider:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
            {housingBudgetItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Use the calculator to estimate the loan payment, then add these
            costs before deciding what property price range is truly affordable.
          </p>
        </section>

        {/* What to Compare Before Choosing a Home Loan */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            What to Compare Before Choosing a Home Loan
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Do not compare financing options based on monthly payment alone. Two
            offers may look similar at first, but the total borrowing cost can
            vary depending on the term, interest rate, fees, and financing
            structure. Before applying, compare:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
            {compareBeforeApplying.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Use this calculator more than once so you can compare multiple
            options side by side before making a decision.
          </p>
        </section>

        {/* Questions to Consider */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Questions to consider before applying
          </h2>
          <ul className="mt-4 space-y-3">
            {questionsToConsider.map((question, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                <HelpCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                {question}
              </li>
            ))}
          </ul>
        </section>

        {/* Sample Home Financing Scenarios */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Sample Home Financing Scenarios
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            These examples can help you compare common home financing paths in
            the Philippines. Use them as a starting point, then adjust the
            numbers based on your target property, down payment, and preferred
            financing option.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {financingScenarios.map((scenario) => {
              const Icon = scenario.icon;
              return (
                <Card key={scenario.title} className="h-full">
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="mt-3 text-sm">
                      {scenario.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      {scenario.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Example Affordability Ranges */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Example Affordability Ranges
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            These example ranges can help you think about what different property
            budgets may feel like in practice. Use them as planning references,
            not lender quotes.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {affordabilityRanges.map((range) => {
              const Icon = range.icon;
              return (
                <Card key={range.title} className="h-full">
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="mt-3 text-sm">
                      {range.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      {range.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Related Calculators and Guides */}
        <section className="mt-12">
          <h2 className="mb-6 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
            Related calculators and guides
          </h2>
          <p className="mb-6 -mt-4 text-sm text-muted-foreground">
            Looking at related home financing or borrowing resources? Explore
            these PesoHub tools and guides next.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedContent.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group block"
                >
                  <Card className="h-full transition-shadow duration-200 hover:shadow-md">
                    <CardHeader>
                      <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                        <Icon className="size-5" />
                      </div>
                      <CardTitle className="mt-3 text-sm">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-xs leading-relaxed">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <FaqSection faqs={homeLoanData.faqs} />

      </div>
    </>
  );
}
