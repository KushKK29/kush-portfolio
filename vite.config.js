import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/kush-portfolio/", // Change this to your actual repo name
  plugins: [react()],
});

