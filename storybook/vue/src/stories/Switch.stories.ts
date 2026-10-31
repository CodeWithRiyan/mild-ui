import type { Meta, StoryObj } from "@storybook/vue3";
import { Switch } from "@mild-ui/vue";
import { ref } from "vue";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "On/off switch driven by `@mild-ui/primitives/switch`: Space and Enter both toggle it, per the [WAI-ARIA APG switch pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/). Keyboard tests: `packages/vue/src/components/Switch/Switch.test.ts`.",
      },
    },
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    modelValue: { control: "boolean" },
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    label: { control: "text" },
    name: { control: "text" },
    "onUpdate:modelValue": { action: "update:modelValue" },
    onChange: { action: "change" },
  },
  args: { label: "Wi-Fi" },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: (args) => ({
    components: { Switch },
    setup: () => ({ args }),
    template: '<Switch id="wifi" v-bind="args" />',
  }),
};

export const On: Story = {
  args: { label: "Bluetooth", defaultChecked: true },
  render: Default.render,
};

export const Disabled: Story = {
  args: { label: "Airplane mode", disabled: true },
  render: Default.render,
};

export const Sizes: Story = {
  render: () => ({
    components: { Switch },
    template: `
      <div class="flex flex-col gap-3">
        <Switch id="sm" size="sm" label="Small" />
        <Switch id="md" size="md" label="Medium" default-checked />
        <Switch id="lg" size="lg" label="Large" />
      </div>
    `,
  }),
};

export const Controlled: Story = {
  render: () => ({
    components: { Switch },
    setup() {
      const on = ref(false);
      return { on };
    },
    template: `
      <div class="flex flex-col gap-3">
        <Switch id="dark" v-model="on" label="Dark mode" />
        <output class="text-sm">{{ on ? "On" : "Off" }}</output>
      </div>
    `,
  }),
};
