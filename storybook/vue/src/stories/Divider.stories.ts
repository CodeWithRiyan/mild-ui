import type { Meta, StoryObj } from "@storybook/vue3";
import { Divider, Stack, Text } from "@mild-ui/vue";

const meta: Meta<typeof Divider> = {
  title: "Layout/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Horizontal or vertical separator (`role="separator"`), optionally with a label on the line. Use `decorative` for purely visual lines (for example inside lists), which hides them from assistive technology.',
      },
    },
  },
  argTypes: {
    as: { control: "text" },
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    variant: { control: "radio", options: ["solid", "dashed", "dotted"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    color: { control: "text" },
    label: { control: "text" },
    labelPosition: { control: "radio", options: ["start", "center", "end"] },
    decorative: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: (args) => ({
    components: { Divider },
    setup: () => ({ args }),
    template: `<div style="width: 20rem"><Divider v-bind="args" /></div>`,
  }),
};

export const WithLabel: Story = {
  args: { label: "OR" },
  render: Default.render,
};

export const Variants: Story = {
  render: () => ({
    components: { Divider, Stack },
    template: `
      <Stack gap="4" style="width: 20rem">
        <Divider variant="solid" />
        <Divider variant="dashed" size="md" />
        <Divider variant="dotted" size="lg" color="primary-500" />
        <Divider label="start" label-position="start" />
        <Divider label="end" label-position="end" />
      </Stack>
    `,
  }),
};

export const Vertical: Story = {
  render: () => ({
    components: { Divider, Text },
    template: `
      <div style="display: flex; align-items: center; gap: 1rem; height: 2rem">
        <Text>Left</Text>
        <Divider orientation="vertical" />
        <Text>Right</Text>
      </div>
    `,
  }),
};
