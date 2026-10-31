#!/usr/bin/env node
// scripts/test-react-matrix.mjs
//
// Runs the react test suites against every supported React major.
//
//   node scripts/test-react-matrix.mjs          # 18 then 19
//   node scripts/test-react-matrix.mjs 19       # only React 19
//
// It temporarily rewrites the react/react-dom (+ types) versions of the react
// workspace projects, installs them and runs typecheck + tests. The original
// manifests and the lockfile are restored on exit, also on failure/Ctrl-C.
//
// In CI you normally do the same thing with one `pnpm up` per matrix leg; this
// script keeps the matrix reproducible locally too.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, copyFileSync, existsSync, unlinkSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Projects whose React version is swapped. */
const PROJECTS = ["packages/react", "apps/playground-react"];

/** Commands run for each matrix leg. */
const CHECKS = [
  ["--filter", "@mild-ui/react", "typecheck"],
  ["--filter", "@mild-ui/react", "test"],
  ["--filter", "@mild-ui/playground-react", "typecheck"],
  ["--filter", "@mild-ui/playground-react", "test"],
];

const VERSIONS = {
  18: {
    react: "^18.3.1",
    "react-dom": "^18.3.1",
    "@types/react": "^18.3.31",
    "@types/react-dom": "^18.3.7",
  },
  19: {
    react: "^19.2.0",
    "react-dom": "^19.2.0",
    "@types/react": "^19.2.0",
    "@types/react-dom": "^19.2.0",
  },
};

const requested = process.argv[2] ?? "all";
const majors = requested === "all" ? Object.keys(VERSIONS) : [requested];
for (const major of majors) {
  if (!VERSIONS[major]) {
    console.error(
      `Unknown React major "${major}". Use one of: ${Object.keys(VERSIONS).join(", ")}, all`,
    );
    process.exit(1);
  }
}

const manifests = PROJECTS.map((project) => join(root, project, "package.json"));
const originals = new Map(manifests.map((file) => [file, readFileSync(file, "utf8")]));
const lockfile = join(root, "pnpm-lock.yaml");
const lockBackup = join(root, "pnpm-lock.yaml.matrix-backup");
if (existsSync(lockfile)) copyFileSync(lockfile, lockBackup);

function run(args, env = {}) {
  console.log(`\n$ pnpm ${args.join(" ")}`);
  execFileSync("pnpm", args, { cwd: root, stdio: "inherit", env: { ...process.env, ...env } });
}

function applyVersions(versions) {
  for (const file of manifests) {
    const pkg = JSON.parse(originals.get(file));
    for (const field of ["dependencies", "devDependencies"]) {
      const block = pkg[field];
      if (!block) continue;
      for (const [name, version] of Object.entries(versions)) {
        if (block[name]) block[name] = version;
      }
    }
    writeFileSync(file, `${JSON.stringify(pkg, null, 2)}\n`);
  }
}

function restore() {
  for (const [file, contents] of originals) writeFileSync(file, contents);
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
  for (const major of majors) {
    console.log(`\n==================== React ${major} ====================`);
    applyVersions(VERSIONS[major]);
    run(["install", "--no-frozen-lockfile", ...PROJECTS.flatMap((p) => ["--filter", `./${p}`])]);
    // MILD_REACT_MAJOR lets the suites assert they really run on this major.
    for (const check of CHECKS) run(check, { MILD_REACT_MAJOR: major });
    results.push(`React ${major}: green`);
  }
} finally {
  restoreOnce();
  // Put node_modules back on the committed versions.
  execFileSync("pnpm", ["install", "--no-frozen-lockfile", "--silent"], {
    cwd: root,
    stdio: "inherit",
  });
}

console.log(`\nReact matrix summary:\n  ${results.join("\n  ")}`);
