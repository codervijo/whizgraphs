import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/Shell";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — WhizGraphs" },
      { name: "description", content: "Simple SEO infographic pricing. Free to start, $12/mo Solo, $39/mo Agency." },
      { property: "og:title", content: "Pricing — WhizGraphs" },
      { property: "og:description", content: "Free, Solo $12/mo, Agency $39/mo. Pick the plan that matches how many SEO reports you ship." },
    ],
  }),
  component: Page,
});

const plans = [
  { name: "Free", price: "$0", desc: "Try every template with mock data", features: ["3 infographics / month", "All 5 templates", "Mock GSC data", "WhizGraphs watermark"], cta: "Start free" },
  { name: "Solo", price: "$12", desc: "For founders, consultants, and indie SEOs", features: ["Unlimited infographics", "Brand color + logo", "PNG export", "Custom date ranges", "1 connected site"], cta: "Choose Solo", featured: true },
  { name: "Agency", price: "$39", desc: "For small teams running client SEO", features: ["Everything in Solo", "Multi-site brand kits", "PDF + PNG export", "Client-ready templates", "Up to 25 connected sites"], cta: "Choose Agency" },
];

function Page() {
  return (
    <PageShell>
      <section className="container-page py-12 md:py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Pricing that scales with your reports.</h1>
          <p className="mt-3 text-muted-foreground">Cancel anytime. No credit card to start.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col rounded-2xl border p-6 ${p.featured ? "border-primary bg-accent/40 ring-1 ring-primary" : "border-border bg-background"}`}
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold">{p.name}</div>
                {p.featured && <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">Most popular</span>}
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">{p.price}</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <ul className="mt-5 flex-1 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />{f}</li>
                ))}
              </ul>
              <Link
                to="/dashboard"
                className={`mt-6 inline-flex h-10 items-center justify-center rounded-md text-sm font-medium ${p.featured ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border hover:bg-muted"}`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Live Google Search Console sync is rolling out gradually. MVP runs on realistic mock GSC data.
        </p>
      </section>
    </PageShell>
  );
}
