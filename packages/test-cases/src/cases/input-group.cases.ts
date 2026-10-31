// Shared cases for <InputGroup />. The framework test renders the parts named in `props.parts`
// (left-addon, right-addon, left-element, right-element) around an input.
import type { ComponentCases } from "../types";

export const inputGroupCases: ComponentCases = {
  component: "InputGroup",
  cases: [
    {
      name: "default renders a md group around the input",
      props: { parts: [] },
      query: { selector: ".mild-input-group" },
      expected: {
        classes: ["mild-input-group", "mild-input-group--md"],
        absentClasses: [
          "mild-input-group--has-left-addon",
          "mild-input-group--has-right-addon",
          "mild-input-group--has-left-element",
          "mild-input-group--has-right-element",
          "mild-input-group--inline",
        ],
      },
      parts: [{ query: { role: "textbox" }, classes: ["mild-input", "mild-input--md"] }],
    },
    {
      name: "addons on both sides square the input's outer corners",
      props: { parts: ["left-addon", "right-addon"] },
      query: { selector: ".mild-input-group" },
      expected: {
        classes: ["mild-input-group--has-left-addon", "mild-input-group--has-right-addon"],
      },
      parts: [
        {
          query: { selector: ".mild-input-addon--left" },
          classes: ["mild-input-addon"],
          attributes: { "data-placement": "left" },
          text: "https://",
        },
        {
          query: { selector: ".mild-input-addon--right" },
          attributes: { "data-placement": "right" },
          text: ".com",
        },
      ],
    },
    {
      name: "elements on both sides pad the input",
      props: { parts: ["left-element", "right-element"] },
      query: { selector: ".mild-input-group" },
      expected: {
        classes: ["mild-input-group--has-left-element", "mild-input-group--has-right-element"],
        absentClasses: ["mild-input-group--has-left-addon"],
      },
      parts: [
        { query: { selector: ".mild-input-element--left" }, classes: ["mild-input-element"] },
        { query: { selector: ".mild-input-element--right" }, classes: ["mild-input-element"] },
      ],
    },
    {
      name: "the group's size is shared with the input",
      props: { parts: ["left-addon"], size: "lg", inline: true },
      query: { selector: ".mild-input-group" },
      expected: { classes: ["mild-input-group--lg", "mild-input-group--inline"] },
      parts: [
        {
          query: { role: "textbox" },
          classes: ["mild-input--lg"],
          absentClasses: ["mild-input--md"],
        },
      ],
    },
    {
      name: "custom className is merged",
      props: { parts: [], className: "custom-input-group" },
      query: { selector: ".mild-input-group" },
      expected: { classes: ["mild-input-group", "custom-input-group"] },
    },
  ],
};

export default inputGroupCases;
