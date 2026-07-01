#!/usr/bin/env node

/**
 * Data validation for YMYL financial data updates.
 * Compares extracted data against current data and flags anomalies.
 */

/**
 * @typedef {object} ValidationResult
 * @property {boolean} isValid - Whether the data is safe to write
 * @property {Array<{ field: string, message: string }>} changes - Detected changes
 * @property {Array<{ level: "warn" | "error", message: string }>} warnings - Validation warnings
 */

/**
 * Validate rate changes for bank savings/deposit data.
 *
 * @param {Array<object>} currentData - Current data array from the TS file
 * @param {Array<object>} newData - Newly extracted data
 * @param {object} options
 * @param {string} options.nameField - Field name used to identify entries (e.g., "bankName")
 * @param {string[]} options.rateFields - Fields containing rate values to validate
 * @param {number} [options.maxRateChangePercent=50] - Maximum allowed % change before flagging
 * @returns {ValidationResult}
 */
export function validateRateChanges(currentData, newData, options) {
  const {
    nameField,
    rateFields,
    maxRateChangePercent = 50,
  } = options;

  const changes = [];
  const warnings = [];

  // Check for empty extraction
  if (!newData || newData.length === 0) {
    return {
      isValid: false,
      changes: [],
      warnings: [
        { level: "error", message: "Extraction returned empty data. Keeping current data." },
      ],
    };
  }

  // Build lookup of current data by name
  const currentByName = new Map();
  for (const item of currentData) {
    const key = item[nameField];
    if (!currentByName.has(key)) currentByName.set(key, []);
    currentByName.get(key).push(item);
  }

  const newByName = new Map();
  for (const item of newData) {
    const key = item[nameField];
    if (!newByName.has(key)) newByName.set(key, []);
    newByName.get(key).push(item);
  }

  // Check for removed entries
  for (const name of currentByName.keys()) {
    if (!newByName.has(name)) {
      warnings.push({
        level: "warn",
        message: `${name} was removed (not found in new data). Verify this is intentional.`,
      });
    }
  }

  // Check for added entries
  for (const name of newByName.keys()) {
    if (!currentByName.has(name)) {
      changes.push({
        field: name,
        message: `New entry added: ${name}`,
      });
    }
  }

  // Check rate magnitude for existing entries
  for (const [name, newItems] of newByName) {
    const currentItems = currentByName.get(name);
    if (!currentItems) continue;

    for (const rateField of rateFields) {
      for (const newItem of newItems) {
        const newRate = newItem[rateField];
        if (newRate == null || newRate === 0) continue;

        // Find matching current item
        const currentItem = currentItems.find(
          (c) => c[nameField] === newItem[nameField]
        );
        if (!currentItem) continue;

        const currentRate = currentItem[rateField];
        if (currentRate == null || currentRate === 0) continue;

        if (newRate !== currentRate) {
          const pctChange = Math.abs(
            ((newRate - currentRate) / currentRate) * 100
          );
          changes.push({
            field: `${name}.${rateField}`,
            message: `${currentRate} → ${newRate} (${pctChange.toFixed(1)}% change)`,
          });

          if (pctChange > maxRateChangePercent) {
            warnings.push({
              level: "warn",
              message: `Large rate change for ${name}.${rateField}: ${currentRate} → ${newRate} (${pctChange.toFixed(1)}%). Verify manually.`,
            });
          }
        }

        // Reject negative rates
        if (newRate < 0) {
          warnings.push({
            level: "error",
            message: `Negative rate detected for ${name}.${rateField}: ${newRate}. Rejecting.`,
          });
        }
      }
    }
  }

  const hasErrors = warnings.some((w) => w.level === "error");

  return {
    isValid: !hasErrors,
    changes,
    warnings,
  };
}

/**
 * Phrases that signal the AI guessed or hedged a value instead of reading a
 * real one off the page. Rows with any of these in a string field are dropped:
 * they produce un-mergeable PRs (see closed #110 — "rate inferred from
 * context", "Rate assumed consistent…", "treat with caution", "<UNKNOWN>").
 * Kept deliberately tight so legitimate "no minimum balance stated" notes,
 * which describe a real absence, are NOT matched.
 */
export const HEDGE_PATTERNS = [
  /<unknown>/i,
  /\binferred\b/i,
  /\bassumed\b/i,
  /treat with caution/i,
];

/**
 * True if the text contains any rate-like signal (a percentage or a "p.a." /
 * "per annum" phrase). Bank homepages that render rates only in-app or via JS
 * come back from Tavily as nav/ad/cookie copy with NO such token — extracting
 * a "rate" from that text is always a hallucination (see closed #199, where a
 * phantom "6% hero rate" was invented from a Credit Builder ad). Callers use
 * this to reject a whole bank's extraction as no-data (preserve existing).
 *
 * @param {string} text
 * @returns {boolean}
 */
export function hasRateSignal(text) {
  if (!text || typeof text !== "string") return false;
  return (
    /\d+(?:\.\d+)?\s*%/.test(text) ||
    /\bp\.?\s?a\.?\b/i.test(text) ||
    /per\s?annum/i.test(text)
  );
}

/** Acceptable string forms of a numeric rate value, e.g. 4.5 → 4.5, 4.50. */
function rateForms(value) {
  const forms = new Set([String(value)]);
  if (Number.isInteger(value)) {
    forms.add(`${value}.0`);
    forms.add(`${value}.00`);
  } else {
    forms.add(`${value}0`); // one extra trailing zero, e.g. 4.5 → 4.50
  }
  return [...forms];
}

/**
 * True if `value` appears in `text` AS A RATE — i.e. the exact number (not a
 * substring of a larger number like 2026 or 16) immediately followed by a rate
 * indicator (%, p.a., per annum). Requiring the indicator is deliberate: a bare
 * "6" occurs all over ad copy, which is exactly how #199 slipped through.
 */
function valueIsGrounded(value, text) {
  const indicator = "\\s*(?:%|p\\.?\\s?a\\.?|per\\s?annum)";
  return rateForms(value).some((form) => {
    const num = form.replace(/\./g, "\\.");
    const re = new RegExp(`(?<![\\d.])${num}(?![\\d])${indicator}`, "i");
    return re.test(text);
  });
}

/**
 * Anti-hallucination guard. Drops any row whose extracted rate value does not
 * literally appear as a rate in the source text. A row is kept only when every
 * non-null rate value it carries is grounded AND it carries at least one. This
 * is the direct fix for #199: an invented value that isn't in the page text is
 * rejected before it can be written or flagged.
 *
 * @param {Array<object>} rows
 * @param {string} sourceText - the raw fetched text the rows were extracted from
 * @param {object} options
 * @param {string[]} options.rateFields - numeric fields that must be grounded
 * @returns {{ valid: Array<object>, dropped: number, ungrounded: Array<{ row: object, field: string, value: number }> }}
 */
export function filterGroundedRows(rows, sourceText, options = {}) {
  const { rateFields = [] } = options;
  const valid = [];
  const ungrounded = [];
  let dropped = 0;

  for (const row of rows) {
    const values = rateFields
      .map((f) => ({ field: f, value: row[f] }))
      .filter((x) => typeof x.value === "number" && Number.isFinite(x.value) && x.value !== 0);

    if (values.length === 0) {
      dropped++;
      ungrounded.push({ row, field: rateFields[0] ?? "", value: NaN });
      continue;
    }

    const bad = values.find((x) => !valueIsGrounded(x.value, sourceText));
    if (bad) {
      dropped++;
      ungrounded.push({ row, field: bad.field, value: bad.value });
    } else {
      valid.push(row);
    }
  }

  return { valid, dropped, ungrounded };
}

/**
 * Filter out rows that are missing required fields or contain hedged/guessed
 * values. Used to clean AI-extracted rate data before the merge + circuit-
 * breaker step, so that a single bad row from Claude doesn't fail an
 * otherwise-valid bank.
 *
 * @param {Array<object>} rows
 * @param {object} options
 * @param {string[]} [options.requiredStringFields]
 * @param {string[]} [options.requiredNumberFields]
 * @param {RegExp[]} [options.hedgePatterns=HEDGE_PATTERNS] - drop rows whose
 *   string fields match any of these (set to [] to disable)
 * @returns {{ valid: Array<object>, dropped: number }}
 */
export function filterValidRows(rows, options = {}) {
  const {
    requiredStringFields = [],
    requiredNumberFields = [],
    hedgePatterns = HEDGE_PATTERNS,
  } = options;

  const valid = [];
  let dropped = 0;

  for (const row of rows) {
    let ok = true;

    for (const field of requiredStringFields) {
      const val = row[field];
      if (val == null || (typeof val === "string" && val.trim() === "")) {
        ok = false;
        break;
      }
    }

    if (ok) {
      for (const field of requiredNumberFields) {
        const val = row[field];
        if (
          val == null ||
          typeof val !== "number" ||
          !Number.isFinite(val) ||
          val <= 0
        ) {
          ok = false;
          break;
        }
      }
    }

    // Drop rows where any string field shows the AI hedged/guessed the value.
    if (ok && hedgePatterns.length > 0) {
      for (const val of Object.values(row)) {
        if (typeof val === "string" && hedgePatterns.some((re) => re.test(val))) {
          ok = false;
          break;
        }
      }
    }

    if (ok) valid.push(row);
    else dropped++;
  }

  return { valid, dropped };
}

/**
 * Circuit breaker: block writes when extracted data shows signs of corruption
 * or incomplete extraction (large row drop, empty required fields, etc.).
 *
 * This prevents the data updater from publishing data when the AI extraction
 * partially failed — e.g., only 1 of 10 banks succeeded, or rows have
 * undefined/empty values that would break TypeScript compilation.
 *
 * @param {Array<object>} currentData - Current data array from the TS file
 * @param {Array<object>} newData - Newly extracted data
 * @param {object} options
 * @param {string[]} [options.requiredStringFields=[]] - Fields that must be non-empty strings
 * @param {string[]} [options.requiredNumberFields=[]] - Fields that must be finite numbers > 0
 * @param {number} [options.maxRowDropPercent=30] - Max % of rows that can disappear vs current
 * @param {number} [options.minRows=3] - Absolute minimum row count to accept
 * @returns {ValidationResult}
 */
export function validateDataIntegrity(currentData, newData, options = {}) {
  const {
    requiredStringFields = [],
    requiredNumberFields = [],
    maxRowDropPercent = 30,
    minRows = 3,
  } = options;

  const warnings = [];

  // Check 1: minimum absolute row count
  if (newData.length < minRows) {
    warnings.push({
      level: "error",
      message: `CIRCUIT BREAKER: Only ${newData.length} rows extracted (minimum: ${minRows}). Likely partial extraction failure. Rejecting.`,
    });
  }

  // Check 2: row count drop vs current
  if (currentData.length > 0) {
    const dropPercent = ((currentData.length - newData.length) / currentData.length) * 100;
    if (dropPercent > maxRowDropPercent) {
      warnings.push({
        level: "error",
        message: `CIRCUIT BREAKER: Row count dropped ${dropPercent.toFixed(1)}% (${currentData.length} → ${newData.length}). Threshold: ${maxRowDropPercent}%. Likely incomplete extraction. Rejecting.`,
      });
    }
  }

  // Check 3: required string fields must be non-empty
  let badStringRows = 0;
  for (const row of newData) {
    for (const field of requiredStringFields) {
      const val = row[field];
      if (val == null || (typeof val === "string" && val.trim() === "")) {
        badStringRows++;
        break;
      }
    }
  }
  if (badStringRows > 0) {
    warnings.push({
      level: "error",
      message: `CIRCUIT BREAKER: ${badStringRows}/${newData.length} rows have empty required string fields (${requiredStringFields.join(", ")}). Rejecting.`,
    });
  }

  // Check 4: required numeric fields must be finite numbers > 0
  let badNumberRows = 0;
  for (const row of newData) {
    for (const field of requiredNumberFields) {
      const val = row[field];
      if (val == null || typeof val !== "number" || !Number.isFinite(val) || val <= 0) {
        badNumberRows++;
        break;
      }
    }
  }
  if (badNumberRows > 0) {
    warnings.push({
      level: "error",
      message: `CIRCUIT BREAKER: ${badNumberRows}/${newData.length} rows have invalid required numeric fields (${requiredNumberFields.join(", ")}). Rejecting.`,
    });
  }

  const hasErrors = warnings.some((w) => w.level === "error");
  return {
    isValid: !hasErrors,
    changes: [],
    warnings,
  };
}

/**
 * Validate government data changes (contribution tables, tax brackets, etc.).
 * Any change to government data is flagged as a potential policy change.
 *
 * Compares ONLY the fields the scraper actually extracted (non-null). Many
 * government pages render their tables as images, so Claude returns null for
 * fields it can't read. A naive whole-object compare treats `null !== 5000`
 * as a change and opens a date-only "noise" PR every run (see closed #104,
 * #173). Skipping null fields means we flag a change only when a value we
 * could actually read differs from the baseline.
 *
 * @param {Array<object>} currentData
 * @param {Array<object>} newData
 * @param {string} sourceName - Name of the data source for messaging
 * @returns {ValidationResult}
 */
export function validateGovernmentData(currentData, newData, sourceName) {
  const changes = [];
  const warnings = [];

  if (!newData || newData.length === 0) {
    return {
      isValid: false,
      changes: [],
      warnings: [
        { level: "error", message: `${sourceName}: Extraction returned empty data. Keeping current data.` },
      ],
    };
  }

  let comparedAnyField = false;
  let differs = false;

  for (let i = 0; i < newData.length; i++) {
    const current = currentData[i] || {};
    const next = newData[i] || {};
    for (const [key, value] of Object.entries(next)) {
      // Skip fields the scraper couldn't read — null means "unknown", not
      // "removed", so a null must never count as a change.
      if (value == null) continue;
      comparedAnyField = true;
      if (JSON.stringify(value) !== JSON.stringify(current[key])) {
        differs = true;
      }
    }
  }

  if (comparedAnyField && differs) {
    changes.push({
      field: sourceName,
      message: "Data has changed. Possible policy update detected.",
    });
    warnings.push({
      level: "warn",
      message: `${sourceName}: Government data changed. This may indicate a policy update. Review carefully.`,
    });
  }

  return {
    isValid: true, // Government changes are flagged but not blocked
    changes,
    warnings,
  };
}
