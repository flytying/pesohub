"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { search, type SearchResult } from "@/lib/search";

const CATEGORY_LABELS: Record<string, string> = {
  calculator: "Calculators",
  rates: "Rates",
  guide: "Guides",
  government: "Government",
  general: "General",
};

const CATEGORY_ORDER = ["calculator", "rates", "guide", "government", "general"];

function groupByCategory(results: SearchResult[]) {
  const groups: Record<string, SearchResult[]> = {};
  for (const result of results) {
    const cat = result.category;
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(result);
  }
  return CATEGORY_ORDER
    .filter((cat) => groups[cat]?.length)
    .map((cat) => ({ category: cat, label: CATEGORY_LABELS[cat], items: groups[cat] }));
}

export function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  // Sync from URL changes (e.g. browser back/forward)
  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  const results = query.trim().length >= 2 ? search(query.trim()) : [];
  const groups = groupByCategory(results);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div>
      {/* Search input */}
      <form onSubmit={handleSubmit} className="relative mb-8">
        <Search className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-gray-300" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for calculators, rates, guides..."
          className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-[16px] leading-[22px] text-gray-500 outline-none transition-colors placeholder:text-gray-300 focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20"
          autoFocus
        />
      </form>

      {/* Results */}
      {query.trim().length >= 2 && (
        <>
          <p className="mb-6 text-[14px] text-gray-300">
            {results.length === 0
              ? `No results found for "${query.trim()}"`
              : `Found ${results.length} result${results.length !== 1 ? "s" : ""} for "${query.trim()}"`}
          </p>

          {results.length === 0 && (
            <div className="rounded-xl border border-gray-200 bg-gray-200/20 px-6 py-8 text-center">
              <p className="mb-3 text-[16px] font-semibold text-gray-500">
                Try different keywords
              </p>
              <p className="text-[16px] leading-[22px] text-gray-400">
                Search for topics like &ldquo;car loan&rdquo;, &ldquo;SSS pension&rdquo;,
                &ldquo;exchange rate&rdquo;, or &ldquo;withholding tax&rdquo;.
              </p>
            </div>
          )}

          {groups.map((group) => (
            <section key={group.category} className="mb-8">
              <h2 className="mb-3 text-[20px] font-semibold leading-[26px] text-gray-500">
                {group.label}
              </h2>
              <div className="space-y-3">
                {group.items.map((result) => (
                  <Link
                    key={result.href}
                    href={result.href}
                    className="block rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                  >
                    <h3 className="text-[16px] font-semibold text-gray-500">
                      {result.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[14px] text-gray-400">
                      {result.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  );
}
