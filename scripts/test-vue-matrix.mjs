#!/usr/bin/env node
// scripts/test-vue-matrix.mjs
//
// Runs the vue test suite against the committed Vue version and the latest published one.
//
//   node scripts/test-vue-matrix.mjs            # current, then latest
//   node scripts/test-vue-matrix.mjs latest     # only vue@latest
//   node scripts/test-vue-matrix.mjs current    # only the committed version (plain install)
//   node scripts/test-vue-matrix.mjs 3.4        # any other version or range
//
// For every leg but "current" it temporarily rewrites the `vue` dependency of packages/vue and
// apps/playground-vue, installs it and runs typecheck + tests. The original manifest and the lockfile are restored
// on exit, also on failure/Ctrl-C.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, copyFileSync, existsSync, unlinkSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Projects whose Vue version is swapped. */
const PROJECTS = ["packages/vue", "apps/playground-vue"];

/** Commands run for each matrix leg. */
const CHECKS = [
  ["--filter", "@mild-ui/vue", "typecheck"],
  ["--filter", "@mild-ui/vue", "test"],
  ["--filter", "@mild-ui/playground-vue", "typecheck"],
  ["--filter", "@mild-ui/playground-vue", "test"],
];

const requested = process.argv[2] ?? "all";
const legs = requested === "all" ? ["current", "latest"] : [requested];

const manifests = PROJECTS.map((project) => join(root, project, "package.json"));
const originals = new Map(manifests.map((file) => [file, readFileSync(file, "utf8")]));
const lockfile = join(root, "pnpm-lock.yaml");
const lockBackup = join(root, "pnpm-lock.yaml.matrix-backup");
if (existsSync(lockfile)) copyFileSync(lockfile, lockBackup);

function run(args, env = {}) {
  console.log(`\n$ pnpm ${args.join(" ")}`);
  execFileSync("pnpm", args, { cwd: root, stdio: "inherit", env: { ...process.env, ...env } });
}

/**
 * Vue 3.3 and 3.4 need @vue/test-utils 2.4.6: later releases call `app.onUnmount`, a Vue 3.5
 * API. Pinned exactly, and also as a workspace override so @testing-library/vue (which depends
 * on @vue/test-utils itself) resolves the same copy.
 */
function testUtilsFor(version) {
  return /^[~^]?3\.[34](\.|$)/.test(version) ? "2.4.6" : null;
}

const workspaceFile = join(root, "pnpm-workspace.yaml");
const workspaceOriginal = readFileSync(workspaceFile, "utf8");

function applyWorkspaceOverride(name, version) {
  const line = `  "${name}": "${version}"\n`;
  const updated = /^overrides:\s*$/m.test(workspaceOriginal)
    ? workspaceOriginal.replace(/^overrides:\s*\n/m, (match) => match + line)
    : `${workspaceOriginal}\noverrides:\n${line}`;
  writeFileSync(workspaceFile, updated);
}

function applyVersion(version) {
  const testUtils = testUtilsFor(version);
  for (const file of manifests) {
    const pkg = JSON.parse(originals.get(file));
    for (const field of ["dependencies", "devDependencies"]) {
      if (pkg[field]?.vue) pkg[field].vue = version;
      if (testUtils && pkg[field]?.["@vue/test-utils"]) pkg[field]["@vue/test-utils"] = testUtils;
    }
    writeFileSync(file, `${JSON.stringify(pkg, null, 2)}\n`);
  }
  if (testUtils) applyWorkspaceOverride("@vue/test-utils", testUtils);
}

/** The Vue version actually installed for packages/vue, so the suite can assert it. */
function installedVersion() {
  const file = join(root, "packages/vue/node_modules/vue/package.json");
  return JSON.parse(readFileSync(file, "utf8")).version;
}

function restore() {
  for (const [file, contents] of originals) writeFileSync(file, contents);
  writeFileSync(workspaceFile, workspaceOriginal);
  if (existsSync(lockBackup)) {
    copyFileSync(lockBackup, lockfile);
    unlinkSync(lockBackup);
  }
}

let restored = false;
function restoreOnce() {
  if (restored) return;
  restored = true;
  restore();
}
process.on("SIGINT", () => {
  restoreOnce();
  process.exit(130);
});

const results = [];
try {
  for (const leg of legs) {
    console.log(`\n==================== Vue ${leg} ====================`);
    if (leg === "current") {
      run(["install", "--frozen-lockfile"]);
    } else {
      applyVersion(leg);
      run(["install", "--no-frozen-lockfile", ...PROJECTS.flatMap((p) => ["--filter", `./${p}`])]);
    }
    const version = installedVersion();
    console.log(`\nvue@${version}`);
    // MILD_VUE_VERSION lets the suite assert it really runs on this version.
    for (const check of CHECKS) run(check, { MILD_VUE_VERSION: version });
    results.push(`Vue ${leg} (${version}): green`);
  }
} finally {
  restoreOnce();
  // Put node_modules back on the committed versions.
  execFileSync("pnpm", ["install", "--no-frozen-lockfile", "--silent"], {
    cwd: root,
    stdio: "inherit",
  });
}

console.log(`\nVue matrix summary:\n  ${results.join("\n  ")}`);
