// Shared cases for <DataTable />: a table rendered from `columns` + `rows`.
import type { ComponentCases } from "../types";

const columns = [
  { key: "customer", header: "Customer", sortable: true },
  { key: "status", header: "Status" },
  { key: "amount", header: "Amount", numeric: true, sortable: true },
];

const rows = [
  { id: "inv-1", customer: "Ada Lovelace", status: "Paid", amount: 250 },
  { id: "inv-2", customer: "Grace Hopper", status: "Pending", amount: 125 },
  { id: "inv-3", customer: "Alan Turing", status: "Paid", amount: 400 },
];

export const dataTableCases: ComponentCases = {
  component: "DataTable",
  cases: [
    {
      name: "renders a table from columns and rows with sortable headers",
      props: { columns, rows, caption: "Invoices" },
      query: { role: "table", name: "Invoices" },
      expected: { classes: ["mild-table", "mild-table--simple", "mild-table--md"] },
      parts: [
        { query: { selector: ".mild-data-table" }, absentAttributes: ["aria-busy"] },
        {
          query: { role: "columnheader", name: "Customer" },
          attributes: { "aria-sort": "none" },
        },
        { query: { role: "columnheader", name: "Status" }, absentAttributes: ["aria-sort"] },
        {
          query: { role: "button", name: "Customer" },
          classes: ["mild-table__sort"],
          attributes: { type: "button" },
        },
        { query: { selector: "tbody tr:first-child td:first-child" }, text: "Ada Lovelace" },
        {
          query: { selector: "tbody tr:first-child td:last-child" },
          classes: ["mild-table__cell--numeric"],
          text: "250",
        },
      ],
    },
    {
      name: "a default sort orders the rows and is announced on the header",
      props: { columns, rows, defaultSort: { key: "amount", direction: "descending" } },
      query: { role: "columnheader", name: "Amount" },
      expected: { attributes: { "aria-sort": "descending" } },
      parts: [
        { query: { selector: "tbody tr:first-child td:first-child" }, text: "Alan Turing" },
        { query: { selector: "tbody tr:last-child td:first-child" }, text: "Grace Hopper" },
      ],
    },
    {
      name: "selectable rows get a checkbox each and a select-all header",
      props: { columns, rows, selectable: true, defaultSelectedKeys: ["inv-2"] },
      query: { role: "table" },
      parts: [
        {
          query: { role: "checkbox", name: "Select all rows" },
          attributes: { "aria-checked": "mixed" },
        },
        {
          query: { role: "checkbox", name: "Select row 2" },
          attributes: { "aria-checked": "true" },
        },
        {
          query: { selector: "tbody tr:nth-child(2)" },
          attributes: { "aria-selected": "true", "data-selected": "" },
        },
        { query: { selector: "tbody tr:first-child" }, attributes: { "aria-selected": "false" } },
      ],
    },
    {
      name: "an empty table shows the empty message across every column",
      props: { columns, rows: [], emptyMessage: "Nothing to show" },
      query: { selector: ".mild-data-table__empty" },
      expected: { text: "Nothing to show", attributes: { colspan: "3" } },
    },
    {
      name: "loading is announced as busy",
      props: { columns, rows, loading: true },
      query: { selector: ".mild-data-table" },
      expected: { attributes: { "aria-busy": "true" } },
      parts: [{ query: { role: "status" }, text: "Loading" }],
    },
    {
      name: "table props pass through and className is merged on the table",
      props: {
        columns,
        rows,
        variant: "striped",
        size: "sm",
        stickyHeader: true,
        className: "custom",
      },
      query: { role: "table" },
      expected: {
        classes: ["mild-table--striped", "mild-table--sm", "mild-table--sticky-header", "custom"],
      },
    },
  ],
};

export default dataTableCases;
