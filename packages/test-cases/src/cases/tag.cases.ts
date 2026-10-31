// Shared cases for <Tag />. The framework test passes an `onClose` handler when `closable` is set.
import type { ComponentCases } from "../types";

export const tagCases: ComponentCases = {
  component: "Tag",
  cases: [
    {
      name: "default renders a subtle gray label without a close button",
      props: {},
      children: "Design",
      query: { selector: ".mild-tag" },
      expected: {
        classes: ["mild-tag", "mild-tag--subtle", "mild-tag--gray", "mild-tag--md"],
        text: "Design",
      },
      parts: [{ query: { selector: ".mild-tag__label" }, text: "Design" }],
    },
    {
      name: "closable tag renders a remove button named after the label",
      props: { closable: true },
      children: "Design",
      query: { role: "button", name: "Remove Design" },
      expected: { classes: ["mild-tag__close"], attributes: { type: "button" } },
    },
    {
      name: "disabled closable tag disables the button",
      props: {
        closable: true,
        disabled: true,
        variant: "solid",
        colorScheme: "primary",
        size: "lg",
        pill: true,
      },
      children: "Design",
      query: { selector: ".mild-tag" },
      expected: {
        classes: [
          "mild-tag--solid",
          "mild-tag--primary",
          "mild-tag--lg",
          "mild-tag--pill",
          "mild-tag--disabled",
        ],
        attributes: { "data-disabled": "" },
      },
      parts: [{ query: { role: "button", name: "Remove Design" }, attributes: { disabled: "" } }],
    },
    {
      name: "custom className is merged",
      props: { className: "custom-tag" },
      children: "x",
      query: { selector: ".mild-tag" },
      expected: { classes: ["mild-tag", "custom-tag"] },
    },
  ],
};

export default tagCases;
