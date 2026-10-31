// packages/vue/src/utils/cn.ts

/** Anything `cn` accepts: strings, numbers, nested arrays, `{ class: condition }` maps, falsy. */
export type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

function toClassName(value: ClassValue): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return value ? String(value) : "";
  if (!value || value === true) return "";
  if (Array.isArray(value)) return cn(...value);
  // Object form: keys whose value is truthy.
  const map: Record<string, boolean | null | undefined> = value;
  return Object.keys(map)
    .filter((key) => map[key])
    .join(" ");
}

/**
 * Joins class names, dropping falsy values. The design system's classes are `mild-*`, which
 * Tailwind-style conflict resolution knows nothing about, so later classes never replace
 * earlier ones. Dependency-free: this package only depends on `@mild-ui/primitives`.
 */
export function cn(...inputs: ClassValue[]): string {
  let result = "";
  for (const input of inputs) {
    const part = toClassName(input);
    if (part) result += result ? ` ${part}` : part;
  }
  return result;
}
