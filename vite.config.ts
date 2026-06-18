import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: ["easter-commodity-fusion-editor.trycloudflare.com", ".trycloudflare.com"]
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
    allowedHosts: ["easter-commodity-fusion-editor.trycloudflare.com", ".trycloudflare.com"]
  }
});
