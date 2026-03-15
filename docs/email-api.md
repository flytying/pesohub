# Email API (Express + Resend on DigitalOcean)

## Overview

Email functionality is handled by an Express server running on the same DigitalOcean droplet as the static site. Nginx proxies `/api/` requests to the Express server, which calls the Resend API to send emails.

## Architecture

```
Browser (pesohub.ph)
  → POST to /api/contact or /api/calculator
    → nginx reverse proxy → Express (port 3001)
      → Resend API (api.resend.com)
        → Email delivered
```

## Endpoints

| Endpoint | Purpose | Sends to |
|----------|---------|----------|
| `POST /api/contact` | Contact form submissions | hello@pesohub.ph |
| `POST /api/calculator` | Calculator results to user | User's email |
| `GET /api/health` | Health check | — |

## Server Details

- **Location:** `/opt/pesohub-api/` on the droplet
- **Source:** `server/index.mjs` (in repo)
- **Process manager:** PM2 (`pesohub-api`)
- **Port:** 3001 (proxied via nginx at `/api/`)
- **Node.js:** 20.x

### Environment Variables (set via PM2)

| Variable | Value |
|----------|-------|
| `FROM_EMAIL` | `noreply@pesohub.ph` |
| `TO_EMAIL` | `hello@pesohub.ph` |
| `ALLOWED_ORIGIN` | `https://pesohub.ph` |
| `RESEND_API_KEY` | Resend API key (secret) |

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

The server allows requests from:
- `https://pesohub.ph` (production)
- `https://pesohub.pages.dev` (staging)
- `http://localhost:3000` (development)

## Frontend Integration

### API URL Config (`src/config/site.ts`)

```typescript
export const EMAIL_API_URL =
  process.env.NEXT_PUBLIC_EMAIL_API_URL || "https://pesohub.ph/api";
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

## Managing the API on the Droplet

```bash
# SSH into droplet
ssh root@157.230.246.39

# Check status
pm2 status

# View logs
pm2 logs pesohub-api

# Restart
pm2 restart pesohub-api

# Update API key
pm2 delete pesohub-api
RESEND_API_KEY="re_NEW_KEY" FROM_EMAIL="noreply@pesohub.ph" TO_EMAIL="hello@pesohub.ph" ALLOWED_ORIGIN="https://pesohub.ph" pm2 start /opt/pesohub-api/index.mjs --name pesohub-api
pm2 save
```

## Auto-Deploy

The deploy workflow (`.github/workflows/deploy.yml`) automatically syncs `server/` files to the droplet and restarts PM2 on every push to `main`.

## Troubleshooting

- **503 from /api/** — PM2 process crashed. Check `pm2 logs pesohub-api` and restart.
- **403 "domain not verified"** — Verify domain at resend.com/domains, check DNS records.
- **CORS errors** — Check Origin header matches allowed origins in `server/index.mjs`.
- **Emails going to spam** — Ensure SPF, DKIM, and DMARC DNS records are properly configured.
- **Health check:** `curl https://pesohub.ph/api/health`
