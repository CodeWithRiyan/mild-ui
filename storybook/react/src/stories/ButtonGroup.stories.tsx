import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonGroup } from "@mild-ui/react";

const meta = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Lays buttons out in a row (or column) and hands them a shared `size`, `variant` and `disabled`. `attached` joins them into one bar. Rendered with `role="group"`; give it an `aria-label` when the group\'s purpose is not obvious from context.',
      },
    },
  },
  argTypes: {
    attached: { control: "boolean" },
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    fullWidth: { control: "boolean" },
    size: { control: "select", options: [undefined, "xs", "sm", "md", "lg", "xl"] },
    variant: {
      control: "select",
      options: [undefined, "primary", "secondary", "outline", "ghost", "link", "destructive"],
    },
    disabled: { control: "boolean" },
  },
  args: { "aria-label": "Pager" },
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Previous</Button>
      <Button>1</Button>
      <Button>2</Button>
      <Button>Next</Button>
    </ButtonGroup>
  ),
} satisfies Story;

export const Attached = {
  args: { attached: true, variant: "outline" },
  render: Default.render,
} satisfies Story;

export const Vertical = {
  args: { attached: true, orientation: "vertical", variant: "secondary", size: "sm" },
  render: Default.render,
} satisfies Story;

export const Overrides = {
  name: "Buttons override the group",
  render: () => (
    <ButtonGroup variant="ghost" size="sm" disabled aria-label="Mixed">
      <Button>Inherits</Button>
      <Button variant="primary" disabled={false}>
        Overrides
      </Button>
    </ButtonGroup>
  ),
} satisfies Story;
