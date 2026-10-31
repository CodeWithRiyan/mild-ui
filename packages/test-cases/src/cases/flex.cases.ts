// Shared cases for <Flex />
import type { ComponentCases } from "../types";

export const flexCases: ComponentCases = {
  component: "Flex",
  cases: [
    {
      name: "default renders a row flex div",
      props: {},
      children: "content",
      query: { selector: "div" },
      expected: {
        classes: ["mild-flex", "mild-flex--row"],
        absentClasses: ["mild-flex--inline", "mild-flex--wrap"],
        text: "content",
      },
    },
    {
      name: "column, end-aligned, evenly justified, wrap-reverse",
      props: {
        direction: "column",
        align: "flex-end",
        justify: "space-evenly",
        wrap: "wrap-reverse",
      },
      children: "column",
      query: { selector: "div" },
      expected: {
        classes: [
          "mild-flex--column",
          "mild-flex--items-end",
          "mild-flex--justify-evenly",
          "mild-flex--wrap-reverse",
        ],
        absentClasses: ["mild-flex--row"],
      },
    },
    {
      name: "inline flex renders as span",
      props: { as: "span", inline: true },
      children: "inline",
      query: { selector: "span" },
      expected: { classes: ["mild-flex", "mild-flex--inline"], text: "inline" },
    },
    {
      name: "custom className is merged",
      props: { className: "custom-flex" },
      query: { selector: "div" },
      expected: { classes: ["mild-flex", "custom-flex"] },
    },
  ],
};

export default flexCases;
