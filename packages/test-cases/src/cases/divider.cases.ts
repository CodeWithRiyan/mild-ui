// Shared cases for <Divider />
import type { ComponentCases } from "../types";

export const dividerCases: ComponentCases = {
  component: "Divider",
  cases: [
    {
      name: "default renders a horizontal separator",
      props: {},
      query: { role: "separator" },
      expected: {
        classes: [
          "mild-divider",
          "mild-divider--horizontal",
          "mild-divider--solid",
          "mild-divider--sm",
        ],
        absentClasses: ["mild-divider--with-label"],
        attributes: { "aria-orientation": "horizontal" },
        absentAttributes: ["aria-hidden"],
      },
    },
    {
      name: "vertical dashed medium separator",
      props: { orientation: "vertical", variant: "dashed", size: "md" },
      query: { role: "separator" },
      expected: {
        classes: ["mild-divider--vertical", "mild-divider--dashed", "mild-divider--md"],
        absentClasses: ["mild-divider--horizontal", "mild-divider--solid", "mild-divider--sm"],
        attributes: { "aria-orientation": "vertical" },
      },
    },
    {
      name: "label is rendered on the line at the start",
      props: { label: "OR", labelPosition: "start" },
      query: { role: "separator" },
      expected: {
        classes: ["mild-divider--with-label", "mild-divider--label-start"],
        text: "OR",
      },
      parts: [{ query: { selector: ".mild-divider__label" }, text: "OR" }],
    },
    {
      name: "decorative separator is hidden from assistive technology",
      props: { decorative: true, "data-testid": "decorative" },
      query: { selector: "[data-testid='decorative']" },
      expected: {
        classes: ["mild-divider"],
        attributes: { role: "none", "aria-hidden": "true" },
        absentAttributes: ["aria-orientation"],
      },
    },
    {
      name: "renders as hr when asked and merges className",
      props: { as: "hr", className: "custom-divider" },
      query: { selector: "hr" },
      expected: { classes: ["mild-divider", "custom-divider"], attributes: { role: "separator" } },
    },
  ],
};

export default dividerCases;
