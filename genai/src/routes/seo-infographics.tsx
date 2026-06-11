import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/Shell";
import { InfographicPreview, defaultConfig } from "@/components/site/InfographicPreview";
import { TEMPLATES } from "@/lib/mockData";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/seo-infographics")({
  head: () => ({
    meta: [
      { title: "SEO Infographics — WhizGraphs" },
      { name: "description", content: "Five SEO infographic templates built from Google Search Console-style data. Pick one, brand it, share it." },
      { property: "og:title", content: "SEO Infographics — WhizGraphs" },
      { property: "og:description", content: "Templates for traffic growth, top pages, keyword wins, content performance, and SEO health snapshots." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <section className="container-page py-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">SEO Infographics</h1>
          <p className="mt-3 text-muted-foreground">
            Five focused templates, each tuned to a question your stakeholders actually ask. Built for Search Console
            data — no chart-wrangling required.
          </p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {TEMPLATES.map((t) => (
            <div key={t.id} className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent-foreground">
                    {t.tag}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold">{t.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
                </div>
                <Link
                  to="/dashboard"
                  className="inline-flex h-9 items-center gap-1 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Use template <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="mt-4">
                <InfographicPreview config={{ ...defaultConfig, template: t.id }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
