# Deployment & Automation

## Hosting

### Site — Vercel (Free Tier)

- **URL:** https://pesohub.ph (also https://www.pesohub.ph)
- **Preview URL:** https://pesohub-eight.vercel.app
- **Framework:** `null` (static site — Vercel serves the `out/` directory)
- **Build command:** `npm run build`
- **Output directory:** `out`
- **Auto-deploy:** Every push to `main` triggers a Vercel build and deploy
- **Config:** `vercel.json`

### Email API — Render (Free Tier)

- **URL:** https://pesohub-email-api.onrender.com
- **Source:** `server/index.mjs`
- **Region:** Singapore
- **Blueprint:** `render.yaml`
- **Note:** Free tier spins down after 15 min of inactivity. First request may take ~30s to cold start.

### DNS — Vercel DNS

- **Nameservers:** `ns1.vercel-dns.com`, `ns2.vercel-dns.com`
- **Domain registrar:** dotPH (pesohub.ph)

**Canonical domain:** the apex `pesohub.ph` is primary (since 2026-07-02). `www.pesohub.ph`
must redirect to the apex with a **permanent** redirect — set this in the Vercel dashboard
(Project → Domains → set `www` to *Redirect to* `pesohub.ph`), **not** in `vercel.json` (static
export has no runtime redirect layer). All SEO output (canonicals, sitemap, robots, JSON-LD) is
already apex-only via `SITE_URL` in `src/config/site.ts`. Verify: `curl -sI https://www.pesohub.ph/`
returns `301`/`308` with `location: https://pesohub.ph/`.

| Type | Name | Value | Purpose |
|------|------|-------|---------|
| A | `mail` | `192.250.235.76` | dotPH mail server |
| A | `webmail` | `192.250.235.76` | dotPH webmail |
| MX | `@` | `mail.pesohub.ph` (priority 10) | Email delivery |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | Resend SPF |
| MX | `send` | `feedback-smtp.ap-northeast-1.amazonses.com` (10) | Resend bounce handling |
| TXT | `resend._domainkey` | DKIM key | Resend DKIM |
| ALIAS | `*` | `cname.vercel-dns.com` | Vercel (auto-managed) |
| ALIAS | `@` | Vercel deployment | Vercel (auto-managed) |

### Email — dotPH Free Email + Resend

- **Receiving:** dotPH free email (`hello@pesohub.ph`, webmail at `webmail.pesohub.ph`)
- **Sending (transactional):** Resend (`noreply@pesohub.ph`)
- **Resend dashboard:** https://resend.com
- **Resend free tier:** 100 emails/day, 3,000 emails/month

---

## Automated Rate Updates (GitHub Actions Cron)

### Exchange Rates (Daily)

- **Workflow:** `.github/workflows/update-rates.yml`
- **Script:** `scripts/update-exchange-rates.mjs`
- **Schedule:** Mon-Fri at 1:00 UTC (9:00 AM PHT)
- **Sources:** BSP RERB API (reference rate) + BSP Exchange Rate API (buying/selling/gold/silver)
- **Manual trigger:** GitHub Actions → "Update Exchange Rates" → "Run workflow"

#### How It Works

1. Cron triggers at 9 AM PHT (Mon-Fri)
2. Fetches BSP RERB PDF for the reference rate
3. Fetches BSP Exchange Rate API for buying/selling/gold/silver rates
4. Updates `src/data/rates/exchange-rates.ts` using targeted find-and-replace (preserves FAQs and types)
5. Commits and pushes → Vercel auto-deploys

### Bank Rates (Biweekly)

- **Workflow:** `.github/workflows/update-bank-rates.yml`
- **Sources:** Savings rates, digital bank rates, time deposit rates
- **Method:** Tavily Extract + AI Search (queries must be under 400 chars)
- **Output:** Creates a PR for review (never auto-merges)

### Government Data (Monthly)

- **Workflow:** `.github/workflows/update-government-data.yml`
- **Sources:** SSS contribution/pension, Pag-IBIG contribution/housing, PhilHealth, withholding tax
- **Method:** Tavily Extract + AI Search (queries must be under 400 chars)
- **Output:** Creates a PR for review (never auto-merges)

### Required Secrets (GitHub → Settings → Secrets and variables → Actions → Secrets)

| Secret | Used by | Purpose |
|--------|---------|---------|
| `TAVILY_API_KEY` | data-updater, blog-post | Tavily API for bank/gov data scraping + blog research |
| `ANTHROPIC_API_KEY` | blog-post, gsc-opportunities, gsc-content | Writer + keyword-opportunity agent (Claude Sonnet 4.6) |
| `OPENAI_API_KEY` | blog-post | Blog-content-evaluator judge (OpenAI gpt-4.1) — cross-provider grading |
| `GSC_SERVICE_ACCOUNT_JSON` | gsc-opportunities, gsc-content | Google Search Console service-account key (raw or base64 JSON) |
| `GSC_SITE_URL` | gsc-opportunities, gsc-content | GSC property, e.g. `sc-domain:pesohub.ph` |
| `LANGFUSE_PUBLIC_KEY` | blog-post, gsc-opportunities, gsc-content | Langfuse Cloud tracing/datasets/scores (optional — no-op when unset) |
| `LANGFUSE_SECRET_KEY` | blog-post, gsc-opportunities, gsc-content | Langfuse Cloud (optional) |
| `LANGFUSE_BASEURL` | blog-post, gsc-opportunities, gsc-content | Langfuse base URL, e.g. `https://cloud.langfuse.com` (optional) |

### Repository Variables (Actions → Variables — not secrets)

| Variable | Default | Purpose |
|----------|---------|---------|
| `PROMOTE_COUNT` | `3` | New-post decisions auto-queued per weekly blog GSC run (`gsc-opportunities.yml`) |
| `CONTENT_PROMOTE_COUNT` | `4` | Content items (updates + new supporting pages) auto-queued per monthly GSC run (`gsc-content.yml`) |
| `NOTIFY_GH_HANDLE` | repo owner | Handle @mentioned/assigned when a page needs an update |
| `OPENAI_EVAL_MODEL` | `gpt-4.1` | Override the judge model |

Notes:
- `DEPLOY_SSH_KEY` / `DEPLOY_HOST` are no longer needed (DigitalOcean removed).
- The former `BRAINTRUST_API_KEY` was removed — evals migrated to Langfuse.

---

## Content Freshness System

Every YMYL (Your Money or Your Life) page has a review cadence, source citation, and automated staleness checking.

- **Registry:** `src/data/content-registry.ts`
- **Component:** `src/components/shared/source-citation.tsx`
- **Checker script:** `scripts/check-content-freshness.mjs`
- **Cron:** `.github/workflows/content-freshness.yml` — runs weekly (Monday 9 AM PHT)

### Review Cadences

| Page | Cadence | Source |
|------|---------|--------|
| USD/PHP Exchange Rate | Daily (auto) | BSP |
| Savings Interest Rates | Every 14 days | Bank websites |
| Pag-IBIG Housing Loan | Every 60 days | Pag-IBIG Fund |
| Withholding Tax Table | Every 90 days | BIR (TRAIN Law) |
| SSS Pension Table | Every 90 days | SSS |
| SSS Contribution Guide | Every 90 days | SSS |
| BSP Exchange Rate Guide | Every 90 days | BSP |
| Withholding Tax Guide | Every 90 days | BIR |
| SSS Pension Guide | Every 90 days | SSS |

### Running Locally

```bash
node scripts/check-content-freshness.mjs          # pretty report
node scripts/check-content-freshness.mjs --json    # JSON for CI
node scripts/check-content-freshness.mjs --github  # writes GitHub issue body
```

---

## Troubleshooting

### Site not loading
- Check Vercel dashboard for build errors
- Verify DNS: `dig pesohub.ph A` should return Vercel IPs
- Preview URL always works: `pesohub-eight.vercel.app`

### Email not working
- Check MX record: `dig pesohub.ph MX` should return `mail.pesohub.ph`
- Check mail IP: `dig mail.pesohub.ph A` should return `192.250.235.76`
- Check Resend dashboard for delivery status
- Render cold start: first request after inactivity takes ~30s

### Exchange rate not updating
- Check GitHub Actions tab for workflow errors
- Manual trigger: Actions → "Update Exchange Rates" → "Run workflow"
- BSP may not publish on holidays

### Bank/gov data workflow failing
- Check Tavily API key is valid and has credits remaining
- Tavily queries must be under 400 characters (API limit)
- Source websites may be temporarily down
