// Shared cases for <ScrollArea />
import type { ComponentCases } from "../types";

export const scrollAreaCases: ComponentCases = {
  component: "ScrollArea",
  cases: [
    {
      name: "default renders a focusable vertical scroll div",
      props: {},
      children: "content",
      query: { selector: "div" },
      expected: {
        classes: ["mild-scroll-area", "mild-scroll-area--vertical"],
        absentClasses: ["mild-scroll-area--auto", "mild-scroll-area--always"],
        attributes: { tabindex: "0" },
        text: "content",
      },
    },
    {
      name: "horizontal area with scrollbars always shown",
      props: { orientation: "horizontal", scrollbars: "always" },
      query: { selector: "div" },
      expected: {
        classes: ["mild-scroll-area--horizontal", "mild-scroll-area--always"],
        absentClasses: ["mild-scroll-area--vertical"],
      },
    },
    {
      name: "both axes with hidden scrollbars",
      props: { orientation: "both", scrollbars: "hidden" },
      query: { selector: "div" },
      expected: { classes: ["mild-scroll-area--both", "mild-scroll-area--hidden"] },
    },
    {
      name: "tabIndex can be overridden and a region name given",
      props: { tabIndex: -1, role: "region", "aria-label": "Log" },
      query: { role: "region", name: "Log" },
      expected: { classes: ["mild-scroll-area"], attributes: { tabindex: "-1" } },
    },
    {
      name: "custom className is merged",
      props: { className: "custom-scroll" },
      query: { selector: "div" },
      expected: { classes: ["mild-scroll-area", "custom-scroll"] },
    },
  ],
};

export default scrollAreaCases;
