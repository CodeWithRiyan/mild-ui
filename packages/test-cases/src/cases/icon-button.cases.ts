// Shared cases for <IconButton />. The framework test supplies the `icon` node.
import type { ComponentCases } from "../types";

export const iconButtonCases: ComponentCases = {
  component: "IconButton",
  cases: [
    {
      name: "default renders a square md primary button named by its label",
      props: { label: "Search" },
      query: { role: "button", name: "Search" },
      expected: {
        classes: [
          "mild-button",
          "mild-button--primary",
          "mild-button--md",
          "mild-icon-button",
          "mild-icon-button--md",
        ],
        absentClasses: ["mild-icon-button--round"],
        attributes: { "aria-label": "Search", type: "button" },
      },
      parts: [
        { query: { selector: ".mild-icon-button__icon" }, attributes: { "aria-hidden": "true" } },
      ],
    },
    {
      name: "ghost small round icon button",
      props: { label: "More", variant: "ghost", size: "sm", round: true },
      query: { role: "button", name: "More" },
      expected: {
        classes: [
          "mild-button--ghost",
          "mild-button--sm",
          "mild-icon-button--sm",
          "mild-icon-button--round",
        ],
        absentClasses: ["mild-icon-button--md"],
      },
    },
    {
      name: "disabled icon button",
      props: { label: "Delete", disabled: true },
      query: { role: "button", name: "Delete" },
      expected: {
        classes: ["mild-button--disabled"],
        attributes: { disabled: "", "aria-disabled": "true" },
      },
    },
    {
      name: "custom className is merged",
      props: { label: "Edit", className: "custom-icon-button" },
      query: { role: "button", name: "Edit" },
      expected: { classes: ["mild-icon-button", "custom-icon-button"] },
    },
  ],
};

export default iconButtonCases;
