import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/schema-markup";
import { Clock, Info, Calculator, BarChart3, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = generatePageMetadata({
  title: "Emergency Fund Calculator Philippines",
  description:
    "Estimate how much you may want to set aside for emergencies based on your monthly expenses and target number of months.",
  slug: "calculators/savings/emergency-fund-calculator-philippines",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Emergency Fund Calculator" },
];

const relatedPages = [
  {
    title: "Best Savings Interest Rates",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
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

      <PageHero
        title="Emergency Fund Calculator Philippines"
        description="Estimate how much you may want to set aside for emergencies based on your monthly expenses and target number of months."
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Coming Soon */}
        <div className="mx-auto max-w-lg text-center">
          <div className="flex flex-col items-center gap-4 py-12">
            <div className="flex size-14 items-center justify-center rounded-full bg-gray-50 text-brand">
              <Clock className="size-6" />
            </div>
            <h2 className="text-[20px] font-semibold leading-[26px] text-gray-500">
              Coming soon
            </h2>
            <p className="max-w-sm text-[16px] leading-[22px] text-gray-400">
              This calculator is currently being built. In the meantime, you can
              browse{" "}
              <Link
                href="/rates/savings-rates/best-savings-interest-rates-philippines"
                className="text-brand hover:underline"
              >
                savings rate tables
              </Link>{" "}
              to compare where to keep your emergency fund.
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-16 flex gap-3 rounded-lg border border-gray-200 bg-white p-6">
          <Info className="size-5 shrink-0 mt-0.5 text-gray-300" />
          <p className="text-[16px] leading-[22px] text-gray-400">
            An emergency fund typically covers three to six months of essential
            expenses. The right amount depends on your income stability, monthly
            obligations, and personal risk tolerance.
          </p>
        </div>

        {/* Related Pages */}
        <section className="mt-16">
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Related Savings and Rates Pages
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {relatedPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.title}
                  href={page.href}
                  className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-brand">
                    <Icon className="size-4" />
                  </div>
                  <span className="flex-1 text-[16px] font-semibold text-gray-500 group-hover:text-brand">
                    {page.title}
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
