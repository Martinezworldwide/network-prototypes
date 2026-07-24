# Network Prototypes

Public partnership hub for competitive prototypes. Each prototype is published into its own folder under `prototypes/<slug>/` and served at `/p/<slug>`.

## Collaborate

1. Browse the hub at the deployment root.
2. Open a prototype at `/p/<slug>`.
3. Use the async partner CTA on each prototype page to share a short video, demo link, deck, or written summary.

## Layout

```text
public/                 Hub landing page
prototypes/
  catalog.json          Published prototype index
  <slug>/               One deployable site per prototype
```

## Deploy

Import this repository into Vercel with root directory at the repository root. No environment secrets are required for the public static hub.
