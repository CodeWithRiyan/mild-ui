#!/usr/bin/env node
// scripts/size-budget.mjs
//
// Per-component size budget for @mild-ui/react and @mild-ui/vue (and their stylesheets).
//
// For every public component it bundles `import { X } from "@mild-ui/<package>"` from the
// *built* package with esbuild (tree-shaken, minified, the framework external, the primitives
// inlined like a consumer's bundler would), gzips the result and compares it with the budget in
// size-budget.json (React) or size-budget.vue.json (Vue). The full bundle and the compiled CSS
// have budgets too.
//
//   pnpm size                    # React: check (exit 1 when a budget is exceeded)
//   pnpm size --update           # React: rewrite the budgets from the current sizes (+15% headroom)
//   pnpm size:vue                # Vue: check
//   pnpm size:vue --update       # Vue: rewrite the budgets
//   node scripts/size-budget.mjs --package vue --compare   # Vue next to the React budgets
//
// Run after `pnpm --filter "./packages/*" build`.
import { build } from "esbuild";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const update = args.includes("--update");
const compare = args.includes("--compare");
const packageArg = args[args.indexOf("--package") + 1];
const target = args.includes("--package") ? packageArg : "react";
const HEADROOM = 1.15;

/** What differs between the two packages: entry, stylesheet, externals, budget file. */
const TARGETS = {
  react: {
    name: "@mild-ui/react",
    dir: join(root, "packages", "react"),
    entry: join(root, "packages", "react", "dist", "index.mjs"),
    css: join(root, "packages", "react", "dist", "mild-ui-react.css"),
    external: ["react", "react-dom", "react/jsx-runtime", "react-dom/client", "react-dom/server"],
    budgetFile: join(root, "size-budget.json"),
  },
  vue: {
    name: "@mild-ui/vue",
    dir: join(root, "packages", "vue"),
    entry: join(root, "packages", "vue", "dist", "index.js"),
    // The Vue package ships no stylesheet of its own; consumers import the core one.
    css: join(root, "packages", "core", "dist", "mild-ui.css"),
    external: ["vue", "vue/server-renderer"],
    budgetFile: join(root, "size-budget.vue.json"),
  },
};

const config = TARGETS[target];
if (!config) {
  console.error(`size-budget: unknown --package "${target}" (expected react or vue).`);
  process.exit(1);
}

if (!existsSync(config.entry) || !existsSync(config.css)) {
  console.error('size-budget: build the packages first (pnpm --filter "./packages/*" build).');
  process.exit(1);
}

const budgets = JSON.parse(readFileSync(config.budgetFile, "utf8"));
const kb = (bytes) => `${(bytes / 1024).toFixed(2)} KB`;

/** Gzipped size of a tree-shaken bundle that imports only `names` from the package. */
async function bundleSize(names) {
  const code = `export { ${names.join(", ")} } from ${JSON.stringify(config.entry)};`;
  const result = await build({
    stdin: { contents: code, resolveDir: config.dir, loader: "js" },
    bundle: true,
    minify: true,
    treeShaking: true,
    format: "esm",
    platform: "browser",
    target: "es2020",
    external: config.external,
    write: false,
    logLevel: "silent",
  });
  const output = result.outputFiles[0].contents;
  return { raw: output.byteLength, gzip: gzipSync(output).byteLength };
}

const library = await import(config.entry);
const componentNames = Object.keys(budgets.components).sort();
// Every component must have a budget, and every budget must name a real export.
const exported = Object.keys(library).filter(
  (name) => /^[A-Z]/.test(name) && typeof library[name] !== "string",
);
const missingBudget = exported.filter((name) => !(name in budgets.components));
const missingExport = componentNames.filter((name) => !(name in library));

// `--compare` shows the other package's budget for the same export next to ours.
const otherTarget = target === "react" ? TARGETS.vue : TARGETS.react;
const otherBudgets =
  compare && existsSync(otherTarget.budgetFile)
    ? JSON.parse(readFileSync(otherTarget.budgetFile, "utf8"))
    : null;

const results = [];
let failures = 0;
for (const name of componentNames) {
  if (!(name in library)) continue;
  const size = await bundleSize([name]);
  const budget = budgets.components[name];
  const over = size.gzip > budget;
  if (over) failures++;
  if (update) budgets.components[name] = Math.ceil((size.gzip * HEADROOM) / 50) * 50;
  results.push({ name, ...size, budget, over, other: otherBudgets?.components[name] });
}
const full = await bundleSize(exported);
const cssBytes = readFileSync(config.css);
const cssSize = { raw: cssBytes.byteLength, gzip: gzipSync(cssBytes).byteLength };

const otherLabel = otherBudgets ? `${otherTarget.name.replace("@mild-ui/", "")} budget` : null;
const rows = results.map((r) => [
  r.over ? "✖" : "✔",
  r.name,
  kb(r.raw),
  kb(r.gzip),
  kb(r.budget),
  ...(otherBudgets ? [r.other === undefined ? "-" : kb(r.other)] : []),
]);
rows.push(
  [
    full.gzip > budgets.full ? "✖" : "✔",
    "(everything)",
    kb(full.raw),
    kb(full.gzip),
    kb(budgets.full),
    ...(otherBudgets ? [kb(otherBudgets.full)] : []),
  ],
  [
    cssSize.gzip > budgets.css ? "✖" : "✔",
    "(css)",
    kb(cssSize.raw),
    kb(cssSize.gzip),
    kb(budgets.css),
    ...(otherBudgets ? [kb(otherBudgets.css)] : []),
  ],
);
if (full.gzip > budgets.full) failures++;
if (cssSize.gzip > budgets.css) failures++;
if (update) {
  budgets.full = Math.ceil((full.gzip * HEADROOM) / 1024) * 1024;
  budgets.css = Math.ceil((cssSize.gzip * HEADROOM) / 1024) * 1024;
}

const widths = [1, 24, 12, 12, 14, 14];
const line = (cells) => cells.map((cell, i) => String(cell).padEnd(widths[i])).join("  ");
console.log(`${config.name}\n`);
console.log(
  line(["", "export", "minified", "gzip", "budget (gzip)", ...(otherLabel ? [otherLabel] : [])]),
);
for (const row of rows) console.log(line(row));

for (const name of missingBudget) {
  failures++;
  console.error(`✖ ${name} is exported but has no budget in ${config.budgetFile}`);
}
for (const name of missingExport) {
  failures++;
  console.error(`✖ ${config.budgetFile} names ${name}, which ${config.name} does not export`);
}

if (update) {
  for (const name of missingBudget) {
    const size = await bundleSize([name]);
    budgets.components[name] = Math.ceil((size.gzip * HEADROOM) / 50) * 50;
  }
  for (const name of missingExport) delete budgets.components[name];
  budgets.components = Object.fromEntries(Object.entries(budgets.components).sort());
  writeFileSync(config.budgetFile, `${JSON.stringify(budgets, null, 2)}\n`);
  console.log(`\nsize-budget: budgets written to ${config.budgetFile} (${HEADROOM}x headroom).`);
  process.exit(0);
}

if (failures > 0) {
  console.error(
    `\nsize-budget: ${failures} problem(s). Shrink the code, or raise the budget on purpose with pnpm size:update${target === "vue" ? ":vue" : ""}.`,
  );
  process.exit(1);
}
console.log(
  `\nsize-budget: ${results.length} components, the full bundle and the CSS are within budget.`,
);
