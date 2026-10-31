// Shared cases for <Avatar />
import type { ComponentCases } from "../types";

export const avatarCases: ComponentCases = {
  component: "Avatar",
  cases: [
    {
      name: "without a picture the initials stand in and the name is the label",
      props: { name: "Ada Lovelace" },
      query: { role: "img", name: "Ada Lovelace" },
      expected: {
        classes: ["mild-avatar", "mild-avatar--md", "mild-avatar--circle"],
        attributes: { "data-state": "fallback" },
      },
      parts: [
        {
          query: { selector: ".mild-avatar__fallback" },
          text: "AL",
          attributes: { "aria-hidden": "true" },
        },
      ],
    },
    {
      name: "with a picture the image carries the name",
      props: { src: "ada.png", name: "Ada Lovelace" },
      query: { role: "img", name: "Ada Lovelace" },
      expected: { classes: ["mild-avatar__image"], attributes: { src: "ada.png" } },
    },
    {
      name: "large square bordered avatar with a status",
      props: { name: "Ada Lovelace", size: "lg", shape: "square", bordered: true, status: "busy" },
      query: { selector: ".mild-avatar" },
      expected: { classes: ["mild-avatar--lg", "mild-avatar--square", "mild-avatar--bordered"] },
      parts: [
        {
          query: { role: "img", name: "busy" },
          classes: ["mild-avatar__badge", "mild-avatar__badge--busy"],
        },
      ],
    },
    {
      name: "custom className is merged",
      props: { name: "A", className: "custom-avatar" },
      query: { selector: ".mild-avatar" },
      expected: { classes: ["mild-avatar", "custom-avatar"] },
    },
  ],
};

export default avatarCases;
