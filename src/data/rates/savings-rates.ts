import type { FAQ } from "@/types/content";

export const SAVINGS_RATES_UPDATED_AT = "2026-07-01";

export interface BankSavingsRate {
  bankName: string;
  bankType: "digital" | "traditional";
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
    bankType: "digital",
    accountType: "Personal Savings",
    interestRate: 15,
    rateType: "Promo",
    minimumBalance: 0,
    liquidity: "App-based transfers",
    bestFor: "Highest promo rate",
    notes: "Promo rate of up to 15% p.a. (requires missions: deposits, bills, card spending); capped at ₱100,000. Base rate is 3.0% p.a. (lowered from 3.5% in 2026). Formerly PayMaya.",
  },
  {
    bankName: "Tonik Digital Bank",
    bankType: "digital",
    accountType: "High-Interest Savings (Homepage Hero Rate)",
    interestRate: 6,
    rateType: "Standard",
    minimumBalance: 0,
    liquidity: "App-based transfers",
    bestFor: "",
    notes: "6% annual interest rate highlighted on the homepage banner. Specific account type not explicitly named on this page.",
  },
  {
    bankName: "Tonik Digital Bank",
    bankType: "digital",
    accountType: "Group Stash",
    interestRate: 6,
    rateType: "Standard",
    minimumBalance: 0,
    liquidity: "App-based transfers",
    bestFor: "",
    notes: "Group savings account for squad/group goals. Interest rate not explicitly stated for Group Stash on this page; 6% is the homepage-featured rate. No specific rate mentioned for Group Stash.",
  },
  {
    bankName: "Tonik Digital Bank",
    bankType: "digital",
    accountType: "Time Deposit",
    interestRate: 5.5,
    rateType: "Standard",
    minimumBalance: 0,
    liquidity: "App-based transfers",
    bestFor: "",
    notes: "5.5% annual interest rate on Time Deposits.",
  },
  {
    bankName: "Tonik Bank",
    bankType: "digital",
    accountType: "Group Stash",
    interestRate: 4.5,
    rateType: "Standard",
    minimumBalance: 0,
    liquidity: "App-based transfers",
    bestFor: "Collaborative/group savings goals",
    notes: "Group savings stash earning 4.0% p.a. standard, or 4.5% p.a. when the owner saves with at least 2 other participants toward a shared goal.",
  },
  {
    bankName: "Tonik Digital Bank",
    bankType: "digital",
    accountType: "Solo Stash",
    interestRate: 4,
    rateType: "Standard",
    minimumBalance: 0,
    liquidity: "App-based transfers",
    bestFor: "",
    notes: "4% annual interest rate. Earn 4 times more than a regular savings account.",
  },
  {
    bankName: "Tonik Bank",
    bankType: "digital",
    accountType: "Solo Stash",
    interestRate: 4,
    rateType: "Standard",
    minimumBalance: 0,
    liquidity: "App-based transfers",
    bestFor: "Goal-based solo savings",
    notes: "Individual stash savings product with 4% annual interest rate.",
  },
  {
    bankName: "MariBank",
    bankType: "digital",
    accountType: "Regular Savings",
    interestRate: 3.25,
    rateType: "Standard",
    minimumBalance: 0,
    liquidity: "App-based transfers",
    bestFor: "Everyday digital savings",
    notes: "Formerly SeaBank Philippines. Rate is 3.25% p.a. for balances up to ₱1M (effective January 15, 2026); 3.75% p.a. for balances above ₱1M. BSP-licensed digital bank backed by Sea Group (Shopee). PDIC-insured up to ₱1M.",
  },
  {
    bankName: "GoTyme",
    bankType: "digital",
    accountType: "GoSave",
    interestRate: 3,
    rateType: "Standard",
    minimumBalance: 0,
    liquidity: "App + kiosk withdrawals",
    bestFor: "Low minimum balance",
    notes: "GoSave rate cut to 3% p.a. from 3.5% effective January 1, 2026. Joint venture of Gokongwei Group and Tyme Group.",
  },
  {
    bankName: "CIMB",
    bankType: "digital",
    accountType: "GSave / UpSave",
    interestRate: 2.5,
    rateType: "Standard",
    minimumBalance: 0,
    liquidity: "App + GCash integration",
    bestFor: "Low minimum balance",
    notes: "UpSave base rate around 2.3%–2.5% p.a. GCash partner bank. Higher rates available via Grow, CIMB Biz, and CIMB Prime products with conditions.",
  },
  {
    bankName: "ING Philippines",
    bankType: "digital",
    accountType: "Savings Account",
    interestRate: 2.5,
    rateType: "Standard",
    minimumBalance: 0,
    liquidity: "App-based transfers",
    bestFor: "Parked short-term cash",
    notes: "Verify availability; ING has scaled back operations in some markets.",
  },
  {
    bankName: "Tonik Bank",
    bankType: "digital",
    accountType: "Tonik Account",
    interestRate: 1,
    rateType: "Standard",
    minimumBalance: 0,
    liquidity: "App-based transfers",
    bestFor: "Everyday digital wallet savings",
    notes: "Regular savings account at 1.0% p.a. on end-of-day balance (cut from 6% effective June 5, 2026). For higher yields, Tonik's Stash products (4%–4.5%) or time deposits (up to 5.5%) are stronger.",
  },
  {
    bankName: "BDO",
    bankType: "traditional",
    accountType: "Regular Savings",
    interestRate: 0.25,
    rateType: "Standard",
    minimumBalance: 10_000,
    liquidity: "Branch + ATM + app",
    bestFor: "Traditional bank users",
    notes: "Largest bank in the Philippines by assets.",
  },
  {
    bankName: "BPI",
    bankType: "traditional",
    accountType: "Regular Savings",
    interestRate: 0.25,
    rateType: "Standard",
    minimumBalance: 3_000,
    liquidity: "Branch + ATM + app",
    bestFor: "Traditional bank users",
    notes: "One of the oldest banks in the Philippines.",
  },
  {
    bankName: "Metrobank",
    bankType: "traditional",
    accountType: "Regular Savings",
    interestRate: 0.25,
    rateType: "Standard",
    minimumBalance: 10_000,
    liquidity: "Branch + ATM + app",
    bestFor: "Traditional bank users",
    notes: "Major universal bank with nationwide coverage.",
  },
];

export const savingsRateFaqs: FAQ[] = [
  {
    question: "What is a savings rate?",
    answer:
      "A savings rate (or savings interest rate) is the annual percentage a bank pays you for keeping money in a savings account. In the Philippines, rates are expressed as a percentage per annum (p.a.). For example, a 5% p.a. rate means you earn approximately ₱5,000 per year on a ₱100,000 balance. Advertised rates are usually gross — meaning the actual return is lower after the 20% withholding tax on interest income.",
  },
  {
    question: "Which bank has the highest savings interest rate in the Philippines in 2026?",
    answer:
      "As of mid-2026, digital banks offer the highest savings interest rates in the Philippines. Maya advertises the highest promotional rate (up to 15% p.a. with missions, capped at ₱100,000). For standard, non-promotional rates, Tonik's Group Stash pays up to 4.5% p.a. and Solo Stash 4% p.a., OwnBank up to 3.8% p.a., and UNO and MariBank (formerly SeaBank) 3.25%–3.5% p.a. Note that Tonik cut its plain Tonik Account to 1% p.a. effective June 5, 2026. Traditional banks like BDO, BPI, and Metrobank typically offer 0.10%–0.25% p.a. Rates change frequently, so always verify directly with the bank.",
  },
  {
    question: "What is a good savings interest rate in the Philippines?",
    answer:
      "A good savings interest rate in the Philippines is generally anything above 3% p.a. for a standard (non-promotional) rate. Traditional banks offer 0.10%–0.25% p.a., which barely keeps up with inflation. Digital banks offering 3%–5% p.a. are considered strong, especially if the rate is standard rather than promotional. For higher fixed returns, consider time deposits or Pag-IBIG MP2.",
  },
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
      "Yes. Interest income from peso deposit accounts is generally subject to a 20% final withholding tax, so the actual return you receive is lower than the gross advertised rate. A 5% p.a. gross rate is roughly 4% p.a. after tax.",
  },
  {
    question:
      "Should I choose a savings account or a time deposit?",
    answer:
      "A savings account is usually better if you want easier access to your funds. A time deposit may be better if you can lock in your money for a fixed term and are comfortable with lower liquidity.",
  },
];
