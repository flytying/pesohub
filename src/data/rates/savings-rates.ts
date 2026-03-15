import type { FAQ } from "@/types/content";

export const SAVINGS_RATES_UPDATED_AT = "2026-03-14";

export interface BankSavingsRate {
  bankName: string;
  accountType: string;
  interestRate: number;
  minimumBalance: number;
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
    minimumBalance: 0,
    notes: "Promo rate; subject to change. Formerly PayMaya.",
  },
  {
    bankName: "Tonik",
    accountType: "Stash",
    interestRate: 6,
    minimumBalance: 0,
    notes: "Digital-only bank licensed by BSP.",
  },
  {
    bankName: "GoTyme",
    accountType: "Regular Savings",
    interestRate: 5,
    minimumBalance: 0,
    notes: "Joint venture of Gokongwei Group and Tyme Group.",
  },
  {
    bankName: "SeaBank",
    accountType: "Regular Savings",
    interestRate: 5,
    minimumBalance: 0,
    notes: "Backed by Sea Group (Shopee). BSP-licensed digital bank.",
  },
  {
    bankName: "CIMB",
    accountType: "GSave / UpSave",
    interestRate: 3.5,
    minimumBalance: 0,
    notes: "GCash partner bank. UpSave account offers higher rate.",
  },
  {
    bankName: "ING Philippines",
    accountType: "Savings Account",
    interestRate: 2.5,
    minimumBalance: 0,
    notes: "Verify availability; ING has scaled back operations in some markets.",
  },
  {
    bankName: "BDO",
    accountType: "Regular Savings",
    interestRate: 0.25,
    minimumBalance: 10000,
    notes: "Largest bank in the Philippines by assets.",
  },
  {
    bankName: "BPI",
    accountType: "Regular Savings",
    interestRate: 0.25,
    minimumBalance: 3000,
    notes: "One of the oldest banks in the Philippines.",
  },
  {
    bankName: "Metrobank",
    accountType: "Regular Savings",
    interestRate: 0.25,
    minimumBalance: 10000,
    notes: "Major universal bank with nationwide coverage.",
  },
];

export const savingsRateFaqs: FAQ[] = [
  {
    question:
      "Are digital bank deposits in the Philippines safe?",
    answer:
      "Yes. Digital banks like Maya Bank, Tonik, GoTyme, SeaBank, and CIMB are licensed and regulated by the Bangko Sentral ng Pilipinas (BSP). Deposits up to PHP 1,000,000 per depositor per bank are insured by the Philippine Deposit Insurance Corporation (PDIC), the same protection that applies to traditional banks. This increased coverage (from PHP 500,000) took effect on March 15, 2025.",
  },
  {
    question:
      "Why are digital bank interest rates so much higher than traditional banks?",
    answer:
      "Digital banks operate with lower overhead costs because they have no physical branches, fewer employees, and leaner infrastructure. They pass these savings on to customers in the form of higher interest rates to attract deposits and grow their customer base. Some rates are promotional and may decrease over time.",
  },
  {
    question:
      "Is the 15% interest rate from Maya Bank sustainable?",
    answer:
      "The 15% rate from Maya is a promotional rate designed to attract new depositors. Promo rates are typically temporary and may be reduced once the bank reaches its deposit targets. It is wise to take advantage of the rate while it lasts, but plan for the possibility that it will decrease.",
  },
  {
    question:
      "How is interest on savings accounts taxed in the Philippines?",
    answer:
      "Interest earned on peso savings deposits is subject to a 20% final withholding tax. This means the interest rate you see advertised is the gross rate, and the bank automatically deducts the tax before crediting interest to your account. For example, a 6% gross rate yields an effective rate of 4.8% after tax.",
  },
  {
    question:
      "Can I open multiple savings accounts at different banks?",
    answer:
      "Yes. There is no legal limit on how many savings accounts you can have across different banks in the Philippines. Many savers open accounts at multiple digital banks to take advantage of the highest available rates. Keep in mind that PDIC insurance covers up to PHP 1,000,000 per depositor per bank (effective March 15, 2025).",
  },
];
