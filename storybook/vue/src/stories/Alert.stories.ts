import type { Meta, StoryObj } from "@storybook/vue3";
import { Alert } from "@mild-ui/vue";

const meta: Meta<typeof Alert> = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Inline status message. Rendered with `role="alert"` for errors and warnings (announced at once) and `role="status"` otherwise, unless a `role` is given.',
      },
    },
  },
  argTypes: {
    status: { control: "select", options: ["info", "success", "warning", "error"] },
    variant: { control: "select", options: ["subtle", "solid", "left-accent", "top-accent"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    dismissible: { control: "boolean" },
    noIcon: { control: "boolean" },
    title: { control: "text" },
    description: { control: "text" },
    onDismiss: { action: "dismiss" },
  },
  args: { title: "Heads up", description: "Your changes have been saved." },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: (args) => ({
    components: { Alert },
    setup: () => ({ args }),
    template: '<div class="w-96"><Alert v-bind="args" /></div>',
  }),
};

export const Statuses: Story = {
  render: () => ({
    components: { Alert },
    template: `
      <div class="flex flex-col gap-3 w-96">
        <Alert status="info" title="Info" description="Something you should know." />
        <Alert status="success" title="Saved" description="All good." dismissible />
        <Alert status="warning" variant="left-accent" title="Careful" description="Check your input." />
        <Alert status="error" variant="solid" title="Failed" description="Try again." />
      </div>
    `,
  }),
};
