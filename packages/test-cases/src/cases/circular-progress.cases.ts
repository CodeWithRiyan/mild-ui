// Shared cases for <CircularProgress />
import type { ComponentCases } from "../types";

export const circularProgressCases: ComponentCases = {
  component: "CircularProgress",
  cases: [
    {
      name: "determinate ring exposes value, min and max",
      props: { value: 25, label: "Storage" },
      query: { role: "progressbar", name: "Storage" },
      expected: {
        classes: ["mild-circular-progress", "mild-circular-progress--md"],
        attributes: { "aria-valuenow": "25", "aria-valuemin": "0", "aria-valuemax": "100" },
      },
      parts: [
        { query: { selector: "svg" }, attributes: { "aria-hidden": "true" } },
        { query: { selector: ".mild-circular-progress__bar" } },
      ],
    },
    {
      name: "indeterminate ring is busy",
      props: { indeterminate: true, size: "xl", colorScheme: "warning" },
      query: { role: "progressbar" },
      expected: {
        classes: [
          "mild-circular-progress--indeterminate",
          "mild-circular-progress--xl",
          "mild-circular-progress--warning",
        ],
        attributes: { "aria-busy": "true" },
        absentAttributes: ["aria-valuenow"],
      },
    },
    {
      name: "showValue prints the percentage in the middle",
      props: { value: 50, showValue: true },
      query: { role: "progressbar" },
      parts: [{ query: { selector: ".mild-circular-progress__label" }, text: "50%" }],
    },
    {
      name: "custom className is merged",
      props: { value: 1, className: "custom-ring" },
      query: { role: "progressbar" },
      expected: { classes: ["mild-circular-progress", "custom-ring"] },
    },
  ],
};

export default circularProgressCases;
