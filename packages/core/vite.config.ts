// packages/core/vite.config.ts
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MildUICore",
      fileName: "index", // This will generate index.js
      formats: ["es", "cjs"], // Support both ES modules and CommonJS
    },
    rollupOptions: {
      external: ["clsx", "class-variance-authority", "tailwind-merge"],
    },
  },
  plugins: [dts()],
});