// Shared cases for <Grid />
import type { ComponentCases } from "../types";

export const gridCases: ComponentCases = {
  component: "Grid",
  cases: [
    {
      name: "default renders a grid div without a column count",
      props: {},
      children: "content",
      query: { selector: "div" },
      expected: {
        classes: ["mild-grid"],
        absentClasses: ["mild-grid--inline", "mild-grid--cols-1"],
        text: "content",
      },
    },
    {
      name: "fixed column and row count with flow and alignment",
      props: { columns: 3, rows: 2, flow: "row-dense", align: "center", justify: "stretch" },
      query: { selector: "div" },
      expected: {
        classes: [
          "mild-grid--cols-3",
          "mild-grid--rows-2",
          "mild-grid--flow-row-dense",
          "mild-grid--items-center",
          "mild-grid--justify-stretch",
        ],
      },
    },
    {
      name: "responsive columns emit one class per breakpoint",
      props: { columns: { base: 1, md: 2, xl: 4 } },
      query: { selector: "div" },
      expected: {
        classes: ["mild-grid--cols-1", "mild-grid--md-cols-2", "mild-grid--xl-cols-4"],
        absentClasses: ["mild-grid--sm-cols-1", "mild-grid--lg-cols-2"],
      },
    },
    {
      name: "inline grid renders as ul",
      props: { as: "ul", inline: true, columns: 2 },
      query: { role: "list" },
      expected: { classes: ["mild-grid", "mild-grid--inline", "mild-grid--cols-2"] },
    },
    {
      name: "custom className is merged",
      props: { className: "custom-grid" },
      query: { selector: "div" },
      expected: { classes: ["mild-grid", "custom-grid"] },
    },
  ],
};

export default gridCases;
