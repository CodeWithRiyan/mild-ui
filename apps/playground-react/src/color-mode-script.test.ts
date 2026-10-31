// apps/playground-react/src/color-mode-script.test.ts
// The inline anti-flicker script in index.html must be exactly what @mild-ui/react generates.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getColorModeScript } from "@mild-ui/react";
import { describe, expect, it } from "vitest";

describe("index.html color mode script", () => {
  it("matches getColorModeScript()", () => {
    const html = readFileSync(resolve(__dirname, "../index.html"), "utf8");
    const match = html.match(/<script data-mild-color-mode-script>\s*([\s\S]*?)\s*<\/script>/);
    expect(match?.[1]).toBe(getColorModeScript());
  });
});
