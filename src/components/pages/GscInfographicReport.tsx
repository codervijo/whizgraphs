import { InfographicPreview, defaultConfig } from "../InfographicPreview";
import { ArrowRight, Check, MousePointerClick, Eye, Percent, ListOrdered } from "lucide-react";
import { Eyebrow, Faq, RelatedPages, CtaBand, type FaqItem } from "./_shared";

const METRICS = [
  {
    icon: MousePointerClick,
    name: "Clicks",
    def: "The number of times someone clicked through to your site from Google’s results.",
    read: "The bottom-line demand number. Rising clicks mean more people are choosing your result — the metric a client cares about most.",
    visual: "Plotted as the headline trend in Traffic Growth and totaled in the Health Snapshot.",
  },
  {
    icon: Eye,
    name: "Impressions",
    def: "How many times a link to your site appeared in search results — whether or not it was clicked.",
    read: "Your visibility. Impressions can climb well before clicks do, which is often the earliest sign new content is gaining ground.",
    visual: "Shown alongside clicks in Traffic Growth so you can see reach and demand move together.",
  },
  {
    icon: Percent,
    name: "CTR (click-through rate)",
    def: "Clicks divided by impressions — the share of people who saw your result and clicked it.",
    read: "A relevance and packaging signal. A page that ranks well but has low CTR usually needs a sharper title or meta description, not a higher rank.",
    visual: "The vertical axis in Content Performance, so low-CTR pages are easy to spot against their rank.",
  },
  {
    icon: ListOrdered,
    name: "Average position",
    def: "The average ranking of your URLs for the queries measured — lower is better, with 1 being the top result.",
    read: "Where you sit on the page. Movement from position 9 to 4 is the kind of concrete win worth putting in front of a stakeholder.",
    visual: "The before → after story in Keyword Wins and the horizontal axis in Content Performance.",
  },
];

const PIPELINE = [
  { n: 1, label: "Export or pull your GSC metrics", body: "Start from the Search Console Performance report — clicks, impressions, CTR, and position by query and by page." },
  { n: 2, label: "Choose the template that fits the story", body: "Trend, top pages, keyword wins, content performance, or a health snapshot — one per question you’re answering." },
  { n: 3, label: "Brand it and write the headline", body: "Set your color and logo, then say the takeaway in one plain sentence." },
  { n: 4, label: "Share the single image", body: "Drop it into the report, the email, or the channel where your audience already is." },
];

const READING = [
  { label: "Read the direction before the value", body: "Whether clicks are trending up, flat, or down matters more to your reader than the exact count. Lead with the direction." },
  { label: "Compare like-for-like periods", body: "Month-over-month or year-over-year — pick a comparison window and keep it consistent so a change means something." },
  { label: "Pair position with CTR", body: "A ranking gain only turns into traffic if the result also gets clicked. Look at the two together, not in isolation." },
  { label: "Watch impressions as the leading edge", body: "Rising impressions with flat clicks often means you’re surfacing for new queries — a signal to sharpen titles next." },
];

export const faq: FaqItem[] = [
  {
    q: "What is a GSC infographic report?",
    a: "It’s a Google Search Console report rendered as a single, shareable image instead of a table. The same core metrics — clicks, impressions, CTR, and average position — are laid out visually so anyone can read the story without opening Search Console.",
  },
  {
    q: "Which Search Console metrics does it use?",
    a: "The four from the Performance report: clicks, impressions, click-through rate, and average position. WhizGraphs maps each one to a template element so the metric that matters is the one the reader sees first.",
  },
  {
    q: "Do I need to connect my Search Console account?",
    a: "Not for the MVP. It runs on realistic mock GSC data so you can build and preview a full report today. Live Google Search Console sync is rolling out gradually — until then, no account connection is required.",
  },
  {
    q: "What’s the difference between clicks and impressions?",
    a: "An impression is counted every time your link appears in results; a click is counted only when someone actually visits. Impressions measure visibility, clicks measure demand, and CTR is the ratio between them.",
  },
  {
    q: "Is a lower average position better?",
    a: "Yes. Average position is a ranking, so position 3 is better than position 8. Moving that number down over time is one of the clearest ways to show SEO progress.",
  },
];

export default function GscInfographicReport() {
  return (
    <>
      {/* Hero */}
      <section className="container-page grid gap-10 py-12 md:grid-cols-2 md:items-center md:py-16">
        <div>
          <Eyebrow>GSC report</Eyebrow>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Your Search Console data, as a report people actually read.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            WhizGraphs reads GSC-style metrics — clicks, impressions, CTR, position — and lays them out as a single
            polished infographic. No design pass, no slide deck, no exporting a spreadsheet nobody opens.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            {[
              "Clicks & impressions trend with month-over-month deltas",
              "Top URLs ranked by traffic contribution",
              "Average CTR and position with plain-language context",
              "Brand color, logo, and headline — fully editable",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-primary" />
                {b}
              </li>
            ))}
          </ul>
          <a
            href="/dashboard/"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Build a GSC report <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div>
          <InfographicPreview
            config={{ ...defaultConfig, template: "traffic-growth", headline: "Search traffic is up 3.4× this year." }}
          />
        </div>
      </section>

      {/* Metric glossary */}
      <section className="border-y border-border bg-surface">
        <div className="container-page py-16">
          <div className="max-w-2xl">
            <Eyebrow>The four metrics, in plain language</Eyebrow>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              What Search Console gives you — and how to read it.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every WhizGraphs template is built from these four numbers. Understand what each one means and you can
              read any SEO report at a glance.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {METRICS.map((m) => (
              <div key={m.name} className="rounded-xl border border-border bg-background p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-md bg-accent text-accent-foreground">
                    <m.icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-lg font-semibold">{m.name}</h3>
                </div>
                <p className="mt-3 text-sm font-medium">{m.def}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.read}</p>
                <p className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">In the report: </span>
                  {m.visual}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="container-page py-16">
        <div className="max-w-2xl">
          <Eyebrow>From export to infographic</Eyebrow>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Four steps from raw GSC to a shareable report.</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {PIPELINE.map((p) => (
            <div key={p.n} className="rounded-xl border border-border p-5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {p.n}
              </span>
              <h3 className="mt-3 font-semibold">{p.label}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reading the data */}
      <section className="border-y border-border bg-surface">
        <div className="container-page py-16">
          <div className="max-w-2xl">
            <Eyebrow>Reading the trends</Eyebrow>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">How to interpret the numbers you’re showing.</h2>
            <p className="mt-3 text-muted-foreground">
              A report is only useful if you can explain it. These are the habits that keep an SEO read honest.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {READING.map((r) => (
              <div key={r.label} className="rounded-xl border border-border bg-background p-5">
                <div className="font-semibold">{r.label}</div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Note: the previews on this site are generated from realistic mock GSC data. Live Google Search Console sync
            is rolling out gradually — the layout and metrics you see are exactly what your own numbers will render into.
          </p>
        </div>
      </section>

      <Faq items={faq} />

      <RelatedPages
        links={[
          {
            href: "/seo-report-infographic/",
            title: "SEO report infographic",
            blurb: "Package these metrics into a monthly report clients open.",
          },
          {
            href: "/seo-infographics/",
            title: "All five templates",
            blurb: "What each template reads and the question it answers.",
          },
          {
            href: "/seo-infographic-examples/",
            title: "Examples",
            blurb: "Six finished infographics built from GSC-style data.",
          },
        ]}
      />

      <CtaBand title="Turn your Search Console numbers into a report worth sharing." cta="Build a GSC report" />
    </>
  );
}
