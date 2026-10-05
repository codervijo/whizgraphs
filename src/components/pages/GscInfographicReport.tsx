import { GRAPHICS } from "../../lib/graphics/catalog.mjs";
import { MousePointerClick, Eye, Percent, ListOrdered, AlertTriangle } from "lucide-react";
import { Eyebrow, Faq, RelatedPages, CtaBand, SectionHead, Graphic, Steps, type FaqItem } from "./_shared";

export const PATH = "/gsc-infographic-report/";
export const HERO = GRAPHICS["gsc-performance-report-to-infographic"];
export const FUNNEL = GRAPHICS["search-console-metrics-funnel"];
export const SAMPLE = GRAPHICS["seo-infographic-keyword-wins"];

const METRICS = [
  {
    icon: MousePointerClick,
    name: "Clicks",
    def: "Times someone clicked through to your site from Google Search results.",
    read: "The demand number — what most stakeholders care about. Use it as the headline metric.",
    visual: "Trend line in Traffic Growth; bars in Top Pages.",
  },
  {
    icon: Eye,
    name: "Impressions",
    def: "Times a link to your site appeared in results a user saw, clicked or not.",
    read: "Visibility. Impressions often rise before clicks do — the earliest sign new content is surfacing.",
    visual: "Second tile in Traffic Growth; the denominator behind every CTR.",
  },
  {
    icon: Percent,
    name: "CTR",
    def: "Clicks ÷ impressions.",
    read: "Packaging. A page that ranks well with a low CTR usually needs a better title or description, not a higher rank.",
    visual: "Vertical axis in Content Performance; the red column in CTR Opportunities.",
  },
  {
    icon: ListOrdered,
    name: "Average position",
    def: "The average of your topmost position across impressions. Lower is better.",
    read: "Where you sit. Report movement on the queries that matter, not just the sitewide average.",
    visual: "Before → after tracks in Keyword Wins; the horizontal axis in Content Performance.",
  },
];

const TABS = [
  { tab: "Dates", gives: "Clicks, impressions, CTR and position for every day in the range", feeds: "Traffic Growth, SEO Health Snapshot", href: "/seo-infographics/#traffic-growth" },
  { tab: "Queries", gives: "Every query that showed your site, with its four metrics", feeds: "Keyword Wins, CTR Opportunities", href: "/seo-infographics/#keyword-wins" },
  { tab: "Pages", gives: "Every URL that appeared, with its four metrics", feeds: "Top Pages, Content Performance", href: "/seo-infographics/#top-pages" },
  { tab: "Countries", gives: "Metrics by searcher country", feeds: "Audience Mix", href: "/seo-infographic-examples/#audience-mix" },
  { tab: "Devices", gives: "Metrics by desktop, mobile, tablet", feeds: "Audience Mix", href: "/seo-infographic-examples/#audience-mix" },
];

const CAVEATS = [
  { t: "Query totals won’t match page totals", b: "Search Console omits some rare queries to protect user privacy, so the Queries tab adds up to less than the Pages tab. Report clicks from the chart totals, and use the Queries tab for movement." },
  { t: "The interface export is capped", b: "Exports from the Performance report include up to 1,000 rows per table. For long-tail analysis beyond that, use the Search Console API or the Looker Studio connector." },
  { t: "History is limited to 16 months", b: "Performance data only goes back 16 months. Keep your own monthly export if you want longer year-over-year comparisons later." },
  { t: "Recent days are incomplete", b: "The newest data arrives with a short delay. Leave the last couple of days out of a report, or pull it a few days after the period ends." },
  { t: "Average position is an average", b: "New impressions on deep, long-tail queries pull the average down even while your important rankings improve. Pair it with the query list." },
];

export const faq: FaqItem[] = [
  {
    q: "What is a GSC infographic report?",
    a: "A Google Search Console report rendered as a single shareable image instead of tables. It takes the Performance report’s clicks, impressions, CTR and average position — by date, query or page — and lays them out so anyone can read the result without opening Search Console.",
  },
  {
    q: "How do I export data from Google Search Console?",
    a: "Open Performance → Search results, set the date range (and a comparison if you want one), then use the Export button to download a CSV or Excel file or send it to Google Sheets. The export contains a separate sheet for each tab — Queries, Pages, Countries, Devices, Dates — for the range you selected.",
  },
  {
    q: "Which Search Console tab should I use for which infographic?",
    a: "Dates for trends and totals (Traffic Growth, SEO Health Snapshot); Queries for ranking movement and under-clicked searches (Keyword Wins, CTR Opportunities); Pages for which URLs carry the site (Top Pages, Content Performance); Countries and Devices for Audience Mix.",
  },
  {
    q: "Why don’t my query clicks add up to my total clicks?",
    a: "Search Console leaves out some infrequent queries for privacy reasons, so the Queries tab sums to less than the site total. Use the chart totals for headline numbers and the Queries tab for which searches moved.",
  },
  {
    q: "Do I need to connect my Search Console account to WhizGraphs?",
    a: "Not today. The app runs on realistic mock Search Console data so you can build and preview any template now. Live Search Console sync is rolling out gradually; until then you can follow the export steps on this page and build the same visuals by hand.",
  },
];

export default function GscInfographicReport() {
  return (
    <>
      {/* Hero */}
      <section className="container-page py-12 md:py-16">
        <div className="max-w-3xl">
          <Eyebrow>Google Search Console</Eyebrow>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">GSC infographic report: from Search Console export to one clear image</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Google Search Console has everything you need for an SEO report — buried in a chart and five tabs of tables.
            This guide shows which part of the Performance report feeds which infographic, how to export it, and the
            data quirks to know before you put a number in front of anyone.
          </p>
        </div>
        <Graphic g={HERO} eager className="mt-10" />
      </section>

      {/* Tab map */}
      <section className="border-y border-border bg-surface">
        <div className="container-page py-16">
          <SectionHead eyebrow="The map" title="Which Performance report tab feeds which infographic">
            <p>Every WhizGraphs template reads from one tab. Export the tab, get the visual.</p>
          </SectionHead>
          <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-background">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Tab</th>
                  <th className="px-4 py-3">What it gives you</th>
                  <th className="px-4 py-3">Infographic it feeds</th>
                </tr>
              </thead>
              <tbody>
                {TABS.map((t) => (
                  <tr key={t.tab} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-semibold">{t.tab}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t.gives}</td>
                    <td className="px-4 py-3">
                      <a href={t.href} className="text-primary hover:underline">{t.feeds}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="container-page py-16">
        <SectionHead eyebrow="The four metrics" title="What Search Console actually counts">
          <p>Every GSC infographic is built from four numbers. Get the definitions right and the rest of the report follows.</p>
        </SectionHead>
        <Graphic g={FUNNEL} className="mt-8" />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {METRICS.map((m) => (
            <div key={m.name} className="rounded-xl border border-border p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-accent text-accent-foreground">
                  <m.icon className="h-4 w-4" />
                </span>
                <h3 className="text-lg font-semibold">{m.name}</h3>
              </div>
              <p className="mt-3 text-sm font-medium">{m.def}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.read}</p>
              <p className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">In the infographic: </span>
                {m.visual}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Export steps */}
      <section className="border-y border-border bg-surface">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHead eyebrow="Step by step" title="How to turn a Search Console export into an infographic report" />
            <Steps
              items={[
                { title: "Open Performance → Search results", body: "Check that Web is the search type and the right property is selected." },
                { title: "Set the date range and comparison", body: "Last month vs the month before, or vs the same month last year. The comparison is where the story is." },
                { title: "Export", body: "Use Export → Google Sheets, Excel or CSV. The file contains a separate sheet for each tab — Dates, Queries, Pages, Countries, Devices — for the range you set." },
                { title: "Open the sheet for your question", body: "Use the map above: Dates for trends, Queries for movement, Pages for concentration." },
                { title: "Compute changes and pick the finding", body: "Percent change for clicks and impressions, percentage points for CTR, places for position. Then write one sentence." },
                {
                  title: "Lay it out",
                  body: (
                    <>
                      Use a{" "}
                      <a href="/seo-infographics/" className="text-primary hover:underline">WhizGraphs template</a>, or for a fuller document the{" "}
                      <a href="/seo-report-template/" className="text-primary hover:underline">one-page SEO report template</a>.
                    </>
                  ),
                },
              ]}
            />
          </div>
          <div className="lg:pt-24">
            <Graphic g={SAMPLE} caption="A Queries-tab export, as a Keyword Wins infographic (sample data)." />
          </div>
        </div>
      </section>

      {/* Caveats */}
      <section className="container-page py-16">
        <SectionHead eyebrow="Before you publish a number" title="Five Search Console data quirks to know">
          <p>None of these are bugs — but each one has embarrassed someone in a client meeting.</p>
        </SectionHead>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CAVEATS.map((c) => (
            <div key={c.t} className="rounded-xl border border-border p-5">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <div className="mt-3 font-semibold">{c.t}</div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.b}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Note: graphics on this site are generated from sample Search Console-style data for fictional sites. Live
          Search Console sync in the WhizGraphs app is rolling out gradually.
        </p>
      </section>

      <Faq items={faq} />

      <RelatedPages
        links={[
          { href: "/seo-infographics/", title: "SEO infographic templates", blurb: "The five templates each Search Console tab feeds." },
          { href: "/seo-dashboard-template/", title: "SEO dashboard template", blurb: "Monitor the same metrics continuously in Looker Studio." },
          { href: "/monthly-seo-report-template/", title: "Monthly SEO report template", blurb: "The month-over-month and year-over-year version." },
        ]}
      />

      <CtaBand title="Turn your Search Console numbers into a report worth sharing." cta="Build a GSC report" />
    </>
  );
}
