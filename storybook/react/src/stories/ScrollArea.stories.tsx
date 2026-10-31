import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea, Text } from "@mild-ui/react";

const meta = {
  title: "Layout/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Scroll container with slim, themed scrollbars. Give it a `maxHeight` (or `maxWidth` for horizontal) so the content has something to overflow. Keyboard-focusable so the region can be scrolled without a pointer.",
      },
    },
  },
  argTypes: {
    as: { control: "text" },
    orientation: { control: "radio", options: ["vertical", "horizontal", "both"] },
    scrollbars: { control: "radio", options: ["auto", "always", "hover", "hidden"] },
    height: { control: "text" },
    maxHeight: { control: "text" },
    maxWidth: { control: "text" },
  },
  args: { maxHeight: "48" },
} satisfies Meta<typeof ScrollArea>;

export default meta;

type Story = StoryObj<typeof meta>;

const lines = Array.from({ length: 30 }, (_, i) => `Line ${i + 1}`);

export const Default = {
  render: (args) => (
    <ScrollArea
      {...args}
      role="region"
      aria-label="Log"
      style={{
        width: "20rem",
        border: "1px solid var(--mild-border)",
        borderRadius: "var(--mild-radius-md)",
        padding: ".5rem",
      }}
    >
      {lines.map((line) => (
        <Text key={line} as="p">
          {line}
        </Text>
      ))}
    </ScrollArea>
  ),
} satisfies Story;

export const Horizontal = {
  args: { orientation: "horizontal", maxWidth: "80", scrollbars: "always", maxHeight: undefined },
  render: (args) => (
    <ScrollArea
      {...args}
      as="ul"
      aria-label="Chips"
      style={{ display: "flex", gap: ".5rem", listStyle: "none", padding: ".5rem", margin: 0 }}
    >
      {Array.from({ length: 20 }, (_, i) => (
        <li
          key={i}
          style={{
            flex: "none",
            padding: ".25rem .75rem",
            borderRadius: "999px",
            background: "var(--mild-color-gray-200)",
          }}
        >
          Chip {i + 1}
        </li>
      ))}
    </ScrollArea>
  ),
} satisfies Story;
