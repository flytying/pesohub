import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ScrollText,
  TrendingUp,
  BarChart3,
  FileText,
  DollarSign,
} from "lucide-react";
import { FaqSection } from "@/components/shared/faq-section";
import {
  CalculatorsBrowser,
  type CalcGroup,
} from "@/components/calculators/calculators-browser";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/schema-markup";

export const metadata = generatePageMetadata({
  title: "Financial Calculators Philippines: Loan, Salary, Tax & Savings",
  description:
    "Use free Philippine financial calculators for car loans, home loans, withholding tax, SSS contributions, take-home pay, and savings planning.",
  slug: "calculators",
});

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Calculators" }];

const groups: CalcGroup[] = [
  {
    id: "borrowing",
    title: "Borrowing money",
    desc: "Estimate payments, total interest, and total cost before you take on a car, home, or personal loan.",
    accent: "borrow",
    items: [
      {
        name: "Car Loan Calculator",
        desc: "Estimate monthly payment, total interest, and total borrowing cost based on vehicle price, down payment, term, and rate.",
        href: "/calculators/loans/car-loan-calculator-philippines",
        icon: "Car",
      },
      {
        name: "Home Loan Calculator",
        desc: "Estimate monthly home loan payments, total interest, and total cost from property price, down payment, term, and rate.",
        href: "/calculators/loans/home-loan-calculator-philippines",
        icon: "Home",
      },
      {
        name: "Personal Loan Calculator",
        desc: "Estimate monthly personal loan payments, total interest, and total repayment from amount, term, and annual rate.",
        href: "/calculators/loans/personal-loan-calculator-philippines",
        icon: "Wallet",
      },
    ],
  },
  {
    id: "salary",
    title: "Salary and deductions",
    desc: "See how withholding tax, SSS, PhilHealth, and Pag-IBIG affect what actually reaches your bank account.",
    accent: "salary",
    items: [
      {
        name: "Withholding Tax Calculator",
        desc: "Estimate withholding tax based on salary and pay frequency using the current TRAIN Law brackets.",
        href: "/calculators/tax/withholding-tax-calculator-philippines",
        icon: "Calculator",
      },
      {
        name: "SSS Contribution Calculator",
        desc: "Estimate SSS contributions from monthly compensation and see how they change across income ranges.",
        href: "/calculators/sss/sss-contribution-calculator-philippines",
        icon: "Shield",
      },
      {
        name: "Take-Home Pay Calculator",
        desc: "Estimate net pay after common deductions so you can see what may actually reach your payslip.",
        href: "/calculators/tax/take-home-pay-calculator-philippines",
        icon: "HandCoins",
      },
      {
        name: "13th Month Pay Calculator",
        desc: "Estimate your 13th month pay from monthly basic salary and months worked — full-year and prorated.",
        href: "/calculators/salary/thirteenth-month-pay-calculator-philippines",
        icon: "Gift",
      },
    ],
  },
  {
    id: "saving",
    title: "Saving and planning",
    desc: "Plan an emergency fund, project time-deposit returns, or work out how fast you can reach a savings goal.",
    accent: "save",
    items: [
      {
        name: "Emergency Fund Calculator",
        desc: "Estimate a target emergency fund from your monthly expenses and preferred safety buffer.",
        href: "/calculators/savings/emergency-fund-calculator-philippines",
        icon: "Shield",
      },
      {
        name: "Time Deposit Calculator",
        desc: "Estimate returns from a time deposit based on amount, term, and interest rate assumptions.",
        href: "/calculators/savings/time-deposit-calculator-philippines",
        icon: "Clock",
      },
      {
        name: "Savings Goal Calculator",
        desc: "Estimate how much to save regularly to reach a target amount within a chosen time frame.",
        href: "/calculators/savings/savings-goal-calculator-philippines",
        icon: "Target",
      },
    ],
  },
];

const totalCalcs = groups.reduce((n, g) => n + g.items.length, 0);

const relatedPages = [
  { title: "Guides Hub", href: "/guides", icon: BookOpen },
  { title: "Rates Hub", href: "/rates", icon: TrendingUp },
  {
    title: "Withholding Tax Table",
    href: "/government/bir/withholding-tax-table-philippines",
    icon: ScrollText,
  },
  {
    title: "SSS Contribution Table",
    href: "/government/sss/sss-contribution-guide",
    icon: FileText,
  },
  {
    title: "Pag-IBIG Housing Loan Guide",
    href: "/government/pag-ibig/pag-ibig-housing-loan-guide",
    icon: BarChart3,
  },
  {
    title: "Best Savings Rates",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    icon: DollarSign,
  },
];

const faqs = [
  {
    question: "What can I calculate on this page?",
    answer:
      "This page helps you find calculators for common financial decisions in the Philippines, including loan payments, tax withholding, SSS contributions, take-home pay, and savings planning tools.",
  },
  {
    question: "How do I know which calculator to use?",
    answer:
      "Start with the question you are trying to answer. If you are planning a loan, use the borrowing section. If you are checking payroll deductions or net pay, use the salary and deductions section. If you are planning savings, use the saving and planning section.",
  },
  {
    question: "Are the calculator results official or final?",
    answer:
      "These calculators are designed for estimation and planning. Actual lender quotes, payroll results, or official contribution figures may vary depending on the final terms, rules, and provider data.",
  },
  {
    question: "Why might the actual result be different from the estimate?",
    answer:
      "Actual results may differ because of fees, lender policies, payroll settings, updated contribution tables, tax rules, or other details not captured in a simplified calculator input.",
  },
  {
    question: "Where should I verify the numbers after using a calculator?",
    answer:
      "After getting an estimate, check the related guide, rate table, or official reference page linked from the calculator or category section. PesoHub is best used as a planning tool before you verify final details.",
  },
  {
    question: "Are more calculators coming soon?",
    answer:
      "Yes. PesoHub's calculators hub is designed to expand over time, especially in areas like savings, planning, and comparison tools.",
  },
];

export default function CalculatorsPage() {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)] py-[clamp(20px,3vw,36px)]">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Heading */}
      <div className="mb-6">
        <div className="mb-[10px] text-[15px] font-bold uppercase tracking-[.06em] text-brand">
          Calculators
        </div>
        <h1 className="font-display text-[clamp(28px,3.4vw,40px)] font-semibold tracking-[-.02em] text-[#0E1525]">
          Pick a calculator to get started
        </h1>
        <p className="mt-[10px] text-[17px] leading-[1.55] text-[#5A6478]">
          {totalCalcs} free, Philippine-ready tools for loans, salary and
          deductions, and savings — each built around current PH rates and rules.
        </p>
      </div>

      <CalculatorsBrowser groups={groups} />

      {/* FAQ */}
      <div className="mb-[38px] rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,34px)]">
        <FaqSection faqs={faqs} />
      </div>

      {/* Related */}
      <section>
        <h2 className="mb-4 font-display text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-.02em] text-[#0E1525]">
          Related guides and reference pages
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedPages.map((page) => {
            const Icon = page.icon;
            return (
              <Link
                key={page.title}
                href={page.href}
                className="group flex items-center gap-3 rounded-[14px] border border-[#E7EBF3] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,.04)] transition-all hover:border-[#BCC9F4] hover:shadow-[0_14px_30px_-18px_rgba(21,53,199,.32)]"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] bg-[#EAF0FF] text-brand">
                  <Icon className="size-[18px]" />
                </span>
                <span className="text-[15px] font-bold text-[#0E1525] group-hover:text-brand">
                  {page.title}
                </span>
                <ArrowRight className="ml-auto size-4 text-[#C4CCDB] transition-transform group-hover:translate-x-0.5" />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
