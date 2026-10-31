import type { Meta, StoryObj } from "@storybook/react";
import { Stat, StatGroup } from "@mild-ui/react";

const meta = {
  title: "Data Display/Stat",
  component: Stat,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'A key figure with its label and an optional trend. The trend arrow is decorative; its direction is announced in words ("increased by 12%"). `StatGroup` lays stats out in a row.',
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    helpText: { control: "text" },
    trend: { control: "select", options: [undefined, "increase", "decrease"] },
    trendValue: { control: "text" },
    size: { control: "radio", options: ["sm", "md", "lg"] },
  },
  args: {
    label: "Revenue",
    value: "$12,400",
    helpText: "Last 30 days",
    trend: "increase",
    trendValue: "12%",
  },
} satisfies Meta<typeof Stat>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Group = {
  name: "StatGroup",
  render: () => (
    <StatGroup className="w-[36rem]">
      <Stat label="Users" value="1,204" trend="increase" trendValue="12%" helpText="vs last week" />
      <Stat label="Churn" value="2.1%" trend="decrease" trendValue="0.4%" helpText="vs last week" />
      <Stat label="Uptime" value="99.98%" size="lg" />
    </StatGroup>
  ),
} satisfies Story;
