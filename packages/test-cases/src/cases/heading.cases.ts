// Shared cases for <Heading />
import type { ComponentCases } from "../types";

export const headingCases: ComponentCases = {
  component: "Heading",
  cases: [
    {
      name: "default renders an h2 at the level-2 size",
      props: {},
      children: "Title",
      query: { role: "heading" },
      expected: {
        classes: ["mild-heading", "mild-heading--level-2", "mild-heading--semibold"],
        text: "Title",
      },
    },
    {
      name: "level picks the element and the default size",
      props: { level: 1 },
      children: "Page",
      query: { selector: "h1" },
      expected: {
        classes: ["mild-heading--level-1"],
        absentClasses: ["mild-heading--level-2"],
        text: "Page",
      },
    },
    {
      name: "size, weight, alignment and color override the level defaults",
      props: { level: 3, size: "xl", weight: "bold", align: "center", color: "muted" },
      children: "Section",
      query: { selector: "h3" },
      expected: {
        classes: [
          "mild-heading--level-3",
          "mild-heading--xl",
          "mild-heading--bold",
          "mild-heading--center",
          "mild-heading--muted",
        ],
        absentClasses: ["mild-heading--semibold"],
      },
    },
    {
      name: "renders as a div without a heading role when asked",
      props: { as: "div", level: 4, truncate: true, className: "custom-heading" },
      children: "Label",
      query: { selector: "div.mild-heading" },
      expected: {
        classes: ["mild-heading--level-4", "mild-heading--truncate", "custom-heading"],
      },
    },
  ],
};

export default headingCases;
