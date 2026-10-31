// packages/react/src/components/Grid/Grid.tsx
import * as React from "react";
import type {
  GridCoreProps,
  GridItemCoreProps,
  PolymorphicComponent,
  PolymorphicProps,
} from "../../types";
import { cn, getSpacingValue, responsiveClasses } from "../../utils";

export interface GridOwnProps extends GridCoreProps {
  /** Grid content */
  children?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

/** Props of `<Grid as={T}>`: the layout props plus everything `T` accepts. */
export type GridProps<T extends React.ElementType = "div"> = PolymorphicProps<T, GridOwnProps>;

function GridInner<T extends React.ElementType = "div">(
  {
    as,
    columns,
    rows,
    templateColumns,
    templateRows,
    gap,
    columnGap,
    rowGap,
    flow,
    align,
    justify,
    inline = false,
    children,
    className,
    style,
    ...rest
  }: GridProps<T>,
  // Typed loosely here; the public signature (PolymorphicComponent) narrows it per `as`.
  ref: React.ForwardedRef<Element>,
) {
  const Component: React.ElementType = as ?? "div";
  const classes = cn(
    "mild-grid",
    inline && "mild-grid--inline",
    ...responsiveClasses(columns, (count, bp) =>
      bp ? `mild-grid--${bp}-cols-${count}` : `mild-grid--cols-${count}`,
    ),
    rows && `mild-grid--rows-${rows}`,
    flow && `mild-grid--flow-${flow}`,
    align && `mild-grid--items-${align}`,
    justify && `mild-grid--justify-${justify}`,
    className,
  );
  const inlineStyle: React.CSSProperties = {
    ...(templateColumns && { gridTemplateColumns: templateColumns }),
    ...(templateRows && { gridTemplateRows: templateRows }),
    ...(gap && { gap: getSpacingValue(gap) }),
    ...(columnGap && { columnGap: getSpacingValue(columnGap) }),
    ...(rowGap && { rowGap: getSpacingValue(rowGap) }),
    ...style,
  };

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
 * CSS grid with 1-12 equal columns (`columns`, per breakpoint if needed) or a custom template.
 * Renders a `div`, or the element given with `as`. Place children with `GridItem` to span
 * columns or rows.
 */
export const Grid = React.forwardRef(GridInner) as PolymorphicComponent<"div", GridOwnProps>;
Grid.displayName = "Grid";

export interface GridItemOwnProps extends GridItemCoreProps {
  /** Item content */
  children?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

/** Props of `<GridItem as={T}>`. */
export type GridItemProps<T extends React.ElementType = "div"> = PolymorphicProps<
  T,
  GridItemOwnProps
>;

function GridItemInner<T extends React.ElementType = "div">(
  { as, colSpan, rowSpan, children, className, ...rest }: GridItemProps<T>,
  ref: React.ForwardedRef<Element>,
) {
  const Component: React.ElementType = as ?? "div";
  const classes = cn(
    "mild-grid-item",
    ...responsiveClasses(colSpan, (span, bp) =>
      bp ? `mild-grid-item--${bp}-col-span-${span}` : `mild-grid-item--col-span-${span}`,
    ),
    rowSpan && `mild-grid-item--row-span-${rowSpan}`,
    className,
  );

  return (
    <Component ref={ref} className={classes} {...rest}>
      {children}
    </Component>
  );
}

/** A `Grid` child that spans columns (`colSpan`, per breakpoint if needed) and/or rows. */
export const GridItem = React.forwardRef(GridItemInner) as PolymorphicComponent<
  "div",
  GridItemOwnProps
>;
GridItem.displayName = "GridItem";
