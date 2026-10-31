// apps/playground-react/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// The playground runs against the package sources (same approach as storybook),
// so it never needs a build of @mild-ui/react or @mild-ui/primitives first.
export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@mild-ui\/react$/, replacement: resolve(__dirname, "../../packages/react/src") },
      {
        find: /^@mild-ui\/primitives\/(.*)$/,
        replacement: resolve(__dirname, "../../packages/primitives/src/$1.ts"),
      },
      { find: /^@mild-ui\/core$/, replacement: resolve(__dirname, "../../packages/core/src") },
    ],
  },
  server: {
    port: 5180,
  },
});
