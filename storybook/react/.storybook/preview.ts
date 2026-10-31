import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";
import "../../../packages/core/dist/mild-ui.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
      source: {
        state: "open",
      },
    },
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#0f172a" },
      ],
    },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Components",
          "Layout",
          "Typography",
          "Navigation",
          "Feedback",
          "Overlay",
          "Disclosure",
          "Data Display",
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Color mode applied as <html data-theme>, what the core stylesheet keys on",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme === "dark" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.style.colorScheme = theme;
      return story();
    },
  ],
};

export default preview;
