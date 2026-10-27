// packages/react/vite.config.ts
import { readFileSync, rmSync, writeFileSync } from "fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import pkg from "./package.json";

const externalPackages = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];

export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      insertTypesEntry: false,
      outDir: "dist",
      exclude: ["**/*.test.ts", "**/*.test.tsx", "**/*.stories.tsx"],
      // The rolled-up file is named after the last lib output (index.cjs). Publish one
      // declaration file per module format so ESM and CJS consumers both resolve types.
      afterBuild: () => {
        const types = readFileSync("dist/index.d.cts.d.ts");
        writeFileSync("dist/index.d.mts", types);
        writeFileSync("dist/index.d.cts", types);
        rmSync("dist/index.d.cts.d.ts");
      },
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MildUIReact",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.mjs" : "index.cjs"),
    },
    rollupOptions: {
      external: (id) => externalPackages.some((name) => id === name || id.startsWith(`${name}/`)),
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        exports: "named",
      },
    },
    sourcemap: true,
    minify: "esbuild",
    target: "ES2020",
  },
  esbuild: {
    target: "ES2020",
  },
});
