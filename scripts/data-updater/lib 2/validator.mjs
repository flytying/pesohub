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
 * Validate government data changes (contribution tables, tax brackets, etc.).
 * Any change to government data is flagged as a potential policy change.
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

  // Stringify comparison for detecting any changes
  const currentJson = JSON.stringify(currentData, null, 2);
  const newJson = JSON.stringify(newData, null, 2);

  if (currentJson !== newJson) {
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
