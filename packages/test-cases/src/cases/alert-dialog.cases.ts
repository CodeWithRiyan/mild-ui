// Shared cases for <AlertDialog /> (rendered open)
import type { ComponentCases } from "../types";

export const alertDialogCases: ComponentCases = {
  component: "AlertDialog",
  cases: [
    {
      name: "open alert dialog renders role=alertdialog named by its title",
      props: { open: true },
      query: { role: "alertdialog", name: "Delete project?" },
      expected: {
        classes: ["mild-modal-content", "mild-modal-content--alert"],
        attributes: { "aria-modal": "true" },
      },
      parts: [{ query: { selector: ".mild-modal-description" }, text: "This cannot be undone." }],
    },
    {
      name: "size maps onto the panel",
      props: { open: true, size: "sm" },
      query: { role: "alertdialog" },
      expected: { classes: ["mild-modal-content--sm"] },
    },
  ],
};

export default alertDialogCases;
