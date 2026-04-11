import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  BookOpen,
  TrendingUp,
  Landmark,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/schema-markup";
import { blogPosts } from "@/data/blog";
import { BlogCard } from "@/components/blog/blog-card";

export const metadata = generatePageMetadata({
  title: "Philippine Finance Blog: Savings, Tax, Loans & More | PesoHub",
  description:
    "Read practical articles about savings accounts, withholding tax, loans, and personal finance in the Philippines — written to help you make smarter money decisions.",
  slug: "blog",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Blog" },
];

const faqs = [
  {
    question: "What topics does the PesoHub blog cover?",
    answer:
      "The blog covers practical Philippine personal finance topics including savings accounts, withholding tax, loans, government contributions (SSS, PhilHealth, Pag-IBIG), digital banking, and financial planning tips — all written for a Filipino audience.",
  },
  {
    question: "How often are new articles published?",
    answer:
      "New articles are published weekly. Each post is researched, reviewed for accuracy, and linked to relevant PesoHub calculators and reference pages so you can take action on what you learn.",
  },
  {
    question: "Are blog articles financial advice?",
    answer:
      "No. Blog articles are for educational and informational purposes only. They are not financial advice. Always consult a qualified financial advisor before making important financial decisions.",
  },
  {
    question: "How is the blog different from PesoHub guides?",
    answer:
      "Guides explain specific topics in depth (like how withholding tax is computed). Blog posts cover broader questions, comparisons, and timely topics (like which savings accounts offer the best rates this year). Both link to each other and to relevant calculators.",
  },
];

const relatedSections = [
  { title: "Calculators", href: "/calculators", icon: Calculator },
  { title: "Guides", href: "/guides", icon: BookOpen },
  { title: "Rates", href: "/rates", icon: TrendingUp },
  { title: "Government", href: "/government", icon: Landmark },
];

// Sort by publishedAt descending
const sortedPosts = [...blogPosts].sort(
  (a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

export default function BlogPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <PageHero
        title="PesoHub Blog"
        description="Practical articles about savings, tax, loans, and personal finance in the Philippines — researched, reviewed, and linked to the tools that help you act on what you learn."
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      {/* Intro */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-[16px] leading-[22px] text-gray-400">
            Every article on the PesoHub blog is built around a question that
            Filipino workers, savers, and borrowers actually search for. We
            research the topic, explain it in plain language, and link to the
            calculators, rate tables, and reference pages that help you take the
            next step.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      {sortedPosts.length > 0 ? (
        <section className="bg-surface-secondary py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-[32px] font-medium leading-[48px] text-gray-500">
              Latest Articles
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sortedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} hasBg />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
              <h2 className="text-[20px] font-semibold text-gray-500">
                Articles coming soon
              </h2>
              <p className="mt-2 text-[16px] text-gray-400">
                We are preparing our first batch of articles. In the meantime,
                explore our calculators, rate pages, and guides.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* FAQ + Related */}
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <FaqSection faqs={faqs} />

        <section className="mt-16">
          <h2 className="mb-8 text-[32px] font-medium leading-[48px] text-gray-500">
            Explore More
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedSections.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.title}
                  href={section.href}
                  className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-brand">
                    <Icon className="size-4" />
                  </div>
                  <span className="text-[16px] font-semibold text-gray-500 group-hover:text-brand">
                    {section.title}
                  </span>
                  <ArrowRight className="ml-auto size-4 text-gray-300 transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
