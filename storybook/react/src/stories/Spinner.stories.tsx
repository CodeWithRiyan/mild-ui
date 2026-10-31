import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "@mild-ui/react";

const meta = {
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
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Variants = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner variant="border" />
      <Spinner variant="dots" />
      <Spinner variant="pulse" />
      <Spinner variant="bars" />
      <Spinner size="xl" speed="slow" label="Slowly loading" />
    </div>
  ),
} satisfies Story;
