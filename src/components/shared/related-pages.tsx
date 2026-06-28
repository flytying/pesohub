import { getRelatedPages } from "@/lib/internal-links";
import { ToolCard } from "@/components/shared/tool-card";

interface RelatedPagesProps {
  currentSlug: string;
}

export function RelatedPages({ currentSlug }: RelatedPagesProps) {
  const pages = getRelatedPages(currentSlug);

  if (pages.length === 0) {
    return null;
  }

  return (
    <section className="pt-16 pb-8">
      <h2 className="mb-6 text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
        Related Tools &amp; Guides
      </h2>
      <div
        className={`grid gap-5 ${pages.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}
      >
        {pages.map((page) => (
          <ToolCard
            key={page.slug}
            title={page.title}
            description={page.description}
            href={page.slug}
            category={page.category}
          />
        ))}
      </div>
    </section>
  );
}
