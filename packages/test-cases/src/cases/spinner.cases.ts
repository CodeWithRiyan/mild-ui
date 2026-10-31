// Shared cases for <Spinner />
import type { ComponentCases } from "../types";

export const spinnerCases: ComponentCases = {
  component: "Spinner",
  cases: [
    {
      name: "default renders a md border status announcing Loading",
      props: {},
      query: { role: "status" },
      expected: {
        classes: [
          "mild-spinner",
          "mild-spinner--border",
          "mild-spinner--md",
          "mild-spinner--normal",
        ],
        text: "Loading...",
      },
      parts: [{ query: { selector: ".mild-spinner__label" }, text: "Loading..." }],
    },
    {
      name: "dots spinner, small and fast, with a custom label",
      props: { variant: "dots", size: "sm", speed: "fast", label: "Saving" },
      query: { role: "status" },
      expected: {
        classes: ["mild-spinner--dots", "mild-spinner--sm", "mild-spinner--fast"],
        absentClasses: ["mild-spinner--border", "mild-spinner--md"],
        text: "Saving",
      },
    },
    {
      name: "custom className is merged",
      props: { className: "custom-spinner" },
      query: { role: "status" },
      expected: { classes: ["mild-spinner", "custom-spinner"] },
    },
  ],
};

export default spinnerCases;
