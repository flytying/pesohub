import type { FAQ } from "@/types/content";

export const BSP_EXCHANGE_RATE_UPDATED_AT = "2026-03-14";

export const bspExchangeRateMeta = {
  title: "BSP Exchange Rate Guide",
  metaTitle: "BSP Exchange Rate Guide — How the Philippine Peso Rate Is Set",
  metaDescription:
    "Understand how the Bangko Sentral ng Pilipinas (BSP) sets the USD/PHP reference exchange rate. Learn about the PDS, bank spreads, and where to find official rates.",
  slug: "government/bsp/bsp-exchange-rate-guide",
  directAnswer:
    "The BSP reference exchange rate is the weighted average USD/PHP rate from trades in the Philippine Dealing System (PDS). It is published every business day and serves as the official benchmark. Banks add their own spread on top of this rate, which is why the rate you get at a bank differs from the BSP reference rate.",
};

export const keyFacts = [
  { label: "Official Name", value: "BSP Reference Exchange Rate Bulletin" },
  { label: "Based On", value: "Philippine Dealing System (PDS) weighted average" },
  { label: "Published", value: "Every business day (Mon-Fri, excluding holidays)" },
  { label: "Currency Pairs", value: "Primarily USD/PHP; also EUR, JPY, GBP, and others" },
  { label: "Used For", value: "Official benchmark for government, banking, and commercial transactions" },
];

export const bankSpreadExamples = [
  { type: "BSP Reference Rate", buyRate: "56.50", sellRate: "56.50", spread: "—" },
  { type: "Major Bank (typical)", buyRate: "56.00", sellRate: "57.00", spread: "PHP 1.00" },
  { type: "Money Changer (typical)", buyRate: "56.30", sellRate: "56.70", spread: "PHP 0.40" },
  { type: "Digital Remittance", buyRate: "56.35", sellRate: "56.65", spread: "PHP 0.30" },
];

export const bspExchangeRateFaqs: FAQ[] = [
  {
    question: "What is the Philippine Dealing System (PDS)?",
    answer:
      "The Philippine Dealing System (PDS) is the electronic trading platform where banks and authorized financial institutions trade foreign currencies. The BSP uses the weighted average of USD/PHP trades on the PDS to compute the daily reference exchange rate.",
  },
  {
    question: "Why is the BSP rate different from what I get at the bank?",
    answer:
      "Banks add a spread (markup) to the BSP reference rate to cover operating costs and earn a margin. When you buy USD, you pay more than the BSP rate (sell rate). When you sell USD, you receive less than the BSP rate (buy rate). This spread varies by bank and transaction size.",
  },
  {
    question: "Where can I find the official BSP exchange rate?",
    answer:
      "The official BSP reference rate is published daily on the BSP website (www.bsp.gov.ph) under the Treasury Department section. You can also view it on our USD to PHP Exchange Rate page, which sources data from the BSP.",
  },
  {
    question: "Does the BSP control the exchange rate?",
    answer:
      "The Philippines has a market-determined exchange rate system. The BSP does not fix the rate but may intervene in the foreign exchange market to smooth out excessive volatility. The rate is primarily driven by supply and demand for foreign currencies.",
  },
  {
    question: "What time is the BSP exchange rate published?",
    answer:
      "The BSP reference rate is typically published in the afternoon after PDS trading closes, usually around 4:00 PM Philippine time. The rate reflects the weighted average of all USD/PHP trades during that business day.",
  },
];
