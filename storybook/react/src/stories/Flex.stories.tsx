import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "@mild-ui/react";

const meta = {
  title: "Layout/Flex",
  component: Flex,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "General-purpose flex container (a row by default). Renders a `div`, or the element given with `as`.",
      },
    },
  },
  argTypes: {
    as: { control: "text" },
    direction: { control: "select", options: ["row", "row-reverse", "column", "column-reverse"] },
    wrap: { control: "select", options: [true, false, "wrap", "nowrap", "wrap-reverse"] },
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
    gap: { control: "select", options: ["0", "1", "2", "3", "4", "6", "8"] },
    inline: { control: "boolean" },
  },
  args: { gap: "3", align: "center", justify: "space-between" },
} satisfies Meta<typeof Flex>;

export default meta;

type Story = StoryObj<typeof meta>;

const item = (label: string, height = "2rem") => (
  <div
    key={label}
    style={{
      padding: "var(--mild-space-2) var(--mild-space-4)",
      minHeight: height,
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
    <Flex {...args} style={{ width: "24rem" }}>
      {item("A")}
      {item("B", "4rem")}
      {item("C")}
    </Flex>
  ),
} satisfies Story;

export const Wrapping = {
  args: { wrap: true, gap: "2", justify: "flex-start" },
  render: (args) => (
    <Flex {...args} style={{ width: "16rem" }}>
      {Array.from({ length: 8 }, (_, i) => item(`Chip ${i + 1}`))}
    </Flex>
  ),
} satisfies Story;
