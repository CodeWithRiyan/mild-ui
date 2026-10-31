// Shared cases for <Collapsible /> (a trigger "Details" and content "More")
import type { ComponentCases } from "../types";

export const collapsibleCases: ComponentCases = {
  component: "Collapsible",
  cases: [
    {
      name: "default renders a closed disclosure",
      props: {},
      query: { selector: ".mild-collapsible" },
      expected: { classes: ["mild-collapsible"], attributes: { "data-state": "closed" } },
      parts: [
        {
          query: { role: "button", name: "Details" },
          classes: ["mild-collapsible-trigger"],
          attributes: { "aria-expanded": "false", "data-state": "closed" },
        },
        {
          query: { selector: ".mild-collapsible-content" },
          attributes: { hidden: "", "data-state": "closed" },
        },
      ],
    },
    {
      name: "defaultOpen shows the content",
      props: { defaultOpen: true },
      query: { role: "button", name: "Details" },
      expected: { attributes: { "aria-expanded": "true" } },
      parts: [
        {
          query: { selector: ".mild-collapsible-content" },
          absentAttributes: ["hidden"],
          attributes: { "data-state": "open" },
          text: "More",
        },
      ],
    },
    {
      name: "disabled disables the trigger",
      props: { disabled: true },
      query: { role: "button", name: "Details" },
      expected: { attributes: { disabled: "" } },
    },
    {
      name: "custom className is merged",
      props: { className: "custom-collapsible" },
      query: { selector: ".mild-collapsible" },
      expected: { classes: ["mild-collapsible", "custom-collapsible"] },
    },
  ],
};

export default collapsibleCases;
