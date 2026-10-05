// src/lib/graphics/infographics.mjs
// The five WhizGraphs infographic layouts (plus three extra story layouts used
// in the examples gallery), rendered as 1200×1500 SVG. All figures shown are
// computed from the mock inputs passed in — nothing here invents a number.
import {
  C, doc, text, para, rect, line, circle, fmt, pct, signed, brandHeader, footer, statTile, lineChart, hbars, donut,
} from "./svg.mjs";

export const IG_W = 1200;
export const IG_H = 1500;
const PAD = 64;
const INNER = IG_W - PAD * 2;

function frame(cfg, label, bodyParts, { title, desc }) {
  const c = cfg.color;
  const head = brandHeader(PAD, PAD, INNER, { logo: cfg.logo, site: cfg.site, label, period: cfg.period, color: c });
  const h1 = para(PAD, 230, cfg.headline, INNER, { size: 54, weight: 800, fill: C.ink, lh: 1.15 });
  const glow = `<defs><radialGradient id="glow-${cfg.id}" cx="0" cy="0" r="1" gradientTransform="translate(0 0) scale(900 420)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${c}" stop-opacity="0.12"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs><rect width="${IG_W}" height="${IG_H}" fill="url(#glow-${cfg.id})"/>`;
  const top = 230 + h1.height + 10;
  const note = cfg.note ? para(PAD, IG_H - 150, cfg.note, INNER, { size: 19, fill: C.body }).svg : "";
  return doc({
    w: IG_W,
    h: IG_H,
    title,
    desc,
    body: glow + head + h1.svg + bodyParts(top) + note + footer(IG_W, IG_H, c),
  });
}

export function trafficGrowth(cfg) {
  const s = cfg.series;
  const first = s[0], last = s[s.length - 1];
  const ctrLast = (last.clicks / last.impressions) * 100;
  const ctrFirst = (first.clicks / first.impressions) * 100;
  const desc = `Line chart of monthly Google Search clicks for ${cfg.site} from ${first.label} to ${last.label}: ${fmt(first.clicks)} to ${fmt(last.clicks)} clicks (${(last.clicks / first.clicks).toFixed(1)}×). Impressions ${fmt(first.impressions)} to ${fmt(last.impressions)}. Sample data.`;
  return frame(cfg, "Traffic Growth", (top) => {
    const tw = (INNER - 40) / 3;
    const tiles = [
      statTile(PAD, top + 20, tw, 160, { label: `Clicks · ${last.label}`, value: fmt(last.clicks), delta: `${signed(pct(last.clicks, first.clicks))} vs ${first.label}`, color: cfg.color }),
      statTile(PAD + tw + 20, top + 20, tw, 160, { label: `Impressions · ${last.label}`, value: fmt(last.impressions), delta: `${signed(pct(last.impressions, first.impressions))} vs ${first.label}` }),
      statTile(PAD + (tw + 20) * 2, top + 20, tw, 160, { label: "CTR", value: `${ctrLast.toFixed(1)}%`, delta: `${signed(ctrLast - ctrFirst, 1, "pp")} vs ${first.label}`, good: ctrLast >= ctrFirst }),
    ].join("");
    const cy = top + 220;
    const ch = IG_H - 200 - cy - (cfg.note ? 40 : 0);
    return (
      tiles +
      rect(PAD, cy, INNER, ch, { fill: C.white, stroke: C.line, r: 16 }) +
      text(PAD + 28, cy + 44, "Monthly clicks from Google Search", { size: 18, weight: 600, fill: C.body }) +
      lineChart(PAD + 90, cy + 90, INNER - 130, ch - 160, {
        values: s.map((p) => p.clicks),
        labels: s.map((p) => p.label),
        color: cfg.color,
        id: `lc-${cfg.id}`,
        annotations: cfg.annotations || [],
      })
    );
  }, { title: `${cfg.site} — ${cfg.headline}`, desc });
}

export function topPages(cfg) {
  const total = cfg.totalClicks;
  const sum = cfg.pages.reduce((a, p) => a + p.clicks, 0);
  const share = (sum / total) * 100;
  const desc = `Horizontal bar chart of the top ${cfg.pages.length} pages on ${cfg.site} by Google Search clicks; together they earned ${fmt(sum)} of ${fmt(total)} clicks (${share.toFixed(0)}%). Sample data.`;
  return frame(cfg, "Top Pages", (top) => {
    const rows = cfg.pages.map((p) => ({ label: p.url, value: p.clicks }));
    const tw = (INNER - 20) / 2;
    const ty = top + 20;
    const tableY = ty + 200;
    const out = [
      statTile(PAD, ty, tw, 160, { label: `Share of all clicks`, value: `${share.toFixed(0)}%`, delta: `${cfg.pages.length} of ${cfg.pageCount} indexed URLs`, color: cfg.color }),
      statTile(PAD + tw + 20, ty, tw, 160, { label: "Clicks from these pages", value: fmt(sum), delta: `of ${fmt(total)} total` }),
      rect(PAD, tableY, INNER, 96 + rows.length * 84 + 120, { fill: C.white, stroke: C.line, r: 16 }),
      text(PAD + 28, tableY + 44, "Clicks by page", { size: 18, weight: 600, fill: C.body }),
      hbars(PAD + 28, tableY + 76, INNER - 56, { rows, color: cfg.color, rowH: 84, labelW: 380 }),
    ];
    const my = tableY + 76 + rows.length * 84 + 30;
    out.push(line(PAD + 28, my, PAD + INNER - 28, my));
    cfg.pages.slice(0, 3).forEach((p, i) => {
      const x = PAD + 28 + i * ((INNER - 56) / 3);
      out.push(text(x, my + 40, `${p.url.length > 22 ? p.url.slice(0, 21) + "…" : p.url}`, { size: 15, fill: C.muted }));
      out.push(text(x, my + 68, `CTR ${((p.clicks / p.impressions) * 100).toFixed(1)}% · pos ${p.position.toFixed(1)}`, { size: 16, weight: 600, fill: C.ink }));
    });
    return out.join("");
  }, { title: `${cfg.site} — ${cfg.headline}`, desc });
}

export function keywordWins(cfg) {
  const desc = `Ranking gains for ${cfg.wins.length} queries on ${cfg.site}, showing average Google position before and after: ${cfg.wins.map((w) => `“${w.query}” ${w.before}→${w.after}`).join(", ")}. Sample data.`;
  return frame(cfg, "Keyword Wins", (top) => {
    const out = [];
    const rowH = Math.min(150, (IG_H - 260 - top - 70) / cfg.wins.length - 16);
    const page1 = cfg.wins.filter((w) => w.after <= 10 && w.before > 10).length;
    out.push(text(PAD, top + 40, `${page1} of ${cfg.wins.length} queries moved onto page one`, { size: 20, weight: 600, fill: cfg.color }));
    cfg.wins.forEach((w, i) => {
      const y = top + 70 + i * (rowH + 16);
      const bx = PAD + 28, bw = INNER - 56 - 260;
      const gain = w.before - w.after;
      out.push(rect(PAD, y, INNER, rowH, { fill: C.white, stroke: C.line, r: 16 }));
      out.push(text(bx, y + 46, w.query, { size: 24, weight: 700, fill: C.ink }));
      out.push(text(PAD + INNER - 28, y + 46, `${fmt(w.clicks)} clicks`, { size: 18, fill: C.muted, anchor: "end" }));
      // position track: 1 (left) … 50 (right)
      const tx = (p) => bx + 60 + ((Math.min(p, 50) - 1) / 49) * bw;
      out.push(line(bx + 60, y + 92, bx + 60 + bw, y + 92, { stroke: C.line, sw: 8 }));
      out.push(line(tx(w.after), y + 92, tx(w.before), y + 92, { stroke: cfg.color, sw: 8 }));
      out.push(circle(tx(w.before), y + 92, 10, { fill: C.white, stroke: C.faint, sw: 3 }));
      out.push(circle(tx(w.after), y + 92, 12, { fill: cfg.color }));
      out.push(text(bx, y + 99, "#1", { size: 14, fill: C.faint }));
      out.push(text(PAD + INNER - 28, y + 100, `#${w.before} → #${w.after}  (${gain > 0 ? "▲" : "▼"}${Math.abs(gain)})`, { size: 20, weight: 700, fill: gain > 0 ? C.up : C.down, anchor: "end" }));
    });
    return out.join("");
  }, { title: `${cfg.site} — ${cfg.headline}`, desc });
}

export function contentPerformance(cfg) {
  const rows = cfg.rows;
  const desc = `Scatter plot of ${rows.length} articles on ${cfg.site}: click-through rate against average Google position, bubble size by clicks. Highlights pages that rank well but earn a low CTR. Sample data.`;
  return frame(cfg, "Content Performance", (top) => {
    const x = PAD + 80, y = top + 70, w = INNER - 120, h = IG_H - top - 440;
    const maxPos = 12, maxCtr = 10;
    const sx = (p) => x + (p / maxPos) * w;
    const sy = (c) => y + h - (c / maxCtr) * h;
    const maxClicks = Math.max(...rows.map((r) => r.clicks));
    const avgCtr = rows.reduce((a, r) => a + (r.clicks / r.impressions) * 100, 0) / rows.length;
    const out = [rect(PAD, top + 10, INNER, h + 200, { fill: C.white, stroke: C.line, r: 16 })];
    for (let g = 0; g <= 5; g++) {
      out.push(line(x, sy(g * 2), x + w, sy(g * 2), { stroke: C.line, sw: 1 }));
      out.push(text(x - 12, sy(g * 2) + 5, `${g * 2}%`, { size: 13, fill: C.faint, anchor: "end" }));
    }
    for (let p = 0; p <= 12; p += 2) out.push(text(sx(p), y + h + 26, p === 0 ? "" : String(p), { size: 13, fill: C.faint, anchor: "middle" }));
    out.push(text(x, top + 48, "CTR (%) vs. average position — bubble size = clicks", { size: 17, weight: 600, fill: C.body }));
    out.push(text(x + w, y + h + 54, "Average position →  (lower is better)", { size: 14, fill: C.faint, anchor: "end" }));
    out.push(line(x, sy(avgCtr), x + w, sy(avgCtr), { stroke: cfg.color, sw: 1.5, dash: "6 6" }));
    out.push(text(x + w - 4, sy(avgCtr) - 10, `site avg CTR ${avgCtr.toFixed(1)}%`, { size: 14, fill: cfg.color, anchor: "end" }));
    rows.forEach((r) => {
      const ctr = (r.clicks / r.impressions) * 100;
      const rad = 12 + (r.clicks / maxClicks) * 34;
      const under = ctr < avgCtr && r.position <= 6;
      out.push(circle(sx(r.position), sy(ctr), rad, { fill: under ? C.down : cfg.color, opacity: 0.22, stroke: under ? C.down : cfg.color, sw: 2.5 }));
      out.push(text(sx(r.position), sy(ctr) - rad - 8, r.title, { size: 14, weight: 600, fill: C.body, anchor: "middle" }));
    });
    const ly = y + h + 104;
    out.push(circle(PAD + 40, ly - 6, 9, { fill: C.down, opacity: 0.22, stroke: C.down, sw: 2.5 }));
    out.push(text(PAD + 60, ly, "Top-6 rank but below-average CTR → rewrite title & meta description first", { size: 16, fill: C.body }));
    return out.join("");
  }, { title: `${cfg.site} — ${cfg.headline}`, desc });
}

export function seoHealth(cfg) {
  const t = cfg.tiles;
  const desc = `SEO health snapshot for ${cfg.site}: ${t.map((x) => `${x.label} ${x.value}`).join(", ")}. Sample data.`;
  return frame(cfg, "SEO Health Snapshot", (top) => {
    const tw = (INNER - 20) / 2, th = 170;
    const out = t.map((x, i) =>
      statTile(PAD + (i % 2) * (tw + 20), top + 20 + Math.floor(i / 2) * (th + 20), tw, th, { label: x.label, value: x.value, delta: x.delta, good: x.good !== false, color: i === 0 ? cfg.color : undefined }),
    );
    const ry = top + 20 + Math.ceil(t.length / 2) * (th + 20);
    if (cfg.status) {
      out.push(rect(PAD, ry, INNER, 96, { fill: `${cfg.color}14`, stroke: `${cfg.color}55`, r: 16 }));
      out.push(text(PAD + 28, ry + 58, cfg.status, { size: 20, weight: 600, fill: C.ink }));
    }
    return out.join("");
  }, { title: `${cfg.site} — ${cfg.headline}`, desc });
}

export function brandSplit(cfg) {
  const s = cfg.months;
  const last = s[s.length - 1];
  const share = (m) => (m.nonBrand / (m.nonBrand + m.brand)) * 100;
  const desc = `Donut chart of branded vs non-branded Google Search clicks for ${cfg.site} in ${last.label}: ${share(last).toFixed(0)}% non-branded, up from ${share(s[0]).toFixed(0)}% in ${s[0].label}. Sample data.`;
  return frame(cfg, "Brand vs Non-brand", (top) => {
    const cx = PAD + 230, cy = top + 260;
    const out = [
      rect(PAD, top + 20, INNER, 480, { fill: C.white, stroke: C.line, r: 16 }),
      donut(cx, cy, 180, 56, [
        { value: last.nonBrand, color: cfg.color },
        { value: last.brand, color: "#cbd5e1" },
      ]),
      text(cx, cy + 6, `${share(last).toFixed(0)}%`, { size: 56, weight: 800, fill: C.ink, anchor: "middle" }),
      text(cx, cy + 42, "non-brand", { size: 18, fill: C.muted, anchor: "middle" }),
    ];
    const lx = PAD + 500;
    out.push(rect(lx, top + 120, 22, 22, { fill: cfg.color, r: 5 }), text(lx + 36, top + 138, `Non-brand clicks · ${fmt(last.nonBrand)}`, { size: 20, fill: C.body }));
    out.push(rect(lx, top + 170, 22, 22, { fill: "#cbd5e1", r: 5 }), text(lx + 36, top + 188, `Branded clicks · ${fmt(last.brand)}`, { size: 20, fill: C.body }));
    out.push(para(lx, top + 260, "Non-brand clicks come from people who didn’t already know the name — the clearest sign content is finding new audiences.", INNER - 520, { size: 18, fill: C.muted }).svg);
    // monthly share bars
    const by = top + 540, bh = 300;
    out.push(rect(PAD, by, INNER, bh + 110, { fill: C.white, stroke: C.line, r: 16 }));
    out.push(text(PAD + 28, by + 44, "Non-brand share of clicks, by month", { size: 18, weight: 600, fill: C.body }));
    const bw = (INNER - 56) / s.length;
    s.forEach((m, i) => {
      const v = share(m);
      const hh = (v / 100) * bh;
      const x = PAD + 28 + i * bw;
      out.push(rect(x + 14, by + 70 + bh - hh, bw - 28, hh, { fill: i === s.length - 1 ? cfg.color : `${cfg.color}66`, r: 8 }));
      out.push(text(x + bw / 2, by + 60 + bh - hh, `${v.toFixed(0)}%`, { size: 15, weight: 600, fill: C.body, anchor: "middle" }));
      out.push(text(x + bw / 2, by + bh + 96, m.label, { size: 14, fill: C.faint, anchor: "middle" }));
    });
    return out.join("");
  }, { title: `${cfg.site} — ${cfg.headline}`, desc });
}

export function ctrOpportunity(cfg) {
  const q = cfg.queries;
  const desc = `Table of ${q.length} queries on ${cfg.site} with high impressions but low click-through rate, sorted by impressions, with average position and current CTR. Sample data.`;
  return frame(cfg, "CTR Opportunities", (top) => {
    const out = [rect(PAD, top + 20, INNER, 120 + q.length * 112, { fill: C.white, stroke: C.line, r: 16 })];
    const cols = [PAD + 28, PAD + 560, PAD + 760, PAD + 920];
    ["Query", "Impressions", "Position", "CTR"].forEach((h, i) =>
      out.push(text(cols[i] + (i ? 120 : 0), top + 70, h.toUpperCase(), { size: 14, weight: 700, fill: C.faint, ls: 1, anchor: i ? "end" : "start" })),
    );
    const maxImp = Math.max(...q.map((r) => r.impressions));
    q.forEach((r, i) => {
      const y = top + 100 + i * 112;
      const ctr = (r.clicks / r.impressions) * 100;
      out.push(line(PAD + 28, y, PAD + INNER - 28, y));
      out.push(text(cols[0], y + 40, r.query, { size: 21, weight: 600, fill: C.ink }));
      out.push(rect(cols[0], y + 56, 440 * (r.impressions / maxImp), 10, { fill: `${cfg.color}55`, r: 5 }));
      out.push(text(cols[1] + 120, y + 48, fmt(r.impressions), { size: 21, fill: C.body, anchor: "end" }));
      out.push(text(cols[2] + 120, y + 48, r.position.toFixed(1), { size: 21, fill: C.body, anchor: "end" }));
      out.push(text(cols[3] + 120, y + 48, `${ctr.toFixed(1)}%`, { size: 21, weight: 700, fill: C.down, anchor: "end" }));
    });
    const ny = top + 180 + q.length * 112;
    out.push(para(PAD, ny, "All five already rank on page one. The fix is packaging — a sharper title tag and meta description — not more links.", INNER, { size: 19, weight: 600, fill: cfg.color }).svg);
    return out.join("");
  }, { title: `${cfg.site} — ${cfg.headline}`, desc });
}

export function audienceMix(cfg) {
  const desc = `Bar charts of Google Search clicks for ${cfg.site} by device (${cfg.devices.map((d) => `${d.label} ${fmt(d.value)}`).join(", ")}) and by country (${cfg.countries.map((d) => `${d.label} ${fmt(d.value)}`).join(", ")}). Sample data.`;
  return frame(cfg, "Audience Mix", (top) => {
    const out = [];
    const dTotal = cfg.devices.reduce((a, d) => a + d.value, 0);
    out.push(rect(PAD, top + 20, INNER, 120 + cfg.devices.length * 64, { fill: C.white, stroke: C.line, r: 16 }));
    out.push(text(PAD + 28, top + 64, "Clicks by device", { size: 18, weight: 600, fill: C.body }));
    out.push(hbars(PAD + 28, top + 92, INNER - 56, { rows: cfg.devices.map((d) => ({ ...d })), color: cfg.color, rowH: 64, labelW: 200, valueFmt: (v) => `${fmt(v)} · ${((v / dTotal) * 100).toFixed(0)}%` }));
    const cy = top + 180 + cfg.devices.length * 64;
    out.push(rect(PAD, cy, INNER, 120 + cfg.countries.length * 60, { fill: C.white, stroke: C.line, r: 16 }));
    out.push(text(PAD + 28, cy + 44, "Clicks by country", { size: 18, weight: 600, fill: C.body }));
    out.push(hbars(PAD + 28, cy + 72, INNER - 56, { rows: cfg.countries, color: `${cfg.color}`, rowH: 60, labelW: 260 }));
    return out.join("");
  }, { title: `${cfg.site} — ${cfg.headline}`, desc });
}

export const LAYOUTS = {
  "traffic-growth": trafficGrowth,
  "top-pages": topPages,
  "keyword-wins": keywordWins,
  "content-performance": contentPerformance,
  "seo-health": seoHealth,
  "brand-split": brandSplit,
  "ctr-opportunity": ctrOpportunity,
  "audience-mix": audienceMix,
};
