// packages/react/src/components/Box/Box.tsx
import * as React from "react";
import type { BoxCoreProps, PolymorphicComponent, PolymorphicProps } from "../../types";
import { cn, getSpacingValue, getDimensionValue, getRadiusValue, getColorValue } from "../../utils";

export interface BoxOwnProps extends BoxCoreProps {
  /** Box content */
  children?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

/** Props of `<Box as={T}>`: the style props plus everything `T` accepts. */
export type BoxProps<T extends React.ElementType = "div"> = PolymorphicProps<T, BoxOwnProps>;

function BoxInner<T extends React.ElementType = "div">(
  {
    as,
    display = "block",
    children,
    className,
    // Flexbox props
    flexDirection,
    flexWrap,
    alignItems,
    justifyContent,
    gap,
    // Grid props
    gridTemplateColumns,
    gridTemplateRows,
    gridGap,
    // Spacing props
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    margin,
    marginX,
    marginY,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // Sizing props
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    // Border and background
    borderRadius,
    borderWidth,
    borderColor,
    backgroundColor,
    color,
    // Position props
    position,
    top,
    right,
    bottom,
    left,
    zIndex,
    // Overflow props
    overflow,
    overflowX,
    overflowY,
    ...rest
  }: BoxProps<T>,
  // Typed loosely here; the public signature (PolymorphicComponent) narrows it per `as`.
  ref: React.ForwardedRef<Element>,
) {
  const Component: React.ElementType = as ?? "div";
  // CSS keywords -> the short modifier names the stylesheet uses (flex-start -> start, ...)
  const short = (value: string) => value.replace(/^(flex|space)-/, "");
  // Build classes
  const classes = cn(
    "mild-box",
    `mild-box--${display}`,
    flexDirection && `mild-box--flex-${flexDirection}`,
    flexWrap && `mild-box--flex-${flexWrap}`,
    alignItems && `mild-box--items-${short(alignItems)}`,
    justifyContent && `mild-box--justify-${short(justifyContent)}`,
    position && `mild-box--${position}`,
    overflow && `mild-box--overflow-${overflow}`,
    overflowX && `mild-box--overflow-x-${overflowX}`,
    overflowY && `mild-box--overflow-y-${overflowY}`,
    className,
  );

  // Build inline styles for dynamic values
  const style: React.CSSProperties = {
    // Spacing
    ...(padding && { padding: getSpacingValue(padding) }),
    ...(paddingX && {
      paddingLeft: getSpacingValue(paddingX),
      paddingRight: getSpacingValue(paddingX),
    }),
    ...(paddingY && {
      paddingTop: getSpacingValue(paddingY),
      paddingBottom: getSpacingValue(paddingY),
    }),
    ...(paddingTop && { paddingTop: getSpacingValue(paddingTop) }),
    ...(paddingRight && { paddingRight: getSpacingValue(paddingRight) }),
    ...(paddingBottom && { paddingBottom: getSpacingValue(paddingBottom) }),
    ...(paddingLeft && { paddingLeft: getSpacingValue(paddingLeft) }),
    ...(margin && { margin: getSpacingValue(margin) }),
    ...(marginX && {
      marginLeft: getSpacingValue(marginX),
      marginRight: getSpacingValue(marginX),
    }),
    ...(marginY && {
      marginTop: getSpacingValue(marginY),
      marginBottom: getSpacingValue(marginY),
    }),
    ...(marginTop && { marginTop: getSpacingValue(marginTop) }),
    ...(marginRight && { marginRight: getSpacingValue(marginRight) }),
    ...(marginBottom && { marginBottom: getSpacingValue(marginBottom) }),
    ...(marginLeft && { marginLeft: getSpacingValue(marginLeft) }),

    // Flexbox
    ...(gap && { gap: getSpacingValue(gap) }),

    // Grid
    ...(gridTemplateColumns && { gridTemplateColumns }),
    ...(gridTemplateRows && { gridTemplateRows }),
    ...(gridGap && { gap: getSpacingValue(gridGap) }),

    // Sizing
    ...(width && { width: getDimensionValue(width) }),
    ...(height && { height: getDimensionValue(height) }),
    ...(minWidth && { minWidth: getDimensionValue(minWidth) }),
    ...(minHeight && { minHeight: getDimensionValue(minHeight) }),
    ...(maxWidth && { maxWidth: getDimensionValue(maxWidth) }),
    ...(maxHeight && { maxHeight: getDimensionValue(maxHeight) }),

    // Border and background
    ...(borderRadius && { borderRadius: getRadiusValue(borderRadius) }),
    ...(borderWidth && { borderWidth: getSpacingValue(borderWidth) }),
    ...(borderColor && { borderColor: getColorValue(borderColor) }),
    ...(backgroundColor && {
      backgroundColor: getColorValue(backgroundColor),
    }),
    ...(color && { color: getColorValue(color) }),

    // Position
    ...(top && { top: getSpacingValue(top) }),
    ...(right && { right: getSpacingValue(right) }),
    ...(bottom && { bottom: getSpacingValue(bottom) }),
    ...(left && { left: getSpacingValue(left) }),
    ...(zIndex && { zIndex }),
  };

  return (
    <Component
      ref={ref}
      className={classes}
      style={Object.keys(style).length > 0 ? style : undefined}
      {...rest}
    >
      {children}
    </Component>
  );
}

/**
 * Layout primitive. Renders a `div` by default, or the element given with `as`, and maps its
 * style props (design tokens only) onto themed CSS custom properties.
 */
export const Box = React.forwardRef(BoxInner) as PolymorphicComponent<"div", BoxOwnProps>;
Box.displayName = "Box";
