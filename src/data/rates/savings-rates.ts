import type { FAQ } from "@/types/content";

export const SAVINGS_RATES_UPDATED_AT = "2026-03-14";

export interface BankSavingsRate {
  bankName: string;
  accountType: string;
  interestRate: number;
  rateType: "Promo" | "Standard";
  minimumBalance: number;
  liquidity: string;
  bestFor: string;
  notes: string;
}

/**
 * Savings interest rates from Philippine banks, sorted by interest rate descending.
 * Rates are annual percentage yield (p.a.) for regular savings accounts.
 */
export const bankSavingsRates: BankSavingsRate[] = [
  {
    bankName: "Maya",
    accountType: "Personal Savings",
    interestRate: 15,
    rateType: "Promo",
    minimumBalance: 0,
    liquidity: "App-based transfers",
    bestFor: "Highest promo rate",
    notes: "Promo rate; subject to change. Formerly PayMaya.",
  },
  {
    bankName: "Tonik",
    accountType: "Stash",
    interestRate: 6,
    rateType: "Standard",
    minimumBalance: 0,
    liquidity: "App-based transfers",
    bestFor: "Everyday digital savings",
    notes: "Digital-only bank licensed by BSP.",
  },
  {
    bankName: "GoTyme",
    accountType: "Regular Savings",
    interestRate: 5,
    rateType: "Standard",
    minimumBalance: 0,
    liquidity: "App + kiosk withdrawals",
    bestFor: "Low minimum balance",
    notes: "Joint venture of Gokongwei Group and Tyme Group.",
  },
  {
    bankName: "SeaBank",
    accountType: "Regular Savings",
    interestRate: 5,
    rateType: "Standard",
    minimumBalance: 0,
    liquidity: "App-based transfers",
    bestFor: "Everyday digital savings",
    notes: "Backed by Sea Group (Shopee). BSP-licensed digital bank.",
  },
  {
    bankName: "CIMB",
    accountType: "GSave / UpSave",
    interestRate: 3.5,
    rateType: "Standard",
    minimumBalance: 0,
    liquidity: "App + GCash integration",
    bestFor: "Low minimum balance",
    notes: "GCash partner bank. UpSave account offers higher rate.",
  },
  {
    bankName: "ING Philippines",
    accountType: "Savings Account",
    interestRate: 2.5,
    rateType: "Standard",
    minimumBalance: 0,
    liquidity: "App-based transfers",
    bestFor: "Parked short-term cash",
    notes: "Verify availability; ING has scaled back operations in some markets.",
  },
  {
    bankName: "BDO",
    accountType: "Regular Savings",
    interestRate: 0.25,
    rateType: "Standard",
    minimumBalance: 10000,
    liquidity: "Branch + ATM + app",
    bestFor: "Traditional bank users",
    notes: "Largest bank in the Philippines by assets.",
  },
  {
    bankName: "BPI",
    accountType: "Regular Savings",
    interestRate: 0.25,
    rateType: "Standard",
    minimumBalance: 3000,
    liquidity: "Branch + ATM + app",
    bestFor: "Traditional bank users",
    notes: "One of the oldest banks in the Philippines.",
  },
  {
    bankName: "Metrobank",
    accountType: "Regular Savings",
    interestRate: 0.25,
    rateType: "Standard",
    minimumBalance: 10000,
    liquidity: "Branch + ATM + app",
    bestFor: "Traditional bank users",
    notes: "Major universal bank with nationwide coverage.",
  },
];

export const savingsRateFaqs: FAQ[] = [
  {
    question:
      "What is the best savings interest rate in the Philippines?",
    answer:
      "The best advertised savings rate can change depending on promotions, conditions, and bank updates. That is why it is better to compare both the headline rate and the actual account requirements instead of choosing based on percentage alone.",
  },
  {
    question: "Are higher savings rates always better?",
    answer:
      "Not always. A higher rate may be promotional, conditional, or harder to maintain. It is important to compare access, stability, minimum balance requirements, and account conditions too.",
  },
  {
    question:
      "What is the difference between a promo rate and a regular rate?",
    answer:
      "A promo rate is usually temporary or tied to conditions such as spending, balance tiers, or limited campaigns. A regular rate is typically more stable and easier to compare over time.",
  },
  {
    question: "Do I need a minimum balance to earn interest?",
    answer:
      "That depends on the account. Some accounts require a maintaining or qualifying balance, while others are more flexible. Always check the product rules before opening the account.",
  },
  {
    question:
      "Are savings interest rates taxed in the Philippines?",
    answer:
      "Savings interest is generally subject to withholding tax, so the actual return you receive may be lower than the gross advertised rate.",
  },
  {
    question:
      "Should I choose a savings account or a time deposit?",
    answer:
      "A savings account is usually better if you want easier access to your funds. A time deposit may be better if you can lock in your money for a fixed term and are comfortable with lower liquidity.",
  },
];
