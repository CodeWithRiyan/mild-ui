// Shared cases for <InputPassword />
import type { ComponentCases } from "../types";

export const inputPasswordCases: ComponentCases = {
  component: "InputPassword",
  cases: [
    {
      name: "default renders a password input with a show toggle",
      props: {},
      query: { selector: "input" },
      expected: {
        classes: ["mild-input-password"],
        attributes: { type: "password" },
      },
      parts: [
        {
          query: { role: "button", name: "Show password" },
          classes: ["mild-input-password-toggle"],
          attributes: { type: "button" },
        },
      ],
    },
    {
      name: "error state",
      props: { error: true },
      query: { selector: "input" },
      expected: {
        classes: ["mild-input-password--error"],
        attributes: { "aria-invalid": "true" },
      },
    },
    {
      name: "disabled input",
      props: { isDisabled: true },
      query: { selector: "input" },
      expected: {
        classes: ["mild-input-password--disabled"],
        attributes: { disabled: "" },
      },
    },
  ],
};

export default inputPasswordCases;
