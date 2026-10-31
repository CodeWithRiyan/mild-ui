// Shared cases for <ButtonGroup />. The framework test renders two buttons inside.
import type { ComponentCases } from "../types";

export const buttonGroupCases: ComponentCases = {
  component: "ButtonGroup",
  cases: [
    {
      name: "default renders a horizontal group of buttons",
      props: { "aria-label": "Actions" },
      query: { role: "group", name: "Actions" },
      expected: {
        classes: ["mild-button-group"],
        absentClasses: ["mild-button-group--attached", "mild-button-group--vertical"],
        attributes: { "data-orientation": "horizontal" },
        absentAttributes: ["aria-disabled"],
      },
    },
    {
      name: "attached vertical full-width group",
      props: { attached: true, orientation: "vertical", fullWidth: true },
      query: { role: "group" },
      expected: {
        classes: [
          "mild-button-group--attached",
          "mild-button-group--vertical",
          "mild-button-group--full-width",
        ],
        attributes: { "data-orientation": "vertical" },
      },
    },
    {
      name: "size and variant are handed to the buttons inside",
      props: { size: "sm", variant: "outline" },
      query: { role: "group" },
      parts: [
        {
          query: { role: "button", name: "One" },
          classes: ["mild-button--sm", "mild-button--outline"],
          absentClasses: ["mild-button--md", "mild-button--solid"],
        },
      ],
    },
    {
      name: "disabled group disables the buttons inside",
      props: { disabled: true },
      query: { role: "group" },
      expected: { attributes: { "aria-disabled": "true" } },
      parts: [{ query: { role: "button", name: "Two" }, attributes: { disabled: "" } }],
    },
    {
      name: "custom className is merged",
      props: { className: "custom-group" },
      query: { role: "group" },
      expected: { classes: ["mild-button-group", "custom-group"] },
    },
  ],
};

export default buttonGroupCases;
