import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DataTable } from "./DataTable";
import { compareSortValues, nextSort, sortRows } from "../../utils";

interface Invoice {
  id: string;
  customer: string;
  status: string;
  amount: number;
}

const columns = [
  { key: "customer", header: "Customer", sortable: true },
  { key: "status", header: "Status" },
  { key: "amount", header: "Amount", numeric: true, sortable: true, width: "8rem" },
];

const rows: Invoice[] = [
  { id: "inv-1", customer: "Ada Lovelace", status: "Paid", amount: 250 },
  { id: "inv-2", customer: "Grace Hopper", status: "Pending", amount: 125 },
  { id: "inv-3", customer: "Alan Turing", status: "Paid", amount: 400 },
];

const firstColumn = () =>
  screen
    .getAllByRole("row")
    .slice(1)
    .map((row) => within(row).getAllByRole("cell")[0].textContent);

describe("DataTable (APG sortable table)", () => {
  it("renders the columns and rows, with a sort button only on sortable headers", () => {
    const ref = React.createRef<HTMLTableElement>();
    render(<DataTable ref={ref} columns={columns} rows={rows} caption="Invoices" />);
    const table = screen.getByRole("table", { name: "Invoices" });
    expect(ref.current).toBe(table);
    expect(screen.getAllByRole("columnheader")).toHaveLength(3);
    expect(screen.getByRole("columnheader", { name: "Customer" })).toHaveAttribute(
      "aria-sort",
      "none",
    );
    expect(screen.getByRole("columnheader", { name: "Status" })).not.toHaveAttribute("aria-sort");
    expect(screen.getAllByRole("button")).toHaveLength(2);
    expect(screen.getByRole("columnheader", { name: "Amount" })).toHaveStyle({ width: "8rem" });
    expect(firstColumn()).toEqual(["Ada Lovelace", "Grace Hopper", "Alan Turing"]);
  });

  it("sorts on activation: ascending first, then the other way, and announces it", () => {
    const onSortChange = vi.fn();
    render(<DataTable columns={columns} rows={rows} onSortChange={onSortChange} />);
    const amount = screen.getByRole("columnheader", { name: "Amount" });
    const button = within(amount).getByRole("button");

    fireEvent.click(button);
    expect(amount).toHaveAttribute("aria-sort", "ascending");
    expect(onSortChange).toHaveBeenLastCalledWith({ key: "amount", direction: "ascending" });
    expect(firstColumn()).toEqual(["Grace Hopper", "Ada Lovelace", "Alan Turing"]);

    fireEvent.click(button);
    expect(amount).toHaveAttribute("aria-sort", "descending");
    expect(firstColumn()).toEqual(["Alan Turing", "Ada Lovelace", "Grace Hopper"]);

    // Switching column starts ascending again; the previous header goes back to none.
    fireEvent.click(
      within(screen.getByRole("columnheader", { name: "Customer" })).getByRole("button"),
    );
    expect(amount).toHaveAttribute("aria-sort", "none");
    expect(firstColumn()).toEqual(["Ada Lovelace", "Alan Turing", "Grace Hopper"]);
  });

  it("follows a controlled sort and a custom sort value", () => {
    const byLength = [
      {
        key: "customer",
        header: "Customer",
        sortable: true,
        sortValue: (row: Invoice) => row.customer.length,
      },
    ];
    const { rerender } = render(
      <DataTable
        columns={byLength}
        rows={rows}
        sort={{ key: "customer", direction: "ascending" }}
      />,
    );
    expect(firstColumn()).toEqual(["Alan Turing", "Ada Lovelace", "Grace Hopper"]);
    fireEvent.click(screen.getByRole("button"));
    // Controlled: nothing changes until the parent does it.
    expect(firstColumn()).toEqual(["Alan Turing", "Ada Lovelace", "Grace Hopper"]);
    rerender(
      <DataTable
        columns={byLength}
        rows={rows}
        sort={{ key: "customer", direction: "descending" }}
      />,
    );
    expect(firstColumn()).toEqual(["Ada Lovelace", "Grace Hopper", "Alan Turing"]);
  });

  it("selects rows through checkboxes and the select-all header", () => {
    const onSelectionChange = vi.fn();
    render(
      <DataTable columns={columns} rows={rows} selectable onSelectionChange={onSelectionChange} />,
    );
    const all = screen.getByRole("checkbox", { name: "Select all rows" });
    expect(all).toHaveAttribute("aria-checked", "false");

    fireEvent.click(screen.getByRole("checkbox", { name: "Select row 2" }));
    expect(onSelectionChange).toHaveBeenLastCalledWith(["inv-2"]);
    expect(all).toHaveAttribute("aria-checked", "mixed");
    expect(screen.getAllByRole("row")[2]).toHaveAttribute("aria-selected", "true");

    fireEvent.click(all);
    expect(onSelectionChange).toHaveBeenLastCalledWith(["inv-1", "inv-2", "inv-3"]);
    expect(all).toHaveAttribute("aria-checked", "true");

    fireEvent.click(screen.getByRole("checkbox", { name: "Select row 2" }));
    expect(onSelectionChange).toHaveBeenLastCalledWith(["inv-1", "inv-3"]);
    expect(all).toHaveAttribute("aria-checked", "mixed");

    // A mixed select-all resolves to checked (APG tri-state), then clears.
    fireEvent.click(all);
    expect(onSelectionChange).toHaveBeenLastCalledWith(["inv-1", "inv-2", "inv-3"]);
    fireEvent.click(all);
    expect(onSelectionChange).toHaveBeenLastCalledWith([]);
  });

  it("keyboard: Space toggles a row checkbox, the select-all is disabled without rows", () => {
    render(
      <DataTable
        columns={columns}
        rows={rows}
        selectable
        selectionLabel={(row) => `Pick ${row.customer}`}
        selectAllLabel="Everyone"
      />,
    );
    const ada = screen.getByRole("checkbox", { name: "Pick Ada Lovelace" });
    ada.focus();
    fireEvent.keyDown(ada, { key: " " });
    expect(ada).toHaveAttribute("aria-checked", "true");

    render(<DataTable columns={columns} rows={[]} selectable selectAllLabel="Nobody" />);
    expect(screen.getByRole("checkbox", { name: "Nobody" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("follows a controlled selection and custom row keys", () => {
    const { rerender } = render(
      <DataTable
        columns={columns}
        rows={rows}
        rowKey="customer"
        selectable
        selectedKeys={["Ada Lovelace"]}
      />,
    );
    expect(screen.getByRole("checkbox", { name: "Select row 1" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    fireEvent.click(screen.getByRole("checkbox", { name: "Select row 3" }));
    expect(screen.getByRole("checkbox", { name: "Select row 3" })).toHaveAttribute(
      "aria-checked",
      "false",
    );
    rerender(
      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(row) => row.id}
        selectable
        selectedKeys={["inv-3"]}
      />,
    );
    expect(screen.getByRole("checkbox", { name: "Select row 3" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("falls back to the index as key for rows without an id", () => {
    render(
      <DataTable
        columns={[{ key: "n", header: "N" }]}
        rows={[{ n: 1 }, { n: 2 }]}
        selectable
        defaultSelectedKeys={["1"]}
      />,
    );
    expect(screen.getByRole("checkbox", { name: "Select row 2" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("renders custom cells, the empty state and the loading state", () => {
    const { rerender } = render(
      <DataTable
        columns={columns}
        rows={rows}
        renderCell={(row, column) =>
          column.key === "amount" ? `$${row.amount}` : String(row[column.key as keyof Invoice])
        }
      />,
    );
    expect(screen.getByText("$250")).toHaveClass("mild-table__cell--numeric");

    rerender(<DataTable columns={columns} rows={[]} />);
    const empty = screen.getByText("No data");
    expect(empty).toHaveClass("mild-data-table__empty");
    expect(empty).toHaveAttribute("colspan", "3");

    rerender(
      <DataTable columns={columns} rows={rows} loading loadingMessage="Fetching" selectable />,
    );
    expect(document.querySelector(".mild-data-table")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("status")).toHaveTextContent("Fetching");
    expect(screen.getByRole("status").closest("td")).toHaveAttribute("colspan", "4");
  });

  it("passes table props and ui classes through", () => {
    render(
      <DataTable
        columns={columns}
        rows={rows}
        variant="outline"
        size="lg"
        hoverable
        className="custom"
        ui={{ container: "c", row: "r", head: "h", cell: "d" }}
      />,
    );
    const table = screen.getByRole("table");
    expect(table).toHaveClass(
      "mild-table--outline",
      "mild-table--lg",
      "mild-table--hoverable",
      "custom",
    );
    expect(table.parentElement).toHaveClass("c");
    expect(screen.getAllByRole("row")[0]).toHaveClass("r");
    expect(screen.getAllByRole("columnheader")[0]).toHaveClass("h");
    expect(screen.getAllByRole("cell")[0]).toHaveClass("d");
  });

  it("sorting helpers: nullish last, numbers numerically, strings naturally, stable", () => {
    expect(compareSortValues(null, null)).toBe(0);
    expect(compareSortValues(null, 1)).toBe(1);
    expect(compareSortValues(1, undefined)).toBe(-1);
    expect(compareSortValues(10, 2)).toBeGreaterThan(0);
    expect(compareSortValues("a10", "a2")).toBeGreaterThan(0);
    expect(nextSort(null, "a")).toEqual({ key: "a", direction: "ascending" });
    expect(nextSort({ key: "a", direction: "descending" }, "a")).toEqual({
      key: "a",
      direction: "ascending",
    });
    const data = [
      { k: "b", i: 1 },
      { k: "a", i: 2 },
      { k: "b", i: 3 },
    ];
    expect(
      sortRows(data, [{ key: "k", header: "K" }], { key: "k", direction: "ascending" }).map(
        (r) => r.i,
      ),
    ).toEqual([2, 1, 3]);
    expect(
      sortRows(data, [{ key: "k", header: "K" }], { key: "missing", direction: "ascending" }),
    ).toBe(data);
  });
});
