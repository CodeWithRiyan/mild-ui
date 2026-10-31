// Shared cases for <Alert />
import type { ComponentCases } from "../types";

export const alertCases: ComponentCases = {
  component: "Alert",
  cases: [
    {
      name: "default renders a subtle info status with title and description",
      props: { title: "Heads up", description: "Something happened." },
      query: { role: "status" },
      expected: {
        classes: ["mild-alert", "mild-alert--subtle", "mild-alert--info"],
        absentClasses: ["mild-alert--dismissible"],
        attributes: { "data-status": "info" },
      },
      parts: [
        { query: { selector: ".mild-alert__title" }, text: "Heads up" },
        { query: { selector: ".mild-alert__description" }, text: "Something happened." },
        { query: { selector: ".mild-alert__icon" }, attributes: { "aria-hidden": "true" } },
      ],
    },
    {
      name: "error alert is assertive",
      props: { status: "error", variant: "solid", size: "sm" },
      children: "Failed",
      query: { role: "alert" },
      expected: {
        classes: ["mild-alert--solid", "mild-alert--error", "mild-alert--sm"],
        absentClasses: ["mild-alert--subtle", "mild-alert--info"],
        text: "Failed",
      },
    },
    {
      name: "warning alert with the left accent",
      props: { status: "warning", variant: "left-accent", size: "lg" },
      children: "Careful",
      query: { role: "alert" },
      expected: { classes: ["mild-alert--left-accent", "mild-alert--warning", "mild-alert--lg"] },
    },
    {
      name: "dismissible alert renders a named close button",
      props: { status: "success", dismissible: true, dismissLabel: "Hide" },
      children: "Saved",
      query: { role: "status" },
      expected: { classes: ["mild-alert--dismissible", "mild-alert--success"] },
      parts: [{ query: { role: "button", name: "Hide" }, classes: ["mild-alert__dismiss"] }],
    },
    {
      name: "custom className is merged",
      props: { className: "custom-alert" },
      children: "Note",
      query: { role: "status" },
      expected: { classes: ["mild-alert", "custom-alert"] },
    },
  ],
};

export default alertCases;
