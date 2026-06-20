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
  {
    slug: "car-loan-calculator-guide-philippines",
    title: "Car Loan Calculator Philippines: How to Estimate Your Monthly Payment Before You Apply",
    excerpt: "Learn how a car loan calculator works in the Philippine context, understand the difference between add-on and diminishing balance rates, see real peso-denominated sample computations, and get practical tips to lower your monthly amortization before you walk into any bank or dealership.",
    category: "banking",
    publishedAt: "2026-05-14",
    updatedAt: "2026-05-14",
    readTime: 12,
  },
  {
    slug: "home-loan-vs-pagibig-housing-loan-philippines",
    title: "Home Loan vs Pag-IBIG Housing Loan: Which Is Better for First-Time Buyers?",
    excerpt: "For most Filipino first-time buyers, a Pag-IBIG housing loan offers lower interest rates and longer fixed-rate terms — but bank home loans may be the better fit for mid-to-high-value properties. This guide compares both options side by side, with real-peso scenarios and calculator tips.",
    category: "banking",
    publishedAt: "2026-05-18",
    updatedAt: "2026-05-18",
    readTime: 14,
  },
  {
    slug: "best-digital-banks-philippines-2026",
    title: "Best Digital Banks in the Philippines: Rates, Features, and Who They Are For",
    excerpt: "The best digital banks in the Philippines in 2026 — including Tonik, Maya Bank, GoTyme Bank, CIMB, and OFBank — offer savings rates up to 60 times higher than traditional banks, zero maintaining balance, and PDIC-insured deposits. Here is how to pick the right one for your situation.",
    category: "banking",
    publishedAt: "2026-05-25",
    updatedAt: "2026-05-25",
    readTime: 12,
  },
  {
    slug: "pagibig-mp2-salary-deduction-guide",
    title: "Pag-IBIG MP2 Salary Deduction: How It Works and Is It Worth It?",
    excerpt: "When your company offers the Pag-IBIG MP2 Salary Deduction Program, your chosen contribution is automatically withheld from your pay and remitted to Pag-IBIG — giving you a disciplined, tax-free savings vehicle backed by the government that has historically earned over 6% per annum.",
    category: "government",
    publishedAt: "2026-06-01",
    updatedAt: "2026-06-01",
    readTime: 12,
  },
  {
    slug: "best-digital-banks-philippines",
    title: "Best Digital Banks in the Philippines",
    excerpt: "GoTyme Bank leads the Philippines' digital banking space in 2026 with a #2 Forbes ranking, while Maya Bank offers rates up to 15% p.a. and Tonik provides stable no-conditions yields. Here's how all six BSP-licensed digital banks compare — and how to pick the right one for your needs.",
    category: "banking",
    publishedAt: "2026-06-20",
    updatedAt: "2026-06-20",
    readTime: 10,
  },
  {
    slug: "digital-bank-interest-rates-philippines",
    title: "Digital Bank Interest Rates in the Philippines, Compared",
    excerpt: "In 2026, Philippine digital bank savings rates range from 0.05% (OFBank) to 6% gross with Tonik, and time deposits reaching up to 8% — compare every major rate, understand your real after-tax yield, and find the right digital bank for your savings goals.",
    category: "banking",
    publishedAt: "2026-06-20",
    updatedAt: "2026-06-20",
    readTime: 9,
  },
];
