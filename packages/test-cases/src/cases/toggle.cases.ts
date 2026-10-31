// Shared cases for <Toggle />
import type { ComponentCases } from "../types";

export const toggleCases: ComponentCases = {
  component: "Toggle",
  cases: [
    {
      name: "default renders an unpressed ghost md button",
      props: { "aria-label": "Bold" },
      children: "B",
      query: { role: "button", name: "Bold" },
      expected: {
        classes: ["mild-toggle", "mild-toggle--ghost", "mild-toggle--md"],
        attributes: { "aria-pressed": "false", "data-state": "off", type: "button" },
        absentAttributes: ["disabled"],
        text: "B",
      },
    },
    {
      name: "pressed outline small toggle",
      props: { defaultPressed: true, variant: "outline", size: "sm" },
      children: "I",
      query: { role: "button" },
      expected: {
        classes: ["mild-toggle--outline", "mild-toggle--sm"],
        absentClasses: ["mild-toggle--ghost", "mild-toggle--md"],
        attributes: { "aria-pressed": "true", "data-state": "on" },
      },
    },
    {
      name: "controlled pressed toggle",
      props: { pressed: true },
      children: "U",
      query: { role: "button" },
      expected: { attributes: { "aria-pressed": "true" } },
    },
    {
      name: "disabled toggle",
      props: { disabled: true },
      children: "S",
      query: { role: "button" },
      expected: { attributes: { disabled: "", "data-disabled": "" } },
    },
    {
      name: "custom className is merged",
      props: { className: "custom-toggle" },
      children: "B",
      query: { role: "button" },
      expected: { classes: ["mild-toggle", "custom-toggle"] },
    },
  ],
};

export default toggleCases;
