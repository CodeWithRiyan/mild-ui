import type { Meta, StoryObj } from "@storybook/react";
import { Button, Checkbox, Input, Switch, Text, ThemeProvider, useColorMode } from "@mild-ui/react";

function ModeSwitcher() {
  const { colorMode, resolvedColorMode, toggleColorMode, setColorMode } = useColorMode();
  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="sm" onClick={toggleColorMode}>
        Toggle
      </Button>
      <Button variant="ghost" size="sm" onClick={() => setColorMode("system")}>
        System
      </Button>
      <Text fontSize="sm" color="muted">
        {colorMode} → {resolvedColorMode}
      </Text>
    </div>
  );
}

const meta = {
  title: "Components/ThemeProvider",
  component: ThemeProvider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Owns the color mode (light, dark or system), persists it, follows the OS live and writes it to `<html data-theme>`, which the core stylesheet keys on. `useTheme()` and `useColorMode()` read and change it; `theme` overrides become `--mild-*` custom properties. Put `ColorModeScript` in `<head>` to apply the stored mode before the first paint.",
      },
    },
  },
  argTypes: {
    defaultColorMode: { control: "radio", options: ["light", "dark", "system"] },
    storageKey: { control: "text" },
    cssVarPrefix: { control: "text" },
    children: { control: false },
  },
  args: {
    defaultColorMode: "system",
    storageKey: "storybook:mild-ui-color-mode",
    children: null,
  },
} satisfies Meta<typeof ThemeProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: (args) => (
    <ThemeProvider {...args}>
      <div className="flex flex-col gap-4 w-80">
        <ModeSwitcher />
        <Input aria-label="Name" placeholder="Themed input" />
        <div className="flex gap-4">
          <Checkbox id="c" label="Checkbox" defaultChecked />
          <Switch id="s" label="Switch" defaultChecked />
        </div>
        <Button>Themed button</Button>
      </div>
    </ThemeProvider>
  ),
} satisfies Story;

export const ThemeOverrides = {
  args: {
    defaultColorMode: "light",
    theme: { colors: { primary: { 500: "#7c3aed", 600: "#6d28d9", 700: "#5b21b6" } } },
  },
  render: Default.render,
} satisfies Story;
