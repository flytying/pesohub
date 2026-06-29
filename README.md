# PesoHub

Philippine personal finance tools and information site — calculators, exchange & savings rates,
government contribution tables, and guides. Built with Next.js (static export), TypeScript, and
Tailwind CSS 4.

## Quick start

```bash
npm install
npm run dev      # localhost:3000
npm run build    # static export to out/
npm run lint
```

This is a static site (`output: 'export'`) — no SSR, no API routes. The only dynamic surface is a
separate email API (Express on Render). See `server/` and `docs/email-api.md`.

## Documentation

- **[CLAUDE.md](CLAUDE.md)** — canonical project guide (architecture, conventions, commands).
- **[docs/routes.md](docs/routes.md)** — full route map.
- **[docs/deployment-and-automation.md](docs/deployment-and-automation.md)** — hosting, DNS, crons.
- **[docs/content-automation.md](docs/content-automation.md)** — data updater, blog agent, GSC.
- **[docs/email-api.md](docs/email-api.md)** — contact / calculator email backend.
- **[docs/design-system.md](docs/design-system.md)** — design tokens and component patterns.
- **[docs/known-issues.md](docs/known-issues.md)** — current backlog / tech debt.
