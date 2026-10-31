// Shared cases for <Input />
import type { ComponentCases } from "../types";

export const inputCases: ComponentCases = {
  component: "Input",
  cases: [
    {
      name: "default is an outline md full-width textbox",
      props: {},
      query: { role: "textbox" },
      expected: {
        classes: ["mild-input", "mild-input--outline", "mild-input--md", "mild-input--full-width"],
        attributes: { type: "text" },
      },
    },
    {
      name: "error state",
      props: { error: true },
      query: { role: "textbox" },
      expected: { classes: ["mild-input--error"], attributes: { "aria-invalid": "true" } },
    },
    {
      name: "isInvalid is an alias of error",
      props: { isInvalid: true },
      query: { role: "textbox" },
      expected: { classes: ["mild-input--error"], attributes: { "aria-invalid": "true" } },
    },
    {
      name: "valid input carries no aria-invalid",
      props: {},
      query: { role: "textbox" },
      expected: { absentAttributes: ["aria-invalid"] },
    },
    {
      name: "disabled input",
      props: { isDisabled: true },
      query: { selector: "input" },
      expected: {
        classes: ["mild-input--disabled"],
        attributes: { disabled: "" },
      },
    },
    {
      name: "required readonly input",
      props: { isRequired: true, isReadOnly: true },
      query: { role: "textbox" },
      expected: {
        classes: ["mild-input--required", "mild-input--readonly"],
        attributes: { required: "", readonly: "" },
      },
    },
    {
      name: "placeholder is forwarded",
      props: { placeholder: "Type here" },
      query: { role: "textbox" },
      expected: { attributes: { placeholder: "Type here" } },
    },
  ],
};

export default inputCases;
