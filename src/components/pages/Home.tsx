import { InfographicPreview, defaultConfig } from "../InfographicPreview";
import { TEMPLATES } from "../../lib/mockData";
import { ArrowRight, BarChart3, Sparkles, Users, FileBarChart, Check, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="container-page relative grid gap-10 py-12 md:grid-cols-2 md:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              SEO infographics from GSC data
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
              Turn SEO data into <span className="text-primary">shareable infographics.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
              WhizGraphs converts search traffic, rankings, and content performance into clean visual reports your
              clients, team, or audience can understand in seconds.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/dashboard"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Create your first SEO infographic <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/seo-infographic-examples"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-background px-5 text-sm font-medium hover:bg-muted"
              >
                See examples
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" />No design skills</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" />GSC-native</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" />Brand-ready</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" aria-hidden />
            <div className="relative mx-auto max-w-md">
              <InfographicPreview config={defaultConfig} />
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">The problem</div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">SEO reports are too dense.</h2>
            <p className="mt-4 text-muted-foreground">
              Search Console exports are full of signal, but nobody reads a 14-tab spreadsheet. Founders skim, clients
              skip, and your wins get lost in pivot tables.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5 font-mono text-xs leading-relaxed text-muted-foreground">
            <div className="text-foreground">queries.csv</div>
            <pre className="mt-2 overflow-hidden whitespace-pre">
{`query,clicks,impressions,ctr,position
seo infographic generator,412,5210,7.9%,6
gsc report template,388,6020,6.4%,4
monthly seo report,502,7180,6.9%,3
client seo dashboard,221,4400,5.0%,9
... 1,284 more rows`}
            </pre>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="border-y border-border bg-surface">
        <div className="container-page py-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">The fix</div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Visual summaries from GSC-style data.</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Pick a template, point it at your data, and ship a clean infographic with the metrics that actually matter.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.map((t) => (
              <div key={t.id} className="group rounded-xl border border-border bg-background p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent-foreground">{t.tag}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
                <h3 className="mt-3 font-semibold">{t.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="container-page py-16">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Built for the moments you actually report.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Users, title: "Client reports", body: "Send a one-pager that proves the retainer is working." },
            { icon: BarChart3, title: "Founder updates", body: "Drop a sharp graphic into your weekly investor email." },
            { icon: FileBarChart, title: "Content audits", body: "See which posts move the needle in one glance." },
            { icon: Sparkles, title: "Monthly SEO summaries", body: "Replace the slide deck with a single image." },
          ].map((u) => (
            <div key={u.title} className="rounded-xl border border-border p-5">
              <u.icon className="h-5 w-5 text-primary" />
              <div className="mt-3 font-semibold">{u.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{u.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Example gallery */}
      <section className="border-t border-border bg-surface">
        <div className="container-page py-16">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Example infographics</h2>
              <p className="mt-2 text-muted-foreground">All generated from mock GSC data. Yours can look like this.</p>
            </div>
            <a href="/seo-infographic-examples" className="hidden text-sm font-medium text-primary md:inline-flex">
              View all →
            </a>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.slice(0, 3).map((t) => (
              <InfographicPreview
                key={t.id}
                config={{
                  ...defaultConfig,
                  template: t.id,
                  headline:
                    t.id === "top-pages"
                      ? "Five URLs drove 62% of clicks."
                      : t.id === "keyword-wins"
                      ? "Big movers this month."
                      : defaultConfig.headline,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <PricingBlock />

      {/* FAQ */}
      <section className="container-page py-16">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Frequently asked</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            { q: "Do I need to connect Google Search Console?", a: "Not yet. The MVP runs on mock GSC data so you can explore templates immediately. Live GSC sync is coming soon." },
            { q: "Who is this for?", a: "Indie founders, SEO consultants, content marketers, and small agencies who hate building reports manually." },
            { q: "Can I brand the infographics?", a: "Yes — set your brand color, logo placeholder, and headline. Full brand kits land on the Agency plan." },
            { q: "Can I export?", a: "Export to PNG and PDF is in the works. You can preview every template today." },
          ].map((f) => (
            <div key={f.q} className="rounded-xl border border-border p-5">
              <div className="font-semibold">{f.q}</div>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-page py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Your GSC data deserves better than a CSV.</h2>
          <a
            href="/dashboard"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Create your first SEO infographic <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  );
}

function PricingBlock() {
  const plans = [
    { name: "Free", price: "$0", desc: "Try every template", features: ["3 infographics / mo", "Mock GSC data", "Watermark"], cta: "Start free" },
    { name: "Solo", price: "$12", desc: "For founders & consultants", features: ["Unlimited infographics", "Brand color & logo", "PNG export"], cta: "Go Solo", featured: true },
    { name: "Agency", price: "$39", desc: "For small teams", features: ["Multi-site brand kits", "PDF + PNG export", "Client-ready templates"], cta: "Go Agency" },
  ];
  return (
    <section id="pricing" className="container-page py-16">
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Simple pricing</h2>
      <p className="mt-2 text-muted-foreground">Start free. Upgrade when you ship reports to real clients.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-xl border p-6 ${p.featured ? "border-primary bg-accent/40 ring-1 ring-primary" : "border-border bg-background"}`}
          >
            <div className="flex items-center justify-between">
              <div className="font-semibold">{p.name}</div>
              {p.featured && <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">Popular</span>}
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight">{p.price}</span>
              <span className="text-sm text-muted-foreground">/mo</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />{f}</li>
              ))}
            </ul>
            <a
              href="/dashboard"
              className={`mt-5 inline-flex h-10 w-full items-center justify-center rounded-md text-sm font-medium ${p.featured ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border hover:bg-muted"}`}
            >
              {p.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
