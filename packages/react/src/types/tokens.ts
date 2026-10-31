// packages/react/src/types/tokens.ts
// Design-token keys accepted by style props. They mirror the scales in
// packages/core/src/sass/tokens and resolve to the matching `--mild-*` custom property,
// so a style prop can only ever produce a themed value.

/** Spacing scale (`--mild-space-*`), see core `tokens/_spacing.scss`. */
export type SpaceToken =
  | "0"
  | "px"
  | "0-5"
  | "1"
  | "1-5"
  | "2"
  | "2-5"
  | "3"
  | "3-5"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "14"
  | "16"
  | "20"
  | "24"
  | "28"
  | "32"
  | "36"
  | "40"
  | "44"
  | "48"
  | "52"
  | "56"
  | "60"
  | "64"
  | "72"
  | "80"
  | "96";

/** Fractional / full dimensions (`--mild-dimension-*`), see core `tokens/_dimensions.scss`. */
export type FractionToken =
  | "full"
  | "1/2"
  | "1/3"
  | "2/3"
  | "1/4"
  | "3/4"
  | "1/5"
  | "2/5"
  | "3/5"
  | "4/5"
  | "1/6"
  | "5/6"
  | "1/7"
  | "2/7"
  | "3/7"
  | "4/7"
  | "5/7"
  | "6/7"
  | "1/8"
  | "3/8"
  | "5/8"
  | "7/8"
  | "1/9"
  | "2/9"
  | "4/9"
  | "5/9"
  | "7/9"
  | "8/9"
  | "1/10"
  | "3/10"
  | "7/10"
  | "9/10"
  | "1/11"
  | "2/11"
  | "3/11"
  | "4/11"
  | "5/11"
  | "6/11"
  | "7/11"
  | "8/11"
  | "9/11"
  | "10/11"
  | "1/12"
  | "5/12"
  | "7/12"
  | "11/12";

/** Width/height style props accept the spacing scale or a fraction such as `"1/2"`. */
export type DimensionToken = SpaceToken | FractionToken;

/** Border radius scale (`--mild-radius-*`), see core `tokens/_radius.scss`. */
export type RadiusToken = "none" | "sm" | "base" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";

/** Palette names (`--mild-color-<name>-<shade>`), see core `tokens/_colors.scss`. */
export type ColorName =
  | "blue"
  | "gray"
  | "red"
  | "green"
  | "yellow"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "error";

export type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

export type AlphaStep = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;

/** A palette color, e.g. `"primary-500"`, `"gray-100"`, `"white"`, `"black-alpha-50"`. */
export type ColorToken =
  | `${ColorName}-${ColorShade}`
  | "white"
  | "black"
  | `white-alpha-${AlphaStep}`
  | `black-alpha-${AlphaStep}`;

/** Z-index steps matching the core `.mild-z-*` utilities. */
export type ZIndexToken = 1 | 2 | 3 | 4 | 5 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;

/** Semantic text colors painted by `.mild-text--<color>` in core `components/_text.scss`. */
export type TextColor = "primary" | "secondary" | "success" | "warning" | "danger" | "muted";

/** Breakpoint names (`--mild-breakpoint-*`), see core `tokens/_breakpoints.scss`. */
export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * A value that may change per (min-width) breakpoint: `{ base: 1, md: 2, lg: 3 }`.
 * `base` applies everywhere, `sm`..`2xl` from that breakpoint upwards (mobile first).
 */
export type Responsive<T> = T | Partial<Record<"base" | Breakpoint, T>>;
