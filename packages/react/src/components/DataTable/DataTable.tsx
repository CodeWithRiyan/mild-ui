"use client";

// packages/react/src/components/DataTable/DataTable.tsx
//
// Data-driven table: `columns` + `rows` in, a `Table` out, with client-side sorting (APG
// "Sortable Table": `aria-sort` on the header cell, a real button inside it) and optional row
// selection through the primitives-driven `Checkbox`.
import * as React from "react";
import type { DataTableCoreProps, DataTableSort } from "../../types";
import { cn, nextSort, sortRows } from "../../utils";
import { Checkbox } from "../Checkbox";
import { Spinner } from "../Spinner";
import { ArrowUpIcon } from "../icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Table";

export interface DataTableProps<Row>
  extends
    DataTableCoreProps<Row>,
    Omit<React.TableHTMLAttributes<HTMLTableElement>, "rows" | "summary"> {
  /** Custom cell renderers by column key; the default prints `row[key]`. */
  renderCell?: (
    row: Row,
    column: DataTableCoreProps<Row>["columns"][number],
    index: number,
  ) => React.ReactNode;
  /** Class names for the inner parts. */
  ui?: {
    container?: string;
    row?: string;
    head?: string;
    cell?: string;
  };
}

function defaultRowKey<Row>(row: Row, index: number): string {
  const id = (row as { id?: unknown }).id;
  return id === undefined || id === null ? String(index) : String(id);
}

function DataTableInner<Row>(
  {
    columns,
    rows,
    rowKey = defaultRowKey,
    caption,
    sort: sortProp,
    defaultSort = null,
    onSortChange,
    selectable = false,
    selectedKeys: selectedProp,
    defaultSelectedKeys = [],
    onSelectionChange,
    selectionLabel = (_row, index) => `Select row ${index + 1}`,
    selectAllLabel = "Select all rows",
    emptyMessage = "No data",
    loading = false,
    loadingMessage = "Loading...",
    renderCell,
    ui,
    className,
    ...tableProps
  }: DataTableProps<Row> & {
    onSortChange?: (sort: DataTableSort) => void;
    onSelectionChange?: (keys: string[]) => void;
  },
  ref: React.ForwardedRef<HTMLTableElement>,
) {
  const keyOf = (row: Row, index: number) =>
    typeof rowKey === "function"
      ? rowKey(row, index)
      : String((row as Record<string, unknown>)[rowKey] ?? index);

  const sortControlled = sortProp !== undefined;
  const [internalSort, setInternalSort] = React.useState<DataTableSort | null>(defaultSort);
  const sort = sortControlled ? sortProp : internalSort;

  const selectionControlled = selectedProp !== undefined;
  const [internalSelected, setInternalSelected] = React.useState<string[]>(defaultSelectedKeys);
  const selected = selectionControlled ? selectedProp : internalSelected;

  const sorted = React.useMemo(() => sortRows(rows, columns, sort), [rows, columns, sort]);
  const keys = React.useMemo(() => rows.map(keyOf), [rows, rowKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const allSelected = keys.length > 0 && keys.every((key) => selected.includes(key));
  const someSelected = keys.some((key) => selected.includes(key));

  const changeSort = (key: string) => {
    const next = nextSort(sort, key);
    if (!sortControlled) setInternalSort(next);
    onSortChange?.(next);
  };

  const changeSelection = (next: string[]) => {
    if (!selectionControlled) setInternalSelected(next);
    onSelectionChange?.(next);
  };

  const toggleRow = (key: string, checked: boolean) =>
    changeSelection(checked ? [...selected, key] : selected.filter((entry) => entry !== key));

  const toggleAll = (checked: boolean) => changeSelection(checked ? keys : []);

  const columnCount = columns.length + (selectable ? 1 : 0);

  return (
    <div className="mild-data-table" aria-busy={loading || undefined}>
      <Table ref={ref} className={className} ui={{ container: ui?.container }} {...tableProps}>
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow className={ui?.row}>
            {selectable && (
              <TableHead className={cn("mild-table__selection", ui?.head)}>
                <Checkbox
                  aria-label={selectAllLabel}
                  checked={allSelected ? true : someSelected ? "indeterminate" : false}
                  disabled={keys.length === 0}
                  onCheckedChange={(checked) => toggleAll(checked === true)}
                />
              </TableHead>
            )}
            {columns.map((column) => {
              const active = sort?.key === column.key;
              return (
                <TableHead
                  key={column.key}
                  align={column.align}
                  numeric={column.numeric}
                  sort={column.sortable ? (active ? sort.direction : "none") : undefined}
                  style={column.width ? { width: column.width } : undefined}
                  className={ui?.head}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      className="mild-table__sort"
                      onClick={() => changeSort(column.key)}
                    >
                      {column.header}
                      <span
                        className="mild-table__sort-icon"
                        data-direction={active ? sort.direction : "none"}
                        aria-hidden="true"
                      >
                        <ArrowUpIcon />
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columnCount} className="mild-data-table__empty">
                <Spinner size="sm" label={loadingMessage} />
              </TableCell>
            </TableRow>
          ) : sorted.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columnCount} className="mild-data-table__empty">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            sorted.map((row) => {
              const index = rows.indexOf(row);
              const key = keyOf(row, index);
              const isSelected = selected.includes(key);
              return (
                <TableRow
                  key={key}
                  selected={selectable ? isSelected : undefined}
                  className={ui?.row}
                >
                  {selectable && (
                    <TableCell className={cn("mild-table__selection", ui?.cell)}>
                      <Checkbox
                        aria-label={selectionLabel(row, index)}
                        checked={isSelected}
                        onCheckedChange={(checked) => toggleRow(key, checked === true)}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      align={column.align}
                      numeric={column.numeric}
                      className={ui?.cell}
                    >
                      {renderCell
                        ? renderCell(row, column, index)
                        : String((row as Record<string, unknown>)[column.key] ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}

/**
 * Table rendered from `columns` and `rows`. Sortable columns get a button in their header and
 * announce the direction through `aria-sort`; `selectable` adds a checkbox per row (and a
 * select-all header) and marks selected rows with `aria-selected`. Both sort and selection can
 * be controlled (`sort` / `selectedKeys`) or left to the component.
 */
export const DataTable = React.forwardRef(DataTableInner) as <Row>(
  props: DataTableProps<Row> & {
    onSortChange?: (sort: DataTableSort) => void;
    onSelectionChange?: (keys: string[]) => void;
    ref?: React.Ref<HTMLTableElement>;
  },
) => React.ReactElement;
(DataTable as unknown as { displayName: string }).displayName = "DataTable";
