# Network Prototypes

Public partnership hub for competitive prototypes. Each prototype is published into its own folder under `prototypes/<slug>/`.

## Hosts

| Host | Role |
|---|---|
| **GitHub Pages** | Primary / realtime: `https://martinezworldwide.github.io/network-prototypes/` |
| **Vercel** | Secondary mirror when deploy quota allows: `https://network-prototypes.vercel.app` |

## Collaborate

1. Browse the hub at the Pages root.
2. Open a prototype at `/prototypes/<slug>/`.
3. Use the async partner CTA on each prototype page to share a short video, demo link, deck, or written summary.

## Layout

```text
index.html, hub.css, hub.js   Hub landing page
.nojekyll                     Required for GitHub Pages
prototypes/
  catalog.json          Published prototype index
  <slug>/               One deployable site per prototype
```

## Deploy

- **Pages:** Settings → Pages → Deploy from branch `main` / `/ (root)`. See `VERCEL.md`.
- **Vercel:** Optional mirror of the same static files. No secrets required.
