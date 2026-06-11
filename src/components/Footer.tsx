import { BarChart3 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page flex flex-col gap-3 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-primary text-primary-foreground">
            <BarChart3 className="h-3.5 w-3.5" />
          </span>
          <span className="font-medium text-foreground">WhizGraphs</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex flex-wrap gap-4">
          <a href="/seo-infographics" className="hover:text-foreground">SEO Infographics</a>
          <a href="/seo-infographic-examples" className="hover:text-foreground">Examples</a>
          <a href="/pricing" className="hover:text-foreground">Pricing</a>
          <a href="/dashboard" className="hover:text-foreground">App</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
