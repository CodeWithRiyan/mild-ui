// packages/vue/vite.config.ts
/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import pkg from "./package.json";

const externalPackages = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];

export default defineConfig({
  plugins: [
    vue(),
    dts({
      rollupTypes: true,
      // Without the `paths` override in tsconfig.json, so the emitted types import
      // @mild-ui/primitives (built first: pnpm orders workspace builds by dependency).
      tsconfigPath: "tsconfig.build.json",
      exclude: ["**/*.test.ts", "src/test-utils/**"],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: (id) => externalPackages.some((name) => id === name || id.startsWith(`${name}/`)),
      // One output file per source module (dist/components/Box/Box.vue.js, ...) instead of one
      // bundle: with `sideEffects: false` in package.json, a consumer's bundler then keeps only
      // the components it imports. `pnpm size:vue` guards this.
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
        exports: "named",
      },
    },
    sourcemap: true,
    minify: "esbuild",
    target: "ES2020",
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      // Per-package coverage: only this package's sources count here; the shared
      // @mild-ui/test-cases package reports its own coverage from its own run.
      include: ["src/**/*.{ts,vue}"],
      // Types carry no runtime code; the rest is measured per file.
      exclude: ["src/**/*.test.ts", "src/test-setup.ts", "src/test-utils/**", "src/types/**"],
      reportsDirectory: "./coverage",
      reporter: ["text", "html", "lcov", "json-summary"],
      thresholds: {
        // Per file, not package-wide, so one well-tested component can't hide a thin one.
        perFile: true,
        lines: 90,
        branches: 90,
        functions: 90,
        statements: 90,
      },
    },
    alias: [
      // Tests run before any build, so resolve the primitives from source (see tsconfig paths).
      {
        find: /^@mild-ui\/primitives\/(.*)$/,
        replacement: resolve(__dirname, "../primitives/src/$1.ts"),
      },
      // Tests compose components with inline `template` strings, which need the runtime compiler.
      { find: /^vue$/, replacement: "vue/dist/vue.esm-bundler.js" },
    ],
  },
});
