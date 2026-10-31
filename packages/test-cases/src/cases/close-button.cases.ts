// Shared cases for <CloseButton />
import type { ComponentCases } from "../types";

export const closeButtonCases: ComponentCases = {
  component: "CloseButton",
  cases: [
    {
      name: "default is a ghost icon button named Close",
      props: {},
      query: { role: "button", name: "Close" },
      expected: {
        classes: [
          "mild-close-button",
          "mild-icon-button",
          "mild-icon-button--md",
          "mild-button--ghost",
        ],
        attributes: { "aria-label": "Close", type: "button" },
      },
      parts: [{ query: { selector: "svg" }, attributes: { "aria-hidden": "true" } }],
    },
    {
      name: "label and size can be changed",
      props: { label: "Dismiss notification", size: "sm" },
      query: { role: "button", name: "Dismiss notification" },
      expected: { classes: ["mild-icon-button--sm"], absentClasses: ["mild-icon-button--md"] },
    },
    {
      name: "disabled close button",
      props: { disabled: true },
      query: { role: "button", name: "Close" },
      expected: { attributes: { disabled: "" } },
    },
    {
      name: "custom className is merged",
      props: { className: "custom-close" },
      query: { role: "button", name: "Close" },
      expected: { classes: ["mild-close-button", "custom-close"] },
    },
  ],
};

export default closeButtonCases;
