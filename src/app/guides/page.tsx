import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  FileText,
  Landmark,
  Shield,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/schema-markup";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { buttonVariants } from "@/lib/button-variants";

export const metadata = generatePageMetadata({
  title: "Finance Guides Philippines | Taxes, SSS, Salary & Deductions",
  description:
    "Plain-language guides to help you understand confusing money topics in the Philippines, from taxes and salary deductions to SSS contributions and government reference tables.",
  slug: "guides",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Guides" },
];

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const startPaths = [
  {
    icon: FileText,
    title: "I want to understand my payslip",
    description:
      "Learn how salary deductions work, what withholding tax means, and why take-home pay is lower than gross pay.",
    cta: "Explore salary and tax guides",
    href: "#all-guides",
  },
  {
    icon: Landmark,
    title: "I want to understand withholding tax",
    description:
      "See what withholding tax is, how it is usually applied to salary, and what to check if your payslip feels unclear.",
    cta: "Read tax guide",
    href: "/guides/tax/how-withholding-tax-works-philippines",
  },
  {
    icon: Shield,
    title: "I want to understand SSS contributions",
    description:
      "Learn how SSS contributions work, who pays what, and how contribution schedules affect the amount.",
    cta: "Read SSS guide",
    href: "/guides/sss/how-to-compute-sss-pension",
  },
  {
    icon: BookOpen,
    title: "I want to understand government deductions and tables",
    description:
      "See what common payroll and contribution references mean before checking official figures.",
    cta: "Explore reference-related guides",
    href: "/government",
  },
];

const featuredGuides = [
  {
    title: "How Withholding Tax Works in the Philippines",
    description:
      "For employees who want to understand what withholding tax is, how it affects salary, and what to check on a payslip.",
    learn:
      "What withholding tax means, how it is usually applied, and where confusion often comes from.",
    href: "/guides/tax/how-withholding-tax-works-philippines",
  },
  {
    title: "SSS Contributions Explained in Plain Language",
    description:
      "For employees, self-employed members, and voluntary members who want a clearer view of how SSS contributions work.",
    learn:
      "Who contributes, what affects the amount, and how to check the right schedule or record.",
    href: "/guides/sss/how-to-compute-sss-pension",
  },
];

const allGuides = [
  {
    title: "Withholding Tax Guide Philippines",
    description:
      "Understand what withholding tax is, how it is usually computed from salary, and how to check whether your payslip looks reasonable.",
    type: "Explainer",
    bestFor: "Employees trying to understand salary tax",
    href: "/guides/tax/how-withholding-tax-works-philippines",
  },
  {
    title: "Take-Home Pay Guide Philippines",
    description:
      "Understand why take-home pay differs from gross salary and how common deductions affect net pay.",
    type: "Explainer",
    bestFor: "Employees reviewing salary deductions",
    href: "/guides/tax/take-home-pay-guide-philippines",
  },
  {
    title: "SSS Contribution Guide Philippines",
    description:
      "Understand how SSS contributions work, how much may apply to your salary or member type, and how to check your records or contribution schedule.",
    type: "Explainer",
    bestFor:
      "Employees, self-employed members, voluntary members, and OFWs",
    href: "/guides/sss/how-to-compute-sss-pension",
  },
  {
    title: "PhilHealth Contribution Guide Philippines",
    description:
      "Understand how PhilHealth deductions work and where they fit into payroll or contribution estimates.",
    type: "Explainer",
    bestFor: "Employees and payroll learners",
    href: "/guides/government/philhealth-contribution-guide",
  },
  {
    title: "Pag-IBIG Deduction Guide Philippines",
    description:
      "Understand what Pag-IBIG deductions are and how they may appear in salary-related calculations.",
    type: "Explainer",
    bestFor: "Employees and first-time payroll learners",
    href: "/guides/government/pag-ibig-deduction-guide",
  },
];

const futureGuides: typeof allGuides = [];

const quickPaths = [
  {
    title: "Withholding Tax Calculator",
    description: "Estimate salary tax based on salary and tax assumptions.",
    cta: "Use calculator",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Take-Home Pay Calculator",
    description: "Estimate net pay after common deductions.",
    cta: "Use calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "SSS Contribution Calculator",
    description: "Estimate SSS contributions based on salary and member type.",
    cta: "Use calculator",
    href: "/calculators/sss/sss-contribution-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Reference Pages",
    description:
      "Check salary tax tables, contribution schedules, or supporting official references.",
    cta: "View references",
    href: "/government",
    icon: Landmark,
  },
];

const whyEasier = [
  {
    title: "Who the guide is for",
    description:
      "Each guide should quickly tell users whether it matches their situation.",
  },
  {
    title: "Plain-language summary first",
    description:
      "The explanation should start simply before moving into detail.",
  },
  {
    title: "Real examples early",
    description:
      "Examples help users connect the topic to real salary, tax, or contribution scenarios.",
  },
  {
    title: "Clear next step",
    description:
      "Every guide should point to the matching calculator, reference page, or next guide.",
  },
];

const faqs = [
  {
    question: "What are these guides for?",
    answer:
      "These guides are meant to help you understand confusing financial topics in plain language before you try to estimate, compare, or verify details elsewhere.",
  },
  {
    question: "Are these guides just articles?",
    answer:
      "They are more useful than a typical article list. Each guide is meant to help you move from confusion to understanding, then to the next useful step such as a calculator or reference page.",
  },
  {
    question:
      "How do I know whether I need a guide, calculator, or reference page?",
    answer:
      "Use a guide when you want an explanation. Use a calculator when you want an estimate. Use a reference page when you need to check a table, schedule, or official basis.",
  },
  {
    question: "Are these guides enough to confirm official figures?",
    answer:
      "No. Guides help explain the topic, but rules and official tables can change. Final figures should still be confirmed with the relevant agency, employer, provider, or official source.",
  },
  {
    question: "Will more guides be added?",
    answer:
      "Yes. This section can grow to cover take-home pay, PhilHealth, Pag-IBIG, payslip reading, savings topics, and other common money questions in the Philippines.",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Hero */}
      <PageHero
        title="Finance Guides Philippines"
        description="Plain-language guides to help you understand confusing money topics in the Philippines, from taxes and salary deductions to SSS contributions and government reference tables."
        breadcrumbs={breadcrumbs}
      />

      {/* Start with what you're trying to understand */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Start with what you&rsquo;re trying to understand
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Choose the path that best matches the question or problem you have
          right now.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {startPaths.map((path) => {
            const Icon = path.icon;
            return (
              <Link key={path.title} href={path.href} className="group block">
                <Card className="h-full transition-shadow duration-200 hover:shadow-md">
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="mt-3 text-sm">{path.title}</CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      {path.description}
                    </CardDescription>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
                      {path.cta}
                      <ArrowRight className="size-3" />
                    </span>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* What guides help you do */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          What guides help you do
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Guides are here to help you understand a confusing topic before you try
          to calculate, compare, or verify anything.
        </p>
        <div className="mt-3 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
          Use a guide when you want an explanation in plain language. Use a
          calculator when you want an estimate. Use a reference page when you
          want to check a table, schedule, or official basis.
        </div>
      </section>

      {/* Featured guides */}
      <section className="mb-12">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Featured guides
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Start with these plain-language explainers for common money questions
          in the Philippines.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {featuredGuides.map((guide) => (
            <Link key={guide.title} href={guide.href} className="group block">
              <Card className="h-full transition-shadow duration-200 hover:shadow-md">
                <CardHeader>
                  <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                    <BookOpen className="size-5" />
                  </div>
                  <CardTitle className="mt-3 text-base">
                    {guide.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {guide.description}
                  </CardDescription>
                  <p className="mt-2 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">
                      What you&rsquo;ll learn:
                    </span>{" "}
                    {guide.learn}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read guide
                    <ArrowRight className="size-3.5" />
                  </span>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* All guides */}
      <section id="all-guides" className="mb-12 scroll-mt-20">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          All guides
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Browse explainers and walkthroughs designed to make everyday financial
          topics easier to understand.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {allGuides.map((guide) => (
            <Link key={guide.title} href={guide.href} className="group block">
              <Card className="h-full transition-shadow duration-200 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-base">{guide.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {guide.description}
                  </CardDescription>
                  <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">Type:</span>{" "}
                      {guide.type}
                    </p>
                    <p>
                      <span className="font-medium text-foreground">
                        Best for:
                      </span>{" "}
                      {guide.bestFor}
                    </p>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read guide
                    <ArrowRight className="size-3.5" />
                  </span>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {/* Future guides (coming soon) */}
        {futureGuides.length > 0 && (
          <>
            <h3 className="mb-4 mt-8 text-sm font-semibold text-foreground">
              Coming soon
            </h3>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {futureGuides.map((guide) => (
                <Card key={guide.title} className="h-full opacity-60">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{guide.title}</CardTitle>
                      <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                        Coming soon
                      </span>
                    </div>
                    <CardDescription className="text-xs leading-relaxed">
                      {guide.description}
                    </CardDescription>
                    <div className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                      <p>
                        <span className="font-medium text-foreground">Type:</span>{" "}
                        {guide.type}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">
                          Best for:
                        </span>{" "}
                        {guide.bestFor}
                      </p>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Quick paths to tools */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Need an estimate instead?
        </h2>
        <p className="mt-3 mb-6 text-sm text-muted-foreground">
          If you already understand the topic and want a number, these tools may
          help more than a guide.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickPaths.map((path) => {
            const Icon = path.icon;
            return (
              <Link key={path.title} href={path.href} className="group block">
                <Card className="h-full transition-shadow duration-200 hover:shadow-md">
                  <CardHeader>
                    <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon className="size-4" />
                    </div>
                    <CardTitle className="mt-2 text-sm">{path.title}</CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      {path.description}
                    </CardDescription>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
                      {path.cta}
                      <ArrowRight className="size-3" />
                    </span>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Why these guides are easier to follow */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Why these guides are easier to follow
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyEasier.map((item) => (
            <div key={item.title}>
              <p className="text-sm font-medium text-foreground">
                {item.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <FaqSection faqs={faqs} />

      {/* Final CTA section */}
      <section className="mb-4 rounded-lg border border-border bg-muted/30 p-8 text-center sm:p-10">
        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
          Understand the topic first, then take the next step
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Use PesoHub guides to make taxes, salary deductions, SSS
          contributions, and other everyday money topics easier to understand.
          Then move to the right calculator or reference page when you&rsquo;re
          ready.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="#all-guides"
            className={buttonVariants({ className: "font-medium" })}
          >
            Browse all guides
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/calculators"
            className={buttonVariants({
              variant: "outline",
              className: "font-medium",
            })}
          >
            See related calculators
          </Link>
        </div>
        <p className="mx-auto mt-6 max-w-lg text-xs text-muted-foreground">
          Educational use only. These guides are for general understanding and
          plain-language learning. Always confirm final figures, tables, and
          official details with the relevant source.
        </p>
      </section>
    </div>
  );
}
