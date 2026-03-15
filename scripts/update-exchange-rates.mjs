#!/usr/bin/env node

/**
 * Fetches the latest USD/PHP exchange rate and updates the data file.
 * Used by GitHub Actions cron to keep rates current.
 *
 * API: https://open.er-api.com/v6/latest/USD (free, no key required)
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = resolve(
  __dirname,
  "../src/data/rates/exchange-rates.ts"
);

async function fetchRate() {
  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  if (!res.ok) {
    throw new Error(`API returned ${res.status}: ${res.statusText}`);
  }
  const data = await res.json();
  if (data.result !== "success") {
    throw new Error(`API error: ${data["error-type"] || "unknown"}`);
  }
  const phpRate = data.rates?.PHP;
  if (!phpRate) {
    throw new Error("PHP rate not found in API response");
  }
  return Math.round(phpRate * 100) / 100; // Round to 2 decimal places
}

function getTodayDate() {
  // Format as YYYY-MM-DD in Philippine Time (UTC+8)
  const now = new Date();
  const pht = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  return pht.toISOString().split("T")[0];
}

function isWeekend() {
  const now = new Date();
  const pht = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  const day = pht.getUTCDay();
  return day === 0 || day === 6; // Sunday or Saturday
}

function generateFileContent(today, newRate, change, historicalRates, faqs) {
  const historicalLines = historicalRates
    .map(
      (r) =>
        `  { date: "${r.date}", rate: ${r.rate}, change: ${r.change} },`
    )
    .join("\n");

  return `import type { FAQ } from "@/types/content";

export const EXCHANGE_RATE_SOURCE = "Bangko Sentral ng Pilipinas (BSP)";

export const USD_PHP_UPDATED_AT = "${today}";

export interface ExchangeRateEntry {
  date: string;
  rate: number;
  change: number;
}

/**
 * Current BSP reference rate for USD to PHP.
 */
export const currentRate: ExchangeRateEntry = {
  date: "${today}",
  rate: ${newRate},
  change: ${change},
};

/**
 * Historical BSP reference rates for the last 7 business days.
 */
export const historicalRates: ExchangeRateEntry[] = [
${historicalLines}
];

${faqs}
`;
}

function extractFaqs(content) {
  // Extract everything from "export const exchangeRateFaqs" to end of file
  const faqMatch = content.match(
    /(export const exchangeRateFaqs[\s\S]*)/
  );
  return faqMatch ? faqMatch[1].trimEnd() : "";
}

function extractHistoricalRates(content) {
  const rates = [];
  const rateRegex =
    /\{\s*date:\s*"([^"]+)",\s*rate:\s*([\d.]+),\s*change:\s*(-?[\d.]+)\s*\}/g;

  // Find the historicalRates array section
  const histSection = content.match(
    /export const historicalRates[\s\S]*?\[([^\]]*)\]/
  );
  if (!histSection) return rates;

  let match;
  while ((match = rateRegex.exec(histSection[1])) !== null) {
    rates.push({
      date: match[1],
      rate: parseFloat(match[2]),
      change: parseFloat(match[3]),
    });
  }
  return rates;
}

function extractCurrentRate(content) {
  const match = content.match(
    /export const currentRate[\s\S]*?rate:\s*([\d.]+)/
  );
  return match ? parseFloat(match[1]) : null;
}

async function main() {
  // Skip weekends — BSP doesn't publish rates
  if (isWeekend()) {
    console.log("Skipping: weekend (no BSP rate published).");
    process.exit(0);
  }

  const today = getTodayDate();

  // Read current data file
  const content = readFileSync(DATA_FILE, "utf-8");
  const previousRate = extractCurrentRate(content);
  const historicalRates = extractHistoricalRates(content);
  const faqs = extractFaqs(content);

  // Check if already updated today
  if (historicalRates.length > 0 && historicalRates[0].date === today) {
    console.log(`Already updated for ${today}. Skipping.`);
    process.exit(0);
  }

  // Fetch new rate
  let newRate;
  try {
    newRate = await fetchRate();
  } catch (err) {
    console.error(`Failed to fetch rate: ${err.message}`);
    process.exit(1);
  }

  console.log(`Fetched USD/PHP rate: ${newRate} (previous: ${previousRate})`);

  // Calculate change
  const change =
    previousRate !== null
      ? Math.round((newRate - previousRate) * 100) / 100
      : 0;

  // Build new historical rates: prepend today, keep last 7
  const newHistorical = [
    { date: today, rate: newRate, change },
    ...historicalRates,
  ].slice(0, 7);

  // Generate updated file
  const newContent = generateFileContent(
    today,
    newRate,
    change,
    newHistorical,
    faqs
  );

  writeFileSync(DATA_FILE, newContent, "utf-8");
  console.log(
    `Updated exchange-rates.ts: ${newRate} PHP/USD (change: ${change >= 0 ? "+" : ""}${change})`
  );
}

main();
