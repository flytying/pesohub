import type { FAQ } from "@/types/content";

export const TIME_DEPOSIT_RATES_UPDATED_AT = "2026-06-29";

export interface BankTimeDepositRate {
  bankName: string;
  product: string;
  termLength: string;
  grossRate: number;
  minimumDeposit: number;
  taxNote: string;
  bestFor: string;
  notes: string;
}

/**
 * Time deposit rates from Philippine banks, sorted by gross rate descending.
 * Rates are gross annual rates (before 20% final withholding tax on interest income).
 */
export const bankTimeDepositRates: BankTimeDepositRate[] = [
  {
    bankName: "Tonik Bank",
    product: "Time Deposit",
    termLength: "12 months",
    grossRate: 5.5,
    minimumDeposit: 5_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Highest digital bank TD rate",
    notes: "Updated June 5, 2026 (cut from the previous 6–7–8% structure): tiered rates of 4.5% (6-month), 5.0% (9-month), 5.5% (12-month), and 5.0% (18- and 24-month). Minimum deposit PHP 5,000; max PHP 250,000 per account (up to 5 active TDs). No conditions or promo code required.",
  },
  {
    bankName: "Tonik Bank",
    product: "Time Deposit",
    termLength: "9 months",
    grossRate: 5,
    minimumDeposit: 5_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Mid-term digital bank TD",
    notes: "Part of Tonik's 4.5–5.0–5.5% tiered time deposit structure (updated June 5, 2026). Minimum deposit PHP 5,000; max PHP 250,000 per account.",
  },
  {
    bankName: "Tonik Bank",
    product: "Time Deposit",
    termLength: "6 months",
    grossRate: 4.5,
    minimumDeposit: 5_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Short-term digital bank TD",
    notes: "Part of Tonik's 4.5–5.0–5.5% tiered time deposit structure (updated June 5, 2026). Minimum deposit PHP 5,000; max PHP 250,000 per account. 18- and 24-month terms earn 5.0% p.a.",
  },
  {
    bankName: "CIMB",
    product: "Fixed Deposit",
    termLength: "12 months",
    grossRate: 5.5,
    minimumDeposit: 1_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Low minimum deposit",
    notes: "CIMB announced revised rates effective January 9, 2026. 24-month tenor no longer offered for new placements effective February 11, 2026.",
  },
  {
    bankName: "CIMB",
    product: "Fixed Deposit",
    termLength: "6 months",
    grossRate: 5,
    minimumDeposit: 1_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Low minimum deposit",
    notes: "GCash-accessible. Verify current tenor availability.",
  },
  {
    bankName: "MariBank",
    product: "Time Deposit",
    termLength: "12 months",
    grossRate: 5,
    minimumDeposit: 50_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Digital-first access",
    notes: "Formerly SeaBank Philippines, rebranded to MariBank. Backed by Sea Group (Shopee). BSP-licensed digital bank.",
  },
  {
    bankName: "Maya",
    product: "Time Deposit",
    termLength: "12 months",
    grossRate: 5,
    minimumDeposit: 10_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Digital-first access",
    notes: "Formerly PayMaya. Verify current product availability.",
  },
  {
    bankName: "Metrobank",
    product: "Online Time Deposit",
    termLength: "12 months",
    grossRate: 5,
    minimumDeposit: 10_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Traditional bank with competitive online TD",
    notes: "Metrobank raised online time deposit rates to up to 5% p.a. effective May 15, 2026. Available via Metrobank app/online. Minimum placement PHP 10,000; four tiers by deposit amount (P10k–P199k; P200k–P999k; P1M–P9.999M; P10M+).",
  },
  {
    bankName: "Metrobank",
    product: "Online Time Deposit",
    termLength: "6 months",
    grossRate: 4.125,
    minimumDeposit: 10_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Traditional bank users",
    notes: "Shorter-term online TD; rate is within the 4.125%–5% p.a. range effective May 15, 2026. Verify exact rate in the Metrobank app as it varies by placement amount.",
  },
  {
    bankName: "BPI",
    product: "Time Deposit",
    termLength: "12 months",
    grossRate: 3.25,
    minimumDeposit: 50_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Traditional bank users",
    notes: "One of the oldest banks in the Philippines. Branch + app access. Verify current rates directly with BPI.",
  },
  {
    bankName: "BPI",
    product: "Time Deposit",
    termLength: "6 months",
    grossRate: 2.75,
    minimumDeposit: 50_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Traditional bank users",
    notes: "One of the oldest banks in the Philippines. Branch + app access. Verify current rates directly with BPI.",
  },
  {
    bankName: "BDO",
    product: "Time Deposit",
    termLength: "12 months",
    grossRate: 0.5,
    minimumDeposit: 100_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Traditional bank users",
    notes: "Largest bank in the Philippines by assets. Standard published rate as of April 2026 is 0.50% p.a. per publicly available data. Promotional or online rates may differ — verify current terms directly with BDO.",
  },
  {
    bankName: "BDO",
    product: "Time Deposit",
    termLength: "6 months",
    grossRate: 0.5,
    minimumDeposit: 100_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Traditional bank users",
    notes: "Largest bank in the Philippines by assets. Standard published rate as of April 2026 is approximately 0.50% p.a. Promotional or online rates may differ — verify current terms directly with BDO.",
  },
];

export const timeDepositRateFaqs: FAQ[] = [
  {
    question: "What are time deposit rates?",
    answer:
      "Time deposit rates are the advertised interest rates paid on deposit products that require funds to stay in the account for a fixed period. Products may differ by tenor, minimum placement, and customer segment.",
  },
  {
    question: "Why should I compare gross rate and tax note?",
    answer:
      "Because the headline rate is usually gross, while the amount you actually receive may be lower after final withholding tax on deposit interest. Recent Philippine guidance reflects a 20% tax environment for this type of interest income.",
  },
  {
    question: "What is the best term length?",
    answer:
      "There is no universal best term. Shorter terms offer more flexibility, while longer terms may fit money you can leave untouched for a fixed period.",
  },
  {
    question: "What happens if a bank changes its rate?",
    answer:
      "Banks can revise rates, remove tenors, or change product conditions. That is why this page should show notes and an update date, not just a rate number.",
  },
  {
    question: "Is this page the same as an official bank quote?",
    answer:
      "No. This page works as a comparison reference. Final terms, exact eligibility, and product rules should still be verified with the bank directly.",
  },
  {
    question: "Should I use a time deposit or a savings account?",
    answer:
      "A time deposit is usually better if you can leave the money untouched for a fixed term. A savings account is usually better if you need easier access to funds.",
  },
];
