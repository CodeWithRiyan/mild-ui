// Lints the published shape of every public package: publint, attw, and the tarball contents.
// Run after building the packages: `pnpm --filter "./packages/*" build && pnpm check:packages`.
import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// attw options per package: core ships CSS only, react is dual ESM/CJS.
const packages = {
  core: ["--profile", "node16"],
  react: ["--exclude-entrypoints", "styles", "styles.css"],
};

const requiredEntries = ["package/LICENSE", "package/README.md", "package/package.json"];
const forbiddenEntry = /(\.(test|spec|stories)\.[cm]?[jt]sx?$)|(\/__tests__\/)/;

const run = (command, args, cwd) =>
  execFileSync(command, args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] });

let failures = 0;
const fail = (message) => {
  failures++;
  console.error(`  ✖ ${message}`);
};

for (const [name, attwArgs] of Object.entries(packages)) {
  const dir = join(root, "packages", name);
  console.log(`\n@mild-ui/${name}`);

  try {
    run("pnpm", ["exec", "publint", "--strict"], dir);
    console.log("  ✔ publint");
  } catch {
    fail("publint reported problems (see above)");
  }

  try {
    run("pnpm", ["exec", "attw", "--pack", ".", "--format", "table-flipped", ...attwArgs], dir);
    console.log("  ✔ attw");
  } catch (error) {
    console.error(error.stdout);
    fail("attw reported problems");
  }

  const destination = mkdtempSync(join(tmpdir(), `mild-ui-${name}-`));
  try {
    run("pnpm", ["pack", "--pack-destination", destination], dir);
    const tarball = join(destination, readdirSync(destination)[0]);
    const entries = run("tar", ["-tzf", tarball], dir).split("\n").filter(Boolean);

    console.log(`  tarball contents (${entries.length} files):`);
    for (const entry of entries) console.log(`    ${entry}`);

    for (const required of requiredEntries) {
      if (!entries.includes(required)) fail(`tarball is missing ${required}`);
    }
    if (!entries.some((entry) => entry.startsWith("package/dist/"))) {
      fail("tarball has no dist/ files");
    }
    for (const entry of entries.filter((entry) => forbiddenEntry.test(entry))) {
      fail(`tarball contains a test or story file: ${entry}`);
    }
  } finally {
    rmSync(destination, { recursive: true, force: true });
  }
}

if (failures > 0) {
  console.error(`\ncheck-packages: ${failures} problem(s) found.`);
  process.exit(1);
}
console.log("\ncheck-packages: all packages passed.");
