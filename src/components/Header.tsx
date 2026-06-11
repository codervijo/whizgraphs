import { useState, useEffect } from "react";
import { Menu, X, BarChart3, Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const nav = [
  { to: "/", label: "Home" },
  { to: "/seo-infographics", label: "SEO Infographics" },
  { to: "/seo-infographic-examples", label: "Examples" },
  { to: "/gsc-infographic-report", label: "GSC Report" },
  { to: "/seo-report-infographic", label: "SEO Report" },
  { to: "/pricing", label: "Pricing" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState("");
  const { resolved, toggle } = useTheme();

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="container-page flex h-14 items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground">
            <BarChart3 className="h-4 w-4" />
          </span>
          WhizGraphs
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => {
            const active = path === n.to;
            return (
              <a
                key={n.to}
                href={n.to}
                className={
                  active
                    ? "rounded-md px-3 py-1.5 text-sm text-foreground bg-muted"
                    : "rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                }
              >
                {n.label}
              </a>
            );
          })}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={toggle}
            className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Toggle theme"
          >
            {resolved === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <a
            href="/dashboard"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Open app
          </a>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="grid h-9 w-9 place-items-center rounded-md border border-border md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-page flex flex-col py-2">
            {nav.map((n) => (
              <a
                key={n.to}
                href={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
            <button
              onClick={() => {
                toggle();
                setOpen(false);
              }}
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {resolved === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              {resolved === "dark" ? "Dark mode" : "Light mode"}
            </button>
            <a
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
            >
              Open app
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
