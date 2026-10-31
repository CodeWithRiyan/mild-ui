// Sorting helpers shared by the DataTable implementations.
import type { DataTableColumn, DataTableSort } from "../types/table";

/** The value a column sorts by: `sortValue(row)`, else `row[key]`. */
export function sortValueOf<Row>(column: DataTableColumn<Row>, row: Row): unknown {
  if (column.sortValue) return column.sortValue(row);
  return (row as Record<string, unknown>)[column.key];
}

/** Numbers numerically, everything else as localized strings; nullish values sort last. */
export function compareSortValues(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
}

/** A copy of `rows` ordered by `sort`, or `rows` itself when there is nothing to sort by. */
export function sortRows<Row>(
  rows: Row[],
  columns: DataTableColumn<Row>[],
  sort: DataTableSort | null | undefined,
): Row[] {
  if (!sort) return rows;
  const column = columns.find((candidate) => candidate.key === sort.key);
  if (!column) return rows;
  const sign = sort.direction === "descending" ? -1 : 1;
  return rows
    .map((row, index) => ({ row, index }))
    .sort((left, right) => {
      const order = compareSortValues(
        sortValueOf(column, left.row),
        sortValueOf(column, right.row),
      );
      // Stable: equal values keep their original order.
      return order === 0 ? left.index - right.index : order * sign;
    })
    .map((entry) => entry.row);
}

/** The sort after activating a column: ascending first, then the opposite direction. */
export function nextSort(current: DataTableSort | null | undefined, key: string): DataTableSort {
  if (current?.key !== key) return { key, direction: "ascending" };
  return { key, direction: current.direction === "ascending" ? "descending" : "ascending" };
}
