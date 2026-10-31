// Shared cases for <Badge />
import type { ComponentCases } from "../types";

export const badgeCases: ComponentCases = {
  component: "Badge",
  cases: [
    {
      name: "default renders a subtle gray md span",
      props: {},
      children: "New",
      query: { selector: "span" },
      expected: {
        classes: ["mild-badge", "mild-badge--subtle", "mild-badge--gray", "mild-badge--md"],
        absentClasses: ["mild-badge--pill"],
        text: "New",
      },
    },
    {
      name: "solid success pill with a dot",
      props: { variant: "solid", colorScheme: "success", pill: true, dot: true, size: "lg" },
      children: "Live",
      query: { selector: "span" },
      expected: {
        classes: ["mild-badge--solid", "mild-badge--success", "mild-badge--pill", "mild-badge--lg"],
      },
      parts: [{ query: { selector: ".mild-badge__dot" }, attributes: { "aria-hidden": "true" } }],
    },
    {
      name: "outline danger small badge",
      props: { variant: "outline", colorScheme: "danger", size: "sm" },
      children: "Error",
      query: { selector: "span" },
      expected: { classes: ["mild-badge--outline", "mild-badge--danger", "mild-badge--sm"] },
    },
    {
      name: "custom className is merged",
      props: { className: "custom-badge" },
      children: "x",
      query: { selector: "span" },
      expected: { classes: ["mild-badge", "custom-badge"] },
    },
  ],
};

export default badgeCases;
