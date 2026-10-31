import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@mild-ui/react";

const meta = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Typography primitive. Renders a `span` by default, or the element given with `as`, and maps size, weight, alignment, transform, decoration and semantic color onto `mild-text--*` classes.",
      },
    },
  },
  argTypes: {
    as: { control: "text" },
    fontSize: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"],
    },
    fontWeight: {
      control: "select",
      options: ["thin", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
    },
    textAlign: { control: "select", options: ["left", "center", "right", "justify"] },
    textTransform: { control: "select", options: ["none", "uppercase", "lowercase", "capitalize"] },
    textDecoration: {
      control: "select",
      options: ["none", "underline", "line-through", "overline"],
    },
    color: {
      control: "select",
      options: [undefined, "primary", "secondary", "success", "warning", "danger", "muted"],
    },
    truncate: { control: "boolean" },
    noOfLines: { control: "number" },
  },
  args: { children: "The quick brown fox jumps over the lazy dog." },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Sizes = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text fontSize="xs">Extra small</Text>
      <Text fontSize="sm">Small</Text>
      <Text fontSize="md">Medium</Text>
      <Text fontSize="lg">Large</Text>
      <Text fontSize="xl">Extra large</Text>
      <Text fontSize="2xl" fontWeight="bold">
        2xl bold
      </Text>
    </div>
  ),
} satisfies Story;

export const Semantic = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text as="h2" fontSize="3xl" fontWeight="semibold">
        A heading element
      </Text>
      <Text as="p" color="muted">
        A muted paragraph.
      </Text>
      <Text color="success">Success</Text>
      <Text color="danger" textDecoration="line-through">
        Danger, struck through
      </Text>
      <Text textTransform="uppercase" letterSpacing="0.1em">
        Uppercase and spaced
      </Text>
      <Text as="p" truncate style={{ maxWidth: "12rem" }}>
        This long line is truncated with an ellipsis when it overflows.
      </Text>
    </div>
  ),
} satisfies Story;
