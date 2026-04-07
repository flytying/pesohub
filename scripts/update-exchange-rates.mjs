#!/usr/bin/env node

/**
 * Fetches the latest USD/PHP exchange rate data from BSP and updates
 * src/data/rates/exchange-rates.ts using targeted find-and-replace.
 *
 * Two independent data pipelines (either can fail without blocking the other):
 *  1. RERB PDF  → currentRate, historicalRates, USD_PHP_UPDATED_AT
 *  2. Exchange Rate API (Group 3) → bspRateDetails (buying, selling, PDS, SDR, gold, silver)
 *
 * Source: https://www.bsp.gov.ph/SitePages/Statistics/ExchangeRate.aspx
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
const BSP_EXCHANGE_RATE_API =
  "https://www.bsp.gov.ph/_api/web/lists/getbytitle('Exchange Rate')/items";
const BSP_BASE_URL = "https://www.bsp.gov.ph";
const FETCH_TIMEOUT = 15_000;

// ── Date helpers ──────────────────────────────────────────────────

function getTodayDate() {
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
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const [y, m, d] = dateStr.split("-");
  return `${d}${months[parseInt(m) - 1]}${y}`;
}

const MONTH_MAP = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

function parseBspDate(bspDateStr) {
  const match = bspDateStr.match(/(\d{2})-([A-Za-z]{3})-(\d{4})/);
  if (!match) return null;
  const [, day, monthStr, year] = match;
  const month = MONTH_MAP[monthStr.charAt(0).toUpperCase() + monthStr.slice(1).toLowerCase()];
  if (!month) return null;
  return `${year}-${month}-${day}`;
}

// ── Number parsing ────────────────────────────────────────────────

function parseFormattedNumber(value) {
  if (typeof value === "number") return value;
  const cleaned = String(value)
    .replace(/,/g, "")
    .replace(/\s*\/SDR\s*$/i, "")
    .trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

// ── BSP RERB PDF fetching (Pipeline 1) ───────────────────────────

async function fetchPdfUrl(bspDate) {
  const url = `${BSP_API_BASE}?$filter=Title%20eq%20'${bspDate}'&$expand=AttachmentFiles&$top=1`;
  const res = await fetch(url, {
    headers: { Accept: "application/json;odata=verbose" },
    signal: AbortSignal.timeout(FETCH_TIMEOUT),
  });

  if (!res.ok) {
    throw new Error(`BSP API returned ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  const items = data.d?.results;

  if (!items || items.length === 0) {
    return null;
  }

  const files = items[0].AttachmentFiles?.results;
  if (!files || files.length === 0) {
    throw new Error(`RERB item found for ${bspDate} but has no PDF attachment`);
  }

  return `${BSP_BASE_URL}${files[0].ServerRelativeUrl}`;
}

async function downloadAndParsePdf(pdfUrl) {
  const res = await fetch(pdfUrl, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT),
  });
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
  const match = pdfText.match(
    /BSP Reference Rate:\s*PHP\s+([\d.]+)/
  );
  if (!match) {
    throw new Error("Could not find BSP Reference Rate in PDF text");
  }
  return parseFloat(match[1]);
}

async function fetchRate() {
  const today = getTodayDate();
  const bspDate = formatBSPDate(today);

  console.log(`[RERB] Querying BSP RERB for ${bspDate}...`);

  const pdfUrl = await fetchPdfUrl(bspDate);
  if (!pdfUrl) {
    console.log(`[RERB] No RERB published for ${bspDate} (possible holiday).`);
    return null;
  }

  console.log(`[RERB] Downloading PDF: ${pdfUrl}`);
  const pdfText = await downloadAndParsePdf(pdfUrl);

  const rate = extractBSPReferenceRate(pdfText);
  console.log(`[RERB] Extracted BSP Reference Rate: ${rate} PHP/USD`);

  return Math.round(rate * 100) / 100;
}

// ── BSP Exchange Rate API fetching (Pipeline 2) ──────────────────

function parseBspRateItems(items) {
  const details = {
    buyingRate: null,
    sellingRate: null,
    referenceRate: null,
    pdsClosingRate: null,
    pdsClosingDate: null,
    sdrRate: null,
    goldBuying: null,
    silverBuying: null,
  };

  for (const item of items) {
    const unit = item.Unit || "";
    const value = item.PHPequivalent;

    if (unit.includes("Buying Rate")) {
      details.buyingRate = parseFormattedNumber(value);
    } else if (unit.includes("Selling Rate")) {
      details.sellingRate = parseFormattedNumber(value);
    } else if (unit.includes("Reference Rate")) {
      details.referenceRate = parseFormattedNumber(value);
    } else if (unit.includes("PDS Closing")) {
      details.pdsClosingRate = parseFormattedNumber(value);
      const dateMatch = unit.match(/\((\d{2}-[A-Za-z]{3}-\d{4})\)/);
      if (dateMatch) {
        details.pdsClosingDate = parseBspDate(dateMatch[1]);
      }
    } else if (unit.toUpperCase().includes("SDR")) {
      details.sdrRate = parseFormattedNumber(value);
    } else if (unit.toUpperCase().includes("GOLD")) {
      details.goldBuying = parseFormattedNumber(value);
    } else if (unit.toUpperCase().includes("SILVER")) {
      details.silverBuying = parseFormattedNumber(value);
    }
  }

  return details;
}

function validateBspRateDetails(details) {
  const checks = [
    [details.buyingRate, "buyingRate", 30, 100],
    [details.sellingRate, "sellingRate", 30, 100],
    [details.referenceRate, "referenceRate", 30, 100],
    [details.pdsClosingRate, "pdsClosingRate", 30, 100],
    [details.sdrRate, "sdrRate", 0.5, 3.0],
    [details.goldBuying, "goldBuying", 500, 15000],
    [details.silverBuying, "silverBuying", 5, 200],
  ];

  for (const [value, name, min, max] of checks) {
    if (value === null || value === undefined) {
      console.warn(`[ExRate] Validation failed: ${name} is null`);
      return false;
    }
    if (value < min || value > max) {
      console.warn(`[ExRate] Validation failed: ${name}=${value} outside range [${min}, ${max}]`);
      return false;
    }
  }

  if (details.pdsClosingDate === null || !/^\d{4}-\d{2}-\d{2}$/.test(details.pdsClosingDate)) {
    console.warn(`[ExRate] Validation failed: pdsClosingDate is invalid: ${details.pdsClosingDate}`);
    return false;
  }

  if (details.buyingRate >= details.sellingRate) {
    console.warn(`[ExRate] Validation failed: buyingRate (${details.buyingRate}) >= sellingRate (${details.sellingRate})`);
    return false;
  }

  return true;
}

async function fetchBspRateDetails() {
  const params = new URLSearchParams({
    $filter: "Group eq '3'",
    $select: "Title,Unit,Symbol,PHPequivalent,PublishedDate",
    $orderby: "Ordering asc",
  });

  const url = `${BSP_EXCHANGE_RATE_API}?${params}`;
  console.log("[ExRate] Fetching BSP Exchange Rate details...");

  const res = await fetch(url, {
    headers: { Accept: "application/json;odata=verbose" },
    signal: AbortSignal.timeout(FETCH_TIMEOUT),
  });

  if (!res.ok) {
    throw new Error(`Exchange Rate API returned ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  const items = data.d?.results;

  if (!items || items.length === 0) {
    throw new Error("Exchange Rate API returned no Group 3 items");
  }

  console.log(`[ExRate] Received ${items.length} Group 3 items`);

  const details = parseBspRateItems(items);

  if (!validateBspRateDetails(details)) {
    throw new Error("BSP rate details failed validation (see warnings above)");
  }

  console.log(`[ExRate] Parsed: buying=${details.buyingRate}, selling=${details.sellingRate}, ref=${details.referenceRate}, PDS=${details.pdsClosingRate} (${details.pdsClosingDate}), SDR=${details.sdrRate}, gold=${details.goldBuying}, silver=${details.silverBuying}`);

  return details;
}

// ── Targeted update helpers ──────────────────────────────────────

function extractCurrentRate(content) {
  const match = content.match(
    /export const currentRate[\s\S]*?rate:\s*([\d.]+)/
  );
  return match ? parseFloat(match[1]) : null;
}

function extractHistoricalRates(content) {
  const rates = [];
  const rateRegex =
    /\{\s*date:\s*"([^"]+)",\s*rate:\s*([\d.]+),\s*change:\s*(-?[\d.]+)\s*\}/g;

  const histSection = content.match(
    /export const historicalRates:\s*ExchangeRateEntry\[\]\s*=\s*\[([^\]]*)\]/
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

/**
 * Replace a specific value in the file content using a regex pattern.
 * Returns the updated content string.
 */
function replaceInFile(content, pattern, replacement) {
  const updated = content.replace(pattern, replacement);
  if (updated === content) {
    console.warn(`Warning: pattern did not match anything: ${pattern}`);
  }
  return updated;
}

/**
 * Apply targeted updates for currentRate, historicalRates, USD_PHP_UPDATED_AT.
 */
function applyRateUpdates(content, today, newRate, change, newHistorical) {
  let updated = content;

  updated = replaceInFile(
    updated,
    /export const USD_PHP_UPDATED_AT = "[^"]+"/,
    `export const USD_PHP_UPDATED_AT = "${today}"`
  );

  const newCurrentRate = `export const currentRate: ExchangeRateEntry = {
  date: "${today}",
  rate: ${newRate},
  change: ${change},
}`;
  updated = replaceInFile(
    updated,
    /export const currentRate: ExchangeRateEntry = \{[^}]+\}/,
    newCurrentRate
  );

  const historicalLines = newHistorical
    .map(
      (r) =>
        `  { date: "${r.date}", rate: ${r.rate}, change: ${r.change} },`
    )
    .join("\n");

  const newHistoricalBlock = `export const historicalRates: ExchangeRateEntry[] = [\n${historicalLines}\n]`;
  updated = replaceInFile(
    updated,
    /export const historicalRates: ExchangeRateEntry\[\] = \[[^\]]*\]/,
    newHistoricalBlock
  );

  return updated;
}

/**
 * Apply targeted update for bspRateDetails.
 */
function applyBspRateDetailsUpdate(content, details) {
  const newBlock = `export const bspRateDetails: BSPRateDetails = {
  buyingRate: ${details.buyingRate},
  sellingRate: ${details.sellingRate},
  referenceRate: ${details.referenceRate},
  pdsClosingRate: ${details.pdsClosingRate},
  pdsClosingDate: "${details.pdsClosingDate}",
  sdrRate: ${details.sdrRate},
  goldBuying: ${details.goldBuying},
  silverBuying: ${details.silverBuying},
}`;

  return replaceInFile(
    content,
    /export const bspRateDetails: BSPRateDetails = \{[^}]+\}/,
    newBlock
  );
}

// ── Main ──────────────────────────────────────────────────────────

async function main() {
  if (isWeekend()) {
    console.log("Skipping: weekend (no BSP rate published).");
    process.exit(0);
  }

  const today = getTodayDate();

  // Read current data file
  const content = readFileSync(DATA_FILE, "utf-8");
  const previousRate = extractCurrentRate(content);
  const historicalRates = extractHistoricalRates(content);

  // Check if already updated today
  if (historicalRates.length > 0 && historicalRates[0].date === today) {
    console.log(`Already updated for ${today}. Skipping.`);
    process.exit(0);
  }

  // Fetch both data sources concurrently (independent pipelines)
  const [rateResult, detailsResult] = await Promise.allSettled([
    fetchRate(),
    fetchBspRateDetails(),
  ]);

  const newRate = rateResult.status === "fulfilled" ? rateResult.value : null;
  const bspDetails = detailsResult.status === "fulfilled" ? detailsResult.value : null;

  if (rateResult.status === "rejected") {
    console.error(`[RERB] Failed: ${rateResult.reason.message}`);
  }
  if (detailsResult.status === "rejected") {
    console.error(`[ExRate] Failed: ${detailsResult.reason.message}`);
  }

  // If both pipelines failed or returned no data, exit
  if (newRate === null && bspDetails === null) {
    if (rateResult.status === "rejected" || detailsResult.status === "rejected") {
      console.error("Both data pipelines failed. Exiting with error.");
      process.exit(1);
    }
    console.log("No new data available (possible holiday). Skipping.");
    process.exit(0);
  }

  let updated = content;

  // Pipeline 1: Update reference rate + historical rates
  if (newRate !== null) {
    console.log(`Fetched USD/PHP rate: ${newRate} (previous: ${previousRate})`);

    const change =
      previousRate !== null
        ? Math.round((newRate - previousRate) * 100) / 100
        : 0;

    const newHistorical = [
      { date: today, rate: newRate, change },
      ...historicalRates,
    ].slice(0, 7);

    updated = applyRateUpdates(updated, today, newRate, change, newHistorical);
    console.log(`[RERB] Applied: ${newRate} PHP/USD (change: ${change >= 0 ? "+" : ""}${change})`);
  }

  // Pipeline 2: Update BSP rate details
  if (bspDetails !== null) {
    updated = applyBspRateDetailsUpdate(updated, bspDetails);
    console.log("[ExRate] Applied: bspRateDetails updated");
  }

  writeFileSync(DATA_FILE, updated, "utf-8");
  console.log("exchange-rates.ts updated successfully.");
}

main();
