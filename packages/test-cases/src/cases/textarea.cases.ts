// Shared cases for <Textarea />
import type { ComponentCases } from "../types";

export const textareaCases: ComponentCases = {
  component: "Textarea",
  cases: [
    {
      name: "default renders an outline md textarea with three rows",
      props: { placeholder: "Your message" },
      query: { role: "textbox" },
      expected: {
        classes: [
          "mild-textarea",
          "mild-textarea--outline",
          "mild-textarea--md",
          "mild-textarea--resize-vertical",
          "mild-textarea--full-width",
        ],
        absentClasses: ["mild-textarea--auto-resize", "mild-textarea--error"],
        attributes: { rows: "3", placeholder: "Your message" },
        absentAttributes: ["aria-invalid", "disabled", "readonly", "required"],
      },
    },
    {
      name: "filled small textarea without resize handle",
      props: { variant: "filled", size: "sm", resize: "none", rows: 5 },
      query: { role: "textbox" },
      expected: {
        classes: ["mild-textarea--filled", "mild-textarea--sm", "mild-textarea--resize-none"],
        absentClasses: ["mild-textarea--outline", "mild-textarea--md"],
        attributes: { rows: "5" },
      },
    },
    {
      name: "auto-resize textarea",
      props: { autoResize: true },
      query: { role: "textbox" },
      expected: { classes: ["mild-textarea--auto-resize"] },
    },
    {
      name: "invalid, required, read-only and disabled states reach the DOM",
      props: { isInvalid: true, isRequired: true, isReadOnly: true, isDisabled: true },
      query: { selector: "textarea" },
      expected: {
        classes: [
          "mild-textarea--error",
          "mild-textarea--required",
          "mild-textarea--readonly",
          "mild-textarea--disabled",
        ],
        attributes: { "aria-invalid": "true", required: "", readonly: "", disabled: "" },
      },
    },
    {
      name: "custom className is merged",
      props: { className: "custom-textarea" },
      query: { role: "textbox" },
      expected: { classes: ["mild-textarea", "custom-textarea"] },
    },
  ],
};

export default textareaCases;
