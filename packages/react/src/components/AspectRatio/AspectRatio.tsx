// packages/react/src/components/AspectRatio/AspectRatio.tsx
import * as React from "react";
import type {
  AspectRatioCoreProps,
  AspectRatioValue,
  PolymorphicComponent,
  PolymorphicProps,
} from "../../types";
import { cn } from "../../utils";

export interface AspectRatioOwnProps extends AspectRatioCoreProps {
  /** The single element to constrain (an `img`, `video`, `iframe`, or any box). */
  children?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

/** Props of `<AspectRatio as={T}>`. */
export type AspectRatioProps<T extends React.ElementType = "div"> = PolymorphicProps<
  T,
  AspectRatioOwnProps
>;

/** `16 / 9` -> `"1.7777777777777777"`, `"16/9"` -> `"16 / 9"` (both valid `aspect-ratio` values). */
export function toCssAspectRatio(ratio: AspectRatioValue): string {
  return typeof ratio === "number"
    ? String(ratio)
    : ratio
        .split("/")
        .map((part) => part.trim())
        .join(" / ");
}

function AspectRatioInner<T extends React.ElementType = "div">(
  { as, ratio = 1, children, className, style, ...rest }: AspectRatioProps<T>,
  // Typed loosely here; the public signature (PolymorphicComponent) narrows it per `as`.
  ref: React.ForwardedRef<Element>,
) {
  const Component: React.ElementType = as ?? "div";
  const inlineStyle = {
    "--mild-aspect-ratio": toCssAspectRatio(ratio),
    ...style,
  } as React.CSSProperties;

  return (
    <Component
      ref={ref}
      className={cn("mild-aspect-ratio", className)}
      style={inlineStyle}
      {...rest}
    >
      {children}
    </Component>
  );
}

/**
 * Keeps its child at a fixed width/height ratio (`ratio={16 / 9}`); the child fills the box.
 * Renders a `div`, or the element given with `as`.
 */
export const AspectRatio = React.forwardRef(AspectRatioInner) as PolymorphicComponent<
  "div",
  AspectRatioOwnProps
>;
AspectRatio.displayName = "AspectRatio";
