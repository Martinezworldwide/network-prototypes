# Public Vercel Deploy

Repository: https://github.com/Martinezworldwide/network-prototypes

## Import steps

1. Open https://vercel.com/new
2. Import `Martinezworldwide/network-prototypes`
3. Set Root Directory to repository root (leave blank / `.`)
4. Framework Preset: Other
5. Build Command: leave empty or `npm run build`
6. Output Directory: leave empty (static files at repo root)
7. Do **not** add `GITHUB_DASHBOARD_TOKEN`, `DASHBOARD_PASSWORD`, or any private Network Desk secrets
8. Deploy
9. Copy the production URL into the private Network Desk env as `PUBLIC_SITE_BASE_URL`

## Private Network Desk env (separate Vercel project)

Keep these on the private dashboard project only:

- `GITHUB_DASHBOARD_TOKEN`
- `GITHUB_OWNER` / `GITHUB_REPO` / `GITHUB_BRANCH` / `GITHUB_BASE_PATH`
- `DASHBOARD_PASSWORD` / `DASHBOARD_SESSION_SECRET`
- `PUBLIC_GITHUB_TOKEN` (Contents write on `network-prototypes` only)
- `PUBLIC_GITHUB_OWNER=Martinezworldwide`
- `PUBLIC_GITHUB_REPO=network-prototypes`
- `PUBLIC_GITHUB_BRANCH=main`
- `PUBLIC_SITE_BASE_URL=https://<your-public-hub>.vercel.app`
