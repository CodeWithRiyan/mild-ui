// packages/react/src/components/Table/Table.tsx
import * as React from "react";
import type { TableCellCoreProps, TableCoreProps, TableSortDirection } from "../../types";
import { cn } from "../../utils";

export interface TableProps extends TableCoreProps, React.TableHTMLAttributes<HTMLTableElement> {
  children?: React.ReactNode;
  /** Class names for the inner parts. */
  ui?: {
    /** The scroll container around the table. */
    container?: string;
  };
}

/**
 * Data table (`<table>`) in a horizontally scrolling container. Compose with `TableCaption`,
 * `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead` and `TableCell`; see
 * `DataTable` for the data-driven version with sorting and selection.
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      variant = "simple",
      size = "md",
      hoverable = false,
      stickyHeader = false,
      ui,
      className,
      children,
      ...rest
    },
    ref,
  ) => (
    <div
      className={cn("mild-table-container", ui?.container)}
      data-sticky-header={stickyHeader ? "" : undefined}
    >
      <table
        ref={ref}
        className={cn(
          "mild-table",
          `mild-table--${variant}`,
          `mild-table--${size}`,
          hoverable && "mild-table--hoverable",
          stickyHeader && "mild-table--sticky-header",
          className,
        )}
        {...rest}
      >
        {children}
      </table>
    </div>
  ),
);
Table.displayName = "Table";

export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
  /** Where the caption sits. Default `"top"`. */
  placement?: "top" | "bottom";
}

/** The table's title, and its accessible name. */
export const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ placement = "top", className, ...rest }, ref) => (
    <caption
      ref={ref}
      className={cn(
        "mild-table__caption",
        placement === "bottom" && "mild-table__caption--bottom",
        className,
      )}
      {...rest}
    />
  ),
);
TableCaption.displayName = "TableCaption";

export type TableSectionProps = React.HTMLAttributes<HTMLTableSectionElement>;

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableSectionProps>(
  ({ className, ...rest }, ref) => (
    <thead ref={ref} className={cn("mild-table__header", className)} {...rest} />
  ),
);
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableSectionProps>(
  ({ className, ...rest }, ref) => (
    <tbody ref={ref} className={cn("mild-table__body", className)} {...rest} />
  ),
);
TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef<HTMLTableSectionElement, TableSectionProps>(
  ({ className, ...rest }, ref) => (
    <tfoot ref={ref} className={cn("mild-table__footer", className)} {...rest} />
  ),
);
TableFooter.displayName = "TableFooter";

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Marks the row as selected (`aria-selected`). */
  selected?: boolean;
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ selected, className, ...rest }, ref) => (
    <tr
      ref={ref}
      className={cn("mild-table__row", className)}
      aria-selected={selected === undefined ? undefined : selected}
      data-selected={selected ? "" : undefined}
      {...rest}
    />
  ),
);
TableRow.displayName = "TableRow";

export interface TableHeadProps
  extends TableCellCoreProps, Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "align"> {
  /** Current sort of this column (`aria-sort`); `"none"` marks it sortable but unsorted. */
  sort?: TableSortDirection | "none";
}

/** A header cell (`<th scope="col">`). */
export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ align, numeric = false, sort, scope = "col", className, ...rest }, ref) => (
    <th
      ref={ref}
      scope={scope}
      aria-sort={sort}
      className={cn(
        "mild-table__head",
        align && `mild-table__head--${align}`,
        numeric && "mild-table__head--numeric",
        className,
      )}
      {...rest}
    />
  ),
);
TableHead.displayName = "TableHead";

export interface TableCellProps
  extends TableCellCoreProps, Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "align"> {}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ align, numeric = false, className, ...rest }, ref) => (
    <td
      ref={ref}
      className={cn(
        "mild-table__cell",
        align && `mild-table__cell--${align}`,
        numeric && "mild-table__cell--numeric",
        className,
      )}
      {...rest}
    />
  ),
);
TableCell.displayName = "TableCell";
