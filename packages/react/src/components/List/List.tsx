// packages/react/src/components/List/List.tsx
import * as React from "react";
import type { ListCoreProps, PolymorphicComponent, PolymorphicProps } from "../../types";
import { cn, getSpacingValue } from "../../utils";

export interface ListOwnProps extends ListCoreProps {
  /** `ListItem` children */
  children?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

/** Props of `<List as={T}>`. */
export type ListProps<T extends React.ElementType = "ul"> = PolymorphicProps<T, ListOwnProps>;

function ListInner<T extends React.ElementType = "ul">(
  {
    as,
    ordered = false,
    marker,
    unstyled = false,
    spacing,
    children,
    className,
    style,
    ...rest
  }: ListProps<T>,
  // Typed loosely here; the public signature (PolymorphicComponent) narrows it per `as`.
  ref: React.ForwardedRef<Element>,
) {
  const Component: React.ElementType = as ?? (ordered ? "ol" : "ul");
  const markerType = marker ?? (ordered ? "decimal" : undefined);
  const classes = cn(
    "mild-list",
    unstyled && "mild-list--unstyled",
    !unstyled && markerType && `mild-list--marker-${markerType}`,
    className,
  );
  const inlineStyle = {
    ...(spacing && { "--mild-list-spacing": getSpacingValue(spacing) }),
    ...style,
  } as React.CSSProperties;

  return (
    <Component
      ref={ref}
      className={classes}
      style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
      {...rest}
    >
      {children}
    </Component>
  );
}

/**
 * Bulleted or numbered list. `ordered` renders an `ol` (numbered), `unstyled` drops the marker
 * and the indentation, and `spacing` takes a spacing token for the gap between items.
 */
export const List = React.forwardRef(ListInner) as PolymorphicComponent<"ul", ListOwnProps>;
List.displayName = "List";

export interface ListItemOwnProps {
  /** Item content */
  children?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Icon shown instead of the list marker. */
  icon?: React.ReactNode;
}

/** Props of `<ListItem as={T}>`. */
export type ListItemProps<T extends React.ElementType = "li"> = PolymorphicProps<
  T,
  ListItemOwnProps
>;

function ListItemInner<T extends React.ElementType = "li">(
  { as, icon, children, className, ...rest }: ListItemProps<T>,
  ref: React.ForwardedRef<Element>,
) {
  const Component: React.ElementType = as ?? "li";

  return (
    <Component ref={ref} className={cn("mild-list-item", className)} {...rest}>
      {icon !== undefined && icon !== null && (
        // Decorative: the item's text carries the meaning.
        <span className="mild-list-item__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </Component>
  );
}

/** A `List` item. Give it an `icon` to replace the marker with a glyph. */
export const ListItem = React.forwardRef(ListItemInner) as PolymorphicComponent<
  "li",
  ListItemOwnProps
>;
ListItem.displayName = "ListItem";
