// apps/playground-vue/vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// The playground runs against the package sources (same approach as storybook),
// so it never needs a build of @mild-ui/vue or @mild-ui/primitives first.
export default defineConfig({
  base: "./",
  plugins: [vue()],
  resolve: {
    alias: [
      { find: /^@mild-ui\/vue$/, replacement: resolve(__dirname, "../../packages/vue/src") },
      {
        find: /^@mild-ui\/primitives\/(.*)$/,
        replacement: resolve(__dirname, "../../packages/primitives/src/$1.ts"),
      },
      { find: /^@mild-ui\/core$/, replacement: resolve(__dirname, "../../packages/core/src") },
    ],
  },
  server: {
    port: 5181,
  },
});
