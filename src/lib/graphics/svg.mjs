// src/lib/graphics/svg.mjs
// Dependency-free SVG drawing primitives for WhizGraphs' static graphics.
// Every published infographic/template image is composed from these, then
// written to public/ by scripts/gen-assets.mjs (SVG for pages, PNG/PDF for
// downloads). Plain JS (not TS) so the Node generator can import it directly.

export const FONT = "Inter, 'Liberation Sans', Arial, Helvetica, sans-serif";

export const C = {
  ink: "#0f172a",
  body: "#334155",
  muted: "#64748b",
  faint: "#94a3b8",
  line: "#e2e8f0",
  panel: "#f8fafc",
  white: "#ffffff",
  up: "#16a34a",
  down: "#dc2626",
};

export const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function fmt(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 100_000) return Math.round(n / 1000) + "k";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(Math.round(n));
}

export const pct = (a, b) => ((a - b) / b) * 100;
export const signed = (n, digits = 0, unit = "%") => `${n >= 0 ? "+" : "−"}${Math.abs(n).toFixed(digits)}${unit}`;

export function text(x, y, str, o = {}) {
  const { size = 16, weight = 400, fill = C.body, anchor = "start", italic = false, ls } = o;
  return `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${italic ? ' font-style="italic"' : ""}${ls ? ` letter-spacing="${ls}"` : ""}>${esc(str)}</text>`;
}

// Greedy word wrap using an average glyph width; conservative so text never
// overflows in browsers whose fallback font is wider than the raster font.
export function wrap(str, maxWidth, size, bold = false) {
  const per = size * (bold ? 0.58 : 0.53);
  const max = Math.max(1, Math.floor(maxWidth / per));
  const words = String(str).split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > max && cur) {
      lines.push(cur);
      cur = w;
    } else cur = (cur + " " + w).trim();
  }
  if (cur) lines.push(cur);
  return lines;
}

export function para(x, y, str, maxWidth, o = {}) {
  const { size = 16, lh = 1.4, weight = 400 } = o;
  const lines = wrap(str, maxWidth, size, weight >= 600);
  return {
    svg: lines.map((l, i) => text(x, y + i * size * lh, l, o)).join(""),
    height: lines.length * size * lh,
  };
}

export function rect(x, y, w, h, o = {}) {
  const { fill = C.white, stroke = "none", r = 12, sw = 1.5, dash, opacity } = o;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ""}${opacity != null ? ` fill-opacity="${opacity}"` : ""}/>`;
}

export function line(x1, y1, x2, y2, o = {}) {
  const { stroke = C.line, sw = 1.5, dash, cap = "round" } = o;
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="${cap}"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
}

export function circle(cx, cy, r, o = {}) {
  const { fill = C.white, stroke = "none", sw = 1.5, opacity } = o;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${opacity != null ? ` fill-opacity="${opacity}"` : ""}/>`;
}

export function doc({ w, h, title, desc, body, bg = C.white }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="t d"><title id="t">${esc(title)}</title><desc id="d">${esc(desc)}</desc>${rect(0, 0, w, h, { fill: bg, r: 0 })}${body}</svg>`;
}

// Brand header row: logo tile, site name, template name, period pill.
export function brandHeader(x, y, w, { logo, site, label, period, color }) {
  const pillW = Math.max(150, period.length * 9.5 + 36);
  return [
    rect(x, y, 64, 64, { fill: color, r: 14 }),
    text(x + 32, y + 42, logo, { size: 24, weight: 700, fill: C.white, anchor: "middle" }),
    text(x + 84, y + 26, site, { size: 18, fill: C.muted }),
    text(x + 84, y + 54, label, { size: 22, weight: 700, fill: C.ink }),
    rect(x + w - pillW, y + 14, pillW, 38, { fill: "#f1f5f9", r: 19 }),
    text(x + w - pillW / 2, y + 39, period, { size: 16, fill: C.muted, anchor: "middle" }),
  ].join("");
}

export function footer(w, h, color, pad = 64) {
  return [
    line(pad, h - 92, w - pad, h - 92),
    text(pad, h - 52, "Sample data · fictional site", { size: 16, fill: C.faint }),
    text(w - pad, h - 52, "Made with WhizGraphs · whizgraphs.com", { size: 16, weight: 600, fill: color, anchor: "end" }),
  ].join("");
}

export function statTile(x, y, w, h, { label, value, delta, good = true, color }) {
  const dc = delta == null ? C.muted : good ? C.up : C.down;
  return [
    rect(x, y, w, h, { fill: C.panel, stroke: C.line }),
    text(x + 22, y + 36, label.toUpperCase(), { size: 14, weight: 600, fill: C.faint, ls: 1 }),
    text(x + 22, y + 84, value, { size: 40, weight: 700, fill: color || C.ink }),
    delta != null ? text(x + 22, y + h - 22, delta, { size: 16, weight: 600, fill: dc }) : "",
  ].join("");
}

// Line chart with gridlines and x labels. `id` keeps gradient ids unique.
export function lineChart(x, y, w, h, { values, labels, color, id, min0 = true, annotations = [], dashed = false, area = true, tickFmt = fmt }) {
  // Round gridlines: pick a 1/2/2.5/5×10^k step so ticks read 2k, 4k, 6k…
  const lo = min0 ? 0 : Math.min(...values) * 0.85;
  const raw = (Math.max(...values) * 1.05 - lo) / 4;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const stepV = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].map((m) => m * mag).find((v) => v >= raw);
  const min = min0 ? 0 : Math.floor(lo / stepV) * stepV;
  const max = min + stepV * 4;
  const sx = (i) => x + (i * w) / (values.length - 1);
  const sy = (v) => y + h - ((v - min) / (max - min)) * h;
  const out = [];
  for (let g = 0; g <= 4; g++) {
    const v = min + ((max - min) * g) / 4;
    const gy = sy(v);
    out.push(line(x, gy, x + w, gy, { stroke: C.line, sw: 1 }));
    out.push(text(x - 12, gy + 5, tickFmt(v), { size: 13, fill: C.faint, anchor: "end" }));
  }
  const pts = values.map((v, i) => [sx(i), sy(v)]);
  const d = pts.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`).join(" ");
  if (area) {
    out.push(
      `<defs><linearGradient id="${id}" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="${color}" stop-opacity="0.28"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>`,
    );
    out.push(`<path d="${d} L${x + w},${y + h} L${x},${y + h} Z" fill="url(#${id})"/>`);
  }
  out.push(`<path d="${d}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"${dashed ? ' stroke-dasharray="10 8"' : ""}/>`);
  pts.forEach(([px, py]) => out.push(circle(px, py, 5, { fill: color })));
  if (labels) labels.forEach((l, i) => out.push(text(sx(i), y + h + 28, l, { size: 14, fill: C.faint, anchor: "middle" })));
  for (const a of annotations) {
    const ax = sx(a.index);
    out.push(line(ax, y - 6, ax, y + h, { stroke: a.color || C.muted, sw: 1.5, dash: "5 6" }));
    out.push(text(ax + (a.anchor === "end" ? -8 : 8), y + 10, a.text, { size: 14, weight: 600, fill: a.color || C.muted, anchor: a.anchor || "start" }));
  }
  return out.join("");
}

export function hbars(x, y, w, { rows, color, rowH = 56, labelW = 300, valueFmt = fmt }) {
  const max = Math.max(...rows.map((r) => r.value));
  const barW = w - labelW - 110;
  return rows
    .map((r, i) => {
      const ry = y + i * rowH;
      return [
        text(x, ry + 24, r.label, { size: 17, fill: C.body }),
        rect(x + labelW, ry + 4, barW, 28, { fill: "#f1f5f9", r: 6 }),
        rect(x + labelW, ry + 4, Math.max(8, (r.value / max) * barW), 28, { fill: r.color || color, r: 6 }),
        text(x + w, ry + 25, valueFmt(r.value), { size: 17, weight: 700, fill: C.ink, anchor: "end" }),
      ].join("");
    })
    .join("");
}

export function donut(cx, cy, r, thickness, segments) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  let a0 = -Math.PI / 2;
  return segments
    .map((s) => {
      const a1 = a0 + (s.value / total) * Math.PI * 2;
      const large = a1 - a0 > Math.PI ? 1 : 0;
      const ro = r, ri = r - thickness;
      const p = (rad, a) => `${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`;
      const d = `M${p(ro, a0)} A${ro},${ro} 0 ${large} 1 ${p(ro, a1)} L${p(ri, a1)} A${ri},${ri} 0 ${large} 0 ${p(ri, a0)} Z`;
      a0 = a1;
      return `<path d="${d}" fill="${s.color}"/>`;
    })
    .join("");
}

// Arrow from (x1,y1) to (x2,y2) with a small head.
export function arrow(x1, y1, x2, y2, color = C.faint) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const hx = (d, off) => (x2 - d * Math.cos(a + off)).toFixed(1);
  const hy = (d, off) => (y2 - d * Math.sin(a + off)).toFixed(1);
  return line(x1, y1, x2, y2, { stroke: color, sw: 2 }) + `<path d="M${x2},${y2} L${hx(12, 0.45)},${hy(12, 0.45)} L${hx(12, -0.45)},${hy(12, -0.45)} Z" fill="${color}"/>`;
}

// A labeled field box used by the fill-in (blank) template variants.
export function field(x, y, w, h, { label, hint, lines = 0 }) {
  const out = [rect(x, y, w, h, { fill: C.white, stroke: "#cbd5e1", dash: "6 6", r: 10 })];
  out.push(text(x + 18, y + 30, label.toUpperCase(), { size: 13, weight: 700, fill: C.muted, ls: 1 }));
  if (hint) out.push(para(x + 18, y + 56, hint, w - 36, { size: 14, fill: C.faint, italic: true }).svg);
  for (let i = 0; i < lines; i++) {
    const ly = y + h - 22 - i * 34;
    if (ly < y + 80) break;
    out.push(line(x + 18, ly, x + w - 18, ly, { stroke: C.line, sw: 1 }));
  }
  return out.join("");
}
