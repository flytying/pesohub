"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { search } from "@/lib/search";

const CATEGORY_LABELS: Record<string, string> = {
  calculator: "Calculator",
  rates: "Rates",
  guide: "Guide",
  government: "Government",
  general: "General",
};

export function Header({ onBurger }: { onBurger: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 200);
  const results =
    debouncedQuery.length >= 2 ? search(debouncedQuery).slice(0, 5) : [];

  const navigateToResults = useCallback(() => {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setShowDropdown(false);
  }, [query, router]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-20 flex items-center gap-[14px] border-b border-[#E7EBF3] bg-[rgba(244,246,251,.88)] px-4 py-3 backdrop-blur-[10px] sm:px-6 lg:px-8">
      {/* Burger — mobile only */}
      <button
        type="button"
        onClick={onBurger}
        aria-label="Open menu"
        className="flex size-10 shrink-0 items-center justify-center rounded-[11px] border border-[#E7EBF3] bg-white text-gray-400 transition-colors hover:text-brand lg:hidden"
      >
        <Menu className="size-5" />
      </button>

      {/* Search */}
      <div ref={containerRef} className="relative w-full max-w-[440px]">
        <Search className="pointer-events-none absolute left-[14px] top-1/2 size-[18px] -translate-y-1/2 text-gray-300" />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") navigateToResults();
          }}
          placeholder="Search calculators, rates, guides…"
          aria-label="Search PesoHub"
          role="combobox"
          aria-expanded={showDropdown && results.length > 0}
          aria-controls="header-search-results"
          aria-autocomplete="list"
          className="h-[44px] w-full rounded-[12px] border border-[#E7EBF3] bg-white pl-[42px] pr-3 text-base text-[#0E1525] outline-none transition-shadow placeholder:text-gray-300 focus-visible:border-brand focus-visible:shadow-[0_0_0_3px_rgba(21,53,199,.12)]"
        />

        {showDropdown && results.length > 0 && (
          <div
            id="header-search-results"
            role="listbox"
            aria-label="Search results"
            aria-live="polite"
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_16px_34px_-18px_rgba(35,71,217,.34)]"
          >
            <ul className="py-1">
              {results.map((result) => (
                <li key={result.href} role="option" aria-selected={false}>
                  <Link
                    href={result.href}
                    onClick={() => {
                      setShowDropdown(false);
                      setQuery("");
                    }}
                    className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-gray-50"
                  >
                    <span className="min-w-0 truncate font-medium text-gray-500">
                      {result.title}
                    </span>
                    <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-400">
                      {CATEGORY_LABELS[result.category]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {query.trim() && (
              <div className="border-t border-gray-200 px-4 py-2">
                <button
                  type="button"
                  onClick={navigateToResults}
                  className="w-full text-left text-sm text-brand hover:underline"
                >
                  View all results for &ldquo;{query.trim()}&rdquo;
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
