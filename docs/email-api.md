# Email API (Cloudflare Worker + Resend)

## Overview

Email functionality is handled by a Cloudflare Worker that proxies requests to the Resend API. The static site calls the Worker endpoint from the client side.

## Architecture

```
Browser (pesohub.ph)
  → POST to Cloudflare Worker (pesohub-email-api)
    → Resend API (api.resend.com)
      → Email delivered
```

## Endpoints

| Endpoint | Purpose | Sends to |
|----------|---------|----------|
| `POST /contact` | Contact form submissions | hello@pesohub.ph |
| `POST /calculator` | Calculator results to user | User's email |

## Worker Details

- **Name:** `pesohub-email-api`
- **URL:** `https://pesohub-email-api.round-dew-8ec5.workers.dev`
- **Source:** `workers/email-api/src/index.ts`
- **Config:** `workers/email-api/wrangler.toml`

### Environment Variables (wrangler.toml)

| Variable | Value |
|----------|-------|
| `FROM_EMAIL` | `noreply@pesohub.ph` |
| `TO_EMAIL` | `hello@pesohub.ph` |
| `ALLOWED_ORIGIN` | `https://pesohub.ph` |

### Secrets (set via `wrangler secret put`)

| Secret | Description |
|--------|-------------|
| `RESEND_API_KEY` | Resend API key for sending emails |

## Email Provider: Resend

- **Dashboard:** [resend.com](https://resend.com)
- **Free tier:** 100 emails/day, 3,000 emails/month
- **Domain:** `pesohub.ph` (verified)
- **API key prefix:** `re_DnVL7xSH_...`

### Required DNS Records (Cloudflare)

| Type | Name | Content | Purpose |
|------|------|---------|---------|
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | SPF for Resend |
| MX | `send` | `feedback-smtp.ap-n...` (priority 10) | Resend bounce handling |
| TXT | `resend._domainkey` | `p=MIGfMA0GCSqGSI...` | DKIM signing |

## CORS

The Worker allows requests from:
- `https://pesohub.ph` (production)
- `https://pesohub.pages.dev` (staging)
- `http://localhost:3000` (development)

## Frontend Integration

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

### API URL Config (`src/config/site.ts`)

```typescript
export const EMAIL_API_URL =
  process.env.NEXT_PUBLIC_EMAIL_API_URL ||
  "https://pesohub-email-api.round-dew-8ec5.workers.dev";
```

## Deploying Changes

```bash
cd workers/email-api
npm install
npx wrangler deploy
```

## Updating the API Key

```bash
cd workers/email-api
echo "re_NEW_KEY_HERE" | npx wrangler secret put RESEND_API_KEY
```

## Troubleshooting

- **403 "domain not verified"** — Verify domain at resend.com/domains, check DNS records
- **CORS errors** — Check Origin header matches allowed origins in Worker
- **502 from Worker** — Check Resend API key is set (`wrangler secret list`), check Worker logs (`wrangler tail`)
- **Emails going to spam** — Ensure SPF, DKIM, and DMARC DNS records are properly configured
