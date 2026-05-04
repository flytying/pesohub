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
  {
    slug: "what-is-a-savings-rate-philippines",
    title: "What Is a Savings Rate and Why It Matters for Filipino Savers",
    excerpt: "Your savings rate — the percentage of your income you set aside rather than spend — is one of the most powerful numbers in personal finance. This guide explains what it means for Filipino earners, how to calculate yours, what targets make sense at different life stages, and practical strategies to increase it starting today.",
    category: "savings",
    publishedAt: "2026-04-13",
    updatedAt: "2026-04-13",
    readTime: 9,
  },
  {
    slug: "time-deposit-vs-savings-account-philippines",
    title: "Time Deposit vs Savings Account: Which Earns More in the Philippines?",
    excerpt: "Time deposits in the Philippines offer significantly higher interest rates than regular savings accounts — typically 3%–6% per annum versus 0.10%–1% — but your money is locked in for a fixed term. This guide covers current 2025 TD rates, peso-based interest calculations, the 20% BIR withholding tax, TD laddering strategies, and how digital banks are changing the comparison.",
    category: "banking",
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    readTime: 9,
  },
  {
    slug: "bir-withholding-tax-table-2026-explained",
    title: "BIR Withholding Tax Table 2026: Monthly, Semi-Monthly, and Daily Rates Explained",
    excerpt: "The 2026 BIR withholding tax tables in the Philippines follow the same TRAIN Law permanent schedule effective since January 2023, with employees earning ₱20,833 or less per month remaining fully exempt. This guide explains the monthly, semi-monthly, and daily rates, how to compute your actual tax step by step, and the common payroll mistakes that cost employers and employees money.",
    category: "tax",
    publishedAt: "2026-04-28",
    updatedAt: "2026-04-28",
    readTime: 10,
  },
  {
    slug: "how-to-compute-withholding-tax-philippines",
    title: "How to Compute Your Withholding Tax in the Philippines (Step-by-Step)",
    excerpt: "Learn how to compute your withholding tax on compensation in the Philippines step by step — from identifying your gross pay and subtracting SSS, PhilHealth, and Pag-IBIG contributions, to applying the TRAIN Law's graduated tax rates to find out exactly how much your employer should be deducting from your payslip each month.",
    category: "tax",
    publishedAt: "2026-05-04",
    updatedAt: "2026-05-04",
    readTime: 9,
  },
];
