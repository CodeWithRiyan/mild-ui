// Shared cases for <Card /> (the framework test renders header/body/footer parts inside)
import type { ComponentCases } from "../types";

export const cardCases: ComponentCases = {
  component: "Card",
  cases: [
    {
      name: "default renders a bordered card with its parts",
      props: {},
      query: { selector: ".mild-card" },
      expected: {
        classes: ["mild-card", "mild-card--default"],
        absentClasses: ["mild-card--interactive", "mild-card--disabled"],
      },
      parts: [
        { query: { role: "heading", name: "Card title" }, classes: ["mild-card-title"] },
        { query: { selector: ".mild-card-description" }, text: "Card description" },
        { query: { selector: ".mild-card-content" }, text: "Card body" },
        { query: { selector: ".mild-card-footer" }, text: "Card footer" },
      ],
    },
    {
      name: "elevated interactive card with large padding",
      props: { variant: "elevated", interactive: true, padding: "lg" },
      query: { selector: ".mild-card" },
      expected: { classes: ["mild-card--elevated", "mild-card--interactive"] },
      parts: [
        { query: { selector: ".mild-card-header" }, classes: ["mild-card-header--padding-lg"] },
        { query: { selector: ".mild-card-content" }, classes: ["mild-card-content--padding-lg"] },
      ],
    },
    {
      name: "disabled filled card renders as article",
      props: { as: "article", variant: "filled", disabled: true, "aria-label": "Post" },
      query: { role: "article", name: "Post" },
      expected: {
        classes: ["mild-card--filled", "mild-card--disabled"],
        attributes: { "data-disabled": "" },
      },
    },
    {
      name: "custom className is merged",
      props: { className: "custom-card" },
      query: { selector: ".mild-card" },
      expected: { classes: ["mild-card", "custom-card"] },
    },
  ],
};

export default cardCases;
