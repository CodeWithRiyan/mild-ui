import type { Meta, StoryObj } from "@storybook/react";
import { List, ListItem } from "@mild-ui/react";

const meta = {
  title: "Typography/List",
  component: List,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Bulleted or numbered list. `ordered` renders an `ol` (numbered), `unstyled` drops the marker and the indentation, `spacing` takes a spacing token for the gap between items, and a `ListItem` can replace its marker with an `icon`.",
      },
    },
  },
  argTypes: {
    ordered: { control: "boolean" },
    marker: {
      control: "select",
      options: [
        undefined,
        "disc",
        "circle",
        "square",
        "decimal",
        "decimal-leading-zero",
        "lower-alpha",
        "upper-alpha",
        "lower-roman",
        "upper-roman",
        "none",
      ],
    },
    unstyled: { control: "boolean" },
    spacing: { control: "select", options: [undefined, "0", "1", "2", "3", "4"] },
  },
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: (args) => (
    <List {...args}>
      <ListItem>Framework-agnostic primitives</ListItem>
      <ListItem>One stylesheet for React and Vue</ListItem>
      <ListItem>Design tokens only</ListItem>
    </List>
  ),
} satisfies Story;

export const Ordered = {
  args: { ordered: true, marker: "lower-alpha", spacing: "2" },
  render: Default.render,
} satisfies Story;

const check = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const WithIcons = {
  render: () => (
    <List unstyled spacing="2">
      {["Install", "Import the stylesheet", "Ship"].map((item) => (
        <ListItem key={item} icon={check}>
          {item}
        </ListItem>
      ))}
    </List>
  ),
} satisfies Story;
