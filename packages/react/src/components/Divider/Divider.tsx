// packages/react/src/components/Divider/Divider.tsx
import * as React from "react";
import type { DividerCoreProps, PolymorphicComponent, PolymorphicProps } from "../../types";
import { cn, getColorValue } from "../../utils";

export interface DividerOwnProps extends DividerCoreProps {
  /** Text (or any node) shown in the middle of the line. */
  label?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Divider has no children; use `label` for text on the line. */
  children?: never;
}

/** Props of `<Divider as={T}>`: the divider props plus everything `T` accepts. */
export type DividerProps<T extends React.ElementType = "div"> = PolymorphicProps<
  T,
  DividerOwnProps
>;

function DividerInner<T extends React.ElementType = "div">(
  {
    as,
    orientation = "horizontal",
    variant = "solid",
    size = "sm",
    color,
    label,
    labelPosition = "center",
    decorative = false,
    className,
    style,
    ...rest
  }: DividerProps<T>,
  // Typed loosely here; the public signature (PolymorphicComponent) narrows it per `as`.
  ref: React.ForwardedRef<Element>,
) {
  const Component: React.ElementType = as ?? "div";
  const hasLabel = label !== undefined && label !== null && label !== false;
  const classes = cn(
    "mild-divider",
    `mild-divider--${orientation}`,
    `mild-divider--${variant}`,
    `mild-divider--${size}`,
    hasLabel && "mild-divider--with-label",
    hasLabel && labelPosition !== "center" && `mild-divider--label-${labelPosition}`,
    className,
  );
  // The line color is a custom property so that a label keeps the text color.
  const inlineStyle = {
    ...(color && { "--mild-divider-color": getColorValue(color) }),
    ...style,
  } as React.CSSProperties;

  const a11y = decorative
    ? { role: "none", "aria-hidden": true }
    : { role: "separator", "aria-orientation": orientation };

  // `undefined` (not `false`) so that a void `as="hr"` gets no children at all.
  const labelNode = hasLabel ? <span className="mild-divider__label">{label}</span> : undefined;

  return (
    <Component
      ref={ref}
      className={classes}
      style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
      {...a11y}
      {...rest}
    >
      {labelNode}
    </Component>
  );
}

/**
 * Horizontal or vertical separator (`role="separator"`), optionally with a label on the line.
 * Renders a `div`, or the element given with `as` (`hr`, `li`, ...).
 */
export const Divider = React.forwardRef(DividerInner) as PolymorphicComponent<
  "div",
  DividerOwnProps
>;
Divider.displayName = "Divider";
