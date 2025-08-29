// client/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxying API requests to the backend server
      "/api": {
        target: "http://localhost:3001", // Your local backend server
        changeOrigin: true,
      },
    },
  },
});
