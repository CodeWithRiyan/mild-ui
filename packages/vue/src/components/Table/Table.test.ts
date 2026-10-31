import { h } from "vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { tableCases } from "@mild-ui/test-cases/table";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./index";

const invoices = () => [
  h(TableCaption, () => "Invoices"),
  h(TableHeader, () =>
    h(TableRow, () => [
      h(TableHead, () => "Customer"),
      h(TableHead, { numeric: true, sort: "ascending" }, () => "Amount"),
    ]),
  ),
  h(TableBody, () => [
    h(TableRow, () => [
      h(TableCell, () => "Ada Lovelace"),
      h(TableCell, { numeric: true }, () => "$250.00"),
    ]),
    h(TableRow, { selected: true }, () => [
      h(TableCell, () => "Grace Hopper"),
      h(TableCell, { numeric: true }, () => "$125.00"),
    ]),
  ]),
  h(TableFooter, () =>
    h(TableRow, () => [
      h(TableCell, () => "Total"),
      h(TableCell, { numeric: true }, () => "$375.00"),
    ]),
  ),
];

runComponentCases(tableCases, (c) => h(Table, caseProps(c), invoices));

describe("Table", () => {
  it("renders a table inside a scroll container; attributes land on the table", () => {
    const { container } = render(
      asComponent(() =>
        h(Table, { ui: { container: "wrap" }, "aria-label": "Data", "data-x": "y" }, () =>
          h(TableBody, () => h(TableRow, () => h(TableCell, () => "cell"))),
        ),
      ),
    );
    const table = screen.getByRole("table", { name: "Data" });
    expect(table).toHaveAttribute("data-x", "y");
    expect(table.parentElement).toHaveClass("mild-table-container", "wrap");
    expect(table.parentElement).toBe(container.firstElementChild);
    expect(table).toHaveClass("mild-table", "mild-table--simple", "mild-table--md");
  });

  it("maps cell alignment, numeric, scope and sort onto the cells", () => {
    render(
      asComponent(() =>
        h(Table, () => [
          h(TableCaption, { placement: "bottom" }, () => "Caption"),
          h(TableHeader, () =>
            h(TableRow, () => [
              h(TableHead, { align: "center", sort: "none" }, () => "A"),
              h(TableHead, { scope: "row", numeric: true, sort: "descending" }, () => "B"),
            ]),
          ),
          h(TableBody, () =>
            h(TableRow, { selected: false }, () => [
              h(TableCell, { align: "right" }, () => "a"),
              h(TableCell, { numeric: true }, () => "1"),
            ]),
          ),
          h(TableFooter, () => h(TableRow, () => h(TableCell, () => "total"))),
        ]),
      ),
    );
    expect(screen.getByText("Caption")).toHaveClass(
      "mild-table__caption",
      "mild-table__caption--bottom",
    );
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

  it("merges class and style on every part", () => {
    render(
      asComponent(() =>
        h(Table, { class: "t", style: { marginTop: "1px" } }, () => [
          h(TableCaption, { class: "cap" }, () => "Caption"),
          h(TableHeader, { class: "thead" }, () =>
            h(TableRow, { class: "hr" }, () => h(TableHead, { class: "th" }, () => "A")),
          ),
          h(TableBody, { class: "tbody" }, () =>
            h(TableRow, { class: "br" }, () => h(TableCell, { class: "td" }, () => "a")),
          ),
          h(TableFooter, { class: "tfoot" }, () => h(TableRow, () => h(TableCell, () => "total"))),
        ]),
      ),
    );
    const table = screen.getByRole("table");
    expect(table).toHaveClass("mild-table", "t");
    expect(table).toHaveStyle({ marginTop: "1px" });
    expect(table.querySelector("caption")).toHaveClass("mild-table__caption", "cap");
    expect(table.querySelector("thead")).toHaveClass("mild-table__header", "thead");
    expect(table.querySelector("thead tr")).toHaveClass("mild-table__row", "hr");
    expect(table.querySelector("th")).toHaveClass("mild-table__head", "th");
    expect(table.querySelector("tbody")).toHaveClass("mild-table__body", "tbody");
    expect(table.querySelector("tbody tr")).toHaveClass("mild-table__row", "br");
    expect(table.querySelector("td")).toHaveClass("mild-table__cell", "td");
    expect(table.querySelector("tfoot")).toHaveClass("mild-table__footer", "tfoot");
  });
});

itHasNoSeriousAxeViolations("Table", () =>
  h(Table, { variant: "striped", hoverable: true, stickyHeader: true }, invoices),
);
