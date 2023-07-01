import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import image from "@astrojs/image";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    output: "static",
    adapter: node({
        mode: "standalone",
    }),
    integrations: [
        react(),
        image({
            serviceEntryPoint: "@astrojs/image/sharp",
        }),
    ],
    experiments: {
        redirects: true,
    },
    site: "https://akaruidevelopment.github.io",
    base: "/Zeneth"
});