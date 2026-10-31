// Shared cases for <Stack />
import type { ComponentCases } from "../types";

export const stackCases: ComponentCases = {
  component: "Stack",
  cases: [
    {
      name: "default renders a column flex div",
      props: {},
      children: "content",
      query: { selector: "div" },
      expected: {
        classes: ["mild-stack", "mild-stack--column"],
        absentClasses: ["mild-stack--row", "mild-stack--inline"],
        text: "content",
      },
    },
    {
      name: "row with centered, space-between, wrapping items",
      props: { direction: "row", align: "center", justify: "space-between", wrap: true },
      children: "row",
      query: { selector: "div" },
      expected: {
        classes: [
          "mild-stack--row",
          "mild-stack--items-center",
          "mild-stack--justify-between",
          "mild-stack--wrap",
        ],
        absentClasses: ["mild-stack--column"],
      },
    },
    {
      name: "inline stack renders as nav when asked",
      props: { as: "nav", inline: true, "aria-label": "Breadcrumb" },
      children: "links",
      query: { role: "navigation", name: "Breadcrumb" },
      expected: { classes: ["mild-stack", "mild-stack--inline"] },
    },
    {
      name: "custom className is merged",
      props: { className: "custom-stack" },
      query: { selector: "div" },
      expected: { classes: ["mild-stack", "custom-stack"] },
    },
  ],
};

export default stackCases;
