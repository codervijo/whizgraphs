// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://whizgraphs.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // Stamp every URL with a build-time lastmod. For a site that has struggled
      // to get crawled, a fresh lastmod is a signal to Google to (re)schedule a
      // crawl; a bare <loc> gives it nothing to prioritize on.
      serialize(item) {
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
    react(),
  ],
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
