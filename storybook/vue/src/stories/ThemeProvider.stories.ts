import type { Meta, StoryObj } from "@storybook/vue3";
import { Button, Checkbox, Input, Switch, Text, ThemeProvider, useColorMode } from "@mild-ui/vue";
import { defineComponent } from "vue";

const ModeSwitcher = defineComponent({
  name: "ModeSwitcher",
  // Registered under prefixed names: "Button" and "Text" are reserved component names.
  components: { MildButton: Button, MildText: Text },
  setup() {
    return useColorMode();
  },
  template: `
    <div class="flex items-center gap-3">
      <MildButton variant="outline" size="sm" @click="toggleColorMode">Toggle</MildButton>
      <MildButton variant="ghost" size="sm" @click="setColorMode('system')">System</MildButton>
      <MildText font-size="sm" color="muted">{{ colorMode }} → {{ resolvedColorMode }}</MildText>
    </div>
  `,
});

const meta: Meta<typeof ThemeProvider> = {
  title: "Components/ThemeProvider",
  component: ThemeProvider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Owns the color mode (light, dark or system), persists it, follows the OS live and writes it to `<html data-theme>`, which the core stylesheet keys on. `useTheme()` and `useColorMode()` read and change it; `theme` overrides become `--mild-*` custom properties.",
      },
    },
  },
  argTypes: {
    defaultColorMode: { control: "radio", options: ["light", "dark", "system"] },
    storageKey: { control: "text" },
    cssVarPrefix: { control: "text" },
  },
  args: { defaultColorMode: "system", storageKey: "storybook:mild-ui-color-mode" },
};

export default meta;

type Story = StoryObj<typeof ThemeProvider>;

export const Default: Story = {
  render: (args) => ({
    components: { ThemeProvider, ModeSwitcher, Button, Input, Checkbox, Switch },
    setup: () => ({ args }),
    template: `
      <ThemeProvider v-bind="args">
        <div class="flex flex-col gap-4 w-80">
          <ModeSwitcher />
          <Input aria-label="Name" placeholder="Themed input" />
          <div class="flex gap-4">
            <Checkbox id="c" label="Checkbox" default-checked />
            <Switch id="s" label="Switch" default-checked />
          </div>
          <Button>Themed button</Button>
        </div>
      </ThemeProvider>
    `,
  }),
};

export const ThemeOverrides: Story = {
  args: {
    defaultColorMode: "light",
    theme: { colors: { primary: { 500: "#7c3aed", 600: "#6d28d9", 700: "#5b21b6" } } },
  },
  render: Default.render,
};
