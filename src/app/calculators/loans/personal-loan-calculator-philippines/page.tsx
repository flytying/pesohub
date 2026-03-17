import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
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
import { buttonVariants } from "@/lib/button-variants";
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

const howToUsePoints = [
  "estimate your monthly personal loan payment",
  "see how much interest you could pay over the full term",
  "compare shorter and longer repayment terms",
  "understand how rate and term affect total borrowing cost",
  "check which loan amount feels more realistic for your budget",
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
    description:
      "Read plain-language guides on loans, taxes, and financial planning.",
    href: "/guides",
    icon: BookOpen,
  },
  {
    title: "Rates Hub",
    description:
      "Compare savings rates, exchange rates, and other financial references.",
    href: "/rates",
    icon: TrendingUp,
  },
  {
    title: "Car Loan Calculator",
    description: "Estimate monthly car loan payments and total interest.",
    href: "/calculators/loans/car-loan-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Home Loan Calculator",
    description: "Compare how larger long-term housing loans work.",
    href: "/calculators/loans/home-loan-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "All Calculators",
    description:
      "Browse all borrowing, salary, and savings calculators in one place.",
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

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <PageHero
          title={personalLoanData.h1}
          description={personalLoanData.intro}
          badge={personalLoanData.updatedAt}
          breadcrumbs={breadcrumbs}
        />

        {/* Support text */}
        <p className="-mt-4 mb-8 text-sm text-muted-foreground">
          Helpful for comparing personal loan options before talking to a bank,
          financing company, or online lender.
        </p>

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

        {/* Your Estimated Personal Loan Results */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Your Estimated Personal Loan Results
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Estimated Monthly Payment
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                This is your estimated monthly loan payment based on the values
                you entered.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Loan Amount
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                This is the loan amount you entered.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Estimated Total Interest
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                This is the total estimated interest you may pay over the full
                repayment term.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Estimated Total Repayment
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                This is the total amount you may repay over the life of the
                loan, including principal and interest.
              </p>
            </div>
          </div>
        </section>

        {/* How to Use This Personal Loan Calculator */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            How to Use This Personal Loan Calculator
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Enter the loan amount, repayment term, and annual interest rate. The
            calculator will estimate your monthly payment, total interest, and
            total repayment so you can compare different borrowing scenarios
            before applying.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            This tool is useful if you want to:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
            {howToUsePoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* How to Tell if the Monthly Payment Is Realistic */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            How to Tell if the Monthly Payment Is Realistic
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            A monthly personal loan payment may look manageable at first, but it
            should still leave room for rent, food, bills, savings, and
            emergency expenses. Before applying, check whether the payment still
            feels comfortable even during tighter months.
          </p>
          <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            A lower monthly payment is not always the lower-cost option overall.
            A longer repayment term can reduce the monthly amount, but it may
            also increase the total interest paid over time. A higher loan
            amount increases both the monthly payment and the total repayment.
          </div>
        </section>

        {/* Worked Examples */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Compare Common Loan Sizes at a Glance
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            These three examples show how the loan amount, term, and interest
            rate affect your monthly payment and total borrowing cost. Use them
            as a quick reference, then run your own numbers in the calculator
            above.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {/* Small */}
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Banknote className="size-4" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  Small Emergency Loan
                </h3>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                ₱30,000 at 18% over 12 months
              </p>
              <dl className="mt-3 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Loan Amount</dt>
                  <dd className="font-medium tabular-nums">₱30,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Term</dt>
                  <dd className="font-medium tabular-nums">12 months</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Rate</dt>
                  <dd className="font-medium tabular-nums">18%</dd>
                </div>
                <div className="my-1.5 border-t border-border" />
                <div className="flex justify-between">
                  <dt className="font-medium text-foreground">Monthly</dt>
                  <dd className="font-semibold tabular-nums text-primary">
                    ₱2,750
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Total Interest</dt>
                  <dd className="font-medium tabular-nums">₱3,005</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Total Repayment</dt>
                  <dd className="font-medium tabular-nums">₱33,005</dd>
                </div>
              </dl>
            </div>

            {/* Mid */}
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-secondary text-primary">
                  <ShoppingBag className="size-4" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  Mid-Size Planned Expense
                </h3>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                ₱100,000 at 15% over 24 months
              </p>
              <dl className="mt-3 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Loan Amount</dt>
                  <dd className="font-medium tabular-nums">₱100,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Term</dt>
                  <dd className="font-medium tabular-nums">24 months</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Rate</dt>
                  <dd className="font-medium tabular-nums">15%</dd>
                </div>
                <div className="my-1.5 border-t border-border" />
                <div className="flex justify-between">
                  <dt className="font-medium text-foreground">Monthly</dt>
                  <dd className="font-semibold tabular-nums text-primary">
                    ₱4,849
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Total Interest</dt>
                  <dd className="font-medium tabular-nums">₱16,368</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Total Repayment</dt>
                  <dd className="font-medium tabular-nums">₱116,368</dd>
                </div>
              </dl>
            </div>

            {/* Larger */}
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Wallet className="size-4" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  Larger Personal Loan
                </h3>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                ₱300,000 at 12% over 36 months
              </p>
              <dl className="mt-3 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Loan Amount</dt>
                  <dd className="font-medium tabular-nums">₱300,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Term</dt>
                  <dd className="font-medium tabular-nums">36 months</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Rate</dt>
                  <dd className="font-medium tabular-nums">12%</dd>
                </div>
                <div className="my-1.5 border-t border-border" />
                <div className="flex justify-between">
                  <dt className="font-medium text-foreground">Monthly</dt>
                  <dd className="font-semibold tabular-nums text-primary">
                    ₱9,964
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Total Interest</dt>
                  <dd className="font-medium tabular-nums">₱58,715</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Total Repayment</dt>
                  <dd className="font-medium tabular-nums">₱358,715</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            These are planning estimates only. Actual lender offers will vary
            based on approval terms, fees, and repayment structure. Use the
            calculator above to test your own numbers.
          </div>
        </section>

        {/* Sample Personal Loan Scenarios */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Sample Personal Loan Scenarios
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            These examples can help you compare common borrowing situations. Use
            them as planning references, then adjust the numbers based on your
            actual loan amount, term, and lender offer.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {scenarioCards.map((scenario) => {
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

        {/* What Affects Your Personal Loan Payment */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            What Affects Your Personal Loan Payment
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your estimated payment depends on three main factors: the loan
            amount, the repayment term, and the interest rate. Understanding how
            each one works can help you compare offers more clearly.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
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

        {/* What to Compare Before Choosing */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            What to Compare Before Choosing a Personal Loan
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Do not compare personal loans based on monthly payment alone. Two
            offers may look similar at first, but the total borrowing cost,
            fees, and repayment structure can be very different depending on the
            lender type. Before applying, compare:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
            {compareBeforeApplying.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Use this calculator more than once so you can compare multiple loan
            options side by side before making a decision.
          </p>
        </section>

        {/* Release Amount Warning */}
        <section className="mt-12">
          <div className="rounded-lg border border-amber-500/30 bg-amber-50/50 p-5 dark:bg-amber-950/20">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  You May Not Receive the Full Loan Amount in Cash
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Some lenders charge processing fees, service fees, insurance,
                  or other deductions that may reduce the actual amount released
                  to you. That means the approved loan amount and the cash you
                  receive may not always be the same.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Before applying, ask the lender whether any fees will be
                  deducted upfront or added to your repayment amount.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Questions to Ask */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Questions to Ask Before Applying
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Before choosing a personal loan, it helps to ask a few practical
            questions:
          </p>
          <ul className="mt-4 space-y-3">
            {questionsToAsk.map((question, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                <HelpCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                {question}
              </li>
            ))}
          </ul>
        </section>

        {/* Related Calculators and Guides */}
        <section className="mt-12">
          <h2 className="mb-6 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
            Related calculators and guides
          </h2>
          <p className="mb-6 -mt-4 text-sm text-muted-foreground">
            Looking at other borrowing tools or financial resources? Explore
            these PesoHub pages next.
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

        {/* How the Personal Loan Estimate Is Calculated */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            How the Personal Loan Estimate Is Calculated
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {personalLoanData.formula.description}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {personalLoanData.formula.explanation}
          </p>
        </section>

        {/* FAQ */}
        <FaqSection faqs={personalLoanData.faqs} />

        {/* Final Reassurance Block */}
        <section className="mb-4 rounded-lg border border-border bg-muted/30 p-8 text-center sm:p-10">
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
            Use this estimate to plan with more confidence
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            A personal loan calculator can help you understand the likely
            monthly cost before you apply. Use the estimate to test different
            loan amounts, rates, and terms, then compare actual offers from
            banks or lenders to find the option that fits your budget better.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#calculator"
              className={buttonVariants({ className: "font-medium" })}
            >
              Calculate payment
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/calculators/loans/car-loan-calculator-philippines"
              className={buttonVariants({
                variant: "outline",
                className: "font-medium",
              })}
            >
              Try the car loan calculator
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
