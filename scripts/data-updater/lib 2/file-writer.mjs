#!/usr/bin/env node

/**
 * TypeScript data file updater.
 * Reads existing .ts files, replaces data sections while preserving
 * imports, interfaces, FAQs, and metadata.
 *
 * Reuses the regex-based extraction pattern from update-exchange-rates.mjs.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "../../..");

/**
 * Get today's date in YYYY-MM-DD format (Philippine Time, UTC+8).
 */
export function getTodayPHT() {
  const now = new Date();
  const pht = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  return pht.toISOString().split("T")[0];
}

/**
 * Read a data file relative to the project root.
 */
export function readDataFile(relativePath) {
  const fullPath = resolve(PROJECT_ROOT, relativePath);
  return readFileSync(fullPath, "utf-8");
}

/**
 * Write a data file relative to the project root.
 */
export function writeDataFile(relativePath, content) {
  const fullPath = resolve(PROJECT_ROOT, relativePath);
  writeFileSync(fullPath, content, "utf-8");
}

/**
 * Extract the FAQ section from a data file.
 * Matches the pattern: export const <name>Faqs ... to end of file.
 *
 * @param {string} content - File content
 * @param {string} faqExportName - The export name (e.g., "savingsRateFaqs")
 * @returns {string} The FAQ section including the export declaration
 */
export function extractFaqSection(content, faqExportName) {
  const regex = new RegExp(`(export const ${faqExportName}[\\s\\S]*)`);
  const match = content.match(regex);
  return match ? match[1].trimEnd() : "";
}

/**
 * Extract everything after a marker comment or export.
 * Useful for files where the "preserve" section starts at a specific point.
 *
 * @param {string} content - File content
 * @param {string} marker - The string that marks the start of the preserved section
 * @returns {string} Everything from the marker to end of file
 */
export function extractFromMarker(content, marker) {
  const idx = content.indexOf(marker);
  if (idx === -1) return "";
  return content.slice(idx).trimEnd();
}

/**
 * Extract the current UPDATED_AT value from a data file.
 *
 * @param {string} content - File content
 * @param {string} exportName - The export name (e.g., "SAVINGS_RATES_UPDATED_AT")
 * @returns {string|null} The date string, or null if not found
 */
export function extractUpdatedAt(content, exportName) {
  const regex = new RegExp(`export const ${exportName}\\s*=\\s*"([^"]+)"`);
  const match = content.match(regex);
  return match ? match[1] : null;
}

/**
 * Update the UPDATED_AT value in file content.
 *
 * @param {string} content - File content
 * @param {string} exportName - The export name
 * @param {string} newDate - New date string (YYYY-MM-DD)
 * @returns {string} Updated file content
 */
export function updateTimestamp(content, exportName, newDate) {
  const regex = new RegExp(
    `(export const ${exportName}\\s*=\\s*")([^"]+)(")`
  );
  return content.replace(regex, `$1${newDate}$3`);
}

/**
 * Replace an exported array in a data file with new content.
 *
 * @param {string} content - File content
 * @param {string} exportName - The export const name (e.g., "bankSavingsRates")
 * @param {string} newArrayContent - The new array content (including the export declaration)
 * @returns {string} Updated file content
 */
export function replaceExportedArray(content, exportName, newArrayContent) {
  // Match from "export const <name>" to the closing "];" (handling nested brackets)
  const regex = new RegExp(
    `export const ${exportName}[^=]*=[\\s\\S]*?\\];`,
    "m"
  );
  return content.replace(regex, newArrayContent);
}

/**
 * Replace an exported constant value in a data file.
 *
 * @param {string} content - File content
 * @param {string} exportName - The export const name
 * @param {string|number} newValue - The new value
 * @returns {string} Updated file content
 */
export function replaceExportedConstant(content, exportName, newValue) {
  const regex = new RegExp(
    `(export const ${exportName}\\s*=\\s*)[^;]+;`
  );
  const formattedValue =
    typeof newValue === "string" ? `"${newValue}"` : String(newValue);
  return content.replace(regex, `$1${formattedValue};`);
}
