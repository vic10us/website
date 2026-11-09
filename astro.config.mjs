import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://vic10.us",
  server: { host: true, port: 4321 },
  vite: { server: { allowedHosts: true } },
});
