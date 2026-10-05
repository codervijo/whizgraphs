import { GRAPHICS } from "../../lib/graphics/catalog.mjs";
import { ArrowRight, Check, X } from "lucide-react";
import { Eyebrow, Faq, RelatedPages, CtaBand, SectionHead, Graphic, DownloadPanel, Steps, type FaqItem } from "./_shared";

export const PATH = "/seo-report-template/";
export const HERO = GRAPHICS["seo-report-template-sample"];
export const BLANK = GRAPHICS["seo-report-template-blank"];

export const DOWNLOADS = [
  { href: "/downloads/seo-report-template.pdf", label: "SEO report template (PDF)", format: "PDF", mime: "application/pdf", detail: "2 pages: blank template + filled example. Letter size, print-ready." },
  { href: "/downloads/seo-report-template.csv", label: "Report data sheet (CSV)", format: "CSV", mime: "text/csv", detail: "Opens in Google Sheets or Excel. Change formulas pre-filled." },
  { href: BLANK.png, label: "Blank template (PNG)", format: "PNG", mime: "image/png", detail: `${BLANK.w}×${BLANK.h}px — drop into Slides, Canva or Figma.` },
  { href: HERO.png, label: "Filled example (PNG)", format: "PNG", mime: "image/png", detail: "Sample data for a fictional store." },
];

const SECTIONS = [
  {
    n: 1,
    name: "Headline takeaway",
    what: "One sentence: what changed this period and why.",
    source: "Your read of sections 2–5. Write it last.",
    trap: "Describing the report (“Here is September’s SEO report”) instead of the finding.",
  },
  {
    n: 2,
    name: "Key metrics",
    what: "Clicks, impressions, CTR and average position, each with its change versus the previous period.",
    source: "Search Console → Performance → Search results, with “Compare” set to the previous period.",
    trap: "Reporting CTR change as a percent (“+4%”) rather than percentage points (“+0.2pp”).",
  },
  {
    n: 3,
    name: "Clicks trend",
    what: "Six to thirteen months of clicks, with launches, migrations or algorithm updates marked.",
    source: "Performance report → Dates tab (export, then sum by month).",
    trap: "A one-month window that makes normal seasonality look like a crisis.",
  },
  {
    n: 4,
    name: "Top pages",
    what: "The five URLs with the most clicks, and each one’s change.",
    source: "Performance report → Pages tab, sorted by clicks.",
    trap: "Listing pages without the change — the reader can’t tell rising from falling.",
  },
  {
    n: 5,
    name: "Keyword wins",
    what: "The queries whose average position improved most, before → after. Lead with any that reached page one.",
    source: "Performance report → Queries tab, comparing positions across the two periods.",
    trap: "Celebrating a jump from position 60 to 30 — real, but no traffic yet. Say so.",
  },
  {
    n: 6,
    name: "Work completed",
    what: "Three or so things that shipped, tied to the numbers above where possible.",
    source: "Your task tracker or changelog.",
    trap: "A task list with no link to outcomes; the reader can’t see what the work did.",
  },
  {
    n: 7,
    name: "Next period plan",
    what: "Two or three priorities, each tied to a metric you’ll report next time.",
    source: "The gaps the report itself exposed: under-clicked pages, falling URLs, near-page-one queries.",
    trap: "Ten priorities. If everything is next, nothing is.",
  },
];

const COMPARE = [
  { dim: "Best for", one: "Regular updates to clients and managers", deck: "A formal quarterly or annual review", dash: "Your own daily or weekly monitoring" },
  { dim: "Reader effort", one: "Read in under a minute", deck: "Needs a meeting to walk through", dash: "Needs the reader to explore" },
  { dim: "Tells a story?", one: "Yes — headline first", deck: "Yes, slide by slide", dash: "No — it shows, you interpret" },
  { dim: "Updates itself?", one: "No, written each period", deck: "No", dash: "Yes, if connected to data" },
  { dim: "Start from", one: "This template", deck: "This template, one section per slide", dash: "The SEO dashboard template" },
];

const HEADLINES = [
  { bad: "September SEO report", good: "Clicks up 15% month over month, led by the relaunched category pages." },
  { bad: "Rankings update", good: "Four of our target queries reached page one; two more are at position 11–12." },
  { bad: "Traffic was down", good: "Clicks fell 8%, all from one guide that lost its featured snippet — fix ships this week." },
];

export const faq: FaqItem[] = [
  {
    q: "What should an SEO report template include?",
    a: "At minimum: a one-sentence headline, the four Search Console metrics (clicks, impressions, CTR, average position) with their change, a clicks trend, top pages, keyword movement, the work completed and the plan for next period. This template has exactly those seven sections on one page.",
  },
  {
    q: "Is this SEO report template free?",
    a: "Yes. The PDF (blank and filled example), the CSV data sheet and the PNGs are free to download and use for clients or internal reporting. No sign-up.",
  },
  {
    q: "How do I use the CSV with Google Sheets?",
    a: "In Google Sheets choose File → Import → Upload, select the CSV, and import it as a new spreadsheet. Fill in the “This period” and “Previous period” columns; the change formulas calculate automatically. Excel opens the file directly.",
  },
  {
    q: "How long should an SEO report be?",
    a: "For a regular client or stakeholder update, one page. Put the detail — full query lists, technical audits — in an appendix or a dashboard link for anyone who wants to dig in. Most readers stop after the headline and the key metrics.",
  },
  {
    q: "How is this different from the monthly SEO report template?",
    a: "This one is period-agnostic and story-led: one comparison, a trend, wins and work. The monthly template adds a month-over-month and year-over-year table, a 13-month trend and page-level gains and drops, for when the report always runs on a calendar month.",
  },
  {
    q: "Where does the data come from?",
    a: "Everything on the template comes from the Google Search Console Performance report, except the work completed and the plan, which come from you. If you also report conversions, add a row sourced from your analytics tool.",
  },
];

export default function SeoReportTemplate() {
  return (
    <>
      {/* Hero */}
      <section className="container-page grid gap-10 py-12 md:grid-cols-[1.1fr_1fr] md:py-16">
        <div>
          <Eyebrow>Free template</Eyebrow>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">Free SEO report template</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A one-page SEO report your client or manager will actually read: a headline, four Search Console metrics with
            their change, a trend, top pages, keyword wins, and what you did and will do next. Download it as a printable
            PDF, a ready-to-fill spreadsheet, or images.
          </p>
          <div className="mt-6">
            <DownloadPanel title="Download the SEO report template" note="Free, no sign-up." items={DOWNLOADS} />
          </div>
        </div>
        <Graphic g={HERO} eager caption="Filled example — sample data for a fictional outdoor-gear store." />
      </section>

      {/* Sections */}
      <section className="border-y border-border bg-surface">
        <div className="container-page py-16">
          <SectionHead eyebrow="What’s in the template" title="Seven sections, and exactly what goes in each">
            <p>Each section answers one question your reader has. Here’s what to put there, where to get it, and the trap to avoid.</p>
          </SectionHead>
          <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-background">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Section</th>
                  <th className="px-4 py-3 font-semibold">What goes there</th>
                  <th className="px-4 py-3 font-semibold">Where to get it</th>
                  <th className="px-4 py-3 font-semibold">Common trap</th>
                </tr>
              </thead>
              <tbody>
                {SECTIONS.map((s) => (
                  <tr key={s.n} className="border-b border-border last:border-0 align-top">
                    <td className="px-4 py-3 font-semibold whitespace-nowrap">
                      {s.n}. {s.name}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{s.what}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.source}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.trap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Blank vs filled */}
      <section className="container-page py-16">
        <SectionHead eyebrow="Blank and filled" title="Start from the blank, check against the example">
          <p>
            The blank version prompts you section by section; the filled one shows what a finished report looks like.
            Both are in the PDF.
          </p>
        </SectionHead>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <Graphic g={BLANK} download />
          <Graphic g={HERO} download />
        </div>
      </section>

      {/* How to fill */}
      <section className="border-y border-border bg-surface">
        <div className="container-page py-16">
          <SectionHead eyebrow="Step by step" title="How to fill in the SEO report template" />
          <Steps
            items={[
              { title: "Set the period and the comparison", body: "In Search Console’s Performance report, pick the date range and use Compare → previous period (or the same period last year)." },
              { title: "Fill the four key metrics", body: "Copy clicks, impressions, CTR and average position for both periods into the sheet. The CSV computes the changes." },
              { title: "Export the Dates, Pages and Queries tabs", body: "Dates gives the trend; Pages gives the top five URLs; Queries gives the movers." },
              { title: "Write work completed and next steps", body: "Tie each item to a number on the page where you can — that’s what makes the work visible." },
              { title: "Write the headline last", body: "Now you know the story. One sentence: what changed, and why." },
              {
                title: "Send it as one page",
                body: (
                  <>
                    PDF or image, in the email body if you can. Want the top of it as a shareable graphic? Use an{" "}
                    <a href="/seo-infographics/" className="text-primary hover:underline">SEO infographic</a>.
                  </>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* Headlines */}
      <section className="container-page py-16">
        <SectionHead eyebrow="The most important line" title="Writing the headline: before and after">
          <p>The headline is the only part some readers will see. A label wastes it; a finding uses it.</p>
        </SectionHead>
        <div className="mt-8 space-y-3">
          {HEADLINES.map((h) => (
            <div key={h.bad} className="grid gap-3 rounded-xl border border-border p-4 md:grid-cols-[1fr_2fr]">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <X className="mt-0.5 h-4 w-4 flex-none text-destructive" /> {h.bad}
              </div>
              <div className="flex items-start gap-2 text-sm font-medium">
                <Check className="mt-0.5 h-4 w-4 flex-none text-success" /> {h.good}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Compare */}
      <section className="border-y border-border bg-surface">
        <div className="container-page py-16">
          <SectionHead eyebrow="Report, deck or dashboard?" title="Which SEO reporting format to use when" />
          <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-background">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3"></th>
                  <th className="px-4 py-3 font-semibold text-primary">One-page report</th>
                  <th className="px-4 py-3 font-semibold">Slide deck</th>
                  <th className="px-4 py-3 font-semibold">Dashboard</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((c) => (
                  <tr key={c.dim} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-semibold">{c.dim}</td>
                    <td className="px-4 py-3">{c.one}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.deck}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.dash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Variants */}
      <section className="container-page py-16">
        <SectionHead eyebrow="Other templates" title="Need a different shape of report?" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { href: "/monthly-seo-report-template/", g: GRAPHICS["monthly-seo-report-template-sample"], t: "Monthly SEO report template", b: "Calendar-month reporting with month-over-month and year-over-year comparisons." },
            { href: "/seo-reporting-template/", g: GRAPHICS["seo-reporting-framework"], t: "SEO reporting template", b: "The system behind the reports: cadence, audiences, KPIs and a reporting plan." },
            { href: "/seo-dashboard-template/", g: GRAPHICS["seo-dashboard-template-sample"], t: "SEO dashboard template", b: "A seven-widget layout for monitoring, not reporting." },
          ].map((v) => (
            <a key={v.href} href={v.href} className="group flex flex-col rounded-xl border border-border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md">
              <img src={v.g.svg} alt={v.g.alt} width={v.g.w} height={v.g.h} loading="lazy" decoding="async" className="h-48 w-full rounded-md border border-border bg-white object-cover object-top" />
              <span className="mt-4 flex items-center justify-between font-semibold">
                {v.t} <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 text-sm text-muted-foreground">{v.b}</span>
            </a>
          ))}
        </div>
      </section>

      <Faq items={faq} />

      <RelatedPages
        links={[
          { href: "/seo-infographics/", title: "SEO infographics", blurb: "Turn the headline of your report into one shareable image." },
          { href: "/seo-infographic-examples/", title: "SEO infographic examples", blurb: "Ten annotated examples to borrow from." },
          { href: "/gsc-infographic-report/", title: "GSC infographic report", blurb: "Which Search Console export feeds which section." },
        ]}
      />

      <CtaBand title="Rather not fill it in by hand? Generate the visuals from your data." cta="Open WhizGraphs" />
    </>
  );
}
