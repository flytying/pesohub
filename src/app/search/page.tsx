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
    <>
      <PageHero
        title="Search"
        description="Find calculators, rates, guides, and government reference tables."
        breadcrumbs={breadcrumbs}
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-xl bg-gray-200/20"
                />
              ))}
            </div>
          }
        >
          <SearchResults />
        </Suspense>
      </div>
    </>
  );
}
