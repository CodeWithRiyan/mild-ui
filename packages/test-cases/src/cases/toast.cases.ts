// Shared cases for <Toast /> (one notification, rendered standalone)
import type { ComponentCases } from "../types";

export const toastCases: ComponentCases = {
  component: "Toast",
  cases: [
    {
      name: "default renders a polite info status with a close button",
      props: { title: "Saved", description: "All good.", duration: null },
      query: { role: "status" },
      expected: {
        classes: ["mild-toast", "mild-toast--info"],
        attributes: { "data-status": "info" },
      },
      parts: [
        { query: { selector: ".mild-toast__title" }, text: "Saved" },
        { query: { selector: ".mild-toast__description" }, text: "All good." },
        { query: { selector: ".mild-toast__icon" }, attributes: { "aria-hidden": "true" } },
        { query: { role: "button", name: "Close" }, classes: ["mild-toast__close"] },
      ],
    },
    {
      name: "error toast is an alert",
      props: { title: "Failed", status: "error", duration: null },
      query: { role: "alert" },
      expected: { classes: ["mild-toast--error"], attributes: { "data-status": "error" } },
    },
    {
      name: "closable=false drops the close button and closeLabel renames it",
      props: { title: "Quiet", closable: false, duration: null },
      query: { role: "status" },
      expected: { classes: ["mild-toast"] },
      parts: [{ query: { selector: ".mild-toast__content" }, text: "Quiet" }],
    },
    {
      name: "custom close label",
      props: { title: "Note", closeLabel: "Dismiss", duration: null },
      query: { role: "button", name: "Dismiss" },
      expected: { classes: ["mild-toast__close"] },
    },
    {
      name: "custom className is merged",
      props: { title: "Note", className: "custom-toast", duration: null },
      query: { role: "status" },
      expected: { classes: ["mild-toast", "custom-toast"] },
    },
  ],
};

export default toastCases;
