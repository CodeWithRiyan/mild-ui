import { defineComponent, h, nextTick, ref } from "vue";
import { fireEvent, render, screen, within } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { dataTableCases } from "@mild-ui/test-cases/data-table";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { compareSortValues, nextSort, sortRows, sortValueOf } from "../../utils";
import type { DataTableColumn, DataTableProps, DataTableSort } from "../../types/table";
import { DataTable } from "./index";

interface Invoice extends Record<string, unknown> {
  id: string;
  customer: string;
  status: string;
  amount: number;
}

// `h()` cannot infer the generic `Row` of the SFC (templates can), so the columns are typed
// against the default row shape here.
const columns: DataTableColumn[] = [
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
    .map((row) => within(row).getAllByRole("cell")[0].textContent?.trim());

runComponentCases(dataTableCases, (c) => h(DataTable, caseProps<DataTableProps>(c)));

describe("DataTable (APG sortable table)", () => {
  it("renders the columns and rows, with a sort button only on sortable headers", () => {
    const { container } = render(
      h(DataTable, { columns, rows, caption: "Invoices", class: "custom", "data-x": "y" }),
    );
    const table = screen.getByRole("table", { name: "Invoices" });
    expect(table).toHaveClass("mild-table", "custom");
    expect(table).toHaveAttribute("data-x", "y");
    expect(container.firstElementChild).toHaveClass("mild-data-table");
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

  it("sorts on activation: ascending first, then the other way, and announces it", async () => {
    const { emitted } = render(h(DataTable, { columns, rows }));
    const amount = screen.getByRole("columnheader", { name: "Amount" });
    const button = within(amount).getByRole("button");

    await fireEvent.click(button);
    expect(amount).toHaveAttribute("aria-sort", "ascending");
    expect(emitted("update:sort")).toEqual([[{ key: "amount", direction: "ascending" }]]);
    expect(firstColumn()).toEqual(["Grace Hopper", "Ada Lovelace", "Alan Turing"]);

    await fireEvent.click(button);
    expect(amount).toHaveAttribute("aria-sort", "descending");
    expect(firstColumn()).toEqual(["Alan Turing", "Ada Lovelace", "Grace Hopper"]);

    // Switching column starts ascending again; the previous header goes back to none.
    await fireEvent.click(
      within(screen.getByRole("columnheader", { name: "Customer" })).getByRole("button"),
    );
    expect(amount).toHaveAttribute("aria-sort", "none");
    expect(firstColumn()).toEqual(["Ada Lovelace", "Alan Turing", "Grace Hopper"]);
  });

  it("keyboard: the sort button is a real button (Enter/Space activate it)", async () => {
    render(h(DataTable, { columns, rows }));
    const button = within(screen.getByRole("columnheader", { name: "Amount" })).getByRole("button");
    button.focus();
    expect(button).toHaveFocus();
    expect(button).toHaveAttribute("type", "button");
    await fireEvent.click(button);
    expect(screen.getByRole("columnheader", { name: "Amount" })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
  });

  it("follows a controlled sort (v-model:sort) and a custom sort value", async () => {
    const byLength: DataTableColumn[] = [
      {
        key: "customer",
        header: "Customer",
        sortable: true,
        sortValue: (row) => String(row.customer).length,
      },
    ];
    const sort = ref<DataTableSort | null>({ key: "customer", direction: "ascending" });
    const Host = defineComponent({
      setup: () => () => h(DataTable, { columns: byLength, rows, sort: sort.value }),
    });
    render(Host);
    expect(firstColumn()).toEqual(["Alan Turing", "Ada Lovelace", "Grace Hopper"]);

    await fireEvent.click(screen.getByRole("button"));
    // Controlled: nothing changes until the parent does it.
    expect(firstColumn()).toEqual(["Alan Turing", "Ada Lovelace", "Grace Hopper"]);

    sort.value = { key: "customer", direction: "descending" };
    await nextTick();
    expect(firstColumn()).toEqual(["Ada Lovelace", "Grace Hopper", "Alan Turing"]);

    sort.value = null;
    await nextTick();
    expect(firstColumn()).toEqual(["Ada Lovelace", "Grace Hopper", "Alan Turing"]);
    expect(screen.getByRole("columnheader")).toHaveAttribute("aria-sort", "none");
  });

  it("selects rows through checkboxes and the select-all header", async () => {
    const onUpdate = vi.fn();
    render(h(DataTable, { columns, rows, selectable: true, "onUpdate:selectedKeys": onUpdate }));
    await nextTick();
    const all = screen.getByRole("checkbox", { name: "Select all rows" });
    expect(all).toHaveAttribute("aria-checked", "false");

    await fireEvent.click(screen.getByRole("checkbox", { name: "Select row 2" }));
    expect(onUpdate).toHaveBeenLastCalledWith(["inv-2"]);
    expect(all).toHaveAttribute("aria-checked", "mixed");
    expect(screen.getAllByRole("row")[2]).toHaveAttribute("aria-selected", "true");
    expect(screen.getAllByRole("row")[1]).toHaveAttribute("aria-selected", "false");

    await fireEvent.click(all);
    expect(onUpdate).toHaveBeenLastCalledWith(["inv-1", "inv-2", "inv-3"]);
    expect(all).toHaveAttribute("aria-checked", "true");

    await fireEvent.click(screen.getByRole("checkbox", { name: "Select row 2" }));
    expect(onUpdate).toHaveBeenLastCalledWith(["inv-1", "inv-3"]);
    expect(all).toHaveAttribute("aria-checked", "mixed");

    // A mixed select-all resolves to checked (APG tri-state), then clears.
    await fireEvent.click(all);
    expect(onUpdate).toHaveBeenLastCalledWith(["inv-1", "inv-2", "inv-3"]);
    await fireEvent.click(all);
    expect(onUpdate).toHaveBeenLastCalledWith([]);
  });

  it("keyboard: Space toggles a row checkbox, the select-all is disabled without rows", async () => {
    render(
      h(DataTable, {
        columns,
        rows,
        selectable: true,
        selectionLabel: (row) => `Pick ${String(row.customer)}`,
        selectAllLabel: "Everyone",
      }),
    );
    await nextTick();
    const ada = screen.getByRole("checkbox", { name: "Pick Ada Lovelace" });
    ada.focus();
    await fireEvent.keyDown(ada, { key: " " });
    expect(ada).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("checkbox", { name: "Everyone" })).toHaveAttribute(
      "aria-checked",
      "mixed",
    );

    render(h(DataTable, { columns, rows: [], selectable: true, selectAllLabel: "Nobody" }));
    await nextTick();
    expect(screen.getByRole("checkbox", { name: "Nobody" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("follows a controlled selection (v-model:selectedKeys) and custom row keys", async () => {
    const selectedKeys = ref(["Ada Lovelace"]);
    const rowKey = ref<string | ((row: Record<string, unknown>) => string)>("customer");
    const Host = defineComponent({
      setup: () => () =>
        h(DataTable, {
          columns,
          rows,
          rowKey: rowKey.value,
          selectable: true,
          selectedKeys: selectedKeys.value,
        }),
    });
    render(Host);
    await nextTick();
    expect(screen.getByRole("checkbox", { name: "Select row 1" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    await fireEvent.click(screen.getByRole("checkbox", { name: "Select row 3" }));
    expect(screen.getByRole("checkbox", { name: "Select row 3" })).toHaveAttribute(
      "aria-checked",
      "false",
    );

    rowKey.value = (row) => String(row.id);
    selectedKeys.value = ["inv-3"];
    await nextTick();
    expect(screen.getByRole("checkbox", { name: "Select row 3" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("falls back to the index as key for rows without an id", async () => {
    render(
      h(DataTable, {
        columns: [{ key: "n", header: "N" }],
        rows: [{ n: 1 }, { n: 2, id: null }],
        selectable: true,
        defaultSelectedKeys: ["1"],
      }),
    );
    await nextTick();
    expect(screen.getByRole("checkbox", { name: "Select row 2" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("renders custom cells through renderCell or the cell slot, and prints blanks for nullish", () => {
    const { unmount } = render(
      h(DataTable, {
        columns,
        rows,
        renderCell: (row, column) =>
          column.key === "amount" ? `$${String(row.amount)}` : String(row[column.key]),
      }),
    );
    expect(screen.getByText("$250")).toHaveClass("mild-table__cell--numeric");
    unmount();

    render(
      h(
        DataTable,
        { columns, rows: [{ id: "x", customer: null, status: undefined, amount: 1 }] },
        {
          cell: ({ column, value }: { column: DataTableColumn; value: unknown }) =>
            column.key === "status" ? h("em", "slot") : String(value ?? ""),
        },
      ),
    );
    const cells = screen.getAllByRole("cell");
    expect(cells[0]).toHaveTextContent("");
    expect(cells[1].querySelector("em")).toHaveTextContent("slot");
    expect(cells[2]).toHaveTextContent("1");
  });

  it("prints an empty string for nullish values by default", () => {
    render(
      h(DataTable, {
        columns,
        rows: [{ id: "x", customer: null, status: undefined, amount: 1 }],
      }),
    );
    const cells = screen.getAllByRole("cell");
    expect(cells[0].textContent?.trim()).toBe("");
    expect(cells[1].textContent?.trim()).toBe("");
    expect(cells[2].textContent?.trim()).toBe("1");
  });

  it("renders the empty state and the loading state", async () => {
    const { unmount } = render(h(DataTable, { columns, rows: [] }));
    const empty = screen.getByText("No data");
    expect(empty).toHaveClass("mild-data-table__empty");
    expect(empty).toHaveAttribute("colspan", "3");
    unmount();

    const { container } = render(
      h(DataTable, {
        columns,
        rows,
        loading: true,
        loadingMessage: "Fetching",
        selectable: true,
      }),
    );
    await nextTick();
    expect(container.querySelector(".mild-data-table")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("status")).toHaveTextContent("Fetching");
    expect(screen.getByRole("status").closest("td")).toHaveAttribute("colspan", "4");
  });

  it("passes table props and ui classes through", () => {
    render(
      h(DataTable, {
        columns,
        rows,
        variant: "outline",
        size: "lg",
        hoverable: true,
        class: "custom",
        ui: { container: "c", row: "r", head: "h", cell: "d" },
      }),
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
    expect(screen.getAllByRole("row")[1]).toHaveClass("r");
    expect(screen.getAllByRole("columnheader")[0]).toHaveClass("h");
    expect(screen.getAllByRole("cell")[0]).toHaveClass("d");
  });

  it("sorting helpers: nullish last, numbers numerically, strings naturally, stable", () => {
    expect(compareSortValues(null, null)).toBe(0);
    expect(compareSortValues(null, 1)).toBe(1);
    expect(compareSortValues(1, undefined)).toBe(-1);
    expect(compareSortValues(10, 2)).toBeGreaterThan(0);
    expect(compareSortValues(2, 10)).toBeLessThan(0);
    expect(compareSortValues("a10", "a2")).toBeGreaterThan(0);
    expect(compareSortValues("a", 1)).toBeGreaterThan(0);
    expect(nextSort(null, "a")).toEqual({ key: "a", direction: "ascending" });
    expect(nextSort({ key: "a", direction: "ascending" }, "a")).toEqual({
      key: "a",
      direction: "descending",
    });
    expect(nextSort({ key: "a", direction: "descending" }, "a")).toEqual({
      key: "a",
      direction: "ascending",
    });
    expect(nextSort({ key: "a", direction: "descending" }, "b")).toEqual({
      key: "b",
      direction: "ascending",
    });
    const column: DataTableColumn = { key: "k", header: "K" };
    expect(sortValueOf(column, { k: 3 })).toBe(3);
    expect(sortValueOf(column, { k: "x" })).toBe("x");
    expect(sortValueOf(column, { k: null })).toBeNull();
    expect(sortValueOf(column, {})).toBeUndefined();
    expect(sortValueOf({ ...column, sortValue: () => "custom" }, { k: 1 })).toBe("custom");
    const data = [
      { k: "b", i: 1 },
      { k: "a", i: 2 },
      { k: "b", i: 3 },
    ];
    expect(sortRows(data, [column], { key: "k", direction: "ascending" }).map((r) => r.i)).toEqual([
      2, 1, 3,
    ]);
    expect(sortRows(data, [column], { key: "k", direction: "descending" }).map((r) => r.i)).toEqual(
      [1, 3, 2],
    );
    expect(sortRows(data, [column], null)).toBe(data);
    expect(sortRows(data, [column], { key: "missing", direction: "ascending" })).toBe(data);
  });
});

itHasNoSeriousAxeViolations("DataTable", () =>
  h(DataTable, {
    columns,
    rows,
    caption: "Invoices",
    selectable: true,
    defaultSelectedKeys: ["inv-2"],
    defaultSort: { key: "amount", direction: "descending" },
  }),
);

itHasNoSeriousAxeViolations("DataTable (empty, loading)", () =>
  h("div", [
    h(DataTable, { columns, rows: [], caption: "Empty" }),
    h(DataTable, { columns, rows, caption: "Loading", loading: true }),
  ]),
);
