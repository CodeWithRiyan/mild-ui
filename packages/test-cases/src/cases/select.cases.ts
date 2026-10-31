// Shared cases for <Select />
import type { ComponentCases } from "../types";

const options = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
];

export const selectCases: ComponentCases = {
  component: "Select",
  cases: [
    {
      name: "closed combobox shows the placeholder",
      props: { options, placeholder: "Pick a country" },
      query: { role: "combobox" },
      expected: {
        classes: ["mild-select-trigger"],
        attributes: { "aria-haspopup": "listbox", "aria-expanded": "false" },
        text: "Pick a country",
      },
    },
    {
      name: "defaultValue shows the selected option label",
      props: { options, defaultValue: "mx" },
      query: { role: "combobox" },
      expected: { text: "Mexico" },
    },
    {
      name: "error state on the trigger",
      props: { options, error: true },
      query: { role: "combobox" },
      expected: { classes: ["mild-select-trigger--error"] },
    },
  ],
};

export default selectCases;
