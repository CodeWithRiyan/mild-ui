// Shared cases for <Image />
import type { ComponentCases } from "../types";

export const imageCases: ComponentCases = {
  component: "Image",
  cases: [
    {
      name: "default renders a lazily loaded image",
      props: { src: "photo.jpg", alt: "A photo" },
      query: { role: "img", name: "A photo" },
      expected: {
        classes: ["mild-image"],
        attributes: { loading: "lazy", decoding: "async", "data-state": "loading" },
      },
    },
    {
      name: "eager image with fit and radius",
      props: { src: "photo.jpg", alt: "", lazy: false, fit: "contain", radius: "md" },
      query: { selector: "img" },
      expected: {
        classes: ["mild-image--contain", "mild-image--radius-md"],
        absentAttributes: ["loading", "decoding"],
      },
    },
    {
      name: "ratio wraps the image in a frame",
      props: { src: "photo.jpg", alt: "Wide", ratio: "16/9", radius: "lg" },
      query: { selector: ".mild-image-frame" },
      expected: {
        classes: ["mild-image-frame", "mild-image-frame--ratio", "mild-image-frame--radius-lg"],
        attributes: { style: "--mild-image-ratio: 16 / 9;" },
      },
      parts: [{ query: { role: "img", name: "Wide" }, absentClasses: ["mild-image--radius-lg"] }],
    },
    {
      name: "without a source the placeholder is shown",
      props: { alt: "Missing" },
      query: { role: "img", name: "Missing" },
      expected: { classes: ["mild-image__fallback"] },
    },
    {
      name: "custom className is merged",
      props: { src: "photo.jpg", alt: "", className: "custom-image" },
      query: { selector: "img" },
      expected: { classes: ["mild-image", "custom-image"] },
    },
  ],
};

export default imageCases;
