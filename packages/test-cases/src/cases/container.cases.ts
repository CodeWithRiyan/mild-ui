// Shared cases for <Container />
import type { ComponentCases } from "../types";

export const containerCases: ComponentCases = {
  component: "Container",
  cases: [
    {
      name: "default renders a lg container div",
      props: {},
      children: "content",
      query: { selector: "div" },
      expected: {
        classes: ["mild-container", "mild-container--lg"],
        absentClasses: ["mild-container--center-content"],
        text: "content",
      },
    },
    {
      name: "small container with centered content",
      props: { size: "sm", centerContent: true },
      children: "centered",
      query: { selector: "div" },
      expected: {
        classes: ["mild-container--sm", "mild-container--center-content"],
        absentClasses: ["mild-container--lg"],
      },
    },
    {
      name: "full-width container renders as main",
      props: { as: "main", size: "full" },
      children: "page",
      query: { role: "main" },
      expected: { classes: ["mild-container", "mild-container--full"], text: "page" },
    },
    {
      name: "custom className is merged",
      props: { className: "custom-container" },
      query: { selector: "div" },
      expected: { classes: ["mild-container", "custom-container"] },
    },
  ],
};

export default containerCases;
