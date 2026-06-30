/**
 * Google Search Console client — Search Analytics API.
 *
 * Pulls query-level performance for the PesoHub property so the opportunity
 * finder can spot striking-distance queries, content gaps, and risers.
 *
 * Auth: a Google service account (JWT). The account's email must be added as a
 * user on the Search Console property (Settings → Users and permissions).
 * Unlike the blog agent's optional Langfuse layer, this job REQUIRES creds —
 * missing creds throw a clear, actionable error rather than no-op'ing.
 *
 * Env:
 *   GSC_SERVICE_ACCOUNT_JSON — the service-account key, as raw JSON (a single
 *     GitHub secret). Base64 is also accepted (some secret stores mangle JSON).
 *   GSC_SITE_URL — the property, e.g. "sc-domain:pesohub.ph" (Domain property)
 *     or "https://pesohub.ph/" (URL-prefix property).
 */

import { JWT } from "google-auth-library";

const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const API_BASE = "https://searchconsole.googleapis.com/webmasters/v3/sites";

/** Parse GSC_SERVICE_ACCOUNT_JSON, tolerating raw JSON or base64-wrapped JSON. */
function loadCredentials() {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!raw || !raw.trim()) {
    throw new Error(
      "GSC_SERVICE_ACCOUNT_JSON is not set. Provide the Google service-account " +
        "key JSON (see CLAUDE.md → GSC opportunity finder setup)."
    );
  }
  const text = raw.trim().startsWith("{")
    ? raw
    : Buffer.from(raw, "base64").toString("utf8");
  let creds;
  try {
    creds = JSON.parse(text);
  } catch {
    throw new Error(
      "GSC_SERVICE_ACCOUNT_JSON could not be parsed as JSON (or base64 JSON)."
    );
  }
  if (!creds.client_email || !creds.private_key) {
    throw new Error(
      "GSC_SERVICE_ACCOUNT_JSON is missing client_email / private_key — " +
        "is it a service-account key file?"
    );
  }
  return creds;
}

function siteUrl() {
  const site = process.env.GSC_SITE_URL;
  if (!site || !site.trim()) {
    throw new Error(
      'GSC_SITE_URL is not set. Use e.g. "sc-domain:pesohub.ph" (Domain ' +
        'property) or "https://pesohub.ph/" (URL-prefix property).'
    );
  }
  return site.trim();
}

/** One authorized JWT client, reused across queries. */
let _auth = null;
function authClient() {
  if (!_auth) {
    const creds = loadCredentials();
    _auth = new JWT({
      email: creds.client_email,
      key: creds.private_key,
      scopes: [SCOPE],
    });
  }
  return _auth;
}

/** YYYY-MM-DD for a Date (UTC). */
function ymd(date) {
  return date.toISOString().slice(0, 10);
}

/**
 * Two 28-day windows ending `lagDays` ago (GSC data lags ~2-3 days; default 3).
 * `now` is injected so callers can pass a fixed clock (scripts cannot call
 * Date.now()/new Date() in some harnesses, and it keeps the windows testable).
 *
 * @param {Date} now
 * @param {{windowDays?: number, lagDays?: number}} [opts]
 * @returns {{current: {start: string, end: string}, prior: {start: string, end: string}}}
 */
export function dateWindows(now, { windowDays = 28, lagDays = 3 } = {}) {
  const day = 86400000;
  const end = new Date(now.getTime() - lagDays * day);
  const currentStart = new Date(end.getTime() - (windowDays - 1) * day);
  const priorEnd = new Date(currentStart.getTime() - day);
  const priorStart = new Date(priorEnd.getTime() - (windowDays - 1) * day);
  return {
    current: { start: ymd(currentStart), end: ymd(end) },
    prior: { start: ymd(priorStart), end: ymd(priorEnd) },
  };
}

/**
 * One Search Analytics query. Aggregates by query+page so each row is a
 * (search term, landing page) pair with its metrics for the window.
 *
 * @param {{start: string, end: string}} window
 * @param {{rowLimit?: number}} [opts]
 * @returns {Promise<Array<{query: string, page: string, clicks: number, impressions: number, ctr: number, position: number}>>}
 */
export async function queryWindow(window, { rowLimit = 5000 } = {}) {
  const client = authClient();
  const url = `${API_BASE}/${encodeURIComponent(siteUrl())}/searchAnalytics/query`;
  const body = {
    startDate: window.start,
    endDate: window.end,
    dimensions: ["query", "page"],
    rowLimit,
    dataState: "final",
  };

  const res = await client.request({ url, method: "POST", data: body });
  const rows = res.data?.rows ?? [];
  return rows.map((r) => ({
    query: r.keys[0],
    page: r.keys[1],
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
    ctr: r.ctr ?? 0,
    position: r.position ?? 0,
  }));
}

/**
 * Pull both windows. Returns current + prior rows; detection layer joins them
 * by query to compute week-over-week trend.
 *
 * @param {Date} now
 * @param {{windowDays?: number, lagDays?: number, rowLimit?: number}} [opts]
 */
export async function fetchSearchAnalytics(now, opts = {}) {
  const windows = dateWindows(now, opts);
  const [current, prior] = await Promise.all([
    queryWindow(windows.current, opts),
    queryWindow(windows.prior, opts),
  ]);
  return { windows, current, prior };
}
