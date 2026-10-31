#!/usr/bin/env node
// scripts/check-storybook-parity.mjs
//
// The React and Vue Storybooks document the same components: every `X.stories.*` file in one
// must exist in the other, with the same `title`. The only allowed differences are listed in
// ONLY_IN below (components that exist in one framework only).
//
//   pnpm check:storybooks
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Stories that legitimately exist in one Storybook only. */
const ONLY_IN = {
  react: new Set([]),
  vue: new Set([]),
};

/** `Name -> title` for every `Name.stories.ts(x)`; a `Name/` folder counts as `Name` too. */
function stories(framework) {
  const dir = join(root, "storybook", framework, "src", "stories");
  const result = new Map();
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = entry.isDirectory() ? join(entry.name, `${entry.name}.stories.tsx`) : entry.name;
    const match = entry.isDirectory()
      ? [null, entry.name]
      : file.match(/^([A-Za-z]+)\.stories\.tsx?$/);
    if (!match) continue;
    let source;
    try {
      source = readFileSync(join(dir, file), "utf8");
    } catch {
      source = readFileSync(join(dir, file.replace(/x$/, "")), "utf8");
    }
    const title = source.match(/^\s*title:\s*["']([^"']+)["']/m)?.[1] ?? "(no title)";
    result.set(match[1], title);
  }
  return result;
}

const react = stories("react");
const vue = stories("vue");
const problems = [];

for (const [name, title] of react) {
  if (ONLY_IN.react.has(name)) continue;
  if (!vue.has(name)) problems.push(`${name}: in storybook/react but not in storybook/vue`);
  else if (vue.get(name) !== title)
    problems.push(`${name}: title differs (react "${title}", vue "${vue.get(name)}")`);
}
for (const name of vue.keys()) {
  if (ONLY_IN.vue.has(name)) continue;
  if (!react.has(name)) problems.push(`${name}: in storybook/vue but not in storybook/react`);
}
for (const [framework, names] of Object.entries(ONLY_IN)) {
  const present = framework === "react" ? react : vue;
  for (const name of names) {
    if (!present.has(name)) problems.push(`${name}: listed as ${framework}-only but has no story`);
  }
}

if (problems.length > 0) {
  console.error("check-storybook-parity: the two Storybooks differ:\n  " + problems.join("\n  "));
  process.exit(1);
}
console.log(
  `check-storybook-parity: ${react.size} React and ${vue.size} Vue stories document the same components.`,
);
