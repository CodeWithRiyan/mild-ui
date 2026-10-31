// Shared cases for <Progress />
import type { ComponentCases } from "../types";

export const progressCases: ComponentCases = {
  component: "Progress",
  cases: [
    {
      name: "determinate bar exposes value, min and max",
      props: { value: 40, label: "Upload" },
      query: { role: "progressbar", name: "Upload" },
      expected: {
        classes: ["mild-progress", "mild-progress--md", "mild-progress--primary"],
        absentClasses: ["mild-progress--indeterminate"],
        attributes: {
          "aria-valuenow": "40",
          "aria-valuemin": "0",
          "aria-valuemax": "100",
          "aria-valuetext": "40%",
        },
        absentAttributes: ["aria-busy"],
      },
      parts: [{ query: { selector: ".mild-progress__bar" } }],
    },
    {
      name: "indeterminate bar is busy and has no current value",
      props: { indeterminate: true },
      query: { role: "progressbar" },
      expected: {
        classes: ["mild-progress--indeterminate"],
        attributes: { "aria-busy": "true" },
        absentAttributes: ["aria-valuenow"],
      },
    },
    {
      name: "size, color scheme, stripes and a custom range",
      props: { value: 3, min: 0, max: 4, size: "lg", colorScheme: "success", striped: true },
      query: { role: "progressbar" },
      expected: {
        classes: ["mild-progress--lg", "mild-progress--success", "mild-progress--striped"],
        attributes: { "aria-valuenow": "3", "aria-valuemax": "4", "aria-valuetext": "75%" },
      },
    },
    {
      name: "custom className is merged",
      props: { value: 10, className: "custom-progress" },
      query: { role: "progressbar" },
      expected: { classes: ["mild-progress", "custom-progress"] },
    },
  ],
};

export default progressCases;
