// Shared cases for <SegmentedControl />
import type { ComponentCases } from "../types";

const items = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month", disabled: true },
];

export const segmentedControlCases: ComponentCases = {
  component: "SegmentedControl",
  cases: [
    {
      name: "default renders a horizontal radiogroup of segments",
      props: { items, "aria-label": "Range" },
      query: { role: "radiogroup", name: "Range" },
      expected: {
        classes: ["mild-segmented-control", "mild-segmented-control--md"],
        absentClasses: ["mild-segmented-control--vertical", "mild-segmented-control--full-width"],
        attributes: { "aria-orientation": "horizontal" },
        absentAttributes: ["aria-disabled"],
      },
      parts: [
        {
          query: { role: "radio", name: "Day" },
          classes: ["mild-segmented-control__item"],
          attributes: { "aria-checked": "false", "data-value": "day", type: "button" },
        },
      ],
    },
    {
      name: "default value checks its segment and becomes the tab stop",
      props: { items, defaultValue: "week" },
      query: { role: "radio", name: "Week" },
      expected: { attributes: { "aria-checked": "true", "data-state": "checked", tabindex: "0" } },
      parts: [
        {
          query: { role: "radio", name: "Day" },
          attributes: { "aria-checked": "false", tabindex: "-1" },
        },
      ],
    },
    {
      name: "disabled items render disabled",
      props: { items },
      query: { role: "radio", name: "Month" },
      expected: { attributes: { disabled: "" } },
    },
    {
      name: "name submits the value through a hidden input",
      props: { items, defaultValue: "day", name: "range" },
      query: { selector: "input[type='hidden']" },
      expected: { attributes: { name: "range", value: "day" } },
    },
    {
      name: "small, vertical, full-width and disabled group",
      props: { items, size: "sm", orientation: "vertical", fullWidth: true, disabled: true },
      query: { role: "radiogroup" },
      expected: {
        classes: [
          "mild-segmented-control--sm",
          "mild-segmented-control--vertical",
          "mild-segmented-control--full-width",
        ],
        attributes: { "aria-disabled": "true", "aria-orientation": "vertical" },
      },
      parts: [{ query: { role: "radio", name: "Day" }, attributes: { disabled: "" } }],
    },
    {
      name: "custom className is merged",
      props: { items, className: "custom-segmented" },
      query: { role: "radiogroup" },
      expected: { classes: ["mild-segmented-control", "custom-segmented"] },
    },
  ],
};

export default segmentedControlCases;
