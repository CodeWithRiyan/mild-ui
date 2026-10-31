// Shared cases for <Link />
import type { ComponentCases } from "../types";

export const linkCases: ComponentCases = {
  component: "Link",
  cases: [
    {
      name: "default renders an anchor underlined on hover",
      props: { href: "/docs" },
      children: "Docs",
      query: { role: "link" },
      expected: {
        classes: ["mild-link", "mild-link--underline-hover"],
        attributes: { href: "/docs" },
        absentAttributes: ["target", "rel", "aria-disabled"],
        text: "Docs",
      },
    },
    {
      name: "external link opens safely in a new tab",
      props: { href: "https://example.com", external: true, underline: "always" },
      children: "Example",
      query: { role: "link" },
      expected: {
        classes: ["mild-link--underline-always"],
        attributes: { target: "_blank", rel: "noopener noreferrer" },
      },
    },
    {
      name: "plain link inherits the text color",
      props: { href: "/", plain: true, underline: "none" },
      children: "Home",
      query: { role: "link" },
      expected: { classes: ["mild-link--plain", "mild-link--underline-none"] },
    },
    {
      name: "disabled link is inert but keeps the link role",
      props: { href: "/docs", disabled: true },
      children: "Docs",
      query: { role: "link" },
      expected: {
        classes: ["mild-link--disabled"],
        attributes: { "aria-disabled": "true", tabindex: "-1" },
        absentAttributes: ["href"],
      },
    },
    {
      name: "custom className is merged",
      props: { href: "/", className: "custom-link" },
      children: "Home",
      query: { role: "link" },
      expected: { classes: ["mild-link", "custom-link"] },
    },
  ],
};

export default linkCases;
