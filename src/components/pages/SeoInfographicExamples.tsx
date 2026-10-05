import { GRAPHICS, EXAMPLES } from "../../lib/graphics/catalog.mjs";
import { ArrowRight, Download } from "lucide-react";
import { Eyebrow, Faq, RelatedPages, CtaBand, SectionHead, Steps, type FaqItem } from "./_shared";

export const PATH = "/seo-infographic-examples/";
export const HERO = GRAPHICS[EXAMPLES[0].id];

const KINDS = Array.from(new Set(EXAMPLES.map((e) => e.kind)));
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const PRINCIPLES = [
  { label: "One question per image", body: "Every example answers a single question. If you’re tempted to add a second chart, that’s a second infographic." },
  { label: "The headline is the finding", body: "“Four queries reached page one” — not “Keyword rankings”. A reader who stops at the headline still gets the point." },
  { label: "Every number has a comparison", body: "Versus last month, versus January, versus the site average. A bare total can’t tell anyone whether things are good." },
  { label: "Context is on the image", body: "Site, period, and a “sample data” or source line travel with the image when it’s forwarded out of the original email." },
  { label: "Honest about the misses", body: "The keyword example shows the query that didn’t make page one; the quarterly example flags the CTR dip. Credibility is the point of a report." },
  { label: "It ends in a decision", body: "The CTR example says “rewrite five titles”. The best infographics make the next action obvious." },
];

const MOMENTS = [
  { title: "Monthly client report", ids: ["seo-infographic-example-keyword-wins", "seo-infographic-example-recovery"], body: "Lead with ranking movement; explain any dip on the chart itself." },
  { title: "Founder or investor update", ids: ["seo-infographic-example-saas-growth", "seo-infographic-example-brand-split"], body: "Momentum, and proof it’s new audiences rather than brand searches." },
  { title: "Content planning", ids: ["seo-infographic-example-content", "seo-infographic-example-ctr", "seo-infographic-example-top-pages"], body: "Where the cheap wins are: under-clicked pages and over-concentrated traffic." },
  { title: "Quarterly exec review", ids: ["seo-infographic-example-quarterly", "seo-infographic-example-audience"], body: "Six numbers and a verdict, plus who the audience actually is." },
  { title: "Small or local business", ids: ["seo-infographic-example-local"], body: "Small numbers still tell a growth story — and set expectations about what Search Console covers." },
];

export const faq: FaqItem[] = [
  {
    q: "Are these real companies’ numbers?",
    a: "No. Every example uses sample data for a fictional site, and says so on the image. The point is to show the format and the storytelling, not to publish anyone’s analytics or suggest benchmarks.",
  },
  {
    q: "Can I download and reuse these SEO infographic examples?",
    a: "Yes. Each one links to a full-size PNG. Use them in presentations, pitches or articles about SEO reporting; if you publish one on the web, please link back to this page.",
  },
  {
    q: "What makes an SEO infographic example effective?",
    a: "It answers one question, leads with a plain-language headline that states the finding, shows every number against a comparison, carries its own context (site, period, source), and points to a decision.",
  },
  {
    q: "How do I make one of these with my own data?",
    a: "Each example is one WhizGraphs template with a different headline, brand color and data. Open the app, pick the matching template, and swap in your Search Console numbers — or rebuild the layout in your own design tool using the anatomy on the SEO infographics page.",
  },
  {
    q: "Which example should I copy for a monthly report?",
    a: "Keyword Wins or Traffic Growth with annotations. For a fuller monthly document, the monthly SEO report template puts a month-over-month table, a 13-month trend and the gains and drops on one printable page.",
  },
];

export default function SeoInfographicExamples() {
  return (
    <>
      {/* Intro */}
      <section className="container-page py-12 md:py-16">
        <div className="max-w-3xl">
          <Eyebrow>Gallery</Eyebrow>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">SEO infographic examples</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Ten SEO infographics built from Search Console-style data — growth stories, recoveries, keyword wins, CTR
            fixes, brand vs non-brand, audience mix. Each is annotated with the story it tells and why it works, and each
            is a free full-size PNG.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">All figures are sample data for fictional sites.</p>
        </div>
        <nav aria-label="Filter by type" className="mt-6 flex flex-wrap gap-2">
          {KINDS.map((k) => (
            <a
              key={k}
              href={`#${slug(k)}`}
              className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              {k} <span className="text-xs">({EXAMPLES.filter((e) => e.kind === k).length})</span>
            </a>
          ))}
        </nav>
      </section>

      {/* Gallery */}
      <section className="container-page pb-16">
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {EXAMPLES.map((e, i) => {
            const g = GRAPHICS[e.id];
            const firstOfKind = EXAMPLES.findIndex((x) => x.kind === e.kind) === i;
            return (
              <figure key={e.id} id={firstOfKind ? slug(e.kind) : e.id} className="flex scroll-mt-20 flex-col">
                <a href={g.png} className="block overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
                  <img
                    src={g.svg}
                    alt={g.alt}
                    width={g.w}
                    height={g.h}
                    loading={i < 3 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-auto w-full"
                  />
                </a>
                <figcaption className="mt-4 flex flex-1 flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent-foreground">
                      {e.kind}
                    </span>
                    <span className="text-xs text-muted-foreground">{e.audience} · {e.site} · {e.period}</span>
                  </div>
                  <h2 className="mt-2 text-lg font-semibold leading-snug">{e.headline}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{e.story}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-medium text-foreground">Why it works: </span>
                    {e.why}
                  </p>
                  <div className="mt-3 flex gap-4 text-sm">
                    <a href={g.png} download className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
                      <Download className="h-3.5 w-3.5" /> PNG
                    </a>
                    <a href="/dashboard/" className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
                      Make one like this <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      {/* Principles */}
      <section className="border-y border-border bg-surface">
        <div className="container-page py-16">
          <SectionHead eyebrow="What they have in common" title="Six things every good example above does">
            <p>
              The templates differ; the habits don’t. Use these as a checklist when you review your own SEO infographic
              before sending it.
            </p>
          </SectionHead>
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

      {/* Moments */}
      <section className="container-page py-16">
        <SectionHead eyebrow="Pick by situation" title="Which SEO infographic example fits your moment" />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MOMENTS.map((m) => (
            <div key={m.title} className="rounded-xl border border-border p-5">
              <div className="font-semibold">{m.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{m.body}</p>
              <ul className="mt-3 space-y-1.5">
                {m.ids.map((id) => {
                  const ex = EXAMPLES.find((x) => x.id === id)!;
                  return (
                    <li key={id}>
                      <a href={`#${EXAMPLES.findIndex((x) => x.kind === ex.kind) === EXAMPLES.indexOf(ex) ? slug(ex.kind) : id}`} className="text-sm text-primary hover:underline">
                        {ex.kind}: {ex.headline}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Recreate */}
      <section className="border-y border-border bg-surface">
        <div className="container-page py-16">
          <SectionHead eyebrow="Recreate any example" title="From example to your own infographic in four steps" />
          <Steps
            items={[
              { title: "Pick the example closest to your question", body: "Growth, concentration, movement, efficiency, or a snapshot." },
              {
                title: "Export the matching Search Console data",
                body: (
                  <>
                    Dates tab for trends, Queries for keyword wins and CTR, Pages for top pages. See the{" "}
                    <a href="/gsc-infographic-report/" className="text-primary hover:underline">GSC infographic report guide</a>.
                  </>
                ),
              },
              { title: "Rewrite the headline for your finding", body: "Keep the structure — number, direction, period — and make it yours." },
              { title: "Brand it, check it against the six habits, send it", body: "Logo and color, then the checklist above before it goes out." },
            ]}
          />
        </div>
      </section>

      <Faq items={faq} />

      <RelatedPages
        links={[
          { href: "/seo-infographics/", title: "SEO infographic templates", blurb: "The five core templates, their anatomy, and image-SEO tips." },
          { href: "/seo-report-template/", title: "SEO report template", blurb: "Put an example at the top of a full one-page report." },
          { href: "/monthly-seo-report-template/", title: "Monthly SEO report template", blurb: "Month-over-month and year-over-year on one printable page." },
        ]}
      />

      <CtaBand title="Found one that fits? Build your own in minutes." cta="Build your own" href="/dashboard/" />
    </>
  );
}
