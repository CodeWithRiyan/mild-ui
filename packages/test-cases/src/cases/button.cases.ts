// Shared cases for <Button />
import type { ComponentCases } from "../types";

export const buttonCases: ComponentCases = {
  component: "Button",
  cases: [
    {
      name: "default is a primary md button",
      props: {},
      children: "Click me",
      query: { role: "button", name: "Click me" },
      expected: {
        classes: ["mild-button", "mild-button--primary", "mild-button--solid", "mild-button--md"],
        attributes: { type: "button" },
        absentAttributes: ["aria-busy", "aria-disabled", "disabled"],
        text: "Click me",
      },
    },
    {
      name: "secondary small button",
      props: { variant: "secondary", size: "sm" },
      children: "Save",
      query: { role: "button" },
      expected: {
        // Solid variants carry their own color: no stray mild-button--primary.
        classes: ["mild-button", "mild-button--secondary", "mild-button--solid", "mild-button--sm"],
        absentClasses: ["mild-button--primary"],
      },
    },
    {
      name: "outline full-width button",
      props: { variant: "outline", fullWidth: true },
      children: "Continue",
      query: { role: "button" },
      expected: {
        classes: ["mild-button--outline", "mild-button--full-width"],
      },
    },
    {
      name: "disabled button",
      props: { disabled: true },
      children: "Nope",
      query: { role: "button" },
      expected: {
        classes: ["mild-button--disabled"],
        attributes: { disabled: "", "aria-disabled": "true" },
      },
    },
    {
      name: "loading button",
      props: { loading: true },
      children: "Loading",
      query: { role: "button" },
      expected: {
        classes: ["mild-button--loading"],
        // Busy, not disabled: focus must survive a submit.
        attributes: { "aria-busy": "true", "aria-disabled": "true" },
        absentAttributes: ["disabled"],
      },
    },
  ],
};

export default buttonCases;
