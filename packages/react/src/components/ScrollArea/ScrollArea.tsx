// packages/react/src/components/ScrollArea/ScrollArea.tsx
import * as React from "react";
import type { ScrollAreaCoreProps, PolymorphicComponent, PolymorphicProps } from "../../types";
import { cn, getDimensionValue } from "../../utils";

export interface ScrollAreaOwnProps extends ScrollAreaCoreProps {
  /** Scrollable content */
  children?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

/** Props of `<ScrollArea as={T}>`. */
export type ScrollAreaProps<T extends React.ElementType = "div"> = PolymorphicProps<
  T,
  ScrollAreaOwnProps
>;

function ScrollAreaInner<T extends React.ElementType = "div">(
  {
    as,
    orientation = "vertical",
    scrollbars = "auto",
    height,
    maxHeight,
    maxWidth,
    children,
    className,
    style,
    ...rest
  }: ScrollAreaProps<T>,
  // Typed loosely here; the public signature (PolymorphicComponent) narrows it per `as`.
  ref: React.ForwardedRef<Element>,
) {
  const Component: React.ElementType = as ?? "div";
  const classes = cn(
    "mild-scroll-area",
    `mild-scroll-area--${orientation}`,
    scrollbars !== "auto" && `mild-scroll-area--${scrollbars}`,
    className,
  );
  const inlineStyle: React.CSSProperties = {
    ...(height && { height: getDimensionValue(height) }),
    ...(maxHeight && { maxHeight: getDimensionValue(maxHeight) }),
    ...(maxWidth && { maxWidth: getDimensionValue(maxWidth) }),
    ...style,
  };
  // Scrollable regions must be reachable with the keyboard; callers can still override tabIndex.
  const focus = { tabIndex: 0 };

  return (
    <Component
      ref={ref}
      className={classes}
      style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
      {...focus}
      {...rest}
    >
      {children}
    </Component>
  );
}

/**
 * Scroll container with slim, themed scrollbars. Give it a `maxHeight` (or `maxWidth` for
 * horizontal) so the content has something to overflow. Keyboard-focusable (`tabIndex={0}`)
 * so the region can be scrolled without a pointer. Renders a `div`, or the element given with `as`.
 */
export const ScrollArea = React.forwardRef(ScrollAreaInner) as PolymorphicComponent<
  "div",
  ScrollAreaOwnProps
>;
ScrollArea.displayName = "ScrollArea";
