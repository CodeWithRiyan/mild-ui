// packages/core/vite.config.ts
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "mild-ui-core",
      fileName: "mild-ui-core",
    },
    rollupOptions: {
      external: ["clsx", "class-variance-authority", "tailwind-merge"],
    },
  },
  plugins: [dts()],
});
