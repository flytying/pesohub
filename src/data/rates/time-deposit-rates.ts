import type { FAQ } from "@/types/content";

export const TIME_DEPOSIT_RATES_UPDATED_AT = "2026-03-17";

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
    bankName: "Tonik",
    product: "Time Deposit",
    termLength: "6 months",
    grossRate: 6.0,
    minimumDeposit: 5_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Short-term digital",
    notes: "Digital-only bank licensed by BSP. Rates may vary by promo.",
  },
  {
    bankName: "Tonik",
    product: "Time Deposit",
    termLength: "12 months",
    grossRate: 6.0,
    minimumDeposit: 5_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Longer-term digital",
    notes: "Digital-only bank licensed by BSP. Rates may vary by promo.",
  },
  {
    bankName: "CIMB",
    product: "Fixed Deposit",
    termLength: "12 months",
    grossRate: 5.5,
    minimumDeposit: 1_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Low minimum deposit",
    notes:
      "CIMB announced revised rates effective January 9, 2026. 24-month tenor no longer offered for new placements effective February 11, 2026.",
  },
  {
    bankName: "CIMB",
    product: "Fixed Deposit",
    termLength: "6 months",
    grossRate: 5.0,
    minimumDeposit: 1_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Low minimum deposit",
    notes: "GCash-accessible. Verify current tenor availability.",
  },
  {
    bankName: "SeaBank",
    product: "Time Deposit",
    termLength: "12 months",
    grossRate: 5.0,
    minimumDeposit: 50_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Digital-first access",
    notes: "Backed by Sea Group (Shopee). BSP-licensed digital bank.",
  },
  {
    bankName: "Maya",
    product: "Time Deposit",
    termLength: "12 months",
    grossRate: 5.0,
    minimumDeposit: 10_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Digital-first access",
    notes: "Formerly PayMaya. Verify current product availability.",
  },
  {
    bankName: "BPI",
    product: "Time Deposit",
    termLength: "12 months",
    grossRate: 3.25,
    minimumDeposit: 50_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Traditional bank users",
    notes: "One of the oldest banks in the Philippines. Branch + app access.",
  },
  {
    bankName: "BPI",
    product: "Time Deposit",
    termLength: "6 months",
    grossRate: 2.75,
    minimumDeposit: 50_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Traditional bank users",
    notes: "One of the oldest banks in the Philippines. Branch + app access.",
  },
  {
    bankName: "BDO",
    product: "Time Deposit",
    termLength: "12 months",
    grossRate: 3.0,
    minimumDeposit: 100_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Traditional bank users",
    notes: "Largest bank in the Philippines by assets. Higher minimum.",
  },
  {
    bankName: "BDO",
    product: "Time Deposit",
    termLength: "6 months",
    grossRate: 2.5,
    minimumDeposit: 100_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Traditional bank users",
    notes: "Largest bank in the Philippines by assets. Higher minimum.",
  },
  {
    bankName: "Metrobank",
    product: "Time Deposit",
    termLength: "12 months",
    grossRate: 2.75,
    minimumDeposit: 100_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Traditional bank users",
    notes: "Major universal bank with nationwide coverage.",
  },
  {
    bankName: "Metrobank",
    product: "Time Deposit",
    termLength: "6 months",
    grossRate: 2.25,
    minimumDeposit: 100_000,
    taxNote: "Gross before 20% WHT",
    bestFor: "Traditional bank users",
    notes: "Major universal bank with nationwide coverage.",
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
