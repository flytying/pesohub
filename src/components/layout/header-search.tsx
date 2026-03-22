"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { search, type SearchResult } from "@/lib/search";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<string, string> = {
  calculator: "Calculator",
  rates: "Rates",
  guide: "Guide",
  government: "Government",
  general: "General",
};

export function HeaderSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 200);
  const results = debouncedQuery.length >= 2 ? search(debouncedQuery).slice(0, 5) : [];

  const openSearch = useCallback(() => {
    setOpen(true);
    setShowDropdown(true);
    // Focus after the input renders
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const closeSearch = useCallback(() => {
    setOpen(false);
    setQuery("");
    setShowDropdown(false);
  }, []);

  const navigateToResults = useCallback(() => {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    closeSearch();
  }, [query, router, closeSearch]);

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) {
          closeSearch();
        } else {
          openSearch();
        }
      }
      if (e.key === "Escape" && open) {
        closeSearch();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, openSearch, closeSearch]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeSearch();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, closeSearch]);

  return (
    <div ref={containerRef} className="relative flex items-center">
      {/* Search icon button */}
      {!open && (
        <button
          type="button"
          onClick={openSearch}
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Search (⌘K)"
        >
          <Search className="size-5" />
        </button>
      )}

      {/* Expanded search input */}
      {open && (
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigateToResults();
                }
              }}
              placeholder="Search PesoHub..."
              className="h-9 w-48 rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 sm:w-64"
            />
          </div>
          <button
            type="button"
            onClick={closeSearch}
            className="inline-flex items-center justify-center rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close search"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Instant results dropdown */}
      {open && showDropdown && results.length > 0 && (
        <div className="fixed left-4 right-4 top-16 z-50 overflow-hidden rounded-xl border border-border bg-background shadow-lg sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:w-96">
          <ul className="py-1">
            {results.map((result) => (
              <li key={result.href}>
                <Link
                  href={result.href}
                  onClick={closeSearch}
                  className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-secondary"
                >
                  <span className="min-w-0 truncate font-medium text-foreground">
                    {result.title}
                  </span>
                  <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {CATEGORY_LABELS[result.category]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {query.trim() && (
            <div className="border-t border-border px-4 py-2">
              <button
                type="button"
                onClick={navigateToResults}
                className="w-full text-left text-sm text-primary hover:underline"
              >
                View all results for &ldquo;{query.trim()}&rdquo;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
