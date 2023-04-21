import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const pwaOption: Partial<VitePWAOptions> = {
  injectRegister: "auto",
  workbox: {
    globIgnores: ["**/template.xlsx"],
    clientsClaim: true,
    skipWaiting: true,
    globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
    swDest: "./public/sw.js",

    runtimeCaching: [
      {
        //https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css
        urlPattern:
          /^https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/.*/,
        handler: "CacheFirst",
        options: {
          cacheName: "cloudflare",
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        //https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css
        urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap*/,
        handler: "CacheFirst",
        options: {
          cacheName: "bootstrap",
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        //https://cdn.syncfusion.com/ej2/material.css
        urlPattern: /^https:\/\/cdn\.syncfusion\.com\/ej2\/material*/,
        handler: "CacheFirst",
        options: {
          cacheName: "syncfusion",
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  devOptions: {
    enabled: true,
  },
  manifest: {
    name: "FANCY TODOS",
    short_name: "TODO",
    display: "fullscreen",
    start_url: "./",
    description: "A FANCY TODO APP",
    theme_color: "#3f51b5",
    icons: [
      {
        src: "android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    orientation: "portrait-primary",
  },
};
export default defineConfig({
  root: "app",
  server: {
    port: 8080,
    strictPort: true,
    host: "127.0.0.1",
    proxy: {
      "/api": "http://127.0.0.1:7071",
    },
  },
  build: {
    outDir: "../dist",
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    react({
      fastRefresh: true,
    }),
    ,
    mkcert(),
    VitePWA(pwaOption),
  ],
});
