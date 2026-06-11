import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/seo-infographics", changefreq: "weekly", priority: "0.9" },
          { path: "/gsc-infographic-report", changefreq: "monthly", priority: "0.8" },
          { path: "/seo-report-infographic", changefreq: "monthly", priority: "0.8" },
          { path: "/seo-infographic-examples", changefreq: "weekly", priority: "0.8" },
          { path: "/pricing", changefreq: "monthly", priority: "0.7" },
          { path: "/dashboard", changefreq: "monthly", priority: "0.5" },
        ];
        const urls = entries.map(
          (e) =>
            `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
