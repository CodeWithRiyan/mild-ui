// Shared cases for <Text />
import type { ComponentCases } from "../types";

export const textCases: ComponentCases = {
  component: "Text",
  cases: [
    {
      name: "default renders a span with md/normal/left classes",
      props: {},
      children: "Hello",
      query: { selector: "span" },
      expected: {
        classes: ["mild-text", "mild-text--md", "mild-text--normal", "mild-text--left"],
        text: "Hello",
      },
    },
    {
      name: "renders as h1 when asked",
      props: { as: "h1", fontSize: "2xl", fontWeight: "bold" },
      children: "Title",
      query: { role: "heading" },
      expected: {
        classes: ["mild-text", "mild-text--2xl", "mild-text--bold"],
        text: "Title",
      },
    },
    {
      name: "truncated uppercase text",
      props: { truncate: true, textTransform: "uppercase" },
      children: "Long text",
      query: { selector: "span" },
      expected: { classes: ["mild-text--truncate", "mild-text--uppercase"] },
    },
  ],
};

export default textCases;
