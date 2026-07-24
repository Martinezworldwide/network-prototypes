# Public Deploy

Repository: https://github.com/Martinezworldwide/network-prototypes

## Primary host: GitHub Pages (realtime)

1. Open https://github.com/Martinezworldwide/network-prototypes/settings/pages
2. Build and deployment → Source: **Deploy from a branch**
3. Branch: `main` / folder: `/ (root)`
4. Save
5. Site URL: `https://martinezworldwide.github.io/network-prototypes/`
6. Set Network Desk env `PUBLIC_SITE_BASE_URL` to that URL (no trailing slash)

Prototype URLs:

```text
https://martinezworldwide.github.io/network-prototypes/prototypes/<slug>/
```

Pages updates from `main` as soon as GitHub finishes the Pages build (usually within a minute of each push).

## Secondary host: Vercel (when quota allows)

Keep the existing Vercel project imported from this repo. It can stay connected and will catch up when the free deploy quota resets.

Current Vercel URL: `https://network-prototypes.vercel.app`

Vercel import settings if recreating:

1. Open https://vercel.com/new
2. Import `Martinezworldwide/network-prototypes`
3. Root Directory: repository root
4. Framework Preset: Other
5. Build Command: empty or `npm run build`
6. Output Directory: empty
7. Do **not** add private Network Desk secrets

## Private Network Desk env

Keep these on the private dashboard project only:

- `GITHUB_DASHBOARD_TOKEN`
- `GITHUB_OWNER` / `GITHUB_REPO` / `GITHUB_BRANCH` / `GITHUB_BASE_PATH`
- `DASHBOARD_PASSWORD` / `DASHBOARD_SESSION_SECRET`
- `PUBLIC_GITHUB_TOKEN` (Contents write on `network-prototypes` only)
- `PUBLIC_GITHUB_OWNER=Martinezworldwide`
- `PUBLIC_GITHUB_REPO=network-prototypes`
- `PUBLIC_GITHUB_BRANCH=main`
- `PUBLIC_SITE_BASE_URL=https://martinezworldwide.github.io/network-prototypes`
