import { InfographicPreview, defaultConfig } from "../InfographicPreview";
import { ArrowRight, Check } from "lucide-react";

export default function GscInfographicReport() {
  return (
    <section className="container-page grid gap-10 py-12 md:grid-cols-2 md:items-center">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-primary">GSC report</div>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          Your Search Console data, as a report people actually read.
        </h1>
        <p className="mt-4 text-muted-foreground">
          WhizGraphs reads GSC-style metrics — clicks, impressions, CTR, position — and lays them out as a single
          polished infographic. No design pass, no slide deck.
        </p>
        <ul className="mt-6 space-y-2 text-sm">
          {[
            "Clicks & impressions trend with month-over-month deltas",
            "Top URLs ranked by traffic contribution",
            "Average CTR and position with plain-language context",
            "Brand color, logo, and headline — fully editable",
          ].map((b) => (
            <li key={b} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />{b}</li>
          ))}
        </ul>
        <a
          href="/dashboard"
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Build a GSC report <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <div>
        <InfographicPreview config={{ ...defaultConfig, template: "traffic-growth", headline: "Search traffic is up 3.4× this year." }} />
      </div>
    </section>
  );
}
