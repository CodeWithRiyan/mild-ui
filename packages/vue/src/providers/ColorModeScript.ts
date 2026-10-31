// packages/vue/src/providers/ColorModeScript.ts
//
// Anti-flicker script. Rendered in <head> (before the app's stylesheet and bundle), it applies
// the stored color mode - or the OS preference for "system" - to <html> before the first paint,
// so a dark-mode user never sees a light flash while the app loads.
import { h, type FunctionalComponent } from "vue";
import type { ColorMode } from "../types";
import { COLOR_MODE_ATTRIBUTE, DEFAULT_STORAGE_KEY, RESOLVED_ATTRIBUTE } from "./color-mode";

export interface ColorModeScriptOptions {
  /** Must match the <ThemeProvider storage-key>. Defaults to `"mild-ui-color-mode"`. */
  storageKey?: string;
  /** Must match the <ThemeProvider default-color-mode>. Defaults to `"system"`. */
  defaultColorMode?: ColorMode;
}

/**
 * The script source, for documents you write yourself (Vite `index.html`, Nuxt `app.head`,
 * a server template): `<script>${getColorModeScript()}</script>`.
 */
export function getColorModeScript({
  storageKey = DEFAULT_STORAGE_KEY,
  defaultColorMode = "system",
}: ColorModeScriptOptions = {}): string {
  // Kept dependency-free and ES5 so it runs anywhere, and wrapped in try/catch so a blocked
  // localStorage never breaks the page.
  return (
    "(function(){try{" +
    `var k=${JSON.stringify(storageKey)},d=${JSON.stringify(defaultColorMode)};` +
    "var m=localStorage.getItem(k);" +
    'if(m!=="light"&&m!=="dark"&&m!=="system")m=d;' +
    'var r=m==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):m;' +
    "var e=document.documentElement;" +
    `e.setAttribute(${JSON.stringify(RESOLVED_ATTRIBUTE)},r);` +
    `e.setAttribute(${JSON.stringify(COLOR_MODE_ATTRIBUTE)},m);` +
    "e.style.colorScheme=r;" +
    "}catch(e){}})();"
  );
}

export interface ColorModeScriptProps extends ColorModeScriptOptions {
  /** CSP nonce, if your page uses one. */
  nonce?: string;
}

/** Inline anti-flicker script for Vue-rendered documents (Nuxt, vite-ssr, ...). */
export const ColorModeScript: FunctionalComponent<ColorModeScriptProps> = ({ nonce, ...options }) =>
  h("script", {
    nonce,
    "data-mild-color-mode-script": "",
    innerHTML: getColorModeScript(options),
  });
ColorModeScript.displayName = "ColorModeScript";
ColorModeScript.props = ["nonce", "storageKey", "defaultColorMode"];
