import type { Meta, StoryObj } from "@storybook/vue3";
import { Flex } from "@mild-ui/vue";

const meta: Meta<typeof Flex> = {
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
};

export default meta;

type Story = StoryObj<typeof Flex>;

const item = (label: string, height = "2rem") =>
  `<div style="padding: var(--mild-space-2) var(--mild-space-4); min-height: ${height}; border-radius: var(--mild-radius-md); background: var(--mild-color-primary-500); color: white">${label}</div>`;

export const Default: Story = {
  render: (args) => ({
    components: { Flex },
    setup: () => ({ args }),
    template: `<Flex v-bind="args" style="width: 24rem">${item("A")}${item("B", "4rem")}${item("C")}</Flex>`,
  }),
};

export const Wrapping: Story = {
  args: { wrap: true, gap: "2", justify: "flex-start" },
  render: (args) => ({
    components: { Flex },
    setup: () => ({ args }),
    template: `<Flex v-bind="args" style="width: 16rem">${Array.from({ length: 8 }, (_, i) => item(`Chip ${i + 1}`)).join("")}</Flex>`,
  }),
};
