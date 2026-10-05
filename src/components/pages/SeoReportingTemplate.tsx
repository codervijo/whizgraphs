import { GRAPHICS } from "../../lib/graphics/catalog.mjs";
import { ArrowRight } from "lucide-react";
import { Eyebrow, Faq, RelatedPages, CtaBand, SectionHead, Graphic, DownloadPanel, Steps, type FaqItem } from "./_shared";

export const PATH = "/seo-reporting-template/";
export const HERO = GRAPHICS["seo-reporting-framework"];
export const PLAN = GRAPHICS["seo-reporting-plan-blank"];

export const DOWNLOADS = [
  { href: "/downloads/seo-reporting-template.pdf", label: "SEO reporting template (PDF)", format: "PDF", mime: "application/pdf", detail: "2 pages: the reporting framework + a blank reporting plan." },
  { href: "/downloads/seo-reporting-plan.csv", label: "Reporting plan sheet (CSV)", format: "CSV", mime: "text/csv", detail: "KPI · audience · cadence · source · target · owner." },
  { href: "/downloads/seo-reporting-cadences.csv", label: "Cadence matrix (CSV)", format: "CSV", mime: "text/csv", detail: "Weekly, monthly and quarterly: audience, question, KPIs, format." },
];

const CADENCES = [
  {
    name: "Weekly pulse",
    who: "In-house SEO or content team",
    q: "Did anything break or spike?",
    kpis: ["Clicks and impressions, week over week", "Pages newly losing clicks", "Indexing and crawl errors"],
    format: "Three to five bullets in Slack or email. No charts unless something moved.",
    link: { href: "/seo-dashboard-template/", label: "SEO dashboard template" },
  },
  {
    name: "Monthly report",
    who: "Client, manager or stakeholder",
    q: "Is SEO working, and what’s next?",
    kpis: ["Clicks, impressions, CTR, position — MoM and YoY", "Top pages and keyword wins", "Work completed against plan"],
    format: "A one-page report or infographic, sent the same day every month.",
    link: { href: "/monthly-seo-report-template/", label: "Monthly SEO report template" },
  },
  {
    name: "Quarterly review",
    who: "Founder, executive or budget owner",
    q: "Is the investment paying off against the goal?",
    kpis: ["Non-brand clicks against target", "Leads or conversions from organic search", "Which bets to keep, cut or add"],
    format: "A short deck or a one-page snapshot, discussed live.",
    link: { href: "/seo-report-template/", label: "SEO report template" },
  },
];

const AUDIENCE_KPIS = [
  { kpi: "Clicks (total and non-brand)", team: "Weekly", client: "Monthly", exec: "Quarterly" },
  { kpi: "Impressions", team: "Weekly", client: "Monthly", exec: "—" },
  { kpi: "CTR", team: "Weekly, per page", client: "Monthly", exec: "—" },
  { kpi: "Average position / keyword movement", team: "Weekly, per query", client: "Monthly (wins)", exec: "—" },
  { kpi: "Top pages gaining / losing", team: "Weekly", client: "Monthly", exec: "—" },
  { kpi: "Indexing and errors", team: "Weekly", client: "Only if material", exec: "—" },
  { kpi: "Organic leads or revenue", team: "Monthly", client: "Monthly, if tracked", exec: "Quarterly" },
  { kpi: "Work shipped vs plan", team: "Weekly", client: "Monthly", exec: "Quarterly (as bets)" },
];

const ANOMALIES = [
  "Did total clicks move more than usual week over week?",
  "Did one page or one query account for most of the change?",
  "Is the change on one device or one country only?",
  "Did anything ship, migrate or break on the site this period?",
  "Was there a Google algorithm update in the window?",
  "Is the last day of data complete, or still processing?",
];

export const faq: FaqItem[] = [
  {
    q: "What is an SEO reporting template?",
    a: "It’s the reusable structure behind your SEO reports rather than a single report: which KPIs you report, to whom, how often, in what format, and from which data source. This page’s template is a reporting framework (weekly, monthly, quarterly) plus a reporting plan you fill in once with each client or team.",
  },
  {
    q: "What’s the difference between an SEO report template and an SEO reporting template?",
    a: "An SEO report template is the layout of one report — the page you send. An SEO reporting template is the process around it — cadence, audiences, KPIs and workflow. Use this page to decide what you report and when; use the SEO report template or monthly SEO report template to produce each report.",
  },
  {
    q: "How often should SEO be reported?",
    a: "Match the cadence to the audience. The team doing the work benefits from a weekly pulse; clients and managers usually want a monthly report; executives and budget owners want a quarterly review against goals. Reporting the same thing to everyone at the same cadence serves no one well.",
  },
  {
    q: "Which SEO KPIs should I report to clients?",
    a: "Clicks and impressions with their change, CTR, keyword movement for the queries you’re targeting, top pages, and work completed against plan — plus leads or revenue from organic search if the client tracks them. Agree the list in a reporting plan before the first report.",
  },
  {
    q: "Should I include rankings for every keyword?",
    a: "Not in the report. Track the full list in a dashboard or rank tracker, and report the movement that matters: queries that reached or left page one, and the targets you agreed in the plan.",
  },
];

export default function SeoReportingTemplate() {
  return (
    <>
      <section className="container-page grid gap-10 py-12 md:grid-cols-[1.1fr_1fr] md:py-16">
        <div>
          <Eyebrow>Free template</Eyebrow>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">SEO reporting template: the system behind the reports</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A good SEO report starts before anyone opens Search Console: who is it for, how often, and which numbers
            mean “working”? This template sets that up — a three-cadence reporting framework, a KPI matrix by audience,
            and a reporting plan to agree with each client or team.
          </p>
          <div className="mt-6">
            <DownloadPanel title="Download the reporting template" note="Free, no sign-up." items={DOWNLOADS} />
          </div>
        </div>
        <Graphic g={HERO} eager />
      </section>

      {/* Cadences */}
      <section className="border-y border-border bg-surface">
        <div className="container-page py-16">
          <SectionHead eyebrow="Three cadences" title="Weekly, monthly, quarterly — different readers, different reports">
            <p>Each cadence has its own audience and question. Each links to the template that produces it.</p>
          </SectionHead>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {CADENCES.map((c) => (
              <div key={c.name} className="flex flex-col rounded-xl border border-border bg-background p-6">
                <h3 className="text-xl font-semibold">{c.name}</h3>
                <div className="mt-1 text-sm font-medium text-primary">{c.who}</div>
                <p className="mt-3 text-sm italic text-muted-foreground">“{c.q}”</p>
                <ul className="mt-4 space-y-1.5 text-sm">
                  {c.kpis.map((k) => (
                    <li key={k} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                      {k}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">{c.format}</p>
                <a href={c.link.href} className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary hover:underline">
                  {c.link.label} <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KPI matrix */}
      <section className="container-page py-16">
        <SectionHead eyebrow="KPI matrix" title="Which SEO KPIs go to which audience">
          <p>The team sees everything, often. Clients see outcomes monthly. Executives see goals quarterly. A dash means “leave it out”.</p>
        </SectionHead>
        <div className="mt-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">KPI</th>
                <th className="px-4 py-3">SEO / content team</th>
                <th className="px-4 py-3">Client or manager</th>
                <th className="px-4 py-3">Executive</th>
              </tr>
            </thead>
            <tbody>
              {AUDIENCE_KPIS.map((r) => (
                <tr key={r.kpi} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-semibold">{r.kpi}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.team}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.client}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.exec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Plan */}
      <section className="border-y border-border bg-surface">
        <div className="container-page grid gap-10 py-16 md:grid-cols-[1fr_1fr] md:items-start">
          <div>
            <SectionHead eyebrow="The reporting plan" title="Agree what “working” means before the first report">
              <p>
                One row per KPI: who it’s for, how often, where the number comes from, what the target is, and who owns
                it. Fill it in at kickoff with the client or team lead.
              </p>
              <p>
                It prevents the most common reporting failure: a client who expected leads receiving a report about
                impressions. If a KPI isn’t in the plan, it doesn’t go in the report — and if it should be, you change
                the plan together.
              </p>
            </SectionHead>
            <a href="/downloads/seo-reporting-plan.csv" download className="mt-6 inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Download the plan (CSV)
            </a>
          </div>
          <Graphic g={PLAN} download />
        </div>
      </section>

      {/* Workflow */}
      <section className="container-page py-16">
        <SectionHead eyebrow="Workflow" title="The five steps behind every report, at every cadence" />
        <Steps
          items={[
            { title: "Pull the data", body: "Same source, same date logic, every time — Search Console’s Performance report for search, your analytics tool for conversions." },
            { title: "Check for anomalies", body: "Before writing a word, run the six questions below. Most “traffic is down” emails die here, correctly." },
            { title: "Write the headline", body: "One sentence per report: the finding, not the topic." },
            {
              title: "Build the visuals",
              body: (
                <>
                  Only the charts the KPI plan asks for. A single{" "}
                  <a href="/seo-infographics/" className="text-primary hover:underline">SEO infographic</a> is often enough for the weekly or monthly note.
                </>
              ),
            },
            { title: "Send, and log decisions", body: "Note what was decided because of the report. Next period, report on whether it worked — that closes the loop." },
          ]}
        />
        <div className="mt-10 rounded-xl border border-border bg-surface p-6">
          <h3 className="font-semibold">Anomaly check — six questions before you write</h3>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
            {ANOMALIES.map((a) => (
              <li key={a} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faq items={faq} />

      <RelatedPages
        links={[
          { href: "/seo-report-template/", title: "SEO report template", blurb: "The one-page report this framework produces." },
          { href: "/monthly-seo-report-template/", title: "Monthly SEO report template", blurb: "The monthly cadence, ready to fill in." },
          { href: "/seo-dashboard-template/", title: "SEO dashboard template", blurb: "What the team watches between reports." },
        ]}
      />

      <CtaBand title="Make every report in the plan look like it came from the same team." cta="Open WhizGraphs" />
    </>
  );
}
