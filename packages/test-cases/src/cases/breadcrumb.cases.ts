// Shared cases for <Breadcrumb />
import type { ComponentCases } from "../types";

const trail = [
  { label: "Home", href: "/" },
  { label: "Docs", href: "/docs" },
  { label: "Breadcrumb" },
];

export const breadcrumbCases: ComponentCases = {
  component: "Breadcrumb",
  cases: [
    {
      name: "items render a labelled nav with an ordered list",
      props: { items: trail },
      query: { role: "navigation", name: "Breadcrumb" },
      expected: { classes: ["mild-breadcrumb"] },
      parts: [
        { query: { selector: "ol.mild-breadcrumb__list" } },
        { query: { selector: ".mild-breadcrumb-item" }, text: "Home" },
      ],
    },
    {
      name: "the last item without href is the current page",
      props: { items: trail },
      query: { selector: ".mild-breadcrumb-page" },
      expected: {
        classes: ["mild-breadcrumb-page"],
        attributes: { "aria-current": "page" },
        text: "Breadcrumb",
      },
    },
    {
      name: "separators sit between the items and are hidden from assistive tech",
      props: { items: trail, separator: "›" },
      query: { selector: ".mild-breadcrumb-separator" },
      expected: { attributes: { "aria-hidden": "true" }, text: "›" },
    },
    {
      name: "intermediate steps are links",
      props: { items: trail },
      query: { role: "link", name: "Docs" },
      expected: {
        classes: ["mild-link", "mild-breadcrumb-link"],
        attributes: { href: "/docs" },
      },
    },
    {
      name: "custom className is merged",
      props: { items: trail, className: "custom-breadcrumb" },
      query: { role: "navigation", name: "Breadcrumb" },
      expected: { classes: ["mild-breadcrumb", "custom-breadcrumb"] },
    },
  ],
};

export default breadcrumbCases;
