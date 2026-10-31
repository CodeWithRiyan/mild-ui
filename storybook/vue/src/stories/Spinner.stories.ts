import type { Meta, StoryObj } from "@storybook/vue3";
import { Spinner } from "@mild-ui/vue";

const meta: Meta<typeof Spinner> = {
  title: "Feedback/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Indeterminate loading indicator, announced through a visually hidden `label` (`role="status"`).',
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    variant: { control: "select", options: ["border", "dots", "pulse", "bars"] },
    speed: { control: "radio", options: ["slow", "normal", "fast"] },
    label: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  render: (args) => ({
    components: { Spinner },
    setup: () => ({ args }),
    template: '<Spinner v-bind="args" />',
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Spinner },
    template: `
      <div class="flex items-center gap-6">
        <Spinner variant="border" />
        <Spinner variant="dots" />
        <Spinner variant="pulse" />
        <Spinner variant="bars" />
        <Spinner size="xl" speed="slow" label="Slowly loading" />
      </div>
    `,
  }),
};
