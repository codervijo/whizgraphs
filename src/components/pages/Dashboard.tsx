import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";
import {
  InfographicPreview,
  defaultConfig,
  type InfographicConfig,
} from "../InfographicPreview";
import {
  TEMPLATES,
  trafficSeries,
  topPages,
  keywordWins,
  contentRows,
  type ReportTemplate,
} from "../../lib/mockData";
import {
  Download,
  FileBarChart,
  LayoutTemplate,
  Palette,
  Settings,
  Sparkles,
  Database,
  Eye,
} from "lucide-react";

const SWATCHES = ["#0891b2", "#0f172a", "#16a34a", "#dc2626", "#ea580c", "#7c3aed", "#db2777", "#0ea5e9"];

type SidebarKey = "reports" | "templates" | "brand" | "settings";

export default function Dashboard() {
  const [section, setSection] = useState<SidebarKey>("reports");
  const [cfg, setCfg] = useState<InfographicConfig>(defaultConfig);
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("preview");

  const update = <K extends keyof InfographicConfig>(k: K, v: InfographicConfig[K]) =>
    setCfg((c) => ({ ...c, [k]: v }));

  return (
    <>
      <div className="container-page py-6">
        <div className="grid gap-6 md:grid-cols-[220px_1fr]">
          <DashSidebar section={section} setSection={setSection} />

          <div>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {section === "reports" && "Create SEO Infographic"}
                  {section === "templates" && "Templates"}
                  {section === "brand" && "Brand Kit"}
                  {section === "settings" && "Settings"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {section === "reports" && "Pick a template, edit the details, ship a one-page report."}
                  {section === "templates" && "Five focused report types — built for GSC data."}
                  {section === "brand" && "Set the look that gets applied to every infographic."}
                  {section === "settings" && "Account preferences (mock for MVP)."}
                </p>
              </div>
              <button
                onClick={() => toast.info("Export coming soon", { description: "PNG & PDF export ships with Solo plan." })}
                className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Download className="h-3.5 w-3.5" /> Export
              </button>
            </div>

            {section === "reports" && (
              <ReportsView cfg={cfg} update={update} mobileTab={mobileTab} setMobileTab={setMobileTab} />
            )}
            {section === "templates" && <TemplatesView setCfg={setCfg} setSection={setSection} />}
            {section === "brand" && <BrandView cfg={cfg} update={update} />}
            {section === "settings" && <SettingsView />}
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
}

function DashSidebar({
  section,
  setSection,
}: {
  section: SidebarKey;
  setSection: (s: SidebarKey) => void;
}) {
  const items: { key: SidebarKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: "reports", label: "Reports", icon: FileBarChart },
    { key: "templates", label: "Templates", icon: LayoutTemplate },
    { key: "brand", label: "Brand Kit", icon: Palette },
    { key: "settings", label: "Settings", icon: Settings },
  ];
  return (
    <aside className="md:sticky md:top-20 md:self-start">
      <nav className="flex gap-2 overflow-x-auto rounded-xl border border-border bg-surface p-2 md:flex-col md:gap-1">
        {items.map((it) => {
          const Icon = it.icon;
          const active = section === it.key;
          return (
            <button
              key={it.key}
              onClick={() => setSection(it.key)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                active ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" /> {it.label}
            </button>
          );
        })}
      </nav>
      <div className="mt-3 hidden rounded-xl border border-dashed border-border p-3 text-xs text-muted-foreground md:block">
        <div className="flex items-center gap-1.5 font-medium text-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Connected data
        </div>
        <p className="mt-1">Using mock GSC data. <a href="/pricing" className="text-primary">Upgrade</a> for live sync.</p>
      </div>
    </aside>
  );
}

function ReportsView({
  cfg,
  update,
  mobileTab,
  setMobileTab,
}: {
  cfg: InfographicConfig;
  update: <K extends keyof InfographicConfig>(k: K, v: InfographicConfig[K]) => void;
  mobileTab: "edit" | "preview";
  setMobileTab: (t: "edit" | "preview") => void;
}) {
  return (
    <div className="space-y-6">
      {/* Mobile tab switcher */}
      <div className="grid grid-cols-2 gap-1 rounded-lg border border-border bg-surface p-1 md:hidden">
        <button
          onClick={() => setMobileTab("edit")}
          className={`rounded-md px-3 py-2 text-sm font-medium ${mobileTab === "edit" ? "bg-background shadow-sm" : "text-muted-foreground"}`}
        >
          Edit
        </button>
        <button
          onClick={() => setMobileTab("preview")}
          className={`rounded-md px-3 py-2 text-sm font-medium ${mobileTab === "preview" ? "bg-background shadow-sm" : "text-muted-foreground"}`}
        >
          Preview
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className={`space-y-6 ${mobileTab === "edit" ? "block" : "hidden"} md:block`}>
          <Card title="Template" icon={LayoutTemplate}>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => update("template", t.id)}
                  className={`rounded-lg border p-3 text-left transition-colors ${
                    cfg.template === t.id ? "border-primary bg-accent/40 ring-1 ring-primary" : "border-border hover:bg-muted"
                  }`}
                >
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{t.tag}</div>
                  <div className="mt-1 text-sm font-medium">{t.name}</div>
                </button>
              ))}
            </div>
          </Card>

          <Card title="Report details" icon={FileBarChart}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Site name">
                <input
                  value={cfg.siteName}
                  onChange={(e) => update("siteName", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="Date range">
                <input
                  value={cfg.dateRange}
                  onChange={(e) => update("dateRange", e.target.value)}
                  className="input"
                  placeholder="Jan – Aug 2026"
                />
              </Field>
              <Field label="Logo (2 chars)">
                <input
                  value={cfg.logo}
                  onChange={(e) => update("logo", e.target.value.slice(0, 3))}
                  className="input"
                  maxLength={3}
                />
              </Field>
              <Field label="Brand color">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={cfg.brandColor}
                    onChange={(e) => update("brandColor", e.target.value)}
                    className="h-10 w-12 cursor-pointer rounded-md border border-border bg-background"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {SWATCHES.map((s) => (
                      <button
                        key={s}
                        onClick={() => update("brandColor", s)}
                        aria-label={s}
                        className={`h-6 w-6 rounded-full border ${cfg.brandColor === s ? "ring-2 ring-offset-2 ring-foreground/40" : "border-border"}`}
                        style={{ background: s }}
                      />
                    ))}
                  </div>
                </div>
              </Field>
              <Field label="Headline" full>
                <input
                  value={cfg.headline}
                  onChange={(e) => update("headline", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="Notes" full>
                <textarea
                  value={cfg.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  className="input min-h-[72px] resize-y"
                />
              </Field>
            </div>
          </Card>

          <Card title="Source data (mock GSC)" icon={Database}>
            <DataTable template={cfg.template} />
          </Card>
        </div>

        {/* Preview panel */}
        <div className={`${mobileTab === "preview" ? "block" : "hidden"} md:block`}>
          <div className="lg:sticky lg:top-20">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Eye className="h-3.5 w-3.5" /> Live preview
            </div>
            <InfographicPreview config={cfg} />
            <button
              onClick={() =>
                toast.info("Export coming soon", { description: "PNG & PDF export ships with Solo plan." })
              }
              className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-border bg-background text-sm font-medium hover:bg-muted"
            >
              <Download className="h-4 w-4" /> Export infographic
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplatesView({
  setCfg,
  setSection,
}: {
  setCfg: React.Dispatch<React.SetStateAction<InfographicConfig>>;
  setSection: (s: SidebarKey) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {TEMPLATES.map((t) => (
        <div key={t.id} className="rounded-xl border border-border bg-surface p-4">
          <InfographicPreview config={{ ...defaultConfig, template: t.id }} />
          <div className="mt-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.description}</div>
            </div>
            <button
              onClick={() => {
                setCfg((c) => ({ ...c, template: t.id }));
                setSection("reports");
              }}
              className="inline-flex h-8 items-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90"
            >
              Use
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function BrandView({
  cfg,
  update,
}: {
  cfg: InfographicConfig;
  update: <K extends keyof InfographicConfig>(k: K, v: InfographicConfig[K]) => void;
}) {
  return (
    <Card title="Brand defaults" icon={Palette}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Workspace / site name">
          <input value={cfg.siteName} onChange={(e) => update("siteName", e.target.value)} className="input" />
        </Field>
        <Field label="Logo placeholder">
          <input value={cfg.logo} onChange={(e) => update("logo", e.target.value.slice(0, 3))} className="input" maxLength={3} />
        </Field>
        <Field label="Primary brand color" full>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="color"
              value={cfg.brandColor}
              onChange={(e) => update("brandColor", e.target.value)}
              className="h-10 w-12 cursor-pointer rounded-md border border-border bg-background"
            />
            {SWATCHES.map((s) => (
              <button
                key={s}
                onClick={() => update("brandColor", s)}
                className={`h-7 w-7 rounded-full border ${cfg.brandColor === s ? "ring-2 ring-offset-2 ring-foreground/40" : "border-border"}`}
                style={{ background: s }}
                aria-label={s}
              />
            ))}
          </div>
        </Field>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Multi-brand kits for client work land on the <a href="/pricing" className="text-primary">Agency plan</a>.
      </p>
    </Card>
  );
}

function SettingsView() {
  return (
    <Card title="Settings" icon={Settings}>
      <div className="space-y-4 text-sm">
        <div className="flex items-center justify-between rounded-lg border border-border p-3">
          <div>
            <div className="font-medium">Google Search Console</div>
            <div className="text-xs text-muted-foreground">Live OAuth sync is coming soon. MVP uses mock data.</div>
          </div>
          <button
            onClick={() => toast.info("Coming soon", { description: "Live GSC connection is in private beta." })}
            className="inline-flex h-9 items-center rounded-md border border-border bg-background px-3 text-xs font-medium hover:bg-muted"
          >
            Connect
          </button>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border p-3">
          <div>
            <div className="font-medium">Email reports</div>
            <div className="text-xs text-muted-foreground">Schedule monthly infographics to your inbox.</div>
          </div>
          <button
            onClick={() => toast.info("Coming soon")}
            className="inline-flex h-9 items-center rounded-md border border-border bg-background px-3 text-xs font-medium hover:bg-muted"
          >
            Configure
          </button>
        </div>
      </div>
    </Card>
  );
}

function Card({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-background">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Icon className="h-4 w-4 text-primary" />
        <div className="text-sm font-semibold">{title}</div>
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <label className={`flex flex-col gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function DataTable({ template }: { template: ReportTemplate }) {
  return (
    <div className="overflow-x-auto">
      {template === "traffic-growth" && (
        <Table
          head={["Month", "Clicks", "Impressions", "CTR"]}
          rows={trafficSeries.map((r) => [
            r.label,
            r.clicks.toLocaleString(),
            r.impressions.toLocaleString(),
            ((r.clicks / r.impressions) * 100).toFixed(1) + "%",
          ])}
        />
      )}
      {template === "top-pages" && (
        <Table
          head={["URL", "Clicks", "Impr.", "CTR", "Pos"]}
          rows={topPages.map((r) => [r.url, r.clicks, r.impressions, r.ctr + "%", r.position.toFixed(1)])}
        />
      )}
      {template === "keyword-wins" && (
        <Table
          head={["Query", "Before", "After", "Clicks"]}
          rows={keywordWins.map((r) => [r.query, "#" + r.before, "#" + r.after, r.clicks])}
        />
      )}
      {template === "content-performance" && (
        <Table
          head={["Title", "CTR", "Position", "Clicks"]}
          rows={contentRows.map((r) => [r.title, r.ctr + "%", r.position.toFixed(1), r.clicks])}
        />
      )}
      {template === "seo-health" && (
        <Table
          head={["Metric", "Value"]}
          rows={[
            ["Total clicks", "24,380"],
            ["Total impressions", "528,400"],
            ["Avg CTR", "4.6%"],
            ["Avg position", "11.2"],
            ["Indexed pages", "312"],
            ["Crawl errors", "4"],
            ["Core Web Vitals", "Good"],
          ]}
        />
      )}
    </div>
  );
}

function Table({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <table className="w-full min-w-[420px] text-sm">
      <thead>
        <tr className="text-xs text-muted-foreground">
          {head.map((h) => (
            <th key={h} className="border-b border-border px-2 py-2 text-left font-medium">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="hover:bg-muted/40">
            {r.map((c, j) => (
              <td key={j} className="border-b border-border/60 px-2 py-2 tabular-nums">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
