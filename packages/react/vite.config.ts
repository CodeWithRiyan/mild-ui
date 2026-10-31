// packages/react/vite.config.ts
import { readFileSync, writeFileSync } from "fs";
/// <reference types="vitest" />
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
      // Without the `paths` override in tsconfig.json, so the emitted types import
      // @mild-ui/primitives (built first: pnpm orders workspace builds by dependency).
      tsconfigPath: "tsconfig.build.json",
      exclude: ["**/*.test.ts", "**/*.test.tsx", "**/*.stories.tsx"],
      // The rolled-up file is named after the last lib output (dist/index.d.cts). Publish one
      // declaration file per module format so ESM and CJS consumers both resolve types.
      afterBuild: () => {
        writeFileSync("dist/index.d.mts", readFileSync("dist/index.d.cts"));
      },
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MildUIReact",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: (id) => externalPackages.some((name) => id === name || id.startsWith(`${name}/`)),
      // One output file per source module (dist/components/Box/Box.mjs, ...) instead of one
      // bundle: with `sideEffects` limited to the stylesheets in package.json, a consumer's
      // bundler then keeps only the components it imports. `pnpm size` guards this.
      output: (["es", "cjs"] as const).map((format) => ({
        format,
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: format === "es" ? "[name].mjs" : "[name].cjs",
        exports: "named" as const,
        globals: { react: "React", "react-dom": "ReactDOM" },
        // Every module is a React Server Components boundary: the directive makes the exports
        // Client Components for Next.js (App Router) and friends. Server Components can still
        // render them; the markup is server-rendered and hydrated.
        banner: '"use client";',
      })),
    },
    sourcemap: true,
    minify: "esbuild",
    target: "ES2020",
  },
  esbuild: {
    target: "ES2020",
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    // Type-level tests (`expectTypeOf`) live in *.test-d.tsx and are checked with tsc.
    typecheck: {
      enabled: true,
      include: ["src/**/*.test-d.{ts,tsx}"],
      tsconfig: "./tsconfig.json",
    },
    coverage: {
      provider: "v8",
      // Per-package coverage: only this package's sources count here; the shared
      // @mild-ui/test-cases package reports its own coverage from its own run.
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.test.{ts,tsx}", "src/**/*.stories.tsx", "src/test-setup.ts"],
      reportsDirectory: "./coverage",
      reporter: ["text", "html", "lcov"],
    },
    alias: [
      // Tests run before any build, so resolve the primitives from source (see tsconfig paths).
      {
        find: /^@mild-ui\/primitives\/(.*)$/,
        replacement: resolve(__dirname, "../primitives/src/$1.ts"),
      },
    ],
  },
});
