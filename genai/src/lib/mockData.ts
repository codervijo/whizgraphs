export type ReportTemplate =
  | "traffic-growth"
  | "top-pages"
  | "keyword-wins"
  | "content-performance"
  | "seo-health";

export interface TemplateMeta {
  id: ReportTemplate;
  name: string;
  description: string;
  tag: string;
}

export const TEMPLATES: TemplateMeta[] = [
  { id: "traffic-growth", name: "Traffic Growth", description: "Monthly clicks & impressions trend", tag: "Trend" },
  { id: "top-pages", name: "Top Pages", description: "Best performing URLs by clicks", tag: "Pages" },
  { id: "keyword-wins", name: "Keyword Wins", description: "Biggest position gains this period", tag: "Keywords" },
  { id: "content-performance", name: "Content Performance", description: "CTR vs. position by article", tag: "Content" },
  { id: "seo-health", name: "SEO Health Snapshot", description: "One-glance state of search visibility", tag: "Snapshot" },
];

export interface TrafficPoint { label: string; clicks: number; impressions: number }
export interface PageRow { url: string; clicks: number; impressions: number; ctr: number; position: number }
export interface KeywordWin { query: string; before: number; after: number; clicks: number }
export interface ContentRow { title: string; ctr: number; position: number; clicks: number }

export const trafficSeries: TrafficPoint[] = [
  { label: "Jan", clicks: 1820, impressions: 42100 },
  { label: "Feb", clicks: 2110, impressions: 47800 },
  { label: "Mar", clicks: 2480, impressions: 53200 },
  { label: "Apr", clicks: 2950, impressions: 61500 },
  { label: "May", clicks: 3620, impressions: 70800 },
  { label: "Jun", clicks: 4310, impressions: 81400 },
  { label: "Jul", clicks: 5180, impressions: 94300 },
  { label: "Aug", clicks: 6240, impressions: 108900 },
];

export const topPages: PageRow[] = [
  { url: "/blog/seo-checklist-2025", clicks: 1842, impressions: 24310, ctr: 7.6, position: 4.2 },
  { url: "/blog/google-search-console-guide", clicks: 1456, impressions: 19820, ctr: 7.3, position: 5.1 },
  { url: "/blog/keyword-research-tools", clicks: 1120, impressions: 17640, ctr: 6.3, position: 6.8 },
  { url: "/blog/technical-seo-audit", clicks: 962, impressions: 15330, ctr: 6.3, position: 7.2 },
  { url: "/blog/link-building-2025", clicks: 781, impressions: 12480, ctr: 6.2, position: 8.0 },
];

export const keywordWins: KeywordWin[] = [
  { query: "seo infographic generator", before: 38, after: 6, clicks: 412 },
  { query: "gsc report template", before: 24, after: 4, clicks: 388 },
  { query: "monthly seo report", before: 19, after: 3, clicks: 502 },
  { query: "client seo dashboard", before: 31, after: 9, clicks: 221 },
  { query: "search console infographic", before: 47, after: 7, clicks: 174 },
];

export const contentRows: ContentRow[] = [
  { title: "SEO Checklist 2025", ctr: 7.6, position: 4.2, clicks: 1842 },
  { title: "GSC Guide", ctr: 7.3, position: 5.1, clicks: 1456 },
  { title: "Keyword Research Tools", ctr: 6.3, position: 6.8, clicks: 1120 },
  { title: "Technical SEO Audit", ctr: 6.3, position: 7.2, clicks: 962 },
  { title: "Link Building 2025", ctr: 6.2, position: 8.0, clicks: 781 },
  { title: "Schema Markup", ctr: 5.1, position: 9.4, clicks: 540 },
];

export const healthSnapshot = {
  totalClicks: 24380,
  totalImpressions: 528400,
  avgCtr: 4.6,
  avgPosition: 11.2,
  indexed: 312,
  crawlErrors: 4,
  coreWebVitals: "Good",
  topCountry: "United States",
};
