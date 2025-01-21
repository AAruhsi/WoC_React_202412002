import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://emkc.org", // Proxy API requests
    },
  },
  plugins: [react()],
});
