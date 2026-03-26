import { generatePageMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/config/site";
import { PageHero } from "@/components/shared/page-hero";
import { Calculator, TrendingUp, BookOpen, Info, TriangleAlert } from "lucide-react";

export const metadata = generatePageMetadata({
  title: `About ${SITE_NAME}`,
  description: `Learn about ${SITE_NAME}, a free Philippine finance utility website offering calculators, rate comparisons, and practical money guides for Filipinos.`,
  slug: "about",
});

const offerings = [
  {
    icon: Calculator,
    title: "Calculators",
    description:
      "Free tools for loans, tax, savings, and retirement computations specific to the Philippines.",
  },
  {
    icon: TrendingUp,
    title: "Rate Pages",
    description:
      "Current exchange rates and savings account interest rate comparisons from Philippine banks.",
  },
  {
    icon: BookOpen,
    title: "Guides",
    description:
      "Plain-language explanations of tax rules, SSS benefits, and other financial topics that affect Filipino workers and families.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={`About ${SITE_NAME}`}
        description={`${SITE_NAME} is a free finance utility website built for Filipinos who need quick, practical answers to everyday money questions — from loan payments and exchange rates to tax deductions and government contributions.`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Our Mission */}
        <section>
          <div>
            <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
              Our Mission
            </h2>
            <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
              We believe financial information should be clear, accessible, and
              practical. Too many finance websites are cluttered with ads, buried
              in long articles, or hard to use on mobile. {SITE_NAME} puts the
              calculator, table, or answer first — then provides the explanation.
            </p>
            <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
              Every tool and page is designed to help you move faster — whether you
              are comparing savings rates before opening an account, estimating your
              take-home pay, or verifying SSS contribution amounts from a payslip.
            </p>
          </div>
        </section>

      </div>

      {/* What We Offer */}
      <section className="bg-surface-secondary py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
                What We Offer
              </h2>
              <p className="mt-4 text-[20px] leading-[26px] text-gray-400">
                Tools, rates, and guides designed to help you make smarter
                financial decisions in the Philippines.
              </p>
            </div>
            <div className="space-y-5">
              {offerings.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-xl bg-white p-6 shadow-none transition-shadow duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                  >
                    <div className="flex size-16 items-center justify-center rounded-full bg-accent-cyan text-white">
                      <Icon className="size-7" />
                    </div>
                    <h3 className="mt-4 text-[20px] font-semibold leading-[26px] text-gray-500">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Disclaimer */}
        <section>
          <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
            Important Disclaimer
          </h2>
          <div className="mt-6 flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-6">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <p className="text-[16px] leading-[22px] text-gray-400">
              {SITE_NAME} is an independent website and is not affiliated with any
              bank, government agency, or financial institution. The information
              provided is for educational and informational purposes only. It should
              not be considered professional financial advice. Always consult with a
              qualified financial advisor before making important financial decisions.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
