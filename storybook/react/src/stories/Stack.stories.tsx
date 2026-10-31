import type { Meta, StoryObj } from "@storybook/react";
import { Button, Stack } from "@mild-ui/react";

const meta = {
  title: "Layout/Stack",
  component: Stack,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Spaces its children along one axis (a column by default) with a gap from the spacing scale. Renders a `div`, or the element given with `as`.",
      },
    },
  },
  argTypes: {
    as: { control: "text" },
    direction: { control: "select", options: ["row", "row-reverse", "column", "column-reverse"] },
    gap: { control: "select", options: ["0", "1", "2", "3", "4", "6", "8", "12"] },
    align: {
      control: "select",
      options: ["flex-start", "flex-end", "center", "baseline", "stretch"],
    },
    justify: {
      control: "select",
      options: [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
      ],
    },
    wrap: { control: "select", options: [true, false, "wrap", "nowrap", "wrap-reverse"] },
    inline: { control: "boolean" },
  },
  args: { direction: "column", gap: "4" },
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

const item = (label: string) => (
  <div
    key={label}
    className="mild-box"
    style={{
      padding: "var(--mild-space-3)",
      borderRadius: "var(--mild-radius-md)",
      background: "var(--mild-color-primary-500)",
      color: "white",
    }}
  >
    {label}
  </div>
);

export const Default = {
  render: (args) => (
    <Stack {...args}>
      {item("One")}
      {item("Two")}
      {item("Three")}
    </Stack>
  ),
} satisfies Story;

export const Row = {
  args: { direction: "row", gap: "2", align: "center" },
  render: Default.render,
} satisfies Story;

export const Buttons = {
  render: () => (
    <Stack direction="row" gap="2" justify="flex-end" as="footer">
      <Button variant="ghost">Cancel</Button>
      <Button>Save</Button>
    </Stack>
  ),
} satisfies Story;
