// packages/vue/src/providers/color-mode.ts
// Shared constants of the color-mode system (provider, composables and the anti-flicker script).
// Kept identical to packages/react/src/providers/color-mode.ts so both packages read and write
// the same storage key and <html> attributes.
import type { ColorMode } from "../types";

/** `localStorage` key the chosen mode is persisted under. */
export const DEFAULT_STORAGE_KEY = "mild-ui-color-mode";
/** `<html>` attribute carrying the resolved mode (`light`/`dark`); the stylesheet keys on it. */
export const RESOLVED_ATTRIBUTE = "data-theme";
/** `<html>` attribute carrying the chosen mode (`light`/`dark`/`system`). */
export const COLOR_MODE_ATTRIBUTE = "data-color-mode";

export const COLOR_MODES: readonly ColorMode[] = ["light", "dark", "system"];

export function isColorMode(value: unknown): value is ColorMode {
  return typeof value === "string" && (COLOR_MODES as readonly string[]).includes(value);
}
