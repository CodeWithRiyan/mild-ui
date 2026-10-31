// Shared cases for <Accordion /> (two items, "a" and "b")
import type { ComponentCases } from "../types";

export const accordionCases: ComponentCases = {
  component: "Accordion",
  cases: [
    {
      name: "default renders collapsed h3 headers with aria-expanded",
      props: {},
      query: { selector: ".mild-accordion" },
      expected: {
        classes: ["mild-accordion", "mild-accordion--default", "mild-accordion--single"],
        attributes: { "data-type": "single" },
      },
      parts: [
        { query: { selector: "h3.mild-accordion-header" } },
        {
          query: { role: "button", name: "Item A" },
          classes: ["mild-accordion-trigger"],
          attributes: { "aria-expanded": "false", "data-state": "closed", "data-value": "a" },
        },
        { query: { selector: ".mild-accordion-item" }, attributes: { "data-state": "closed" } },
        {
          query: { selector: ".mild-accordion-content" },
          attributes: { hidden: "", "data-state": "closed" },
        },
      ],
    },
    {
      name: "default value expands its item and region",
      props: { defaultValue: "b" },
      query: { role: "button", name: "Item B" },
      expected: { attributes: { "aria-expanded": "true", "data-state": "open" } },
      parts: [
        {
          query: { role: "region", name: "Item B" },
          attributes: { "data-state": "open" },
          text: "Body B",
        },
      ],
    },
    {
      name: "multiple type, bordered, large, heading level 2",
      props: {
        type: "multiple",
        defaultValue: ["a", "b"],
        variant: "bordered",
        size: "lg",
        headingLevel: 2,
      },
      query: { selector: ".mild-accordion" },
      expected: {
        classes: ["mild-accordion--multiple", "mild-accordion--bordered", "mild-accordion--lg"],
        attributes: { "data-type": "multiple" },
      },
      parts: [
        { query: { selector: "h2.mild-accordion-header" } },
        {
          query: { role: "button", name: "Item A" },
          classes: ["mild-accordion-trigger--lg"],
          attributes: { "aria-expanded": "true" },
        },
        { query: { role: "button", name: "Item B" }, attributes: { "aria-expanded": "true" } },
      ],
    },
    {
      name: "custom className is merged",
      props: { className: "custom-accordion" },
      query: { selector: ".mild-accordion" },
      expected: { classes: ["mild-accordion", "custom-accordion"] },
    },
  ],
};

export default accordionCases;
