// Shared cases for <Kbd />
import type { ComponentCases } from "../types";

export const kbdCases: ComponentCases = {
  component: "Kbd",
  cases: [
    {
      name: "default renders a medium kbd element",
      props: {},
      children: "K",
      query: { selector: "kbd" },
      expected: {
        classes: ["mild-kbd", "mild-kbd--md"],
        text: "K",
      },
    },
    {
      name: "small key",
      props: { size: "sm" },
      children: "Esc",
      query: { selector: "kbd" },
      expected: { classes: ["mild-kbd--sm"], absentClasses: ["mild-kbd--md"] },
    },
    {
      name: "large key",
      props: { size: "lg" },
      children: "Enter",
      query: { selector: "kbd" },
      expected: { classes: ["mild-kbd--lg"] },
    },
    {
      name: "custom className is merged",
      props: { className: "custom-kbd" },
      children: "A",
      query: { selector: "kbd" },
      expected: { classes: ["mild-kbd", "custom-kbd"] },
    },
  ],
};

export default kbdCases;
