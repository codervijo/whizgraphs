import {
  TEMPLATES,
  type ReportTemplate,
  trafficSeries,
  topPages,
  keywordWins,
  contentRows,
  healthSnapshot,
} from "../lib/mockData";
import { ArrowUpRight, TrendingUp, Search, FileText, Activity, Globe } from "lucide-react";

export interface InfographicConfig {
  template: ReportTemplate;
  siteName: string;
  dateRange: string;
  brandColor: string;
  logo: string;
  headline: string;
  notes: string;
}

export const defaultConfig: InfographicConfig = {
  template: "traffic-growth",
  siteName: "acme.com",
  dateRange: "Jan – Aug 2026",
  brandColor: "#0891b2",
  logo: "AC",
  headline: "SEO is compounding fast.",
  notes: "Clicks up 3.4× vs. start of year. Long-form guides drive most of the gain.",
};

function fmt(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "k";
  return n.toString();
}

function Sparkline({ points, color, height = 80 }: { points: number[]; color: string; height?: number }) {
  const w = 320;
  const h = height;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => [i * step, h - ((p - min) / range) * (h - 8) - 4] as const);
  const path = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spk" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spk)" />
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {coords.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill={color} />
      ))}
    </svg>
  );
}

function Bars({ values, labels, color }: { values: number[]; labels: string[]; color: string }) {
  const max = Math.max(...values);
  return (
    <div className="space-y-2">
      {values.map((v, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-28 truncate text-xs text-slate-500" title={labels[i]}>
            {labels[i]}
          </div>
          <div className="relative h-5 flex-1 overflow-hidden rounded bg-slate-100">
            <div
              className="h-full rounded transition-all"
              style={{ width: `${(v / max) * 100}%`, background: color }}
            />
          </div>
          <div className="w-14 text-right text-xs font-medium tabular-nums text-slate-700">{fmt(v)}</div>
        </div>
      ))}
    </div>
  );
}

function Stat({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3">
      <div className="text-[10px] font-medium uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 text-xl font-semibold tabular-nums text-slate-900" style={color ? { color } : undefined}>
        {value}
      </div>
      {sub && <div className="mt-0.5 text-[11px] text-slate-500">{sub}</div>}
    </div>
  );
}

function Header({ cfg, icon }: { cfg: InfographicConfig; icon: React.ReactNode }) {
  const tpl = TEMPLATES.find((t) => t.id === cfg.template)!;
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <div
          className="grid h-9 w-9 place-items-center rounded-md text-sm font-bold text-white"
          style={{ background: cfg.brandColor }}
        >
          {cfg.logo.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <div className="text-xs font-medium text-slate-500">{cfg.siteName}</div>
          <div className="text-sm font-semibold text-slate-900">{tpl.name}</div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-500">
        {icon}
        {cfg.dateRange}
      </div>
    </div>
  );
}

function Footer({ cfg }: { cfg: InfographicConfig }) {
  return (
    <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 text-[11px] text-slate-400">
      <span>Made with WhizGraphs</span>
      <span className="font-medium" style={{ color: cfg.brandColor }}>
        whizgraphs.app
      </span>
    </div>
  );
}

export function InfographicPreview({ config }: { config: InfographicConfig }) {
  const cfg = config;
  const c = cfg.brandColor;

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-sm"
      style={{
        backgroundImage: `radial-gradient(1200px 200px at 0% 0%, ${c}15, transparent 60%)`,
      }}
    >
      {cfg.template === "traffic-growth" && (
        <div>
          <Header cfg={cfg} icon={<TrendingUp className="h-3 w-3" />} />
          <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-900">{cfg.headline}</h3>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Stat label="Clicks" value={fmt(trafficSeries.at(-1)!.clicks)} sub="+187% YoY" color={c} />
            <Stat label="Impressions" value={fmt(trafficSeries.at(-1)!.impressions)} sub="+158% YoY" />
            <Stat label="Avg CTR" value="5.7%" sub="+1.1pp" />
          </div>
          <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
            <div className="mb-1 flex items-center justify-between text-[11px] text-slate-500">
              <span>Monthly clicks</span>
              <span className="inline-flex items-center gap-1 text-slate-700">
                <ArrowUpRight className="h-3 w-3" style={{ color: c }} /> trending up
              </span>
            </div>
            <Sparkline points={trafficSeries.map((p) => p.clicks)} color={c} />
            <div className="mt-1 flex justify-between text-[10px] text-slate-400">
              {trafficSeries.map((p) => (
                <span key={p.label}>{p.label}</span>
              ))}
            </div>
          </div>
          {cfg.notes && <p className="mt-3 text-xs leading-relaxed text-slate-600">{cfg.notes}</p>}
          <Footer cfg={cfg} />
        </div>
      )}

      {cfg.template === "top-pages" && (
        <div>
          <Header cfg={cfg} icon={<FileText className="h-3 w-3" />} />
          <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-900">{cfg.headline}</h3>
          <div className="mt-3">
            <Bars
              values={topPages.map((p) => p.clicks)}
              labels={topPages.map((p) => p.url.replace("/blog/", "/"))}
              color={c}
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Stat label="Top page CTR" value={`${topPages[0].ctr}%`} color={c} />
            <Stat label="Avg position" value={topPages[0].position.toFixed(1)} />
          </div>
          {cfg.notes && <p className="mt-3 text-xs leading-relaxed text-slate-600">{cfg.notes}</p>}
          <Footer cfg={cfg} />
        </div>
      )}

      {cfg.template === "keyword-wins" && (
        <div>
          <Header cfg={cfg} icon={<Search className="h-3 w-3" />} />
          <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-900">{cfg.headline}</h3>
          <div className="mt-3 space-y-2">
            {keywordWins.map((k) => (
              <div key={k.query} className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="truncate text-sm font-medium text-slate-900">{k.query}</div>
                  <div className="text-[11px] text-slate-500">{fmt(k.clicks)} clicks</div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 tabular-nums text-slate-500">
                    #{k.before}
                  </span>
                  <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(100, ((k.before - k.after) / k.before) * 100)}%`,
                        background: c,
                      }}
                    />
                  </div>
                  <span
                    className="rounded px-1.5 py-0.5 tabular-nums font-semibold text-white"
                    style={{ background: c }}
                  >
                    #{k.after}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {cfg.notes && <p className="mt-3 text-xs leading-relaxed text-slate-600">{cfg.notes}</p>}
          <Footer cfg={cfg} />
        </div>
      )}

      {cfg.template === "content-performance" && (
        <div>
          <Header cfg={cfg} icon={<FileText className="h-3 w-3" />} />
          <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-900">{cfg.headline}</h3>
          <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3">
            <div className="mb-2 text-[11px] text-slate-500">CTR vs. Position by article</div>
            <svg viewBox="0 0 320 160" className="w-full">
              {[1, 2, 3, 4].map((g) => (
                <line key={g} x1="30" x2="320" y1={g * 32} y2={g * 32} stroke="#e2e8f0" />
              ))}
              {contentRows.map((r, i) => {
                const x = 30 + (r.position / 12) * 280;
                const y = 152 - (r.ctr / 10) * 140;
                const radius = 4 + (r.clicks / 2000) * 10;
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r={radius} fill={c} fillOpacity="0.25" stroke={c} strokeWidth="1.5" />
                  </g>
                );
              })}
              <text x="2" y="12" fontSize="9" fill="#94a3b8">CTR%</text>
              <text x="290" y="158" fontSize="9" fill="#94a3b8">Pos →</text>
            </svg>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {contentRows.slice(0, 4).map((r) => (
              <div key={r.title} className="rounded-md border border-slate-200 bg-white p-2">
                <div className="truncate text-xs font-medium text-slate-900">{r.title}</div>
                <div className="mt-1 flex justify-between text-[10px] text-slate-500 tabular-nums">
                  <span>CTR {r.ctr}%</span>
                  <span>Pos {r.position.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
          {cfg.notes && <p className="mt-3 text-xs leading-relaxed text-slate-600">{cfg.notes}</p>}
          <Footer cfg={cfg} />
        </div>
      )}

      {cfg.template === "seo-health" && (
        <div>
          <Header cfg={cfg} icon={<Activity className="h-3 w-3" />} />
          <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-900">{cfg.headline}</h3>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Stat label="Clicks" value={fmt(healthSnapshot.totalClicks)} color={c} />
            <Stat label="Impressions" value={fmt(healthSnapshot.totalImpressions)} />
            <Stat label="Avg CTR" value={`${healthSnapshot.avgCtr}%`} />
            <Stat label="Avg Position" value={healthSnapshot.avgPosition.toFixed(1)} />
            <Stat label="Indexed pages" value={String(healthSnapshot.indexed)} />
            <Stat label="Crawl errors" value={String(healthSnapshot.crawlErrors)} />
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="grid h-7 w-7 place-items-center rounded-full" style={{ background: `${c}20`, color: c }}>
                <Globe className="h-4 w-4" />
              </span>
              <div>
                <div className="text-xs text-slate-500">Top country</div>
                <div className="font-medium text-slate-900">{healthSnapshot.topCountry}</div>
              </div>
            </div>
            <span
              className="rounded-full px-2 py-1 text-[11px] font-medium text-white"
              style={{ background: c }}
            >
              CWV: {healthSnapshot.coreWebVitals}
            </span>
          </div>
          {cfg.notes && <p className="mt-3 text-xs leading-relaxed text-slate-600">{cfg.notes}</p>}
          <Footer cfg={cfg} />
        </div>
      )}
    </div>
  );
}
