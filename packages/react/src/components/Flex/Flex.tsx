// packages/react/src/components/Flex/Flex.tsx
import * as React from "react";
import type { FlexCoreProps, PolymorphicComponent, PolymorphicProps } from "../../types";
import { cn, getSpacingValue, flexModifierClasses } from "../../utils";

export interface FlexOwnProps extends FlexCoreProps {
  /** Flex content */
  children?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

/** Props of `<Flex as={T}>`: the layout props plus everything `T` accepts. */
export type FlexProps<T extends React.ElementType = "div"> = PolymorphicProps<T, FlexOwnProps>;

function FlexInner<T extends React.ElementType = "div">(
  {
    as,
    direction = "row",
    wrap,
    align,
    justify,
    gap,
    inline = false,
    children,
    className,
    style,
    ...rest
  }: FlexProps<T>,
  // Typed loosely here; the public signature (PolymorphicComponent) narrows it per `as`.
  ref: React.ForwardedRef<Element>,
) {
  const Component: React.ElementType = as ?? "div";
  const classes = cn(
    "mild-flex",
    inline && "mild-flex--inline",
    ...flexModifierClasses("flex", { direction, wrap, align, justify }),
    className,
  );
  const inlineStyle: React.CSSProperties = {
    ...(gap && { gap: getSpacingValue(gap) }),
    ...style,
  };

  return (
    <Component
      ref={ref}
      className={classes}
      style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
      {...rest}
    >
      {children}
    </Component>
  );
}

/**
 * General-purpose flex container (a row by default). Renders a `div`, or the element given
 * with `as`.
 */
export const Flex = React.forwardRef(FlexInner) as PolymorphicComponent<"div", FlexOwnProps>;
Flex.displayName = "Flex";
