import type { FAQ } from "@/types/content";

export const DIGITAL_BANK_RATES_UPDATED_AT = "2026-03-18";

export interface DigitalBankRate {
  bankName: string;
  bestFor: string;
  baseRate: number;
  promoRate: number | null;
  cardAtmAccess: string;
  transfers: string;
  limitsConditions: string;
  depositInsurance: string;
  notes: string;
}

/**
 * Digital bank comparison data for Philippine digital banks,
 * sorted by base rate descending.
 */
export const digitalBankRates: DigitalBankRate[] = [
  {
    bankName: "Tonik",
    bestFor: "Rate-focused savers",
    baseRate: 6,
    promoRate: null,
    cardAtmAccess: "Debit card available",
    transfers: "App-based transfers, InstaPay, PESONet",
    limitsConditions: "No maintaining balance",
    depositInsurance: "PDIC-insured up to ₱1,000,000",
    notes: "BSP-licensed digital bank. Stash account for savings.",
  },
  {
    bankName: "GoTyme",
    bestFor: "Everyday spending",
    baseRate: 5,
    promoRate: null,
    cardAtmAccess: "Debit card + kiosk withdrawals",
    transfers: "App-based transfers, InstaPay",
    limitsConditions: "No maintaining balance",
    depositInsurance: "PDIC-insured up to ₱1,000,000",
    notes: "Joint venture of Gokongwei Group and Tyme Group.",
  },
  {
    bankName: "SeaBank",
    bestFor: "Simpler setup",
    baseRate: 5,
    promoRate: null,
    cardAtmAccess: "No card; app-only",
    transfers: "App-based transfers, InstaPay, PESONet",
    limitsConditions: "No maintaining balance",
    depositInsurance: "PDIC-insured up to ₱1,000,000",
    notes: "Backed by Sea Group (Shopee). BSP-licensed digital bank.",
  },
  {
    bankName: "Maya",
    bestFor: "Promo-driven savers",
    baseRate: 2.5,
    promoRate: 15,
    cardAtmAccess: "Virtual and physical card available",
    transfers: "App-based transfers, InstaPay, PESONet",
    limitsConditions: "Promo rate subject to change",
    depositInsurance: "PDIC-insured up to ₱1,000,000",
    notes: "Promo rate; subject to change. Formerly PayMaya.",
  },
  {
    bankName: "CIMB",
    bestFor: "Transfer-heavy users",
    baseRate: 3.5,
    promoRate: null,
    cardAtmAccess: "No card; app-only",
    transfers: "App + GCash integration, InstaPay",
    limitsConditions: "No maintaining balance",
    depositInsurance: "PDIC-insured up to ₱1,000,000",
    notes: "GCash partner bank. UpSave account offers higher rate.",
  },
];

export const digitalBankFaqs: FAQ[] = [
  {
    question: "What is a digital bank in the Philippines?",
    answer:
      "BSP recognizes digital banks as a distinct bank classification in the Philippines. These banks operate primarily through apps and digital channels, with limited or no physical branches.",
  },
  {
    question: "Is the highest rate always the best choice?",
    answer:
      "No. A bank with the highest promo rate may still be less practical for your needs if access, transfers, card use, or conditions are weaker.",
  },
  {
    question: "Why should I compare base rate and promo rate separately?",
    answer:
      "Because some banks emphasize limited or conditional promo rates, while others offer simpler regular rates. Comparing them separately gives a clearer picture.",
  },
  {
    question: "Are digital bank deposits insured?",
    answer:
      "Bank deposits are covered by PDIC up to ₱1,000,000 per depositor, per bank effective March 15, 2025.",
  },
  {
    question: "Should I use a digital bank or a time deposit?",
    answer:
      "A digital bank may be better if you want easier access and app-based flexibility. A time deposit may be better if you can lock in funds for a fixed term.",
  },
  {
    question: "What should I check after reading this page?",
    answer:
      "Compare savings rates, check time deposit alternatives, and use a calculator if you want to estimate growth instead of only comparing features.",
  },
];
