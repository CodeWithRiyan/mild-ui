// Shared cases for <AvatarGroup /> (the framework test renders four named avatars inside)
import type { ComponentCases } from "../types";

export const avatarGroupCases: ComponentCases = {
  component: "AvatarGroup",
  cases: [
    {
      name: "default shows every avatar in a group",
      props: { "aria-label": "Team" },
      query: { role: "group", name: "Team" },
      expected: { classes: ["mild-avatar-group"] },
      parts: [{ query: { role: "img", name: "Edsger Dijkstra" } }],
    },
    {
      name: "max hides the rest behind a +N avatar sized like the group",
      props: { max: 2, size: "sm" },
      query: { role: "img", name: "2 more" },
      expected: {
        classes: ["mild-avatar", "mild-avatar--sm", "mild-avatar-group__overflow"],
        attributes: { "data-overflow": "" },
        text: "+2",
      },
      parts: [{ query: { role: "img", name: "Ada Lovelace" }, classes: ["mild-avatar--sm"] }],
    },
    {
      name: "custom className is merged",
      props: { className: "custom-group" },
      query: { role: "group" },
      expected: { classes: ["mild-avatar-group", "custom-group"] },
    },
  ],
};

export default avatarGroupCases;
