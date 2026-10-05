import { InfographicPreview, defaultConfig } from "../InfographicPreview";
import { ArrowRight, Check } from "lucide-react";
import { Eyebrow, Faq, RelatedPages, CtaBand, type FaqItem } from "./_shared";

const CHECKLIST = [
  { label: "The headline number", body: "One takeaway up top — “traffic up”, “five keywords hit page one” — so the reader gets the point before they read anything else." },
  { label: "Traffic trend", body: "Clicks and impressions over the period, so momentum (or a dip) is visible at a glance rather than buried in a table." },
  { label: "Top pages", body: "The handful of URLs doing most of the work, which is where the next round of effort should usually go." },
  { label: "Keyword wins", body: "Queries that moved up the rankings — the most tangible proof that the work is paying off." },
  { label: "Content performance", body: "Which posts earn clicks relative to the rank they hold, so editorial time goes where it counts." },
  { label: "A health snapshot", body: "Indexed pages, average position, crawl errors — the “is anything on fire?” line for the month." },
];

const COMPARE = [
  {
    dimension: "How it’s produced",
    infographic: "Fill one template with your data.",
    pdf: "Assemble and lay out pages by hand each cycle.",
    sheet: "Copy-paste from raw exports.",
  },
  {
    dimension: "What the reader does",
    infographic: "Understands the month in one glance.",
    pdf: "Scrolls, skims, and usually stops early.",
    sheet: "Has to interpret the numbers themselves.",
  },
  {
    dimension: "Where it lives",
    infographic: "A single image in Slack, email, or a deck.",
    pdf: "An attachment that sits unopened.",
    sheet: "A tab someone has to be invited into.",
  },
  {
    dimension: "Best for",
    infographic: "Reporting out — the moment you communicate progress.",
    pdf: "A formal archive when one is genuinely required.",
    sheet: "Digging in — your own analysis, not the audience’s.",
  },
];

const ANATOMY = [
  { n: 1, label: "Brand & date range", body: "Site name, logo, and the period the report covers — set once, carried across every report." },
  { n: 2, label: "The headline", body: "The single sentence takeaway. If the reader only sees this line, they still get the story." },
  { n: 3, label: "Headline stats", body: "The two or three numbers that matter this month — clicks, impressions, CTR — with their movement." },
  { n: 4, label: "The trend", body: "The chart that carries the argument: is the line going up, flat, or down?" },
  { n: 5, label: "The note", body: "One line of plain-language context — why the number moved — in your own words." },
];

export const faq: FaqItem[] = [
  {
    q: "What is an SEO report infographic?",
    a: "It’s a monthly (or quarterly) SEO report condensed to a single image: the headline result, the traffic trend, top pages, and keyword wins, laid out so a client or teammate understands it without opening a spreadsheet.",
  },
  {
    q: "How often should I send one?",
    a: "Monthly is the default cadence — it matches how most retainers and internal updates run. Quarterly works for exec summaries where month-to-month noise isn’t the point. Pick the rhythm your audience already expects a check-in on.",
  },
  {
    q: "Isn’t a detailed PDF more thorough?",
    a: "Thoroughness isn’t the goal of a report-out; being read is. A 12-page PDF holds more, but the reader rarely gets past page two. Keep the deep detail in a spreadsheet for anyone who wants to dig, and lead with the one-page image.",
  },
  {
    q: "Can I match my agency’s or client’s branding?",
    a: "Yes — set a brand color, a logo placeholder, and your own headline so the report looks like it came from you, not from a generic tool.",
  },
  {
    q: "Does it use my real Search Console data?",
    a: "The MVP runs on realistic mock GSC data so you can build and preview a full report today. Live Google Search Console sync is rolling out gradually.",
  },
];

export default function SeoReportInfographic() {
  return (
    <>
      {/* Hero */}
      <section className="container-page py-12 md:py-16">
        <div className="max-w-3xl">
          <Eyebrow>Monthly SEO report</Eyebrow>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            The SEO report your clients will actually open.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A twelve-page PDF is a graveyard. A one-page infographic is a Slack message. An SEO report infographic gives
            you a visual snapshot of the month — wins, trends, and gaps — in the one format people reliably read.
          </p>
          <a
            href="/dashboard/"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Generate a monthly report <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* What belongs in it */}
      <section className="border-y border-border bg-surface">
        <div className="container-page py-16">
          <div className="max-w-2xl">
            <Eyebrow>What goes in it</Eyebrow>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Six things a monthly SEO report should answer.
            </h2>
            <p className="mt-3 text-muted-foreground">
              A good report isn’t everything you measured — it’s the handful of answers your reader came for. WhizGraphs
              maps each of these to a template so you’re never staring at a blank page.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {CHECKLIST.map((c) => (
              <div key={c.label} className="flex gap-3 rounded-xl border border-border bg-background p-5">
                <Check className="mt-0.5 h-5 w-5 flex-none text-primary" />
                <div>
                  <div className="font-semibold">{c.label}</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="container-page py-16">
        <div className="max-w-2xl">
          <Eyebrow>Format matters</Eyebrow>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Infographic vs. PDF vs. spreadsheet.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Same data, three formats — but each is built for a different job. Here’s where each one actually fits.
          </p>
        </div>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-3 pr-4 font-semibold"> </th>
                <th className="py-3 pr-4 font-semibold text-primary">One-page infographic</th>
                <th className="py-3 pr-4 font-semibold">12-page PDF</th>
                <th className="py-3 pr-4 font-semibold">Raw spreadsheet</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row) => (
                <tr key={row.dimension} className="border-b border-border align-top">
                  <td className="py-3 pr-4 font-medium">{row.dimension}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{row.infographic}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{row.pdf}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{row.sheet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Anatomy */}
      <section className="border-y border-border bg-surface">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow>Anatomy of a one-page report</Eyebrow>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Every element earns its place.</h2>
            <p className="mt-3 text-muted-foreground">
              Nothing on the page is decoration. Read top to bottom, this is what each part is doing.
            </p>
            <ol className="mt-6 space-y-4">
              {ANATOMY.map((a) => (
                <li key={a.n} className="flex gap-3">
                  <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {a.n}
                  </span>
                  <div>
                    <div className="font-semibold">{a.label}</div>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-6">
            <InfographicPreview config={{ ...defaultConfig, template: "traffic-growth", headline: "August at a glance." }} />
            <InfographicPreview config={{ ...defaultConfig, template: "keyword-wins", headline: "Five queries broke into page 1." }} />
          </div>
        </div>
      </section>

      <Faq items={faq} />

      <RelatedPages
        links={[
          {
            href: "/gsc-infographic-report/",
            title: "GSC infographic report",
            blurb: "Where the numbers come from — each Search Console metric as a visual.",
          },
          {
            href: "/seo-infographics/",
            title: "All five templates",
            blurb: "What each template reads and the question it answers.",
          },
          {
            href: "/seo-infographic-examples/",
            title: "Examples",
            blurb: "See finished reports across different brands and stories.",
          },
        ]}
      />

      <CtaBand
        title="Turn this month’s numbers into a report people read."
        cta="Generate a monthly report"
      />
    </>
  );
}
