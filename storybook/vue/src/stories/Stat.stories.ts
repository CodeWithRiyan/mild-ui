import type { Meta, StoryObj } from "@storybook/vue3";
import { Stat, StatGroup } from "@mild-ui/vue";

const meta: Meta<typeof Stat> = {
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
};

export default meta;

type Story = StoryObj<typeof Stat>;

export const Default: Story = {
  render: (args) => ({
    components: { Stat },
    setup: () => ({ args }),
    template: '<Stat v-bind="args" />',
  }),
};

export const Group: Story = {
  name: "StatGroup",
  render: () => ({
    components: { Stat, StatGroup },
    template: `
      <StatGroup class="w-[36rem]">
        <Stat label="Users" value="1,204" trend="increase" trend-value="12%" help-text="vs last week" />
        <Stat label="Churn" value="2.1%" trend="decrease" trend-value="0.4%" help-text="vs last week" />
        <Stat label="Uptime" value="99.98%" size="lg" />
      </StatGroup>
    `,
  }),
};
