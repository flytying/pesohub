/**
 * PesoHub Email API — Cloudflare Worker
 *
 * Handles two endpoints:
 *   POST /contact   — Contact form submissions (sends to hello@pesohub.ph)
 *   POST /calculator — Calculator results email (sends to user's email)
 */

interface Env {
  FROM_EMAIL: string;
  TO_EMAIL: string;
  ALLOWED_ORIGIN: string;
  RESEND_API_KEY: string;
}

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface CalculatorPayload {
  email: string;
  calculatorType: string;
  results: string;
}

// Cap request bodies — these endpoints only ever receive small JSON payloads.
const MAX_BODY_BYTES = 16 * 1024; // 16KB, matches server/index.mjs

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Security headers mirroring helmet() on the Express server.
const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
};

// Validate a field is a non-empty string within maxLen. Returns trimmed value or null.
function cleanField(value: unknown, maxLen: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maxLen) return null;
  return trimmed;
}

function corsHeaders(origin: string, allowedOrigin: string): HeadersInit {
  const allowed = origin === allowedOrigin || origin === "http://localhost:3000";

  return {
    "Access-Control-Allow-Origin": allowed ? origin : allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function jsonResponse(
  data: Record<string, unknown>,
  status: number,
  origin: string,
  allowedOrigin: string
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...SECURITY_HEADERS,
      ...corsHeaders(origin, allowedOrigin),
    },
  });
}

async function sendEmail(
  apiKey: string,
  from: string,
  to: string,
  subject: string,
  htmlBody: string
): Promise<Response> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: `PesoHub <${from}>`,
      to: [to],
      subject,
      html: htmlBody,
    }),
  });
  return res;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildContactEmail(data: ContactPayload): string {
  const subjectLabels: Record<string, string> = {
    general: "General Inquiry",
    bug: "Bug Report",
    suggestion: "Feature Suggestion",
    data: "Data Correction",
    partnership: "Partnership / Advertising",
    other: "Other",
  };

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #0f172a; font-size: 18px; margin: 0 0 16px;">New Contact Form Submission</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #64748b; vertical-align: top; width: 100px;">Name</td>
          <td style="padding: 8px 12px; color: #0f172a;">${escapeHtml(data.name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #64748b; vertical-align: top;">Email</td>
          <td style="padding: 8px 12px; color: #0f172a;"><a href="mailto:${escapeHtml(data.email)}" style="color: #093CB5;">${escapeHtml(data.email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #64748b; vertical-align: top;">Subject</td>
          <td style="padding: 8px 12px; color: #0f172a;">${escapeHtml(subjectLabels[data.subject] || data.subject)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #64748b; vertical-align: top;">Message</td>
          <td style="padding: 8px 12px; color: #0f172a; white-space: pre-wrap;">${escapeHtml(data.message)}</td>
        </tr>
      </table>
      <p style="margin-top: 24px; font-size: 12px; color: #94a3b8;">Sent from pesohub.ph contact form</p>
    </div>
  `;
}

function buildCalculatorEmail(data: CalculatorPayload): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="color: #0f172a; font-size: 20px; margin: 0;">Your PesoHub Calculation Results</h2>
        <p style="color: #64748b; font-size: 13px; margin: 8px 0 0;">${escapeHtml(data.calculatorType)}</p>
      </div>
      <div style="background: #f8fafc; border-radius: 8px; padding: 20px; font-size: 14px; color: #0f172a; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(data.results)}</div>
      <p style="margin-top: 24px; font-size: 12px; color: #94a3b8; text-align: center;">
        Generated by <a href="https://pesohub.ph" style="color: #093CB5; text-decoration: none;">PesoHub</a> — Practical Money Tools for Filipinos
      </p>
      <p style="font-size: 11px; color: #cbd5e1; text-align: center; margin-top: 8px;">
        This is for informational purposes only and does not constitute financial advice.
      </p>
    </div>
  `;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: { ...SECURITY_HEADERS, ...corsHeaders(origin, env.ALLOWED_ORIGIN) },
      });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405, origin, env.ALLOWED_ORIGIN);
    }

    // Body-size cap (matches express.json({ limit: "16kb" })).
    // NOTE: per-IP rate limiting is intentionally not implemented here — in
    // Workers that needs Durable Objects or a zone-level Cloudflare Rate
    // Limiting rule. Configure that at the zone before deploying. See
    // docs/email-api.md.
    const contentLength = Number(request.headers.get("Content-Length") || "0");
    if (contentLength > MAX_BODY_BYTES) {
      return jsonResponse({ error: "Payload too large" }, 413, origin, env.ALLOWED_ORIGIN);
    }

    try {
      const raw = await request.text();
      if (raw.length > MAX_BODY_BYTES) {
        return jsonResponse({ error: "Payload too large" }, 413, origin, env.ALLOWED_ORIGIN);
      }
      const body = JSON.parse(raw) as Record<string, unknown>;

      if (url.pathname === "/contact") {
        // Honeypot — bots fill the hidden "website" field. Pretend success, send nothing.
        if (typeof body.website === "string" && body.website.trim() !== "") {
          return jsonResponse({ success: true }, 200, origin, env.ALLOWED_ORIGIN);
        }

        const name = cleanField(body.name, 120);
        const email = cleanField(body.email, 200);
        const subject = cleanField(body.subject, 60);
        const message = cleanField(body.message, 5000);

        if (!name || !email || !subject || !message) {
          return jsonResponse({ error: "All fields are required" }, 400, origin, env.ALLOWED_ORIGIN);
        }
        if (!EMAIL_RE.test(email)) {
          return jsonResponse({ error: "Invalid email address" }, 400, origin, env.ALLOWED_ORIGIN);
        }

        const subjectLabels: Record<string, string> = {
          general: "General Inquiry",
          bug: "Bug Report",
          suggestion: "Feature Suggestion",
          data: "Data Correction",
          partnership: "Partnership / Advertising",
          other: "Other",
        };

        const emailRes = await sendEmail(
          env.RESEND_API_KEY,
          env.FROM_EMAIL,
          env.TO_EMAIL,
          `[PesoHub] ${subjectLabels[subject] || subject} from ${name}`,
          buildContactEmail({ name, email, subject, message })
        );

        if (!emailRes.ok) {
          const errText = await emailRes.text();
          console.error("Resend error:", errText);
          return jsonResponse({ error: "Failed to send email" }, 502, origin, env.ALLOWED_ORIGIN);
        }

        return jsonResponse({ success: true }, 200, origin, env.ALLOWED_ORIGIN);
      }

      if (url.pathname === "/calculator") {
        // Honeypot — bots fill the hidden "phone" field. Pretend success, send nothing.
        if (typeof body.phone === "string" && body.phone.trim() !== "") {
          return jsonResponse({ success: true }, 200, origin, env.ALLOWED_ORIGIN);
        }

        const email = cleanField(body.email, 200);
        const calculatorType = cleanField(body.calculatorType, 120);
        const results = cleanField(body.results, 20000);

        if (!email || !calculatorType || !results) {
          return jsonResponse({ error: "All fields are required" }, 400, origin, env.ALLOWED_ORIGIN);
        }
        if (!EMAIL_RE.test(email)) {
          return jsonResponse({ error: "Invalid email address" }, 400, origin, env.ALLOWED_ORIGIN);
        }

        const emailRes = await sendEmail(
          env.RESEND_API_KEY,
          env.FROM_EMAIL,
          email,
          `Your ${calculatorType} Results — PesoHub`,
          buildCalculatorEmail({ email, calculatorType, results })
        );

        if (!emailRes.ok) {
          const errText = await emailRes.text();
          console.error("Resend error:", errText);
          return jsonResponse({ error: "Failed to send email" }, 502, origin, env.ALLOWED_ORIGIN);
        }

        return jsonResponse({ success: true }, 200, origin, env.ALLOWED_ORIGIN);
      }

      return jsonResponse({ error: "Not found" }, 404, origin, env.ALLOWED_ORIGIN);
    } catch {
      return jsonResponse({ error: "Invalid request" }, 400, origin, env.ALLOWED_ORIGIN);
    }
  },
};
