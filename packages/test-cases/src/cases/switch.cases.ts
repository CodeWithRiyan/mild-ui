// Shared cases for <Switch />
import type { ComponentCases } from "../types";

export const switchCases: ComponentCases = {
  component: "Switch",
  cases: [
    {
      name: "default is an off, focusable switch",
      props: { id: "wifi", label: "Wi-Fi" },
      query: { role: "switch", name: "Wi-Fi" },
      expected: {
        attributes: {
          "aria-checked": "false",
          "data-state": "unchecked",
          tabindex: "0",
        },
      },
    },
    {
      name: "defaultChecked renders on",
      props: { defaultChecked: true },
      query: { role: "switch" },
      expected: {
        attributes: { "aria-checked": "true", "data-state": "checked" },
      },
    },
    {
      name: "disabled switch",
      props: { disabled: true },
      query: { role: "switch" },
      expected: { attributes: { "data-disabled": "" } },
    },
  ],
};

export default switchCases;
