// Checks that every `@mild-ui/*` import shown in a README exists in the built packages.
// Run after building the packages: `pnpm --filter "./packages/*" build && pnpm verify:readme`.
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

type ExportTarget = string | { [condition: string]: ExportTarget };

interface PackageInfo {
  dir: string;
  exports: Record<string, ExportTarget>;
}

function findReadmes(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (["node_modules", "dist", "storybook-static", ".git"].includes(entry.name)) return [];
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return findReadmes(path);
    return entry.name === "README.md" ? [path] : [];
  });
}

function loadPackages(): Map<string, PackageInfo> {
  const packages = new Map<string, PackageInfo>();
  for (const name of readdirSync(join(root, "packages"))) {
    const dir = join(root, "packages", name);
    const manifestPath = join(dir, "package.json");
    if (!existsSync(manifestPath)) continue;
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    packages.set(manifest.name, { dir, exports: manifest.exports ?? {} });
  }
  return packages;
}

function resolveTarget(target: ExportTarget, conditions: string[]): string | undefined {
  if (typeof target === "string") return target;
  for (const condition of conditions) {
    if (condition in target) return resolveTarget(target[condition], conditions);
  }
  return undefined;
}

interface ReadmeImport {
  specifier: string;
  names: string[];
  typeOnly: boolean;
  /** From an install command: only the package itself has to exist. */
  installOnly?: boolean;
}

function extractImports(markdown: string): ReadmeImport[] {
  const imports: ReadmeImport[] = [];
  const named = /import\s+(type\s+)?\{([^}]*)\}\s+from\s+["'](@mild-ui\/[^"']+)["']/g;
  for (const match of markdown.matchAll(named)) {
    const names = match[2]
      .split(",")
      .map((part) => part.trim().replace(/^type\s+/, ""))
      .filter(Boolean)
      .map((part) => part.split(/\s+as\s+/)[0]);
    imports.push({ specifier: match[3], names, typeOnly: Boolean(match[1]) });
  }
  const bare = /(?:import|@import|@use)\s+["'](@mild-ui\/[^"']+)["']/g;
  for (const match of markdown.matchAll(bare)) {
    imports.push({ specifier: match[1], names: [], typeOnly: false });
  }
  const install = /(?:npm install|pnpm add|yarn add)\s+([^\n`]+)/g;
  for (const match of markdown.matchAll(install)) {
    for (const specifier of match[1].split(/\s+/)) {
      if (specifier.startsWith("@mild-ui/")) {
        imports.push({ specifier, names: [], typeOnly: false, installOnly: true });
      }
    }
  }
  return imports;
}

function splitSpecifier(specifier: string): { name: string; subpath: string } {
  const [scope, pkg, ...rest] = specifier.split("/");
  return { name: `${scope}/${pkg}`, subpath: rest.length ? `./${rest.join("/")}` : "." };
}

function declaredTypeNames(typesFile: string): Set<string> {
  const source = readFileSync(typesFile, "utf8");
  const names = new Set<string>();
  for (const match of source.matchAll(/export\s*\{([^}]*)\}/g)) {
    for (const part of match[1].split(",")) {
      const name = part
        .trim()
        .replace(/^type\s+/, "")
        .split(/\s+as\s+/)
        .pop();
      if (name) names.add(name);
    }
  }
  for (const match of source.matchAll(
    /export\s+(?:declare\s+)?(?:const|function|class|interface|type|enum)\s+([A-Za-z_$][\w$]*)/g,
  )) {
    names.add(match[1]);
  }
  return names;
}

async function main() {
  const packages = loadPackages();
  const errors: string[] = [];
  const moduleCache = new Map<string, Record<string, unknown>>();
  let checked = 0;

  for (const readme of findReadmes(root)) {
    const where = relative(root, readme);
    for (const { specifier, names, typeOnly, installOnly } of extractImports(
      readFileSync(readme, "utf8"),
    )) {
      checked++;
      const { name, subpath } = splitSpecifier(specifier);
      const pkg = packages.get(name);
      if (!pkg) {
        errors.push(`${where}: package "${name}" does not exist in this repo`);
        continue;
      }
      if (installOnly) continue;
      const target = pkg.exports[subpath];
      if (!target) {
        errors.push(`${where}: "${specifier}" is not in the exports of ${name}`);
        continue;
      }
      const file = resolveTarget(target, ["import", "default"]);
      if (!file || !existsSync(join(pkg.dir, file))) {
        errors.push(`${where}: "${specifier}" points to a missing file (${file}); build first`);
        continue;
      }
      if (names.length === 0) continue;

      const typesFile =
        resolveTarget(target, ["types"]) ?? resolveTarget(target, ["import", "types"]);
      const typeNames =
        typesFile && existsSync(join(pkg.dir, typesFile))
          ? declaredTypeNames(join(pkg.dir, typesFile))
          : new Set<string>();
      const modulePath = join(pkg.dir, file);
      if (!typeOnly && !moduleCache.has(modulePath)) {
        moduleCache.set(modulePath, await import(pathToFileURL(modulePath).href));
      }
      const runtime = moduleCache.get(modulePath);
      for (const imported of names) {
        const exists = typeOnly ? typeNames.has(imported) : runtime && imported in runtime;
        if (!exists) errors.push(`${where}: "${imported}" is not exported by ${specifier}`);
      }
    }
  }

  if (errors.length > 0) {
    console.error(`verify-readme found ${errors.length} problem(s):\n`);
    for (const error of errors) console.error(`  - ${error}`);
    process.exit(1);
  }
  console.log(`verify-readme: ${checked} README imports match the built packages.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
