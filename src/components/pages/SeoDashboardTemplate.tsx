import { GRAPHICS } from "../../lib/graphics/catalog.mjs";
import { Eyebrow, Faq, RelatedPages, CtaBand, SectionHead, Graphic, DownloadPanel, Steps, type FaqItem } from "./_shared";

export const PATH = "/seo-dashboard-template/";
export const HERO = GRAPHICS["seo-dashboard-template-sample"];
export const BLANK = GRAPHICS["seo-dashboard-template-blank"];

export const DOWNLOADS = [
  { href: "/downloads/seo-dashboard-template.pdf", label: "SEO dashboard template (PDF)", format: "PDF", mime: "application/pdf", detail: "2 landscape pages: wireframe + filled example." },
  { href: "/downloads/seo-dashboard-widgets.csv", label: "Widget spec (CSV)", format: "CSV", mime: "text/csv", detail: "Each widget’s metrics, chart type, purpose and data source." },
  { href: BLANK.png, label: "Wireframe (PNG)", format: "PNG", mime: "image/png", detail: `${BLANK.w}×${BLANK.h}px` },
];

const WIDGETS = [
  { name: "Filter bar", what: "Date range with comparison, device, country, page group", chart: "Controls", why: "One dashboard can answer many questions without a new report." },
  { name: "Scorecards ×4", what: "Clicks, impressions, CTR, average position", chart: "Scorecard with change and sparkline", why: "The four Search Console totals at a glance, each against the previous period." },
  { name: "Trend", what: "Clicks and impressions by day or week", chart: "Time series", why: "Shows direction — and exactly when a change started." },
  { name: "Device split", what: "Clicks by desktop, mobile, tablet", chart: "Donut or bar", why: "Catches problems that only affect one device." },
  { name: "Top queries", what: "Query, clicks, impressions, CTR, position", chart: "Sortable table", why: "Where demand comes from, and which queries are under-clicked." },
  { name: "Top pages", what: "Page, clicks, previous clicks, change", chart: "Table with change column", why: "Which URLs are gaining or losing, so you know where to look." },
];

const VS = [
  { q: "Who opens it?", dash: "The person doing the SEO work", report: "The person paying for it or managing it" },
  { q: "How often?", dash: "Daily or weekly, whenever needed", report: "On a schedule — monthly or quarterly" },
  { q: "What does it do?", dash: "Shows everything; you find the story", report: "Tells one story; leaves out the rest" },
  { q: "Does it update itself?", dash: "Yes, when connected to data", report: "No, it’s written each period" },
];

export const faq: FaqItem[] = [
  {
    q: "What should an SEO dashboard include?",
    a: "Filters for date, device, country and page group; four scorecards for clicks, impressions, CTR and average position with their change; a clicks and impressions trend; a device split; and sortable tables of top queries and top pages. Those six widget groups cover most day-to-day monitoring from Search Console data.",
  },
  {
    q: "Can I build this SEO dashboard in Looker Studio?",
    a: "Yes. Looker Studio has a built-in Search Console connector. Add it as a data source, then recreate each widget from the spec: scorecards for the four metrics, a time-series chart, a pie or bar chart by device, and tables by query and by page, with a date-range control and filter controls on top.",
  },
  {
    q: "Can I build it in Google Sheets instead?",
    a: "Yes, with a bit more manual work. Export the Performance report tabs from Search Console to Google Sheets, then build the scorecards with simple formulas and the trend and device charts with Sheets’ chart tool. It won’t refresh on its own, so it suits a weekly check rather than daily monitoring.",
  },
  {
    q: "Should I send my SEO dashboard to clients?",
    a: "Usually not as the main report. Dashboards make the reader find the story. Send a one-page report with the headline and the numbers that matter, and link the dashboard for anyone who wants to explore.",
  },
  {
    q: "Why does the dashboard use the last 28 days?",
    a: "Four full weeks contain the same number of each weekday, so weekend dips don’t distort the comparison with the previous 28 days. Use calendar months for monthly reports and 28-day windows for monitoring.",
  },
];

export default function SeoDashboardTemplate() {
  return (
    <>
      <section className="container-page py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>Free template</Eyebrow>
            <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">SEO dashboard template</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              A six-widget layout for monitoring search performance from Google Search Console — the view you check
              between reports. Download the wireframe and the widget spec, then build it in Looker Studio, Google Sheets
              or your BI tool.
            </p>
          </div>
          <DownloadPanel title="Download the dashboard template" note="Free, no sign-up." items={DOWNLOADS} />
        </div>
        <Graphic g={HERO} eager className="mt-10" caption="Filled example — 28 days of sample data for a fictional developer-tools company." />
      </section>

      {/* Widgets */}
      <section className="border-y border-border bg-surface">
        <div className="container-page py-16">
          <SectionHead eyebrow="The layout" title="Six widgets, in the order people read them">
            <p>
              Top to bottom: what am I looking at (filters), how are we doing (scorecards), since when (trend), and why
              (devices, queries, pages).
            </p>
          </SectionHead>
          <Graphic g={BLANK} className="mt-8" download />
          <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-background">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Widget</th>
                  <th className="px-4 py-3">Metrics / dimensions</th>
                  <th className="px-4 py-3">Chart</th>
                  <th className="px-4 py-3">Why it’s there</th>
                </tr>
              </thead>
              <tbody>
                {WIDGETS.map((w) => (
                  <tr key={w.name} className="border-b border-border last:border-0 align-top">
                    <td className="px-4 py-3 font-semibold whitespace-nowrap">{w.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{w.what}</td>
                    <td className="px-4 py-3 text-muted-foreground">{w.chart}</td>
                    <td className="px-4 py-3 text-muted-foreground">{w.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Build it */}
      <section className="container-page py-16">
        <SectionHead eyebrow="Build it" title="How to build this SEO dashboard in Looker Studio">
          <p>The same order works in any BI tool; only the menu names change.</p>
        </SectionHead>
        <Steps
          items={[
            { title: "Connect Search Console", body: "Create a report and add the Search Console connector as a data source. Choose your property; use the URL-level table when you need page-level data." },
            { title: "Add the date control with comparison", body: "A date-range control set to the last 28 days, and turn on the comparison to the previous period for every scorecard." },
            { title: "Add four scorecards", body: "Clicks, impressions, CTR and average position. Make sure position shows a fall as good — lower is better." },
            { title: "Add the trend and device split", body: "A time series for clicks and impressions by date; a pie or bar chart of clicks by device." },
            { title: "Add the two tables", body: "Queries with clicks, impressions, CTR and position; landing pages with clicks and their change. Sort both by clicks." },
            { title: "Add filters and share view-only", body: "Device, country and a page-group filter (e.g. URL contains /blog/). Share with the team as viewers so nobody breaks the layout." },
          ]}
        />
      </section>

      {/* Dashboard vs report */}
      <section className="border-y border-border bg-surface">
        <div className="container-page py-16">
          <SectionHead eyebrow="Dashboard or report?" title="An SEO dashboard is not an SEO report">
            <p>
              You need both. The dashboard is for the person doing the work; the report is for the person who needs the
              conclusion. Most reporting pain comes from sending one when the reader needed the other.
            </p>
          </SectionHead>
          <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-background">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3"></th>
                  <th className="px-4 py-3 text-primary">Dashboard</th>
                  <th className="px-4 py-3">Report</th>
                </tr>
              </thead>
              <tbody>
                {VS.map((v) => (
                  <tr key={v.q} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-semibold">{v.q}</td>
                    <td className="px-4 py-3">{v.dash}</td>
                    <td className="px-4 py-3 text-muted-foreground">{v.report}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Turning dashboard findings into something you send?{" "}
            <a href="/seo-report-template/" className="font-medium text-primary hover:underline">Use the SEO report template</a>, or put one finding in an{" "}
            <a href="/seo-infographics/" className="font-medium text-primary hover:underline">SEO infographic</a>.
          </p>
        </div>
      </section>

      <Faq items={faq} />

      <RelatedPages
        links={[
          { href: "/seo-reporting-template/", title: "SEO reporting template", blurb: "Where the dashboard fits: the weekly pulse in a three-cadence system." },
          { href: "/seo-report-template/", title: "SEO report template", blurb: "The one-page report for clients and managers." },
          { href: "/gsc-infographic-report/", title: "GSC infographic report", blurb: "What each Search Console metric actually counts." },
        ]}
      />

      <CtaBand title="Found something in the dashboard? Share it as one clear image." cta="Open WhizGraphs" />
    </>
  );
}
