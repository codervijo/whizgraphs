// src/lib/schema.ts — JSON-LD builders shared by the content pages.
// Pages pass the results to Layout's `jsonLd` prop.
import type { FaqItem } from "../components/pages/_shared";

export const SITE = "https://whizgraphs.com";
const abs = (p: string) => new URL(p, SITE).href;

export interface GraphicMeta {
  id: string;
  svg: string;
  png: string;
  w: number;
  h: number;
  alt: string;
  caption: string;
  name: string;
}

const ORG = { "@type": "Organization", "@id": `${SITE}/#organization`, name: "WhizGraphs", url: SITE };

export function faqLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function imageObject(g: GraphicMeta) {
  return {
    "@type": "ImageObject",
    "@id": `${abs(g.png)}#image`,
    contentUrl: abs(g.png),
    url: abs(g.png),
    name: g.name,
    caption: g.caption,
    description: g.alt,
    width: g.w,
    height: g.h,
    encodingFormat: "image/png",
    creator: ORG,
    creditText: "WhizGraphs",
    copyrightNotice: "WhizGraphs",
  };
}

// A page whose main subject is a set of graphics (gallery / infographic hub).
export function galleryLd({ path, name, description, graphics, type = "CollectionPage" }: { path: string; name: string; description: string; graphics: GraphicMeta[]; type?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description,
    isPartOf: { "@id": `${SITE}/#website` },
    publisher: ORG,
    primaryImageOfPage: { "@id": `${abs(graphics[0].png)}#image` },
    associatedMedia: graphics.map(imageObject),
  };
}

export interface DownloadMeta {
  href: string;
  label: string;
  format: string;
  mime: string;
}

// A template page: the template itself is a CreativeWork with downloadable encodings.
export function templateLd({ path, name, description, graphics, downloads }: { path: string; name: string; description: string; graphics: GraphicMeta[]; downloads: DownloadMeta[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description,
    isPartOf: { "@id": `${SITE}/#website` },
    publisher: ORG,
    primaryImageOfPage: { "@id": `${abs(graphics[0].png)}#image` },
    mainEntity: {
      "@type": "CreativeWork",
      name,
      description,
      creator: ORG,
      isAccessibleForFree: true,
      image: graphics.map(imageObject),
      encoding: downloads.map((d) => ({
        "@type": "MediaObject",
        name: d.label,
        contentUrl: abs(d.href),
        encodingFormat: d.mime,
      })),
    },
  };
}
