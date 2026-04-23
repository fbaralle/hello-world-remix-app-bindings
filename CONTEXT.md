# CONTEXT — hello-world-remix-app-bindings

Orientation for contributors to this **Remix + Vite + bindings** Hello World
example for [Webflow Cloud](https://developers.webflow.com/webflow-cloud). Keep
this file current when structure or workflows change.

## What this is

A minimal, branded **Hello, world** page built with **Remix v2 + Vite 6** and
deployed on Cloudflare Workers via Webflow Cloud. This is the **bindings**
variant — it wires up all four Cloudflare bindings provisioned by Webflow
Cloud (D1, KV Sessions, KV Flags, R2) and renders live status cards.

The page shows:

- Webflow brand hero + gradient logo
- A curated set of Webflow Cloud doc cards
- A live **BindingsStatus** block pinging D1, KV, and R2 via
  `api/binding-status`

## Stack

- Framework: **Remix v2** on **Vite 6** (React 18)
- Worker entry: hand-written Worker (`server.ts`) that serves `/api/*` through
  the Remix handler and delegates everything else to `ASSETS`
- Styling: Tailwind v3 + `wf-*` brand tokens (see `app/tailwind.css`)
- Deploy target: Cloudflare Workers via **Webflow Cloud** (`wrangler.json`)
- Bindings: `DB` (D1), `SESSIONS` + `FLAGS` (KV), `MEDIA` (R2)

## Repo layout

```
app/
  root.tsx                         ← HTML shell, stylesheet link
  tailwind.css                     ← Tailwind + .wf-* design tokens
  env.d.ts                         ← AppLoadContext typings for bindings
  routes/
    _index.tsx                     ← hero, DOC_LINKS, <BindingsStatus />
    api.binding-status.ts          ← Remix loader: pings D1, KV, R2 → JSON
  components/
    WebflowLogo.tsx
    DocCard.tsx
    BindingsStatus.tsx             ← client fetches api/binding-status
server.ts                          ← Worker fetch handler (bindings + ASSETS)
drizzle/                           ← D1 migrations
wrangler.json                      ← bindings declaration
vite.config.ts
tailwind.config.ts
postcss.config.js
tsconfig.json
package.json
```

## Running locally

```bash
npm install
npm run dev                # remix vite:dev — bindings not attached
npm run dev:cf             # remix vite:build && wrangler dev — full bindings
```

## Building

```bash
npm run build              # remix vite:build
```

Build output lands in `build/` (client + server). Wrangler bundles `server.ts`
separately when deployed.

## Bindings

Declared in `wrangler.json`:

| Binding    | Kind | Purpose                                      |
| ---------- | ---- | -------------------------------------------- |
| `DB`       | D1   | SQL database (Drizzle migrations in `drizzle/`) |
| `SESSIONS` | KV   | Session store                                |
| `FLAGS`    | KV   | Feature flags                                |
| `MEDIA`    | R2   | Object storage                               |
| `ASSETS`   | Fetcher | Serves built static assets                |

`server.ts` matches `/api/...` regardless of mount prefix — it uses
`pathname.indexOf("/api/")` so the app works under any Webflow Cloud mount
path. Non-`/api/*` requests are probed against `env.ASSETS` first and, if the
asset returns 404, the Remix request handler runs.

`app/routes/api.binding-status.ts` performs a cheap read against each binding
via `context.cloudflare.env` and returns per-binding status + latency.

## Editing the UI

- **Page content (hero, CTAs, doc cards):** `app/routes/_index.tsx`
- **Doc card list:** search for `DOC_LINKS` in `app/routes/_index.tsx`
- **Bindings status cards:** `app/components/BindingsStatus.tsx`
- **Worker entry:** `server.ts`
- **Health-check loader:** `app/routes/api.binding-status.ts`
- **Brand tokens and `.wf-*` styles:** `app/tailwind.css`

## Deploying to Webflow Cloud

1. Push this repo to GitHub.
2. In your Webflow Cloud project, connect the repo and pick a mount path
   (e.g. `/my-app`). The app runs under any prefix.
3. Webflow Cloud builds with `npm run build` and provisions all bindings
   from `wrangler.json` automatically on deploy.

See [Deployments](https://developers.webflow.com/webflow-cloud/deployments)
and [Environments](https://developers.webflow.com/webflow-cloud/environments).

## Contributing

- Keep the **Webflow brand tone**: blue gradient (`#4353FF` → `#146EF5`), dark
  background, minimal copy. Reuse the existing `.wf-*` CSS tokens.
- This is a Hello World. Do **not** add extra pages, client-state libraries,
  or UI kits. Small and readable beats clever.
- Run `npm run build` before opening a PR.
- Keep **cross-app parity**: if you change shared copy or doc links, update
  the sibling `hello-world-*-app[-bindings]` apps too.

## Related docs

- [Webflow Cloud overview](https://developers.webflow.com/webflow-cloud)
- [Getting started](https://developers.webflow.com/webflow-cloud/getting-started)
- [Storing data overview](https://developers.webflow.com/webflow-cloud/storing-data/overview)
- [SQLite (D1)](https://developers.webflow.com/webflow-cloud/storing-data/sqlite)
- [Key Value Store](https://developers.webflow.com/webflow-cloud/storing-data/key-value-store)
- [Object Storage (R2)](https://developers.webflow.com/webflow-cloud/storing-data/object-storage)
- [Environments](https://developers.webflow.com/webflow-cloud/environments)
- [Deployments](https://developers.webflow.com/webflow-cloud/deployments)
- [Configuration](https://developers.webflow.com/webflow-cloud/environment/configuration)
- [Limits](https://developers.webflow.com/webflow-cloud/limits)
