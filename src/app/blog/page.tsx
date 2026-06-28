import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  BookOpen,
  TrendingUp,
  Landmark,
  Clock,
} from "lucide-react";
import { FaqSection } from "@/components/shared/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/schema-markup";
import { blogPosts } from "@/data/blog";
import { loadPostImage } from "@/data/blog/post-modules";
import { BlogCard } from "@/components/blog/blog-card";

export const metadata = generatePageMetadata({
  title: "Philippine Finance Blog: Savings, Tax, Loans & More",
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

const [featured, ...restPosts] = sortedPosts;

export default async function BlogPage() {
  const featuredImage = featured ? await loadPostImage(featured.slug) : null;

  return (
    <div className="mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)] py-[clamp(20px,3vw,36px)]">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Heading */}
      <div className="mb-6">
        <div className="mb-[10px] text-[15px] font-bold uppercase tracking-[.06em] text-brand">
          Blog
        </div>
        <h1 className="font-display text-[clamp(28px,3.4vw,40px)] font-semibold tracking-[-.02em] text-[#0E1525]">
          PesoHub Blog
        </h1>
        <p className="mt-[10px] max-w-[72ch] text-[17px] leading-[1.55] text-[#5A6478]">
          Practical articles about savings, tax, loans, and personal finance in
          the Philippines — each one researched, clearly written, and linked to
          the tools that help you act on what you read.
        </p>
      </div>

      {sortedPosts.length === 0 ? (
        <div className="rounded-[18px] border border-[#E7EBF3] bg-white p-12 text-center">
          <h2 className="font-display text-[20px] font-semibold text-[#0E1525]">
            Articles coming soon
          </h2>
          <p className="mt-2 text-[15px] text-[#5A6478]">
            We are preparing our first batch of articles. In the meantime,
            explore our calculators, rate pages, and guides.
          </p>
        </div>
      ) : (
        <>
          {/* Featured */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group mb-[38px] grid overflow-hidden rounded-[20px] border border-[#E7EBF3] bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)] transition-all duration-150 hover:border-[#C3D0F2] hover:shadow-[0_18px_40px_-22px_rgba(21,53,199,.4)] lg:grid-cols-2"
            >
              <div className="relative min-h-[220px] overflow-hidden">
                {featuredImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featuredImage.src}
                    alt={featuredImage.alt}
                    className="absolute inset-0 size-full object-cover"
                  />
                ) : (
                  <>
                    <div aria-hidden className="gradient-hero size-full" />
                    <div
                      aria-hidden
                      className="absolute -right-8 -top-10 size-[180px] rounded-full bg-[radial-gradient(circle,rgba(43,229,223,.4),transparent_70%)]"
                    />
                  </>
                )}
                <span className="absolute left-[18px] top-[18px] rounded-[6px] bg-white px-[10px] py-1 text-[11px] font-bold uppercase tracking-[.08em] text-brand shadow-[0_2px_8px_rgba(16,24,40,.12)]">
                  Featured
                </span>
              </div>
              <div className="flex flex-col justify-center p-7">
                <div className="mb-3 flex items-center gap-2 text-[12px] text-[#8A93A6]">
                  <Clock className="size-3" />
                  {featured.readTime} min read
                </div>
                <h2 className="font-display text-[24px] font-semibold leading-[1.25] text-[#0E1525] group-hover:text-brand">
                  {featured.title}
                </h2>
                <p className="mt-3 text-[15px] leading-[1.55] text-[#5A6478]">
                  {featured.excerpt}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-[15px] font-bold text-brand">
                  Read article
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </Link>
          )}

          {/* Latest articles */}
          <div className="mb-[18px]">
            <h2 className="font-display text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-.02em] text-[#0E1525]">
              Latest articles
            </h2>
            <p className="mt-[5px] text-[15px] leading-[1.5] text-[#6B7488]">
              Money explainers and how-tos, newest first.
            </p>
          </div>
          <div className="mb-[38px] grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {restPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </>
      )}

      {/* FAQ */}
      <div className="mb-[38px]">
        <FaqSection faqs={faqs} />
      </div>

      {/* Related */}
      <section>
        <h2 className="mb-4 font-display text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-.02em] text-[#0E1525]">
          Explore more
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relatedSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.title}
                href={section.href}
                className="group flex items-center gap-3 rounded-[14px] border border-[#E7EBF3] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,.04)] transition-colors hover:border-[#C3D0F2] hover:bg-[#FBFCFE]"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] bg-[#EAF0FF] text-brand">
                  <Icon className="size-[18px]" />
                </span>
                <span className="text-[15px] font-bold text-[#0E1525] group-hover:text-brand">
                  {section.title}
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
