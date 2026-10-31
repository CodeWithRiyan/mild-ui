// packages/react/src/components/Link/Link.tsx
import * as React from "react";
import type { LinkCoreProps, PolymorphicComponent, PolymorphicProps } from "../../types";
import { cn } from "../../utils";

export interface LinkOwnProps extends LinkCoreProps {
  /** Link content */
  children?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

/** Props of `<Link as={T}>`: the link props plus everything `T` accepts. */
export type LinkProps<T extends React.ElementType = "a"> = PolymorphicProps<T, LinkOwnProps>;

function LinkInner<T extends React.ElementType = "a">(
  {
    as,
    href,
    underline = "hover",
    external = false,
    plain = false,
    disabled = false,
    children,
    className,
    onClick,
    ...rest
  }: LinkProps<T>,
  // Typed loosely here; the public signature (PolymorphicComponent) narrows it per `as`.
  ref: React.ForwardedRef<Element>,
) {
  const Component: React.ElementType = as ?? "a";
  const classes = cn(
    "mild-link",
    `mild-link--underline-${underline}`,
    plain && "mild-link--plain",
    disabled && "mild-link--disabled",
    className,
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    (onClick as ((event: React.MouseEvent<HTMLElement>) => void) | undefined)?.(event);
  };

  // A disabled link keeps its role but is inert: no href, out of the tab order, clicks swallowed.
  const state = disabled
    ? { "aria-disabled": true as const, tabIndex: -1, role: "link" }
    : { href };

  // `external` fills in the usual target/rel pair unless the caller set them.
  const target = external ? { target: "_blank", rel: "noopener noreferrer" } : undefined;

  return (
    <Component ref={ref} className={classes} {...target} {...state} {...rest} onClick={handleClick}>
      {children}
    </Component>
  );
}

/**
 * Navigational link. Renders an `a`; pass `as` to use a router link
 * (`<Link as={RouterLink} to="/docs">`). `external` adds `target="_blank"` with a safe `rel`,
 * and `disabled` makes it inert while keeping the link role.
 */
export const Link = React.forwardRef(LinkInner) as PolymorphicComponent<"a", LinkOwnProps>;
Link.displayName = "Link";
