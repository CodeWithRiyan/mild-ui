// Shared cases for <Box />
import type { ComponentCases } from "../types";

export const boxCases: ComponentCases = {
  component: "Box",
  cases: [
    {
      name: "default renders a block div",
      props: {},
      children: "content",
      query: { selector: "div" },
      expected: {
        classes: ["mild-box", "mild-box--block"],
        text: "content",
      },
    },
    {
      name: "flex box with centered content",
      props: { display: "flex", alignItems: "center", justifyContent: "center" },
      children: "centered",
      query: { selector: "div" },
      expected: {
        classes: ["mild-box--flex", "mild-box--items-center", "mild-box--justify-center"],
        absentClasses: ["mild-box--block"],
      },
    },
    {
      name: "custom className is merged",
      props: { className: "custom-box" },
      query: { selector: "div" },
      expected: { classes: ["mild-box", "custom-box"] },
    },
  ],
};

export default boxCases;
