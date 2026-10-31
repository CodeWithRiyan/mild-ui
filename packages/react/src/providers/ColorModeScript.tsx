// packages/react/src/providers/ColorModeScript.tsx
//
// Anti-flicker script. Rendered in <head> (before the app's stylesheet and bundle), it applies
// the stored color mode - or the OS preference for "system" - to <html> before the first paint,
// so a dark-mode user never sees a light flash while React loads.
import * as React from "react";
import type { ColorMode } from "../types";
import { COLOR_MODE_ATTRIBUTE, DEFAULT_STORAGE_KEY, RESOLVED_ATTRIBUTE } from "./color-mode";

export interface ColorModeScriptOptions {
  /** Must match the <ThemeProvider storageKey>. Defaults to `"mild-ui-color-mode"`. */
  storageKey?: string;
  /** Must match the <ThemeProvider defaultColorMode>. Defaults to `"system"`. */
  defaultColorMode?: ColorMode;
}

/**
 * The script source, for frameworks where you write the HTML yourself (Vite `index.html`,
 * Astro, a server template): `<script>${getColorModeScript()}</script>`.
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

/** Inline anti-flicker script for React-rendered documents (Next.js `<head>`, Remix, ...). */
export function ColorModeScript({ nonce, ...options }: ColorModeScriptProps): React.ReactElement {
  return (
    <script
      nonce={nonce}
      data-mild-color-mode-script=""
      dangerouslySetInnerHTML={{ __html: getColorModeScript(options) }}
    />
  );
}
ColorModeScript.displayName = "ColorModeScript";
