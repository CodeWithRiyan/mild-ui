// Shared cases for <Tooltip /> (wrapping a button)
import type { ComponentCases } from "../types";

export const tooltipCases: ComponentCases = {
  component: "Tooltip",
  cases: [
    {
      name: "default renders a hidden tooltip describing the trigger",
      props: { label: "Save your changes" },
      query: { selector: "[role='tooltip']" },
      expected: {
        classes: ["mild-tooltip", "mild-tooltip--top"],
        attributes: { hidden: "", "data-state": "closed" },
        text: "Save your changes",
      },
      parts: [{ query: { role: "button", name: "Save" } }],
    },
    {
      name: "placement and multiline map onto modifiers",
      props: { label: "Long text", placement: "bottom", multiline: true },
      query: { selector: "[role='tooltip']" },
      expected: {
        classes: ["mild-tooltip--bottom", "mild-tooltip--multiline"],
        absentClasses: ["mild-tooltip--top"],
      },
    },
    {
      name: "custom className is merged",
      props: { label: "Tip", className: "custom-tooltip" },
      query: { selector: "[role='tooltip']" },
      expected: { classes: ["mild-tooltip", "custom-tooltip"] },
    },
  ],
};

export default tooltipCases;
