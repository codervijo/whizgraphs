#!/usr/bin/env node
// scripts/gen-assets.mjs — regenerate every static graphic and download.
//
//   public/graphics/<id>.svg   on-page images (crisp, small, crawlable)
//   public/graphics/<id>.png   og:image + "download PNG"
//   public/downloads/*.pdf     printable templates (blank + filled example)
//   public/downloads/*.csv     fill-in data sheets (open in Excel / Sheets)
//
// Source of truth: src/lib/graphics/catalog.mjs. Outputs are committed, so the
// Cloudflare build never needs sharp or fonts. Run inside the sites1 container:
//
//   docker exec -w /usr/src/app/whizgraphs.com sites1 node scripts/gen-assets.mjs
//
// Raster text needs a sans font; the container has none, so the script uses
// any .ttf files in .cache/fonts/ (gitignored) via a private fontconfig file.
import { mkdirSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const PUB = join(ROOT, "public");
const FONT_DIR = join(ROOT, ".cache", "fonts");

function step(ok, msg) {
  console.log(`${ok === true ? "✓" : ok === "skip" ? "↷" : "✗"} ${msg}`);
}

if (!existsSync(FONT_DIR) || !readdirSync(FONT_DIR).some((f) => f.endsWith(".ttf"))) {
  step(false, `no .ttf fonts in ${FONT_DIR} — copy e.g. LiberationSans-{Regular,Bold}.ttf there first`);
  process.exit(1);
}
const conf = join(ROOT, ".cache", "fonts.conf");
writeFileSync(conf, `<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig><dir>${FONT_DIR}</dir><cachedir>${join(ROOT, ".cache", "fontcache")}</cachedir></fontconfig>`);
process.env.FONTCONFIG_FILE = conf;

let sharp;
try {
  // sharp ships as Astro's optional dependency; resolve it through astro.
  const req = createRequire(createRequire(import.meta.url).resolve("astro/package.json"));
  sharp = req("sharp");
} catch (e) {
  step(false, `sharp not available (${e.message}). Run \`pnpm install\` inside the sites1 container.`);
  process.exit(1);
}

const { GRAPHICS, DOWNLOADS } = await import("../src/lib/graphics/catalog.mjs");

mkdirSync(join(PUB, "graphics"), { recursive: true });
mkdirSync(join(PUB, "downloads"), { recursive: true });

const jpegs = {};
for (const g of Object.values(GRAPHICS)) {
  const svg = g.render();
  writeFileSync(join(PUB, g.svg), svg);
  const img = sharp(Buffer.from(svg), { density: 72 });
  await img.clone().png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(join(PUB, g.png));
  jpegs[g.id] = await img.clone().flatten({ background: "#ffffff" }).jpeg({ quality: 88 }).toBuffer();
  step(true, `${g.id} (${g.w}×${g.h}) → svg, png`);
}

// Minimal PDF writer: one full-bleed-with-margin JPEG per page (DCTDecode
// embeds the JPEG bytes as-is, so no PDF library is needed).
function writePdf(file, pageIds, orientation, title) {
  const [pw, ph] = orientation === "landscape" ? [792, 612] : [612, 792];
  const margin = 18;
  const chunks = [];
  const offsets = [];
  let len = 0;
  const push = (b) => {
    const buf = typeof b === "string" ? Buffer.from(b, "latin1") : b;
    chunks.push(buf);
    len += buf.length;
  };
  const obj = (n, body) => {
    offsets[n] = len;
    push(`${n} 0 obj\n`);
    for (const part of [].concat(body)) push(part);
    push(`\nendobj\n`);
  };
  push("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
  const n = pageIds.length;
  const pageObj = (i) => 4 + i * 3;
  obj(1, `<< /Type /Catalog /Pages 2 0 R >>`);
  obj(2, `<< /Type /Pages /Kids [${pageIds.map((_, i) => `${pageObj(i)} 0 R`).join(" ")}] /Count ${n} >>`);
  obj(3, `<< /Title (${title.replace(/[()\\]/g, "")}) /Producer (WhizGraphs gen-assets) >>`);
  pageIds.forEach((id, i) => {
    const g = GRAPHICS[id];
    const jpg = jpegs[id];
    const s = Math.min((pw - margin * 2) / g.w, (ph - margin * 2) / g.h);
    const dw = g.w * s, dh = g.h * s;
    const dx = (pw - dw) / 2, dy = (ph - dh) / 2;
    const content = `q ${dw.toFixed(2)} 0 0 ${dh.toFixed(2)} ${dx.toFixed(2)} ${dy.toFixed(2)} cm /Im0 Do Q`;
    const p = pageObj(i);
    obj(p, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pw} ${ph}] /Resources << /XObject << /Im0 ${p + 2} 0 R >> >> /Contents ${p + 1} 0 R >>`);
    obj(p + 1, [`<< /Length ${content.length} >>\nstream\n`, content, `\nendstream`]);
    obj(p + 2, [`<< /Type /XObject /Subtype /Image /Width ${g.w} /Height ${g.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpg.length} >>\nstream\n`, jpg, `\nendstream`]);
  });
  const total = 4 + n * 3;
  const xref = len;
  push(`xref\n0 ${total}\n0000000000 65535 f \n`);
  for (let k = 1; k < total; k++) push(`${String(offsets[k]).padStart(10, "0")} 00000 n \n`);
  push(`trailer\n<< /Size ${total} /Root 1 0 R /Info 3 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
  writeFileSync(join(PUB, file), Buffer.concat(chunks));
}

for (const [key, d] of Object.entries(DOWNLOADS)) {
  writePdf(d.pdf.file, d.pdf.pages, d.pdf.orientation, `${key.replace(/-/g, " ")} — WhizGraphs`);
  step(true, `${d.pdf.file} (${d.pdf.pages.length} pages)`);
  for (const c of [d.csv, d.extraCsv].filter(Boolean)) {
    // UTF-8 BOM so Excel opens em dashes and arrows correctly.
    writeFileSync(join(PUB, c.file), "﻿" + c.render());
    step(true, c.file);
  }
}
