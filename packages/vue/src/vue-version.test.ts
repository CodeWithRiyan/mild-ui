// packages/vue/src/vue-version.test.ts
// Guard for the Vue version matrix: makes sure a matrix leg really runs on the Vue version it
// claims to (see scripts/test-vue-matrix.mjs, which sets MILD_VUE_VERSION). Outside the matrix
// it just pins the supported range.
import { version } from "vue";
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SUPPORTED_MAJOR = "3";
/** Lowest minor the package supports (`peerDependencies.vue` in package.json). */
const MIN_MINOR = 3;

const [major, minor] = version.split(".");

describe("Vue runtime", () => {
  it("runs on a supported Vue version", () => {
    expect(major).toBe(SUPPORTED_MAJOR);
    expect(Number(minor)).toBeGreaterThanOrEqual(MIN_MINOR);
  });

  it("matches the peer dependency range declared by the package", () => {
    const manifest = resolve(dirname(fileURLToPath(import.meta.url)), "../package.json");
    const { peerDependencies } = JSON.parse(readFileSync(manifest, "utf8"));
    expect(peerDependencies.vue).toBe(`^${SUPPORTED_MAJOR}.${MIN_MINOR}.0`);
  });

  it("matches the version requested by the matrix", () => {
    const requested = process.env.MILD_VUE_VERSION;
    if (!requested) return; // plain `pnpm test` run
    // "latest" is resolved by the matrix script to the version it installed.
    expect(version).toBe(requested);
  });
});
