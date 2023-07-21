import { defineConfig } from 'astro/config';
import image from "@astrojs/image";
import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [react(), image({
    serviceEntryPoint: "@astrojs/image/sharp"
  }), sitemap()],
  experiments: {
    redirects: true
  },
  site: "https://akaruidevelopment.github.io",
  base: "/Zeneth/",
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      wrap: true
    },
    gfm: true
  },
});