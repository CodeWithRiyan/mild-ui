import type { Meta, StoryObj } from "@storybook/vue3";
import { Stack, Button } from "@mild-ui/vue";

const meta: Meta<typeof Stack> = {
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
};

export default meta;

type Story = StoryObj<typeof Stack>;

const item = (label: string) =>
  `<div class="mild-box" style="padding: var(--mild-space-3); border-radius: var(--mild-radius-md); background: var(--mild-color-primary-500); color: white">${label}</div>`;

export const Default: Story = {
  render: (args) => ({
    components: { Stack },
    setup: () => ({ args }),
    template: `<Stack v-bind="args">${item("One")}${item("Two")}${item("Three")}</Stack>`,
  }),
};

export const Row: Story = {
  args: { direction: "row", gap: "2", align: "center" },
  render: Default.render,
};

export const Buttons: Story = {
  render: () => ({
    components: { Stack, Button },
    template: `
      <Stack direction="row" gap="2" justify="flex-end" as="footer">
        <Button variant="ghost">Cancel</Button>
        <Button>Save</Button>
      </Stack>
    `,
  }),
};
