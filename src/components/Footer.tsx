import { BarChart3 } from "lucide-react";

const GROUPS = [
  {
    title: "Infographics",
    links: [
      { href: "/seo-infographics/", label: "SEO infographics" },
      { href: "/seo-infographic-examples/", label: "SEO infographic examples" },
      { href: "/gsc-infographic-report/", label: "GSC infographic report" },
    ],
  },
  {
    title: "Templates",
    links: [
      { href: "/seo-report-template/", label: "SEO report template" },
      { href: "/monthly-seo-report-template/", label: "Monthly SEO report template" },
      { href: "/seo-reporting-template/", label: "SEO reporting template" },
      { href: "/seo-dashboard-template/", label: "SEO dashboard template" },
    ],
  },
  {
    title: "Product",
    links: [
      { href: "/dashboard/", label: "Open the app" },
      { href: "/pricing/", label: "Pricing" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page grid gap-8 py-10 text-sm text-muted-foreground md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-primary text-primary-foreground">
              <BarChart3 className="h-3.5 w-3.5" />
            </span>
            <span className="font-medium text-foreground">WhizGraphs</span>
          </div>
          <p className="mt-3 max-w-xs">Search Console data, turned into reports people actually read.</p>
          <p className="mt-3">© {new Date().getFullYear()} WhizGraphs</p>
        </div>
        {GROUPS.map((g) => (
          <div key={g.title}>
            <div className="font-semibold text-foreground">{g.title}</div>
            <ul className="mt-3 space-y-2">
              {g.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
