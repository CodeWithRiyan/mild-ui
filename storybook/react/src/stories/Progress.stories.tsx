import type { Meta, StoryObj } from "@storybook/react";
import { CircularProgress, Progress } from "@mild-ui/react";

const meta = {
  title: "Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Linear (`Progress`) and ring-shaped (`CircularProgress`) progress indicators with `role="progressbar"`. Without a `value`, or with `indeterminate`, they animate and announce themselves as busy.',
      },
    },
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    indeterminate: { control: "boolean" },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    colorScheme: {
      control: "select",
      options: ["primary", "success", "warning", "danger", "info"],
    },
    striped: { control: "boolean" },
    animated: { control: "boolean" },
    showValue: { control: "boolean" },
    label: { control: "text" },
  },
  args: { value: 40, label: "Upload" },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: (args) => (
    <div className="w-80">
      <Progress {...args} />
    </div>
  ),
} satisfies Story;

export const Variants = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Progress value={30} label="Small" size="sm" />
      <Progress value={60} label="Success" colorScheme="success" showValue />
      <Progress value={80} label="Striped" striped animated colorScheme="warning" size="lg" />
      <Progress indeterminate label="Working" />
    </div>
  ),
} satisfies Story;

export const Circular = {
  name: "CircularProgress",
  render: () => (
    <div className="flex items-center gap-6">
      <CircularProgress value={25} label="Storage" />
      <CircularProgress value={65} label="Done" showValue colorScheme="success" size="lg" />
      <CircularProgress indeterminate label="Working" size="xl" colorScheme="warning" />
      <CircularProgress value={100} label="Complete" thickness={0.2}>
        ✓
      </CircularProgress>
    </div>
  ),
} satisfies Story;
