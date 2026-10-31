// Shared cases for <FormField /> (label + control + description + error, linked automatically).
// The framework test renders one FormField around a text input; `props` are the FormField props.
import type { ComponentCases } from "../types";

export const formCases: ComponentCases = {
  component: "Form",
  cases: [
    {
      name: "field renders its label wired to the control",
      props: { name: "email", label: "Email" },
      query: { role: "textbox", name: "Email" },
      expected: {
        attributes: { name: "email" },
        absentAttributes: ["aria-invalid", "aria-describedby"],
      },
    },
    {
      name: "field renders and links its description",
      props: { name: "email", label: "Email", description: "We never share it" },
      query: { role: "textbox", name: "Email" },
      parts: [{ query: { selector: "[id$='-form-item-description']" }, text: "We never share it" }],
    },
    {
      name: "field with an error is invalid and described by the message",
      props: { name: "email", label: "Email", error: "Required" },
      query: { role: "textbox", name: "Email" },
      expected: { attributes: { "aria-invalid": "true" } },
      parts: [{ query: { role: "alert" }, text: "Required" }],
    },
    {
      name: "required field marks the control, not the label text",
      props: { name: "email", label: "Email", required: true },
      query: { role: "textbox", name: "Email" },
      expected: { attributes: { required: "" } },
      parts: [
        { query: { selector: "[data-required-marker]" }, attributes: { "aria-hidden": "true" } },
      ],
    },
  ],
};

export default formCases;
