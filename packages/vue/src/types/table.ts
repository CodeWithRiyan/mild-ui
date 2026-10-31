// packages/vue/src/types/table.ts
// Table / DataTable component types.
import type { VNodeChild } from "vue";

export type TableVariant = "simple" | "striped" | "outline";
export type TableSize = "sm" | "md" | "lg";
export type TableAlign = "left" | "center" | "right";
export type TableSortDirection = "ascending" | "descending";

export interface TableCoreProps {
  /** Visual style. Default `"simple"`. */
  variant?: TableVariant;
  /** Cell padding. Default `"md"`. */
  size?: TableSize;
  /** Highlight body rows on hover. */
  hoverable?: boolean;
  /** Keep the header row visible while the container scrolls. */
  stickyHeader?: boolean;
}

export interface TableUiClasses {
  /** The scroll container around the table. */
  container?: string;
}

export interface TableProps extends TableCoreProps {
  ui?: TableUiClasses;
}

export interface TableCaptionProps {
  /** Where the caption sits. Default `"top"`. */
  placement?: "top" | "bottom";
}

export interface TableRowProps {
  /** Marks the row as selected (`aria-selected`). */
  selected?: boolean;
}

export interface TableCellCoreProps {
  /** Horizontal alignment. */
  align?: TableAlign;
  /** Right-aligned tabular figures. */
  numeric?: boolean;
}

export interface TableHeadProps extends TableCellCoreProps {
  /** Current sort of this column (`aria-sort`); `"none"` marks it sortable but unsorted. */
  sort?: TableSortDirection | "none";
  /** Default `"col"`. */
  scope?: "col" | "row" | "colgroup" | "rowgroup";
}

export type TableCellProps = TableCellCoreProps;

export type DataTableRow = Record<string, unknown>;

export interface DataTableColumn<Row = DataTableRow> {
  /** Property of the row this column shows (and sorts by, unless `sortValue` is given). */
  key: string;
  /** Header text; also the accessible name of the sort button. */
  header: string;
  align?: TableAlign;
  numeric?: boolean;
  /** Renders a sort button in the header. */
  sortable?: boolean;
  /** Value to sort by instead of `row[key]`. */
  sortValue?: (row: Row) => string | number | null | undefined;
  /** CSS width of the column. */
  width?: string;
}

export interface DataTableSort {
  key: string;
  direction: TableSortDirection;
}

export interface DataTableUiClasses extends TableUiClasses {
  row?: string;
  head?: string;
  cell?: string;
}

export interface DataTableProps<Row = DataTableRow> extends TableCoreProps {
  columns: DataTableColumn<Row>[];
  rows: Row[];
  /** Row property used as the stable key (default `"id"`, else the index), or a function. */
  rowKey?: string | ((row: Row, index: number) => string);
  /** Table caption: the table's accessible name. */
  caption?: string;
  /** `v-model:sort`: controlled sort. */
  sort?: DataTableSort | null;
  /** Initial sort when uncontrolled. */
  defaultSort?: DataTableSort | null;
  /** Render a checkbox per row and a select-all header. */
  selectable?: boolean;
  /** `v-model:selectedKeys`: controlled selection (row keys). */
  selectedKeys?: string[];
  /** Initial selection when uncontrolled. */
  defaultSelectedKeys?: string[];
  /** Accessible name of a row's checkbox. Default `"Select row N"`. */
  selectionLabel?: (row: Row, index: number) => string;
  /** Accessible name of the select-all checkbox. Default `"Select all rows"`. */
  selectAllLabel?: string;
  /** Shown across every column when there are no rows. Default `"No data"`. */
  emptyMessage?: string;
  /** Announces the table as busy and shows `loadingMessage` instead of the rows. */
  loading?: boolean;
  /** Default `"Loading..."`. */
  loadingMessage?: string;
  /** Custom cell renderer; the default prints `row[key]`. The `cell` slot is an alternative. */
  renderCell?: (row: Row, column: DataTableColumn<Row>, index: number) => VNodeChild;
  ui?: DataTableUiClasses;
}
