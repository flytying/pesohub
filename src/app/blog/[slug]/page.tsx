import Link from "next/link";
import { ArrowRight, TriangleAlert, Info } from "lucide-react";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateArticleSchema,
} from "@/lib/schema-markup";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/shared/faq-section";
import { BlogContent } from "@/components/blog/blog-content";
import { formatDate } from "@/lib/formatters";
import { blogPosts } from "@/data/blog";
import { postModules } from "@/data/blog/post-modules";

// Ensure fully static generation
export const dynamicParams = false;

// Category pill styling — mirrors the blog hub cards.
const CATEGORY_LABELS: Record<string, string> = {
  savings: "Savings",
  investing: "Investing",
  tax: "Tax",
  government: "Government",
  banking: "Banking",
  budgeting: "Budgeting",
  insurance: "Insurance",
  general: "General",
};

const CATEGORY_TONE: Record<string, { bg: string; ink: string }> = {
  savings: { bg: "#DEF5F0", ink: "#0B7E6E" },
  investing: { bg: "#EDE8FC", ink: "#6D4DE0" },
  tax: { bg: "#FBF0DC", ink: "#B7791F" },
  government: { bg: "#EAF0FF", ink: "#1535C7" },
  banking: { bg: "#EAF0FF", ink: "#1535C7" },
  budgeting: { bg: "#DEF5F0", ink: "#0B7E6E" },
  insurance: { bg: "#FBE6E7", ink: "#C2484D" },
  general: { bg: "#EEF1F7", ink: "#5A6478" },
};

// ---------------------------------------------------------------------------
// Static params for static export
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  // Guardrail: every registry slug must have a postModules loader, or its
  // route builds but renders notFound() at runtime (silent 404). Fail the
  // build loudly instead. See src/data/blog/post-modules.ts.
  const missing = blogPosts
    .filter((post) => !postModules[post.slug])
    .map((post) => post.slug);
  if (missing.length > 0) {
    throw new Error(
      `Blog post(s) in index.ts have no postModules entry (would 404): ` +
        `${missing.join(", ")}. Add them to src/data/blog/post-modules.ts.`,
    );
  }
  return blogPosts.map((post) => ({ slug: post.slug }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loader = postModules[slug];
  if (!loader) return {};

  const mod = await loader();
  const post = mod.default;

  return generatePageMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    slug: `blog/${post.slug}`,
    updatedAt: post.updatedAt,
  });
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loader = postModules[slug];
  if (!loader) notFound();

  const mod = await loader();
  const post = mod.default;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ];

  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: post.metaTitle,
          description: post.metaDescription,
          updatedAt: post.updatedAt,
          slug: `blog/${post.slug}`,
        })}
      />

      {/* Header */}
      <div className="mx-auto max-w-[920px] px-4 pb-2 pt-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-[14px]">
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <li key={index} className="flex items-center gap-2">
                  {index > 0 && <span className="text-[#C4CCDB]">/</span>}
                  {isLast || !item.href ? (
                    <span
                      aria-current={isLast ? "page" : undefined}
                      className="text-[#5A6478]"
                    >
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="font-bold text-brand transition-colors hover:text-brand-light"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <h1 className="font-display text-[clamp(30px,4vw,44px)] font-semibold leading-[1.12] tracking-[-.02em] text-[#0E1525]">
          {post.title}
        </h1>
        <p className="mt-[14px] max-w-[74ch] text-[18px] leading-[1.6] text-[#475069]">
          {post.excerpt}
        </p>

        {/* Meta row: category · read time · updated — all badge style */}
        <div className="mt-[18px] flex flex-wrap items-center gap-2">
          <span
            className="rounded-[8px] px-[10px] py-[5px] text-[11px] font-bold uppercase tracking-[.06em]"
            style={{
              background: (CATEGORY_TONE[post.category] ?? CATEGORY_TONE.general)
                .bg,
              color: (CATEGORY_TONE[post.category] ?? CATEGORY_TONE.general).ink,
            }}
          >
            {CATEGORY_LABELS[post.category] ?? post.category}
          </span>
          <span className="rounded-[8px] bg-[#EEF1F7] px-[10px] py-[5px] text-[11px] font-bold uppercase tracking-[.06em] text-[#5A6478]">
            {post.readTime} min read
          </span>
          <span className="rounded-[8px] bg-[#EEF1F7] px-[10px] py-[5px] text-[11px] font-bold uppercase tracking-[.06em] text-[#5A6478]">
            Updated {formatDate(post.updatedAt)}
          </span>
        </div>
      </div>

      {/* Hero image */}
      <div className="mx-auto max-w-[920px] px-4 pt-4 sm:px-6 lg:px-8">
        <div className="relative h-[clamp(200px,34vw,320px)] overflow-hidden rounded-[18px]">
          {post.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.image.src}
              alt={post.image.alt}
              className="size-full object-cover"
            />
          ) : (
            <div aria-hidden className="gradient-hero size-full" />
          )}
        </div>
      </div>

      <article className="mx-auto max-w-[920px] px-4 py-10 sm:px-6 lg:px-8">
        {/* Quick Answer — its own card */}
        {post.directAnswer && (
          <div className="flex items-start gap-[14px] rounded-[20px] border border-[#D3DEFA] bg-[#EAF0FF] p-[clamp(20px,2.5vw,30px)]">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-[#D3DEFA]">
              <Info className="size-5 text-brand" />
            </span>
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.06em] text-brand">
                Quick Answer
              </p>
              <p className="mt-[5px] text-[15.5px] leading-[1.6] text-[#344054]">
                {post.directAnswer}
              </p>
            </div>
          </div>
        )}

        {/* Article content — one card per heading section */}
        <div className="mt-[14px]">
          <BlogContent sections={post.sections} />
        </div>

        {/* Disclaimer */}
        {post.disclaimer && (
          <div className="mt-[14px] flex gap-3 rounded-[20px] border border-amber-300 bg-amber-50 p-[clamp(20px,2.5vw,30px)]">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <p className="text-[16px] leading-[1.6] text-[#475069]">
              This article is for educational and informational purposes only.
              It should not be considered professional financial advice. Rates,
              rules, and product details may change. Always verify with the
              relevant institution and consult a qualified financial advisor
              before making important financial decisions.
            </p>
          </div>
        )}

        {/* FAQ */}
        {post.faqs.length > 0 && (
          <div className="mt-16">
            <FaqSection faqs={post.faqs} />
          </div>
        )}

        {/* Related Content */}
        {post.relatedSlugs.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
              Related Pages
            </h2>
            <div
              className={`grid gap-4 ${
                post.relatedSlugs.length >= 3
                  ? "sm:grid-cols-2 lg:grid-cols-3"
                  : post.relatedSlugs.length === 2
                    ? "sm:grid-cols-2"
                    : "grid-cols-1"
              }`}
            >
              {post.relatedSlugs.map((relSlug) => (
                <Link
                  key={relSlug}
                  href={`/${relSlug}`}
                  className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                >
                  <span className="flex-1 text-[16px] font-semibold text-[#0E1525] group-hover:text-brand">
                    {relSlug
                      .split("/")
                      .pop()
                      ?.replace(/-/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-gray-300" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
