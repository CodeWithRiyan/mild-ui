// @vitest-environment node
// esbuild needs a real Node environment: jsdom's TextEncoder does not produce a true Uint8Array,
// which esbuild asserts on startup. This file inspects bundles, so it needs no DOM anyway.
/**
 * Guards the promise in the README: importing one primitive pulls in no other.
 *
 * This is not a source-level grep for imports; esbuild bundles each entry for real and reports
 * the module graph it walked (`metafile.inputs`). If checkbox.ts ever imported listbox.ts, or a
 * shared helper module appeared, the input list would grow and these tests would fail.
 */
import { readdirSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { describe, expect, it } from "vitest";

const srcDir = resolve(dirname(fileURLToPath(import.meta.url)));
const packageDir = resolve(srcDir, "..");

const primitives = readdirSync(srcDir)
  .filter((file) => file.endsWith(".ts") && !file.endsWith(".test.ts"))
  .sort();

/** Bundles one entry and returns every source file esbuild had to pull in. */
async function bundleInputs(entry: string): Promise<string[]> {
  const result = await build({
    entryPoints: [join(srcDir, entry)],
    bundle: true,
    write: false,
    format: "esm",
    platform: "neutral",
    metafile: true,
    logLevel: "silent",
  });
  return Object.keys(result.metafile.inputs)
    .map((input) => relative(packageDir, resolve(packageDir, input)))
    .sort();
}

describe("primitive isolation", () => {
  it("ships the eleven documented primitives", () => {
    expect(primitives).toEqual([
      "accordion.ts",
      "checkbox.ts",
      "dialog.ts",
      "field.ts",
      "listbox.ts",
      "radio-group.ts",
      "switch.ts",
      "tabs.ts",
      "toast.ts",
      "toggle-group.ts",
      "tooltip.ts",
    ]);
  });

  it.each(primitives)("%s bundles to exactly one module", async (entry) => {
    const inputs = await bundleInputs(entry);

    expect(inputs).toEqual([join("src", entry)]);
  });

  it.each(primitives)("%s has no imports at all", async (entry) => {
    const result = await build({
      entryPoints: [join(srcDir, entry)],
      bundle: false,
      write: false,
      format: "esm",
      platform: "neutral",
      logLevel: "silent",
    });
    const code = result.outputFiles[0].text;

    expect(code).not.toMatch(/^\s*import\s/m);
    expect(code).not.toMatch(/\brequire\s*\(/);
  });
});
