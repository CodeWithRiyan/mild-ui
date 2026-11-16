// packages/react/src/components/Nav/Nav.tsx
// Server-safe on purpose (no hooks, no "use client"): a nav is plain markup.
import * as React from "react";
import { cn } from "../../utils";

export type NavVariant = "pills" | "underline" | "plain";
export type NavOrientation = "horizontal" | "vertical";

const DEFAULT_NAV_LABEL = "Main";

export interface NavProps extends React.ComponentPropsWithoutRef<"nav"> {
  /** Look of the links. Default `"plain"`. */
  variant?: NavVariant;
  /** Direction of the list. Default `"horizontal"`. */
  orientation?: NavOrientation;
  /** Class name of the inner `ul`. */
  listClassName?: string;
}

/**
 * Site or section navigation (`nav > ul > li > a`). Links are plain links in the normal Tab
 * order: this is not a tablist, so there is no roving tabindex and no arrow-key handling.
 * Horizontal navs scroll sideways on narrow screens instead of wrapping.
 */
export const Nav = React.forwardRef<HTMLElement, NavProps>(
  (
    {
      variant = "plain",
      orientation = "horizontal",
      className,
      listClassName,
      children,
      "aria-label": ariaLabel = DEFAULT_NAV_LABEL,
      ...rest
    },
    ref,
  ) => (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={cn("mild-nav", `mild-nav--${variant}`, `mild-nav--${orientation}`, className)}
      {...rest}
    >
      <ul className={cn("mild-nav__list", listClassName)}>{children}</ul>
    </nav>
  ),
);
Nav.displayName = "Nav";

export type NavItemProps = React.ComponentPropsWithoutRef<"li">;

/** One entry of the list (an `li`); holds a `NavLink`. */
export const NavItem = React.forwardRef<HTMLLIElement, NavItemProps>(
  ({ className, ...rest }, ref) => (
    <li ref={ref} className={cn("mild-nav-item", className)} {...rest} />
  ),
);
NavItem.displayName = "NavItem";

export interface NavLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  /** The link to the current page: gets `aria-current="page"` and the active style. */
  active?: boolean;
  /** Renders inert text (`aria-disabled`) instead of a link. */
  disabled?: boolean;
  /** Merge the props into the single child (a router link) instead of rendering an `a`. */
  asChild?: boolean;
}

/** The ref a consumer put on the child element (a prop in React 19, `element.ref` before). */
function getElementRef(element: React.ReactElement): React.Ref<unknown> | null {
  const isReact19 = Number(React.version.split(".")[0]) >= 19;
  if (isReact19) return (element.props as { ref?: React.Ref<unknown> }).ref ?? null;
  return (element as { ref?: React.Ref<unknown> }).ref ?? null;
}

function assignRef(ref: React.Ref<unknown> | null | undefined, value: unknown): void {
  if (typeof ref === "function") ref(value);
  else if (ref) (ref as { current: unknown }).current = value;
}

type ChildProps = { className?: string; onClick?: React.MouseEventHandler };

function renderAsChild(
  child: React.ReactElement<ChildProps>,
  slotProps: React.ComponentPropsWithoutRef<"a">,
  forwardedRef: React.ForwardedRef<HTMLElement>,
): React.ReactElement {
  const childRef = getElementRef(child);
  const ref = (element: HTMLElement | null) => {
    assignRef(forwardedRef, element);
    assignRef(childRef, element);
  };
  const { className, onClick, ...slotRest } = slotProps;
  const childOnClick = child.props.onClick;
  const composedOnClick: React.MouseEventHandler = (event) => {
    childOnClick?.(event);
    if (!event.defaultPrevented) onClick?.(event as React.MouseEvent<HTMLAnchorElement>);
  };
  return React.cloneElement(child, {
    ...slotRest,
    ...child.props,
    ref,
    className: cn(className, child.props.className),
    onClick: composedOnClick,
  } as React.Attributes);
}

/**
 * A link of the nav. `active` marks the current page (`aria-current="page"` on this link
 * only); `disabled` renders a `span` so nothing focusable or clickable is left; `asChild`
 * lets a router link (e.g. Next.js `Link`) take over the element while keeping the props.
 */
export const NavLink = React.forwardRef<HTMLElement, NavLinkProps>(
  ({ active = false, disabled = false, asChild = false, className, children, ...rest }, ref) => {
    const classes = cn(
      "mild-nav-link",
      active && !disabled && "mild-nav-link--active",
      disabled && "mild-nav-link--disabled",
      className,
    );

    if (disabled) {
      // An `a` without href is not focusable, but a span also drops the link role entirely.
      const { href: _href, target: _target, rel: _rel, onClick: _onClick, ...textProps } = rest;
      const label =
        asChild && React.isValidElement<{ children?: React.ReactNode }>(children)
          ? children.props.children
          : children;
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={classes}
          aria-disabled="true"
          {...(textProps as React.ComponentPropsWithoutRef<"span">)}
        >
          {label}
        </span>
      );
    }

    const linkProps = {
      ...rest,
      className: classes,
      "aria-current": active ? ("page" as const) : undefined,
    };
    if (asChild && React.isValidElement<ChildProps>(children)) {
      return renderAsChild(children, linkProps, ref);
    }
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} {...linkProps}>
        {children}
      </a>
    );
  },
);
NavLink.displayName = "NavLink";
