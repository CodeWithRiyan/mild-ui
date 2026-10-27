import { beforeAll, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import * as MildVue from "./index";

const components = [
  "Button",
  "Checkbox",
  "Input",
  "Radio",
  "RadioGroup",
  "Select",
  "ThemeProvider",
] as const;

beforeAll(() => {
  // jsdom does not implement matchMedia, which ThemeProvider uses for the "system" theme.
  window.matchMedia ??= (query: string) =>
    ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }) as unknown as MediaQueryList;
});

describe("@mild-ui/vue exports", () => {
  it.each(components)("exports %s", (name) => {
    expect(MildVue[name]).toBeDefined();
  });

  it.each(components)("renders %s", (name) => {
    const props = name === "RadioGroup" ? { modelValue: "" } : {};
    const wrapper = mount(MildVue[name], {
      props,
      slots: { default: () => h("span", "content") },
    });
    expect(wrapper.html()).not.toBe("");
    wrapper.unmount();
  });
});
