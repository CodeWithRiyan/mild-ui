import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // jsdom gives the primitives a DOM to drive. No framework is involved: these tests never
    // import React, Vue, or a testing library.
    environment: "jsdom",
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.test.ts"],
      reporter: ["text", "json-summary"],
      thresholds: {
        // Per primitive, not repo-wide, so one well-tested file can't hide a thin one.
        perFile: true,
        lines: 90,
        branches: 90,
        functions: 90,
        statements: 90,
      },
    },
  },
});
