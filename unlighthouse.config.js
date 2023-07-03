/// <reference types="unlighthouse" />
const { defineConfig } = require("unlighthouse");

module.exports = defineConfig({
    // example
    site: "https://akaruidevelopment.github.io/Zeneth",
    scanner: {
        sitemap: ["/Zeneth/sitemap-index.xml", "/Zeneth/sitemap-0.xml"],
    },
    debug: true,
});
