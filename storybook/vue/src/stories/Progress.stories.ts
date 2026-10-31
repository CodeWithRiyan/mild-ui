import type { Meta, StoryObj } from "@storybook/vue3";
import { CircularProgress, Progress } from "@mild-ui/vue";

const meta: Meta<typeof Progress> = {
  title: "Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Linear (`Progress`) and ring-shaped (`CircularProgress`) progress indicators with `role="progressbar"`. Without a `value`, or with `indeterminate`, they animate and announce themselves as busy.',
      },
    },
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    indeterminate: { control: "boolean" },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    colorScheme: {
      control: "select",
      options: ["primary", "success", "warning", "danger", "info"],
    },
    striped: { control: "boolean" },
    animated: { control: "boolean" },
    showValue: { control: "boolean" },
    label: { control: "text" },
  },
  args: { value: 40, label: "Upload" },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: (args) => ({
    components: { Progress },
    setup: () => ({ args }),
    template: '<div class="w-80"><Progress v-bind="args" /></div>',
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div class="flex flex-col gap-4 w-80">
        <Progress :value="30" label="Small" size="sm" />
        <Progress :value="60" label="Success" color-scheme="success" show-value />
        <Progress :value="80" label="Striped" striped animated color-scheme="warning" size="lg" />
        <Progress indeterminate label="Working" />
      </div>
    `,
  }),
};

export const Circular: Story = {
  name: "CircularProgress",
  render: () => ({
    components: { CircularProgress },
    template: `
      <div class="flex items-center gap-6">
        <CircularProgress :value="25" label="Storage" />
        <CircularProgress :value="65" label="Done" show-value color-scheme="success" size="lg" />
        <CircularProgress indeterminate label="Working" size="xl" color-scheme="warning" />
        <CircularProgress :value="100" label="Complete" :thickness="0.2">✓</CircularProgress>
      </div>
    `,
  }),
};
