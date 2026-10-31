// Grid component types. Column counts are 1-12 and may be given per breakpoint.
import type { SpaceToken, Responsive } from "./tokens";

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GridRows = 1 | 2 | 3 | 4 | 5 | 6;
export type GridFlow = "row" | "column" | "dense" | "row-dense" | "column-dense";
export type GridAlignment = "start" | "end" | "center" | "stretch";

export interface GridCoreProps {
  /** Number of equal columns (1-12), optionally per breakpoint: `{ base: 1, md: 3 }`. */
  columns?: Responsive<GridColumns>;
  /** Number of equal rows (1-6). */
  rows?: GridRows;
  /** Custom `grid-template-columns`, for layouts the `columns` scale cannot express. */
  templateColumns?: string;
  /** Custom `grid-template-rows`. */
  templateRows?: string;
  /** Gap on both axes (spacing token). */
  gap?: SpaceToken;
  /** Column gap (spacing token); overrides `gap` horizontally. */
  columnGap?: SpaceToken;
  /** Row gap (spacing token); overrides `gap` vertically. */
  rowGap?: SpaceToken;
  /** `grid-auto-flow`. */
  flow?: GridFlow;
  /** `align-items` of the cells. */
  align?: GridAlignment;
  /** `justify-items` of the cells. */
  justify?: GridAlignment;
  /** Render as `inline-grid`. */
  inline?: boolean;
}

export interface GridItemCoreProps {
  /** Columns to span (1-12 or `"full"`), optionally per breakpoint: `{ base: "full", md: 6 }`. */
  colSpan?: Responsive<GridColumns | "full">;
  /** Rows to span (1-6 or `"full"`). */
  rowSpan?: GridRows | "full";
}
