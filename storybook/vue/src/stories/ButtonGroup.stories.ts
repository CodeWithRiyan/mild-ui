import type { Meta, StoryObj } from "@storybook/vue3";
import { Button, ButtonGroup } from "@mild-ui/vue";

const meta: Meta<typeof ButtonGroup> = {
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
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: (args) => ({
    components: { ButtonGroup, Button },
    setup: () => ({ args }),
    template: `
      <ButtonGroup aria-label="Pager" v-bind="args">
        <Button>Previous</Button>
        <Button>1</Button>
        <Button>2</Button>
        <Button>Next</Button>
      </ButtonGroup>
    `,
  }),
};

export const Attached: Story = {
  args: { attached: true, variant: "outline" },
  render: Default.render,
};

export const Vertical: Story = {
  args: { attached: true, orientation: "vertical", variant: "secondary", size: "sm" },
  render: Default.render,
};

export const Overrides: Story = {
  name: "Buttons override the group",
  render: () => ({
    components: { ButtonGroup, Button },
    template: `
      <ButtonGroup variant="ghost" size="sm" disabled aria-label="Mixed">
        <Button>Inherits</Button>
        <Button variant="primary" :disabled="false">Overrides</Button>
      </ButtonGroup>
    `,
  }),
};
