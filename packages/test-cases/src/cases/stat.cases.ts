// Shared cases for <Stat />
import type { ComponentCases } from "../types";

export const statCases: ComponentCases = {
  component: "Stat",
  cases: [
    {
      name: "default renders label, value and help text",
      props: { label: "Revenue", value: "$12,400", helpText: "Last 30 days" },
      query: { selector: ".mild-stat" },
      expected: { classes: ["mild-stat", "mild-stat--md"] },
      parts: [
        { query: { selector: ".mild-stat__label" }, text: "Revenue" },
        { query: { selector: ".mild-stat__value" }, text: "$12,400" },
        { query: { selector: ".mild-stat__help" }, text: "Last 30 days" },
      ],
    },
    {
      name: "increase trend is announced in words",
      props: { label: "Users", value: "1,204", trend: "increase", trendValue: "12%", size: "lg" },
      query: { selector: ".mild-stat" },
      expected: { classes: ["mild-stat--lg"] },
      parts: [
        {
          query: { selector: ".mild-stat__trend" },
          classes: ["mild-stat__trend--increase"],
          attributes: { "data-trend": "increase" },
          text: "increased by 12%",
        },
      ],
    },
    {
      name: "decrease trend",
      props: { label: "Churn", value: "2%", trend: "decrease", trendValue: "0.4%", size: "sm" },
      query: { selector: ".mild-stat__trend" },
      expected: { classes: ["mild-stat__trend--decrease"], text: "decreased by 0.4%" },
    },
    {
      name: "custom className is merged",
      props: { label: "A", value: "1", className: "custom-stat" },
      query: { selector: ".mild-stat" },
      expected: { classes: ["mild-stat", "custom-stat"] },
    },
  ],
};

export default statCases;
