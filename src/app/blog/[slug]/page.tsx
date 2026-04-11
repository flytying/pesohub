import Link from "next/link";
import { ArrowRight, TriangleAlert } from "lucide-react";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateArticleSchema,
} from "@/lib/schema-markup";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { BlogContent } from "@/components/blog/blog-content";
import { blogPosts } from "@/data/blog";
import type { BlogPostData } from "@/types/content";

// Ensure fully static generation
export const dynamicParams = false;

// ---------------------------------------------------------------------------
// Post data loader – maps slugs to dynamic imports
// ---------------------------------------------------------------------------

const postModules: Record<string, () => Promise<{ default: BlogPostData }>> = {
  // Each blog data file should export its BlogPostData as the default export.
  // New entries are added here by the blog agent or manually.
  "best-savings-account-philippines-2026": () =>
    import("@/data/blog/best-savings-account-philippines-2026"),
};

// ---------------------------------------------------------------------------
// Static params for static export
// ---------------------------------------------------------------------------

export function generateStaticParams() {
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

      <PageHero
        title={post.title}
        description={post.excerpt}
        badge={post.updatedAt}
        breadcrumbs={breadcrumbs}
        variant="dark"
        image={post.image}
      />

      <article className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Direct Answer Box */}
        {post.directAnswer && (
          <div className="rounded-xl border border-brand/20 bg-brand/5 p-6">
            <p className="text-[14px] font-bold uppercase tracking-[0.1em] text-brand">
              Quick Answer
            </p>
            <p className="mt-2 text-[16px] leading-[22px] text-gray-500">
              {post.directAnswer}
            </p>
          </div>
        )}

        {/* Article Content */}
        <BlogContent sections={post.sections} />

        {/* Disclaimer */}
        {post.disclaimer && (
          <div className="mt-16 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <p className="text-[16px] leading-[22px] text-gray-400">
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
            <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
              Related Pages
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {post.relatedSlugs.map((relSlug) => (
                <Link
                  key={relSlug}
                  href={`/${relSlug}`}
                  className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                >
                  <span className="flex-1 text-[16px] font-semibold text-gray-500 group-hover:text-brand">
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
