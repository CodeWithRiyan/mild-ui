// Shared cases for <AspectRatio />
import type { ComponentCases } from "../types";

export const aspectRatioCases: ComponentCases = {
  component: "AspectRatio",
  cases: [
    {
      name: "default renders a square box",
      props: {},
      children: "content",
      query: { selector: "div" },
      expected: {
        classes: ["mild-aspect-ratio"],
        attributes: { style: "--mild-aspect-ratio: 1;" },
        text: "content",
      },
    },
    {
      name: "ratio string is written as a CSS ratio",
      props: { ratio: "16/9" },
      query: { selector: "div" },
      expected: { attributes: { style: "--mild-aspect-ratio: 16 / 9;" } },
    },
    {
      name: "numeric ratio is written as a number",
      props: { ratio: 2 },
      query: { selector: "div" },
      expected: { attributes: { style: "--mild-aspect-ratio: 2;" } },
    },
    {
      name: "renders as figure and merges className",
      props: { as: "figure", className: "custom-ratio" },
      query: { role: "figure" },
      expected: { classes: ["mild-aspect-ratio", "custom-ratio"] },
    },
  ],
};

export default aspectRatioCases;
