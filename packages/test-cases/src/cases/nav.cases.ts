// Shared cases for <Nav />
import type { ComponentCases } from "../types";

export const navCases: ComponentCases = {
  component: "Nav",
  cases: [
    {
      name: "renders a labelled nav around an unordered list, plain and horizontal by default",
      props: { "aria-label": "Primary" },
      query: { role: "navigation", name: "Primary" },
      expected: { classes: ["mild-nav", "mild-nav--plain", "mild-nav--horizontal"] },
      parts: [{ query: { selector: "ul.mild-nav__list" } }],
    },
    {
      name: "falls back to a default accessible name",
      props: {},
      query: { role: "navigation", name: "Main" },
      expected: { classes: ["mild-nav"] },
    },
    {
      name: "variant and orientation add modifier classes",
      props: { "aria-label": "Docs", variant: "underline", orientation: "vertical" },
      query: { role: "navigation", name: "Docs" },
      expected: {
        classes: ["mild-nav--underline", "mild-nav--vertical"],
        absentClasses: ["mild-nav--plain", "mild-nav--horizontal"],
      },
    },
    {
      name: "pills variant",
      props: { "aria-label": "Tabs-like", variant: "pills" },
      query: { role: "navigation", name: "Tabs-like" },
      expected: { classes: ["mild-nav--pills"] },
    },
    {
      name: "className is merged",
      props: { className: "custom-nav" },
      query: { role: "navigation", name: "Main" },
      expected: { classes: ["mild-nav", "custom-nav"] },
    },
  ],
};

export default navCases;
