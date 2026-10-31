// Shared cases for <Dialog /> (rendered open, with a title, description and close button)
import type { ComponentCases } from "../types";

export const dialogCases: ComponentCases = {
  component: "Dialog",
  cases: [
    {
      name: "open dialog renders a modal named by its title",
      props: { open: true },
      query: { role: "dialog", name: "Edit profile" },
      expected: {
        classes: ["mild-modal-content", "mild-modal-content--md"],
        attributes: { "aria-modal": "true" },
      },
      parts: [
        { query: { selector: ".mild-modal-title" }, text: "Edit profile" },
        { query: { selector: ".mild-modal-description" }, text: "Make changes." },
        { query: { role: "button", name: "Close" }, classes: ["mild-modal-close"] },
      ],
    },
    {
      name: "size maps onto the panel",
      props: { open: true, size: "lg" },
      query: { role: "dialog" },
      expected: { classes: ["mild-modal-content--lg"], absentClasses: ["mild-modal-content--md"] },
    },
  ],
};

export default dialogCases;
