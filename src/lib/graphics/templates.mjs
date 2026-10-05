// src/lib/graphics/templates.mjs
// Printable report/dashboard templates (filled sample + blank fill-in variant)
// and explanatory diagrams. Letter-portrait pages are 1275×1650 (8.5×11in at
// 150dpi) so the PNG maps 1:1 onto a printed PDF page.
import {
  C, doc, text, para, rect, line, circle, fmt, pct, signed, statTile, lineChart, hbars, donut, arrow, field,
} from "./svg.mjs";
import { trafficGrowth, IG_W, IG_H } from "./infographics.mjs";

export const PAGE_W = 1275;
export const PAGE_H = 1650;
const P = 70;
const PI = PAGE_W - P * 2;

function sectionTag(x, y, n, label, color) {
  return circle(x + 14, y - 6, 14, { fill: color }) + text(x + 14, y - 1, String(n), { size: 15, weight: 700, fill: C.white, anchor: "middle" }) + text(x + 38, y, label.toUpperCase(), { size: 14, weight: 700, fill: C.muted, ls: 1 });
}

function pageFooter(color, note = "Template by WhizGraphs · whizgraphs.com/seo-report-template/") {
  return line(P, PAGE_H - 70, PAGE_W - P, PAGE_H - 70) + text(P, PAGE_H - 36, note, { size: 15, fill: C.faint }) + text(PAGE_W - P, PAGE_H - 36, "whizgraphs.com", { size: 15, weight: 700, fill: color, anchor: "end" });
}

function pageHeader({ color, logo, title, site, period, blank }) {
  const out = [rect(P, P, 64, 64, { fill: blank ? C.white : color, stroke: blank ? "#cbd5e1" : "none", dash: blank ? "6 6" : undefined, r: 14 })];
  out.push(text(P + 32, P + 42, blank ? "LOGO" : logo, { size: blank ? 13 : 24, weight: 700, fill: blank ? C.faint : C.white, anchor: "middle" }));
  out.push(text(P + 84, P + 28, title, { size: 26, weight: 800, fill: C.ink }));
  out.push(text(P + 84, P + 56, blank ? "Client / site: ______________________" : site, { size: 17, fill: C.muted }));
  out.push(rect(PAGE_W - P - 300, P + 12, 300, 42, { fill: blank ? C.white : "#f1f5f9", stroke: blank ? "#cbd5e1" : "none", dash: blank ? "6 6" : undefined, r: 21 }));
  out.push(text(PAGE_W - P - 150, P + 39, blank ? "Period: ____________" : period, { size: 16, fill: C.muted, anchor: "middle" }));
  return out.join("");
}

function bulletList(x, y, w, items, color, size = 17) {
  let yy = y;
  return items
    .map((it) => {
      const p = para(x + 22, yy, it, w - 22, { size, fill: C.body });
      const s = circle(x + 6, yy - size * 0.35, 4, { fill: color }) + p.svg;
      yy += p.height + 10;
      return s;
    })
    .join("");
}

// ---------------------------------------------------------------------------
// One-page SEO report template
// ---------------------------------------------------------------------------
export function seoReportTemplate(d, { blank = false } = {}) {
  const c = d.color;
  const k = d.kpis;
  const ctr = (x) => (x.clicks / x.impressions) * 100;
  const out = [pageHeader({ color: c, logo: d.logo, title: "SEO Report", site: d.site, period: d.period, blank })];
  let y = 200;
  out.push(sectionTag(P, y, 1, "Headline takeaway", c));
  if (blank) out.push(field(P, y + 18, PI, 110, { label: "One sentence", hint: "What changed this period, and why — the line a busy reader remembers if they read nothing else." }));
  else {
    out.push(rect(P, y + 18, PI, 110, { fill: `${c}10`, stroke: `${c}40`, r: 14 }));
    const hl = para(0, 0, d.headline, PI - 52, { size: 26, weight: 700, lh: 1.25 });
    out.push(para(P + 26, y + 18 + (110 - hl.height) / 2 + 26, d.headline, PI - 52, { size: 26, weight: 700, fill: C.ink, lh: 1.25 }).svg);
  }
  y = 380;
  out.push(sectionTag(P, y, 2, `Key metrics vs ${blank ? "previous period" : d.prevLabel}`, c));
  const tw = (PI - 3 * 16) / 4;
  const tiles = blank
    ? ["Clicks", "Impressions", "CTR", "Avg position"].map((l) => ({ l }))
    : [
        { l: "Clicks", v: fmt(k.cur.clicks), d: signed(pct(k.cur.clicks, k.prev.clicks)), g: true },
        { l: "Impressions", v: fmt(k.cur.impressions), d: signed(pct(k.cur.impressions, k.prev.impressions)), g: true },
        { l: "CTR", v: `${ctr(k.cur).toFixed(1)}%`, d: signed(ctr(k.cur) - ctr(k.prev), 1, "pp"), g: ctr(k.cur) >= ctr(k.prev) },
        { l: "Avg position", v: k.cur.position.toFixed(1), d: `${k.cur.position < k.prev.position ? "▲ " : "▼ "}${Math.abs(k.cur.position - k.prev.position).toFixed(1)} places`, g: k.cur.position < k.prev.position },
      ];
  tiles.forEach((t, i) => {
    const x = P + i * (tw + 16);
    if (blank) out.push(field(x, y + 18, tw, 150, { label: t.l, hint: "This period · Δ vs last", lines: 1 }));
    else out.push(statTile(x, y + 18, tw, 150, { label: t.l, value: t.v, delta: `${t.d} vs ${d.prevLabel}`, good: t.g, color: i === 0 ? c : undefined }));
  });
  y = 590;
  out.push(sectionTag(P, y, 3, "Clicks trend", c));
  if (blank) out.push(field(P, y + 18, PI, 300, { label: "Chart", hint: "Plot monthly clicks (and optionally impressions) for the last 6–13 months. Mark anything that explains a jump or dip: launches, migrations, algorithm updates." }));
  else {
    out.push(rect(P, y + 18, PI, 300, { fill: C.white, stroke: C.line, r: 14 }));
    out.push(lineChart(P + 90, y + 60, PI - 130, 200, { values: d.trend.map((t) => t.clicks), labels: d.trend.map((t) => t.label), color: c, id: `rt-${d.id}`, annotations: d.annotations || [] }));
  }
  y = 950;
  const half = (PI - 24) / 2;
  out.push(sectionTag(P, y, 4, "Top pages", c));
  out.push(sectionTag(P + half + 24, y, 5, "Keyword wins", c));
  if (blank) {
    out.push(field(P, y + 18, half, 320, { label: "Page · clicks · Δ", hint: "Your 5 highest-click URLs and their change vs last period.", lines: 5 }));
    out.push(field(P + half + 24, y + 18, half, 320, { label: "Query · before → after", hint: "Queries whose average position improved most. Lead with any that reached page one.", lines: 5 }));
  } else {
    out.push(rect(P, y + 18, half, 320, { fill: C.white, stroke: C.line, r: 14 }));
    out.push(hbars(P + 22, y + 52, half - 44, { rows: d.topPages.map((p) => ({ label: p.url, value: p.clicks })), color: c, rowH: 54, labelW: 230 }));
    d.topPages.forEach((p, i) => out.push(text(P + 22, y + 52 + i * 54 + 48, `${signed(pct(p.clicks, p.prev))} vs ${d.prevLabel}`, { size: 13, fill: p.clicks >= p.prev ? C.up : C.down })));
    out.push(rect(P + half + 24, y + 18, half, 320, { fill: C.white, stroke: C.line, r: 14 }));
    d.wins.forEach((w, i) => {
      const yy = y + 66 + i * 62;
      out.push(text(P + half + 46, yy, w.query, { size: 18, weight: 600, fill: C.ink }));
      out.push(text(P + PI - 22, yy, `#${w.before} → #${w.after}`, { size: 18, weight: 700, fill: C.up, anchor: "end" }));
      out.push(text(P + half + 46, yy + 24, `${fmt(w.clicks)} clicks this period`, { size: 14, fill: C.muted }));
    });
  }
  y = 1320;
  out.push(sectionTag(P, y, 6, "Work completed", c));
  out.push(sectionTag(P + half + 24, y, 7, "Next period plan", c));
  if (blank) {
    out.push(field(P, y + 18, half, 220, { label: "Shipped", hint: "What was done, linked to the numbers above where you can.", lines: 3 }));
    out.push(field(P + half + 24, y + 18, half, 220, { label: "Planned", hint: "Two or three priorities, each tied to a metric you’ll report next time.", lines: 3 }));
  } else {
    out.push(rect(P, y + 18, half, 220, { fill: C.panel, stroke: C.line, r: 14 }));
    out.push(bulletList(P + 22, y + 60, half - 44, d.done, c, 16));
    out.push(rect(P + half + 24, y + 18, half, 220, { fill: C.panel, stroke: C.line, r: 14 }));
    out.push(bulletList(P + half + 46, y + 60, half - 44, d.next, c, 16));
  }
  out.push(pageFooter(c, blank ? "Blank SEO report template · WhizGraphs · whizgraphs.com/seo-report-template/" : "Sample data, fictional site · Template: whizgraphs.com/seo-report-template/"));
  const desc = blank
    ? "Blank one-page SEO report template with seven sections: headline takeaway, key metrics (clicks, impressions, CTR, average position), clicks trend chart, top pages, keyword wins, work completed, and next period plan."
    : `Filled one-page SEO report for ${d.site}, ${d.period}: ${fmt(k.cur.clicks)} clicks (${signed(pct(k.cur.clicks, k.prev.clicks))} vs ${d.prevLabel}), clicks trend, top pages, keyword wins, work completed and next steps. Sample data.`;
  return doc({ w: PAGE_W, h: PAGE_H, title: blank ? "Blank SEO report template" : `SEO report example — ${d.site}`, desc, body: out.join("") });
}

// ---------------------------------------------------------------------------
// Monthly SEO report template (MoM + YoY)
// ---------------------------------------------------------------------------
export function monthlyReportTemplate(d, { blank = false } = {}) {
  const c = d.color;
  const out = [pageHeader({ color: c, logo: d.logo, title: "Monthly SEO Report", site: d.site, period: d.period, blank })];
  let y = 200;
  out.push(sectionTag(P, y, 1, "This month in one line", c));
  if (blank) out.push(field(P, y + 18, PI, 100, { label: "Summary", hint: "Lead with the month-over-month direction, then the year-over-year context." }));
  else {
    out.push(rect(P, y + 18, PI, 100, { fill: `${c}10`, stroke: `${c}40`, r: 14 }));
    const hl = para(0, 0, d.headline, PI - 52, { size: 24, weight: 700 });
    out.push(para(P + 26, y + 18 + (100 - hl.height) / 2 + 24, d.headline, PI - 52, { size: 24, weight: 700, fill: C.ink }).svg);
  }
  y = 370;
  out.push(sectionTag(P, y, 2, "Month-over-month & year-over-year", c));
  const cols = [P + 24, P + 330, P + 530, P + 700, P + 900, P + PI - 24];
  const heads = ["Metric", blank ? "This month" : d.curLabel, blank ? "Last month" : d.prevLabel, "MoM", blank ? "Same month LY" : d.lyLabel, "YoY"];
  out.push(rect(P, y + 18, PI, 330, { fill: C.white, stroke: blank ? "#cbd5e1" : C.line, dash: blank ? "6 6" : undefined, r: 14 }));
  heads.forEach((h, i) => out.push(text(i === 0 ? cols[0] : cols[i] + (i === 5 ? 0 : 110), y + 64, h.toUpperCase(), { size: 13, weight: 700, fill: C.muted, ls: 1, anchor: i === 0 ? "start" : "end" })));
  const rows = [
    ["Clicks", (m) => m.clicks, fmt, false],
    ["Impressions", (m) => m.impressions, fmt, false],
    ["CTR", (m) => (m.clicks / m.impressions) * 100, (v) => `${v.toFixed(1)}%`, false],
    ["Avg position", (m) => m.position, (v) => v.toFixed(1), true],
    ["Pages with clicks", (m) => m.pagesWithClicks, fmt, false],
  ];
  rows.forEach(([label, get, f, lowerBetter], i) => {
    const ry = y + 112 + i * 48;
    out.push(line(P + 24, ry - 32, P + PI - 24, ry - 32, { stroke: C.line, sw: 1 }));
    out.push(text(cols[0], ry, label, { size: 18, weight: 600, fill: C.ink }));
    if (blank) {
      [1, 2, 3, 4, 5].forEach((ci) => out.push(line(cols[ci] - 30 + (ci === 5 ? -110 : 0), ry + 4, cols[ci] + (ci === 5 ? 0 : 110), ry + 4, { stroke: C.line, sw: 1 })));
      return;
    }
    const cur = get(d.cur), prev = get(d.prev), ly = get(d.ly);
    const delta = (a, b) => (label === "CTR" ? signed(a - b, 1, "pp") : label === "Avg position" ? `${a < b ? "▲" : "▼"} ${Math.abs(a - b).toFixed(1)}` : signed(pct(a, b)));
    const good = (a, b) => (lowerBetter ? a < b : a >= b);
    out.push(text(cols[1] + 110, ry, f(cur), { size: 18, weight: 700, fill: C.ink, anchor: "end" }));
    out.push(text(cols[2] + 110, ry, f(prev), { size: 18, fill: C.body, anchor: "end" }));
    out.push(text(cols[3] + 110, ry, delta(cur, prev), { size: 18, weight: 700, fill: good(cur, prev) ? C.up : C.down, anchor: "end" }));
    out.push(text(cols[4] + 110, ry, f(ly), { size: 18, fill: C.body, anchor: "end" }));
    out.push(text(cols[5], ry, delta(cur, ly), { size: 18, weight: 700, fill: good(cur, ly) ? C.up : C.down, anchor: "end" }));
  });
  y = 760;
  out.push(sectionTag(P, y, 3, "13-month clicks trend", c));
  if (blank) out.push(field(P, y + 18, PI, 270, { label: "Chart", hint: "Thirteen months lets the reader compare this month with the same month last year on one line — seasonality stops looking like a problem." }));
  else {
    out.push(rect(P, y + 18, PI, 270, { fill: C.white, stroke: C.line, r: 14 }));
    out.push(lineChart(P + 90, y + 58, PI - 130, 175, { values: d.trend.map((t) => t.clicks), labels: d.trend.map((t) => t.label), color: c, id: `mt-${d.id}` }));
  }
  y = 1090;
  const half = (PI - 24) / 2;
  out.push(sectionTag(P, y, 4, "Biggest gains", c));
  out.push(sectionTag(P + half + 24, y, 5, "Biggest drops", c));
  const moverBox = (x, list, up) => {
    if (blank) return field(x, y + 18, half, 210, { label: "Page · Δ clicks MoM", hint: up ? "Three pages that gained the most clicks." : "Three pages that lost the most — with a one-line reason.", lines: 3 });
    const parts = [rect(x, y + 18, half, 210, { fill: C.white, stroke: C.line, r: 14 })];
    list.forEach((m, i) => {
      const yy = y + 66 + i * 58;
      parts.push(text(x + 22, yy, m.url, { size: 17, weight: 600, fill: C.ink }));
      parts.push(text(x + half - 22, yy, `${m.delta > 0 ? "+" : "−"}${fmt(Math.abs(m.delta))} clicks`, { size: 17, weight: 700, fill: up ? C.up : C.down, anchor: "end" }));
      parts.push(text(x + 22, yy + 24, m.why, { size: 14, fill: C.muted }));
    });
    return parts.join("");
  };
  out.push(moverBox(P, d.gains, true));
  out.push(moverBox(P + half + 24, d.drops, false));
  y = 1350;
  out.push(sectionTag(P, y, 6, "Done this month", c));
  out.push(sectionTag(P + half + 24, y, 7, "Next month", c));
  if (blank) {
    out.push(field(P, y + 18, half, 190, { label: "Shipped", lines: 3 }));
    out.push(field(P + half + 24, y + 18, half, 190, { label: "Planned", lines: 3 }));
  } else {
    out.push(rect(P, y + 18, half, 190, { fill: C.panel, stroke: C.line, r: 14 }));
    out.push(bulletList(P + 22, y + 58, half - 44, d.done, c, 16));
    out.push(rect(P + half + 24, y + 18, half, 190, { fill: C.panel, stroke: C.line, r: 14 }));
    out.push(bulletList(P + half + 46, y + 58, half - 44, d.next, c, 16));
  }
  out.push(pageFooter(c, blank ? "Blank monthly SEO report template · whizgraphs.com/monthly-seo-report-template/" : "Sample data, fictional site · Template: whizgraphs.com/monthly-seo-report-template/"));
  const desc = blank
    ? "Blank monthly SEO report template: one-line summary, a month-over-month and year-over-year table for clicks, impressions, CTR, average position and pages with clicks, a 13-month clicks trend, biggest gains and drops, and done / next month lists."
    : `Filled monthly SEO report for ${d.site}, ${d.period}: ${fmt(d.cur.clicks)} clicks, ${signed(pct(d.cur.clicks, d.prev.clicks))} month over month and ${signed(pct(d.cur.clicks, d.ly.clicks))} year over year, with a 13-month trend and page-level gains and drops. Sample data.`;
  return doc({ w: PAGE_W, h: PAGE_H, title: blank ? "Blank monthly SEO report template" : `Monthly SEO report example — ${d.site}`, desc, body: out.join("") });
}

// ---------------------------------------------------------------------------
// SEO reporting framework (cadence × audience) + blank reporting plan
// ---------------------------------------------------------------------------
export const CADENCES = [
  {
    name: "Weekly pulse",
    audience: "In-house SEO / content team",
    question: "Did anything break or spike this week?",
    kpis: ["Clicks & impressions, week over week", "Pages newly losing clicks", "Indexing & crawl errors"],
    format: "3–5 bullet message in Slack or email",
    template: "SEO dashboard template",
  },
  {
    name: "Monthly report",
    audience: "Client, manager, or stakeholder",
    question: "Is SEO working, and what are you doing next?",
    kpis: ["Clicks, impressions, CTR, avg position (MoM + YoY)", "Top pages & keyword wins", "Work completed vs plan"],
    format: "One-page report or infographic",
    template: "Monthly SEO report template",
  },
  {
    name: "Quarterly review",
    audience: "Founder, exec, or budget owner",
    question: "Is the investment paying off against the goal?",
    kpis: ["Non-brand clicks vs target", "Conversions or leads from organic", "Strategic bets: kept, cut, added"],
    format: "Short deck or one-page snapshot",
    template: "SEO report template",
  },
];

export const WORKFLOW = ["Pull the data", "Check for anomalies", "Write the headline", "Build the visuals", "Send & log decisions"];

export function reportingFramework(color) {
  const out = [];
  out.push(text(P, P + 34, "SEO reporting framework", { size: 34, weight: 800, fill: C.ink }));
  out.push(para(P, P + 76, "Three cadences, each with its own audience, question, and KPI set. Report the same numbers to everyone and nobody gets what they need.", PI, { size: 18, fill: C.muted }).svg);
  const cardH = 330;
  CADENCES.forEach((cd, i) => {
    const y = 230 + i * (cardH + 24);
    out.push(rect(P, y, PI, cardH, { fill: C.white, stroke: C.line, r: 18 }));
    out.push(rect(P, y, 14, cardH, { fill: color, r: 7, opacity: 1 - i * 0.25 }));
    out.push(text(P + 40, y + 52, cd.name, { size: 28, weight: 800, fill: C.ink }));
    out.push(text(P + PI - 30, y + 52, cd.audience, { size: 18, weight: 600, fill: color, anchor: "end" }));
    out.push(text(P + 40, y + 96, "ANSWERS", { size: 13, weight: 700, fill: C.faint, ls: 1 }));
    out.push(text(P + 40, y + 124, `“${cd.question}”`, { size: 20, fill: C.body, italic: true }));
    out.push(text(P + 40, y + 172, "KPIS", { size: 13, weight: 700, fill: C.faint, ls: 1 }));
    out.push(bulletList(P + 40, y + 202, 640, cd.kpis, color, 18));
    out.push(text(P + 740, y + 172, "FORMAT", { size: 13, weight: 700, fill: C.faint, ls: 1 }));
    out.push(para(P + 740, y + 202, cd.format, PI - 780, { size: 18, fill: C.body }).svg);
    out.push(text(P + 740, y + 262, "START FROM", { size: 13, weight: 700, fill: C.faint, ls: 1 }));
    out.push(text(P + 740, y + 290, cd.template, { size: 18, weight: 600, fill: color }));
  });
  const wy = 230 + 3 * (cardH + 24) + 30;
  out.push(text(P, wy, "EVERY REPORT, EVERY CADENCE", { size: 14, weight: 700, fill: C.muted, ls: 1 }));
  const sw = (PI - 4 * 20) / 5;
  WORKFLOW.forEach((s, i) => {
    const x = P + i * (sw + 20);
    out.push(rect(x, wy + 20, sw, 130, { fill: C.panel, stroke: C.line, r: 14 }));
    out.push(circle(x + 30, wy + 52, 16, { fill: color }));
    out.push(text(x + 30, wy + 58, String(i + 1), { size: 16, weight: 700, fill: C.white, anchor: "middle" }));
    out.push(para(x + 20, wy + 96, s, sw - 30, { size: 17, weight: 600, fill: C.ink }).svg);
    if (i < 4) out.push(arrow(x + sw + 2, wy + 70, x + sw + 18, wy + 70, C.faint));
  });
  out.push(pageFooter(color, "SEO reporting framework · whizgraphs.com/seo-reporting-template/"));
  return doc({
    w: PAGE_W,
    h: PAGE_H,
    title: "SEO reporting framework: weekly, monthly, quarterly",
    desc: "SEO reporting framework showing three cadences — weekly pulse for the in-house team, monthly report for clients or managers, quarterly review for executives — with the question each answers, its KPIs, format and starting template, plus a five-step reporting workflow.",
    body: out.join(""),
  });
}

export const PLAN_COLUMNS = ["KPI", "Audience", "Cadence", "Source", "Target / goal", "Owner"];
export const PLAN_EXAMPLES = [
  ["Non-brand clicks", "Client", "Monthly", "GSC · query filter", "Agreed with client", "SEO lead"],
  ["Pages losing clicks", "Content team", "Weekly", "GSC · Pages, compare", "Flag any >20% drop", "Content editor"],
  ["Organic leads", "Founder", "Quarterly", "Analytics · goals", "Set per quarter", "Marketing"],
];

export function reportingPlanBlank(color) {
  const out = [];
  out.push(text(P, P + 34, "SEO reporting plan", { size: 34, weight: 800, fill: C.ink }));
  out.push(para(P, P + 76, "One row per KPI you commit to reporting. Fill it in with your client or team before the first report — it settles what “working” means up front.", PI, { size: 18, fill: C.muted }).svg);
  const widths = [220, 160, 130, 220, 220, PI - 950];
  const tx = [P];
  widths.forEach((w, i) => tx.push(tx[i] + w));
  const ty = 220;
  out.push(rect(P, ty, PI, 64, { fill: color, r: 12 }));
  PLAN_COLUMNS.forEach((h, i) => out.push(text(tx[i] + 16, ty + 40, h, { size: 17, weight: 700, fill: C.white })));
  const rowH = 70;
  for (let r = 0; r < 18; r++) {
    const y = ty + 64 + r * rowH;
    out.push(rect(P, y, PI, rowH, { fill: r % 2 ? C.white : C.panel, r: 0 }));
    widths.forEach((_, i) => i && out.push(line(tx[i], y, tx[i], y + rowH, { stroke: C.line, sw: 1 })));
    if (r < PLAN_EXAMPLES.length) PLAN_EXAMPLES[r].forEach((v, i) => out.push(text(tx[i] + 16, y + 42, v, { size: 15, fill: C.faint, italic: true })));
  }
  out.push(text(P, ty + 64 + 18 * rowH + 36, "Grey rows are examples — overwrite them.", { size: 15, fill: C.faint, italic: true }));
  out.push(pageFooter(color, "Blank SEO reporting plan · whizgraphs.com/seo-reporting-template/"));
  return doc({
    w: PAGE_W,
    h: PAGE_H,
    title: "Blank SEO reporting plan template",
    desc: "Blank SEO reporting plan table with columns for KPI, audience, cadence, data source, target and owner, with three example rows.",
    body: out.join(""),
  });
}

// ---------------------------------------------------------------------------
// SEO dashboard template (landscape)
// ---------------------------------------------------------------------------
export const DASH_W = 1600;
export const DASH_H = 1000;

export const DASH_WIDGETS = [
  { name: "Filters", metric: "Date range · device · country · page group", chart: "Controls", why: "Lets one dashboard answer many questions without a new report." },
  { name: "Scorecards", metric: "Clicks · impressions · CTR · avg position", chart: "Scorecard + sparkline", why: "The four Search Console totals with change vs the previous period." },
  { name: "Trend", metric: "Clicks and impressions by day or week", chart: "Time series", why: "Shows direction and when a change started." },
  { name: "Top queries", metric: "Query · clicks · impressions · CTR · position", chart: "Table, sortable", why: "Where demand is coming from." },
  { name: "Top pages", metric: "Page · clicks · Δ clicks", chart: "Table with change column", why: "Which URLs are gaining or losing." },
  { name: "Device split", metric: "Clicks by device", chart: "Bar or donut", why: "Catches problems that only affect one device." },
];

export function dashboardTemplate(d, { blank = false } = {}) {
  const c = d.color;
  const p = 48, iw = DASH_W - p * 2;
  const out = [rect(0, 0, DASH_W, DASH_H, { fill: "#f1f5f9", r: 0 })];
  out.push(text(p, p + 30, blank ? "SEO dashboard — layout template" : `SEO dashboard · ${d.site}`, { size: 28, weight: 800, fill: C.ink }));
  // filter bar
  const filters = ["Last 28 days vs previous", "All devices", "All countries", "All pages"];
  filters.forEach((f, i) => {
    const fx = p + iw - (filters.length - i) * 230 + 10;
    out.push(rect(fx, p, 220, 44, { fill: C.white, stroke: blank ? "#cbd5e1" : C.line, dash: blank ? "6 6" : undefined, r: 10 }));
    out.push(text(fx + 16, p + 28, blank ? ["Date range", "Device", "Country", "Page group"][i] : f, { size: 15, fill: C.body }));
  });
  // scorecards
  const sy = p + 74, sw = (iw - 3 * 20) / 4, sh = 150;
  const cards = blank
    ? ["Clicks", "Impressions", "CTR", "Avg position"].map((l) => ({ l }))
    : [
        { l: "Clicks", v: fmt(d.cur.clicks), dd: signed(pct(d.cur.clicks, d.prev.clicks)), g: d.cur.clicks >= d.prev.clicks, s: d.daily.map((x) => x.clicks) },
        { l: "Impressions", v: fmt(d.cur.impressions), dd: signed(pct(d.cur.impressions, d.prev.impressions)), g: true, s: d.daily.map((x) => x.impressions) },
        { l: "CTR", v: `${((d.cur.clicks / d.cur.impressions) * 100).toFixed(1)}%`, dd: signed((d.cur.clicks / d.cur.impressions - d.prev.clicks / d.prev.impressions) * 100, 1, "pp"), g: d.cur.clicks / d.cur.impressions >= d.prev.clicks / d.prev.impressions },
        { l: "Avg position", v: d.cur.position.toFixed(1), dd: `${d.cur.position < d.prev.position ? "▲" : "▼"} ${Math.abs(d.cur.position - d.prev.position).toFixed(1)}`, g: d.cur.position < d.prev.position },
      ];
  cards.forEach((cd, i) => {
    const x = p + i * (sw + 20);
    if (blank) return out.push(field(x, sy, sw, sh, { label: `Scorecard · ${cd.l}`, hint: "Value + change vs previous period + sparkline" }));
    out.push(statTile(x, sy, sw, sh, { label: cd.l, value: cd.v, delta: `${cd.dd} vs prev 28d`, good: cd.g, color: i === 0 ? c : undefined }));
  });
  // trend
  const ty = sy + sh + 20, th = 330, tw = iw * 0.62;
  if (blank) out.push(field(p, ty, tw, th, { label: "Time series · clicks & impressions", hint: "Daily or weekly. Add annotations for releases, migrations and Google updates." }));
  else {
    out.push(rect(p, ty, tw, th, { fill: C.white, stroke: C.line, r: 14 }));
    out.push(text(p + 24, ty + 38, "Clicks per day · last 28 days", { size: 16, weight: 600, fill: C.body }));
    out.push(lineChart(p + 80, ty + 70, tw - 110, th - 120, { values: d.daily.map((x) => x.clicks), labels: d.daily.map((x, i) => (i % 7 === 0 ? x.label : "")), color: c, id: `dash-${d.id}`, min0: false }));
  }
  // device split
  const dx = p + tw + 20, dw = iw - tw - 20;
  if (blank) out.push(field(dx, ty, dw, th, { label: "Device split", hint: "Clicks by desktop / mobile / tablet." }));
  else {
    out.push(rect(dx, ty, dw, th, { fill: C.white, stroke: C.line, r: 14 }));
    out.push(text(dx + 24, ty + 38, "Clicks by device", { size: 16, weight: 600, fill: C.body }));
    const total = d.devices.reduce((a, x) => a + x.value, 0);
    const shades = [c, `${c}99`, "#cbd5e1"];
    out.push(donut(dx + 140, ty + 190, 100, 34, d.devices.map((x, i) => ({ value: x.value, color: shades[i] }))));
    d.devices.forEach((x, i) => {
      out.push(rect(dx + 280, ty + 130 + i * 44, 18, 18, { fill: shades[i], r: 4 }));
      out.push(text(dx + 308, ty + 145 + i * 44, `${x.label} · ${((x.value / total) * 100).toFixed(0)}%`, { size: 16, fill: C.body }));
    });
  }
  // tables
  const by = ty + th + 20, bh = DASH_H - by - p, bw = (iw - 20) / 2;
  if (blank) {
    out.push(field(p, by, bw, bh, { label: "Table · top queries", hint: "Query, clicks, impressions, CTR, position — sortable.", lines: 4 }));
    out.push(field(p + bw + 20, by, bw, bh, { label: "Table · top pages", hint: "Page, clicks, change vs previous period.", lines: 4 }));
  } else {
    const table = (x, title, headers, rows) => {
      const parts = [rect(x, by, bw, bh, { fill: C.white, stroke: C.line, r: 14 }), text(x + 24, by + 36, title, { size: 16, weight: 600, fill: C.body })];
      const cx = [x + 24, x + bw - 300, x + bw - 160, x + bw - 24];
      headers.forEach((h, i) => parts.push(text(cx[i], by + 66, h.toUpperCase(), { size: 12, weight: 700, fill: C.faint, ls: 1, anchor: i ? "end" : "start" })));
      rows.forEach((r, ri) => {
        const ry = by + 98 + ri * 34;
        r.forEach((v, i) => parts.push(text(cx[i], ry, v.t ?? v, { size: 15, weight: i ? 400 : 600, fill: v.f || (i ? C.body : C.ink), anchor: i ? "end" : "start" })));
      });
      return parts.join("");
    };
    out.push(table(p, "Top queries", ["Query", "Clicks", "CTR", "Position"], d.queries.map((q) => [q.query, fmt(q.clicks), `${((q.clicks / q.impressions) * 100).toFixed(1)}%`, q.position.toFixed(1)])));
    out.push(table(p + bw + 20, "Top pages", ["Page", "Clicks", "Prev", "Change"], d.pages.map((pg) => [pg.url, fmt(pg.clicks), fmt(pg.prev), { t: signed(pct(pg.clicks, pg.prev)), f: pg.clicks >= pg.prev ? C.up : C.down }])));
  }
  if (!blank) out.push(text(DASH_W - p, DASH_H - 16, "Sample data, fictional site · whizgraphs.com/seo-dashboard-template/", { size: 13, fill: C.faint, anchor: "end" }));
  else out.push(text(DASH_W - p, DASH_H - 16, "Layout template · whizgraphs.com/seo-dashboard-template/", { size: 13, fill: C.faint, anchor: "end" }));
  return doc({
    w: DASH_W,
    h: DASH_H,
    title: blank ? "SEO dashboard layout template (wireframe)" : `SEO dashboard example — ${d.site}`,
    desc: blank
      ? "Wireframe SEO dashboard layout: filter bar (date, device, country, page group), four Search Console scorecards, clicks and impressions time series, device split, and top queries and top pages tables."
      : `SEO dashboard for ${d.site} over the last 28 days: ${fmt(d.cur.clicks)} clicks (${signed(pct(d.cur.clicks, d.prev.clicks))}), daily clicks trend, device split, top queries and top pages. Sample data.`,
    body: out.join(""),
  });
}

// ---------------------------------------------------------------------------
// Explanatory diagrams
// ---------------------------------------------------------------------------
export function anatomyDiagram(cfg) {
  const W = 1600, H = 1000;
  const scale = 0.6;
  const ox = 60, oy = (H - IG_H * scale) / 2;
  const inner = trafficGrowth(cfg).replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "").replace(/<title[^>]*>.*?<\/title><desc[^>]*>.*?<\/desc>/, "");
  const nested = `<svg x="${ox}" y="${oy}" width="${IG_W * scale}" height="${IG_H * scale}" viewBox="0 0 ${IG_W} ${IG_H}">${inner}</svg>`;
  const callouts = [
    { y: 96, label: "Brand & period", body: "Logo, site, and the date range — the reader knows whose data and when." },
    { y: 260, label: "Headline", body: "The takeaway as a sentence. If they read nothing else, they read this." },
    { y: 430, label: "Three stat tiles", body: "The numbers that matter, each with its change — never a bare total." },
    { y: 780, label: "One chart", body: "A single visual that carries the argument. One question per image." },
    { y: 1350, label: "A line of context", body: "Why it moved, in plain words — the part a chart can’t say." },
    { y: 1440, label: "Source & credit", body: "Where the data came from, so the image stands alone when forwarded." },
  ];
  const out = [nested];
  const cx = 860;
  callouts.forEach((co, i) => {
    const ty = 90 + i * 140;
    const py = oy + co.y * scale;
    out.push(line(ox + IG_W * scale + 8, py, cx - 24, ty + 20, { stroke: cfg.color, sw: 1.5, dash: "4 6" }));
    out.push(circle(ox + IG_W * scale + 8, py, 6, { fill: cfg.color }));
    out.push(circle(cx, ty + 20, 22, { fill: cfg.color }));
    out.push(text(cx, ty + 27, String(i + 1), { size: 20, weight: 700, fill: C.white, anchor: "middle" }));
    out.push(text(cx + 40, ty + 28, co.label, { size: 26, weight: 700, fill: C.ink }));
    out.push(para(cx + 40, ty + 62, co.body, W - cx - 100, { size: 18, fill: C.muted }).svg);
  });
  return doc({
    w: W,
    h: H,
    title: "Anatomy of an SEO infographic",
    desc: "Annotated SEO infographic showing its six parts: brand and period, headline, three stat tiles with change, one chart, a line of context, and source credit.",
    body: rect(0, 0, W, H, { fill: C.panel, r: 0 }) + out.join(""),
  });
}

export function searchFunnelDiagram(color) {
  const W = 1600, H = 900;
  const out = [rect(0, 0, W, H, { fill: C.white, r: 0 })];
  out.push(text(80, 100, "How Search Console counts your search performance", { size: 38, weight: 800, fill: C.ink }));
  const stages = [
    { label: "Someone searches", sub: "Google runs a query. Not every query shows your site.", w: 1000, fill: "#e2e8f0", ink: C.body },
    { label: "Impression", sub: "A link to your page appears in the results the user sees.", w: 780, fill: `${color}55`, ink: C.ink },
    { label: "Click", sub: "The user clicks through to your site.", w: 520, fill: color, ink: C.white },
  ];
  stages.forEach((s, i) => {
    const y = 170 + i * 200;
    const x = 80 + (1000 - s.w) / 2;
    out.push(rect(x, y, s.w, 150, { fill: s.fill, r: 18 }));
    out.push(text(80 + 500, y + 66, s.label, { size: 32, weight: 800, fill: s.ink, anchor: "middle" }));
    out.push(para(80 + 500, y + 108, s.sub, s.w - 80, { size: 18, fill: s.ink, anchor: "middle" }).svg);
  });
  const fx = 1160;
  const formula = (y, title, f, note) =>
    rect(fx, y, 360, 230, { fill: C.panel, stroke: C.line, r: 18 }) +
    text(fx + 28, y + 50, title, { size: 22, weight: 800, fill: color }) +
    para(fx + 28, y + 92, f, 304, { size: 20, weight: 700, fill: C.ink }).svg +
    para(fx + 28, y + 160, note, 304, { size: 15, fill: C.muted }).svg;
  out.push(formula(170, "CTR", "Clicks ÷ impressions", "The share of people who saw your result and chose it."));
  out.push(formula(430, "Average position", "Mean of your topmost position per impression", "Lower is better; 1 is the top result."));
  out.push(para(80, 820, "Each metric can be split by query, page, country, device, search appearance and date — the raw material for every SEO infographic.", 1440, { size: 19, fill: C.muted }).svg);
  return doc({
    w: W,
    h: H,
    title: "How Google Search Console counts impressions, clicks, CTR and position",
    desc: "Funnel diagram: a search happens, your page earns an impression when it appears in results, and a click when the user visits. CTR equals clicks divided by impressions; average position is the mean of your topmost position per impression.",
    body: out.join(""),
  });
}

export function gscMapDiagram(color) {
  const W = 1600, H = 1000;
  const out = [rect(0, 0, W, H, { fill: C.panel, r: 0 })];
  out.push(text(80, 96, "From the Search Console Performance report to an infographic", { size: 34, weight: 800, fill: C.ink }));
  const left = [
    { t: "Dates tab", s: "Clicks, impressions, CTR, position per day" },
    { t: "Queries tab", s: "The searches that showed your site" },
    { t: "Pages tab", s: "Which URLs earned the clicks" },
    { t: "Countries & Devices tabs", s: "Where and how people searched" },
  ];
  const right = [
    { t: "Traffic Growth", s: "Trend line + headline totals" },
    { t: "Keyword Wins · CTR Opportunities", s: "Position moves and under-clicked queries" },
    { t: "Top Pages · Content Performance", s: "Contribution and CTR vs rank by URL" },
    { t: "Audience Mix", s: "Device and country split" },
  ];
  const box = (x, y, it, accent) =>
    rect(x, y, 560, 150, { fill: C.white, stroke: accent ? color : C.line, sw: accent ? 2.5 : 1.5, r: 18 }) +
    text(x + 30, y + 62, it.t, { size: 26, weight: 800, fill: accent ? color : C.ink }) +
    text(x + 30, y + 104, it.s, { size: 18, fill: C.muted });
  out.push(text(80, 170, "SEARCH CONSOLE · PERFORMANCE", { size: 15, weight: 700, fill: C.muted, ls: 1 }));
  out.push(text(W - 640, 170, "WHIZGRAPHS TEMPLATE", { size: 15, weight: 700, fill: C.muted, ls: 1 }));
  left.forEach((it, i) => {
    const y = 200 + i * 190;
    out.push(box(80, y, it, false));
    out.push(box(W - 640, y, right[i], true));
    out.push(arrow(80 + 560 + 20, y + 75, W - 640 - 20, y + 75, color));
  });
  return doc({
    w: W,
    h: H,
    title: "Mapping Search Console Performance data to SEO infographic templates",
    desc: "Diagram mapping the Google Search Console Performance report tabs — Dates, Queries, Pages, Countries and Devices — to WhizGraphs templates: Traffic Growth, Keyword Wins and CTR Opportunities, Top Pages and Content Performance, and Audience Mix.",
    body: out.join(""),
  });
}
