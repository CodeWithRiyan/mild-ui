// Checks every text-on-background and UI-element-on-background color pair in each theme file
// (src/semantics/{light,dark,high-contrast}.json) against the WCAG 2.x contrast minimums.
//
// Run with: pnpm test (-> tsx scripts/check-contrast.ts), or: pnpm tsx scripts/check-contrast.ts
//
// Exits non-zero if any pair fails its required minimum, so this can run in CI.
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const semanticsDir = join(root, "src/semantics");
const primitivesDir = join(root, "src/primitives");

// -------------------------------------------------------------------------------------------
// WCAG 2.x contrast math (https://www.w3.org/TR/WCAG21/#contrast-minimum)
// -------------------------------------------------------------------------------------------

function hexToRgb(hex: string): [number, number, number] {
  const match = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) throw new Error(`Expected a 6-digit hex color, got ${JSON.stringify(hex)}`);
  const n = Number.parseInt(match[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const linear = (channel: number) => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const [lr, lg, lb] = [linear(r), linear(g), linear(b)];
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

/** WCAG contrast ratio between two colors, from 1 (no contrast) to 21 (black on white). */
function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(hexToRgb(a));
  const lb = relativeLuminance(hexToRgb(b));
  const [lighter, darker] = la > lb ? [la, lb] : [lb, la];
  return (lighter + 0.05) / (darker + 0.05);
}

// -------------------------------------------------------------------------------------------
// Token loading: flatten each JSON file to "dot.path" -> $value, then resolve "{dot.path}" refs
// against every loaded file (a theme's tokens reference primitives and the semantic color roles).
// -------------------------------------------------------------------------------------------

type TokenMap = Map<string, unknown>;

function flatten(node: unknown, path: string[], out: TokenMap, file: string): void {
  if (node && typeof node === "object" && "$value" in (node as Record<string, unknown>)) {
    const key = path.join(".");
    if (out.has(key)) throw new Error(`Duplicate token "${key}" (from ${file})`);
    out.set(key, (node as { $value: unknown }).$value);
    return;
  }
  for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
    if (key.startsWith("$")) continue;
    flatten(value, [...path, key], out, file);
  }
}

/** Flattens every *.json file in a directory into one map. Only safe where files can't collide
 * (e.g. src/primitives/, where each file owns a distinct top-level group). */
function loadTokenDir(dir: string): TokenMap {
  const out: TokenMap = new Map();
  for (const file of readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()) {
    flatten(JSON.parse(readFileSync(join(dir, file), "utf8")), [], out, `${dir}/${file}`);
  }
  return out;
}

/** Flattens a single *.json file into a map. */
function loadTokenFile(path: string): TokenMap {
  const out: TokenMap = new Map();
  flatten(JSON.parse(readFileSync(path, "utf8")), [], out, path);
  return out;
}

function resolveValue(value: unknown, tokens: TokenMap, seen: string[] = []): string {
  if (typeof value !== "string") {
    throw new Error(`Expected a string color value, got ${JSON.stringify(value)}`);
  }
  const ref = /^\{([^}]+)\}$/.exec(value.trim());
  if (!ref) return value;
  const [, path] = ref;
  if (seen.includes(path)) throw new Error(`Reference cycle: ${[...seen, path].join(" -> ")}`);
  if (!tokens.has(path))
    throw new Error(`Dangling reference "{${path}}" (from ${seen.at(-1) ?? "theme"})`);
  return resolveValue(tokens.get(path), tokens, [...seen, path]);
}

// -------------------------------------------------------------------------------------------
// The pairs to check. Every semantic theme file (light/dark/high-contrast) defines the same
// roles, so one list applies to all of them. "text" pairs are checked against WCAG AA for normal
// text (1.4.3, 4.5:1); "ui" pairs are checked against the non-text contrast minimum for UI
// component boundaries and focus indicators (1.4.11, 3:1).
// -------------------------------------------------------------------------------------------

interface Pair {
  name: string;
  foreground: string;
  background: string;
  kind: "text" | "ui";
}

const PAIRS: Pair[] = [
  {
    name: "foreground/background",
    foreground: "foreground",
    background: "background",
    kind: "text",
  },
  {
    name: "muted-foreground/background",
    foreground: "muted-foreground",
    background: "background",
    kind: "text",
  },
  {
    name: "muted-foreground/muted",
    foreground: "muted-foreground",
    background: "muted",
    kind: "text",
  },
  { name: "card-foreground/card", foreground: "card-foreground", background: "card", kind: "text" },
  {
    name: "popover-foreground/popover",
    foreground: "popover-foreground",
    background: "popover",
    kind: "text",
  },
  {
    name: "accent-foreground/accent",
    foreground: "accent-foreground",
    background: "accent",
    kind: "text",
  },
  {
    name: "destructive-foreground/destructive",
    foreground: "destructive-foreground",
    background: "destructive",
    kind: "text",
  },
  { name: "border/background", foreground: "border", background: "background", kind: "ui" },
  { name: "input/background", foreground: "input", background: "background", kind: "ui" },
  { name: "ring/background", foreground: "ring", background: "background", kind: "ui" },
];

const THRESHOLD: Record<Pair["kind"], number> = { text: 4.5, ui: 3 };
const AAA_TEXT_THRESHOLD = 7;

// -------------------------------------------------------------------------------------------

interface Result {
  theme: string;
  pair: string;
  kind: Pair["kind"];
  ratio: number;
  required: number;
  pass: boolean;
  aaa: boolean;
}

function checkTheme(file: string): Result[] {
  const primitives = loadTokenDir(primitivesDir);
  const semanticColors = loadTokenFile(join(semanticsDir, "colors.json"));
  const themeTokens = loadTokenFile(join(semanticsDir, file));
  // A theme's own keys resolve first (e.g. "ring"); any "{color...}" reference falls through to
  // the primitives and to the semantic color roles (primary, secondary, ...) in colors.json.
  const lookup: TokenMap = new Map([...primitives, ...semanticColors, ...themeTokens]);

  return PAIRS.map(({ name, foreground, background, kind }) => {
    if (!themeTokens.has(foreground)) throw new Error(`${file}: missing token "${foreground}"`);
    if (!themeTokens.has(background)) throw new Error(`${file}: missing token "${background}"`);
    const fg = resolveValue(themeTokens.get(foreground), lookup);
    const bg = resolveValue(themeTokens.get(background), lookup);
    const ratio = contrastRatio(fg, bg);
    const required = THRESHOLD[kind];
    return {
      theme: file,
      pair: name,
      kind,
      ratio,
      required,
      pass: ratio >= required,
      aaa: kind === "text" && ratio >= AAA_TEXT_THRESHOLD,
    };
  });
}

/** A "theme" file is any src/semantics/*.json that defines every role PAIRS needs (background,
 * foreground, border, ...). This is how light/dark/high-contrast.json are told apart from
 * colors.json and animation.json, without hardcoding their names. */
function isThemeFile(file: string): boolean {
  const tokens = loadTokenFile(join(semanticsDir, file));
  const roles = new Set(PAIRS.flatMap((p) => [p.foreground, p.background]));
  return [...roles].every((role) => tokens.has(role));
}

function main(): void {
  const themeFiles = readdirSync(semanticsDir)
    .filter((f) => f.endsWith(".json") && isThemeFile(f))
    .sort();

  const results = themeFiles.flatMap(checkTheme);

  for (const file of themeFiles) {
    console.log(`\n${file}`);
    for (const r of results.filter((r) => r.theme === file)) {
      const status = r.pass ? "✔" : "✘";
      const level = r.kind === "text" ? (r.aaa ? "AAA" : "AA") : "UI 3:1";
      console.log(
        `  ${status} ${r.pair.padEnd(36)} ${r.ratio.toFixed(2)}:1` +
          ` (needs ${r.required}:1, ${level}${r.kind === "text" && !r.aaa ? ", not AAA" : ""})`,
      );
    }
  }

  const failures = results.filter((r) => !r.pass);
  console.log(
    `\n${results.length} pairs checked across ${themeFiles.length} themes, ${failures.length} failing.`,
  );
  if (failures.length > 0) {
    console.error("\ncheck-contrast: failing pairs:");
    for (const f of failures) {
      console.error(`  - ${f.theme} ${f.pair}: ${f.ratio.toFixed(2)}:1 < ${f.required}:1 required`);
    }
    process.exit(1);
  }
}

main();
