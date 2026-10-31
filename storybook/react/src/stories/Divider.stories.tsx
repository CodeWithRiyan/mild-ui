import type { Meta, StoryObj } from "@storybook/react";
import { Divider, Stack, Text } from "@mild-ui/react";

const meta = {
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
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: (args) => (
    <div style={{ width: "20rem" }}>
      <Divider {...args} />
    </div>
  ),
} satisfies Story;

export const WithLabel = {
  args: { label: "OR" },
  render: Default.render,
} satisfies Story;

export const Variants = {
  render: () => (
    <Stack gap="4" style={{ width: "20rem" }}>
      <Divider variant="solid" />
      <Divider variant="dashed" size="md" />
      <Divider variant="dotted" size="lg" color="primary-500" />
      <Divider label="start" labelPosition="start" />
      <Divider label="end" labelPosition="end" />
    </Stack>
  ),
} satisfies Story;

export const Vertical = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", height: "2rem" }}>
      <Text>Left</Text>
      <Divider orientation="vertical" />
      <Text>Right</Text>
    </div>
  ),
} satisfies Story;
