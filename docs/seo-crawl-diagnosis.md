# SEO Crawl Diagnosis — whizgraphs.com

- **Date:** 2026-07-15
- **Symptom:** All URLs in Google Search Console show *Last crawled: N/A* and
  *Discovered – currently not indexed*. Zero Googlebot crawls.
- **Mode:** VERIFY ONLY. No files changed. This is the diagnostic record;
  remediation is a separate step.
- **Setup:** Astro (`output: 'static'`) on Cloudflare (Static Assets via
  `wrangler.jsonc`). Apex (`https://whizgraphs.com`) is canonical.

## Raw command output

### 1. Homepage headers as Googlebot
```
HTTP/2 200
content-type: text/html; charset=utf-8
cache-control: public, max-age=0, must-revalidate
x-frame-options: DENY
referrer-policy: strict-origin-when-cross-origin
x-content-type-options: nosniff
server: cloudflare
cf-cache-status: DYNAMIC
```

### 2. www redirect behavior
```
curl: (6) Could not resolve host: www.whizgraphs.com
```
DNS: `www.whizgraphs.com` does not resolve (no record). Apex resolves to
Cloudflare IPv6 (`2606:4700:3037::…`).

### 3. Head tags Googlebot sees (homepage source)
```
<title>WhizGraphs — Turn SEO data into shareable infographics</title>
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://whizgraphs.com">
<meta property="og:url" content="https://whizgraphs.com">
```

### 4. Trailing-slash behavior (status codes)
```
/dashboard                 → 308     /dashboard/                 → 200
/pricing                   → 308     /pricing/                   → 200
/seo-infographics          → 308     /seo-infographics/          → 200
/gsc-infographic-report    → 308     /gsc-infographic-report/    → 200
/seo-infographic-examples  → 308     /seo-infographic-examples/  → 200
```

### 5. Canonical declared on each interior page (with-slash form fetched)
All interior pages declare a **no-trailing-slash** canonical + og:url:
```
/dashboard/                → canonical https://whizgraphs.com/dashboard
/pricing/                  → canonical https://whizgraphs.com/pricing
/seo-infographics/         → canonical https://whizgraphs.com/seo-infographics
/gsc-infographic-report/   → canonical https://whizgraphs.com/gsc-infographic-report
/seo-infographic-examples/ → canonical https://whizgraphs.com/seo-infographic-examples
```
No `name="robots"` meta on interior pages (default-indexable). No noindex anywhere.

### 6. Sitemap
`sitemap-index.xml` → `sitemap-0.xml`. Child `<loc>` values (all **with** trailing slash):
```
https://whizgraphs.com/
https://whizgraphs.com/dashboard/
https://whizgraphs.com/gsc-infographic-report/
https://whizgraphs.com/pricing/
https://whizgraphs.com/seo-infographic-examples/
https://whizgraphs.com/seo-infographics/
https://whizgraphs.com/seo-report-infographic/
```

### 7. Soft-404 check
```
/this-path-does-not-exist-xyz → HTTP/2 200
```
`wrangler.jsonc`: `not_found_handling: "single-page-application"` (serves
`index.html` at 200 for any unknown path).

### 8. Config
`astro.config.mjs`: `site: 'https://whizgraphs.com'`, `output: 'static'`,
integrations `[sitemap(), react()]`. **`trailingSlash` is not set** (defaults
to `ignore`). No `public/_redirects` file. `public/_headers` = cache +
security headers only. `robots.txt` allows all, points at `sitemap-index.xml`.
Internal nav hrefs (Header/Footer/page components) are all **no-slash**
(`/dashboard`, `/pricing`, …).

## Findings table

| check | expected | actual | pass/fail |
|---|---|---|---|
| Canonical resolves to 200 | canonical URL returns 200 | interior canonicals are no-slash (`/dashboard`) → **308** to `/dashboard/` | **FAIL** ⚠️ primary blocker |
| Slash-form agreement (canonical ↔ sitemap) | canonical string == sitemap `<loc>` | canonical no-slash; sitemap `<loc>` **with-slash** — disagree on every interior page | **FAIL** ⚠️ |
| Slash-form agreement (canonical ↔ og:url) | match | match (both no-slash) — but both target the redirecting form | pass (wrong target) |
| Slash-form agreement (nav href ↔ served URL) | nav hrefs hit 200 | nav hrefs no-slash → every internal click 308-redirects | **FAIL** |
| astro.config `trailingSlash` vs served layout | explicit + consistent | unset (`ignore`); static build serves `/path/`, redirects `/path`; canonical/og/nav emit `/path` | **FAIL** (root cause of the split) |
| Soft-404 | bogus path returns 404/410 | returns **200** (SPA `not_found_handling`) | **FAIL** ⚠️ |
| www → apex redirect | www 30x to apex | www **does not resolve** (no DNS) — no redirect exists | **FAIL** (per criteria; not the crawl blocker — no competing www URLs) |
| www never reverse (apex→www) | apex stays apex | apex serves 200 directly | pass |
| noindex present anywhere | none | none; homepage `index, follow`, interiors default-indexable | pass |
| `/*` blanket rule in `_redirects` | none | no `_redirects` file at all | pass |
| GSC example URLs ⊆ sitemap | all present | all 5 given paths present in sitemap (slash form); sitemap adds `/seo-report-infographic/` | pass |
| robots.txt / sitemap reachable | 200, correct | robots OK; `sitemap-index.xml` → `sitemap-0.xml` both 200 | pass |
| Homepage canonical | 200 | canonical `https://whizgraphs.com` → 200 (sitemap has `/`; both 200, minor inconsistency) | pass |

## Root cause (no fixes applied)

Trailing-slash split personality between what's *served* and what's *declared*:

1. **Every interior page's declared canonical (`/dashboard`) 308-redirects to
   the served form (`/dashboard/`).** A canonical pointing at a redirect is a
   conflicting signal — Google deprioritizes crawling and withholds indexing.
   **Primary blocker.**
2. **The sitemap advertises the with-slash form while each page self-canonicals
   to the no-slash form** — sitemap URL ≠ self-canonical, a second de-index
   signal.
3. **Soft-404** (SPA fallback returns 200 for any path) degrades site-wide
   crawl trust.

The www gap and the homepage `/` vs no-slash inconsistency are real but
secondary — not what is suppressing crawls.
