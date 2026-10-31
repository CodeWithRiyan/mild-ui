// packages/react/src/components/Code/Code.tsx
import * as React from "react";
import type { CodeCoreProps, PolymorphicComponent, PolymorphicProps } from "../../types";
import { cn } from "../../utils";

export interface CodeOwnProps extends CodeCoreProps {
  /** Code content */
  children?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

/** Props of `<Code as={T}>`. */
export type CodeProps<T extends React.ElementType = "code"> = PolymorphicProps<T, CodeOwnProps>;

function CodeInner<T extends React.ElementType = "code">(
  {
    as,
    variant = "subtle",
    size = "md",
    block = false,
    children,
    className,
    ...rest
  }: CodeProps<T>,
  // Typed loosely here; the public signature (PolymorphicComponent) narrows it per `as`.
  ref: React.ForwardedRef<Element>,
) {
  const Component: React.ElementType = as ?? "code";
  const classes = cn(
    "mild-code",
    `mild-code--${variant}`,
    `mild-code--${size}`,
    block && "mild-code--block",
    className,
  );

  return (
    <Component ref={ref} className={classes} {...rest}>
      {children}
    </Component>
  );
}

/**
 * Inline code. `block` keeps the whitespace and scrolls horizontally instead; pair it with
 * `as="pre"` for a real code block.
 */
export const Code = React.forwardRef(CodeInner) as PolymorphicComponent<"code", CodeOwnProps>;
Code.displayName = "Code";
