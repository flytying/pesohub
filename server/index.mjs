/**
 * PesoHub Email API — Express Server (DigitalOcean)
 *
 * Handles two endpoints:
 *   POST /contact    — Contact form submissions (sends to hello@pesohub.ph)
 *   POST /calculator — Calculator results email (sends to user's email)
 *
 * Environment variables:
 *   RESEND_API_KEY   — Resend API key
 *   FROM_EMAIL       — Sender email (default: noreply@pesohub.ph)
 *   TO_EMAIL         — Contact form recipient (default: hello@pesohub.ph)
 *   ALLOWED_ORIGIN   — CORS origin (default: https://pesohub.ph)
 *   PORT             — Server port (default: 3001)
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dns from "node:dns/promises";

const app = express();

// Render runs behind a proxy — trust it so req.ip / rate-limit see the real client IP.
app.set("trust proxy", 1);
const PORT = process.env.PORT || 3001;
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@pesohub.ph";
const TO_EMAIL = process.env.TO_EMAIL || "hello@pesohub.ph";
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "https://pesohub.ph";
const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY environment variable is required");
  process.exit(1);
}

// CORS
const allowedOrigins = [
  ALLOWED_ORIGIN,
  "https://www.pesohub.ph",
  "http://localhost:3000",
];

// Allow Vercel preview deployments (*.vercel.app)
function isAllowedOrigin(origin) {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  if (/^https:\/\/[\w-]+-[\w-]+\.vercel\.app$/.test(origin)) return true;
  return false;
}

app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
      } else {
        callback(null, ALLOWED_ORIGIN);
      }
    },
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    maxAge: 86400,
  })
);

// Cap request bodies — these endpoints only ever receive small JSON payloads.
app.use(express.json({ limit: "16kb" }));

// Rate limit the email-sending routes (5 req/min per IP). /health is unthrottled.
const emailLimiter = rateLimit({
  windowMs: 60_000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) =>
    res.status(429).json({ error: "Too many requests. Try again in a minute." }),
});

// ── Helpers ──────────────────────────────────────────────────────

// Email-quality checks — MIRROR of src/lib/validate-email.ts (client). Keep the
// regex, the disposable list, and the dummy patterns in sync across both copies
// and workers/email-api/src/index.ts.
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com", "guerrillamail.com", "guerrillamail.info", "sharklasers.com",
  "10minutemail.com", "10minutemail.net", "tempmail.com", "temp-mail.org",
  "tempmailo.com", "throwawaymail.com", "throwaway.email", "yopmail.com",
  "trashmail.com", "getnada.com", "nada.email", "maildrop.cc", "dispostable.com",
  "fakeinbox.com", "mailnesia.com", "mytemp.email", "moakt.com", "mohmal.com",
  "spam4.me", "emailondeck.com", "mailsac.com", "inboxkitten.com", "tmpmail.org",
  "burnermail.io",
]);

const DUMMY_EMAIL_DOMAINS = new Set([
  "example.com", "example.org", "example.net", "example.edu", "test.com",
  "test.net", "test.org", "test.test", "domain.com", "email.com", "mail.com",
  "sample.com", "mydomain.com", "yourdomain.com", "yoursite.com", "website.com",
  "abc.com", "asdf.com", "aaa.com", "xxx.com",
]);

const DUMMY_LOCAL_PARTS = new Set([
  "test", "tester", "testing", "test123", "asdf", "asd", "asdfasdf", "qwerty",
  "qwe", "abc", "abcd", "abcde", "aaa", "aaaa", "xxx", "xxxx", "dummy", "fake",
  "fakeemail", "sample", "example", "none", "na", "nil", "null", "nobody",
  "noreply", "no-reply", "donotreply", "user", "username", "email",
]);

// Returns true when the address is well-formed and not disposable/placeholder.
function isValidEmail(raw) {
  const email = (raw || "").trim().toLowerCase();
  if (!email || email.length > 254) return false;
  if (email.includes("..")) return false;
  if (!EMAIL_RE.test(email)) return false;
  const atIndex = email.lastIndexOf("@");
  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);
  const tld = domain.slice(domain.lastIndexOf(".") + 1);
  if (tld.length < 2 || !/^[a-z]+$/.test(tld)) return false;
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) return false;
  if (DUMMY_EMAIL_DOMAINS.has(domain) || DUMMY_LOCAL_PARTS.has(local)) return false;
  return true;
}

// Check the email domain can actually receive mail (has an MX record, or an A/AAAA
// fallback per RFC 5321). Fails OPEN on transient DNS errors or timeout so a DNS
// hiccup never blocks a legitimate sender; only a definitive "no mail host" rejects.
async function domainCanReceiveMail(email) {
  const domain = email.slice(email.lastIndexOf("@") + 1).toLowerCase();
  const withTimeout = (p) =>
    Promise.race([
      p,
      new Promise((resolve) => setTimeout(() => resolve("timeout"), 3000)),
    ]);
  try {
    const mx = await withTimeout(dns.resolveMx(domain));
    if (mx === "timeout") return true; // fail open
    if (Array.isArray(mx) && mx.length > 0) return true;
  } catch (err) {
    // ENOTFOUND / ENODATA → fall through to the A-record check; other errors fail open.
    if (err.code !== "ENOTFOUND" && err.code !== "ENODATA") return true;
  }
  try {
    const a = await withTimeout(dns.resolve(domain));
    if (a === "timeout") return true;
    return Array.isArray(a) && a.length > 0;
  } catch {
    return false;
  }
}

// Message-quality heuristics — MIRROR of src/lib/validate-message.ts. Keep thresholds in sync.
const MIN_MESSAGE_LENGTH = 10;
function isValidMessage(raw) {
  const message = (raw || "").trim();
  if (message.length < MIN_MESSAGE_LENGTH) return false;
  const tokens = message.split(/\s+/).filter(Boolean);
  const letters = message.toLowerCase().replace(/[^a-z]/g, "");
  if (tokens.length < 2 && message.length >= 15) return false;
  if (letters.length >= 8) {
    let vowels = 0;
    for (const ch of letters) if ("aeiou".includes(ch)) vowels += 1;
    if (vowels / letters.length < 0.2) return false;
    for (const token of tokens) {
      let run = 0;
      for (const ch of token.toLowerCase()) {
        if (ch >= "a" && ch <= "z" && !"aeiou".includes(ch)) {
          run += 1;
          if (run >= 7) return false;
        } else {
          run = 0;
        }
      }
    }
  }
  return true;
}

// Validate a field is a non-empty string within maxLen. Returns trimmed value or null.
function cleanField(value, maxLen) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maxLen) return null;
  return trimmed;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendEmail(from, to, subject, htmlBody) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
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

const SUBJECT_LABELS = {
  general: "General Inquiry",
  bug: "Bug Report",
  suggestion: "Feature Suggestion",
  data: "Data Correction",
  partnership: "Partnership / Advertising",
  other: "Other",
};

function buildContactEmail({ name, email, subject, message }) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #0f172a; font-size: 18px; margin: 0 0 16px;">New Contact Form Submission</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #64748b; vertical-align: top; width: 100px;">Name</td>
          <td style="padding: 8px 12px; color: #0f172a;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #64748b; vertical-align: top;">Email</td>
          <td style="padding: 8px 12px; color: #0f172a;"><a href="mailto:${escapeHtml(email)}" style="color: #093CB5;">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #64748b; vertical-align: top;">Subject</td>
          <td style="padding: 8px 12px; color: #0f172a;">${escapeHtml(SUBJECT_LABELS[subject] || subject)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; color: #64748b; vertical-align: top;">Message</td>
          <td style="padding: 8px 12px; color: #0f172a; white-space: pre-wrap;">${escapeHtml(message)}</td>
        </tr>
      </table>
      <p style="margin-top: 24px; font-size: 12px; color: #94a3b8;">Sent from pesohub.ph contact form</p>
    </div>
  `;
}

function buildCalculatorEmail({ email, calculatorType, results }) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="color: #0f172a; font-size: 20px; margin: 0;">Your PesoHub Calculation Results</h2>
        <p style="color: #64748b; font-size: 13px; margin: 8px 0 0;">${escapeHtml(calculatorType)}</p>
      </div>
      <div style="background: #f8fafc; border-radius: 8px; padding: 20px; font-size: 14px; color: #0f172a; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(results)}</div>
      <p style="margin-top: 24px; font-size: 12px; color: #94a3b8; text-align: center;">
        Generated by <a href="https://pesohub.ph" style="color: #093CB5; text-decoration: none;">PesoHub</a> — Practical Money Tools for Filipinos
      </p>
      <p style="font-size: 11px; color: #cbd5e1; text-align: center; margin-top: 8px;">
        This is for informational purposes only and does not constitute financial advice.
      </p>
    </div>
  `;
}

// ── Routes ───────────────────────────────────────────────────────

app.post("/contact", emailLimiter, async (req, res) => {
  try {
    const body = req.body || {};

    // Honeypot — bots fill the hidden "website" field. Pretend success, send nothing.
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return res.json({ success: true });
    }

    const name = cleanField(body.name, 120);
    const email = cleanField(body.email, 200);
    const subject = cleanField(body.subject, 60);
    const message = cleanField(body.message, 5000);

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Please enter a valid, non-disposable email address" });
    }
    if (!isValidMessage(message)) {
      return res.status(400).json({ error: "Please enter a real message" });
    }
    if (!(await domainCanReceiveMail(email))) {
      return res.status(400).json({ error: "That email domain can’t receive mail — please check the address" });
    }

    const emailRes = await sendEmail(
      FROM_EMAIL,
      TO_EMAIL,
      `[PesoHub] ${SUBJECT_LABELS[subject] || subject} from ${name}`,
      buildContactEmail({ name, email, subject, message })
    );

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error("Resend error:", errText);
      return res.status(502).json({ error: "Failed to send email" });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("Contact error:", err);
    return res.status(400).json({ error: "Invalid request" });
  }
});

app.post("/calculator", emailLimiter, async (req, res) => {
  try {
    const body = req.body || {};

    // Honeypot — bots fill the hidden "phone" field. Pretend success, send nothing.
    if (typeof body.phone === "string" && body.phone.trim() !== "") {
      return res.json({ success: true });
    }

    const email = cleanField(body.email, 200);
    const calculatorType = cleanField(body.calculatorType, 120);
    const results = cleanField(body.results, 20000);

    if (!email || !calculatorType || !results) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Please enter a valid, non-disposable email address" });
    }
    if (!(await domainCanReceiveMail(email))) {
      return res.status(400).json({ error: "That email domain can’t receive mail — please check the address" });
    }

    const emailRes = await sendEmail(
      FROM_EMAIL,
      email,
      `Your ${calculatorType} Results — PesoHub`,
      buildCalculatorEmail({ email, calculatorType, results })
    );

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error("Resend error:", errText);
      return res.status(502).json({ error: "Failed to send email" });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("Calculator error:", err);
    return res.status(400).json({ error: "Invalid request" });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Start ────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`✅ PesoHub Email API running on port ${PORT}`);
});
