import type { FAQ } from "@/types/content";

export const DIGITAL_BANK_RATES_UPDATED_AT = "2026-05-01";

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
    bestFor: "Maximizing returns via fixed-term time deposit",
    baseRate: 8,
    promoRate: null,
    cardAtmAccess: "Mastercard debit card with 3D Secure (Mastercard SecureCode); card lock/block and limit management available in-app",
    transfers: "Fund transfers via app; zero-fee QRPH payments to 675,000+ merchants",
    limitsConditions: "Tiered rates of 6%, 7%, and 8% p.a. available; no conditions or catch stated ('No Conditions, No Catch, and Accessible to Everyone' per news article dated Feb 14, 2026)",
    depositInsurance: "PDIC insured up to ₱1,000,000 per depositor",
    notes: "Time Deposit rates of 6–7–8% p.a. as announced Feb 14, 2026. Described as having no conditions and accessible to everyone.",
  },
  {
    bankName: "Tonik Bank – Tonik Account",
    bestFor: "High-yield everyday savings account",
    baseRate: 6,
    promoRate: null,
    cardAtmAccess: "Mastercard debit card with 3D Secure (Mastercard SecureCode); card lock/block and limit management available in-app",
    transfers: "Fund transfers via app; zero-fee QRPH payments to 675,000+ merchants",
    limitsConditions: "No specific minimum balance or limit stated on homepage for this product",
    depositInsurance: "PDIC insured up to ₱1,000,000 per depositor",
    notes: "Up to 6% p.a. on Tonik Account. Onboarding via mobile app in ~5 minutes. Face ID / Touch ID supported. App available on Google Play and App Store.",
  },
  {
    bankName: "Tonik Bank – Tonik Account",
    bestFor: "High-yield everyday savings account",
    baseRate: 6,
    promoRate: null,
    cardAtmAccess: "Mastercard debit card with 3D Secure (Mastercard SecureCode); card lock/block and limit management available in-app",
    transfers: "Fund transfers available in-app; Zero-fee QR Ph payments to 675,000+ merchants",
    limitsConditions: "No specific minimum balance or cap stated on page for the Tonik Account",
    depositInsurance: "PDIC insured up to ₱1,000,000 per depositor",
    notes: "App-only onboarding (approximately 5 minutes). Face ID / Touch ID login supported. Also offers Solo Stash (4% p.a.), Group Stash (group savings), and Time Deposits (6–8% p.a.). Credit Builder Loan up to ₱50,000 also available.",
  },
  {
    bankName: "Tonik Bank – Time Deposit",
    bestFor: "Highest-yield fixed-term deposit",
    baseRate: 6,
    promoRate: 8,
    cardAtmAccess: "Accessed via Tonik App",
    transfers: "Fund transfers available in-app",
    limitsConditions: "Tiered rates of 6%, 7%, and 8% p.a. described as having no conditions and no catch; accessible to everyone",
    depositInsurance: "PDIC insured up to ₱1,000,000 per depositor",
    notes: "Announced February 14, 2026: '6–7–8% Rates — No Conditions, No Catch, and Accessible to Everyone.' Rate of 8% p.a. is the maximum; 6% is the entry-level Time Deposit rate.",
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
    bankName: "Tonik Bank – Solo Stash",
    bestFor: "Individual goal-based savings",
    baseRate: 4,
    promoRate: null,
    cardAtmAccess: "Mastercard debit card with 3D Secure (Mastercard SecureCode); card lock/block and limit management available in-app",
    transfers: "Fund transfers via app; zero-fee QRPH payments to 675,000+ merchants",
    limitsConditions: "No specific minimum balance or limit stated on homepage for this product",
    depositInsurance: "PDIC insured up to ₱1,000,000 per depositor",
    notes: "4% p.a. interest rate on Solo Stash — described as 4x harder-working than a regular savings account. Photo/goal can be attached to Stash.",
  },
  {
    bankName: "Tonik Bank – Group Stash",
    bestFor: "Collaborative/group goal-based savings",
    baseRate: 4,
    promoRate: null,
    cardAtmAccess: "Mastercard debit card with 3D Secure (Mastercard SecureCode); card lock/block and limit management available in-app",
    transfers: "Fund transfers via app; zero-fee QRPH payments to 675,000+ merchants",
    limitsConditions: "Group savings product; no specific minimum balance or limit stated on homepage",
    depositInsurance: "PDIC insured up to ₱1,000,000 per depositor",
    notes: "Group Stash allows saving with a group for shared goals (#SquadGoals). Rate not explicitly stated on page; same Stash product family as Solo Stash (4% p.a. implied). Rate listed as 4% based on Solo Stash parity — note this is an inference from product family context.",
  },
  {
    bankName: "Tonik Bank – Solo Stash",
    bestFor: "Goal-based individual savings stash",
    baseRate: 4,
    promoRate: null,
    cardAtmAccess: "Accessed via Tonik App (Mastercard card linked to main account)",
    transfers: "Fund transfers available in-app",
    limitsConditions: "No specific minimum balance or cap stated on page",
    depositInsurance: "PDIC insured up to ₱1,000,000 per depositor",
    notes: "Earn 4% p.a. – described as 4x harder than a regular savings account. Part of Tonik's Stashes product suite.",
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
];

export const digitalBankFaqs: FAQ[] = [
  {
    question: "What is a high yield savings account?",
    answer:
      "A high yield savings account (HYSA) is a savings account that offers a significantly higher interest rate than a traditional bank savings account. In the Philippines, most high yield savings accounts are offered by digital banks like Maya, Tonik, GoTyme, and SeaBank, which can offer rates of 5%–15% p.a. compared to the 0.10%–0.25% p.a. typical of traditional banks. These accounts are PDIC-insured up to ₱1,000,000 per depositor, per bank.",
  },
  {
    question: "Which digital bank in the Philippines has the highest interest rate?",
    answer:
      "As of 2026, Maya offers the highest promotional savings rate among Philippine digital banks. For standard (non-promotional) rates, Tonik, GoTyme, and SeaBank are consistently among the highest at 5%–6% p.a. Promotional rates are subject to conditions and may change, so compare both the base rate and promo rate when choosing a digital bank.",
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
