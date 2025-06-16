// packages/react/src/components/Box/Box.tsx
import React, { forwardRef } from "react";
import type { BoxCoreProps } from "../../types";
import { cn, getSpacingValue, getColorValue } from "../../utils";

export interface BoxProps extends BoxCoreProps {
  /** Box content */
  children?: React.ReactNode;
  /** HTML element to render */
  as?: keyof JSX.IntrinsicElements;
  /** Additional CSS class */
  className?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      as = "div",
      display = "block",
      children,
      className,
      onClick,
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
    },
    ref,
  ) => {
    const Component = as;

    // Build classes
    const classes = cn(
      "mild-box",
      `mild-box--${display}`,
      flexDirection && `mild-box--flex-${flexDirection}`,
      flexWrap && `mild-box--flex-${flexWrap}`,
      alignItems && `mild-box--items-${alignItems}`,
      justifyContent && `mild-box--justify-${justifyContent}`,
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
      ...(width && { width: typeof width === "number" ? `${width}px` : width }),
      ...(height && {
        height: typeof height === "number" ? `${height}px` : height,
      }),
      ...(minWidth && {
        minWidth: typeof minWidth === "number" ? `${minWidth}px` : minWidth,
      }),
      ...(minHeight && {
        minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight,
      }),
      ...(maxWidth && {
        maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
      }),
      ...(maxHeight && {
        maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
      }),

      // Border and background
      ...(borderRadius && { borderRadius: getSpacingValue(borderRadius) }),
      ...(borderWidth && { borderWidth: getSpacingValue(borderWidth) }),
      ...(borderColor && { borderColor: getColorValue(borderColor) }),
      ...(backgroundColor && {
        backgroundColor: getColorValue(backgroundColor),
      }),
      ...(color && { color: getColorValue(color) }),

      // Position
      ...(top && { top: typeof top === "number" ? `${top}px` : top }),
      ...(right && { right: typeof right === "number" ? `${right}px` : right }),
      ...(bottom && {
        bottom: typeof bottom === "number" ? `${bottom}px` : bottom,
      }),
      ...(left && { left: typeof left === "number" ? `${left}px` : left }),
      ...(zIndex && { zIndex }),
    };

    return (
      <div
        ref={ref}
        className={classes}
        style={Object.keys(style).length > 0 ? style : undefined}
        onClick={onClick}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

Box.displayName = "Box";
