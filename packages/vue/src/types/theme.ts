// packages/vue/src/types/theme.ts
import type { ColorMode, ThemeConfig } from "./common";

export interface ThemeProviderProps {
  /**
   * Element to render around the content. By default the provider renders no element of its
   * own (like the React one); give it `as="div"` to get a root that takes `class` and `style`.
   */
  as?: string;
  /** Overrides merged into the default theme and applied as `--mild-*` custom properties. */
  theme?: Partial<ThemeConfig>;
  /** Initial mode when nothing is stored (uncontrolled). Defaults to `"system"`. */
  defaultColorMode?: ColorMode;
  /** @deprecated Use `defaultColorMode`. */
  defaultTheme?: ColorMode;
  /** Controlled mode (`v-model:colorMode`). */
  colorMode?: ColorMode;
  /** `localStorage` key the mode is persisted under; `null` disables persistence. */
  storageKey?: string | null;
  /** Prefix of the generated custom properties (`--<prefix>-color-...`). */
  cssVarPrefix?: string;
}
