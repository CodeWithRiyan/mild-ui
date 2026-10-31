// apps/playground-vue/src/vue-version.test.ts
// Guard for the Vue version matrix: makes sure a matrix leg really runs on the Vue version it
// claims to (see scripts/test-vue-matrix.mjs, which sets MILD_VUE_VERSION). Outside the matrix
// it just pins the supported range.
import { version } from "vue";
import { describe, expect, it } from "vitest";

describe("Vue runtime", () => {
  it("runs on a supported Vue 3 release", () => {
    const [major, minor] = version.split(".").map(Number);
    expect(major).toBe(3);
    expect(minor).toBeGreaterThanOrEqual(3);
  });

  it("matches the version requested by the matrix", () => {
    const requested = process.env.MILD_VUE_VERSION;
    if (!requested) return; // plain `pnpm test` run
    expect(version).toBe(requested);
  });
});
