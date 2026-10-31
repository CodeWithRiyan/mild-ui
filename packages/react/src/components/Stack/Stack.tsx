// packages/react/src/components/Stack/Stack.tsx
import * as React from "react";
import type { StackCoreProps, PolymorphicComponent, PolymorphicProps } from "../../types";
import { cn, getSpacingValue, flexModifierClasses } from "../../utils";

export interface StackOwnProps extends StackCoreProps {
  /** Stack content */
  children?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

/** Props of `<Stack as={T}>`: the layout props plus everything `T` accepts. */
export type StackProps<T extends React.ElementType = "div"> = PolymorphicProps<T, StackOwnProps>;

function StackInner<T extends React.ElementType = "div">(
  {
    as,
    direction = "column",
    gap = "4",
    align,
    justify,
    wrap,
    inline = false,
    children,
    className,
    style,
    ...rest
  }: StackProps<T>,
  // Typed loosely here; the public signature (PolymorphicComponent) narrows it per `as`.
  ref: React.ForwardedRef<Element>,
) {
  const Component: React.ElementType = as ?? "div";
  const classes = cn(
    "mild-stack",
    inline && "mild-stack--inline",
    ...flexModifierClasses("stack", { direction, wrap, align, justify }),
    className,
  );

  return (
    <Component
      ref={ref}
      className={classes}
      style={{ gap: getSpacingValue(gap), ...style }}
      {...rest}
    >
      {children}
    </Component>
  );
}

/**
 * Spaces its children along one axis (a column by default) with a gap from the spacing scale.
 * Renders a `div`, or the element given with `as`.
 */
export const Stack = React.forwardRef(StackInner) as PolymorphicComponent<"div", StackOwnProps>;
Stack.displayName = "Stack";
