import type { Meta, StoryObj } from "@storybook/vue3";
import { Kbd, Text } from "@mild-ui/vue";

const meta: Meta<typeof Kbd> = {
  title: "Typography/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A keyboard key (`<kbd>`). Combine several for a shortcut.",
      },
    },
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    as: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
  render: (args) => ({
    components: { Kbd },
    setup: () => ({ args }),
    template: '<Kbd v-bind="args">⌘</Kbd>',
  }),
};

export const Shortcuts: Story = {
  render: () => ({
    components: { Kbd, Text },
    template: `
      <div class="flex flex-col gap-3">
        <Text>Search: <Kbd>⌘</Kbd> + <Kbd>K</Kbd></Text>
        <Text>Save: <Kbd size="sm">Ctrl</Kbd> + <Kbd size="sm">S</Kbd></Text>
        <Text>Submit: <Kbd size="lg">Enter</Kbd></Text>
      </div>
    `,
  }),
};
