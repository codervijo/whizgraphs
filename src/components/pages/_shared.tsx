// src/components/pages/_shared.tsx
// Presentational-only building blocks shared by the SEO content pages.
// All copy is passed in by the page, so each page stays textually unique —
// these components only own markup/layout, never wording.
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-wider text-primary">{children}</div>
  );
}

export interface FaqItem {
  q: string;
  a: string;
}

export function Faq({
  items,
  heading = "Frequently asked questions",
}: {
  items: FaqItem[];
  heading?: string;
}) {
  return (
    <section className="border-t border-border">
      <div className="container-page py-16">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((f) => (
            <div key={f.q} className="rounded-xl border border-border p-5">
              <div className="font-semibold">{f.q}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export interface RelatedLink {
  href: string;
  title: string;
  blurb: string;
}

export function RelatedPages({
  links,
  heading = "Keep exploring",
}: {
  links: RelatedLink[];
  heading?: string;
}) {
  return (
    <section className="border-t border-border bg-surface">
      <div className="container-page py-16">
        <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group rounded-xl border border-border bg-background p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{l.title}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{l.blurb}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({
  title,
  cta = "Create your first SEO infographic",
  href = "/dashboard/",
}: {
  title: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="border-t border-border">
      <div className="container-page py-16 text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
        <a
          href={href}
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {cta} <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
