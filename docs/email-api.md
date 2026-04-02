# Email API (Express + Resend on Render)

## Overview

Email functionality is handled by an Express server hosted on Render (free tier). The static site on Vercel sends POST requests directly to the Render API, which calls Resend to deliver emails.

## Architecture

```
Browser (pesohub.ph on Vercel)
  → POST to pesohub-email-api.onrender.com/contact or /calculator
    → Express server (Render, free tier)
      → Resend API (api.resend.com)
        → Email delivered
```

## Endpoints

| Endpoint | Purpose | Sends to |
|----------|---------|----------|
| `POST /contact` | Contact form submissions | hello@pesohub.ph |
| `POST /calculator` | Calculator results to user | User's email |
| `GET /health` | Health check | — |

## Server Details

- **Host:** Render (free tier, Singapore region)
- **URL:** https://pesohub-email-api.onrender.com
- **Source:** `server/index.mjs` (in repo root)
- **Blueprint:** `render.yaml`
- **Note:** Free tier spins down after 15 min inactivity. First request takes ~30s cold start.

### Environment Variables (Render Dashboard)

| Variable | Value |
|----------|-------|
| `FROM_EMAIL` | `noreply@pesohub.ph` |
| `TO_EMAIL` | `hello@pesohub.ph` |
| `ALLOWED_ORIGIN` | `https://pesohub.ph` |
| `RESEND_API_KEY` | Resend API key (secret) |

## CORS

The server allows requests from:
- `https://pesohub.ph` (production)
- `https://www.pesohub.ph` (production www)
- `https://*.vercel.app` (Vercel preview deployments)
- `https://pesohub.pages.dev` (legacy staging)
- `http://localhost:3000` (development)

## Frontend Integration

### API URL Config (`src/config/site.ts`)

```typescript
export const EMAIL_API_URL =
  process.env.NEXT_PUBLIC_EMAIL_API_URL || "https://pesohub-email-api.onrender.com";
```

### Contact Form (`src/app/contact/page.tsx`)

```typescript
const res = await fetch(`${EMAIL_API_URL}/contact`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, subject, message }),
});
```

### Calculator Email (`src/components/calculators/result-actions.tsx`)

```typescript
const res = await fetch(`${EMAIL_API_URL}/calculator`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, calculatorType, results }),
});
```

## Email Provider: Resend

- **Dashboard:** [resend.com](https://resend.com)
- **Free tier:** 100 emails/day, 3,000 emails/month
- **Domain:** `pesohub.ph` (verified)
- **Region:** Tokyo (ap-northeast-1)

### Required DNS Records (Vercel DNS)

| Type | Name | Content | Purpose |
|------|------|---------|---------|
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | SPF for Resend |
| MX | `send` | `feedback-smtp.ap-northeast-1.amazonses.com` (10) | Resend bounce handling |
| TXT | `resend._domainkey` | `p=MIGfMA0GCSqGSI...` | DKIM signing |

## Troubleshooting

- **Contact form shows "Failed to fetch"** — Render may be cold starting (wait 30s, retry). Or check CORS in `server/index.mjs`.
- **Email sent but not received** — Check Resend dashboard for delivery status. Check MX record exists: `dig pesohub.ph MX`.
- **403 "domain not verified"** — Verify domain at resend.com/domains, check DNS records.
- **CORS errors** — Ensure Origin header matches allowed origins in `server/index.mjs`.
- **Health check:** `curl https://pesohub-email-api.onrender.com/health`
