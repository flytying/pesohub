# Deployment & Automation

## Deployment (Cloudflare Pages)

- **Host:** Cloudflare Pages (static site)
- **Domain:** pesohub.ph
- **Staging URL:** pesohub.pages.dev
- **Repo:** github.com/flytying/pesohub (private)
- **Auto-deploy:** Every push to `main` triggers Cloudflare Pages rebuild
- **Build command (Cloudflare):** `npm run build`
- **Build output directory:** `out`
- **DNS:** Cloudflare (CNAME pesohub.ph → pesohub.pages.dev)

### DNS Records (Cloudflare)

| Type  | Name        | Content              | Proxy   |
|-------|-------------|----------------------|---------|
| CNAME | pesohub.ph  | pesohub.pages.dev    | Proxied |
| A     | mail        | 192.250.235.76       | Proxied |
| A     | webmail     | 192.250.235.76       | Proxied |
| MX    | pesohub.ph  | mail.pesohub.ph (10) | DNS only|
| TXT   | _dmarc      | v=DMARC1; p=none...  | DNS only|
| TXT   | pesohub.ph  | v=spf1 +mx +a...     | DNS only|

### Cloudflare Account

- **Account:** lottobot.ai's account
- **Plan:** Free
- **Workers subdomain:** round-dew-8ec5.workers.dev

---

## Automated Rate Updates (GitHub Actions Cron)

### Overview

Exchange rates are auto-updated daily via a GitHub Actions cron job. The workflow fetches the latest USD/PHP rate, updates the data file, commits, and pushes — triggering a Cloudflare Pages auto-redeploy.

### Configuration

- **Workflow file:** `.github/workflows/update-rates.yml`
- **Script:** `scripts/update-exchange-rates.mjs`
- **Schedule:** Mon-Fri at 8:00 UTC (4:00 PM PHT), after BSP publishes daily rate
- **API:** `open.er-api.com/v6/latest/USD` (free, no API key needed)
- **Manual trigger:** Available via `workflow_dispatch` in GitHub Actions tab

### How It Works

1. Cron triggers at 4 PM PHT (Mon-Fri)
2. Script checks if it's a weekend → skips if so
3. Script checks if already updated today → skips if so
4. Fetches USD/PHP rate from open.er-api.com
5. Calculates daily change from previous rate
6. Updates `src/data/rates/exchange-rates.ts`:
   - `currentRate` — new date, rate, change
   - `historicalRates[]` — prepends new entry, keeps last 7 business days
   - `USD_PHP_UPDATED_AT` — today's date
7. Commits with message `chore: update USD/PHP exchange rate`
8. Pushes to `main` → Cloudflare Pages auto-redeploys

### Data Not Automated

These data sources change infrequently and require manual verification:

- **Savings rates** (`src/data/rates/savings-rates.ts`) — bank promo rates change irregularly
- **SSS contributions** (`src/data/government/sss-contribution.ts`) — updated by SSS annually
- **Withholding tax tables** (`src/data/government/withholding-tax-table.ts`) — updated by BIR
- **Pag-IBIG rates** (`src/data/government/pag-ibig-housing-loan.ts`) — updated by HDMF

### Troubleshooting

- **Workflow not running?** Check GitHub Actions tab for errors. Ensure the repo has Actions enabled.
- **Rate not updating?** API may be down. Script exits with code 1 on API failure — no commit, no redeploy.
- **Wrong rate?** The API provides market rates, not the exact BSP reference rate. Close but not identical.
- **Manual trigger:** Go to repo → Actions → "Update Exchange Rates" → "Run workflow"

---

## Content Freshness System

Every YMYL (Your Money or Your Life) page has a review cadence, source citation, and automated staleness checking.

### Overview

- **Registry:** `src/data/content-registry.ts` — central config tracking all 9 YMYL pages
- **Component:** `src/components/shared/source-citation.tsx` — visible source/freshness box on every page
- **Checker script:** `scripts/check-content-freshness.mjs` — flags overdue pages
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

### How It Works

1. Cron runs every Monday at 9 AM PHT
2. Script reads each data file's `UPDATED_AT` date
3. Compares against the page's review cadence
4. If any page is overdue → creates/updates a GitHub issue labeled `content-freshness`
5. If all pages are fresh → auto-closes any open freshness issue

---

## DNS & Domain Troubleshooting

### pesohub.ph not accessible (common issue)

This has happened multiple times. The site at `pesohub.pages.dev` always works — it's the custom domain DNS that breaks.

### Quick Diagnosis

```bash
# Check if Pages subdomain works (should always work)
curl -sI https://pesohub.pages.dev | head -3

# Check if custom domain resolves
dig pesohub.ph @1.1.1.1 A +short

# Check nameservers
dig pesohub.ph NS +short
# Should return: eric.ns.cloudflare.com and walk.ns.cloudflare.com

# Query Cloudflare NS directly
dig pesohub.ph @eric.ns.cloudflare.com A +short
```

### Fix: Re-provision the custom domain via Pages

The most reliable fix when the CNAME exists in Cloudflare DNS but isn't resolving:

1. **Delete** the CNAME record for `pesohub.ph` in Cloudflare DNS
2. Wait 30 seconds
3. Go to **Workers & Pages → pesohub → Custom domains**
4. **Remove** `pesohub.ph`
5. **Re-add** `pesohub.ph` — Pages will auto-create the correct CNAME
6. Wait for status to show "Active" with "SSL enabled"
7. Flush local DNS: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`

### Why This Happens

Cloudflare Pages manages a special internal binding between the CNAME record and the Pages project. When the CNAME is manually added/deleted, this binding can break — the DNS dashboard shows the record, but the nameservers don't actually serve it. Letting Pages create the record itself ensures the binding is correct.

### Local DNS Cache

If the site works for others but not for you, it's a local DNS cache issue:

```bash
# macOS: flush DNS cache
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```
