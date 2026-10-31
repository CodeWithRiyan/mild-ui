// packages/react/src/components/Heading/Heading.tsx
import * as React from "react";
import type { HeadingCoreProps, PolymorphicComponent, PolymorphicProps } from "../../types";
import { cn } from "../../utils";

export interface HeadingOwnProps extends HeadingCoreProps {
  /** Heading content */
  children?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

/** Props of `<Heading as={T}>`: the typography props plus everything `T` accepts. */
export type HeadingProps<T extends React.ElementType = "h2"> = PolymorphicProps<T, HeadingOwnProps>;

function HeadingInner<T extends React.ElementType = "h2">(
  {
    as,
    level = 2,
    size,
    weight = "semibold",
    align,
    color,
    truncate = false,
    children,
    className,
    ...rest
  }: HeadingProps<T>,
  // Typed loosely here; the public signature (PolymorphicComponent) narrows it per `as`.
  ref: React.ForwardedRef<Element>,
) {
  // The level picks the element (and the default size); `as` overrides the element only.
  const Component: React.ElementType = as ?? (`h${level}` as React.ElementType);
  const classes = cn(
    "mild-heading",
    `mild-heading--level-${level}`,
    // An explicit size is declared after the level rules in the stylesheet, so it wins.
    size && `mild-heading--${size}`,
    `mild-heading--${weight}`,
    align && `mild-heading--${align}`,
    color && `mild-heading--${color}`,
    truncate && "mild-heading--truncate",
    className,
  );

  return (
    <Component ref={ref} className={classes} {...rest}>
      {children}
    </Component>
  );
}

/**
 * Section heading. `level` picks both the element (`h1`..`h6`) and the default size, so the
 * document outline and the visual size can be chosen independently (`<Heading level={1}
 * size="xl">`, or `as="div"` for a heading-looking label).
 */
export const Heading = React.forwardRef(HeadingInner) as PolymorphicComponent<
  "h2",
  HeadingOwnProps
>;
Heading.displayName = "Heading";
