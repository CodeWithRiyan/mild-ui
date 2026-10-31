// packages/react/src/components/Text/Text.tsx
import * as React from "react";
import type { TextCoreProps, PolymorphicComponent, PolymorphicProps } from "../../types";

export interface TextOwnProps extends TextCoreProps {
  /** Text content */
  children?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

/** Props of `<Text as={T}>`: the typography props plus everything `T` accepts. */
export type TextProps<T extends React.ElementType = "span"> = PolymorphicProps<T, TextOwnProps>;

function TextInner<T extends React.ElementType = "span">(
  {
    as,
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
    ...rest
  }: TextProps<T>,
  // Typed loosely here; the public signature (PolymorphicComponent) narrows it per `as`.
  ref: React.ForwardedRef<Element>,
) {
  const Component: React.ElementType = as ?? "span";

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
    ...(lineHeight && { lineHeight }),
    ...(letterSpacing && {
      letterSpacing: typeof letterSpacing === "number" ? `${letterSpacing}em` : letterSpacing,
    }),
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
 * Typography primitive. Renders a `span` by default, or the element given with `as`
 * (`p`, `h1`..`h6`, `label`, ...), keeping that element's props and ref types.
 */
export const Text = React.forwardRef(TextInner) as PolymorphicComponent<"span", TextOwnProps>;
Text.displayName = "Text";
