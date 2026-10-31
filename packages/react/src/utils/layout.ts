// Class-name helpers shared by the layout components (Stack, Flex, Grid).
import type { AlignItems, FlexDirection, FlexWrap, JustifyContent } from "../types/common";
import type { Breakpoint, Responsive } from "../types/tokens";

/** CSS keyword -> the short modifier the stylesheet uses: `flex-start` -> `start`, `space-between` -> `between`. */
export function shortAlignment(value: string): string {
  return value.replace(/^(flex|space)-/, "");
}

export interface FlexModifierProps {
  direction?: FlexDirection;
  wrap?: boolean | FlexWrap;
  align?: AlignItems;
  justify?: JustifyContent;
}

/** `.mild-<block>--<direction|wrap|items-*|justify-*>` for the flex-container components. */
export function flexModifierClasses(
  block: string,
  { direction, wrap, align, justify }: FlexModifierProps,
): (string | false | undefined)[] {
  const wrapValue = wrap === true ? "wrap" : wrap === false ? undefined : wrap;
  return [
    direction && `mild-${block}--${direction}`,
    wrapValue && `mild-${block}--${wrapValue}`,
    align && `mild-${block}--items-${shortAlignment(align)}`,
    justify && `mild-${block}--justify-${shortAlignment(justify)}`,
  ];
}

const BREAKPOINTS: readonly Breakpoint[] = ["sm", "md", "lg", "xl", "2xl"];

function isResponsiveObject<T>(
  value: Responsive<T>,
): value is Partial<Record<"base" | Breakpoint, T>> {
  return typeof value === "object" && value !== null;
}

/**
 * Expands a plain or per-breakpoint value into class names: `toClass(value, breakpoint?)` is
 * called once for the base value and once per breakpoint given (`{ base: 1, md: 2 }` ->
 * `[toClass(1), toClass(2, "md")]`).
 */
export function responsiveClasses<T>(
  value: Responsive<T> | undefined,
  toClass: (value: T, breakpoint?: Breakpoint) => string,
): string[] {
  if (value === undefined) return [];
  if (!isResponsiveObject(value)) return [toClass(value)];
  const classes: string[] = [];
  if (value.base !== undefined) classes.push(toClass(value.base));
  for (const breakpoint of BREAKPOINTS) {
    const at = value[breakpoint];
    if (at !== undefined) classes.push(toClass(at, breakpoint));
  }
  return classes;
}
