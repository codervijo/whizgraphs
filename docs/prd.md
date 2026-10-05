---
project: whizgraphs.com
prd_version: 1
project_version: v2.D
status: active
owner: Vijo
last_updated: 2026-10-05
---

# whizgraphs.com — PRD

## 1. Problem

Founders, SEO consultants and small agencies have to explain search performance
to clients, partners and teams, but Search Console data arrives as dense
spreadsheets and dashboards nobody reads. Building a readable report by hand
every month is slow. (Source: AI_AGENTS.md § Summary, § ICP.)

## 2. Users

Site owners, indie founders, SEO consultants and small agencies who manage one
or more content-driven sites, already check Google Search Console regularly,
and need to report SEO progress without building manual reports each month.
(Source: AI_AGENTS.md § Audience, § ICP.)

## 3. Goals & non-goals

**Goals:**
- Lightweight SEO infographic generator on mock / imported GSC-style data (v1).
- Win low-competition SEO-reporting and infographic keywords with pages that carry usable templates and original graphics (v2).
- Grow into connected reporting: GSC import, branded templates, exports, recurring monthly reports. (Source: AI_AGENTS.md § Goals.)

**Non-goals:**
- A general-purpose, Canva-style design tool — the niche is SEO-specific visual reports. (Source: docs/growth.md 2026-06-10 hypothesis.)

## 4. Versions

Two-level versioning convention (canonical: `sites/portfolio/AI_AGENTS.md`):

- `vN` = major capability tier; SemVer-MAJOR semantics.
- `vN.X` = phase letter within a tier; internal slicing.

| Version | Theme | Acceptance |
|---|---|---|
| v0 | scaffold | local builds, CF wrangler.jsonc + public/_headers in place, repo initialized |
| v1 | live SEO site | Astro site live on Cloudflare, indexable (canonical/sitemap/404 consistent), SEO landing pages + mock-data dashboard |
| v2 | SEO template cluster | template/infographic pages targeting Ahrefs+GSC keywords, each with original crawlable graphics and downloadable template files |

## 5. Phases

| Phase | Theme | Features | Status |
|---|---|---|---|
| **v0.A** | scaffolded | `portfolio new bootstrap` ran; standard files written; git initialized | ✅ |
| **v1.A** | planning | content strategy + keyword targets (AI_AGENTS.md § Content strategy) | ✅ |
| **v1.B** | Astro port | tanstack-start → Astro static port (28e7dc6) | ✅ |
| **v1.C** | crawl/indexing fixes | JSON-LD canonical alignment, sitemap index, `trailingSlash: 'always'`, real 404 (6d4a08c, d42915e, 0977b9e) | ✅ |
| **v1.D** | content-page expansion | deeper SEO landing pages, shared page components, sitemap lastmod (07ba863) | ✅ |
| **v2.A** | planning / decisions lock | keyword map (Ahrefs SV/KD + GSC impressions); decisions: keep `/gsc-infographic-report/` (rewrite), 301 `/seo-report-infographic/` → `/seo-report-template/`; report-template vs reporting-template get distinct angles; downloads = static files (PNG, PDF, CSV) | ✅ |
| **v2.B** | infographic pages + image pipeline | build-time SVG/PNG/PDF/CSV asset generator; upgrade `/seo-infographics/` (seo infographic 1.6K/KD5, seo infographics 1.5K/KD0, infographics for seo 400/KD4) and `/seo-infographic-examples/` (visual gallery); image SEO (alt, dimensions, ImageObject schema, og:image) | built (uncommitted) |
| **v2.C** | report template hub | new `/seo-report-template/` (seo report template 2.8K/KD0) with downloadable template; 301 `/seo-report-infographic/`; rewrite `/gsc-infographic-report/` around the GSC-export → report workflow | built (uncommitted) |
| **v2.D** | template variants | new `/monthly-seo-report-template/` (600/KD5), `/seo-reporting-template/` (1K/KD12, recurring reporting system), `/seo-dashboard-template/` (100/KD4, live-tracking layout); cluster internal linking + nav/footer | built (uncommitted) |

## 6. Open questions

- *(append-only log; mark answered with date but never delete)*
- 2026-10-05 — XLSX downloads, or CSV only? v2 ships CSV (opens in Excel/Sheets, no new dependency); revisit if users ask.
