import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";

export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess({
        typescript: true,
      }),
    }),
  ],
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "MildUISvelte",
      fileName: "index",
    },
    rollupOptions: {
      external: ["svelte", "@mild-ui/core"],
      output: {
        globals: {
          svelte: "Svelte",
          "@mild-ui/core": "MildUICore",
        },
      },
    },
  },
});
