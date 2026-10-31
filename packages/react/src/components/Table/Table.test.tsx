import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";

describe("Table", () => {
  it("renders a table inside a scroll container and forwards its ref", () => {
    const ref = React.createRef<HTMLTableElement>();
    render(
      <Table ref={ref} ui={{ container: "wrap" }} aria-label="Data">
        <TableBody>
          <TableRow>
            <TableCell>cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    const table = screen.getByRole("table", { name: "Data" });
    expect(ref.current).toBe(table);
    expect(table.parentElement).toHaveClass("mild-table-container", "wrap");
    expect(table).toHaveClass("mild-table", "mild-table--simple", "mild-table--md");
  });

  it("maps cell alignment, numeric, scope and sort onto the cells", () => {
    render(
      <Table>
        <TableCaption placement="bottom">Caption</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead align="center" sort="none">
              A
            </TableHead>
            <TableHead scope="row" numeric sort="descending">
              B
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow selected={false}>
            <TableCell align="right">a</TableCell>
            <TableCell numeric>1</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>total</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    );
    expect(screen.getByText("Caption")).toHaveClass("mild-table__caption--bottom");
    const a = screen.getByRole("columnheader", { name: "A" });
    expect(a).toHaveClass("mild-table__head--center");
    expect(a).toHaveAttribute("aria-sort", "none");
    const b = screen.getByRole("rowheader", { name: "B" });
    expect(b).toHaveClass("mild-table__head--numeric");
    expect(b).toHaveAttribute("aria-sort", "descending");
    expect(screen.getByText("a")).toHaveClass("mild-table__cell--right");
    expect(screen.getByText("1")).toHaveClass("mild-table__cell--numeric");
    const row = screen.getByText("a").closest("tr")!;
    expect(row).toHaveAttribute("aria-selected", "false");
    expect(row).not.toHaveAttribute("data-selected");
    expect(screen.getByText("total").closest("tfoot")).toHaveClass("mild-table__footer");
  });
});
