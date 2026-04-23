# hello-world-remix-app-bindings

A **Remix v2 + Vite** starter for [**Webflow Cloud**](https://webflow.com/cloud) with Cloudflare bindings (D1, R2, KV) wired in.

At deploy time, Webflow Cloud provisions the configured services and injects them into your app as typed bindings — no API keys, no connection strings.

> Looking for the plain vanilla variant (no bindings)?
> See [`hello-world-remix-app`](https://github.com/Webflow-Examples/hello-world-remix-app).

## Requirements

- Node **20+**

## What's included

- Remix v2 + Vite 6 (React 18)
- Tailwind CSS v3
- `server.ts` — Cloudflare Worker serving Remix + a `/api/binding-status` endpoint
- `wrangler.json` with **D1**, **R2**, **KV · Sessions**, **KV · Flags**
- Branded landing page that renders real-time binding status

## Quickstart

```bash
npm install

# Run locally (Remix + Vite, no bindings)
npm run dev

# Build + run against real bindings (wrangler)
npm run dev:cf
```

## Deploy to Webflow Cloud

1. Fork this repo.
2. In your Webflow site, open **Apps → Webflow Cloud → Create new app** and select this repo.
3. Webflow Cloud reads `wrangler.json` and provisions D1, R2, and KV automatically.

## Bindings map

| Binding    | Type | Declared in     |
| ---------- | ---- | --------------- |
| `DB`       | D1   | `wrangler.json` |
| `MEDIA`    | R2   | `wrangler.json` |
| `SESSIONS` | KV   | `wrangler.json` |
| `FLAGS`    | KV   | `wrangler.json` |

## Learn more

- [Webflow Cloud docs](https://developers.webflow.com/webflow-cloud)
- [Bindings guide](https://developers.webflow.com/webflow-cloud/storing-data/overview)
- [Remix on Webflow Cloud](https://developers.webflow.com/webflow-cloud/getting-started)

---

Built with Remix · Deployed on Webflow Cloud.
