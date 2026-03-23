#!/usr/bin/env node

/**
 * Fetches the latest USD/PHP exchange rate from BSP's Daily Reference
 * Exchange Rate Bulletin (RERB) PDF and updates the data file.
 *
 * Source: https://www.bsp.gov.ph/SitePages/Statistics/DailyRERB.aspx
 *
 * Flow:
 *  1. Query BSP's SharePoint API to find today's RERB PDF
 *  2. Download and parse the PDF
 *  3. Extract the BSP Reference Rate for USD/PHP
 *  4. Update src/data/rates/exchange-rates.ts
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { PDFParse } from "pdf-parse";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = resolve(
  __dirname,
  "../src/data/rates/exchange-rates.ts"
);

const BSP_API_BASE =
  "https://www.bsp.gov.ph/_api/web/lists/getbytitle('RERB')/items";
const BSP_BASE_URL = "https://www.bsp.gov.ph";

// ── Date helpers ──────────────────────────────────────────────────

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
  return day === 0 || day === 6;
}

function formatBSPDate(dateStr) {
  // "2026-03-19" → "19Mar2026"
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const [y, m, d] = dateStr.split("-");
  return `${d}${months[parseInt(m) - 1]}${y}`;
}

// ── BSP PDF fetching ──────────────────────────────────────────────

async function fetchPdfUrl(bspDate) {
  const url = `${BSP_API_BASE}?$filter=Title%20eq%20'${bspDate}'&$expand=AttachmentFiles&$top=1`;
  const res = await fetch(url, {
    headers: { Accept: "application/json;odata=verbose" },
  });

  if (!res.ok) {
    throw new Error(`BSP API returned ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  const items = data.d?.results;

  if (!items || items.length === 0) {
    return null; // No RERB published for this date (holiday, etc.)
  }

  const files = items[0].AttachmentFiles?.results;
  if (!files || files.length === 0) {
    throw new Error(`RERB item found for ${bspDate} but has no PDF attachment`);
  }

  return `${BSP_BASE_URL}${files[0].ServerRelativeUrl}`;
}

async function downloadAndParsePdf(pdfUrl) {
  const res = await fetch(pdfUrl);
  if (!res.ok) {
    throw new Error(`PDF download failed: ${res.status} ${res.statusText}`);
  }

  const arrayBuf = await res.arrayBuffer();
  const uint8 = new Uint8Array(arrayBuf);
  const parser = new PDFParse({ data: uint8 });
  const result = await parser.getText();
  return result.text;
}

function extractBSPReferenceRate(pdfText) {
  // Look for "BSP Reference Rate:" line
  // Format: "BSP Reference Rate: \tPHP \t59.500"
  const match = pdfText.match(
    /BSP Reference Rate:\s*PHP\s+([\d.]+)/
  );
  if (!match) {
    throw new Error(
      "Could not find BSP Reference Rate in PDF text"
    );
  }
  return parseFloat(match[1]);
}

async function fetchRate() {
  const today = getTodayDate();
  const bspDate = formatBSPDate(today);

  console.log(`Querying BSP RERB for ${bspDate}...`);

  const pdfUrl = await fetchPdfUrl(bspDate);
  if (!pdfUrl) {
    console.log(`No RERB published for ${bspDate} (possible holiday).`);
    return null;
  }

  console.log(`Downloading PDF: ${pdfUrl}`);
  const pdfText = await downloadAndParsePdf(pdfUrl);

  const rate = extractBSPReferenceRate(pdfText);
  console.log(`Extracted BSP Reference Rate: ${rate} PHP/USD`);

  return Math.round(rate * 100) / 100;
}

// ── File parsing helpers ──────────────────────────────────────────

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
  const faqMatch = content.match(
    /(export const exchangeRateFaqs[\s\S]*)/
  );
  return faqMatch ? faqMatch[1].trimEnd() : "";
}

function extractHistoricalRates(content) {
  const rates = [];
  const rateRegex =
    /\{\s*date:\s*"([^"]+)",\s*rate:\s*([\d.]+),\s*change:\s*(-?[\d.]+)\s*\}/g;

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

// ── Main ──────────────────────────────────────────────────────────

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

  // Fetch new rate from BSP
  let newRate;
  try {
    newRate = await fetchRate();
  } catch (err) {
    console.error(`Failed to fetch rate from BSP: ${err.message}`);
    process.exit(1);
  }

  // No RERB published (holiday) — skip gracefully
  if (newRate === null) {
    process.exit(0);
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
