// Shared cases for <Skeleton />
import type { ComponentCases } from "../types";

export const skeletonCases: ComponentCases = {
  component: "Skeleton",
  cases: [
    {
      name: "default renders a hidden pulsing rectangle",
      props: {},
      query: { selector: ".mild-skeleton" },
      expected: {
        classes: ["mild-skeleton", "mild-skeleton--rect", "mild-skeleton--pulse"],
        attributes: { "aria-hidden": "true" },
      },
    },
    {
      name: "circle with the wave animation",
      props: { variant: "circle", animation: "wave" },
      query: { selector: ".mild-skeleton" },
      expected: {
        classes: ["mild-skeleton--circle", "mild-skeleton--wave"],
        absentClasses: ["mild-skeleton--rect", "mild-skeleton--pulse"],
      },
    },
    {
      name: "text line without animation",
      props: { variant: "text", animation: "none" },
      query: { selector: ".mild-skeleton" },
      expected: { classes: ["mild-skeleton--text", "mild-skeleton--none"] },
    },
    {
      name: "custom className is merged",
      props: { className: "custom-skeleton" },
      query: { selector: ".mild-skeleton" },
      expected: { classes: ["mild-skeleton", "custom-skeleton"] },
    },
  ],
};

export default skeletonCases;
