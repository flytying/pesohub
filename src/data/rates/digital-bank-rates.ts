import type { FAQ } from "@/types/content";

export const DIGITAL_BANK_RATES_UPDATED_AT = "2026-07-15";

export interface DigitalBankRate {
  bankName: string;
  bestFor: string;
  baseRate: number;
  promoRate: number | null;
  /** Short summary of the balance cap that limits the headline rate, e.g. "₱100,000" or "No cap". */
  balanceCap: string;
  /** Short summary of what you must do to earn the headline rate, e.g. "None" or "Monthly missions". */
  requirement: string;
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
    bankName: "Tonik Digital Bank – Time Deposit",
    bestFor: "Depositors wanting the highest available rate on locked-in savings",
    baseRate: 5.5,
    promoRate: null,
    balanceCap: "No cap stated",
    requirement: "None stated",
    cardAtmAccess: "Mastercard debit card (card lock/block feature available)",
    transfers: "PESONet, InstaPay (zero-fee QRPH payments to 675,000+ merchants)",
    limitsConditions: "No specific term or minimum balance conditions stated on the homepage",
    depositInsurance: "PDIC up to ₱1,000,000 per depositor",
    notes: "Time Deposit product headline rate is 5.5% p.a. Page also references a 6% rate ('We'd really rather give you 6') but the explicit product rate shown is 5.5%. Full fee schedule and deposit interest rate details available on separate pages (/deposit-interest-rates and /fees-and-charges). BSP-regulated digital bank.",
  },
  {
    bankName: "Tonik Bank – Time Deposit",
    bestFor: "Highest-yield time deposit savings",
    baseRate: 5.5,
    promoRate: null,
    balanceCap: "₱250,000 per account",
    requirement: "Lock funds for a fixed term (6–24 months)",
    cardAtmAccess: "Managed via Tonik app",
    transfers: "Fund transfers available in-app",
    limitsConditions: "Tiered rates by term (effective June 5, 2026): 4.5% (6-month), 5.0% (9-month), 5.5% (12-month), 5.0% (18- and 24-month); minimum deposit PHP 5,000; maximum PHP 250,000 per account (up to 5 active TDs)",
    depositInsurance: "PDIC insured up to ₱1,000,000 per depositor",
    notes: "Rates lowered June 5, 2026 to a 4.5–5.0–5.5% structure (previously up to 8%). No conditions or promo code required. Accessible to everyone.",
  },
  {
    bankName: "Tonik Bank – Group Stash",
    bestFor: "Collaborative/group savings goals",
    baseRate: 4.5,
    promoRate: null,
    balanceCap: "No cap",
    requirement: "Owner + at least 2 participants for 4.5%",
    cardAtmAccess: "Managed via Tonik app",
    transfers: "Fund transfers available in-app",
    limitsConditions: "4.0% p.a. standard; 4.5% p.a. when the owner saves with at least 2 other participants toward a shared goal.",
    depositInsurance: "PDIC insured up to ₱1,000,000 per depositor",
    notes: "Group Stash earns 4.0% p.a. on your own, or 4.5% p.a. saving with a group. Allows saving with a group for shared goals.",
  },
  {
    bankName: "Tonik Digital Bank – Solo Stash",
    bestFor: "Individuals wanting a high-yield savings stash with easy app-based access",
    baseRate: 4,
    promoRate: null,
    balanceCap: "No cap stated",
    requirement: "None",
    cardAtmAccess: "Mastercard debit card (card lock/block feature available)",
    transfers: "PESONet, InstaPay (zero-fee QRPH payments to 675,000+ merchants)",
    limitsConditions: "No specific balance cap or conditions stated on page for Solo Stash; onboarding via app only",
    depositInsurance: "PDIC up to ₱1,000,000 per depositor",
    notes: "Tonik is a BSP-regulated neobank (digital-only). Also offers Group Stash (shared savings with a group) and Time Deposit at 5.5% p.a. App available on Google Play and App Store. Onboarding takes ~5 minutes. Customer service 6AM–9PM; fraud hotline 24/7.",
  },
  {
    bankName: "Tonik Bank – Solo Stash",
    bestFor: "Goal-based solo savings",
    baseRate: 4,
    promoRate: null,
    balanceCap: "No cap",
    requirement: "None",
    cardAtmAccess: "Managed via Tonik app",
    transfers: "Fund transfers available in-app",
    limitsConditions: "Individual savings stash at 4% p.a.; no minimum balance explicitly stated on page",
    depositInsurance: "PDIC insured up to ₱1,000,000 per depositor",
    notes: "4% annual interest rate on Solo Stash. Note Tonik's plain Tonik Account was cut to 1% p.a. on June 5, 2026, so the Stash products now carry the higher everyday rates.",
  },
  {
    bankName: "OwnBank",
    bestFor: "Savers comparing newer high-yield apps",
    baseRate: 3.8,
    promoRate: null,
    balanceCap: "No cap stated",
    requirement: "None; no minimum or maintaining balance",
    cardAtmAccess: "No card; app-only",
    transfers: "App-based transfers, InstaPay, PESONet",
    limitsConditions: "\"Own It\" savings up to 3.8% p.a. with daily interest. Time deposits up to ~5.2% p.a. (8% p.a. for the first 7 days, new users only).",
    depositInsurance: "PDIC-insured up to ₱1,000,000",
    notes: "Digital banking app that has adjusted rates several times; the savings rate has trended down through 2025–2026. Always confirm the current rate in-app before depositing.",
  },
  {
    bankName: "UNO Digital Bank",
    bestFor: "Savers who want a simple, no-conditions rate",
    baseRate: 3.5,
    promoRate: null,
    balanceCap: "No cap on the UNOReady savings rate",
    requirement: "Higher tier needs ~₱5,000 average daily balance",
    cardAtmAccess: "Virtual debit card; app-managed",
    transfers: "App-based transfers, InstaPay, PESONet; can be linked to GCash GSave",
    limitsConditions: "UNOReady savings 3.0% p.a., up to 3.5% p.a. with a ₱5,000+ balance (daily interest crediting). Time deposits up to ~5.5% p.a. (UNOBoost) depending on tenure.",
    depositInsurance: "PDIC-insured up to ₱1,000,000",
    notes: "BSP-licensed digital bank. Savings rate up to 3.5% p.a. with no spending missions or promo mechanics. Verify the current tier on the UNO app before depositing.",
  },
  {
    bankName: "MariBank",
    bestFor: "Everyday digital savings",
    baseRate: 3.25,
    promoRate: null,
    balanceCap: "₱1M at 3.25%; 3.75% above ₱1M",
    requirement: "None",
    cardAtmAccess: "No card; app-only",
    transfers: "App-based transfers, InstaPay, PESONet",
    limitsConditions: "3.25% p.a. for balances up to ₱1M; 3.75% p.a. for balances above ₱1M (effective January 15, 2026). No maintaining balance.",
    depositInsurance: "PDIC-insured up to ₱1,000,000",
    notes: "Formerly SeaBank Philippines, rebranded to MariBank. Backed by Sea Group (Shopee). BSP-licensed digital bank.",
  },
  {
    bankName: "NetBank",
    bestFor: "No-frills daily-compounding savings",
    baseRate: 3.25,
    promoRate: null,
    balanceCap: "No cap",
    requirement: "₱69 end-of-day balance to earn interest",
    cardAtmAccess: "No card; app-only",
    transfers: "App-based transfers, InstaPay, PESONet",
    limitsConditions: "PesoSAVERS savings at 3.25% p.a. with daily interest crediting and compounding. No minimum initial deposit or maintaining balance. Time deposits: ~4.5% p.a. (6-month) and ~5% p.a. (12-month).",
    depositInsurance: "PDIC-insured up to ₱1,000,000",
    notes: "Rate may adjust with NetBank's asset/liability requirements and market conditions. Confirm the current rate before opening an account.",
  },
  {
    bankName: "GoTyme",
    bestFor: "Everyday spending",
    baseRate: 3,
    promoRate: null,
    balanceCap: "No cap",
    requirement: "None",
    cardAtmAccess: "Debit card + kiosk withdrawals",
    transfers: "App-based transfers, InstaPay",
    limitsConditions: "GoSave rate cut to 3% p.a. from 3.5% effective January 1, 2026. No maintaining balance.",
    depositInsurance: "PDIC-insured up to ₱1,000,000",
    notes: "Joint venture of Gokongwei Group and Tyme Group.",
  },
  {
    bankName: "Maya",
    bestFor: "Promo-driven savers",
    baseRate: 3,
    promoRate: 15,
    balanceCap: "Promo rate capped at ₱100,000",
    requirement: "Promo needs missions (deposits, bills, card spend)",
    cardAtmAccess: "Virtual and physical card available",
    transfers: "App-based transfers, InstaPay, PESONet",
    limitsConditions: "Base rate 3.0% p.a. (lowered from 3.5% in 2026). Promo rate up to 15% requires missions (deposits, bills, card spending); capped at ₱100,000.",
    depositInsurance: "PDIC-insured up to ₱1,000,000",
    notes: "Promo rate subject to change. Formerly PayMaya.",
  },
  {
    bankName: "CIMB",
    bestFor: "Transfer-heavy users",
    baseRate: 2.5,
    promoRate: 7,
    balanceCap: "Grow/Prime higher rates tiered by balance",
    requirement: "Base rate has none; Grow/Prime need ADB growth",
    cardAtmAccess: "No card; app-only",
    transfers: "App + GCash integration, InstaPay",
    limitsConditions: "UpSave base rate around 2.3%–2.5% p.a. Higher rates on Grow (4% base + 3% conditional = up to 7%) and CIMB Prime with ADB growth requirement.",
    depositInsurance: "PDIC-insured up to ₱1,000,000",
    notes: "GCash partner bank — GSave is powered by CIMB. UpSave base rate around 2.3%–2.5% p.a.; Grow and Prime products offer higher conditional rates.",
  },
  {
    bankName: "Tonik Bank – Tonik Account",
    bestFor: "Everyday wallet savings",
    baseRate: 1,
    promoRate: null,
    balanceCap: "No cap",
    requirement: "None",
    cardAtmAccess: "Mastercard debit card with 3D Secure; card lock/block and limit management in-app",
    transfers: "Fund transfers available in-app; zero-fee QRPH payments to 675,000+ merchants",
    limitsConditions: "1.0% p.a. on end-of-day balance (cut from 6% effective June 5, 2026). No maintaining balance.",
    depositInsurance: "PDIC insured up to ₱1,000,000 per depositor",
    notes: "The plain Tonik Account dropped to 1.0% p.a. on June 5, 2026. For higher yields use Tonik's Solo/Group Stash (4%–4.5%) or time deposits (up to 5.5%).",
  },
];

export const digitalBankFaqs: FAQ[] = [
  {
    question:
      "What is the best high yield savings account in the Philippines for 2026?",
    answer:
      "For 2026, the best high yield savings accounts in the Philippines are from digital banks. On standard (non-promotional) rates, Tonik's Group Stash leads at 4.5% p.a., followed by OwnBank up to 3.8% p.a., UNO Digital Bank up to 3.5% p.a., and MariBank and NetBank at 3.25% p.a. Maya offers up to 15% p.a. promotionally on a capped balance with monthly missions. All are PDIC-insured up to ₱1,000,000 per depositor, per bank. Rates change often — compare the base rate, promo rate, balance cap, and requirements in the table above before opening one.",
  },
  {
    question: "What is a high yield savings account?",
    answer:
      "A high yield savings account (HYSA) is a savings account that offers a significantly higher interest rate than a traditional bank savings account. In the Philippines, most high yield savings accounts are offered by digital banks like Maya, Tonik, GoTyme, and MariBank, which can offer rates of 3%–15% p.a. compared to the 0.10%–0.25% p.a. typical of traditional banks. These accounts are PDIC-insured up to ₱1,000,000 per depositor, per bank.",
  },
  {
    question: "Which digital bank in the Philippines has the highest interest rate?",
    answer:
      "As of mid-2026, Maya offers the highest promotional savings rate (up to 15% p.a. with missions, capped at ₱100,000) among Philippine digital banks. For standard (non-promotional) rates, Tonik's Group Stash leads at 4.5% p.a. and Solo Stash at 4% p.a., followed by OwnBank up to 3.8% p.a., UNO Digital Bank up to 3.5% p.a., and MariBank (formerly SeaBank) and NetBank at 3.25% p.a. For fixed terms, Tonik and UNO time deposits reach about 5.5% p.a. Note Tonik cut its plain Tonik Account to 1% p.a. on June 5, 2026. Promotional and conditional rates change often, so compare the base rate, promo rate, balance cap, and any requirements before choosing a digital bank.",
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
      "A digital bank savings account may be better if you want easier access and app-based flexibility. A time deposit may be better if you can lock in funds for a fixed term — and several digital banks (Tonik, UNO, NetBank, OwnBank) offer time deposits up to around 5%–5.5% p.a.",
  },
  {
    question: "What happens to my savings rate when the BSP cuts rates?",
    answer:
      "Most digital bank savings rates are variable, so the bank can lower them at any time, and they usually fall after the BSP cuts its policy rate. A time deposit is the exception: the rate you open at stays locked for the full term. If you expect rates to keep falling and have funds you will not need for a while, a time deposit locks in the current rate.",
  },
  {
    question: "Can I open accounts at several digital banks?",
    answer:
      "Yes. There is no rule against holding savings accounts at multiple BSP-licensed banks at the same time. Many savers use one bank for their emergency fund and another for time deposits. Each bank is separately PDIC-insured up to ₱1,000,000 per depositor, so spreading larger balances across banks also keeps more of your money within the insured limit.",
  },
  {
    question: "What should I check after reading this page?",
    answer:
      "Compare savings rates, check time deposit alternatives, and use a calculator if you want to estimate growth instead of only comparing features.",
  },
];
