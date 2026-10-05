import { InfographicPreview, defaultConfig, type InfographicConfig } from "../InfographicPreview";
import { TEMPLATES } from "../../lib/mockData";
import { ArrowRight } from "lucide-react";
import { Eyebrow, Faq, RelatedPages, CtaBand, type FaqItem } from "./_shared";

type Example = Partial<InfographicConfig> & {
  template: InfographicConfig["template"];
  brandColor: string;
  siteName: string;
  headline: string;
  logo: string;
  story: string;
  why: string;
};

const examples: Example[] = [
  {
    template: "traffic-growth",
    siteName: "northbeam.dev",
    brandColor: "#0891b2",
    headline: "Search traffic 3.4× in 8 months.",
    logo: "NB",
    story: "Eight months of compounding growth told in one rising line.",
    why: "A single headline plus one trend chart is all it takes to say “the strategy is working” before anyone reads a number.",
  },
  {
    template: "top-pages",
    siteName: "tailtools.io",
    brandColor: "#16a34a",
    headline: "5 URLs drove 62% of clicks.",
    logo: "TT",
    story: "Traffic is concentrated in a few pages — and the bars make that obvious.",
    why: "Ranking URLs by contribution shows exactly where the next refresh or internal link should go.",
  },
  {
    template: "keyword-wins",
    siteName: "fenwick.studio",
    brandColor: "#dc2626",
    headline: "Big movers — August 2026.",
    logo: "FW",
    story: "Queries that climbed the rankings this month, before → after.",
    why: "Position jumps are the most tangible proof of progress you can hand a client.",
  },
  {
    template: "content-performance",
    siteName: "lattice.blog",
    brandColor: "#7c3aed",
    headline: "Which posts pay rent?",
    logo: "LB",
    story: "Every article plotted by CTR against rank, sized by clicks.",
    why: "High-rank, low-CTR posts jump out — the ones that just need a sharper title, not more links.",
  },
  {
    template: "seo-health",
    siteName: "harborlabs.com",
    brandColor: "#0f172a",
    headline: "Quarterly SEO snapshot.",
    logo: "HL",
    story: "The whole quarter as a grid of the numbers that matter.",
    why: "An exec summary nobody has to decode — the “is anything on fire?” view in one glance.",
  },
  {
    template: "traffic-growth",
    siteName: "orbitcrm.com",
    brandColor: "#ea580c",
    headline: "Q3 hit a new high.",
    logo: "OR",
    story: "Same trend template, a different narrative — a record quarter.",
    why: "Proof that one template flexes to many stories just by changing the headline and the data.",
  },
];

const PRINCIPLES = [
  { label: "One question per image", body: "Every good example answers a single question. If you’re tempted to add a second chart, that’s usually a second infographic." },
  { label: "Lead with a plain-language headline", body: "The takeaway goes first, in words a non-specialist reads instantly — not a metric label like “CTR by URL”." },
  { label: "Show movement, not just totals", body: "A number on its own is inert. A trend, a before → after, or a delta is what tells the reader whether things are getting better." },
  { label: "Brand it so it looks like you", body: "A brand color and logo turn a generic chart into something a client recognizes as coming from your team." },
  { label: "Only include numbers that drive a decision", body: "If a metric wouldn’t change what the reader does next, it’s clutter. Cut it." },
];

const USE_CASES = [
  {
    title: "Client & agency reports",
    body: "Prove the retainer is working with concrete ranking movement.",
    examples: ["Keyword Wins", "SEO Health Snapshot"],
  },
  {
    title: "Founder & investor updates",
    body: "Drop a sharp momentum graphic into a weekly or quarterly note.",
    examples: ["Traffic Growth"],
  },
  {
    title: "Content & editorial audits",
    body: "Decide what to refresh, cut, or double down on next.",
    examples: ["Top Pages", "Content Performance"],
  },
];

export const faq: FaqItem[] = [
  {
    q: "Are these real companies’ numbers?",
    a: "No. Every example is generated from realistic mock GSC data, with fictional site names, so you can see how each template reads without anyone’s private analytics being shown. Your own version renders from your numbers the same way.",
  },
  {
    q: "What makes an SEO infographic effective?",
    a: "The best ones answer a single question, lead with a plain-language headline, show movement rather than a bare total, and only include numbers that drive a decision. The examples above each follow those principles.",
  },
  {
    q: "Can I recreate any of these for my own site?",
    a: "Yes — each example is just one of the five templates with a different headline, brand color, and data. Open the dashboard, pick the matching template, and swap in your own metrics.",
  },
  {
    q: "How many templates are there?",
    a: "Five: Traffic Growth, Top Pages, Keyword Wins, Content Performance, and SEO Health Snapshot. The six examples here reuse those five — Traffic Growth appears twice to show one template telling two different stories.",
  },
];

export default function SeoInfographicExamples() {
  return (
    <>
      {/* Intro */}
      <section className="container-page py-12 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <Eyebrow>SEO infographic examples</Eyebrow>
            <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">SEO infographic examples</h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Six real-feel examples generated from mock GSC data — different brands, different stories, the same
              template engine. Each one is annotated with the story it tells and why it works, so you can see the
              thinking, not just the picture.
            </p>
          </div>
          <a
            href="/dashboard/"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Build your own <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Annotated gallery */}
      <section className="container-page pb-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {examples.map((e, i) => {
            const meta = TEMPLATES.find((t) => t.id === e.template)!;
            return (
              <figure key={i} className="flex flex-col">
                <InfographicPreview config={{ ...defaultConfig, ...e }} />
                <figcaption className="mt-4">
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent-foreground">
                    {meta.name}
                  </span>
                  <p className="mt-2 text-sm font-semibold">{e.story}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-medium text-foreground">Why it works: </span>
                    {e.why}
                  </p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      {/* Principles */}
      <section className="border-y border-border bg-surface">
        <div className="container-page py-16">
          <div className="max-w-2xl">
            <Eyebrow>What makes a good one</Eyebrow>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Five principles behind every example above.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.label} className="rounded-xl border border-border bg-background p-5">
                <div className="font-semibold">{p.label}</div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="container-page py-16">
        <div className="max-w-2xl">
          <Eyebrow>Which example fits your moment</Eyebrow>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Grouped by why you’re reporting.</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {USE_CASES.map((u) => (
            <div key={u.title} className="rounded-xl border border-border p-5">
              <div className="font-semibold">{u.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{u.body}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {u.examples.map((ex) => (
                  <span
                    key={ex}
                    className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Faq items={faq} />

      <RelatedPages
        links={[
          {
            href: "/seo-infographics/",
            title: "All five templates",
            blurb: "What each template reads and the question it answers.",
          },
          {
            href: "/seo-report-infographic/",
            title: "SEO report infographic",
            blurb: "Package an example into a monthly report clients open.",
          },
          {
            href: "/gsc-infographic-report/",
            title: "GSC infographic report",
            blurb: "The Search Console metrics behind every example.",
          },
        ]}
      />

      <CtaBand title="Found one that fits? Build your own in minutes." cta="Build your own" href="/dashboard/" />
    </>
  );
}
