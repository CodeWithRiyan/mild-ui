// Shared cases for <Radio /> (radiogroup + items)
import type { ComponentCases } from "../types";

const items = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Bravo" },
  { value: "c", label: "Charlie" },
];

export const radioCases: ComponentCases = {
  component: "Radio",
  cases: [
    {
      name: "renders a radiogroup with all items unchecked",
      props: { items },
      query: { role: "radiogroup" },
      parts: [
        { query: { role: "radio", name: "Alpha" }, attributes: { "aria-checked": "false" } },
        { query: { role: "radio", name: "Bravo" }, attributes: { "aria-checked": "false" } },
        { query: { role: "radio", name: "Charlie" }, attributes: { "aria-checked": "false" } },
      ],
    },
    {
      name: "defaultValue checks one item and makes it the tab stop",
      props: { items, defaultValue: "b" },
      query: { role: "radiogroup" },
      parts: [
        {
          query: { role: "radio", name: "Bravo" },
          attributes: { "aria-checked": "true", tabindex: "0" },
        },
        {
          query: { role: "radio", name: "Alpha" },
          attributes: { "aria-checked": "false", tabindex: "-1" },
        },
      ],
    },
  ],
};

export default radioCases;
