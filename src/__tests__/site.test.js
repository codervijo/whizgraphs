// src/__tests__/site.test.js
// Built-site regression checks (run after `pnpm build`, as `make test` does).
// Guards the v2 SEO cluster: canonical/trailing-slash discipline, crawlable
// images with alt + dimensions, valid JSON-LD, internal links that resolve,
// and that every generated graphic/download exists in public/.
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { GRAPHICS, DOWNLOADS } from '../lib/graphics/catalog.mjs';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const PUB = join(ROOT, 'public');
const SITE = 'https://whizgraphs.com';

const CLUSTER = [
  '/seo-infographics/',
  '/seo-infographic-examples/',
  '/seo-report-template/',
  '/monthly-seo-report-template/',
  '/seo-reporting-template/',
  '/seo-dashboard-template/',
  '/gsc-infographic-report/',
];

function pages(dir = DIST, base = '/') {
  const out = [];
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) out.push(...pages(p, `${base}${f}/`));
    else if (f === 'index.html') out.push(base);
  }
  return out;
}
const html = (route) => readFileSync(join(DIST, route, 'index.html'), 'utf8');
const exists = (path) => existsSync(join(DIST, path)) || existsSync(join(DIST, path, 'index.html'));

describe('generated assets', () => {
  it('every catalog graphic has an svg and png in public/', () => {
    for (const g of Object.values(GRAPHICS)) {
      expect(existsSync(join(PUB, g.svg)), g.svg).toBe(true);
      expect(existsSync(join(PUB, g.png)), g.png).toBe(true);
    }
  });
  it('every download file exists in public/', () => {
    for (const d of Object.values(DOWNLOADS)) {
      for (const f of [d.pdf.file, d.csv.file, d.extraCsv?.file].filter(Boolean)) {
        expect(existsSync(join(PUB, f)), f).toBe(true);
      }
    }
  });
  it('the retired page 301s to the template hub', () => {
    const r = readFileSync(join(PUB, '_redirects'), 'utf8');
    expect(r).toMatch(/^\/seo-report-infographic\/ \/seo-report-template\/ 301$/m);
  });
});

describe('built site', () => {
  it('dist/ exists (run `pnpm build` first)', () => {
    expect(existsSync(join(DIST, 'index.html'))).toBe(true);
  });

  it('builds every cluster page and not the retired one', () => {
    for (const p of CLUSTER) expect(exists(p), p).toBe(true);
    expect(exists('/seo-report-infographic/')).toBe(false);
  });

  for (const route of CLUSTER) {
    describe(route, () => {
      const doc = () => html(route);
      it('has exactly one <h1>', () => {
        expect(doc().match(/<h1[\s>]/g)?.length).toBe(1);
      });
      it('has a with-slash self canonical and og:url', () => {
        expect(doc()).toContain(`<link rel="canonical" href="${SITE}${route}">`);
        expect(doc()).toContain(`<meta property="og:url" content="${SITE}${route}">`);
      });
      it('has a title ≤ 65 chars and a description ≤ 170 chars', () => {
        const t = doc().match(/<title>([^<]*)<\/title>/)[1];
        const d = doc().match(/<meta name="description" content="([^"]*)"/)[1];
        expect(t.length).toBeLessThanOrEqual(65);
        expect(d.length).toBeLessThanOrEqual(170);
      });
      it('has an og:image that exists', () => {
        const m = doc().match(/<meta property="og:image" content="([^"]+)"/);
        expect(m).not.toBeNull();
        expect(exists(m[1].replace(SITE, ''))).toBe(true);
      });
      it('every JSON-LD block parses', () => {
        const blocks = [...doc().matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
        expect(blocks.length).toBeGreaterThanOrEqual(2);
        for (const b of blocks) expect(() => JSON.parse(b[1])).not.toThrow();
      });
      it('every <img> has alt, width, height and a file that exists', () => {
        const imgs = [...doc().matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
        expect(imgs.length).toBeGreaterThan(0);
        for (const tag of imgs) {
          expect(tag, tag).toMatch(/\balt="[^"]{10,}"/);
          expect(tag, tag).toMatch(/\bwidth="\d+"/);
          expect(tag, tag).toMatch(/\bheight="\d+"/);
          expect(exists(tag.match(/\bsrc="([^"]+)"/)[1]), tag).toBe(true);
        }
      });
    });
  }

  it('every internal link on every page resolves and page links end in /', () => {
    const bad = [];
    for (const route of pages()) {
      for (const [, href] of html(route).matchAll(/<a\b[^>]*\bhref="(\/[^"#?]*)/g)) {
        const isFile = /\.[a-z0-9]+$/i.test(href);
        if (!isFile && !href.endsWith('/')) bad.push(`${route} → ${href} (no trailing slash)`);
        else if (!exists(href)) bad.push(`${route} → ${href} (missing)`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('every cluster page is linked from at least two other pages', () => {
    const all = pages();
    for (const target of CLUSTER) {
      const from = all.filter((r) => r !== target && html(r).includes(`href="${target}"`));
      expect(from.length, target).toBeGreaterThanOrEqual(2);
    }
  });
});
