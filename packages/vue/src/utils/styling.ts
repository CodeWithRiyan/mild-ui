// packages/vue/src/utils/styling.ts
// Styling utility functions
import type {
  SpaceToken,
  FractionToken,
  DimensionToken,
  RadiusToken,
  ColorToken,
} from "../types/tokens";

// Fallbacks mirror packages/core/src/sass/tokens so a Box renders sensibly even before the
// core stylesheet (which defines the custom properties) is loaded.
const SPACE: Record<SpaceToken, string> = {
  "0": "0px",
  px: "1px",
  "0-5": "0.125rem",
  "1": "0.25rem",
  "1-5": "0.375rem",
  "2": "0.5rem",
  "2-5": "0.625rem",
  "3": "0.75rem",
  "3-5": "0.875rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "1.75rem",
  "8": "2rem",
  "9": "2.25rem",
  "10": "2.5rem",
  "11": "2.75rem",
  "12": "3rem",
  "14": "3.5rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "28": "7rem",
  "32": "8rem",
  "36": "9rem",
  "40": "10rem",
  "44": "11rem",
  "48": "12rem",
  "52": "13rem",
  "56": "14rem",
  "60": "15rem",
  "64": "16rem",
  "72": "18rem",
  "80": "20rem",
  "96": "24rem",
};

const FRACTION: Record<FractionToken, string> = {
  full: "100%",
  "1/2": "50%",
  "1/3": "33.333333%",
  "2/3": "66.666667%",
  "1/4": "25%",
  "3/4": "75%",
  "1/5": "20%",
  "2/5": "40%",
  "3/5": "60%",
  "4/5": "80%",
  "1/6": "16.666667%",
  "5/6": "83.333333%",
  "1/7": "14.285714%",
  "2/7": "28.571429%",
  "3/7": "42.857143%",
  "4/7": "57.142857%",
  "5/7": "71.428571%",
  "6/7": "85.714286%",
  "1/8": "12.5%",
  "3/8": "37.5%",
  "5/8": "62.5%",
  "7/8": "87.5%",
  "1/9": "11.111111%",
  "2/9": "22.222222%",
  "4/9": "44.444444%",
  "5/9": "55.555556%",
  "7/9": "77.777778%",
  "8/9": "88.888889%",
  "1/10": "10%",
  "3/10": "30%",
  "7/10": "70%",
  "9/10": "90%",
  "1/11": "9.090909%",
  "2/11": "18.181818%",
  "3/11": "27.272727%",
  "4/11": "36.363636%",
  "5/11": "45.454545%",
  "6/11": "54.545455%",
  "7/11": "63.636364%",
  "8/11": "72.727273%",
  "9/11": "81.818182%",
  "10/11": "90.909091%",
  "1/12": "8.333333%",
  "5/12": "41.666667%",
  "7/12": "58.333333%",
  "11/12": "91.666667%",
};

const RADIUS: Record<RadiusToken, string> = {
  none: "0px",
  sm: "0.125rem",
  base: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
};

export function isSpaceToken(value: string): value is SpaceToken {
  return Object.prototype.hasOwnProperty.call(SPACE, value);
}

export function isFractionToken(value: string): value is FractionToken {
  return Object.prototype.hasOwnProperty.call(FRACTION, value);
}

export function isRadiusToken(value: string): value is RadiusToken {
  return Object.prototype.hasOwnProperty.call(RADIUS, value);
}

/** Spacing token -> `var(--mild-space-<token>, <fallback>)`. */
export function getSpacingValue(token: SpaceToken): string {
  return `var(--mild-space-${token}, ${SPACE[token]})`;
}

/** Spacing token -> `--mild-space-*`; fraction token -> `--mild-dimension-*`. */
export function getDimensionValue(token: DimensionToken): string {
  if (isSpaceToken(token)) return getSpacingValue(token);
  return `var(--mild-dimension-${token.replace("/", "-")}, ${FRACTION[token]})`;
}

/** Radius token -> `var(--mild-radius-<token>, <fallback>)`. */
export function getRadiusValue(token: RadiusToken): string {
  return `var(--mild-radius-${token}, ${RADIUS[token]})`;
}

/** Color token -> `var(--mild-color-<token>)`, e.g. `primary-500` or `white`. */
export function getColorValue(token: ColorToken): string {
  return `var(--mild-color-${token})`;
}

/**
 * Generate CSS variable name
 */
export function cssVar(property: string, value?: string): string {
  const varName = `--mild-${property}`;
  return value ? `var(${varName}, ${value})` : `var(${varName})`;
}

/**
 * Generate data attribute
 */
export function dataAttr(condition: boolean | undefined): string | undefined {
  return condition ? "" : undefined;
}

/**
 * Generate aria attribute
 */
export function ariaAttr(condition: boolean | undefined): boolean | undefined {
  return condition ? true : undefined;
}

/**
 * Class variance authority (CVA) utility - simplified version
 */
export function cva(
  base: string,
  options?: {
    variants?: Record<string, Record<string, string>>;
    defaultVariants?: Record<string, string | number | boolean | undefined>;
  },
) {
  return (props?: Record<string, string | number | boolean | undefined>) => {
    const classes = [base];

    if (options?.variants && props) {
      Object.entries(options.variants).forEach(([key, variants]) => {
        const value = props[key] ?? options.defaultVariants?.[key];
        const variantClass =
          value === undefined || value === false ? undefined : variants[String(value)];
        if (variantClass) classes.push(variantClass);
      });
    }

    return classes.filter(Boolean).join(" ");
  };
}
