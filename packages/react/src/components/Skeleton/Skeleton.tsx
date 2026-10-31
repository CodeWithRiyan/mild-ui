// packages/react/src/components/Skeleton/Skeleton.tsx
import * as React from "react";
import type { SkeletonCoreProps } from "../../types";
import { cn, getDimensionValue } from "../../utils";

export interface SkeletonProps extends SkeletonCoreProps, React.HTMLAttributes<HTMLDivElement> {
  /** The real content, rendered once `loaded`. */
  children?: React.ReactNode;
}

/**
 * Placeholder shape shown while content loads. Hidden from assistive technology (the
 * surrounding region should announce loading, e.g. with `aria-busy`); renders `children`
 * once `loaded`.
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "rect",
      animation = "pulse",
      width,
      height,
      loaded = false,
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    if (loaded) return <>{children}</>;
    const inlineStyle: React.CSSProperties = {
      ...(width && { width: getDimensionValue(width) }),
      ...(height && { height: getDimensionValue(height) }),
      ...style,
    };
    return (
      <div
        ref={ref}
        aria-hidden="true"
        data-loading=""
        className={cn(
          "mild-skeleton",
          `mild-skeleton--${variant}`,
          `mild-skeleton--${animation}`,
          className,
        )}
        style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
Skeleton.displayName = "Skeleton";

export interface SkeletonTextProps extends Omit<SkeletonProps, "variant"> {
  /** Number of lines. Default `3`. */
  lines?: number;
}

/** A paragraph placeholder: `lines` text skeletons, the last one shorter. */
export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ lines = 3, loaded = false, children, className, animation, width, ...rest }, ref) => {
    if (loaded) return <>{children}</>;
    return (
      <div ref={ref} aria-hidden="true" className={cn("mild-skeleton-text", className)} {...rest}>
        {Array.from({ length: lines }, (_, index) => (
          <Skeleton key={index} variant="text" animation={animation} width={width} />
        ))}
      </div>
    );
  },
);
SkeletonText.displayName = "SkeletonText";
