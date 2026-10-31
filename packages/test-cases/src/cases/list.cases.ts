// Shared cases for <List />
import type { ComponentCases } from "../types";

export const listCases: ComponentCases = {
  component: "List",
  cases: [
    {
      name: "default renders an unordered list without a marker modifier",
      props: {},
      children: "items",
      query: { role: "list" },
      expected: {
        classes: ["mild-list"],
        absentClasses: ["mild-list--unstyled", "mild-list--marker-decimal"],
      },
    },
    {
      name: "ordered list renders an ol numbered by default",
      props: { ordered: true },
      children: "items",
      query: { selector: "ol" },
      expected: { classes: ["mild-list", "mild-list--marker-decimal"] },
    },
    {
      name: "marker overrides the default",
      props: { ordered: true, marker: "upper-roman" },
      children: "items",
      query: { selector: "ol" },
      expected: {
        classes: ["mild-list--marker-upper-roman"],
        absentClasses: ["mild-list--marker-decimal"],
      },
    },
    {
      name: "unstyled list drops the marker",
      props: { unstyled: true, marker: "disc" },
      children: "items",
      query: { role: "list" },
      expected: {
        classes: ["mild-list--unstyled"],
        absentClasses: ["mild-list--marker-disc"],
      },
    },
    {
      name: "custom className is merged",
      props: { className: "custom-list" },
      children: "items",
      query: { role: "list" },
      expected: { classes: ["mild-list", "custom-list"] },
    },
  ],
};

export default listCases;
