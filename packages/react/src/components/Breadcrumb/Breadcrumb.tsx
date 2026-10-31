// packages/react/src/components/Breadcrumb/Breadcrumb.tsx
import * as React from "react";
import type {
  BreadcrumbCoreProps,
  BreadcrumbItemData,
  PolymorphicComponent,
  PolymorphicProps,
} from "../../types";
import { cn } from "../../utils";
import { Link, type LinkOwnProps } from "../Link";

export interface BreadcrumbItemOwnProps {
  /** Item content, usually a `BreadcrumbLink` */
  children?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

/** Props of `<BreadcrumbItem as={T}>`. */
export type BreadcrumbItemProps<T extends React.ElementType = "li"> = PolymorphicProps<
  T,
  BreadcrumbItemOwnProps
>;

function BreadcrumbItemInner<T extends React.ElementType = "li">(
  { as, children, className, ...rest }: BreadcrumbItemProps<T>,
  ref: React.ForwardedRef<Element>,
) {
  const Component: React.ElementType = as ?? "li";

  return (
    <Component ref={ref} className={cn("mild-breadcrumb-item", className)} {...rest}>
      {children}
    </Component>
  );
}

/** One step of the trail (a list item). */
export const BreadcrumbItem = React.forwardRef(BreadcrumbItemInner) as PolymorphicComponent<
  "li",
  BreadcrumbItemOwnProps
>;
BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbLinkOwnProps extends LinkOwnProps {
  /** The current page: rendered as text with `aria-current="page"` instead of a link. */
  current?: boolean;
}

/** Props of `<BreadcrumbLink as={T}>`. */
export type BreadcrumbLinkProps<T extends React.ElementType = "a"> = PolymorphicProps<
  T,
  BreadcrumbLinkOwnProps
>;

function BreadcrumbLinkInner<T extends React.ElementType = "a">(
  { as, current = false, children, className, ...rest }: BreadcrumbLinkProps<T>,
  ref: React.ForwardedRef<Element>,
) {
  if (current) {
    // The current page is not a link: it is announced with aria-current instead.
    const Component: React.ElementType = as ?? "span";
    return (
      <Component
        ref={ref}
        className={cn("mild-breadcrumb-page", className)}
        aria-current="page"
        {...rest}
      >
        {children}
      </Component>
    );
  }

  return (
    <Link
      ref={ref as React.Ref<HTMLAnchorElement>}
      as={as as React.ElementType | undefined}
      plain
      className={cn("mild-breadcrumb-link", className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

/** A link inside a `BreadcrumbItem`; `current` renders the page name instead of a link. */
export const BreadcrumbLink = React.forwardRef(BreadcrumbLinkInner) as PolymorphicComponent<
  "a",
  BreadcrumbLinkOwnProps
>;
BreadcrumbLink.displayName = "BreadcrumbLink";

export interface BreadcrumbSeparatorProps extends React.LiHTMLAttributes<HTMLLIElement> {
  /** Separator content. Default `"/"`. */
  children?: React.ReactNode;
}

/**
 * The glyph between two items. It is decorative (`aria-hidden`), so screen readers announce
 * the trail without reading a separator between every step.
 */
export const BreadcrumbSeparator = React.forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
  ({ children = "/", className, ...rest }, ref) => (
    <li
      ref={ref}
      className={cn("mild-breadcrumb-separator", className)}
      aria-hidden="true"
      {...rest}
    >
      {children}
    </li>
  ),
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export interface BreadcrumbOwnProps extends BreadcrumbCoreProps {
  /** Items to compose yourself; ignored when `items` is given. */
  children?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Glyph between two items. Default `"/"`. */
  separator?: React.ReactNode;
  /** Class names for the inner parts. */
  ui?: {
    list?: string;
    separator?: string;
  };
}

/** Props of `<Breadcrumb as={T}>`: rendered as a `nav` by default. */
export type BreadcrumbProps<T extends React.ElementType = "nav"> = PolymorphicProps<
  T,
  BreadcrumbOwnProps
>;

function renderItem(item: BreadcrumbItemData, isLast: boolean): React.ReactElement {
  // The last step is the current page unless it links somewhere, or it says otherwise.
  const current = item.current ?? (isLast && !item.href);
  return (
    <BreadcrumbItem key={`${item.label}-${item.href ?? ""}`}>
      <BreadcrumbLink current={current} href={current ? undefined : item.href}>
        {item.label}
      </BreadcrumbLink>
    </BreadcrumbItem>
  );
}

function BreadcrumbInner<T extends React.ElementType = "nav">(
  { as, items, separator = "/", children, className, ui, ...rest }: BreadcrumbProps<T>,
  // Typed loosely here; the public signature (PolymorphicComponent) narrows it per `as`.
  ref: React.ForwardedRef<Element>,
) {
  const Component: React.ElementType = as ?? "nav";
  const steps = items
    ? items.map((item, index) => renderItem(item, index === items.length - 1))
    : React.Children.toArray(children).filter(React.isValidElement);

  return (
    <Component
      ref={ref}
      className={cn("mild-breadcrumb", className)}
      // Several navigations can share a page, so the trail names itself.
      aria-label="Breadcrumb"
      {...rest}
    >
      <ol className={cn("mild-breadcrumb__list", ui?.list)}>
        {steps.map((step, index) => (
          <React.Fragment key={step.key ?? index}>
            {index > 0 && (
              <BreadcrumbSeparator className={ui?.separator}>{separator}</BreadcrumbSeparator>
            )}
            {step}
          </React.Fragment>
        ))}
      </ol>
    </Component>
  );
}

/**
 * Trail of links to the current page (`nav > ol`), with decorative separators inserted
 * between the steps. Pass `items` for the common case, or compose `BreadcrumbItem` /
 * `BreadcrumbLink` children yourself.
 */
export const Breadcrumb = React.forwardRef(BreadcrumbInner) as PolymorphicComponent<
  "nav",
  BreadcrumbOwnProps
>;
Breadcrumb.displayName = "Breadcrumb";
