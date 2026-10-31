// Shared cases for <Table /> (+ TableHeader, TableBody, TableFooter, TableRow, TableHead,
// TableCell, TableCaption). The framework test renders the Table props around a fixed
// caption + header row + two body rows + footer, see the per-framework cases test.
import type { ComponentCases } from "../types";

export const tableCases: ComponentCases = {
  component: "Table",
  cases: [
    {
      name: "default renders a simple md table in a scroll container",
      props: {},
      query: { role: "table" },
      expected: {
        classes: ["mild-table", "mild-table--simple", "mild-table--md"],
        absentClasses: [
          "mild-table--striped",
          "mild-table--hoverable",
          "mild-table--sticky-header",
        ],
      },
      parts: [
        { query: { selector: ".mild-table-container" }, absentAttributes: ["data-sticky-header"] },
        { query: { selector: "caption" }, classes: ["mild-table__caption"], text: "Invoices" },
        { query: { selector: "thead" }, classes: ["mild-table__header"] },
        { query: { selector: "tbody" }, classes: ["mild-table__body"] },
        { query: { selector: "tfoot" }, classes: ["mild-table__footer"] },
        {
          query: { role: "columnheader", name: "Customer" },
          classes: ["mild-table__head"],
          attributes: { scope: "col" },
          absentAttributes: ["aria-sort"],
        },
        {
          query: { role: "columnheader", name: "Amount" },
          classes: ["mild-table__head--numeric"],
          attributes: { "aria-sort": "ascending" },
        },
        { query: { selector: "tbody td.mild-table__cell--numeric" }, text: "$250.00" },
      ],
    },
    {
      name: "striped, hoverable, small table with a sticky header",
      props: { variant: "striped", size: "sm", hoverable: true, stickyHeader: true },
      query: { role: "table" },
      expected: {
        classes: [
          "mild-table--striped",
          "mild-table--sm",
          "mild-table--hoverable",
          "mild-table--sticky-header",
        ],
        absentClasses: ["mild-table--simple", "mild-table--md"],
      },
      parts: [
        { query: { selector: ".mild-table-container" }, attributes: { "data-sticky-header": "" } },
      ],
    },
    {
      name: "outline large table",
      props: { variant: "outline", size: "lg" },
      query: { role: "table" },
      expected: { classes: ["mild-table--outline", "mild-table--lg"] },
    },
    {
      name: "a selected row is announced",
      props: {},
      query: { selector: "tbody tr[aria-selected='true']" },
      expected: { classes: ["mild-table__row"], attributes: { "data-selected": "" } },
    },
    {
      name: "custom className is merged on the table",
      props: { className: "custom-table" },
      query: { role: "table" },
      expected: { classes: ["mild-table", "custom-table"] },
    },
  ],
};

export default tableCases;
