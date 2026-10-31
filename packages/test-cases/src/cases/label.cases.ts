// Shared cases for <Label />
import type { ComponentCases } from "../types";

export const labelCases: ComponentCases = {
  component: "Label",
  cases: [
    {
      name: "default label renders its text",
      props: { htmlFor: "field" },
      children: "Email",
      query: { selector: "label" },
      expected: {
        classes: ["mild-label"],
        attributes: { for: "field" },
        text: "Email",
      },
    },
    {
      name: "required label",
      props: { required: true },
      children: "Name",
      query: { selector: "label" },
      expected: { classes: ["mild-label--required"] },
    },
    {
      name: "error label",
      props: { error: true },
      children: "Name",
      query: { selector: "label" },
      expected: { classes: ["mild-label--error"] },
    },
  ],
};

export default labelCases;
