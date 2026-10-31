// Shared cases for <Code />
import type { ComponentCases } from "../types";

export const codeCases: ComponentCases = {
  component: "Code",
  cases: [
    {
      name: "default renders subtle inline code",
      props: {},
      children: "npm i",
      query: { selector: "code" },
      expected: {
        classes: ["mild-code", "mild-code--subtle", "mild-code--md"],
        absentClasses: ["mild-code--block"],
        text: "npm i",
      },
    },
    {
      name: "solid small code",
      props: { variant: "solid", size: "sm" },
      children: "const x = 1",
      query: { selector: "code" },
      expected: {
        classes: ["mild-code--solid", "mild-code--sm"],
        absentClasses: ["mild-code--subtle", "mild-code--md"],
      },
    },
    {
      name: "block code keeps its whitespace",
      props: { block: true, variant: "outline", size: "lg" },
      children: "line",
      query: { selector: "code" },
      expected: { classes: ["mild-code--block", "mild-code--outline", "mild-code--lg"] },
    },
    {
      name: "renders as pre and merges className",
      props: { as: "pre", block: true, className: "custom-code" },
      children: "block",
      query: { selector: "pre" },
      expected: { classes: ["mild-code", "mild-code--block", "custom-code"] },
    },
  ],
};

export default codeCases;
