// src/lib/graphics/catalog.mjs
// Single source of truth for every published graphic and download.
// Pages import the metadata (src, alt, dimensions, caption); the generator
// (scripts/gen-assets.mjs) calls render() and writes the files to public/.
//
// ALL DATA BELOW IS MOCK DATA FOR FICTIONAL SITES. Every image says
// "Sample data" on its face and every page caption repeats it. Derived
// figures (growth, CTR, shares) are computed from these inputs, never typed.
import { LAYOUTS, IG_W, IG_H } from "./infographics.mjs";
import {
  seoReportTemplate, monthlyReportTemplate, reportingFramework, reportingPlanBlank, dashboardTemplate,
  anatomyDiagram, searchFunnelDiagram, gscMapDiagram,
  PAGE_W, PAGE_H, DASH_W, DASH_H, PLAN_COLUMNS, PLAN_EXAMPLES, DASH_WIDGETS, CADENCES,
} from "./templates.mjs";

const BRAND = "#0891b2";

// --- acme.com: the reference dataset behind the five core templates --------
const acmeSeries = [
  ["Jan", 1820, 42100], ["Feb", 2110, 47800], ["Mar", 2480, 53200], ["Apr", 2950, 61500],
  ["May", 3620, 70800], ["Jun", 4310, 81400], ["Jul", 5180, 94300], ["Aug", 6240, 108900],
].map(([label, clicks, impressions]) => ({ label, clicks, impressions }));
const acme = { site: "acme.com", logo: "AC", color: BRAND };

const core = [
  {
    id: "seo-infographic-traffic-growth", layout: "traffic-growth",
    cfg: { ...acme, period: "Jan – Aug 2026", headline: "Search clicks are up 3.4× this year.", note: "Long-form guides published in Q2 account for most of the gain.", series: acmeSeries },
    name: "Traffic Growth",
  },
  {
    id: "seo-infographic-top-pages", layout: "top-pages",
    cfg: {
      ...acme, period: "Aug 2026", headline: "Five URLs earned 58% of August’s clicks.", totalClicks: 6240, pageCount: 312,
      pages: [
        { url: "/blog/seo-checklist/", clicks: 1210, impressions: 15800, position: 4.2 },
        { url: "/blog/gsc-guide/", clicks: 940, impressions: 13200, position: 5.1 },
        { url: "/blog/keyword-tools/", clicks: 610, impressions: 9900, position: 6.8 },
        { url: "/blog/tech-audit/", clicks: 480, impressions: 8100, position: 7.2 },
        { url: "/blog/link-building/", clicks: 350, impressions: 6400, position: 8.0 },
      ],
    },
    name: "Top Pages",
  },
  {
    id: "seo-infographic-keyword-wins", layout: "keyword-wins",
    cfg: {
      ...acme, period: "Aug 2026", headline: "Five queries broke onto page one in August.",
      wins: [
        { query: "seo infographic generator", before: 38, after: 6, clicks: 412 },
        { query: "gsc report template", before: 24, after: 4, clicks: 388 },
        { query: "monthly seo report", before: 19, after: 3, clicks: 502 },
        { query: "client seo dashboard", before: 31, after: 9, clicks: 221 },
        { query: "search console infographic", before: 47, after: 7, clicks: 174 },
      ],
    },
    name: "Keyword Wins",
  },
  {
    id: "seo-infographic-content-performance", layout: "content-performance",
    cfg: {
      ...acme, period: "Aug 2026", headline: "One top-3 post is badly under-clicked.",
      rows: [
        { title: "SEO Checklist", position: 4.2, clicks: 1210, impressions: 15800 },
        { title: "GSC Guide", position: 5.9, clicks: 940, impressions: 14700 },
        { title: "Keyword Tools", position: 3.1, clicks: 410, impressions: 14600 },
        { title: "Tech Audit", position: 7.2, clicks: 480, impressions: 8100 },
        { title: "Link Building", position: 8.6, clicks: 350, impressions: 6400 },
        { title: "Schema Markup", position: 10.4, clicks: 160, impressions: 4300 },
      ],
    },
    name: "Content Performance",
  },
  {
    id: "seo-infographic-seo-health", layout: "seo-health",
    cfg: {
      ...acme, period: "Aug 2026", headline: "August SEO snapshot: growing, nothing on fire.",
      tiles: [
        { label: "Clicks", value: "6,240", delta: "+20% vs Jul" },
        { label: "Impressions", value: "108.9k", delta: "+15% vs Jul" },
        { label: "Avg CTR", value: "5.7%", delta: "+0.2pp vs Jul" },
        { label: "Avg position", value: "11.2", delta: "▲ 0.8 vs Jul" },
        { label: "Indexed pages", value: "312", delta: "+14 vs Jul" },
        { label: "Pages with errors", value: "4", delta: "−3 vs Jul" },
      ],
      status: "Core Web Vitals: “Good” on mobile and desktop.",
    },
    name: "SEO Health Snapshot",
  },
];

// --- Examples gallery: ten fictional sites, ten stories ---------------------
const examples = [
  {
    id: "seo-infographic-example-saas-growth", layout: "traffic-growth", kind: "Traffic Growth", audience: "Founder update",
    story: "Eight months of compounding growth told in one rising line.",
    why: "One headline, three tiles, one chart. The investor gets “it’s working” before reading a single number.",
    cfg: {
      id: "nb", site: "northbeam.dev", logo: "NB", color: "#0891b2", period: "Jan – Aug 2026", headline: "Search clicks 3.4× in eight months.",
      series: [[640, 21000], [790, 24800], [980, 29600], [1210, 35100], [1480, 41900], [1730, 47200], [2020, 53800], [2190, 58100]].map(([clicks, impressions], i) => ({ label: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"][i], clicks, impressions })),
    },
  },
  {
    id: "seo-infographic-example-recovery", layout: "traffic-growth", kind: "Traffic Growth", audience: "Client report",
    story: "A migration dip and the recovery, with both events marked on the chart.",
    why: "Annotations turn a scary dip into a story with a cause and a fix — the reader never has to ask “what happened in March?”",
    cfg: {
      id: "orbit", site: "orbitcrm.com", logo: "OR", color: "#ea580c", period: "Jan – Sep 2026", headline: "Recovered from the March migration — and then some.",
      series: [[8200, 190000], [8450, 196000], [5100, 141000], [5400, 150000], [6900, 178000], [8100, 201000], [9300, 226000], [10200, 241000], [11050, 251000]].map(([clicks, impressions], i) => ({ label: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"][i], clicks, impressions })),
      annotations: [{ index: 2, text: "Migration", anchor: "end", color: "#dc2626" }, { index: 3, text: "Redirects fixed", color: "#16a34a" }],
    },
  },
  {
    id: "seo-infographic-example-local", layout: "traffic-growth", kind: "Traffic Growth", audience: "Small business",
    story: "Small numbers, still a clear story — a local bakery’s first six months of SEO.",
    why: "Growth multiples read well at any scale. The note sets expectations about what Search Console does and doesn’t include.",
    cfg: {
      id: "rose", site: "rosemarybakery.com", logo: "RB", color: "#be123c", period: "Apr – Sep 2026", headline: "Local search clicks up 2.6× since April.",
      note: "Website clicks only — Google Business Profile views and calls are reported separately, not in Search Console.",
      series: [[180, 6100], [210, 6900], [260, 8200], [330, 9800], [390, 11000], [470, 12600]].map(([clicks, impressions], i) => ({ label: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"][i], clicks, impressions })),
    },
  },
  {
    id: "seo-infographic-example-top-pages", layout: "top-pages", kind: "Top Pages", audience: "Content audit",
    story: "Traffic is concentrated in a handful of free tools — and the bars make it obvious.",
    why: "Showing share of total clicks, not just raw clicks, is what makes the concentration land.",
    cfg: {
      id: "tt", site: "tailtools.io", logo: "TT", color: "#16a34a", period: "Sep 2026", headline: "Five URLs earned 68% of September’s clicks.", totalClicks: 14200, pageCount: 148,
      pages: [
        { url: "/tools/color-palette/", clicks: 3120, impressions: 41000, position: 3.4 },
        { url: "/tools/gradients/", clicks: 2480, impressions: 38500, position: 4.1 },
        { url: "/tools/shadows/", clicks: 1910, impressions: 30100, position: 5.2 },
        { url: "/blog/grid-guide/", clicks: 1240, impressions: 26800, position: 6.6 },
        { url: "/tools/spacing/", clicks: 880, impressions: 17900, position: 7.3 },
      ],
    },
  },
  {
    id: "seo-infographic-example-keyword-wins", layout: "keyword-wins", kind: "Keyword Wins", audience: "Agency retainer",
    story: "Queries that climbed this month, drawn as before → after tracks.",
    why: "Position jumps are the most tangible proof of progress you can hand a client — and the one that didn’t make page one is shown honestly.",
    cfg: {
      id: "fw", site: "fenwick.studio", logo: "FW", color: "#dc2626", period: "Aug 2026", headline: "Four queries reached page one in August.",
      wins: [
        { query: "logo redesign case study", before: 19, after: 5, clicks: 210 },
        { query: "rebrand checklist", before: 22, after: 9, clicks: 180 },
        { query: "brand identity studio london", before: 27, after: 8, clicks: 140 },
        { query: "packaging design for startups", before: 15, after: 6, clicks: 95 },
        { query: "design sprint agency", before: 34, after: 12, clicks: 60 },
      ],
    },
  },
  {
    id: "seo-infographic-example-content", layout: "content-performance", kind: "Content Performance", audience: "Editorial planning",
    story: "Every article plotted by CTR against rank, sized by clicks.",
    why: "The two red bubbles rank in the top five but sit below the site’s average CTR — the cheapest wins on the board.",
    cfg: {
      id: "lb", site: "lattice.blog", logo: "LB", color: "#7c3aed", period: "Sep 2026", headline: "Two top-ranked posts are leaving clicks on the table.",
      rows: [
        { title: "Remote onboarding", position: 2.4, clicks: 820, impressions: 26000 },
        { title: "Async standups", position: 3.8, clicks: 1240, impressions: 15200 },
        { title: "1:1 templates", position: 6.6, clicks: 990, impressions: 14100 },
        { title: "OKR examples", position: 4.9, clicks: 380, impressions: 12800 },
        { title: "Team charters", position: 8.3, clicks: 300, impressions: 5900 },
        { title: "Retro formats", position: 10.4, clicks: 140, impressions: 3900 },
      ],
    },
  },
  {
    id: "seo-infographic-example-ctr", layout: "ctr-opportunity", kind: "CTR Opportunities", audience: "Quick wins",
    story: "High-impression, low-CTR queries that already rank on page one.",
    why: "It ends with an action, not a number: rewrite five titles. That’s what makes a report useful.",
    cfg: {
      id: "quill", site: "quillhq.com", logo: "QH", color: "#db2777", period: "Sep 2026", headline: "Five page-one queries, 134k impressions, CTR under 2%.",
      queries: [
        { query: "invoice template pdf", impressions: 48200, clicks: 610, position: 3.8 },
        { query: "free invoice generator", impressions: 31500, clicks: 520, position: 4.4 },
        { query: "invoice vs receipt", impressions: 22800, clicks: 300, position: 2.9 },
        { query: "how to write an invoice", impressions: 19400, clicks: 380, position: 5.6 },
        { query: "freelance invoice example", impressions: 12100, clicks: 170, position: 6.0 },
      ],
    },
  },
  {
    id: "seo-infographic-example-brand-split", layout: "brand-split", kind: "Brand vs Non-brand", audience: "Growth review",
    story: "Branded vs non-branded clicks — is SEO reaching people who didn’t already know the name?",
    why: "Separating brand demand from discovery stops a PR spike from being mistaken for SEO progress.",
    cfg: {
      id: "bp", site: "brightpantry.co", logo: "BP", color: "#ca8a04", period: "Apr – Sep 2026", headline: "Non-brand clicks are now 61% of search traffic.",
      months: [[2100, 1400], [2150, 1750], [2180, 2150], [2200, 2600], [2230, 3000], [2260, 3500]].map(([brand, nonBrand], i) => ({ label: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"][i], brand, nonBrand })),
    },
  },
  {
    id: "seo-infographic-example-audience", layout: "audience-mix", kind: "Audience Mix", audience: "Product & marketing",
    story: "Who searches, on what device, from where.",
    why: "A developer tool that’s 71% desktop can deprioritise mobile layout work — a decision the image makes in one glance.",
    cfg: {
      id: "mw", site: "meshwire.io", logo: "MW", color: "#2563eb", period: "Last 28 days", headline: "Desktop drives 71% of clicks; the US drives 47%.",
      devices: [{ label: "Desktop", value: 7900 }, { label: "Mobile", value: 3100 }, { label: "Tablet", value: 180 }],
      countries: [{ label: "United States", value: 5200 }, { label: "United Kingdom", value: 1650 }, { label: "Germany", value: 1120 }, { label: "India", value: 980 }, { label: "Canada", value: 760 }],
    },
  },
  {
    id: "seo-infographic-example-quarterly", layout: "seo-health", kind: "SEO Health Snapshot", audience: "Exec summary",
    story: "The whole quarter as six numbers and a one-line verdict.",
    why: "It flags the one red number (CTR) and explains it in the verdict, so nobody panics in the meeting.",
    cfg: {
      id: "hl", site: "harborlabs.com", logo: "HL", color: "#0f172a", period: "Q3 2026", headline: "Q3: the biggest quarter yet for organic search.",
      tiles: [
        { label: "Clicks", value: "61.4k", delta: "+22% vs Q2" },
        { label: "Impressions", value: "1.9M", delta: "+31% vs Q2" },
        { label: "Avg CTR", value: "3.2%", delta: "−0.2pp vs Q2", good: false },
        { label: "Avg position", value: "12.6", delta: "▲ 1.4 vs Q2" },
        { label: "Indexed pages", value: "1,284", delta: "+96 vs Q2" },
        { label: "Non-brand share", value: "58%", delta: "+6pp vs Q2" },
      ],
      status: "CTR dipped because new long-tail impressions grew faster than clicks.",
    },
  },
];

// --- Report / dashboard sample data ------------------------------------------
const reportSample = {
  id: "nw", site: "northwind-outdoors.com", logo: "NW", color: "#0e7490", period: "September 2026", prevLabel: "Aug",
  headline: "Clicks up 15% month over month, led by the relaunched category pages.",
  kpis: { cur: { clicks: 18420, impressions: 412300, position: 14.2 }, prev: { clicks: 15960, impressions: 371800, position: 15.8 } },
  trend: [["Apr", 11200], ["May", 12450], ["Jun", 13100], ["Jul", 14870], ["Aug", 15960], ["Sep", 18420]].map(([label, clicks]) => ({ label, clicks })),
  annotations: [{ index: 4, text: "Category relaunch", anchor: "end", color: "#0e7490" }],
  topPages: [
    { url: "/tents/", clicks: 2840, prev: 2110 },
    { url: "/sleeping-bags/", clicks: 2130, prev: 1720 },
    { url: "/guides/tent-sizes/", clicks: 1640, prev: 1580 },
    { url: "/backpacks/", clicks: 1210, prev: 980 },
    { url: "/guides/checklist/", clicks: 1050, prev: 1120 },
  ],
  wins: [
    { query: "2 person tent", before: 14, after: 6, clicks: 820 },
    { query: "camping checklist printable", before: 9, after: 3, clicks: 610 },
    { query: "lightweight sleeping bag", before: 18, after: 7, clicks: 540 },
    { query: "tent footprint", before: 11, after: 4, clicks: 390 },
  ],
  done: ["Relaunched six category pages with buying-guide copy and FAQs", "Fixed redirect chains left over from the old /shop/ URLs", "Published three guides: tent sizes, layering, checklist"],
  next: ["Rewrite titles on page-one queries with CTR under 2%", "Roll the category template out to /stoves/ and /lighting/", "Link every guide to its matching category page"],
};

const monthlySample = {
  id: "lumen", site: "lumen-analytics.io", logo: "LA", color: "#4f46e5", period: "September 2026", curLabel: "Sep", prevLabel: "Aug", lyLabel: "Sep ’25",
  headline: "Clicks +8% month over month and +60% year over year — the best month on record.",
  cur: { clicks: 9840, impressions: 286500, position: 18.4, pagesWithClicks: 412 },
  prev: { clicks: 9120, impressions: 271200, position: 19.1, pagesWithClicks: 398 },
  ly: { clicks: 6150, impressions: 198700, position: 22.6, pagesWithClicks: 301 },
  trend: [6150, 6480, 6390, 5720, 6900, 7350, 7810, 8040, 8420, 8610, 8890, 9120, 9840].map((clicks, i) => ({ label: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"][i], clicks })),
  gains: [
    { url: "/blog/cohort-analysis/", delta: 412, why: "New comparison table; now position 3" },
    { url: "/templates/kpi-dashboard/", delta: 268, why: "Title rewrite lifted CTR" },
    { url: "/blog/funnel-metrics/", delta: 151, why: "Internal links from four new posts" },
  ],
  drops: [
    { url: "/blog/ga4-migration/", delta: -233, why: "Seasonal: migration interest fading" },
    { url: "/pricing/", delta: -96, why: "Competitor bidding on brand query" },
    { url: "/blog/utm-builder/", delta: -71, why: "Lost the featured snippet" },
  ],
  done: ["Shipped the cohort-analysis comparison table", "Rewrote 14 titles on page-one queries", "Pruned 22 thin tag pages (noindex)"],
  next: ["Win back the UTM-builder snippet", "Brief two posts for Q4 budgeting queries", "Add FAQ sections to the three template pages"],
};

// 28 days of mock daily data, shaped weekly and scaled to the stated totals.
function daily(total, shape) {
  const raw = Array.from({ length: 28 }, (_, i) => shape[i % 7] * (1 + i * 0.006));
  const sum = raw.reduce((a, b) => a + b, 0);
  const vals = raw.map((v) => Math.round((v / sum) * total));
  vals[27] += total - vals.reduce((a, b) => a + b, 0);
  return vals;
}
const dClicks = daily(11180, [430, 445, 450, 440, 410, 300, 290]);
const dImpr = daily(342600, [13000, 13400, 13500, 13200, 12500, 9800, 9500]);
const dLabels = Array.from({ length: 28 }, (_, i) => {
  const dt = new Date(Date.UTC(2026, 8, 8 + i));
  return dt.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
});
const dashSample = {
  id: "mwd", site: "meshwire.io", color: "#2563eb",
  cur: { clicks: 11180, impressions: 342600, position: 16.9 },
  prev: { clicks: 10240, impressions: 318900, position: 17.6 },
  daily: dClicks.map((c, i) => ({ label: dLabels[i], clicks: c, impressions: dImpr[i] })),
  devices: [{ label: "Desktop", value: 7900 }, { label: "Mobile", value: 3100 }, { label: "Tablet", value: 180 }],
  queries: [
    { query: "meshwire", clicks: 1850, impressions: 2600, position: 1.0 },
    { query: "webhook testing tool", clicks: 1220, impressions: 18400, position: 3.2 },
    { query: "mock api server", clicks: 940, impressions: 22100, position: 5.1 },
    { query: "api monitoring open source", clicks: 610, impressions: 15800, position: 6.4 },
    { query: "webhook retry best practices", clicks: 450, impressions: 9100, position: 4.7 },
  ],
  pages: [
    { url: "/docs/webhooks/", clicks: 2480, prev: 2210 },
    { url: "/blog/mock-api-server/", clicks: 1620, prev: 1710 },
    { url: "/pricing/", clicks: 1100, prev: 980 },
    { url: "/docs/retries/", clicks: 860, prev: 640 },
    { url: "/blog/api-monitoring/", clicks: 740, prev: 690 },
  ],
};

// --- Catalog ------------------------------------------------------------------
const ig = (e) => ({
  id: e.id,
  w: IG_W,
  h: IG_H,
  render: () => LAYOUTS[e.layout]({ id: e.id, ...e.cfg }),
});

export const GRAPHICS = {};
function add(id, meta) {
  GRAPHICS[id] = { id, svg: `/graphics/${id}.svg`, png: `/graphics/${id}.png`, ...meta };
}

for (const e of core) {
  add(e.id, {
    ...ig(e),
    name: e.name,
    alt: `${e.name} SEO infographic example: ${e.cfg.headline} (sample data for ${e.cfg.site})`,
    caption: `${e.name} template — ${e.cfg.headline}`,
  });
}

export const EXAMPLES = examples.map((e) => {
  add(e.id, {
    ...ig(e),
    name: `${e.kind} — ${e.cfg.site}`,
    alt: `${e.kind} SEO infographic for ${e.cfg.site}: ${e.cfg.headline} (sample data)`,
    caption: e.cfg.headline,
  });
  return { id: e.id, kind: e.kind, audience: e.audience, story: e.story, why: e.why, site: e.cfg.site, headline: e.cfg.headline, period: e.cfg.period };
});

add("seo-infographic-anatomy", {
  w: 1600, h: 1000, render: () => anatomyDiagram({ id: "anat", ...acme, ...core[0].cfg }),
  name: "Anatomy of an SEO infographic",
  alt: "Annotated anatomy of an SEO infographic: brand and period, headline, stat tiles, one chart, context line, and source credit",
  caption: "The six parts every SEO infographic needs.",
});
add("search-console-metrics-funnel", {
  w: 1600, h: 900, render: () => searchFunnelDiagram(BRAND),
  name: "How Search Console counts performance",
  alt: "Diagram of how Google Search Console counts impressions, clicks, CTR and average position",
  caption: "Impressions, clicks, CTR and average position — what each Search Console metric actually counts.",
});
add("gsc-performance-report-to-infographic", {
  w: 1600, h: 1000, render: () => gscMapDiagram(BRAND),
  name: "Search Console report to infographic map",
  alt: "Diagram mapping Google Search Console Performance report tabs to SEO infographic templates",
  caption: "Each tab of the Performance report feeds a specific infographic template.",
});
add("seo-report-template-sample", {
  w: PAGE_W, h: PAGE_H, render: () => seoReportTemplate(reportSample),
  name: "SEO report template — filled example",
  alt: "Filled one-page SEO report template example with key metrics, clicks trend, top pages, keyword wins and next steps (sample data)",
  caption: "Filled example: a September report for a fictional outdoor-gear store.",
});
add("seo-report-template-blank", {
  w: PAGE_W, h: PAGE_H, render: () => seoReportTemplate(reportSample, { blank: true }),
  name: "SEO report template — blank",
  alt: "Blank one-page SEO report template with seven labelled sections to fill in",
  caption: "Blank version: seven sections, each with a prompt for what goes there.",
});
add("monthly-seo-report-template-sample", {
  w: PAGE_W, h: PAGE_H, render: () => monthlyReportTemplate(monthlySample),
  name: "Monthly SEO report template — filled example",
  alt: "Filled monthly SEO report template showing month-over-month and year-over-year metrics, a 13-month trend, and biggest gains and drops (sample data)",
  caption: "Filled example: September vs August and vs September last year.",
});
add("monthly-seo-report-template-blank", {
  w: PAGE_W, h: PAGE_H, render: () => monthlyReportTemplate(monthlySample, { blank: true }),
  name: "Monthly SEO report template — blank",
  alt: "Blank monthly SEO report template with a month-over-month and year-over-year comparison table",
  caption: "Blank version, ready to print or rebuild in your own tool.",
});
add("seo-reporting-framework", {
  w: PAGE_W, h: PAGE_H, render: () => reportingFramework("#0e7490"),
  name: "SEO reporting framework",
  alt: "SEO reporting framework: weekly pulse, monthly report and quarterly review, each with audience, question, KPIs and format",
  caption: "Three cadences, three audiences, three KPI sets — plus the five-step workflow behind every report.",
});
add("seo-reporting-plan-blank", {
  w: PAGE_W, h: PAGE_H, render: () => reportingPlanBlank("#0e7490"),
  name: "SEO reporting plan — blank",
  alt: "Blank SEO reporting plan table with KPI, audience, cadence, source, target and owner columns",
  caption: "The reporting plan: agree it once, before the first report goes out.",
});
add("seo-dashboard-template-sample", {
  w: DASH_W, h: DASH_H, render: () => dashboardTemplate(dashSample),
  name: "SEO dashboard template — filled example",
  alt: "SEO dashboard template example with Search Console scorecards, daily clicks trend, device split, top queries and top pages (sample data)",
  caption: "Filled example: a 28-day view for a fictional developer-tools company.",
});
add("seo-dashboard-template-blank", {
  w: DASH_W, h: DASH_H, render: () => dashboardTemplate(dashSample, { blank: true }),
  name: "SEO dashboard template — wireframe",
  alt: "SEO dashboard layout wireframe: filters, four scorecards, time series, device split, top queries and top pages tables",
  caption: "The wireframe: six widget groups, laid out in the order people read a dashboard.",
});

// --- Downloads ------------------------------------------------------------------
// CSV helpers: rows are arrays; a cell may be a function (rowNumberOf) => string
// so formulas can reference the right spreadsheet rows.
function csv(rows) {
  const q = (v) => (/[",\n]/.test(v) ? `"${String(v).replace(/"/g, '""')}"` : String(v));
  return rows.map((r) => r.map((c) => q(c ?? "")).join(",")).join("\r\n") + "\r\n";
}

function reportCsv() {
  // Row numbers are 1-based and fixed by position below.
  return csv([
    ["SEO report template — whizgraphs.com/seo-report-template/", "", "", "", ""],
    ["Section", "Field", "This period", "Previous period", "Change / notes"],
    ["Header", "Client / site", "", "", ""],
    ["Header", "Reporting period", "", "", ""],
    ["1 Headline", "One-sentence takeaway", "", "", ""],
    ["2 Key metrics", "Clicks", "", "", '=IF(D6="","",C6/D6-1)'],
    ["2 Key metrics", "Impressions", "", "", '=IF(D7="","",C7/D7-1)'],
    ["2 Key metrics", "CTR", '=IF(C7="","",C6/C7)', '=IF(D7="","",D6/D7)', '=IF(D8="","",C8-D8)'],
    ["2 Key metrics", "Average position", "", "", '=IF(D9="","",D9-C9)'],
    ["3 Trend", "Month 1 clicks", "", "", "Add one row per month (6–13 months)"],
    ["3 Trend", "Month 2 clicks", "", "", ""],
    ["3 Trend", "Month 3 clicks", "", "", ""],
    ["4 Top pages", "Page 1 URL", "", "", ""],
    ["4 Top pages", "Page 2 URL", "", "", ""],
    ["4 Top pages", "Page 3 URL", "", "", ""],
    ["4 Top pages", "Page 4 URL", "", "", ""],
    ["4 Top pages", "Page 5 URL", "", "", ""],
    ["5 Keyword wins", "Query 1 (position before → after)", "", "", ""],
    ["5 Keyword wins", "Query 2", "", "", ""],
    ["5 Keyword wins", "Query 3", "", "", ""],
    ["5 Keyword wins", "Query 4", "", "", ""],
    ["6 Work completed", "Item 1", "", "", ""],
    ["6 Work completed", "Item 2", "", "", ""],
    ["6 Work completed", "Item 3", "", "", ""],
    ["7 Next period plan", "Priority 1 (and the metric it should move)", "", "", ""],
    ["7 Next period plan", "Priority 2", "", "", ""],
    ["7 Next period plan", "Priority 3", "", "", ""],
  ]);
}

function monthlyCsv() {
  const rows = [
    ["Monthly SEO report template — whizgraphs.com/monthly-seo-report-template/", "", "", "", "", ""],
    ["Metric", "This month", "Last month", "MoM change", "Same month last year", "YoY change"],
  ];
  const metric = (name, n, kind) => {
    const r = n; // spreadsheet row number of this line
    const mom = kind === "pp" ? `=IF(C${r}="","",B${r}-C${r})` : kind === "pos" ? `=IF(C${r}="","",C${r}-B${r})` : `=IF(C${r}="","",B${r}/C${r}-1)`;
    const yoy = kind === "pp" ? `=IF(E${r}="","",B${r}-E${r})` : kind === "pos" ? `=IF(E${r}="","",E${r}-B${r})` : `=IF(E${r}="","",B${r}/E${r}-1)`;
    return [name, "", "", mom, "", yoy];
  };
  rows.push(metric("Clicks", 3));
  rows.push(metric("Impressions", 4));
  rows.push(["CTR", '=IF(B4="","",B3/B4)', '=IF(C4="","",C3/C4)', '=IF(C5="","",B5-C5)', '=IF(E4="","",E3/E4)', '=IF(E5="","",B5-E5)']);
  rows.push(metric("Average position (positive change = improved)", 6, "pos"));
  rows.push(metric("Pages with clicks", 7));
  rows.push(["", "", "", "", "", ""]);
  rows.push(["13-month trend", "Clicks", "Impressions", "", "", ""]);
  for (let i = 1; i <= 13; i++) rows.push([`Month ${i}`, "", "", "", "", ""]);
  rows.push(["", "", "", "", "", ""]);
  rows.push(["Biggest gains — page", "Δ clicks MoM", "Why", "", "", ""]);
  for (let i = 0; i < 3; i++) rows.push(["", "", "", "", "", ""]);
  rows.push(["Biggest drops — page", "Δ clicks MoM", "Why", "", "", ""]);
  for (let i = 0; i < 3; i++) rows.push(["", "", "", "", "", ""]);
  rows.push(["Done this month", "", "", "", "", ""]);
  rows.push(["Next month", "", "", "", "", ""]);
  return csv(rows);
}

function planCsv() {
  return csv([PLAN_COLUMNS, ...PLAN_EXAMPLES.map((r) => r.map((v) => `${v}`)), ...Array.from({ length: 10 }, () => PLAN_COLUMNS.map(() => ""))]);
}

function cadenceRows() {
  return CADENCES.map((c) => [c.name, c.audience, c.question, c.kpis.join("; "), c.format, c.template]);
}

function dashboardCsv() {
  return csv([
    ["Widget", "Metrics / dimensions", "Chart type", "Why it's there", "Data source"],
    ...DASH_WIDGETS.map((w) => [w.name, w.metric, w.chart, w.why, "Google Search Console · Performance"]),
  ]);
}

export const DOWNLOADS = {
  "seo-report-template": {
    pdf: { file: "/downloads/seo-report-template.pdf", pages: ["seo-report-template-blank", "seo-report-template-sample"], orientation: "portrait" },
    csv: { file: "/downloads/seo-report-template.csv", render: reportCsv },
  },
  "monthly-seo-report-template": {
    pdf: { file: "/downloads/monthly-seo-report-template.pdf", pages: ["monthly-seo-report-template-blank", "monthly-seo-report-template-sample"], orientation: "portrait" },
    csv: { file: "/downloads/monthly-seo-report-template.csv", render: monthlyCsv },
  },
  "seo-reporting-template": {
    pdf: { file: "/downloads/seo-reporting-template.pdf", pages: ["seo-reporting-framework", "seo-reporting-plan-blank"], orientation: "portrait" },
    csv: { file: "/downloads/seo-reporting-plan.csv", render: planCsv },
    extraCsv: { file: "/downloads/seo-reporting-cadences.csv", render: () => csv([["Cadence", "Audience", "Question it answers", "KPIs", "Format", "Start from"], ...cadenceRows()]) },
  },
  "seo-dashboard-template": {
    pdf: { file: "/downloads/seo-dashboard-template.pdf", pages: ["seo-dashboard-template-blank", "seo-dashboard-template-sample"], orientation: "landscape" },
    csv: { file: "/downloads/seo-dashboard-widgets.csv", render: dashboardCsv },
  },
};

export const CORE_IDS = core.map((c) => c.id);
export const CORE_TEMPLATE_IDS = Object.fromEntries(core.map((c) => [c.layout, c.id]));
