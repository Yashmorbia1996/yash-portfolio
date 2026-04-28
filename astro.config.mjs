// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: replace with your real domain on deploy. Drives sitemap, canonical URLs, and Open Graph URLs.
  // Also update `src/config/site.ts` `url` and `public/robots.txt` Sitemap line.
  site: 'https://your-portfolio.example.com',
  output: 'static',
  /** Static builds emit HTML meta refresh for these. Helps common slug typos and old bookmarks. */
  redirects: {
    '/projects/btech': '/projects/btech-final-project',
    '/projects/b-tech-final-project': '/projects/btech-final-project',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), mdx(), sitemap()],
});
