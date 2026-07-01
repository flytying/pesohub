#!/usr/bin/env node

/**
 * Headless-browser page fetcher (Playwright chromium).
 *
 * Tavily Extract fetches server HTML, so bank pages that render their rate
 * widgets client-side after hydration come back as nav/ad shells (see #199,
 * #202). For those sources we render the page in a real browser and read the
 * hydrated text instead.
 *
 * Playwright is a heavy, optional dependency. It is loaded via a DYNAMIC import
 * so this module (and the whole updater) still loads when Playwright isn't
 * installed — the cost is paid only when `fetchRendered` is actually called,
 * and a missing install produces a clear, actionable error there.
 */

let chromiumPromise = null;

async function getChromium() {
  if (!chromiumPromise) {
    chromiumPromise = import("playwright")
      .then((m) => m.chromium)
      .catch(() => {
        throw new Error(
          "playwright is not installed. Run `npm i -D playwright && npx playwright install chromium` " +
            "(the update-bank-rates workflow installs it via `npx playwright install --with-deps chromium`)."
        );
      });
  }
  return chromiumPromise;
}

/**
 * Render a URL in headless chromium and return its visible text.
 *
 * Never throws to the caller: on any failure (launch, navigation, timeout) it
 * logs and returns null so a source can fall back to preserving existing data.
 * The one exception surfaced is "playwright not installed", which is a
 * configuration error worth seeing loudly in logs — it is caught here too and
 * returned as null, with the message logged.
 *
 * @param {string} url
 * @param {object} [options]
 * @param {string} [options.waitForSelector] - CSS selector to await before reading
 * @param {number} [options.timeoutMs=30000]
 * @returns {Promise<{ url: string, rawContent: string, fetchedAt: string } | null>}
 */
export async function fetchRendered(url, options = {}) {
  const { waitForSelector, timeoutMs = 30000 } = options;

  let browser = null;
  try {
    const chromium = await getChromium();
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
        "(KHTML, like Gecko) Chrome/125.0 Safari/537.36",
    });

    await page.goto(url, { waitUntil: "networkidle", timeout: timeoutMs });
    if (waitForSelector) {
      await page.waitForSelector(waitForSelector, { timeout: timeoutMs }).catch(() => {});
    }

    const rawContent = await page.evaluate(() => document.body.innerText);
    return { url, rawContent, fetchedAt: new Date().toISOString() };
  } catch (err) {
    console.warn(`  ⚠ Rendered fetch failed for ${url}: ${err.message}`);
    return null;
  } finally {
    if (browser) await browser.close().catch(() => {});
  }
}
