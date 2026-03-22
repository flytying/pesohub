import { Suspense } from "react";
import { generatePageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { SearchResults } from "./search-results";

export const metadata = generatePageMetadata({
  title: "Search",
  description:
    "Search PesoHub for Philippine financial calculators, rates, guides, and government reference tables.",
  slug: "search",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Search" },
];

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <PageHero
        title="Search"
        description="Find calculators, rates, guides, and government reference tables."
        breadcrumbs={breadcrumbs}
      />
      <Suspense
        fallback={
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-xl bg-muted"
              />
            ))}
          </div>
        }
      >
        <SearchResults />
      </Suspense>
    </div>
  );
}
