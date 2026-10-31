// packages/react/src/components/Container/Container.tsx
import * as React from "react";
import type { ContainerCoreProps, PolymorphicComponent, PolymorphicProps } from "../../types";
import { cn, getSpacingValue } from "../../utils";

export interface ContainerOwnProps extends ContainerCoreProps {
  /** Container content */
  children?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

/** Props of `<Container as={T}>`: the layout props plus everything `T` accepts. */
export type ContainerProps<T extends React.ElementType = "div"> = PolymorphicProps<
  T,
  ContainerOwnProps
>;

function ContainerInner<T extends React.ElementType = "div">(
  {
    as,
    size = "lg",
    padding,
    centerContent = false,
    children,
    className,
    style,
    ...rest
  }: ContainerProps<T>,
  // Typed loosely here; the public signature (PolymorphicComponent) narrows it per `as`.
  ref: React.ForwardedRef<Element>,
) {
  const Component: React.ElementType = as ?? "div";
  const classes = cn(
    "mild-container",
    `mild-container--${size}`,
    centerContent && "mild-container--center-content",
    className,
  );
  const inlineStyle: React.CSSProperties = {
    ...(padding && {
      paddingLeft: getSpacingValue(padding),
      paddingRight: getSpacingValue(padding),
    }),
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
 * Horizontally centered wrapper with a max-width from the breakpoint scale (`size`) and
 * horizontal padding. Renders a `div`, or the element given with `as` (`main`, `section`, ...).
 */
export const Container = React.forwardRef(ContainerInner) as PolymorphicComponent<
  "div",
  ContainerOwnProps
>;
Container.displayName = "Container";
