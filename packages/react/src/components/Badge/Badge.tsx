// packages/react/src/components/Badge/Badge.tsx
import * as React from "react";
import type { BadgeCoreProps, PolymorphicComponent, PolymorphicProps } from "../../types";
import { cn } from "../../utils";

export interface BadgeOwnProps extends BadgeCoreProps {
  children?: React.ReactNode;
  className?: string;
}

/** Props of `<Badge as={T}>`. */
export type BadgeProps<T extends React.ElementType = "span"> = PolymorphicProps<T, BadgeOwnProps>;

function BadgeInner<T extends React.ElementType = "span">(
  {
    as,
    variant = "subtle",
    colorScheme = "gray",
    size = "md",
    pill = false,
    dot = false,
    className,
    children,
    ...rest
  }: BadgeProps<T>,
  // Typed loosely here; the public signature (PolymorphicComponent) narrows it per `as`.
  ref: React.ForwardedRef<Element>,
) {
  const Component: React.ElementType = as ?? "span";
  return (
    <Component
      ref={ref}
      className={cn(
        "mild-badge",
        `mild-badge--${variant}`,
        `mild-badge--${colorScheme}`,
        `mild-badge--${size}`,
        pill && "mild-badge--pill",
        className,
      )}
      {...rest}
    >
      {dot && <span className="mild-badge__dot" aria-hidden="true" />}
      {children}
    </Component>
  );
}

/** Small inline status label ("NEW", "BETA", a count). Static text: it has no role of its own. */
export const Badge = React.forwardRef(BadgeInner) as PolymorphicComponent<"span", BadgeOwnProps>;
Badge.displayName = "Badge";
