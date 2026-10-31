// Shared cases for <Checkbox />
import type { ComponentCases } from "../types";

export const checkboxCases: ComponentCases = {
  component: "Checkbox",
  cases: [
    {
      name: "default is an unchecked md checkbox",
      props: {},
      query: { role: "checkbox" },
      expected: {
        classes: ["mild-checkbox", "mild-checkbox--md"],
        attributes: { "aria-checked": "false", "data-state": "unchecked" },
      },
    },
    {
      name: "defaultChecked renders checked",
      props: { defaultChecked: true },
      query: { role: "checkbox" },
      expected: {
        attributes: { "aria-checked": "true", "data-state": "checked" },
      },
    },
    {
      name: "indeterminate renders mixed",
      props: { indeterminate: true },
      query: { role: "checkbox" },
      expected: { attributes: { "aria-checked": "mixed" } },
    },
    {
      name: "small disabled checkbox",
      props: { size: "sm", disabled: true },
      query: { role: "checkbox" },
      expected: {
        classes: ["mild-checkbox--sm"],
        attributes: { "data-disabled": "" },
      },
    },
  ],
};

export default checkboxCases;
