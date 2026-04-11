/**
 * Blog Post Registry
 *
 * Central registry of all blog posts. This is the source of truth for
 * generateStaticParams() in the [slug] page and the blog hub listing.
 *
 * When adding a new post:
 * 1. Create the data file at src/data/blog/{slug}.ts
 * 2. Add an entry to the blogPosts array below
 * 3. The blog agent does this automatically via registry-updater.mjs
 */

import type { BlogCategory } from "@/types/content";

export interface BlogPostEntry {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
}

export const blogPosts: BlogPostEntry[] = [
  // Blog posts are added here by the blog agent or manually.
  // Keep sorted by publishedAt descending (newest first).
  {
    slug: "best-savings-account-philippines-2026",
    title: "How to Choose the Best Savings Account in the Philippines (2026)",
    excerpt:
      "Not all savings accounts are equal. Interest rates in the Philippines range from 0.05% to over 5% per year depending on the bank. Here is how to find the right account for your situation.",
    category: "savings",
    publishedAt: "2026-04-11",
    updatedAt: "2026-04-11",
    readTime: 7,
  },
  {
    slug: "high-interest-savings-account-philippines",
    title: "High-Interest Savings Accounts Philippines: What Rates Can You Actually Get?",
    excerpt: "Philippine high-interest savings accounts offer 3-4% annual rates, but with 5.1% projected inflation, real returns may be near zero for peso savers.",
    category: "savings",
    publishedAt: "2026-04-11",
    updatedAt: "2026-04-11",
    readTime: 8,
  },
];
