import { GRAPHICS, CORE_TEMPLATE_IDS } from "../../lib/graphics/catalog.mjs";
import { TEMPLATES, type ReportTemplate } from "../../lib/mockData";
import { ArrowRight, BarChart3, ImageIcon, Check, X } from "lucide-react";
import { Eyebrow, Faq, RelatedPages, CtaBand, SectionHead, Graphic, EmbedSnippet, Steps, type FaqItem } from "./_shared";

export const PATH = "/seo-infographics/";
export const HERO = GRAPHICS["seo-infographic-traffic-growth"];

interface TemplateGuide {
  id: ReportTemplate;
  reads: string;
  answers: string;
  bestFor: string;
}

const GUIDE: TemplateGuide[] = [
  {
    id: "traffic-growth",
    reads: "Monthly clicks and impressions over your date range, plotted as a trend with three headline tiles and their change.",
    answers: "“Is search traffic actually growing, and how fast?”",
    bestFor: "Founder and investor updates, and any recurring report where the story is momentum.",
  },
  {
    id: "top-pages",
    reads: "Your best URLs ranked by clicks, plus the share of all clicks they earn and each page’s CTR and position.",
    answers: "“Which handful of pages is carrying the whole site?”",
    bestFor: "Content audits and deciding where the next refresh or internal links should go.",
  },
  {
    id: "keyword-wins",
    reads: "Queries whose average position improved, drawn as before → after tracks with the clicks each now earns.",
    answers: "“What broke onto page one since last month?”",
    bestFor: "Proving a retainer is working — ranking movement a client can see in seconds.",
  },
  {
    id: "content-performance",
    reads: "Every article plotted by CTR against average position, bubble size scaled to clicks, with the site’s average CTR as a reference line.",
    answers: "“Which posts under-perform the rank they already hold?”",
    bestFor: "Editorial planning — finding well-ranked, under-clicked pages that need a better title, not more links.",
  },
  {
    id: "seo-health",
    reads: "Six totals in a grid — clicks, impressions, CTR, position, indexed pages, errors — each with its change, plus a one-line verdict.",
    answers: "“What’s the one-glance state of our search visibility?”",
    bestFor: "Quarterly reviews and exec summaries where nobody wants a chart, just the number and whether it’s OK.",
  },
];

const IMAGE_SEO = [
  { do: true, t: "Publish it as a real image file", b: "An <img> with a src Google can fetch. Charts drawn only in JavaScript, CSS backgrounds, or canvas are invisible to image search." },
  { do: true, t: "Give it a descriptive file name", b: "seo-infographic-keyword-wins.png tells a crawler more than IMG_0042.png before it reads a single pixel." },
  { do: true, t: "Write alt text that states the finding", b: "Not “chart” — “Keyword wins for August: five queries moved onto page one”. Alt text is read by screen readers and search engines alike." },
  { do: true, t: "Put the key numbers in the page text too", b: "Search engines can’t reliably read text inside an image. Repeat the headline and the important figures in HTML next to it." },
  { do: true, t: "Set width and height, and compress", b: "Explicit dimensions prevent layout shift; a lean file keeps the page fast. SVG for the page, PNG for sharing works well." },
  { do: true, t: "Offer an embed snippet with a credit link", b: "If others republish your graphic, a ready-made snippet makes the attribution link the default rather than an afterthought." },
  { do: false, t: "Don’t bury the only copy in a PDF or a carousel", b: "Images inside PDFs and lazy carousels are often never discovered. Give each important graphic its own crawlable spot on a page." },
  { do: false, t: "Don’t publish someone else’s numbers without a source", b: "Original data is what earns links; recycled statistics without attribution earn neither trust nor citations." },
];

const MISTAKES = [
  { t: "Six charts on one image", b: "An infographic is not a dashboard screenshot. If it needs a legend for the legend, split it." },
  { t: "A metric label as the headline", b: "“Clicks by month” describes the chart. “Clicks tripled since January” tells the story." },
  { t: "Totals with no comparison", b: "18,420 clicks means nothing alone. Versus last month, or the same month last year, it means something." },
  { t: "Average position without context", b: "Position is an average across every impression, so a page-one jump on a long-tail query can move it more than a real win. Show which queries moved." },
  { t: "No date range or source", b: "Forwarded images lose their email. The period and “Source: Google Search Console” should be on the image itself." },
];

export const faq: FaqItem[] = [
  {
    q: "What is an SEO infographic?",
    a: "The term is used two ways. Most often it means a single image that summarises a site’s search performance — clicks, impressions, rankings, top pages — so a non-specialist can understand it at a glance. It is also used for infographics published as SEO content, to earn links and image-search traffic. WhizGraphs makes the first kind; the image-SEO section on this page covers the second.",
  },
  {
    q: "Are infographics still good for SEO?",
    a: "They can be, when they carry something original — your own data, a clear framework — and are published so search engines can index them: a real image file, descriptive alt text, and the key facts repeated in the page text. Generic infographics that restate common statistics rarely earn links any more.",
  },
  {
    q: "Which SEO infographic template should I start with?",
    a: "For a monthly update, Traffic Growth. To prove progress to a client, Keyword Wins. To decide what to work on next, Top Pages and Content Performance. For an exec summary, the SEO Health Snapshot.",
  },
  {
    q: "How is an SEO infographic different from a dashboard?",
    a: "A dashboard is for exploring: many widgets, filters and tabs, checked by the person doing the work. An infographic is for communicating one finding to someone who won’t open the dashboard. See the SEO dashboard template page for the exploration side.",
  },
  {
    q: "Can I use these images?",
    a: "Yes — every graphic on this page is free to embed with a credit link back to WhizGraphs. The numbers shown are sample data for fictional sites, so use them to illustrate the format, not as benchmarks.",
  },
  {
    q: "Do I need to connect Google Search Console?",
    a: "Not today. The WhizGraphs app runs on realistic mock Search Console data so you can build any template immediately. Live Search Console sync is rolling out gradually.",
  },
];

export default function SeoInfographics() {
  const anatomy = GRAPHICS["seo-infographic-anatomy"];
  return (
    <>
      {/* Hero */}
      <section className="container-page grid gap-10 py-12 md:grid-cols-[1.1fr_1fr] md:items-center md:py-16">
        <div>
          <Eyebrow>SEO infographics</Eyebrow>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            SEO infographics: turn search data into one clear image
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            An SEO infographic compresses a month of Search Console data — traffic, rankings, top pages — into a single
            graphic anyone can read in seconds. Below: five free templates, what makes one work, and how to publish
            infographics so they help your own SEO.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/dashboard/"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Make an SEO infographic <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/seo-infographic-examples/"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-background px-5 text-sm font-medium hover:bg-muted"
            >
              Browse 10 examples
            </a>
          </div>
          <nav aria-label="On this page" className="mt-8 text-sm">
            <div className="font-semibold">On this page</div>
            <ul className="mt-2 grid gap-1 text-muted-foreground sm:grid-cols-2">
              {[
                ["#two-kinds", "Two kinds of SEO infographic"],
                ["#templates", "The five templates"],
                ["#anatomy", "Anatomy of a good one"],
                ["#how-to", "How to make one from GSC data"],
                ["#infographics-for-seo", "Infographics for SEO: image SEO"],
                ["#mistakes", "Mistakes to avoid"],
              ].map(([h, l]) => (
                <li key={h}>
                  <a href={h} className="hover:text-foreground hover:underline">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Graphic g={HERO} eager caption="Traffic Growth template — sample data for a fictional site." />
      </section>

      {/* Two meanings */}
      <section id="two-kinds" className="scroll-mt-20 border-y border-border bg-surface">
        <div className="container-page py-16">
          <SectionHead eyebrow="Search intent, untangled" title="Two kinds of SEO infographic">
            <p>People mean two different things by “SEO infographic”. Knowing which you need saves a lot of wasted design time.</p>
          </SectionHead>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-6">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h3 className="mt-3 text-xl font-semibold">Reporting infographics</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A visual summary of <em>your</em> search performance, built from Google Search Console: is traffic
                growing, which pages carry the site, which keywords moved. Sent to clients, managers, investors or your
                own team instead of a spreadsheet.
              </p>
              <a href="#templates" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                See the five templates <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <ImageIcon className="h-5 w-5 text-primary" />
              <h3 className="mt-3 text-xl font-semibold">Infographics as SEO content</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A graphic you publish so other sites link to it and image search sends visitors — the classic “infographics
                for SEO” tactic. It only works when the graphic says something original and is published in a way
                crawlers can index.
              </p>
              <a href="#infographics-for-seo" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                Jump to the image-SEO checklist <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="container-page scroll-mt-20 py-16">
        <SectionHead eyebrow="The five templates" title="One SEO infographic template per question you get asked">
          <p>
            Each image below is a finished template rendered from sample Search Console data. Click any one for the
            full-size PNG.
          </p>
        </SectionHead>
        <div className="mt-12 space-y-16">
          {GUIDE.map((t, i) => {
            const meta = TEMPLATES.find((m) => m.id === t.id)!;
            const g = GRAPHICS[CORE_TEMPLATE_IDS[t.id]];
            return (
              <article
                key={t.id}
                id={t.id}
                className={`grid scroll-mt-20 gap-8 md:grid-cols-2 md:items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div>
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent-foreground">
                    {meta.tag}
                  </span>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight">{meta.name} infographic</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="font-semibold">What it reads</dt>
                      <dd className="mt-0.5 text-muted-foreground">{t.reads}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">The question it answers</dt>
                      <dd className="mt-0.5 text-muted-foreground">{t.answers}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Best for</dt>
                      <dd className="mt-0.5 text-muted-foreground">{t.bestFor}</dd>
                    </div>
                  </dl>
                  <a
                    href="/dashboard/"
                    className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Use the {meta.name} template <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
                <Graphic g={g} className="mx-auto w-full max-w-md" download />
              </article>
            );
          })}
        </div>
      </section>

      {/* Anatomy */}
      <section id="anatomy" className="scroll-mt-20 border-y border-border bg-surface">
        <div className="container-page py-16">
          <SectionHead eyebrow="Anatomy" title="The six parts of a good SEO infographic">
            <p>
              Every template above follows the same skeleton. If you design your own in Canva, Figma or slides, keep
              these six parts and you’ll rarely go wrong.
            </p>
          </SectionHead>
          <Graphic g={anatomy} className="mt-8" />
        </div>
      </section>

      {/* How to */}
      <section id="how-to" className="container-page scroll-mt-20 py-16">
        <SectionHead eyebrow="How to" title="How to make an SEO infographic from Search Console data">
          <p>The same process works whether you use WhizGraphs, a design tool, or a spreadsheet chart.</p>
        </SectionHead>
        <Steps
          items={[
            {
              title: "Start from the question, not the data",
              body: "Write down what your reader wants to know — “is it working?”, “what should we fix?” — and pick the one template that answers it.",
            },
            {
              title: "Pull the numbers from the Performance report",
              body: (
                <>
                  In Search Console, open Performance → Search results, set the date range (and a comparison period), then
                  export the Dates, Queries or Pages tab. The{" "}
                  <a href="/gsc-infographic-report/" className="text-primary hover:underline">GSC infographic report guide</a>{" "}
                  shows which tab feeds which template.
                </>
              ),
            },
            {
              title: "Compute the change, not just the total",
              body: "Percent change for clicks and impressions, percentage points for CTR, places gained for position. The delta is the story.",
            },
            {
              title: "Write the headline last",
              body: "Once you can see the chart, say what it means in one plain sentence. That sentence goes at the top, largest.",
            },
            {
              title: "Brand it and add the period and source",
              body: "Logo, brand color, date range, “Source: Google Search Console”. The image must make sense when forwarded without context.",
            },
            {
              title: "Export once, share everywhere",
              body: "A PNG for Slack, email and decks; the same image at the top of a fuller report if one is needed.",
            },
          ]}
        />
      </section>

      {/* Image SEO */}
      <section id="infographics-for-seo" className="scroll-mt-20 border-y border-border bg-surface">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHead eyebrow="Infographics for SEO" title="Publishing infographics that get indexed and linked">
              <p>
                If you publish infographics to earn links or image-search traffic, how you publish matters as much as the
                design. This checklist is exactly what this page does with its own graphics.
              </p>
            </SectionHead>
            <ul className="mt-8 space-y-3">
              {IMAGE_SEO.map((r) => (
                <li key={r.t} className="flex gap-3 rounded-xl border border-border bg-background p-4">
                  {r.do ? <Check className="mt-0.5 h-5 w-5 flex-none text-success" /> : <X className="mt-0.5 h-5 w-5 flex-none text-destructive" />}
                  <div>
                    <div className="font-semibold">{r.t}</div>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{r.b}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 lg:pt-28">
            <EmbedSnippet g={HERO} pagePath={PATH} />
            <p className="text-sm text-muted-foreground">
              Every WhizGraphs graphic is free to embed with this snippet. The credit link is the whole trade.
            </p>
          </div>
        </div>
      </section>

      {/* Mistakes */}
      <section id="mistakes" className="container-page scroll-mt-20 py-16">
        <SectionHead eyebrow="Avoid these" title="Five mistakes that make SEO infographics unreadable" />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MISTAKES.map((m) => (
            <div key={m.t} className="rounded-xl border border-border p-5">
              <div className="font-semibold">{m.t}</div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.b}</p>
            </div>
          ))}
        </div>
      </section>

      <Faq items={faq} />

      <RelatedPages
        links={[
          { href: "/seo-infographic-examples/", title: "SEO infographic examples", blurb: "Ten annotated examples across five audiences, free to download." },
          { href: "/seo-report-template/", title: "SEO report template", blurb: "When one image isn’t enough: a one-page report with PDF and sheet." },
          { href: "/gsc-infographic-report/", title: "GSC infographic report", blurb: "Which Search Console export feeds which infographic." },
        ]}
      />

      <CtaBand title="Pick a template and make your first SEO infographic today." />
    </>
  );
}
