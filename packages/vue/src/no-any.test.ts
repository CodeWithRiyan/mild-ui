// packages/vue/src/no-any.test.ts
// `any` is banned from the component and type sources of both framework packages. ESLint
// enforces it too (`@typescript-eslint/no-explicit-any: error` for src/components and src/types
// in eslint.config.js); this test keeps the rule visible next to the code and catches `any`
// hidden in casts, generics or comments-turned-code that a lint override might let through.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const packages = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

/** Directories whose sources must not use `any`, per framework package. */
const GUARDED = {
  vue: ["src/components", "src/types"],
  react: ["src/components", "src/types"],
} as const;

const SOURCE = /\.(ts|tsx|vue)$/;
const TEST = /\.(test|test-d|stories)\.(ts|tsx)$/;

function walk(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) return walk(path);
    return SOURCE.test(entry) && !TEST.test(entry) ? [path] : [];
  });
}

/** Removes HTML comments, repeating until none is left (a removal can expose another). */
function stripHtmlComments(source: string): string {
  let previous: string;
  let result = source;
  do {
    previous = result;
    result = previous.replace(/<!--[\s\S]*?-->/g, "");
  } while (result !== previous);
  return result;
}

/** Strips comments and string literals, so only code is inspected. */
function codeOnly(source: string): string {
  return stripHtmlComments(source.replace(/\/\*[\s\S]*?\*\//g, ""))
    .replace(/(^|[^:\\])\/\/.*$/gm, "$1")
    .replace(/"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/g, '""');
}

/** `any` used as a type: `: any`, `as any`, `<any>`, `any[]`, `Array<any>`, `Record<string, any>`. */
const ANY_TYPE = /(?<![\w$.])any(?![\w$])/;

describe.each(Object.entries(GUARDED))("@mild-ui/%s has no `any`", (name, directories) => {
  const files = directories.flatMap((directory) => walk(join(packages, name, directory)));

  it("scans a meaningful number of source files", () => {
    expect(files.length).toBeGreaterThan(10);
  });

  it.each(files.map((file) => [relative(packages, file), file]))("%s", (_label, file) => {
    const offending = codeOnly(readFileSync(file, "utf8"))
      .split("\n")
      .map((line, index) => ({ line: line.trim(), number: index + 1 }))
      .filter(({ line }) => ANY_TYPE.test(line));
    expect(offending).toEqual([]);
  });
});
