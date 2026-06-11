# Server code dropped during the TanStack Start → Astro port

Astro's static-output model has no equivalent for TanStack Start's
server runtime, server functions, or dynamic route handlers. The
following files from `genai/` were **not** ported and their behavior
must be re-implemented (or deliberately dropped) for the Astro build.

## TanStack Start runtime / SSR wrappers (dropped — no Astro equivalent)

- `genai/src/server.ts` — Cloudflare Workers `fetch` entry that wraps
  `@tanstack/react-start/server-entry` and normalizes catastrophic SSR
  500s into a rendered error page.
  - TODO: Astro static builds have no custom server fetch entry. If a
    runtime error page is needed, configure it at the host/CDN layer
    (e.g. a Cloudflare Pages custom 500) instead.
- `genai/src/start.ts` — `createStart` request middleware that catches
  thrown errors and renders an error page.
  - TODO: no request middleware in static Astro. Drop.
- `genai/src/router.tsx` + `genai/src/routes/__root.tsx` +
  `genai/src/routeTree.gen.ts` — TanStack Router setup. Replaced by
  Astro file-based routing under `src/pages/` and `src/layouts/Layout.astro`.
- `genai/src/lib/error-capture.ts`, `error-page.ts`,
  `lovable-error-reporting.ts` — SSR error capture/reporting plumbing.
  - TODO: drop, or wire client-side error reporting separately if wanted.

## Server functions / dynamic handlers (dropped)

- `genai/src/lib/api/example.functions.ts` — `createServerFn` example
  (`getGreeting`). No server functions in static Astro.
  - TODO: if server logic is needed later, move to an Astro endpoint
    (`src/pages/api/*.ts`) with `output: 'server'`/adapter, or a Worker.
- `genai/src/lib/config.server.ts` — server-only env config helper read
  per-request on Cloudflare. Not used by any ported UI.
  - TODO: for public config use `import.meta.env.PUBLIC_*` in Astro.
- `genai/src/routes/sitemap[.]xml.ts` — dynamic sitemap handler.
  - Replaced by the `@astrojs/sitemap` integration (already in
    `astro.config.mjs`) plus the static `public/sitemap.xml`.

## shadcn/ui components not ported

Only `ui/sonner.tsx` (toast) was needed by the ported pages. The rest of
`genai/src/components/ui/*` and `genai/src/hooks/use-mobile.tsx` were not
referenced by any operator-visible page and were left unported. Re-copy
on demand from `genai/` if a future component needs them.
