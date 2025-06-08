// packages/react/src/components/Text/Text.tsx
import React, { forwardRef } from "react";
import type { TextCoreProps } from "../../../../core";

type HTMLTextComponent =
  | HTMLSpanElement
  | HTMLParagraphElement
  | HTMLHeadingElement
  | HTMLLabelElement
  | HTMLDivElement;

export interface TextProps extends TextCoreProps {
  as?:
    | "span"
    | "p"
    | "div"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "label"
    | "caption";
  /** Text content */
  children: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLTextComponent>) => void;
  /** Ref forwarding */
  ref?: React.Ref<HTMLTextComponent>;
}

export const Text = forwardRef<HTMLTextComponent, TextProps>(
  (
    {
      as = "span",
      fontSize = "md",
      fontWeight = "normal",
      textAlign = "left",
      textTransform = "none",
      textDecoration = "none",
      color,
      lineHeight,
      letterSpacing,
      truncate = false,
      noOfLines,
      children,
      className,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const Component = as;

    // Build classes
    const classes = [
      "mild-text",
      `mild-text--${fontSize}`,
      `mild-text--${fontWeight}`,
      `mild-text--${textAlign}`,
      textTransform !== "none" && `mild-text--${textTransform}`,
      textDecoration !== "none" && `mild-text--${textDecoration}`,
      truncate && "mild-text--truncate",
      noOfLines && `mild-text--clamp-${noOfLines}`,
      color && `mild-text--${color}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const style: React.CSSProperties = {
      ...(lineHeight && {
        lineHeight: typeof lineHeight === "number" ? lineHeight : lineHeight,
      }),
      ...(letterSpacing && {
        letterSpacing:
          typeof letterSpacing === "number"
            ? `${letterSpacing}em`
            : letterSpacing,
      }),
    };

    return (
      <Component
        ref={ref as React.Ref<any>}
        className={classes}
        style={Object.keys(style).length > 0 ? style : undefined}
        onClick={onClick}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Text.displayName = "Text";
