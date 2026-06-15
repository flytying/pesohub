import type { FAQ } from "@/types/content";

export const DIGITAL_BANK_RATES_UPDATED_AT = "2026-06-15";

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
    bankName: "Tonik Bank – Time Deposit",
    bestFor: "Highest-yield time deposit savings",
    baseRate: 8,
    promoRate: null,
    cardAtmAccess: "Managed via Tonik app",
    transfers: "Fund transfers available in-app",
    limitsConditions: "Tiered rates by term: 6% (6-month), 7% (9-month), 8% (12-month), 6% (18- and 24-month); minimum deposit PHP 5,000; maximum PHP 250,000 per account (up to 5 active TDs)",
    depositInsurance: "PDIC insured up to ₱1,000,000 per depositor",
    notes: "Rates updated May 20, 2026: 6–7–8% p.a. structure with specific term assignments. No conditions or promo code required. Accessible to everyone.",
  },
  {
    bankName: "Tonik Bank – Tonik Account",
    bestFor: "High-interest everyday savings account",
    baseRate: 6,
    promoRate: null,
    cardAtmAccess: "Mastercard debit card with 3D Secure (Mastercard SecureCode); card lock/block and limit management available in-app",
    transfers: "Fund transfers available in-app; zero-fee QRPH payments to 675,000+ merchants",
    limitsConditions: "Card limits manageable by user in-app",
    depositInsurance: "PDIC insured up to ₱1,000,000 per depositor",
    notes: "Up to 6% interest p.a. on the Tonik Account. Onboarding takes ~5 minutes via the Tonik app (Android/iOS). Face ID and Touch ID supported for secure access.",
  },
  {
    bankName: "Tonik Bank – Group Stash",
    bestFor: "Collaborative/group savings goals",
    baseRate: 4.5,
    promoRate: null,
    cardAtmAccess: "Managed via Tonik app",
    transfers: "Fund transfers available in-app",
    limitsConditions: "Requires at least 3 members saving together to earn 4.5% p.a.",
    depositInsurance: "PDIC insured up to ₱1,000,000 per depositor",
    notes: "Group Stash earns 4.5% p.a. when saving with a group of at least 3 people. Allows saving with a group for shared goals.",
  },
  {
    bankName: "Tonik Bank – Solo Stash",
    bestFor: "Goal-based solo savings",
    baseRate: 4,
    promoRate: null,
    cardAtmAccess: "Managed via Tonik app",
    transfers: "Fund transfers available in-app",
    limitsConditions: "Individual savings stash; no minimum balance explicitly stated on page",
    depositInsurance: "PDIC insured up to ₱1,000,000 per depositor",
    notes: "4% annual interest rate on Solo Stash — described as 4x harder than a regular savings account.",
  },
  {
    bankName: "MariBank",
    bestFor: "Everyday digital savings",
    baseRate: 3.25,
    promoRate: null,
    cardAtmAccess: "No card; app-only",
    transfers: "App-based transfers, InstaPay, PESONet",
    limitsConditions: "3.25% p.a. for balances up to ₱1M; 3.75% p.a. for balances above ₱1M (effective January 15, 2026). No maintaining balance.",
    depositInsurance: "PDIC-insured up to ₱1,000,000",
    notes: "Formerly SeaBank Philippines, rebranded to MariBank. Backed by Sea Group (Shopee). BSP-licensed digital bank.",
  },
  {
    bankName: "Maya",
    bestFor: "Promo-driven savers",
    baseRate: 3,
    promoRate: 15,
    cardAtmAccess: "Virtual and physical card available",
    transfers: "App-based transfers, InstaPay, PESONet",
    limitsConditions: "Base rate 3.0% p.a. (lowered from 3.5% effective April 1, 2026). Promo rate up to 15% requires missions (deposits, bills, card spending); capped at ₱100,000.",
    depositInsurance: "PDIC-insured up to ₱1,000,000",
    notes: "Promo rate subject to change. Formerly PayMaya.",
  },
  {
    bankName: "GoTyme",
    bestFor: "Everyday spending",
    baseRate: 3,
    promoRate: null,
    cardAtmAccess: "Debit card + kiosk withdrawals",
    transfers: "App-based transfers, InstaPay",
    limitsConditions: "GoSave rate cut to 3% p.a. from 3.5% effective January 1, 2026. No maintaining balance.",
    depositInsurance: "PDIC-insured up to ₱1,000,000",
    notes: "Joint venture of Gokongwei Group and Tyme Group.",
  },
  {
    bankName: "CIMB",
    bestFor: "Transfer-heavy users",
    baseRate: 2.5,
    promoRate: null,
    cardAtmAccess: "No card; app-only",
    transfers: "App + GCash integration, InstaPay",
    limitsConditions: "UpSave base rate 2.5% p.a. Higher rates on Grow (4% base + 3% conditional = up to 7%) and CIMB Prime with ADB growth requirement.",
    depositInsurance: "PDIC-insured up to ₱1,000,000",
    notes: "GCash partner bank. UpSave base rate at 2.5% p.a.; Grow and Prime products offer higher conditional rates.",
  },
];

export const digitalBankFaqs: FAQ[] = [
  {
    question: "What is a high yield savings account?",
    answer:
      "A high yield savings account (HYSA) is a savings account that offers a significantly higher interest rate than a traditional bank savings account. In the Philippines, most high yield savings accounts are offered by digital banks like Maya, Tonik, GoTyme, and MariBank, which can offer rates of 3%–15% p.a. compared to the 0.10%–0.25% p.a. typical of traditional banks. These accounts are PDIC-insured up to ₱1,000,000 per depositor, per bank.",
  },
  {
    question: "Which digital bank in the Philippines has the highest interest rate?",
    answer:
      "As of mid-2026, Maya offers the highest promotional savings rate (up to 15% p.a. with missions) among Philippine digital banks. For standard (non-promotional) rates, Tonik leads at 6% p.a. on its Tonik Account and 4.5% p.a. on Group Stash. MariBank (formerly SeaBank) offers 3.25% p.a., while GoTyme and Maya each offer a 3% p.a. base rate. Promotional rates are subject to conditions and may change, so compare both the base rate and promo rate when choosing a digital bank.",
  },
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
