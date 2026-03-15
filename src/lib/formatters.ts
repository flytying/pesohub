/**
 * Format a number as Philippine Peso (e.g., "PHP 1,234,567.89")
 */
export function formatPeso(value: number, decimals = 2): string {
  return `₱${value.toLocaleString("en-PH", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

/**
 * Format a number with commas (e.g., "1,234,567")
 */
export function formatNumber(value: number, decimals = 0): string {
  return value.toLocaleString("en-PH", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format a number as a percentage (e.g., "6.50%")
 */
export function formatPercent(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format a date string for display (e.g., "March 14, 2026")
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
