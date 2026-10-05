import { GRAPHICS } from "../../lib/graphics/catalog.mjs";
import { CalendarDays } from "lucide-react";
import { Eyebrow, Faq, RelatedPages, CtaBand, SectionHead, Graphic, DownloadPanel, Steps, type FaqItem } from "./_shared";

export const PATH = "/monthly-seo-report-template/";
export const HERO = GRAPHICS["monthly-seo-report-template-sample"];
export const BLANK = GRAPHICS["monthly-seo-report-template-blank"];

export const DOWNLOADS = [
  { href: "/downloads/monthly-seo-report-template.pdf", label: "Monthly SEO report template (PDF)", format: "PDF", mime: "application/pdf", detail: "2 pages: blank + filled example. Letter size." },
  { href: "/downloads/monthly-seo-report-template.csv", label: "MoM / YoY data sheet (CSV)", format: "CSV", mime: "text/csv", detail: "Month-over-month and year-over-year formulas built in, plus a 13-month block." },
  { href: BLANK.png, label: "Blank template (PNG)", format: "PNG", mime: "image/png", detail: `${BLANK.w}×${BLANK.h}px` },
];

const MATH = [
  { metric: "Clicks, impressions, pages with clicks", formula: "(this month ÷ comparison month) − 1", example: "9,840 vs 9,120 → +8%", note: "A percent change." },
  { metric: "CTR", formula: "this month’s CTR − comparison CTR", example: "3.43% vs 3.36% → +0.07pp", note: "Percentage points, not percent — CTR is already a percentage." },
  { metric: "Average position", formula: "comparison position − this month’s position", example: "19.1 → 18.4 → ▲ 0.7", note: "Lower is better, so a falling number is an improvement. Show it as places gained." },
];

const PITFALLS = [
  { t: "Months aren’t the same length", b: "February has up to three fewer days than March. When a month-over-month change is small, check the daily average before calling it a trend." },
  { t: "Seasonality looks like failure", b: "A December dip is often just December. That’s what the year-over-year column and the 13-month line are for." },
  { t: "The last days aren’t in yet", b: "Search Console data arrives with a short delay. Pull the report a few days into the new month so the final days of the old one are complete." },
  { t: "One page explains the whole change", b: "Before writing “traffic is down”, check the Pages tab. A single URL losing a featured snippet can account for most of a sitewide dip." },
  { t: "Average position moves for the wrong reasons", b: "New long-tail impressions at position 40 drag the average down even as rankings improve. Read it alongside clicks and the keyword list." },
];

export const faq: FaqItem[] = [
  {
    q: "What should a monthly SEO report include?",
    a: "A one-line summary; clicks, impressions, CTR, average position and pages with clicks, each compared with last month and the same month last year; a 13-month clicks trend; the pages that gained and lost the most; and what was done this month and is planned for next. That is the layout of this template.",
  },
  {
    q: "Why compare with the same month last year?",
    a: "Because many sites are seasonal. Month-over-month tells you about momentum; year-over-year tells you whether this month is actually better than the equivalent month before. Showing both stops a normal seasonal dip from being read as a problem.",
  },
  {
    q: "When should I send the monthly SEO report?",
    a: "Early in the following month, once the final days of the reporting month have appeared in Search Console — a few days in is a safe rule. Pick a fixed day and stick to it so your reader expects it.",
  },
  {
    q: "Can I use this template if I only have a few months of data?",
    a: "Yes. Leave the year-over-year column blank until you have a year of history, and plot however many months you have. Search Console keeps 16 months of performance data, so once you’re set up you’ll always have a full year to compare.",
  },
  {
    q: "How is this different from the general SEO report template?",
    a: "The SEO report template is period-agnostic and story-led. This monthly version adds the month-over-month and year-over-year table, the 13-month trend and page-level gains and drops — built for a report that always runs on the calendar.",
  },
];

export default function MonthlySeoReportTemplate() {
  return (
    <>
      <section className="container-page grid gap-10 py-12 md:grid-cols-[1.1fr_1fr] md:py-16">
        <div>
          <Eyebrow>Free template</Eyebrow>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">Monthly SEO report template</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A one-page monthly report built around the two comparisons that matter every month: versus last month, and
            versus the same month last year. Includes a 13-month trend, the pages that gained and dropped, and a done /
            next list.
          </p>
          <div className="mt-6">
            <DownloadPanel title="Download the monthly template" note="Free, no sign-up." items={DOWNLOADS} />
          </div>
        </div>
        <Graphic g={HERO} eager caption="Filled example — sample data for a fictional analytics company." />
      </section>

      {/* Why MoM + YoY */}
      <section className="border-y border-border bg-surface">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[1fr_1.2fr]">
          <SectionHead eyebrow="The core idea" title="Every month, two comparisons and one long line">
            <p>
              Month-over-month answers “are we moving?”. Year-over-year answers “is this actually better, or just the
              season?”. The 13-month trend puts this month next to the same month last year on a single line, so the
              reader can see both at once.
            </p>
            <p>
              Most monthly reports show only the first comparison — which is why so many of them cause a panic every
              December.
            </p>
          </SectionHead>
          <div className="overflow-x-auto rounded-xl border border-border bg-background">
            <table className="w-full min-w-[520px] text-left text-sm">
              <caption className="px-4 pt-4 text-left font-semibold">How to calculate each change</caption>
              <thead className="text-xs uppercase tracking-wide text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="px-4 py-3">Metric</th>
                  <th className="px-4 py-3">Formula</th>
                  <th className="px-4 py-3">Example</th>
                </tr>
              </thead>
              <tbody>
                {MATH.map((m) => (
                  <tr key={m.metric} className="border-b border-border last:border-0 align-top">
                    <td className="px-4 py-3 font-semibold">{m.metric}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <code className="text-xs">{m.formula}</code>
                      <div className="mt-1 text-xs">{m.note}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{m.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="container-page py-16">
        <SectionHead eyebrow="Inside the template" title="Seven sections, top to bottom">
          <p>The blank version, with a prompt in every box. The filled example is above.</p>
        </SectionHead>
        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-start">
          <Graphic g={BLANK} download />
          <ol className="space-y-4">
            {[
              ["This month in one line", "Lead with the month-over-month direction, then the year-over-year context."],
              ["MoM & YoY table", "Five metrics across this month, last month, and the same month last year, with both changes."],
              ["13-month clicks trend", "Thirteen points so this month and the same month last year sit on one line."],
              ["Biggest gains", "The three pages that gained the most clicks, each with a one-line reason."],
              ["Biggest drops", "The three that lost the most — with the reason, or “investigating”."],
              ["Done this month", "What shipped, ideally linked to a gain above."],
              ["Next month", "Two or three priorities, each tied to a number you’ll report next month."],
            ].map(([t, b], i) => (
              <li key={t} className="flex gap-3">
                <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>
                <div>
                  <div className="font-semibold">{t}</div>
                  <p className="text-sm text-muted-foreground">{b}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Monthly routine */}
      <section className="border-y border-border bg-surface">
        <div className="container-page py-16">
          <SectionHead eyebrow="The monthly routine" title="How to produce the report each month" />
          <Steps
            items={[
              { title: "Wait a few days into the new month", body: "Let Search Console finish processing the final days of the month you’re reporting on." },
              { title: "Pull this month vs last month", body: "Performance → Search results → Date → Compare → previous month. Copy the four totals into the sheet; add pages with clicks from the Pages tab." },
              { title: "Pull this month vs the same month last year", body: "Change the comparison and copy the totals into the year-over-year column. The CSV computes both changes." },
              { title: "Find the gains and drops", body: "On the Pages tab with the month-over-month comparison, sort by the click difference both ways. Note one reason per page." },
              { title: "Update the 13-month line", body: "Add the new month, drop the oldest. Keep any annotations for launches or updates." },
              { title: "Write the one-liner, then send", body: "Same day every month. Consistency is what turns a report into a habit for your reader." },
            ]}
          />
        </div>
      </section>

      {/* Pitfalls */}
      <section className="container-page py-16">
        <SectionHead eyebrow="Read it right" title="Five monthly-report traps" />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PITFALLS.map((p) => (
            <div key={p.t} className="rounded-xl border border-border p-5">
              <CalendarDays className="h-5 w-5 text-primary" />
              <div className="mt-3 font-semibold">{p.t}</div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.b}</p>
            </div>
          ))}
        </div>
      </section>

      <Faq items={faq} />

      <RelatedPages
        links={[
          { href: "/seo-report-template/", title: "SEO report template", blurb: "The general, story-led one-pager this template builds on." },
          { href: "/seo-reporting-template/", title: "SEO reporting template", blurb: "Where the monthly report fits next to weekly and quarterly." },
          { href: "/seo-infographic-examples/", title: "SEO infographic examples", blurb: "A one-image version of the month for Slack or email." },
        ]}
      />

      <CtaBand title="Turn this month’s numbers into a report people read." cta="Open WhizGraphs" />
    </>
  );
}
