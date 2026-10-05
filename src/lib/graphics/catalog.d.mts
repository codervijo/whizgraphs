// Types for catalog.mjs (plain JS so the Node asset generator can import it).
import type { GraphicMeta } from "../schema";

export interface CatalogGraphic extends GraphicMeta {
  render: () => string;
}
export interface ExampleMeta {
  id: string;
  kind: string;
  audience: string;
  story: string;
  why: string;
  site: string;
  headline: string;
  period: string;
}
export interface DownloadSpec {
  pdf: { file: string; pages: string[]; orientation: "portrait" | "landscape" };
  csv: { file: string; render: () => string };
  extraCsv?: { file: string; render: () => string };
}
export const GRAPHICS: Record<string, CatalogGraphic>;
export const EXAMPLES: ExampleMeta[];
export const DOWNLOADS: Record<string, DownloadSpec>;
export const CORE_IDS: string[];
export const CORE_TEMPLATE_IDS: Record<string, string>;
