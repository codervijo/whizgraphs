import { InfographicPreview, defaultConfig } from "../InfographicPreview";
import { TEMPLATES, type ReportTemplate } from "../../lib/mockData";
import { ArrowRight, MousePointerClick, Palette, Share2 } from "lucide-react";
import { Eyebrow, Faq, RelatedPages, CtaBand, type FaqItem } from "./_shared";

interface TemplateGuide {
  id: ReportTemplate;
  reads: string;      // what data it reads
  answers: string;    // the stakeholder question it answers
  bestFor: string;    // who reaches for it
  headline: string;   // sample headline for the live preview
}

const GUIDE: TemplateGuide[] = [
  {
    id: "traffic-growth",
    reads: "Monthly clicks and impressions over your chosen date range, plotted as a trend line with headline totals.",
    answers: "“Is search traffic actually growing, and how fast?”",
    bestFor: "Founders and consultants sending a recurring update where the story is momentum.",
    headline: "Search traffic is compounding.",
  },
  {
    id: "top-pages",
    reads: "Your best URLs ranked by clicks, plus the top page’s CTR and average position.",
    answers: "“Which handful of pages is carrying the whole site?”",
    bestFor: "Content audits and deciding where the next round of internal links or refreshes should go.",
    headline: "Five URLs drove most of the clicks.",
  },
  {
    id: "keyword-wins",
    reads: "Queries that moved up the rankings this period, showing the before → after position and the clicks each now earns.",
    answers: "“What broke onto page one since last month?”",
    bestFor: "Proving the retainer is working — concrete ranking movement a client can see in seconds.",
    headline: "Big movers this month.",
  },
  {
    id: "content-performance",
    reads: "Every article plotted by CTR against average position, with bubble size scaled to clicks.",
    answers: "“Which posts over- or under-perform the rank they already hold?”",
    bestFor: "Editorial planning — spotting high-rank, low-CTR pages that just need a better title or meta description.",
    headline: "Which posts pay rent?",
  },
  {
    id: "seo-health",
    reads: "A single grid of totals — clicks, impressions, CTR, average position, indexed pages, crawl errors, Core Web Vitals, top country.",
    answers: "“What’s the one-glance state of our search visibility?”",
    bestFor: "Quarterly reviews and exec summaries where nobody wants a chart, just the number.",
    headline: "Quarterly SEO snapshot.",
  },
];

const STEPS = [
  {
    icon: MousePointerClick,
    title: "Pick the template that fits the question",
    body: "Each of the five templates is tuned to one thing a stakeholder actually asks. Start from the question, not the chart.",
  },
  {
    icon: Palette,
    title: "Point it at your data and brand it",
    body: "Drop in Search Console-style metrics, then set your brand color, logo, and a plain-language headline. No design pass required.",
  },
  {
    icon: Share2,
    title: "Share the one image",
    body: "Send a single graphic in Slack, an email, or a client deck — instead of a spreadsheet nobody opens.",
  },
];

export const faq: FaqItem[] = [
  {
    q: "What is an SEO infographic?",
    a: "It’s a single-image summary of search performance — clicks, impressions, rankings, and content wins — laid out so a non-specialist can understand it at a glance. It replaces the spreadsheet or slide deck most people skim and forget.",
  },
  {
    q: "How is this different from a Looker Studio or spreadsheet dashboard?",
    a: "Dashboards are built for exploration: many charts, filters, and tabs. An infographic is built for communication — one focused story per image, sized to drop into a message. WhizGraphs is for the moment you report out, not the moment you dig in.",
  },
  {
    q: "Which template should I start with?",
    a: "If you’re sending a monthly update, start with Traffic Growth. If you’re proving progress to a client, use Keyword Wins. If you’re auditing what to work on next, Top Pages and Content Performance are the pair to reach for.",
  },
  {
    q: "Do I need design skills?",
    a: "No. Layout, spacing, and type are handled by the template. You choose the template, the data, a brand color, and a headline — the graphic is composed for you.",
  },
  {
    q: "Do I have to connect Google Search Console first?",
    a: "Not for the MVP. Every template runs on realistic mock GSC data so you can explore the full set immediately. Live Search Console sync is rolling out gradually.",
  },
];

export default function SeoInfographics() {
  return (
    <>
      {/* Intro */}
      <section className="container-page py-12 md:py-16">
        <div className="max-w-3xl">
          <Eyebrow>SEO infographics</Eyebrow>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            SEO infographics that turn search data into one clear image.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            An SEO infographic compresses a month of Search Console data — traffic, rankings, top pages, content
            performance — into a single graphic anyone can read in seconds. No pivot tables, no 14-tab export, no slide
            deck.
          </p>
          <p className="mt-3 text-muted-foreground">
            WhizGraphs ships five focused templates, each tuned to a question your clients, team, or investors actually
            ask. Below is what every template reads, the question it answers, and when to reach for it — so you pick the
            right one before you ever touch the data.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/dashboard/"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Create your first infographic <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/seo-infographic-examples/"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-background px-5 text-sm font-medium hover:bg-muted"
            >
              See finished examples
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-surface">
        <div className="container-page py-16">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Three steps, no chart-wrangling.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.title} className="rounded-xl border border-border bg-background p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-md bg-accent text-accent-foreground">
                    <s.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-muted-foreground">Step {i + 1}</span>
                </div>
                <h3 className="mt-3 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Per-template deep dive */}
      <section className="container-page py-16">
        <div className="max-w-2xl">
          <Eyebrow>The five templates</Eyebrow>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            One template per question you get asked.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Every preview below is generated from mock GSC data. Yours renders from your own numbers the same way.
          </p>
        </div>
        <div className="mt-10 space-y-10">
          {GUIDE.map((g, i) => {
            const meta = TEMPLATES.find((t) => t.id === g.id)!;
            return (
              <div
                key={g.id}
                className={`grid gap-8 md:grid-cols-2 md:items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div>
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent-foreground">
                    {meta.tag}
                  </span>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight">{meta.name}</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="font-semibold">What it reads</dt>
                      <dd className="mt-0.5 text-muted-foreground">{g.reads}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">The question it answers</dt>
                      <dd className="mt-0.5 text-muted-foreground">{g.answers}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Best for</dt>
                      <dd className="mt-0.5 text-muted-foreground">{g.bestFor}</dd>
                    </div>
                  </dl>
                  <a
                    href="/dashboard/"
                    className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Use the {meta.name} template <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
                <div>
                  <InfographicPreview config={{ ...defaultConfig, template: g.id, headline: g.headline }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Faq items={faq} />

      <RelatedPages
        links={[
          {
            href: "/seo-report-infographic/",
            title: "SEO report infographic",
            blurb: "Turn the monthly recap into a one-page image clients open.",
          },
          {
            href: "/gsc-infographic-report/",
            title: "GSC infographic report",
            blurb: "How each Search Console metric maps to a visual.",
          },
          {
            href: "/seo-infographic-examples/",
            title: "Examples",
            blurb: "Six finished infographics, annotated with the story each tells.",
          },
        ]}
      />

      <CtaBand title="Pick a template and ship your first SEO infographic today." />
    </>
  );
}
