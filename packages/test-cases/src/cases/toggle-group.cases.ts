// Shared cases for <ToggleGroup />. The framework test renders items "left", "center" and
// "right" (the last one disabled) inside the group.
import type { ComponentCases } from "../types";

export const toggleGroupCases: ComponentCases = {
  component: "ToggleGroup",
  cases: [
    {
      name: "default renders a horizontal single-select group",
      props: { "aria-label": "Alignment" },
      query: { role: "group", name: "Alignment" },
      expected: {
        classes: ["mild-toggle-group"],
        absentClasses: ["mild-toggle-group--attached", "mild-toggle-group--vertical"],
        attributes: { "data-orientation": "horizontal" },
        absentAttributes: ["aria-disabled"],
      },
      parts: [
        {
          query: { role: "button", name: "left" },
          classes: [
            "mild-toggle",
            "mild-toggle-group__item",
            "mild-toggle--ghost",
            "mild-toggle--md",
          ],
          attributes: { "aria-pressed": "false", "data-value": "left", tabindex: "0" },
        },
        {
          query: { role: "button", name: "center" },
          attributes: { "aria-pressed": "false", tabindex: "-1" },
        },
      ],
    },
    {
      name: "single default value presses one item",
      props: { defaultValue: "center" },
      query: { role: "group" },
      parts: [
        { query: { role: "button", name: "left" }, attributes: { "aria-pressed": "false" } },
        {
          query: { role: "button", name: "center" },
          attributes: { "aria-pressed": "true", tabindex: "0" },
        },
      ],
    },
    {
      name: "multiple default value presses several items",
      props: { type: "multiple", defaultValue: ["left", "center"] },
      query: { role: "group" },
      parts: [
        { query: { role: "button", name: "left" }, attributes: { "aria-pressed": "true" } },
        { query: { role: "button", name: "center" }, attributes: { "aria-pressed": "true" } },
      ],
    },
    {
      name: "variant, size and disabled reach the items",
      props: { variant: "outline", size: "sm", disabled: true },
      query: { role: "group" },
      expected: { attributes: { "aria-disabled": "true" } },
      parts: [
        {
          query: { role: "button", name: "left" },
          classes: ["mild-toggle--outline", "mild-toggle--sm"],
          attributes: { disabled: "" },
        },
      ],
    },
    {
      name: "an item can be disabled on its own",
      props: {},
      query: { role: "group" },
      parts: [
        { query: { role: "button", name: "right" }, attributes: { disabled: "" } },
        { query: { role: "button", name: "left" }, absentAttributes: ["disabled"] },
      ],
    },
    {
      name: "attached vertical group",
      props: { attached: true, orientation: "vertical", className: "custom-toggle-group" },
      query: { role: "group" },
      expected: {
        classes: [
          "mild-toggle-group--attached",
          "mild-toggle-group--vertical",
          "custom-toggle-group",
        ],
        attributes: { "data-orientation": "vertical" },
      },
    },
  ],
};

export default toggleGroupCases;
