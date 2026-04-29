import type { FAQ } from "@/types/content";

export const EXCHANGE_RATE_SOURCE = "Bangko Sentral ng Pilipinas (BSP)";

export const USD_PHP_UPDATED_AT = "2026-04-29";

export interface ExchangeRateEntry {
  date: string;
  rate: number;
  change: number;
}

export interface BSPRateDetails {
  buyingRate: number;
  sellingRate: number;
  referenceRate: number;
  pdsClosingRate: number;
  pdsClosingDate: string;
  sdrRate: number;
  goldBuying: number;
  silverBuying: number;
}

/**
 * Current BSP reference rate for USD to PHP.
 */
export const currentRate: ExchangeRateEntry = {
  date: "2026-04-29",
  rate: 61.3,
  change: 0.6,
};

/**
 * Additional BSP rate details (buying, selling, PDS, SDR, gold, silver).
 */
export const bspRateDetails: BSPRateDetails = {
  buyingRate: 61.05,
  sellingRate: 61.55,
  referenceRate: 61.3,
  pdsClosingRate: 61.3,
  pdsClosingDate: "2026-04-28",
  sdrRate: 1.36934,
  goldBuying: 4603.5,
  silverBuying: 73.55,
};

/**
 * Historical BSP reference rates for the last 7 business days.
 */
export const historicalRates: ExchangeRateEntry[] = [
  { date: "2026-04-29", rate: 61.3, change: 0.6 },
  { date: "2026-04-28", rate: 60.7, change: 0 },
  { date: "2026-04-27", rate: 60.7, change: 0.2 },
  { date: "2026-04-24", rate: 60.5, change: 0.35 },
  { date: "2026-04-23", rate: 60.15, change: 0.2 },
  { date: "2026-04-22", rate: 59.95, change: 0 },
  { date: "2026-04-21", rate: 59.95, change: -0.1 },
];

export const exchangeRateFaqs: FAQ[] = [
  {
    question: "What is the BSP reference rate?",
    answer:
      "The BSP reference rate is the weighted average exchange rate of the Philippine Peso against the US Dollar based on trades in the Philippine Dealing System (PDS). It is published by the Bangko Sentral ng Pilipinas (BSP) every business day and serves as the official benchmark for PHP/USD conversions.",
  },
  {
    question: "Where can I get the best USD to PHP exchange rate?",
    answer:
      "You can compare rates from banks, licensed money changers, and digital remittance services. Licensed money changers in commercial areas like Makati, Ermita, and Cebu often offer rates closer to the BSP reference rate. Digital services like Wise, Remitly, and GCash International Remittance may also provide competitive rates with lower fees.",
  },
  {
    question:
      "Why is the exchange rate I get at my bank different from the BSP rate?",
    answer:
      "Banks add a spread (markup) on top of the BSP reference rate to cover their costs and earn a margin. The buying rate (when you sell USD) is typically lower than the BSP rate, while the selling rate (when you buy USD) is higher. This spread varies by bank and transaction amount.",
  },
  {
    question: "How often does the BSP update the USD to PHP exchange rate?",
    answer:
      "The BSP publishes its reference exchange rate once per business day, typically in the afternoon after PDS trading closes. Rates are not published on weekends and Philippine holidays. Market rates at banks and money changers may fluctuate throughout the day.",
  },
  {
    question: "Is it better to exchange dollars in the Philippines or abroad?",
    answer:
      "In most cases, you get a better rate exchanging USD to PHP inside the Philippines, especially at licensed money changers in major cities. Exchanging at airports (either in the US or the Philippines) typically gives the worst rates due to high markups. If you are receiving remittances, compare digital transfer services for the best combination of exchange rate and fees.",
  },
];
