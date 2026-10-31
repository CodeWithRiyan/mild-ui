// Shared cases for <Tabs /> (two tabs, "one" and "two", with panels)
import type { ComponentCases } from "../types";

export const tabsCases: ComponentCases = {
  component: "Tabs",
  cases: [
    {
      name: "default value selects its tab and shows its panel",
      props: { defaultValue: "one" },
      query: { role: "tablist" },
      expected: {
        classes: ["mild-tabs-list", "mild-tabs-list--default", "mild-tabs-list--horizontal"],
        attributes: { "aria-orientation": "horizontal" },
      },
      parts: [
        {
          query: { role: "tab", name: "One" },
          classes: ["mild-tabs-trigger", "mild-tabs-trigger--active"],
          attributes: { "aria-selected": "true", tabindex: "0", "data-state": "active" },
        },
        {
          query: { role: "tab", name: "Two" },
          absentClasses: ["mild-tabs-trigger--active"],
          attributes: { "aria-selected": "false", tabindex: "-1" },
        },
        {
          query: { role: "tabpanel", name: "One" },
          classes: ["mild-tabs-content"],
          text: "Panel one",
        },
      ],
    },
    {
      name: "pills variant, small, vertical",
      props: { defaultValue: "two", variant: "pills", size: "sm", orientation: "vertical" },
      query: { role: "tablist" },
      expected: {
        classes: ["mild-tabs-list--pills", "mild-tabs-list--sm", "mild-tabs-list--vertical"],
        attributes: { "aria-orientation": "vertical" },
      },
      parts: [
        {
          query: { role: "tab", name: "Two" },
          classes: ["mild-tabs-trigger--sm"],
          attributes: { "aria-selected": "true" },
        },
        { query: { role: "tabpanel" }, classes: ["mild-tabs-content--sm"], text: "Panel two" },
      ],
    },
    {
      name: "custom className is merged on the root",
      props: { defaultValue: "one", className: "custom-tabs" },
      query: { selector: ".mild-tabs" },
      expected: { classes: ["mild-tabs", "custom-tabs"] },
    },
  ],
};

export default tabsCases;
