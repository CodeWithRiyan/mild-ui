import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

const theme = create({
  base: "light",
  brandTitle: "mild-ui React",
  brandUrl: "https://github.com/codewithriyan/mild-ui",
  brandTarget: "_self",
  fontBase: '"Open Sans", sans-serif',
  fontCode: "monospace",
  colorPrimary: "#3b82f6",
  colorSecondary: "#6366f1",
  appBg: "#ffffff",
  appContentBg: "#ffffff",
  appBorderColor: "#e5e7eb",
  appBorderRadius: 4,
  textColor: "#1f2937",
  textInverseColor: "#ffffff",
  barTextColor: "#6b7280",
  barSelectedColor: "#3b82f6",
  barBg: "#f9fafb",
  inputBg: "#ffffff",
  inputBorder: "#d1d5db",
  inputTextColor: "#1f2937",
  inputBorderRadius: 4,
});

addons.setConfig({ theme });
