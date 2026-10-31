import { type ClassValue, clsx } from "clsx";

/**
 * Joins class names, dropping falsy values. This is `clsx` and nothing more: the design system's
 * classes are `mild-*`/`--mild-*`, which Tailwind-style conflict resolution knows nothing about,
 * so later classes do not replace earlier ones.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
