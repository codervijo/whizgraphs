# Growth Log — whizgraphs.com

> **What this file is for:** an honest, append-only log of growth experiments
> on this site — what was tried, what was measured, what happened. The data
> source is GSC; this file narrates *why*. Future-you (or future-Claude)
> reads this when deciding what to try next, both on this site and on
> related sister sites.

## How to use this (workflow — re-read this when you forget)

**Add an entry whenever you do something growth-relevant.** That includes:
shipping new content, structural SEO changes (sitemap, schema, redirects,
internal linking), tech changes that affect crawl/indexing, marketing
pushes, backlink campaigns. *Not* every code commit — just things you'd
want to point at when GSC numbers move (or fail to).

**Each entry is a hypothesis you can be wrong about.** Commit to a
measurable KPI and an observation window before acting — otherwise "did
this work?" is just a feeling.

### Lifecycle of one entry

1. **Day of action** — append a new dated H2 with `Status: active`, the
   hypothesis, the KPI you'll watch, current baseline numbers, what you
   did, and the date to review (default: today + 28 days, matching GSC's
   reporting window).
2. **Review day** — pull current GSC numbers, compute delta vs baseline.
   Fill in **Result** and **Learning**. Set **Status** to `shipped` (worked,
   keep going), `failed` (didn't pay off, abandon), or extend the review
   another window if results are ambiguous.
3. **Never rewrite older entries.** Wrong hypotheses are the most valuable
   data — they tell you what NOT to repeat on the next site. Append, don't
   edit.

### Where to get the numbers

```bash
cd ~/work/projects/sites/portfolio && make run ARGS="gsc sync"
```

Then read the row for `whizgraphs.com`. Or pull from
https://search.google.com/search-console directly.

### Format

```
## YYYY-MM-DD — <one-line hypothesis or action>
- **Status:** active | testing | shipped | failed | abandoned
- **Hypothesis:** <what you're betting will work — only on initial / new-bet entries>
- **KPI:** <what GSC metric / query / page>
- **Baseline:** <numbers at start>
- **Action:** <what was done; 1-2 lines>
- **Result:** <numbers after window; "TBD — review YYYY-MM-DD" until then>
- **Learning:** <why it worked / didn't; what to try next; "TBD" until reviewed>
```

---

## 2026-06-10 — People searching for SEO infographics want a clearer way to present…
- **Status:** shipped
- **Hypothesis:** People searching for SEO infographics want a clearer way to present search data, not another Canva-style design tool. If WhizGraphs owns the niche of SEO-specific visual reports, it can convert organic search traffic into users who later pay for exports, branding, GSC connection, and agency reporting.
- **KPI:** any GSC traffic — clicks, impressions, indexed-page count
- **Baseline:** 0 clicks / 0 impressions (just deployed)
- **Action:** project scaffolded via `portfolio new bootstrap`; first deploy pending. After deploy: verify in GSC as `sc-domain:whizgraphs.com` and submit the sitemap.
- **Result:** (reviewed late, 2026-10-16) At 2026-07-08: 0 clicks / 0 impressions (GSC 2026-06-10→07-08); every URL `url_is_unknown_to_google` (2026-07-12 snapshot). First impression 2026-07-25, after the trailing-slash/canonical/soft-404 fixes (`docs/seo-crawl-diagnosis.md`, v1.C). 2026-06-10→10-14: 0 clicks / 7,513 impressions / avg pos 66.2.
- **Learning:** The 28d window was spent on crawl blockers, not demand — canonical↔sitemap↔served-URL agreement must be right before launch or the clock is wasted. Impressions confirm search demand for the niche; clicks (and the paid-conversion half of the hypothesis) remain untested at pos ~66. Carried forward by the 2026-10-05 entry.

## 2026-10-05 — v2 SEO template cluster: upgrade infographic pages, add four template pages
- **Status:** active
- **Hypothesis:** Low-KD template queries (seo report template 2.8K/KD0, seo reporting template 1K/KD12, monthly seo report template 600/KD5, seo dashboard template 100/KD4) plus the infographic pages GSC already shows impressions for (seo infographic 1.6K/KD5, seo infographics 1.5K/KD0) will index and earn clicks if each page carries a genuinely usable asset (downloadable PDF/CSV/PNG) and original crawlable graphics rather than prose. Consolidating `/seo-report-infographic/` into `/seo-report-template/` removes a crawled-not-indexed near-duplicate.
- **KPI:** GSC impressions + clicks for the seven cluster URLs; indexed status of `/gsc-infographic-report/` and the four new template URLs; Google Images impressions for `/graphics/*`.
- **Baseline:** GSC API, 2026-09-04 → 2026-10-02 (28d, pre-deploy): site 0 clicks / 2,472 impressions / avg pos 69.1. `/seo-infographics/` 0 clk / 2,383 imp / pos 71.4; `/seo-infographic-examples/` 0 / 1,352 / 80.7; other cluster URLs no impressions. Indexing (2026-10-05 snapshot): `/gsc-infographic-report/` + `/seo-report-infographic/` crawled_not_indexed. Top queries: seo infographic 1,342 imp (pos 65.8), seo infographics 472 (69.0), infographics for seo 284 (77.6), infographic seo 270 (74.5).
- **Action:** v2.B–D (see `docs/prd.md`): 26 generated graphics (SVG on page, PNG for share/og), 4 two-page PDFs + 5 CSVs, ImageObject/CreativeWork/FAQ schema, 301 from `/seo-report-infographic/`, rewritten `/gsc-infographic-report/`, nav/footer/home links to the cluster.
- **Result:** TBD — review 2026-11-02
- **Interim (2026-10-16):** daily impressions oscillate in on/off waves independent of the deploy (high Sep 1–16, ~10–30/day Sep 17–30, rising again Oct 13–14 at 201/308/day) while query positions hold ~66–80 — so default rolling-28d comparisons mislead; at review compare 2026-09-07→10-04 vs 2026-10-05→11-01. Recrawled post-deploy: `/`, `/pricing/`, `/seo-report-template/`, `/seo-reporting-template/`, `/monthly-seo-report-template/` (Oct 11–12, indexed). Not yet recrawled: `/seo-infographics/`, `/seo-infographic-examples/`, `/gsc-infographic-report/` (still crawled_not_indexed, last crawl 2026-07-27); `/seo-dashboard-template/` unknown to Google. New template pages already show first impressions (e.g. `/seo-report-template/` 92 imp for "sample seo report", "monthly seo report"). Follow-up planned as v2.E.
- **Learning:** TBD
