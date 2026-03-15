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
