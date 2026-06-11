import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/Shell";
import { InfographicPreview, defaultConfig } from "@/components/site/InfographicPreview";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/seo-report-infographic")({
  head: () => ({
    meta: [
      { title: "SEO Report Infographic — WhizGraphs" },
      { name: "description", content: "Replace your monthly SEO PDF with a single shareable infographic. Visual, branded, and built from real search data." },
      { property: "og:title", content: "SEO Report Infographic — WhizGraphs" },
      { property: "og:description", content: "One-page SEO reports for clients, founders, and teams." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <section className="container-page py-12">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">Monthly SEO report</div>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            The SEO report your clients will actually open.
          </h1>
          <p className="mt-4 text-muted-foreground">
            A 12-page PDF is a graveyard. A one-page infographic is a Slack message. WhizGraphs gives you a visual
            snapshot of the month — wins, trends, and gaps — without the busywork.
          </p>
          <Link
            to="/dashboard"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Generate a monthly report <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <InfographicPreview config={{ ...defaultConfig, template: "seo-health", headline: "August at a glance." }} />
          <InfographicPreview config={{ ...defaultConfig, template: "keyword-wins", headline: "Five queries broke into page 1." }} />
        </div>
      </section>
    </PageShell>
  );
}
