import type { Meta, StoryObj } from "@storybook/react";
import { Kbd, Text } from "@mild-ui/react";

const meta = {
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
  args: { children: "⌘" },
} satisfies Meta<typeof Kbd>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Shortcuts = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Text>
        Search: <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
      </Text>
      <Text>
        Save: <Kbd size="sm">Ctrl</Kbd> + <Kbd size="sm">S</Kbd>
      </Text>
      <Text>
        Submit: <Kbd size="lg">Enter</Kbd>
      </Text>
    </div>
  ),
} satisfies Story;
